package com.antigravity.languagebot.controller;

import com.antigravity.languagebot.service.TtsAudioService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tts")
public class TtsApiController {

    private final TtsAudioService ttsAudioService;

    public TtsApiController(TtsAudioService ttsAudioService) {
        this.ttsAudioService = ttsAudioService;
    }

    @GetMapping(value = "/synthesize", produces = {"audio/wav", "audio/mpeg"})
    public ResponseEntity<byte[]> synthesize(
            @RequestParam(defaultValue = "Hello") String text,
            @RequestParam(defaultValue = "EN") String lang) {
        byte[] audioBytes = ttsAudioService.synthesizeAudio(text, lang);

        HttpHeaders headers = new HttpHeaders();
        // If Google TTS returned MP3 bytes (ID3 header), set audio/mpeg, otherwise audio/wav
        boolean isMp3 = audioBytes.length >= 3 && audioBytes[0] == 0x49 && audioBytes[1] == 0x44 && audioBytes[2] == 0x33;
        headers.setContentType(isMp3 ? MediaType.valueOf("audio/mpeg") : MediaType.valueOf("audio/wav"));
        headers.setContentLength(audioBytes.length);
        headers.set("Cache-Control", "public, max-age=86400");

        return ResponseEntity.ok().headers(headers).body(audioBytes);
    }
}
