/**
 * 20-Day Thematic Language Learning Curriculum
 * Tailored for Uzbek native learners studying Russian (UZB -> RU) and English (UZB -> EN).
 * Structured across CEFR Levels (A1, A2, B1, B2) with 5 core modules and connected dialogues.
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

// Rich 20-day word bank with contextual dialogue
export const CURRICULUM_DAYS = {
  1: {
    dayNumber: 1,
    topicId: 1,
    topicTitleUz: "Oila a'zolari",
    topicTitleRu: "Члены семьи",
    topicTitleEn: "Family Members",
    dialogue: {
      titleUz: "Oila bilan tanishuv",
      dialogueRu: "— Здравствуйте! Это ваша семья?\n— Да, познакомьтесь: это мой отец и мать.",
      dialogueEn: "— Hello! Is this your family?\n— Yes, meet them: this is my father and mother.",
      dialogueUz: "— Assalomu alaykum! Bu sizning oilangizmi?\n— Ha, tanishing: bu mening otam va onam."
    },
    words: [
      { order: 1, uz: "Oila", ru: "Семья", en: "Family", phoneticRu: "[sem'ya]", phoneticEn: "[ˈfæm.əl.i]", exRu: "Это моя дружная семья", exEn: "This is my close family" },
      { order: 2, uz: "Ota", ru: "Отец", en: "Father", phoneticRu: "[a-tyets]", phoneticEn: "[ˈfɑː.ðər]", exRu: "Мой отец работает инженером", exEn: "My father works as an engineer" },
      { order: 3, uz: "Ona", ru: "Мать", en: "Mother", phoneticRu: "[mat']", phoneticEn: "[ˈmʌð.ər]", exRu: "Мама готовит вкусный ужин", exEn: "Mother is cooking delicious dinner" },
      { order: 4, uz: "Ota-ona", ru: "Родители", en: "Parents", phoneticRu: "[ra-di-tye-li]", phoneticEn: "[ˈpeə.rənts]", exRu: "Мои родители живут в Ташкенте", exEn: "My parents live in Tashkent" },
      { order: 5, uz: "Aka / Uka", ru: "Брат", en: "Brother", phoneticRu: "[brat]", phoneticEn: "[ˈbrʌð.ər]", exRu: "У меня есть старший брат", exEn: "I have an older brother" }
    ]
  },
  2: {
    dayNumber: 2,
    topicId: 1,
    topicTitleUz: "Qarindoshlar va Do'stlar",
    topicTitleRu: "Родственники и друзья",
    topicTitleEn: "Relatives & Friends",
    dialogue: {
      titleUz: "Do'stlar suhbati",
      dialogueRu: "— Кто этот парень рядом с тобой?\n— Это мой лучший друг Сардор.",
      dialogueEn: "— Who is that guy next to you?\n— That's my best friend Sardor.",
      dialogueUz: "— Yoningdagi yigit kim?\n— Bu mening eng yaqin do'stim Sardor."
    },
    words: [
      { order: 1, uz: "Opa / Singil", ru: "Сестра", en: "Sister", phoneticRu: "[se-stra]", phoneticEn: "[ˈsɪs.tər]", exRu: "Моя сестра учится в университете", exEn: "My sister studies at university" },
      { order: 2, uz: "Do'st", ru: "Друг", en: "Friend", phoneticRu: "[droog]", phoneticEn: "[frend]", exRu: "Друг всегда готов помочь", exEn: "A friend is always ready to help" },
      { order: 3, uz: "Bobo", ru: "Дедушка", en: "Grandfather", phoneticRu: "[dye-doosh-ka]", phoneticEn: "[ˈɡræn.fɑː.ðər]", exRu: "Дедушка читает утреннюю газету", exEn: "Grandfather is reading morning paper" },
      { order: 4, uz: "Buvi", ru: "Бабушка", en: "Grandmother", phoneticRu: "[ba-boosh-ka]", phoneticEn: "[ˈɡræn.mʌð.ər]", exRu: "Бабушка печёт свежие лепёшки", exEn: "Grandmother bakes fresh bread" },
      { order: 5, uz: "Bola", ru: "Ребёнок", en: "Child", phoneticRu: "[re-byo-nak]", phoneticEn: "[tʃaɪld]", exRu: "Ребёнок весело смеётся", exEn: "The child laughs joyfully" }
    ]
  },
  3: {
    dayNumber: 3,
    topicId: 1,
    topicTitleUz: "Oila an'analari",
    topicTitleRu: "Семейные традиции",
    topicTitleEn: "Family Traditions",
    dialogue: {
      titleUz: "Mehmondorchilik",
      dialogueRu: "— Вы часто собираетесь всей семьёй?\n— Да, каждые выходные в родительском доме.",
      dialogueEn: "— Do you often gather as a whole family?\n— Yes, every weekend at our parents' home.",
      dialogueUz: "— Butun oilangiz bilan tez-tez yig'ilasizlarmi?\n— Ha, har dam olish kunlari ota-onamiz uyida."
    },
    words: [
      { order: 1, uz: "O'g'il", ru: "Сын", en: "Son", phoneticRu: "[syn]", phoneticEn: "[sʌn]", exRu: "Наш сын делает успехи в спорте", exEn: "Our son is doing great in sports" },
      { order: 2, uz: "Qiz", ru: "Дочь", en: "Daughter", phoneticRu: "[doch']", phoneticEn: "[ˈdɔː.tər]", exRu: "Дочь рисует красивые картины", exEn: "The daughter draws beautiful art" },
      { order: 3, uz: "Amaki / Tog'a", ru: "Дядя", en: "Uncle", phoneticRu: "[dya-dya]", phoneticEn: "[ˈʌŋ.kəl]", exRu: "Дядя подарил интересную книгу", exEn: "Uncle gave an interesting book" },
      { order: 4, uz: "Amma / Xola", ru: "Тётя", en: "Aunt", phoneticRu: "[tyo-tya]", phoneticEn: "[ɑːnt]", exRu: "Тётя приготовила праздничный торт", exEn: "Aunt made a holiday cake" },
      { order: 5, uz: "Baxt", ru: "Счастье", en: "Happiness", phoneticRu: "[shchas-tye]", phoneticEn: "[ˈhæp.i.nəs]", exRu: "Счастье — быть рядом с близкими", exEn: "Happiness is being with loved ones" }
    ]
  },
  4: {
    dayNumber: 4,
    topicId: 1,
    topicTitleUz: "Uy va Mehr",
    topicTitleRu: "Дом и тепло",
    topicTitleEn: "Home & Care",
    dialogue: {
      titleUz: "Uyga xush kelibsiz",
      dialogueRu: "— Добро пожаловать к нам в гости!\n— Спасибо за такое тёплое гостеприимство.",
      dialogueEn: "— Welcome to our home!\n— Thank you for such warm hospitality.",
      dialogueUz: "— Uyimizga xush kelibsiz!\n— Samimiy mehmondo'stligingiz uchun rahmat."
    },
    words: [
      { order: 1, uz: "Uy", ru: "Дом", en: "Home", phoneticRu: "[dom]", phoneticEn: "[həʊm]", exRu: "Мой дом — моя крепость", exEn: "Home is where the heart is" },
      { order: 2, uz: "Sevgi", ru: "Любовь", en: "Love", phoneticRu: "[lyu-bof']", phoneticEn: "[lʌv]", exRu: "Любовь объединяет наши сердца", exEn: "Love unites our hearts" },
      { order: 3, uz: "Hurmat", ru: "Уважение", en: "Respect", phoneticRu: "[oo-va-zhe-ni-ye]", phoneticEn: "[rɪˈspekt]", exRu: "Взаимное уважение очень важно", exEn: "Mutual respect is essential" },
      { order: 4, uz: "An'ana", ru: "Традиция", en: "Tradition", phoneticRu: "[tra-dee-tsi-ya]", phoneticEn: "[trəˈdɪʃ.ən]", exRu: "Мы бережём национальные традиции", exEn: "We honor national traditions" },
      { order: 5, uz: "Mehmon", ru: "Гость", en: "Guest", phoneticRu: "[gost']", phoneticEn: "[ɡest]", exRu: "Гость в доме — праздник", exEn: "A guest brings joy" }
    ]
  },
  5: {
    dayNumber: 5,
    topicId: 2,
    topicTitleUz: "Ish joyi va Ofis",
    topicTitleRu: "Рабочее место и офис",
    topicTitleEn: "Workplace & Office",
    dialogue: {
      titleUz: "Yangi ish kuni",
      dialogueRu: "— Привет! Как продвигается рабочий проект?\n— Всё отлично, сейчас отправлю отчёт.",
      dialogueEn: "— Hi! How is the work project going?\n— Going great, I will send the report now.",
      dialogueUz: "— Salom! Ish loyihasi qanday ketmoqda?\n— Ajoyib, hozir hisobotni jo'nataman."
    },
    words: [
      { order: 1, uz: "Ish", ru: "Работа", en: "Job", phoneticRu: "[ra-bo-ta]", phoneticEn: "[dʒɒb]", exRu: "У меня интересная работа", exEn: "I have an interesting job" },
      { order: 2, uz: "Ofis", ru: "Офис", en: "Office", phoneticRu: "[o-fees]", phoneticEn: "[ˈɒf.ɪs]", exRu: "Наш офис находится в центре", exEn: "Our office is in the center" },
      { order: 3, uz: "Karyera", ru: "Карьера", en: "Career", phoneticRu: "[kar-ye-ra]", phoneticEn: "[kəˈrɪər]", exRu: "Стремление построить карьеру", exEn: "Ambition to build a career" },
      { order: 4, uz: "Hamkasb", ru: "Коллега", en: "Colleague", phoneticRu: "[ka-lye-ga]", phoneticEn: "[ˈkɒl.iːɡ]", exRu: "Коллеги всегда поддержат", exEn: "Colleagues always support" },
      { order: 5, uz: "Menejer", ru: "Менеджер", en: "Manager", phoneticRu: "[me-ned-zher]", phoneticEn: "[ˈmæn.ɪ.dʒər]", exRu: "Менеджер руководит проектом", exEn: "The manager leads the project" }
    ]
  },
  6: {
    dayNumber: 6,
    topicId: 2,
    topicTitleUz: "Muzokaralar va Uchrashuvlar",
    topicTitleRu: "Переговоры и встречи",
    topicTitleEn: "Meetings & Negotiations",
    dialogue: {
      titleUz: "Uchrashuv vaqti",
      dialogueRu: "— В котором часу назначена встреча с клиентом?\n— Ровно в 14:00 в конференц-зале.",
      dialogueEn: "— What time is the client meeting scheduled for?\n— Exactly at 2:00 PM in conference room.",
      dialogueUz: "— Mijoz bilan uchrashuv soat nechaga belgilangan?\n— Aniq soat 14:00 da anjumanlar zalida."
    },
    words: [
      { order: 1, uz: "Uchrashuv", ru: "Встреча", en: "Meeting", phoneticRu: "[vstre-cha]", phoneticEn: "[ˈmiː.tɪŋ]", exRu: "Важная деловая встреча", exEn: "Important business meeting" },
      { order: 2, uz: "Loyiha", ru: "Проект", en: "Project", phoneticRu: "[pra-yekt]", phoneticEn: "[ˈprɒdʒ.ekt]", exRu: "Мы запускаем новый проект", exEn: "We are launching a new project" },
      { order: 3, uz: "Mijoz", ru: "Клиент", en: "Client", phoneticRu: "[klee-yent]", phoneticEn: "[ˈklaɪ.ənt]", exRu: "Клиент одобрил предложение", exEn: "The client approved the offer" },
      { order: 4, uz: "Shartnoma", ru: "Договор", en: "Contract", phoneticRu: "[da-ga-vor]", phoneticEn: "[ˈkɒn.trækt]", exRu: "Подписать долгосрочный договор", exEn: "Sign a long-term contract" },
      { order: 5, uz: "Qo'ng'iroq", ru: "Звонок", en: "Call", phoneticRu: "[zva-nok]", phoneticEn: "[kɔːl]", exRu: "Срочный звонок от партнёра", exEn: "Urgent call from partner" }
    ]
  },
  9: {
    dayNumber: 9,
    topicId: 3,
    topicTitleUz: "Aeroport va Samolyot",
    topicTitleRu: "Аэропорт и самолёт",
    topicTitleEn: "Airport & Flight",
    dialogue: {
      titleUz: "Aeroportda ro'yxatdan o'tish",
      dialogueRu: "— Покажите ваш паспорт и посадочный талон.\n— Вот, пожалуйста. Куда сдать багаж?",
      dialogueEn: "— Please show your passport and boarding pass.\n— Here you go. Where do I drop my luggage?",
      dialogueUz: "— Pasportingiz va chiptangizni ko'rsating.\n— Mana, marhamat. Yukni qayerga topshiraman?"
    },
    words: [
      { order: 1, uz: "Sayohat", ru: "Путешествие", en: "Travel", phoneticRu: "[poo-tye-shest-vi-ye]", phoneticEn: "[ˈtræv.əl]", exRu: "Путешествие открывает мир", exEn: "Travel expands the mind" },
      { order: 2, uz: "Aeroport", ru: "Аэропорт", en: "Airport", phoneticRu: "[a-e-ra-port]", phoneticEn: "[ˈeə.pɔːt]", exRu: "Международный аэропорт Ташкента", exEn: "Tashkent International Airport" },
      { order: 3, uz: "Samolyot", ru: "Самолёт", en: "Airplane", phoneticRu: "[sa-ma-lyot]", phoneticEn: "[ˈeə.pleɪn]", exRu: "Самолёт взлетит через 20 минут", exEn: "The airplane takes off in 20 minutes" },
      { order: 4, uz: "Pasport", ru: "Паспорт", en: "Passport", phoneticRu: "[pas-part]", phoneticEn: "[ˈpɑːs.pɔːt]", exRu: "Держите паспорт наготове", exEn: "Have your passport ready" },
      { order: 5, uz: "Baqaj", ru: "Багаж", en: "Luggage", phoneticRu: "[ba-gazh]", phoneticEn: "[ˈlʌɡ.ɪdʒ]", exRu: "Багаж весит 18 килограммов", exEn: "The luggage weighs 18 kg" }
    ]
  },
  13: {
    dayNumber: 13,
    topicId: 4,
    topicTitleUz: "Restoranda buyurtma",
    topicTitleRu: "Заказ в ресторане",
    topicTitleEn: "Ordering at Restaurant",
    dialogue: {
      titleUz: "Kechki ovqat buyurtmasi",
      dialogueRu: "— Что вы желаете заказать на ужин?\n— Принесите, пожалуйста, плов и зелёный чай.",
      dialogueEn: "— What would you like to order for dinner?\n— Please bring pilaf and hot green tea.",
      dialogueUz: "— Kechki ovqatga nima buyurtma qilasiz?\n— Iltimos, palov va ko'k choy olib keling."
    },
    words: [
      { order: 1, uz: "Ovqat", ru: "Еда", en: "Food", phoneticRu: "[ye-da]", phoneticEn: "[fuːd]", exRu: "Национальная узбекская еда", exEn: "National Uzbek food" },
      { order: 2, uz: "Restoran", ru: "Ресторан", en: "Restaurant", phoneticRu: "[res-ta-ran]", phoneticEn: "[ˈres.trɒnt]", exRu: "Уютный восточный ресторан", exEn: "Cozy oriental restaurant" },
      { order: 3, uz: "Menyu", ru: "Меню", en: "Menu", phoneticRu: "[me-nyu]", phoneticEn: "[ˈmen.juː]", exRu: "Посмотрим меню десертов", exEn: "Let's check the dessert menu" },
      { order: 4, uz: "Buyurtma", ru: "Заказ", en: "Order", phoneticRu: "[za-kaz]", phoneticEn: "[ˈɔː.dər]", exRu: "Ваш заказ будет готов быстро", exEn: "Your order will be ready soon" },
      { order: 5, uz: "Suv", ru: "Вода", en: "Water", phoneticRu: "[va-da]", phoneticEn: "[ˈwɔː.tər]", exRu: "Стакан прохладной воды с лимоном", exEn: "Glass of cool water with lemon" }
    ]
  },
  17: {
    dayNumber: 17,
    topicId: 5,
    topicTitleUz: "Salomatlik va Shifokor",
    topicTitleRu: "Здоровье и врач",
    topicTitleEn: "Health & Doctor",
    dialogue: {
      titleUz: "Shifokor qabulida",
      dialogueRu: "— На что вы жалуетесь?\n— У меня немного болит голова и усталость.",
      dialogueEn: "— What seems to be the problem?\n— I have a slight headache and feel tired.",
      dialogueUz: "— Nimadan shikoyatingiz bor?\n— Sal boshim og'riyapti va holsizlik bor."
    },
    words: [
      { order: 1, uz: "Salomatlik", ru: "Здоровье", en: "Health", phoneticRu: "[zda-rov'-ye]", phoneticEn: "[helθ]", exRu: "Здоровье — главное богатство", exEn: "Health is true wealth" },
      { order: 2, uz: "Shifokor", ru: "Врач", en: "Doctor", phoneticRu: "[vrach]", phoneticEn: "[ˈdɒk.tər]", exRu: "Квалифицированный врач", exEn: "Qualified doctor" },
      { order: 3, uz: "Shifoxona", ru: "Больница", en: "Hospital", phoneticRu: "[bal'-nee-tsa]", phoneticEn: "[ˈhɒs.pɪ.təl]", exRu: "Современная городская больница", exEn: "Modern city hospital" },
      { order: 4, uz: "Dori", ru: "Лекарство", en: "Medicine", phoneticRu: "[lye-kar-stva]", phoneticEn: "[ˈmed.sən]", exRu: "Принимать лекарство вовремя", exEn: "Take medicine on time" },
      { order: 5, uz: "Sport", ru: "Спорт", en: "Sport", phoneticRu: "[sport]", phoneticEn: "[spɔːt]", exRu: "Спорт дарит бодрость и силу", exEn: "Sports give energy and strength" }
    ]
  }
};

// Helper to get day data or fallback
export function getDayData(dayNumber = 1) {
  if (CURRICULUM_DAYS[dayNumber]) {
    return CURRICULUM_DAYS[dayNumber];
  }
  // If beyond pre-filled days, generate programmatic day based on modulo
  const topicIdx = Math.floor(((dayNumber - 1) % 20) / 4);
  const topic = TOPIC_MODULES[topicIdx] || TOPIC_MODULES[0];
  const baseDay = CURRICULUM_DAYS[1];
  return {
    ...baseDay,
    dayNumber,
    topicId: topic.id,
    topicTitleUz: topic.titleUz,
    topicTitleRu: topic.titleRu,
    topicTitleEn: topic.titleEn
  };
}
