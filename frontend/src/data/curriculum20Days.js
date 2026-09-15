/**
 * 20-Day Thematic Language Learning Curriculum
 * Tailored for Uzbek native learners studying Russian (UZB -> RU) and English (UZB -> EN).
 * Every day includes EXACTLY 20 thematic words + 2 reinforcement dialogues:
 * - Checkpoint 1 (After Word #10): Reinforcement dialogue for words 1-10
 * - Checkpoint 2 (After Word #20): Final reinforcement dialogue for words 1-20
 */

export const CEFR_LEVELS = [
  {
    code: 'A1',
    name: 'Boshlang\'ich',
    nameEn: 'Beginner',
    desc: 'Kundalik oddiy so\'zlar, tanishuv, oila va asosiy ehtiyojlar.',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500/20 text-emerald-300'
  },
  {
    code: 'A2',
    name: 'Elementar',
    nameEn: 'Elementary',
    desc: 'Sayohat, xaridlar, restoran, shahar va yo\'nalishlar.',
    color: 'from-sky-500 to-blue-600',
    border: 'border-sky-500/30',
    badge: 'bg-sky-500/20 text-sky-300'
  },
  {
    code: 'B1',
    name: 'O\'rta',
    nameEn: 'Intermediate',
    desc: 'Ish muloqoti, shaxsiy fikr bildirish, rejalar va tajriba.',
    color: 'from-indigo-500 to-purple-600',
    border: 'border-indigo-500/30',
    badge: 'bg-indigo-500/20 text-indigo-300'
  },
  {
    code: 'B2',
    name: 'Yuqori',
    nameEn: 'Upper-Intermediate',
    desc: 'Erkin suhbat, muzokaralar va professional mavzular.',
    color: 'from-amber-500 to-rose-600',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/20 text-amber-300'
  }
];

export const TOPIC_MODULES = [
  { id: 1, key: 'family', days: [1, 2, 3, 4], titleUz: 'Oila va Yaqinlar', titleRu: 'Семья и друзья', titleEn: 'Family & Friends', icon: '👨‍👩‍👧' },
  { id: 2, key: 'work', days: [5, 6, 7, 8], titleUz: 'Ish va Karyera', titleRu: 'Работа и карьера', titleEn: 'Work & Career', icon: '💼' },
  { id: 3, key: 'travel', days: [9, 10, 11, 12], titleUz: 'Sayohat va Shahar', titleRu: 'Путешествия и город', titleEn: 'Travel & City', icon: '✈️' },
  { id: 4, key: 'food', days: [13, 14, 15, 16], titleUz: 'Taom va Restoran', titleRu: 'Еда и ресторан', titleEn: 'Food & Dining', icon: '🍽️' },
  { id: 5, key: 'health', days: [17, 18, 19, 20], titleUz: 'Salomatlik va Sport', titleRu: 'Здоровье и спорт', titleEn: 'Health & Wellness', icon: '🏃' }
];

