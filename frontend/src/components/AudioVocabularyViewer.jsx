import React, { useState } from 'react';
import { Volume2, Sparkles, Globe, BookOpen } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function AudioVocabularyViewer({ topics }) {
  const [selectedTopicId, setSelectedTopicId] = useState(1);
  const [learningMode, setLearningMode] = useState('UZ_TO_RU'); // 'UZ_TO_RU' or 'UZ_TO_EN'
  const [playingId, setPlayingId] = useState(null);

  const targetLang = learningMode === 'UZ_TO_RU' ? 'RU' : 'EN';

  const playWordAudio = (wordItem) => {
    const textToSpeak = learningMode === 'UZ_TO_RU' ? wordItem.ru : wordItem.en;
    setPlayingId(wordItem.order);
    speechService.speak(textToSpeak, targetLang, () => {
      setPlayingId(null);
    });
  };

  const sampleVocab = {
    1: [
      { order: 1, uz: "Oila", ru: "Семья", en: "Family", phoneticRu: "[sem'ya]", phoneticEn: "[ˈfæm.əl.i]", exRu: "Это моя большая семья", exEn: "This is my big family" },
      { order: 2, uz: "Ota-ona", ru: "Родители", en: "Parents", phoneticRu: "[ra-di-tye-li]", phoneticEn: "[ˈpeə.rənts]", exRu: "Мои родители дома", exEn: "My parents are at home" },
      { order: 3, uz: "Ota", ru: "Отец", en: "Father", phoneticRu: "[a-tyets]", phoneticEn: "[ˈfɑː.ðər]", exRu: "Мой отец врач", exEn: "My father is a doctor" },
      { order: 4, uz: "Ona", ru: "Мать", en: "Mother", phoneticRu: "[mat']", phoneticEn: "[ˈmʌð.ər]", exRu: "Мама готовит обед", exEn: "Mother is cooking lunch" },
      { order: 5, uz: "Aka / Uka", ru: "Брат", en: "Brother", phoneticRu: "[brat]", phoneticEn: "[ˈbrʌð.ər]", exRu: "У меня есть брат", exEn: "I have a brother" },
      { order: 6, uz: "Opa / Singil", ru: "Сестра", en: "Sister", phoneticRu: "[se-stra]", phoneticEn: "[ˈsɪs.tər]", exRu: "Сестра читает книгу", exEn: "Sister is reading a book" },
      { order: 7, uz: "Do'st", ru: "Друг", en: "Friend", phoneticRu: "[droog]", phoneticEn: "[frend]", exRu: "Он мой лучший друг", exEn: "He is my best friend" },
      { order: 8, uz: "Bobo", ru: "Дедушка", en: "Grandfather", phoneticRu: "[dye-doosh-ka]", phoneticEn: "[ˈɡræn.fɑː.ðər]", exRu: "Дедушка рассказывает сказку", exEn: "Grandfather tells stories" },
      { order: 9, uz: "Buvi", ru: "Бабушка", en: "Grandmother", phoneticRu: "[ba-boosh-ka]", phoneticEn: "[ˈɡræn.mʌð.ər]", exRu: "Бабушка печёт пирог", exEn: "Grandmother bakes a pie" },
      { order: 10, uz: "Bola", ru: "Ребёнок", en: "Child", phoneticRu: "[re-byo-nak]", phoneticEn: "[tʃaɪld]", exRu: "Ребёнок играет во дворе", exEn: "The child plays outside" },
      { order: 11, uz: "O'g'il", ru: "Сын", en: "Son", phoneticRu: "[syn]", phoneticEn: "[sʌn]", exRu: "Их сын учится в школе", exEn: "Their son goes to school" },
      { order: 12, uz: "Qiz farzand", ru: "Дочь", en: "Daughter", phoneticRu: "[doch']", phoneticEn: "[ˈdɔː.tər]", exRu: "Дочь изучает языки", exEn: "The daughter learns languages" },
      { order: 13, uz: "Tog'a / Amaki", ru: "Дядя", en: "Uncle", phoneticRu: "[dya-dya]", phoneticEn: "[ˈʌŋ.kəl]", exRu: "Дядя приехал в гости", exEn: "Uncle came to visit" },
      { order: 14, uz: "Xola / Amma", ru: "Тётя", en: "Aunt", phoneticRu: "[tyo-tya]", phoneticEn: "[ɑːnt]", exRu: "Тётя живёт в Ташкенте", exEn: "Aunt lives in Tashkent" },
      { order: 15, uz: "Amakivachcha", ru: "Кузен", en: "Cousin", phoneticRu: "[koo-zen]", phoneticEn: "[ˈkʌz.ən]", exRu: "Мы с кузеном ровесники", exEn: "My cousin and I are peers" },
      { order: 16, uz: "Baxt", ru: "Счастье", en: "Happiness", phoneticRu: "[shchas-tye]", phoneticEn: "[ˈhæp.i.nəs]", exRu: "Семья — это счастье", exEn: "Family is true happiness" },
      { order: 17, uz: "Uy", ru: "Дом", en: "Home", phoneticRu: "[dom]", phoneticEn: "[həʊm]", exRu: "Добро пожаловать в наш дом", exEn: "Welcome to our home" },
      { order: 18, uz: "Sevgi", ru: "Любовь", en: "Love", phoneticRu: "[lyu-bof']", phoneticEn: "[lʌv]", exRu: "Любовь объединяет семью", exEn: "Love unites every family" },
      { order: 19, uz: "Hurmat", ru: "Уважение", en: "Respect", phoneticRu: "[oo-va-zhe-ni-ye]", phoneticEn: "[rɪˈspekt]", exRu: "Уважение к старшим", exEn: "Respect for your elders" },
      { order: 20, uz: "An'ana", ru: "Традиция", en: "Tradition", phoneticRu: "[tra-dee-tsi-ya]", phoneticEn: "[trəˈdɪʃ.ən]", exRu: "Это наша семейная традиция", exEn: "This is our family tradition" }
    ],
    2: [
      { order: 1, uz: "Ish", ru: "Работа", en: "Job", phoneticRu: "[ra-bo-ta]", phoneticEn: "[dʒɒb]", exRu: "Я люблю свою работу", exEn: "I enjoy my job" },
      { order: 2, uz: "Karyera", ru: "Карьера", en: "Career", phoneticRu: "[kar-ye-ra]", phoneticEn: "[kəˈrɪər]", exRu: "Успешная карьера", exEn: "Successful career" },
      { order: 3, uz: "Ofis", ru: "Офис", en: "Office", phoneticRu: "[o-fees]", phoneticEn: "[ˈɒf.ɪs]", exRu: "Офис в центре города", exEn: "Downtown office" },
      { order: 4, uz: "Hamkasb", ru: "Коллега", en: "Colleague", phoneticRu: "[ka-lye-ga]", phoneticEn: "[ˈkɒl.iːɡ]", exRu: "Надёжный коллега", exEn: "Supportive colleague" },
      { order: 5, uz: "Menejer", ru: "Менеджер", en: "Manager", phoneticRu: "[me-ned-zher]", phoneticEn: "[ˈmæn.ɪ.dʒər]", exRu: "Менеджер проекта", exEn: "The project manager" },
      { order: 6, uz: "Uchrashuv", ru: "Встреча", en: "Meeting", phoneticRu: "[vstre-cha]", phoneticEn: "[ˈmiː.tɪŋ]", exRu: "Важная деловая встреча", exEn: "Important business meeting" },
      { order: 7, uz: "Loyiha", ru: "Проект", en: "Project", phoneticRu: "[pra-yekt]", phoneticEn: "[ˈprɒdʒ.ekt]", exRu: "Новый инновационный проект", exEn: "New innovative project" },
      { order: 8, uz: "Xat / Email", ru: "Письмо", en: "Email", phoneticRu: "[pees'-mo]", phoneticEn: "[ˈiː.meɪl]", exRu: "Отправьте мне письмо", exEn: "Send me an email" },
      { order: 9, uz: "Qo'ng'iroq", ru: "Звонок", en: "Call", phoneticRu: "[zva-nok]", phoneticEn: "[kɔːl]", exRu: "Срочный звонок клиенту", exEn: "Urgent client call" },
      { order: 10, uz: "Shartnoma", ru: "Договор", en: "Contract", phoneticRu: "[da-ga-vor]", phoneticEn: "[ˈkɒn.trækt]", exRu: "Подписать контракт", exEn: "Sign the contract" },
      { order: 11, uz: "Kompaniya", ru: "Компания", en: "Company", phoneticRu: "[kam-pa-ni-ya]", phoneticEn: "[ˈkʌm.pə.ni]", exRu: "Международная компания", exEn: "International company" },
      { order: 12, uz: "Mijoz", ru: "Клиент", en: "Client", phoneticRu: "[klee-yent]", phoneticEn: "[ˈklaɪ.ənt]", exRu: "Довольный клиент", exEn: "Satisfied client" },
      { order: 13, uz: "Hisobot", ru: "Отчёт", en: "Report", phoneticRu: "[at-chot]", phoneticEn: "[rɪˈpɔːt]", exRu: "Годовой финансовый отчёт", exEn: "Annual financial report" },
      { order: 14, uz: "Maosh", ru: "Зарплата", en: "Salary", phoneticRu: "[zar-pla-ta]", phoneticEn: "[ˈsæl.ər.i]", exRu: "Достойная зарплата", exEn: "Fair salary" },
      { order: 15, uz: "Muvaffaqiyat", ru: "Успех", en: "Success", phoneticRu: "[oos-pyekh]", phoneticEn: "[səkˈses]", exRu: "Желаю вам успеха", exEn: "I wish you success" },
      { order: 16, uz: "Vazifa", ru: "Задача", en: "Task", phoneticRu: "[za-da-cha]", phoneticEn: "[tɑːsk]", exRu: "Главная задача дня", exEn: "Primary task of the day" },
      { order: 17, uz: "Jamoa", ru: "Команда", en: "Team", phoneticRu: "[ka-man-da]", phoneticEn: "[tiːm]", exRu: "Дружная команда", exEn: "Friendly team" },
      { order: 18, uz: "Kompensatsiya / Bonus", ru: "Премия", en: "Bonus", phoneticRu: "[pre-mi-ya]", phoneticEn: "[ˈbəʊ.nəs]", exRu: "Годовая премия", exEn: "Annual bonus" },
      { order: 19, uz: "Ish jadvali", ru: "График", en: "Schedule", phoneticRu: "[gra-fik]", phoneticEn: "[ˈʃedʒ.uːl]", exRu: "Гибкий график работы", exEn: "Flexible work schedule" },
      { order: 20, uz: "Tajriba", ru: "Опыт", en: "Experience", phoneticRu: "[o-pyt]", phoneticEn: "[ɪkˈspɪə.ri.əns]", exRu: "Большой практический опыт", exEn: "Rich practical experience" }
    ],
    3: [
      { order: 1, uz: "Sayohat", ru: "Путешествие", en: "Travel", phoneticRu: "[poo-tye-shest-vi-ye]", phoneticEn: "[ˈtræv.əl]", exRu: "Я люблю путешествовать", exEn: "I love to travel" },
      { order: 2, uz: "Aeroport", ru: "Аэропорт", en: "Airport", phoneticRu: "[a-e-ra-port]", phoneticEn: "[ˈeə.pɔːt]", exRu: "Мы прибыли в аэропорт", exEn: "We arrived at the airport" },
      { order: 3, uz: "Samolyot", ru: "Самолёт", en: "Airplane", phoneticRu: "[sa-ma-lyot]", phoneticEn: "[ˈeə.pleɪn]", exRu: "Самолёт взлетает вовремя", exEn: "Airplane takes off on time" },
      { order: 4, uz: "Pasport", ru: "Паспорт", en: "Passport", phoneticRu: "[pas-part]", phoneticEn: "[ˈpɑːs.pɔːt]", exRu: "Предъявите ваш паспорт", exEn: "Show your passport" },
      { order: 5, uz: "Mehmonxona", ru: "Отель", en: "Hotel", phoneticRu: "[a-tel']", phoneticEn: "[həʊˈtel]", exRu: "Забронировать номер в отеле", exEn: "Book a hotel room" },
      { order: 6, uz: "Chipta", ru: "Билет", en: "Ticket", phoneticRu: "[bee-lyet]", phoneticEn: "[ˈtɪk.ɪt]", exRu: "Электронный авиабилет", exEn: "Electronic plane ticket" },
      { order: 7, uz: "Baqaj", ru: "Багаж", en: "Luggage", phoneticRu: "[ba-gazh]", phoneticEn: "[ˈlʌɡ.ɪdʒ]", exRu: "Сдать багаж на стойке", exEn: "Drop luggage at the desk" },
      { order: 8, uz: "Shahar", ru: "Город", en: "City", phoneticRu: "[go-rat]", phoneticEn: "[ˈsɪt.i]", exRu: "Красивый древний город", exEn: "Beautiful ancient city" },
      { order: 9, uz: "Xarita", ru: "Карта", en: "Map", phoneticRu: "[kar-ta]", phoneticEn: "[mæp]", exRu: "Посмотреть карту метро", exEn: "Check the subway map" },
      { order: 10, uz: "Taksi", ru: "Такси", en: "Taxi", phoneticRu: "[tak-see]", phoneticEn: "[ˈtæk.si]", exRu: "Вызвать городское такси", exEn: "Call a city taxi" },
      { order: 11, uz: "Poyezd", ru: "Поезд", en: "Train", phoneticRu: "[po-yezd]", phoneticEn: "[treɪn]", exRu: "Скоростной поезд Афросиёб", exEn: "High-speed train" },
      { order: 12, uz: "Vokzal", ru: "Вокзал", en: "Station", phoneticRu: "[vak-zal]", phoneticEn: "[ˈsteɪ.ʃən]", exRu: "Центральный вокзал", exEn: "Central train station" },
      { order: 13, uz: "Dengiz", ru: "Море", en: "Sea", phoneticRu: "[mo-rye]", phoneticEn: "[siː]", exRu: "Отдых на тёплом море", exEn: "Holiday at warm sea" },
      { order: 14, uz: "Plyaj", ru: "Пляж", en: "Beach", phoneticRu: "[plyazh]", phoneticEn: "[biːtʃ]", exRu: "Песчаный пляж", exEn: "Sandy beach" },
      { order: 15, uz: "Tog'", ru: "Горы", en: "Mountains", phoneticRu: "[go-ry]", phoneticEn: "[ˈmaʊn.tɪnz]", exRu: "Поездка в горы Чимгана", exEn: "Trip to the mountains" },
      { order: 16, uz: "Ekskursiya", ru: "Экскурсия", en: "Tour", phoneticRu: "[eks-koor-si-ya]", phoneticEn: "[tʊər]", exRu: "Увлекательная экскурсия", exEn: "Fascinating city tour" },
      { order: 17, uz: "Gid", ru: "Гид", en: "Guide", phoneticRu: "[geed]", phoneticEn: "[ɡaɪd]", exRu: "Опытный местный гид", exEn: "Experienced local guide" },
      { order: 18, uz: "Kamera", ru: "Камера", en: "Camera", phoneticRu: "[ka-me-ra]", phoneticEn: "[ˈkæm.rə]", exRu: "Сделать фото на камеру", exEn: "Take photos on camera" },
      { order: 19, uz: "Esdalik", ru: "Сувенир", en: "Souvenir", phoneticRu: "[soo-ve-neer]", phoneticEn: "[ˌsuː.vənˈɪər]", exRu: "Купить сувениры на память", exEn: "Buy souvenirs" },
      { order: 20, uz: "Ta'til", ru: "Отпуск", en: "Vacation", phoneticRu: "[ot-poosk]", phoneticEn: "[veɪˈkeɪ.ʃən]", exRu: "Долгожданный летний отпуск", exEn: "Long-awaited vacation" }
    ],
    4: [
      { order: 1, uz: "Ovqat", ru: "Еда", en: "Food", phoneticRu: "[ye-da]", phoneticEn: "[fuːd]", exRu: "Вкусная традиционная еда", exEn: "Delicious traditional food" },
      { order: 2, uz: "Restoran", ru: "Ресторан", en: "Restaurant", phoneticRu: "[res-ta-ran]", phoneticEn: "[ˈres.trɒnt]", exRu: "Ужин в уютном ресторане", exEn: "Dinner at a cozy restaurant" },
      { order: 3, uz: "Menyu", ru: "Меню", en: "Menu", phoneticRu: "[me-nyu]", phoneticEn: "[ˈmen.juː]", exRu: "Пожалуйста, принесите меню", exEn: "Please bring the menu" },
      { order: 4, uz: "Buyurtma", ru: "Заказ", en: "Order", phoneticRu: "[za-kaz]", phoneticEn: "[ˈɔː.dər]", exRu: "Я готов сделать заказ", exEn: "I am ready to order" },
      { order: 5, uz: "Suv", ru: "Вода", en: "Water", phoneticRu: "[va-da]", phoneticEn: "[ˈwɔː.tər]", exRu: "Стакан чистой воды", exEn: "Glass of pure water" },
      { order: 6, uz: "Choy", ru: "Чай", en: "Tea", phoneticRu: "[chay]", phoneticEn: "[tiː]", exRu: "Зелёный чай в пиале", exEn: "Green hot tea" },
      { order: 7, uz: "Kofe", ru: "Кофе", en: "Coffee", phoneticRu: "[ko-fe]", phoneticEn: "[ˈkɒf.i]", exRu: "Чашка крепкого кофе", exEn: "Cup of strong coffee" },
      { order: 8, uz: "Non", ru: "Хлеб", en: "Bread", phoneticRu: "[khlyep]", phoneticEn: "[bred]", exRu: "Горячий узбекский хлеб", exEn: "Fresh hot bread" },
      { order: 9, uz: "Go'sht", ru: "Мясо", en: "Meat", phoneticRu: "[mya-sa]", phoneticEn: "[miːt]", exRu: "Сочное мясо на мангале", exEn: "Juicy grilled meat" },
      { order: 10, uz: "Osh / Palov", ru: "Плов", en: "Pilaf", phoneticRu: "[plof]", phoneticEn: "[pɪˈlæf]", exRu: "Традиционный узбекский плов", exEn: "Traditional Uzbek pilaf" },
      { order: 11, uz: "Shurva", ru: "Суп", en: "Soup", phoneticRu: "[soop]", phoneticEn: "[suːp]", exRu: "Горячий сытный суп", exEn: "Hot hearty soup" },
      { order: 12, uz: "Salat", ru: "Салат", en: "Salad", phoneticRu: "[sa-lat]", phoneticEn: "[ˈsæl.əd]", exRu: "Свежий овощной салат Ачик-Чучук", exEn: "Fresh vegetable salad" },
      { order: 13, uz: "Meva", ru: "Фрукты", en: "Fruit", phoneticRu: "[frook-ty]", phoneticEn: "[fruːt]", exRu: "Сладкие сочные фрукты", exEn: "Sweet fresh fruit" },
      { order: 14, uz: "Sabzavot", ru: "Овощи", en: "Vegetables", phoneticRu: "[o-va-shchi]", phoneticEn: "[ˈvedʒ.tə.bəlz]", exRu: "Спелые помидоры и огурцы", exEn: "Fresh vegetables" },
      { order: 15, uz: "Shirinlik", ru: "Десерт", en: "Dessert", phoneticRu: "[de-sert]", phoneticEn: "[dɪˈzɜːt]", exRu: "Вкусный десерт к чаю", exEn: "Delicious dessert" },
      { order: 16, uz: "Hisob", ru: "Счёт", en: "Check / Bill", phoneticRu: "[shchot]", phoneticEn: "[bɪl]", exRu: "Принесите счёт, пожалуйста", exEn: "The check, please" },
      { order: 17, uz: "Choypuli", ru: "Чаевые", en: "Tip", phoneticRu: "[cha-ye-vy-ye]", phoneticEn: "[tɪp]", exRu: "Оставить щедрые чаевые", exEn: "Leave a good tip" },
      { order: 18, uz: "Nonushta", ru: "Завтрак", en: "Breakfast", phoneticRu: "[zaf-trak]", phoneticEn: "[ˈbrek.fəst]", exRu: "Полезный утренний завтрак", exEn: "Healthy morning breakfast" },
      { order: 19, uz: "Tushlik", ru: "Обед", en: "Lunch", phoneticRu: "[a-byed]", phoneticEn: "[lʌntʃ]", exRu: "Время вкусного обеда", exEn: "Time for delicious lunch" },
      { order: 20, uz: "Kechki ovqat", ru: "Ужин", en: "Dinner", phoneticRu: "[oo-zhin]", phoneticEn: "[ˈdɪn.ər]", exRu: "Семейный тёплый ужин", exEn: "Warm family dinner" }
    ],
    5: [
      { order: 1, uz: "Salomatlik", ru: "Здоровье", en: "Health", phoneticRu: "[zda-rov'-ye]", phoneticEn: "[helθ]", exRu: "Берегите своё здоровье", exEn: "Take care of your health" },
      { order: 2, uz: "Shifokor", ru: "Врач", en: "Doctor", phoneticRu: "[vrach]", phoneticEn: "[ˈdɒk.tər]", exRu: "Консультация опытного врача", exEn: "Visit an experienced doctor" },
      { order: 3, uz: "Shifoxona", ru: "Больница", en: "Hospital", phoneticRu: "[bal'-nee-tsa]", phoneticEn: "[ˈhɒs.pɪ.təl]", exRu: "Современная городская больница", exEn: "Modern city hospital" },
      { order: 4, uz: "Dori", ru: "Лекарство", en: "Medicine", phoneticRu: "[lye-kar-stva]", phoneticEn: "[ˈmed.sən]", exRu: "Принять необходимое лекарство", exEn: "Take prescribed medicine" },
      { order: 5, uz: "Sport", ru: "Спорт", en: "Sport", phoneticRu: "[sport]", phoneticEn: "[spɔːt]", exRu: "Заниматься спортом по утрам", exEn: "Do sports in the morning" },
      { order: 6, uz: "Dorixona", ru: "Аптека", en: "Pharmacy", phoneticRu: "[ap-tye-ka]", phoneticEn: "[ˈfɑː.mə.si]", exRu: "Круглосуточная аптека рядом", exEn: "24-hour pharmacy nearby" },
      { order: 7, uz: "Retsept", ru: "Рецепт", en: "Prescription", phoneticRu: "[re-tsept]", phoneticEn: "[prɪˈskrɪp.ʃən]", exRu: "Рецепт от врача", exEn: "Doctor's prescription" },
      { order: 8, uz: "Mashq", ru: "Тренировка", en: "Workout", phoneticRu: "[tre-ni-rof-ka]", phoneticEn: "[ˈwɜːk.aʊt]", exRu: "Интенсивная тренировка в зале", exEn: "Intense gym workout" },
      { order: 9, uz: "Yugurish", ru: "Бег", en: "Running", phoneticRu: "[byek]", phoneticEn: "[ˈrʌn.ɪŋ]", exRu: "Утренняя пробежка в парке", exEn: "Morning running in the park" },
      { order: 10, uz: "Suv ichish", ru: "Питьевой режим", en: "Hydration", phoneticRu: "[pee-tye-voy]", phoneticEn: "[haɪˈdreɪ.ʃən]", exRu: "Пейте достаточно чистой воды", exEn: "Maintain daily hydration" },
      { order: 11, uz: "Vitaminlar", ru: "Витамины", en: "Vitamins", phoneticRu: "[vee-ta-mee-ny]", phoneticEn: "[ˈvɪt.ə.mɪnz]", exRu: "Комплекс полезных витаминов", exEn: "Daily essential vitamins" },
      { order: 12, uz: "Dam olish", ru: "Отдых", en: "Rest", phoneticRu: "[ot-dykh]", phoneticEn: "[rest]", exRu: "Полноценный ночной отдых", exEn: "Good night's rest" },
      { order: 13, uz: "Uyqu", ru: "Сон", en: "Sleep", phoneticRu: "[son]", phoneticEn: "[sliːp]", exRu: "Здоровый восьмичасовой сон", exEn: "Healthy 8-hour sleep" },
      { order: 14, uz: "Kayfiyat", ru: "Настроение", en: "Mood", phoneticRu: "[na-stra-ye-ni-ye]", phoneticEn: "[muːd]", exRu: "Отличное бодрое настроение", exEn: "Great positive mood" },
      { order: 15, uz: "Energiya", ru: "Энергия", en: "Energy", phoneticRu: "[e-ner-gi-ya]", phoneticEn: "[ˈen.ə.dʒi]", exRu: "Заряд бодрости и энергии", exEn: "Burst of positive energy" },
      { order: 16, uz: "Hamshira", ru: "Медсестра", en: "Nurse", phoneticRu: "[med-se-stra]", phoneticEn: "[nɜːs]", exRu: "Заботливая медсестра", exEn: "Caring nurse" },
      { order: 17, uz: "Tahlil", ru: "Анализ", en: "Medical test", phoneticRu: "[a-na-leez]", phoneticEn: "[ˈmed.ɪ.kəl test]", exRu: "Сдать анализы крови", exEn: "Take medical test" },
      { order: 18, uz: "Harorat", ru: "Температура", en: "Temperature", phoneticRu: "[tem-pe-ra-too-ra]", phoneticEn: "[ˈtem.prə.tʃər]", exRu: "Нормальная температура тела", exEn: "Normal body temperature" },
      { order: 19, uz: "Yurak", ru: "Сердце", en: "Heart", phoneticRu: "[ser-tse]", phoneticEn: "[hɑːt]", exRu: "Здоровое и крепкое сердце", exEn: "Healthy and strong heart" },
      { order: 20, uz: "Uzoq umr", ru: "Долголетие", en: "Longevity", phoneticRu: "[dal-ga-lye-ti-ye]", phoneticEn: "[lɒnˈdʒev.ə.ti]", exRu: "Секрет активного долголетия", exEn: "The secret to longevity" }
    ]
  };

  const currentTopicWords = sampleVocab[selectedTopicId] || sampleVocab[1];

  return (
    <div className="rounded-3xl glass-panel border border-slate-800 shadow-2xl p-6 space-y-6">
      {/* Header with Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Tabiiy Talaffuz
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              ● Web Speech API Faol
            </span>
          </div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-sky-400 animate-pulse" />
            Audio Lug'at & Jonli Talaffuz
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            O'zbek tiliga asoslangan so'zlar. Har bir so'zning sof inson ovozidagi talaffuzini eshiting.
          </p>
        </div>

        {/* Learning Pathway Switcher: UZB -> RU or UZB -> EN */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setLearningMode('UZ_TO_RU')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              learningMode === 'UZ_TO_RU'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇺🇿 ➔ 🇷🇺</span>
            <span>O'zbekcha ➔ Ruscha</span>
          </button>
          <button
            onClick={() => setLearningMode('UZ_TO_EN')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              learningMode === 'UZ_TO_EN'
                ? 'bg-gradient-to-r from-sky-500 to-emerald-600 text-white shadow-lg shadow-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇺🇿 ➔ 🇬🇧</span>
            <span>O'zbekcha ➔ Inglizcha</span>
          </button>
        </div>
      </div>

      {/* Topic Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {topics?.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTopicId(t.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              selectedTopicId === t.id
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            <span className="text-base">{t.icon}</span>
            <span>{t.titleUz || t.titleEn}</span>
          </button>
        ))}
      </div>

      {/* 20 Words Grid (UZB -> RU or UZB -> EN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentTopicWords.map((item) => {
          const targetWord = learningMode === 'UZ_TO_RU' ? item.ru : item.en;
          const targetPhonetic = learningMode === 'UZ_TO_RU' ? item.phoneticRu : item.phoneticEn;
          const targetEx = learningMode === 'UZ_TO_RU' ? item.exRu : item.exEn;
          const flag = learningMode === 'UZ_TO_RU' ? '🇷🇺' : '🇬🇧';

          return (
            <div
              key={item.order}
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/90 hover:border-sky-500/50 transition-all duration-300 group relative flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                    #{item.order} so'z
                  </span>
                  <button
                    onClick={() => playWordAudio(item)}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 transition flex items-center gap-1.5 text-xs font-bold shadow-md shadow-sky-500/10 active:scale-95"
                    title="Tabiiy ovozda tinglash"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingId === item.order ? 'animate-bounce text-emerald-400' : ''}`} />
                    <span>{playingId === item.order ? "Aytilmoqda..." : "Tinglash"}</span>
                  </button>
                </div>

                {/* Uzbek Base Word (Highlighted) */}
                <div className="mt-3">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                    <span>🇺🇿 O'zbekcha:</span>
                  </div>
                  <div className="text-xl font-black text-white group-hover:text-amber-300 transition">
                    {item.uz}
                  </div>
                </div>

                {/* Target Language Word */}
                <div className="mt-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-sky-400 flex items-center gap-1">
                    <span>{flag} {learningMode === 'UZ_TO_RU' ? 'Ruscha:' : 'Inglizcha:'}</span>
                  </div>
                  <div className="text-lg font-extrabold text-sky-200">
                    {targetWord}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {targetPhonetic}
                  </div>
                </div>
              </div>

              {/* Example sentence */}
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-300 italic">
                "{targetEx}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
