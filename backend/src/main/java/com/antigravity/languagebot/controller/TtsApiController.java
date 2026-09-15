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

    @GetMapping(value = "/synthesize", produces = {"audio/mpeg", "audio/wav", "audio/*"})
    public ResponseEntity<byte[]> synthesize(
            @RequestParam(defaultValue = "Salom") String text,
            @RequestParam(defaultValue = "RU") String lang) {
        byte[] audioBytes = ttsAudioService.synthesizeAudio(text, lang);

        HttpHeaders headers = new HttpHeaders();
        boolean isWav = audioBytes.length >= 4
                && audioBytes[0] == 'R' && audioBytes[1] == 'I' && audioBytes[2] == 'F' && audioBytes[3] == 'F';

        headers.setContentType(isWav ? MediaType.valueOf("audio/wav") : MediaType.valueOf("audio/mpeg"));
        headers.setContentLength(audioBytes.length);
        headers.set("Cache-Control", "public, max-age=604800, immutable");
        headers.set("Accept-Ranges", "bytes");

        return ResponseEntity.ok().headers(headers).body(audioBytes);
    }
}