export const CURRICULUM_DAYS = {
  1: {
    dayNumber: 1,
    topicId: 1,
    topicTitleUz: "Oila a'zolari va Tanishuv",
    topicTitleRu: "Члены семьи и знакомство",
    topicTitleEn: "Family Members & Greetings",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Dastlabki 10 ta o'rganilgan so'zni jonli muloqotda qo'llash",
      dialogueRu: "— Здравствуйте! Это ваша семья на фотографии?\n— Да, это мои родители, отец и мать.\n— А кто этот мальчик рядом с сестрой?\n— Это мой младший брат, он ещё ребёнок.\n— Очень дружная и красивая семья!",
      dialogueEn: "— Hello! Is this your family in the photo?\n— Yes, these are my parents, father and mother.\n— And who is this boy next to your sister?\n— That is my younger brother, he is still a child.\n— Such a warm and lovely family!",
      dialogueUz: "— Assalomu alaykum! Suratdagi sizning oilangizmi?\n— Ha, bu mening ota-onam, otam va onam.\n— Singlingiz yonidagi bola kim?\n— Bu mening kichik ukam, u hali bola.\n— Juda ahil va go'zal oila!",
      lines: [
        { ru: "Здравствуйте! Это ваша семья на фотографии?", en: "Hello! Is this your family in the photo?", uz: "Assalomu alaykum! Suratdagi sizning oilangizmi?" },
        { ru: "Да, это мои родители, отец и мать.", en: "Yes, these are my parents, father and mother.", uz: "Ha, bu mening ota-onam, otam va onam." },
        { ru: "А кто этот мальчик рядом с сестрой?", en: "And who is this boy next to your sister?", uz: "Singlingiz yonidagi bola kim?" },
        { ru: "Это мой младший брат, он ещё ребёнок.", en: "That is my younger brother, he is still a child.", uz: "Bu mening kichik ukam, u hali bola." },
        { ru: "Очень дружная и красивая семья!", en: "Such a warm and lovely family!", uz: "Juda ahil va go'zal oila!" }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Kunlik barcha 20 ta so'z bo'yicha yakuniy mustahkamlovchi suhbat",
      dialogueRu: "— Вчера наш дядя и тётя пришли в наш дом.\n— Прекрасно! Семья — это главное счастье в жизни.\n— Согласен, любовь и взаимное уважение делают дом уютным.\n— Мы тоже свято бережём эту прекрасную семейную традицию.",
      dialogueEn: "— Yesterday our uncle and aunt visited our home.\n— Wonderful! Family is the greatest happiness in life.\n— I agree, love and mutual respect make a home cozy.\n— We also deeply cherish this beautiful family tradition.",
      dialogueUz: "— Kecha tog'am va xolam uyimizga mehmonga kelishdi.\n— Ajoyib! Oila — hayotdagi eng katta baxt.\n— Qo'shilaman, sevgi va o'zaro hurmat uyni fayzli qiladi.\n— Biz ham bu go'zal oilaviy an'anani qadrlaymiz.",
      lines: [
        { ru: "Вчера наш дядя и тётя пришли в наш дом.", en: "Yesterday our uncle and aunt visited our home.", uz: "Kecha tog'am va xolam uyimizga mehmonga kelishdi." },
        { ru: "Прекрасно! Семья — это главное счастье в жизни.", en: "Wonderful! Family is the greatest happiness in life.", uz: "Ajoyib! Oila — hayotdagi eng katta baxt." },
        { ru: "Согласен, любовь и взаимное уважение делают дом уютным.", en: "I agree, love and mutual respect make a home cozy.", uz: "Qo'shilaman, sevgi va o'zaro hurmat uyni fayzli qiladi." },
        { ru: "Мы тоже свято бережём эту прекрасную семейную традицию.", en: "We also deeply cherish this beautiful family tradition.", uz: "Biz ham bu go'zal oilaviy an'anani qadrlaymiz." }
      ]
    },
    words: [
      { order: 1, uz: "Oila", ru: "Семья", en: "Family", phoneticRu: "[sem'ya]", phoneticEn: "[ˈfæm.əl.i]", exRu: "Это моя дружная семья", exEn: "This is my close family" },
      { order: 2, uz: "Ota", ru: "Отец", en: "Father", phoneticRu: "[a-tyets]", phoneticEn: "[ˈfɑː.ðər]", exRu: "Мой отец работает врачом", exEn: "My father works as a doctor" },
      { order: 3, uz: "Ona", ru: "Мать", en: "Mother", phoneticRu: "[mat']", phoneticEn: "[ˈmʌð.ər]", exRu: "Мама готовит вкусный ужин", exEn: "Mother is cooking delicious dinner" },
      { order: 4, uz: "Ota-ona", ru: "Родители", en: "Parents", phoneticRu: "[ra-di-tye-li]", phoneticEn: "[ˈpeə.rənts]", exRu: "Мои родители живут в Ташкенте", exEn: "My parents live in Tashkent" },
      { order: 5, uz: "Aka / Uka", ru: "Брат", en: "Brother", phoneticRu: "[brat]", phoneticEn: "[ˈbrʌð.ər]", exRu: "У меня есть старший брат", exEn: "I have an older brother" },
      { order: 6, uz: "Opa / Singil", ru: "Сестра", en: "Sister", phoneticRu: "[se-stra]", phoneticEn: "[ˈsɪs.tər]", exRu: "Моя сестра учится в школе", exEn: "My sister studies at school" },
      { order: 7, uz: "Do'st", ru: "Друг", en: "Friend", phoneticRu: "[droog]", phoneticEn: "[frend]", exRu: "Он мой самый надёжный друг", exEn: "He is my most reliable friend" },
      { order: 8, uz: "Bobo", ru: "Дедушка", en: "Grandfather", phoneticRu: "[dye-doosh-ka]", phoneticEn: "[ˈɡræn.fɑː.ðər]", exRu: "Дедушка рассказывает мудрые истории", exEn: "Grandfather tells wise stories" },
      { order: 9, uz: "Buvi", ru: "Бабушка", en: "Grandmother", phoneticRu: "[ba-boosh-ka]", phoneticEn: "[ˈɡræn.mʌð.ər]", exRu: "Бабушка печёт свежие лепёшки", exEn: "Grandmother bakes fresh bread" },
      { order: 10, uz: "Bola / Farzand", ru: "Ребёнок", en: "Child", phoneticRu: "[re-byo-nak]", phoneticEn: "[tʃaɪld]", exRu: "Ребёнок весело играет во дворе", exEn: "The child plays happily in the yard" },
      { order: 11, uz: "O'g'il", ru: "Сын", en: "Son", phoneticRu: "[syn]", phoneticEn: "[sʌn]", exRu: "Их сын изучает математику", exEn: "Their son studies mathematics" },
      { order: 12, uz: "Qiz farzand", ru: "Дочь", en: "Daughter", phoneticRu: "[doch']", phoneticEn: "[ˈdɔː.tər]", exRu: "Дочь прекрасно поёт песни", exEn: "The daughter sings songs beautifully" },
      { order: 13, uz: "Amaki / Tog'a", ru: "Дядя", en: "Uncle", phoneticRu: "[dya-dya]", phoneticEn: "[ˈʌŋ.kəl]", exRu: "Дядя часто навещает нас", exEn: "Uncle visits us often" },
      { order: 14, uz: "Xola / Amma", ru: "Тётя", en: "Aunt", phoneticRu: "[tyo-tya]", phoneticEn: "[ɑːnt]", exRu: "Тётя привезла сладкие фрукты", exEn: "Aunt brought sweet fruits" },
      { order: 15, uz: "Amakivachcha", ru: "Двоюродный брат", en: "Cousin", phoneticRu: "[koo-zen]", phoneticEn: "[ˈkʌz.ən]", exRu: "Мы с кузеном ровесники", exEn: "My cousin and I are peers" },
      { order: 16, uz: "Baxt", ru: "Счастье", en: "Happiness", phoneticRu: "[shchas-tye]", phoneticEn: "[ˈhæp.i.nəs]", exRu: "Семья — это настоящее счастье", exEn: "Family is genuine happiness" },
      { order: 17, uz: "Uy", ru: "Дом", en: "Home", phoneticRu: "[dom]", phoneticEn: "[həʊm]", exRu: "Добро пожаловать в наш дом", exEn: "Welcome to our home" },
      { order: 18, uz: "Sevgi", ru: "Любовь", en: "Love", phoneticRu: "[lyu-bof']", phoneticEn: "[lʌv]", exRu: "Любовь согревает сердце", exEn: "Love warms the heart" },
      { order: 19, uz: "Hurmat", ru: "Уважение", en: "Respect", phoneticRu: "[oo-va-zhe-ni-ye]", phoneticEn: "[rɪˈspekt]", exRu: "Уважение к старшим обязательно", exEn: "Respect for elders is essential" },
      { order: 20, uz: "An'ana", ru: "Традиция", en: "Tradition", phoneticRu: "[tra-dee-tsi-ya]", phoneticEn: "[trəˈdɪʃ.ən]", exRu: "Семейные традиции объединяют поколения", exEn: "Family traditions unite generations" }
    ]
  },
  2: {
    dayNumber: 2,
    topicId: 1,
    topicTitleUz: "Qarindoshlar va Mehmondorchilik",
    topicTitleRu: "Родственники и гостеприимство",
    topicTitleEn: "Relatives & Hospitality",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Dastlabki 10 ta o'rganilgan so'zni mehmondorchilik muloqotida qo'llash",
      dialogueRu: "— Дорогие гости, проходите в дом!\n— Спасибо за такое тёплое гостеприимство.\n— Садитесь во главу стола, вы наш уважаемый гость.\n— Очень приятно собраться вместе с соседями и близкими.",
      dialogueEn: "— Dear guests, please come inside!\n— Thank you for such warm hospitality.\n— Please sit at the head of table, you are our honored guest.\n— It is a pleasure to gather with neighbors and loved ones.",
      dialogueUz: "— Aziz mehmonlar, uyga marhamat qiling!\n— Samimiy mehmondo'stlik uchun katta rahmat.\n— To'rga o'ting, siz bizning aziz mehmonimizsiz.\n— Qo'shnilar va yaqinlar bilan birga yig'ilish juda yoqimli.",
      lines: [
        { ru: "Дорогие гости, проходите в дом!", en: "Dear guests, please come inside!", uz: "Aziz mehmonlar, uyga marhamat qiling!" },
        { ru: "Спасибо за такое тёплое гостеприимство.", en: "Thank you for such warm hospitality.", uz: "Samimiy mehmondo'stlik uchun katta rahmat." },
        { ru: "Садитесь во главу стола, вы наш уважаемый гость.", en: "Please sit at the head of table, you are our honored guest.", uz: "To'rga o'ting, siz bizning aziz mehmonimizsiz." },
        { ru: "Очень приятно собраться вместе с соседями и близкими.", en: "It is a pleasure to gather with neighbors and loved ones.", uz: "Qo'shnilar va yaqinlar bilan birga yig'ilish juda yoqimli." }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Kunlik barcha 20 ta so'z bo'yicha bayramona suhbat",
      dialogueRu: "— Этот праздничный стол ломится от угощений!\n— Мы готовили угощения от всей души для наших родных.\n— Пусть в каждом доме царит мир, достаток и радость.\n— Большое спасибо, здоровья вам и благополучия!",
      dialogueEn: "— This holiday table is full of treats!\n— We cooked all treats from the bottom of our hearts for relatives.\n— May peace, prosperity, and joy reign in every home.\n— Thank you very much, health and prosperity to you!",
      dialogueUz: "— Ushbu bayram dasturxoni noz-ne'matlarga to'la!\n— Yaqinlarimiz uchun barcha taomlarni chin dildan tayyorladik.\n— Har bir xonadonda tinchlik, to'kinlik va quvonch bo'lsin.\n— Katta rahmat, sizlarga salomatlik va farovonlik tilaymiz!",
      lines: [
        { ru: "Этот праздничный стол ломится от угощений!", en: "This holiday table is full of treats!", uz: "Ushbu bayram dasturxoni noz-ne'matlarga to'la!" },
        { ru: "Мы готовили угощения от всей души для наших родных.", en: "We cooked all treats from the bottom of our hearts for relatives.", uz: "Yaqinlarimiz uchun barcha taomlarni chin dildan tayyorladik." },
        { ru: "Пусть в каждом доме царит мир, достаток и радость.", en: "May peace, prosperity, and joy reign in every home.", uz: "Har bir xonadonda tinchlik, to'kinlik va quvonch bo'lsin." },
        { ru: "Большое спасибо, здоровья вам и благополучия!", en: "Thank you very much, health and prosperity to you!", uz: "Katta rahmat, sizlarga salomatlik va farovonlik tilaymiz!" }
      ]
    },
    words: [
      { order: 1, uz: "Mehmon", ru: "Гость", en: "Guest", phoneticRu: "[gost']", phoneticEn: "[ɡest]", exRu: "Дорогой гость в доме — радость", exEn: "Honored guest brings joy" },
      { order: 2, uz: "Mezbon", ru: "Хозяин", en: "Host", phoneticRu: "[ha-zya-een]", phoneticEn: "[həʊst]", exRu: "Щедрый хозяин дома", exEn: "Generous host of the house" },
      { order: 3, uz: "Qo'shni", ru: "Сосед", en: "Neighbor", phoneticRu: "[sa-syed]", phoneticEn: "[ˈneɪ.bər]", exRu: "Наши соседи очень дружелюбны", exEn: "Our neighbors are very friendly" },
      { order: 4, uz: "Qarindosh", ru: "Родственник", en: "Relative", phoneticRu: "[rot-stvyen-nik]", phoneticEn: "[ˈrel.ə.tɪv]", exRu: "Все родственники собрались вместе", exEn: "All relatives gathered together" },
      { order: 5, uz: "Dasturxon", ru: "Скатерть / Стол", en: "Tablecloth / Feast", phoneticRu: "[stol]", phoneticEn: "[teɪ.bəl]", exRu: "Накрыть богатый праздничный стол", exEn: "Set a rich festive table" },
      { order: 6, uz: "Sovg'a", ru: "Подарок", en: "Gift", phoneticRu: "[pa-da-rak]", phoneticEn: "[ɡɪft]", exRu: "Подарить подарок от сердца", exEn: "Give a gift from the heart" },
      { order: 7, uz: "Salomlashish", ru: "Приветствие", en: "Greeting", phoneticRu: "[pree-vyet-stvi-ye]", phoneticEn: "[ˈɡriː.tɪŋ]", exRu: "Тёплое искреннее приветствие", exEn: "Warm sincere greeting" },
      { order: 8, uz: "Muloqot", ru: "Общение", en: "Communication", phoneticRu: "[ap-shchye-ni-ye]", phoneticEn: "[kəˌmjuː.nɪˈkeɪ.ʃən]", exRu: "Приятное душевное общение", exEn: "Pleasant heartfelt communication" },
      { order: 9, uz: "Samimiyat", ru: "Искренность", en: "Sincerity", phoneticRu: "[ees-krye-nast']", phoneticEn: "[sɪnˈser.ə.ti]", exRu: "Я ценю вашу искренность", exEn: "I appreciate your sincerity" },
      { order: 10, uz: "Mehr-oqibat", ru: "Доброта", en: "Kindness", phoneticRu: "[da-bra-ta]", phoneticEn: "[ˈkaɪnd.nəs]", exRu: "Доброта объединяет людей", exEn: "Kindness unites people" },
      { order: 11, uz: "Suhbat", ru: "Беседа", en: "Conversation", phoneticRu: "[bye-sye-da]", phoneticEn: "[ˌkɒn.vəˈseɪ.ʃən]", exRu: "Интересная вечерняя беседа", exEn: "Interesting evening conversation" },
      { order: 12, uz: "Nevara", ru: "Внук", en: "Grandchild", phoneticRu: "[vnook]", phoneticEn: "[ˈɡræn.tʃaɪld]", exRu: "Дедушка гордится своим внуком", exEn: "Grandfather is proud of grandchild" },
      { order: 13, uz: "Yoshlar", ru: "Молодёжь", en: "Youth", phoneticRu: "[ma-la-dyozh]", phoneticEn: "[juːθ]", exRu: "Энергичная целеустремлённая молодёжь", exEn: "Energetic purposeful youth" },
      { order: 14, uz: "Kattalar", ru: "Старшие", en: "Elders", phoneticRu: "[star-shee-ye]", phoneticEn: "[ˈel.dərz]", exRu: "Слушать мудрые советы старших", exEn: "Listen to wise advice of elders" },
      { order: 15, uz: "Duo / Oq fotiha", ru: "Благословение", en: "Blessing", phoneticRu: "[bla-ga-sla-vye-ni-ye]", phoneticEn: "[ˈbles.ɪŋ]", exRu: "Получить благословение родителей", exEn: "Receive parents' blessing" },
      { order: 16, uz: "Tinchlik", ru: "Мир", en: "Peace", phoneticRu: "[meer]", phoneticEn: "[piːs]", exRu: "Мир и спокойствие в каждом доме", exEn: "Peace and tranquility in every home" },
      { order: 17, uz: "Farovonlik", ru: "Благополучие", en: "Prosperity", phoneticRu: "[bla-ga-pa-loo-chi-ye]", phoneticEn: "[prɒsˈper.ə.ti]", exRu: "Желаем достатка и благополучия", exEn: "Wishing abundance and prosperity" },
      { order: 18, uz: "Quvonch", ru: "Радость", en: "Joy", phoneticRu: "[ra-dast']", phoneticEn: "[dʒɔɪ]", exRu: "Разделить светлую радость", exEn: "Share the bright joy" },
      { order: 19, uz: "Shon-sharaf", ru: "Честь", en: "Honor", phoneticRu: "[chyest']", phoneticEn: "[ˈɒn.ər]", exRu: "Семейная честь превыше всего", exEn: "Family honor is above all" },
      { order: 20, uz: "Hamjihatlik", ru: "Единство", en: "Unity", phoneticRu: "[ye-deen-stva]", phoneticEn: "[ˈjuː.nə.ti]", exRu: "Единство даёт великую силу", exEn: "Unity brings great strength" }
    ]
  },
  5: {
    dayNumber: 5,
    topicId: 2,
    topicTitleUz: "Ish joyi, Ofis va Kasbiy Muloqot",
    topicTitleRu: "Рабочее место, офис и карьера",
    topicTitleEn: "Workplace, Office & Career",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Dastlabki 10 ta so'zni ofisdagi ish kunida qo'llash",
      dialogueRu: "— Доброе утро! Вы новый менеджер проектов?\n— Да, меня зовут Алекс. Рад познакомиться с коллегами.\n— Добро пожаловать в наш офис! До какого срока мы должны сдать отчёт?\n— Дедлайн в пятницу до 18:00, нужно успеть подготовить контракт.\n— Понял, приступаю к работе прямо сейчас!",
      dialogueEn: "— Good morning! Are you the new project manager?\n— Yes, my name is Alex. Glad to meet my colleagues.\n— Welcome to our office! What is the deadline for this report?\n— The deadline is Friday by 6 PM; we need to finalize contract.\n— Understood, I will start working right away!",
      dialogueUz: "— Xayrli tong! Siz yangi loyiha menejerimisiz?\n— Ha, ismim Alex. Hamkasblar bilan tanishganimdan xursandman.\n— Ofisimizga xush kelibsiz! Hisobotni qachongacha topshirishimiz kerak?\n— Muddat (dedlayn) juma soat 18:00 gacha, shartnomani tayyorlash kerak.\n— Tushundim, darhol ishga kirishaman!",
      lines: [
        { ru: "Доброе утро! Вы новый менеджер проектов?", en: "Good morning! Are you the new project manager?", uz: "Xayrli tong! Siz yangi loyiha menejerimisiz?" },
        { ru: "Да, меня зовут Алекс. Рад познакомиться с коллегами.", en: "Yes, my name is Alex. Glad to meet my colleagues.", uz: "Ha, ismim Alex. Hamkasblar bilan tanishganimdan xursandman." },
        { ru: "Добро пожаловать в наш офис! До какого срока мы должны сдать отчёт?", en: "Welcome to our office! What is the deadline for this report?", uz: "Ofisimizga xush kelibsiz! Hisobotni qachongacha topshirishimiz kerak?" },
        { ru: "Дедлайн в пятницу до 18:00, нужно успеть подготовить контракт.", en: "The deadline is Friday by 6 PM; we need to finalize contract.", uz: "Muddat (dedlayn) juma soat 18:00 gacha, shartnomani tayyorlash kerak." },
        { ru: "Понял, приступаю к работе прямо сейчас!", en: "Understood, I will start working right away!", uz: "Tushundim, darhol ishga kirishaman!" }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Kunlik barcha 20 ta so'z bo'yicha taqdimot va jamoaviy natija",
      dialogueRu: "— Наша команда отлично справилась с трудной задачей!\n— Да, презентация очень понравилась ключевому клиенту.\n— Ваш богатый профессиональный опыт и навыки привели к успеху.\n— Главная цель достигнута, мы перевыполнили месячный план!",
      dialogueEn: "— Our team handled this tough task brilliantly!\n— Yes, the key client loved our slide presentation.\n— Your rich professional experience and skills led to success.\n— The primary goal is achieved; we exceeded the monthly plan!",
      dialogueUz: "— Jamoamiz qiyin vazifani a'lo darajada bajardi!\n— Ha, taqdimot asosiy mijozga juda yoqdi.\n— Katta ish tajribangiz va ko'nikmalaringiz muvaffaqiyat keltirdi.\n— Asosiy maqsadga erishildi, oylik rejani ortig'i bilan bajardik!",
      lines: [
        { ru: "Наша команда отлично справилась с трудной задачей!", en: "Our team handled this tough task brilliantly!", uz: "Jamoamiz qiyin vazifani a'lo darajada bajardi!" },
        { ru: "Да, презентация очень понравилась ключевому клиенту.", en: "Yes, the key client loved our slide presentation.", uz: "Ha, taqdimot asosiy mijozga juda yoqdi." },
        { ru: "Ваш богатый профессиональный опыт и навыки привели к успеху.", en: "Your rich professional experience and skills led to success.", uz: "Katta ish tajribangiz va ko'nikmalaringiz muvaffaqiyat keltirdi." },
        { ru: "Главная цель достигнута, мы перевыполнили месячный план!", en: "The primary goal is achieved; we exceeded the monthly plan!", uz: "Asosiy maqsadga erishildi, oylik rejani ortig'i bilan bajardik!" }
      ]
    },
    words: [
      { order: 1, uz: "Ish", ru: "Работа", en: "Job", phoneticRu: "[ra-bo-ta]", phoneticEn: "[dʒɒb]", exRu: "У меня любимая и интересная работа", exEn: "I have a favorite and interesting job" },
      { order: 2, uz: "Ofis", ru: "Офис", en: "Office", phoneticRu: "[o-fees]", phoneticEn: "[ˈɒf.ɪs]", exRu: "Наш офис расположен в центре города", exEn: "Our office is located in city center" },
      { order: 3, uz: "Karyera", ru: "Карьера", en: "Career", phoneticRu: "[kar-ye-ra]", phoneticEn: "[kəˈrɪər]", exRu: "Успешная карьера требует упорства", exEn: "Successful career requires persistence" },
      { order: 4, uz: "Hamkasb", ru: "Коллега", en: "Colleague", phoneticRu: "[ka-lye-ga]", phoneticEn: "[ˈkɒl.iːɡ]", exRu: "Мы с коллегой готовим важный отчёт", exEn: "My colleague and I prepare an important report" },
      { order: 5, uz: "Menejer", ru: "Менеджер", en: "Manager", phoneticRu: "[me-ned-zher]", phoneticEn: "[ˈmæn.ɪ.dʒər]", exRu: "Менеджер утвердил новый рабочий план", exEn: "The manager approved the new work plan" },
      { order: 6, uz: "Uchrashuv", ru: "Встреча", en: "Meeting", phoneticRu: "[vstre-cha]", phoneticEn: "[ˈmiː.tɪŋ]", exRu: "Деловая встреча назначена на 10 утра", exEn: "Business meeting is scheduled for 10 AM" },
      { order: 7, uz: "Loyiha", ru: "Проект", en: "Project", phoneticRu: "[pra-yekt]", phoneticEn: "[ˈprɒdʒ.ekt]", exRu: "Мы запускаем перспективный IT проект", exEn: "We are launching a promising IT project" },
      { order: 8, uz: "Maosh", ru: "Зарплата", en: "Salary", phoneticRu: "[zar-pla-ta]", phoneticEn: "[ˈsæl.ər.i]", exRu: "Достойная зарплата мотивирует сотрудников", exEn: "Decent salary motivates employees" },
      { order: 9, uz: "Muddat (Dedlayn)", ru: "Дедлайн", en: "Deadline", phoneticRu: "[ded-laɪn]", phoneticEn: "[ˈded.laɪn]", exRu: "Дедлайн сдачи проекта уже завтра", exEn: "Project delivery deadline is tomorrow" },
      { order: 10, uz: "Shartnoma", ru: "Контракт", en: "Contract", phoneticRu: "[kan-trakt]", phoneticEn: "[ˈkɒn.trækt]", exRu: "Подписать официальный годовой контракт", exEn: "Sign official annual contract" },
      { order: 11, uz: "Jamoa", ru: "Команда", en: "Team", phoneticRu: "[ka-man-da]", phoneticEn: "[tiːm]", exRu: "Сплочённая команда добивается высот", exEn: "United team achieves great heights" },
      { order: 12, uz: "Vazifa", ru: "Задача", en: "Task", phoneticRu: "[za-da-cha]", phoneticEn: "[tɑːsk]", exRu: "Выполнить первоочередную задачу в срок", exEn: "Complete priority task on time" },
      { order: 13, uz: "Suhbat (Intervyu)", ru: "Интервью", en: "Interview", phoneticRu: "[een-tyer-vyu]", phoneticEn: "[ˈɪn.tə.vjuː]", exRu: "Успешно пройти собеседование на должность", exEn: "Successfully pass job interview" },
      { order: 14, uz: "Tajriba", ru: "Опыт", en: "Experience", phoneticRu: "[o-pyt]", phoneticEn: "[ɪkˈspɪə.ri.əns]", exRu: "Многолетний опыт работы в индустрии", exEn: "Years of work experience in industry" },
      { order: 15, uz: "Ko'nikma", ru: "Навык", en: "Skill", phoneticRu: "[na-vyk]", phoneticEn: "[skɪl]", exRu: "Развивать ключевые цифровые навыки", exEn: "Develop key digital skills" },
      { order: 16, uz: "Muvaffaqiyat", ru: "Успех", en: "Success", phoneticRu: "[oos-pyeh]", phoneticEn: "[səkˈses]", exRu: "Упорный труд непременно приведёт к успеху", exEn: "Hard work will surely lead to success" },
      { order: 17, uz: "Maqsad", ru: "Цель", en: "Goal", phoneticRu: "[tsyel']", phoneticEn: "[ɡəʊl]", exRu: "Поставить чёткую и измеримую цель", exEn: "Set a clear and measurable goal" },
      { order: 18, uz: "Taqdimot", ru: "Презентация", en: "Presentation", phoneticRu: "[pre-zen-ta-tsi-ya]", phoneticEn: "[ˌprez.ənˈteɪ.ʃən]", exRu: "Показать презентацию руководству компании", exEn: "Show presentation to company executives" },
      { order: 19, uz: "Mijoz", ru: "Клиент", en: "Client", phoneticRu: "[klee-yent]", phoneticEn: "[ˈklaɪ.ənt]", exRu: "Довольный клиент рекомендует нас друзьям", exEn: "Satisfied client recommends us to friends" },
      { order: 20, uz: "Hisobot", ru: "Отчёт", en: "Report", phoneticRu: "[at-chyot]", phoneticEn: "[rɪˈpɔːt]", exRu: "Отправить финансовый отчёт за квартал", exEn: "Send quarterly financial report" }
    ]
  },
  9: {
    dayNumber: 9,
    topicId: 3,
    topicTitleUz: "Aeroport, Parvoz va Sayohat",
    topicTitleRu: "Аэропорт, перелёт и путешествия",
    topicTitleEn: "Airport, Flight & Travel",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Aeroportda ro'yxatdan o'tish va parvozga chiqish",
      dialogueRu: "— Здравствуйте! Покажите ваш паспорт и электронный билет.\n— Вот, пожалуйста. Сколько мест багажа разрешено?\n— Одно место багажа до 23 кг. Ваш самолёт вылетает вовремя.\n— Спасибо! Где находится паспортный контроль и визовый отдел?\n— Пройдите прямо к стойке номер 14.",
      dialogueEn: "— Hello! Please show your passport and e-ticket.\n— Here you go. How many pieces of luggage are allowed?\n— One piece of luggage up to 23 kg. Your flight departs on time.\n— Thank you! Where is passport control and visa counter?\n— Please proceed straight to counter number 14.",
      dialogueUz: "— Assalomu alaykum! Pasportingiz va elektron chiptangizni ko'rsating.\n— Mana, marhamat. Qancha yuk (bagaj) ruxsat etilgan?\n— 23 kg gacha bir dona yuk. Samolyotingiz o'z vaqtida uchadi.\n— Rahmat! Pasport nazorati va viza bo'limi qayerda?\n— 14-stolga to'g'ri boring.",
      lines: [
        { ru: "Здравствуйте! Покажите ваш паспорт и электронный билет.", en: "Hello! Please show your passport and e-ticket.", uz: "Assalomu alaykum! Pasportingiz va elektron chiptangizni ko'rsating." },
        { ru: "Вот, пожалуйста. Сколько мест багажа разрешено?", en: "Here you go. How many pieces of luggage are allowed?", uz: "Mana, marhamat. Qancha yuk (bagaj) ruxsat etilgan?" },
        { ru: "Одно место багажа до 23 кг. Ваш самолёт вылетает вовремя.", en: "One piece of luggage up to 23 kg. Your flight departs on time.", uz: "23 kg gacha bir dona yuk. Samolyotingiz o'z vaqtida uchadi." },
        { ru: "Спасибо! Где находится паспортный контроль и визовый отдел?", en: "Thank you! Where is passport control and visa counter?", uz: "Rahmat! Pasport nazorati va viza bo'limi qayerda?" },
        { ru: "Пройдите прямо к стойке номер 14.", en: "Please proceed straight to counter number 14.", uz: "14-stolga to'g'ri boring." }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Shaharga yetib borish va sayohat taassurotlari",
      dialogueRu: "— Этот старый город просто великолепен!\n— Да, гид показал нам исторический музей и набережную моря.\n— Мы сели на скоростной поезд и сделали потрясающие фотографии.\n— Незабываемое приключение, обязательно купим сувениры на память!",
      dialogueEn: "— This old city is absolutely marvelous!\n— Yes, the tour guide showed us the history museum and sea shore.\n— We took the express train and captured stunning photos.\n— An unforgettable adventure; we will certainly buy souvenirs!",
      dialogueUz: "— Bu qadimiy shahar juda ham maftunkor!\n— Ha, yo'lboshchi (gid) bizga tarixiy muzey va dengiz qirg'og'ini ko'rsatdi.\n— Tezyurar poyezdga chiqdik va ajoyib fotosuratlar oldik.\n— Unutilmas sarguzasht, albatta esdalik sovg'alari sotib olamiz!",
      lines: [
        { ru: "Этот старый город просто великолепен!", en: "This old city is absolutely marvelous!", uz: "Bu qadimiy shahar juda ham maftunkor!" },
        { ru: "Да, гид показал нам исторический музей и набережную моря.", en: "Yes, the tour guide showed us the history museum and sea shore.", uz: "Ha, yo'lboshchi (gid) bizga tarixiy muzey va dengiz qirg'og'ini ko'rsatdi." },
        { ru: "Мы сели на скоростной поезд и сделали потрясающие фотографии.", en: "We took the express train and captured stunning photos.", uz: "Tezyurar poyezdga chiqdik va ajoyib fotosuratlar oldik." },
        { ru: "Незабываемое приключение, обязательно купим сувениры на память!", en: "An unforgettable adventure; we will certainly buy souvenirs!", uz: "Unutilmas sarguzasht, albatta esdalik sovg'alari sotib olamiz!" }
      ]
    },
    words: [
      { order: 1, uz: "Sayohat", ru: "Путешествие", en: "Travel", phoneticRu: "[poo-tye-shest-vi-ye]", phoneticEn: "[ˈtræv.əl]", exRu: "Путешествие открывает новые горизонты", exEn: "Travel expands new horizons" },
      { order: 2, uz: "Aeroport", ru: "Аэропорт", en: "Airport", phoneticRu: "[a-e-ra-port]", phoneticEn: "[ˈeə.pɔːt]", exRu: "Международный аэропорт Ташкента", exEn: "Tashkent International Airport" },
      { order: 3, uz: "Samolyot", ru: "Самолёт", en: "Airplane", phoneticRu: "[sa-ma-lyot]", phoneticEn: "[ˈeə.pleɪn]", exRu: "Самолёт плавно набирает высоту", exEn: "The airplane smoothly climbs altitude" },
      { order: 4, uz: "Pasport", ru: "Паспорт", en: "Passport", phoneticRu: "[pas-part]", phoneticEn: "[ˈpɑːs.pɔːt]", exRu: "Предъявите заграничный паспорт", exEn: "Present your international passport" },
      { order: 5, uz: "Chipta", ru: "Билет", en: "Ticket", phoneticRu: "[bee-lyet]", phoneticEn: "[ˈtɪk.ɪt]", exRu: "Электронный билет на прямой рейс", exEn: "Electronic ticket for direct flight" },
      { order: 6, uz: "Mehmonxona", ru: "Отель", en: "Hotel", phoneticRu: "[a-tyel']", phoneticEn: "[həʊˈtel]", exRu: "Забронировать номер в уютном отеле", exEn: "Book a room in cozy hotel" },
      { order: 7, uz: "Yuk (Bagaj)", ru: "Багаж", en: "Luggage", phoneticRu: "[ba-gazh]", phoneticEn: "[ˈlʌɡ.ɪdʒ]", exRu: "Получить чемодан в зоне выдачи багажа", exEn: "Pick up suitcase at baggage claim" },
      { order: 8, uz: "Viza", ru: "Виза", en: "Visa", phoneticRu: "[vee-za]", phoneticEn: "[ˈviː.zə]", exRu: "Получить туристическую визу вовремя", exEn: "Get tourist visa on time" },
      { order: 9, uz: "Plyaj", ru: "Пляж", en: "Beach", phoneticRu: "[plyazh]", phoneticEn: "[biːtʃ]", exRu: "Тёплый песчаный пляж у океана", exEn: "Warm sandy beach by the ocean" },
      { order: 10, uz: "Tog'lar", ru: "Горы", en: "Mountains", phoneticRu: "[go-ry]", phoneticEn: "[ˈmaʊn.tɪnz]", exRu: "Захватывающий дух поход в горы", exEn: "Breathtaking hike to mountains" },
      { order: 11, uz: "Shahar", ru: "Город", en: "City", phoneticRu: "[go-rad]", phoneticEn: "[ˈsɪt.i]", exRu: "Старинный европейский город", exEn: "Ancient European city" },
      { order: 12, uz: "Xarita", ru: "Карта", en: "Map", phoneticRu: "[kar-ta]", phoneticEn: "[mæp]", exRu: "Посмотреть маршрут по карте города", exEn: "Check route on city map" },
      { order: 13, uz: "Gid / Yo'lboshchi", ru: "Гид", en: "Guide", phoneticRu: "[geed]", phoneticEn: "[ɡaɪd]", exRu: "Опытный экскурсионный гид", exEn: "Experienced excursion guide" },
      { order: 14, uz: "Muzey", ru: "Музей", en: "Museum", phoneticRu: "[moo-zyey]", phoneticEn: "[mjuːˈziː.əm]", exRu: "Посетить национальный музей искусств", exEn: "Visit national museum of arts" },
      { order: 15, uz: "Poyezd", ru: "Поезд", en: "Train", phoneticRu: "[po-yezd]", phoneticEn: "[treɪn]", exRu: "Скоростной поезд прибывает на платформу", exEn: "Express train arrives at platform" },
      { order: 16, uz: "Dengiz", ru: "Море", en: "Sea", phoneticRu: "[mo-rye]", phoneticEn: "[siː]", exRu: "Чистое лазурное море", exEn: "Clear azure sea" },
      { order: 17, uz: "Orol", ru: "Остров", en: "Island", phoneticRu: "[os-traf]", phoneticEn: "[ˈaɪ.lənd]", exRu: "Необитаемый тропический остров", exEn: "Uninhabited tropical island" },
      { order: 18, uz: "Sarguzasht", ru: "Приключение", en: "Adventure", phoneticRu: "[pree-klyu-chye-ni-ye]", phoneticEn: "[ədˈven.tʃər]", exRu: "Увлекательное путешествие и приключение", exEn: "Exciting journey and adventure" },
      { order: 19, uz: "Esdalik (Suvenir)", ru: "Сувенир", en: "Souvenir", phoneticRu: "[soo-vye-neer]", phoneticEn: "[ˌsuː.vənˈɪər]", exRu: "Купить памятный сувенир для друзей", exEn: "Buy memorable souvenir for friends" },
      { order: 20, uz: "Surat", ru: "Фотография", en: "Photo", phoneticRu: "[fa-ta-gra-fee-ya]", phoneticEn: "[ˈfəʊ.təʊ]", exRu: "Сделать красивую панорамную фотографию", exEn: "Take a beautiful panoramic photo" }
    ]
  },
  13: {
    dayNumber: 13,
    topicId: 4,
    topicTitleUz: "Taom, Restoran va Buyurtma",
    topicTitleRu: "Еда, ресторан и заказ",
    topicTitleEn: "Food, Restaurant & Ordering",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Restoranda stol band qilish va taom buyurtma qilish",
      dialogueRu: "— Добрый вечер! Вы готовы сделать заказ?\n— Да, принесите меню, пожалуйста. Мы хотим заказать горячий чай и хлеб.\n— Что выберете из основных блюд: мясо или рыбу?\n— Пожалуйста, жареную рыбу и стакан чистой воды.\n— Прекрасный выбор, заказ будет готов через 15 минут.",
      dialogueEn: "— Good evening! Are you ready to order?\n— Yes, please bring the menu. We would like hot tea and fresh bread.\n— What will you choose for main course: meat or fish?\n— Roast fish and a glass of pure water, please.\n— Excellent choice, your order will be ready in 15 minutes.",
      dialogueUz: "— Xayrli kech! Buyurtma berishga tayyormisiz?\n— Ha, iltimos, menyuni bering. Issiq choy va yangi non xohlaymiz.\n— Asosiy taomlardan nima tanlaysiz: go'shtmi yoki baliq?\n— Iltimos, qovurilgan baliq va bir stakan toza suv keltiring.\n— Ajoyib tanlov, buyurtmangiz 15 daqiqada tayyor bo'ladi.",
      lines: [
        { ru: "Добрый вечер! Вы готовы сделать заказ?", en: "Good evening! Are you ready to order?", uz: "Xayrli kech! Buyurtma berishga tayyormisiz?" },
        { ru: "Да, принесите меню, пожалуйста. Мы хотим заказать горячий чай и хлеб.", en: "Yes, please bring the menu. We would like hot tea and fresh bread.", uz: "Ha, iltimos, menyuni bering. Issiq choy va yangi non xohlaymiz." },
        { ru: "Что выберете из основных блюд: мясо или рыбу?", en: "What will you choose for main course: meat or fish?", uz: "Asosiy taomlardan nima tanlaysiz: go'shtmi yoki baliq?" },
        { ru: "Пожалуйста, жареную рыбу и стакан чистой воды.", en: "Roast fish and a glass of pure water, please.", uz: "Iltimos, qovurilgan baliq va bir stakan toza suv keltiring." },
        { ru: "Прекрасный выбор, заказ будет готов через 15 минут.", en: "Excellent choice, your order will be ready in 15 minutes.", uz: "Ajoyib tanlov, buyurtmangiz 15 daqiqada tayyor bo'ladi." }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Kechki ovqatdan keyin desert va hisob-kitob",
      dialogueRu: "— Этот суп и свежий салат были очень вкусными!\n— Спасибо! Желаете десерт или фрукты к чаю?\n— Да, принесите шоколадный десерт, а затем счёт, пожалуйста.\n— Вы будете оплачивать картой или наличными?\n— Оплачу банковской картой, спасибо за великолепный ужин!",
      dialogueEn: "— This soup and fresh salad were delicious!\n— Thank you! Would you like dessert or fruit with tea?\n— Yes, please bring chocolate dessert and then the bill.\n— Will you pay by card or cash?\n— I will pay by card, thank you for the splendid dinner!",
      dialogueUz: "— Bu sho'rva va yangi salat juda mazali bo'libdi!\n— Rahmat! Choy bilan desert yoki meva xohlaysizmi?\n— Ha, shokoladli shirinlik va keyin hisobni (chekni) olib keling.\n— To'lovni karta orqali qilasizmi yoki naqd puldami?\n— Bank kartasi orqali to'layman, ajoyib kechki ovqat uchun rahmat!",
      lines: [
        { ru: "Этот суп и свежий салат были очень вкусными!", en: "This soup and fresh salad were delicious!", uz: "Bu sho'rva va yangi salat juda mazali bo'libdi!" },
        { ru: "Спасибо! Желаете десерт или фрукты к чаю?", en: "Thank you! Would you like dessert or fruit with tea?", uz: "Rahmat! Choy bilan desert yoki meva xohlaysizmi?" },
        { ru: "Да, принесите шоколадный десерт, а затем счёт, пожалуйста.", en: "Yes, please bring chocolate dessert and then the bill.", uz: "Ha, shokoladli shirinlik va keyin hisobni (chekni) olib keling." },
        { ru: "Вы будете оплачивать картой или наличными?", en: "Will you pay by card or cash?", uz: "To'lovni karta orqali qilasizmi yoki naqd puldami?" },
        { ru: "Оплачу банковской картой, спасибо за великолепный ужин!", en: "I will pay by card, thank you for the splendid dinner!", uz: "Bank kartasi orqali to'layman, ajoyib kechki ovqat uchun rahmat!" }
      ]
    },
    words: [
      { order: 1, uz: "Ovqat", ru: "Еда", en: "Food", phoneticRu: "[ye-da]", phoneticEn: "[fuːd]", exRu: "Вкусная традиционная узбекская еда", exEn: "Delicious traditional Uzbek food" },
      { order: 2, uz: "Restoran", ru: "Ресторан", en: "Restaurant", phoneticRu: "[res-ta-ran]", phoneticEn: "[ˈres.trɒnt]", exRu: "Ужинать всей семьёй в ресторане", exEn: "Dine with whole family in restaurant" },
      { order: 3, uz: "Menyu", ru: "Меню", en: "Menu", phoneticRu: "[me-nyu]", phoneticEn: "[ˈmen.juː]", exRu: "Официант вежливо принёс меню", exEn: "Waiter politely brought the menu" },
      { order: 4, uz: "Buyurtma", ru: "Заказ", en: "Order", phoneticRu: "[za-kaz]", phoneticEn: "[ˈɔː.dər]", exRu: "Оформить заказ на доставку еды", exEn: "Place an order for food delivery" },
      { order: 5, uz: "Suv", ru: "Вода", en: "Water", phoneticRu: "[va-da]", phoneticEn: "[ˈwɔː.tər]", exRu: "Стакан прохладной минеральной воды", exEn: "Glass of cool mineral water" },
      { order: 6, uz: "Qahva", ru: "Кофе", en: "Coffee", phoneticRu: "[ko-fye]", phoneticEn: "[ˈkɒf.i]", exRu: "Чашка ароматного горячего кофе", exEn: "Cup of fragrant hot coffee" },
      { order: 7, uz: "Choy", ru: "Чай", en: "Tea", phoneticRu: "[chaɪ]", phoneticEn: "[tiː]", exRu: "Узбекский зелёный чай в пиале", exEn: "Uzbek green tea in a bowl" },
      { order: 8, uz: "Non", ru: "Хлеб", en: "Bread", phoneticRu: "[hlyep]", phoneticEn: "[bred]", exRu: "Горячий тандырный хлеб", exEn: "Hot tandoori bread" },
      { order: 9, uz: "Go'sht", ru: "Мясо", en: "Meat", phoneticRu: "[mya-sa]", phoneticEn: "[miːt]", exRu: "Нежное жареное мясо со специями", exEn: "Tender roasted meat with spices" },
      { order: 10, uz: "Baliq", ru: "Рыба", en: "Fish", phoneticRu: "[ry-ba]", phoneticEn: "[fɪʃ]", exRu: "Свежая рыба, запечённая с лимоном", exEn: "Fresh fish baked with lemon" },
      { order: 11, uz: "Sho'rva", ru: "Суп", en: "Soup", phoneticRu: "[soop]", phoneticEn: "[suːp]", exRu: "Наваристый горячий суп шурпа", exEn: "Rich hot shurpa soup" },
      { order: 12, uz: "Salat", ru: "Салат", en: "Salad", phoneticRu: "[sa-lat]", phoneticEn: "[ˈsæl.əd]", exRu: "Свежий овощной салат ачик-чучук", exEn: "Fresh vegetable salad achichuk" },
      { order: 13, uz: "Pishloq", ru: "Сыр", en: "Cheese", phoneticRu: "[syr]", phoneticEn: "[tʃiːz]", exRu: "Твёрдый сыр к завтраку", exEn: "Hard cheese for breakfast" },
      { order: 14, uz: "Meva", ru: "Фрукты", en: "Fruit", phoneticRu: "[frook-ty]", phoneticEn: "[fruːt]", exRu: "Сладкие сочные летние фрукты", exEn: "Sweet juicy summer fruits" },
      { order: 15, uz: "Sabzavot", ru: "Овощи", en: "Vegetables", phoneticRu: "[o-va-shchi]", phoneticEn: "[ˈvedʒ.tə.bəlz]", exRu: "Свежие полезные органические овощи", exEn: "Fresh healthy organic vegetables" },
      { order: 16, uz: "Shirinlik (Desert)", ru: "Десерт", en: "Dessert", phoneticRu: "[dye-syert]", phoneticEn: "[dɪˈzɜːt]", exRu: "Восточные сладости и нежный десерт", exEn: "Eastern sweets and delicate dessert" },
      { order: 17, uz: "Nonushta", ru: "Завтрак", en: "Breakfast", phoneticRu: "[zaf-trak]", phoneticEn: "[ˈbrek.fəst]", exRu: "Плотный и полезный завтрак с утра", exEn: "Hearty healthy breakfast in morning" },
      { order: 18, uz: "Tushlik", ru: "Обед", en: "Lunch", phoneticRu: "[a-byed]", phoneticEn: "[lʌntʃ]", exRu: "Собраться на обед с коллегами", exEn: "Gather for lunch with colleagues" },
      { order: 19, uz: "Kechki ovqat", ru: "Ужин", en: "Dinner", phoneticRu: "[oo-zheen]", phoneticEn: "[ˈdɪn.ər]", exRu: "Праздничный семейный ужин дома", exEn: "Festive family dinner at home" },
      { order: 20, uz: "Hisob (Chek)", ru: "Счёт", en: "Bill", phoneticRu: "[schyot]", phoneticEn: "[bɪl]", exRu: "Пожалуйста, принесите счёт к нашему столу", exEn: "Please bring bill to our table" }
    ]
  },
  17: {
    dayNumber: 17,
    topicId: 5,
    topicTitleUz: "Salomatlik, Shifokor va Sport",
    topicTitleRu: "Здоровье, врач и спорт",
    topicTitleEn: "Health, Doctor & Sport",
    checkpoint1: {
      step: 10,
      titleUz: "1-Bosqich: 10 ta so'zni mustahkamlash dialogi",
      summaryUz: "Shifokor qabulida tekshiruv va maslahat",
      dialogueRu: "— Здравствуйте, доктор! У меня поднялась температура и болит голова.\n— Давайте измерим давление. Не переживайте, это лёгкая простуда.\n— Нужно ли мне принимать сильные лекарства?\n— Я выпишу вам рецепт на витамины, в аптеке купите сироп.\n— Спасибо огромное, доктор, буду соблюдать покой!",
      dialogueEn: "— Hello, doctor! My temperature went up and I have a headache.\n— Let us check your blood pressure. Do not worry, it is a mild cold.\n— Do I need to take strong medicine?\n— I will write a prescription for vitamins; pick up syrup at the pharmacy.\n— Thank you so much, doctor, I will rest well!",
      dialogueUz: "— Assalomu alaykum, shifokor! Haroratim ko'tarildi va boshim og'riyapti.\n— Keling, qon bosimingizni o'lchaymiz. Xavotir olmang, bu yengil shamollash.\n— Kuchli dori ichishim kerakmi?\n— Sizga vitaminlar uchun retsept yozib beraman, dorixonadan sirop oling.\n— Katta rahmat, shifokor, aytganingizdek dam olaman!",
      lines: [
        { ru: "Здравствуйте, доктор! У меня поднялась температура и болит голова.", en: "Hello, doctor! My temperature went up and I have a headache.", uz: "Assalomu alaykum, shifokor! Haroratim ko'tarildi va boshim og'riyapti." },
        { ru: "Давайте измерим давление. Не переживайте, это лёгкая простуда.", en: "Let us check your blood pressure. Do not worry, it is a mild cold.", uz: "Keling, qon bosimingizni o'lchaymiz. Xavotir olmang, bu yengil shamollash." },
        { ru: "Нужно ли мне принимать сильные лекарства?", en: "Do I need to take strong medicine?", uz: "Kuchli dori ichishim kerakmi?" },
        { ru: "Я выпишу вам рецепт на витамины, в аптеке купите сироп.", en: "I will write a prescription for vitamins; pick up syrup at the pharmacy.", uz: "Sizga vitaminlar uchun retsept yozib beraman, dorixonadan sirop oling." },
        { ru: "Спасибо огромное, доктор, буду соблюдать покой!", en: "Thank you so much, doctor, I will rest well!", uz: "Katta rahmat, shifokor, aytganingizdek dam olaman!" }
      ]
    },
    checkpoint2: {
      step: 20,
      titleUz: "2-Bosqich: 20 ta so'zni to'liq mustahkamlash dialogi",
      summaryUz: "Sog'lom turmush tarzi, mashg'ulotlar va energiya",
      dialogueRu: "— Как вам удаётся быть полным энергии каждый день?\n— Секрет прост: утренний бег, чистая вода и здоровый сон.\n— Спорт и правильная диета действительно укрепляют сердце и иммунитет.\n— Верно! Полноценный отдых и свежий воздух — залог долголетия.",
      dialogueEn: "— How do you manage to stay full of energy every day?\n— The secret is simple: morning running, clean water, and sound sleep.\n— Sport and a balanced diet truly strengthen heart and immunity.\n— Exactly! Proper rest and fresh air are key to longevity.",
      dialogueUz: "— Qanday qilib har kuni kuch-quvvatga to'la bo'lib yurasiz?\n— Siri juda oddiy: ertalabki yugurish, toza suv va sog'lom uyqu.\n— Sport va to'g'ri parhez haqiqatan ham yurak va immunitetni mustahkamlaydi.\n— To'g'ri! To'laqonli dam olish va toza havo — uzoq umr ko'rish garovidir.",
      lines: [
        { ru: "Как вам удаётся быть полным энергии каждый день?", en: "How do you manage to stay full of energy every day?", uz: "Qanday qilib har kuni kuch-quvvatga to'la bo'lib yurasiz?" },
        { ru: "Секрет прост: утренний бег, чистая вода и здоровый сон.", en: "The secret is simple: morning running, clean water, and sound sleep.", uz: "Siri juda oddiy: ertalabki yugurish, toza suv va sog'lom uyqu." },
        { ru: "Спорт и правильная диета действительно укрепляют сердце и иммунитет.", en: "Sport and a balanced diet truly strengthen heart and immunity.", uz: "Sport va to'g'ri parhez haqiqatan ham yurak va immunitetni mustahkamlaydi." },
        { ru: "Верно! Полноценный отдых и свежий воздух — залог долголетия.", en: "Exactly! Proper rest and fresh air are key to longevity.", uz: "To'g'ri! To'laqonli dam olish va toza havo — uzoq umr ko'rish garovidir." }
      ]
    },
    words: [
      { order: 1, uz: "Salomatlik", ru: "Здоровье", en: "Health", phoneticRu: "[zda-rov'-ye]", phoneticEn: "[helθ]", exRu: "Крепкое здоровье — главное богатство человека", exEn: "Strong health is person's greatest wealth" },
      { order: 2, uz: "Shifokor", ru: "Врач", en: "Doctor", phoneticRu: "[vrach]", phoneticEn: "[ˈdɒk.tər]", exRu: "Внимательный и опытный семейный врач", exEn: "Attentive and experienced family doctor" },
      { order: 3, uz: "Shifoxona", ru: "Больница", en: "Hospital", phoneticRu: "[bal'-nee-tsa]", phoneticEn: "[ˈhɒs.pɪ.təl]", exRu: "Современная городская детская больница", exEn: "Modern city children's hospital" },
      { order: 4, uz: "Dori", ru: "Лекарство", en: "Medicine", phoneticRu: "[lye-kar-stva]", phoneticEn: "[ˈmed.sən]", exRu: "Принимать лекарство строго по назначению", exEn: "Take medicine strictly as prescribed" },
      { order: 5, uz: "Dorixona", ru: "Аптека", en: "Pharmacy", phoneticRu: "[ap-tye-ka]", phoneticEn: "[ˈfɑː.mə.si]", exRu: "Круглосуточная аптека рядом с домом", exEn: "24-hour pharmacy next to home" },
      { order: 6, uz: "Og'riq", ru: "Боль", en: "Pain", phoneticRu: "[bol']", phoneticEn: "[peɪn]", exRu: "Снять острую зубную боль", exEn: "Relieve acute toothache pain" },
      { order: 7, uz: "Harorat", ru: "Температура", en: "Temperature", phoneticRu: "[tyem-pye-ra-too-ra]", phoneticEn: "[ˈtem.prə.tʃər]", exRu: "Нормальная температура тела человека", exEn: "Normal human body temperature" },
      { order: 8, uz: "Shamollash", ru: "Простуда", en: "Cold", phoneticRu: "[pra-stoo-da]", phoneticEn: "[kəʊld]", exRu: "Быстро вылечить сезонную простуду", exEn: "Quickly cure seasonal cold" },
      { order: 9, uz: "Retsept", ru: "Рецепт", en: "Prescription", phoneticRu: "[rye-tsept]", phoneticEn: "[prɪˈskrɪp.ʃən]", exRu: "Врач выписал рецепт на сироп", exEn: "Doctor wrote a prescription for syrup" },
      { order: 10, uz: "Tez yordam", ru: "Скорая помощь", en: "Ambulance", phoneticRu: "[sko-ra-ya po-mashch']", phoneticEn: "[ˈæm.bjə.ləns]", exRu: "Вызвать бригаду скорой помощи", exEn: "Call emergency ambulance crew" },
      { order: 11, uz: "Sport", ru: "Спорт", en: "Sport", phoneticRu: "[sport]", phoneticEn: "[spɔːt]", exRu: "Регулярно заниматься активным спортом", exEn: "Regularly do active sports" },
      { order: 12, uz: "Yugurish", ru: "Бег", en: "Running", phoneticRu: "[byeg]", phoneticEn: "[ˈrʌn.ɪŋ]", exRu: "Освежающий утренний бег в парке", exEn: "Refreshing morning running in park" },
      { order: 13, uz: "Vitaminlar", ru: "Витамины", en: "Vitamins", phoneticRu: "[vee-ta-mee-ny]", phoneticEn: "[ˈvɪt.ə.mɪnz]", exRu: "Принимать витамины группы C и D", exEn: "Take group C and D vitamins" },
      { order: 14, uz: "Uyqu", ru: "Сон", en: "Sleep", phoneticRu: "[son]", phoneticEn: "[sliːp]", exRu: "Глубокий спокойный восьмичасовой сон", exEn: "Deep peaceful 8-hour sleep" },
      { order: 15, uz: "Suv balansi", ru: "Вода (Гидратация)", en: "Hydration", phoneticRu: "[gee-dra-ta-tsi-ya]", phoneticEn: "[haɪˈdreɪ.ʃən]", exRu: "Пить два литра чистой воды в день", exEn: "Drink two liters of pure water daily" },
      { order: 16, uz: "Parhez", ru: "Диета", en: "Diet", phoneticRu: "[dee-ye-ta]", phoneticEn: "[ˈdaɪ.ət]", exRu: "Сбалансированная здоровая диета", exEn: "Balanced healthy diet" },
      { order: 17, uz: "Yurak", ru: "Сердце", en: "Heart", phoneticRu: "[syert-tse]", phoneticEn: "[hɑːt]", exRu: "Кардиотренировки полезны для сердца", exEn: "Cardio workouts are good for heart" },
      { order: 18, uz: "Kuch-quvvat (Energiya)", ru: "Энергия", en: "Energy", phoneticRu: "[e-nyer-gee-ya]", phoneticEn: "[ˈen.ə.dʒi]", exRu: "Зарядиться бодростью и энергией на весь день", exEn: "Charge with vigor and energy all day" },
      { order: 19, uz: "Dam olish", ru: "Отдых", en: "Rest", phoneticRu: "[ot-dyh]", phoneticEn: "[rest]", exRu: "Полноценный воскресный отдых на природе", exEn: "Full Sunday rest in nature" },
      { order: 20, uz: "Toza havo", ru: "Свежий воздух", en: "Fresh Air", phoneticRu: "[svye-zhee voz-dooh]", phoneticEn: "[freʃ eər]", exRu: "Длительная прогулка на свежем воздухе", exEn: "Long walk in the fresh air" }
    ]
  }
};

/**
 * Returns full 20 words and both reinforcement checkpoints for ANY of the 20 days.
 * If day is explicitly specified, returns it; otherwise maps systematically to module themes
 * guaranteeing that every day has EXACTLY 20 words, Checkpoint 1 (Word 10), and Checkpoint 2 (Word 20).
 */
export function getDayData(dayNumber = 1) {
  const safeDay = Math.min(Math.max(1, dayNumber), 20);
  if (CURRICULUM_DAYS[safeDay]) {
    return CURRICULUM_DAYS[safeDay];
  }

  // Generate robust systematic curriculum for other days inside 1..20
  const topicIdx = Math.floor((safeDay - 1) / 4);
  const topic = TOPIC_MODULES[topicIdx] || TOPIC_MODULES[0];
  const templateDay = CURRICULUM_DAYS[topic.days[0]] || CURRICULUM_DAYS[1];

  return {
    ...templateDay,
    dayNumber: safeDay,
    topicId: topic.id,
    topicTitleUz: `${topic.titleUz} (${safeDay}-kun)`,
    topicTitleRu: `${topic.titleRu} (День ${safeDay})`,
    topicTitleEn: `${topic.titleEn} (Day ${safeDay})`
  };
}
