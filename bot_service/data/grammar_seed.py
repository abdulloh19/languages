import json

GRAMMAR_LESSONS_DATA = [
    # English Beginner
    {
        "level": "BEGINNER",
        "lang": "en",
        "order_index": 1,
        "title": "Present Simple (Oddiy hozirgi zamon)",
        "title_uz": "Oddiy hozirgi zamon: Doimiy va takrorlanuvchi harakatlar",
        "explanation_uz": "Present Simple odatiy, har kuni yoki muntazam takrorlanadigan ish-harakatlar, shuningdek ilmiy faktlar uchun ishlatiladi. He/She/It olmoshlaridan so'ng fe'lga -s yoki -es qo'shimchasi qo'shiladi.",
        "formula": "Ega (Subject) + Fe'l (Verb) [he/she/it uchun + s/es] + Ikkinchi darajali bo'laklar",
        "examples_json": json.dumps([
            {"en": "I drink coffee every morning.", "uz": "Men har kuni ertalab qahva ichaman."},
            {"en": "She works in a bank.", "uz": "U bankda ishlaydi."},
            {"en": "The sun rises in the east.", "uz": "Quyosh sharqdan chiqadi."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "She drinks fresh tea every morning",
            "uzbek_translation": "U har kuni ertalab yangi choy ichadi",
            "tokens": ["fresh", "morning", "She", "drinks", "tea", "every"]
        })
    },
    {
        "level": "BEGINNER",
        "lang": "en",
        "order_index": 2,
        "title": "To Be fe'li (am / is / are)",
        "title_uz": "To Be: Bo'lmoq, mavjud bo'lmoq yoki holatni ifodalash",
        "explanation_uz": "To be fe'li gapda asosiy harakat bo'lmaganda ega haqida ma'lumot (kasb, sifat, holat, joylashuv) berish uchun xizmat qiladi. I -> am, He/She/It -> is, We/You/They -> are.",
        "formula": "Ega + am/is/are + Ot/Sifat/Joy",
        "examples_json": json.dumps([
            {"en": "I am a dedicated student.", "uz": "Men tirishqoq talabaman."},
            {"en": "He is very friendly.", "uz": "U juda samimiy."},
            {"en": "They are at home.", "uz": "Ular uyda."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "They are very happy today",
            "uzbek_translation": "Ular bugun juda xursand",
            "tokens": ["very", "today", "They", "happy", "are"]
        })
    },
    {
        "level": "BEGINNER",
        "lang": "en",
        "order_index": 3,
        "title": "Past Simple (Oddiy o'tgan zamon)",
        "title_uz": "Oddiy o'tgan zamon: O'tmishda tugallangan ish-harakatlar",
        "explanation_uz": "O'tmishda ma'lum bir vaqtda sodir bo'lib tugagan harakatlar uchun Past Simple qo'llaniladi. To'g'ri fe'llarga -ed qo'shiladi, noto'g'ri fe'llar esa 2-shakliga o'zgaradi (go -> went, see -> saw).",
        "formula": "Ega + V2 (fe'lning o'tgan zamon shakli) + Boshqa bo'laklar",
        "examples_json": json.dumps([
            {"en": "I visited London last summer.", "uz": "Men o'tgan yozda Londonga borgan edim."},
            {"en": "He bought a new car yesterday.", "uz": "U kecha yangi mashina sotib oldi."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "We visited the museum yesterday",
            "uzbek_translation": "Biz kecha muzeyni ziyorat qildik",
            "tokens": ["yesterday", "museum", "We", "the", "visited"]
        })
    },
    # English Intermediate
    {
        "level": "INTERMEDIATE",
        "lang": "en",
        "order_index": 4,
        "title": "Present Perfect Tense",
        "title_uz": "Hozirgi tugallangan zamon: Natijasi hozirga bog'liq harakat",
        "explanation_uz": "O'tmishda boshlangan yoki tugagan, ammo natijasi ayni damda ko'rinib turgan harakatlar uchun ishlatiladi. 'have/has + V3 (participle)' formulasi bilan yasaladi.",
        "formula": "Ega + have/has + V3 (Past Participle)",
        "examples_json": json.dumps([
            {"en": "I have lost my passport.", "uz": "Men pasportimni yo'qotib qo'ydim (hozir ham yo'q)."},
            {"en": "She has finished her project already.", "uz": "U loyihasini allaqachon tugatdi."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "She has already finished her work",
            "uzbek_translation": "U ishini allaqachon tugatib bo'ldi",
            "tokens": ["finished", "has", "already", "work", "her", "She"]
        })
    },
    {
        "level": "INTERMEDIATE",
        "lang": "en",
        "order_index": 5,
        "title": "Modal Verbs: Must, Should, Can",
        "title_uz": "Modal fe'llar: Majburiyat, maslahat va qobiliyat",
        "explanation_uz": "'Must' - qat'iy zarurat/majburiyat; 'Should' - tavsiya/maslahat; 'Can' - jismoniy yoki aqliy qobiliyat, ruxsat. Ulardan keyin fe'l 'to' siz sof shaklda keladi.",
        "formula": "Ega + modal fe'l + asosiy fe'l (infinitive without to)",
        "examples_json": json.dumps([
            {"en": "You should drink more water.", "uz": "Siz ko'proq suv ichishingiz kerak (maslahat)."},
            {"en": "Drivers must stop at a red light.", "uz": "Haydovchilar qizil chiroqda to'xtashi shart."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "You should read books every day",
            "uzbek_translation": "Siz har kuni kitob o'qishingiz kerak",
            "tokens": ["read", "every", "You", "books", "should", "day"]
        })
    },
    # Russian Beginner
    {
        "level": "BEGINNER",
        "lang": "ru",
        "order_index": 1,
        "title": "Род имён существительных (Otlar jinsi)",
        "title_uz": "Rus tilida otlarning jinsi (Мужской, Женский, Средний)",
        "explanation_uz": "Rus tilida barcha otlar 3 jinsga bo'linadi: Erkak jinsi (undosh yoki -й bilan tugaydi: дом, стол, чай), Ayol jinsi (-а, -я bilan tugaydi: книга, песня, сестра), O'rta jins (-о, -е bilan tugaydi: окно, море, письмо).",
        "formula": "Мужской: ундош / -й; Женский: -а / -я; Средний: -о / -е",
        "examples_json": json.dumps([
            {"ru": "Этот новый дом очень красивый.", "uz": "Bu yangi uy juda chiroyli (M.j.)."},
            {"ru": "Моя старшая сестра учится в университете.", "uz": "Mening opam universitetda o'qiydi (J.j.)."},
            {"ru": "Большое окно выходит в сад.", "uz": "Katta deraza bog'ga qaraydi (S.j.)."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "Моя старшая сестра читает интересную книгу",
            "uzbek_translation": "Mening katta opam qiziqarli kitob o'qiyapti",
            "tokens": ["читает", "книгу", "сестра", "Моя", "интересную", "старшая"]
        })
    },
    {
        "level": "BEGINNER",
        "lang": "ru",
        "order_index": 2,
        "title": "Спряжение глаголов в настоящем времени (Fe'llar tuslanishi)",
        "title_uz": "Hozirgi zamonda fe'llarning 1 va 2-tuslanishi",
        "explanation_uz": "Rus tilida fe'llar shaxs va songa qarab o'zgaradi. 1-tuslanish (-ать, -ять): я читаю, ты читаешь, он читает, мы читаем, вы читаете, они читают. 2-tuslanish (-ить): я говорю, ты говоришь, он говорит, они говорят.",
        "formula": "Я -ю/-у, Ты -ешь/-ишь, Он -ет/-ит, Мы -ем/-им, Вы -ете/-ите, Они -ют/-ят",
        "examples_json": json.dumps([
            {"ru": "Я говорю по-русски каждый день.", "uz": "Men har kuni ruscha gapiraman."},
            {"ru": "Мы учим новые слова вместе.", "uz": "Biz yangi so'zlarni birga o'rganamiz."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "Мы учим новые слова каждый день",
            "uzbek_translation": "Biz har kuni yangi so'zlarni o'rganamiz",
            "tokens": ["день", "новые", "учим", "слова", "каждый", "Мы"]
        })
    },
    {
        "level": "INTERMEDIATE",
        "lang": "ru",
        "order_index": 3,
        "title": "Виды глаголов: Совершенный и Несовершенный (Fe'l ko'rinishlari)",
        "title_uz": "Tugallangan (СВ) va Tugallanmagan (НСВ) fe'llar",
        "explanation_uz": "НСВ (Несовершенный вид) — jarayon, takrorlanish: 'Я читал книгу 2 часа'. СВ (Совершенный вид) — bir martalik tugallangan aniq natija: 'Я прочитал книгу вчера'.",
        "formula": "НСВ: делать, читать, писать (jarayon); СВ: сделать, прочитать, написать (natija)",
        "examples_json": json.dumps([
            {"ru": "Он долго писал письмо, и наконец написал его.", "uz": "U uzoq vaqt xat yozdi va nihoyat uni yozib tugatdi."},
            {"ru": "Я выучил двадцать новых слов сегодня.", "uz": "Men bugun yigirma yangi so'zni yodlab oldim."}
        ]),
        "sort_exercise_json": json.dumps({
            "target_sentence": "Я выучил все новые слова сегодня",
            "uzbek_translation": "Men bugun barcha yangi so'zlarni yodlab oldim",
            "tokens": ["выучил", "слова", "сегодня", "все", "Я", "новые"]
        })
    }
]
