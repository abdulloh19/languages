package com.antigravity.languagebot.service;

import com.antigravity.languagebot.entity.*;
import com.antigravity.languagebot.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class DataInitializerService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializerService.class);

    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final DialogueRepository dialogueRepository;
    private final WordRepository wordRepository;
    private final UserLearningStateRepository learningStateRepository;

    public DataInitializerService(UserRepository userRepository,
                                  TopicRepository topicRepository,
                                  DialogueRepository dialogueRepository,
                                  WordRepository wordRepository,
                                  UserLearningStateRepository learningStateRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.dialogueRepository = dialogueRepository;
        this.wordRepository = wordRepository;
        this.learningStateRepository = learningStateRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (topicRepository.count() == 0) {
            log.info("Seeding 5 Topics...");
            seedTopics();
        }
        if (dialogueRepository.count() == 0) {
            log.info("Seeding 25 Dialogues...");
            seedDialogues();
        }
        if (wordRepository.count() == 0) {
            log.info("Seeding 100 Vocabulary Words across 5 topics...");
            seedWords();
        }
        cleanupFakerUsers();
        log.info("Data initialization complete! Real users: {}, topics: {}, words: {}, dialogues: {}",
                userRepository.count(), topicRepository.count(), wordRepository.count(), dialogueRepository.count());
    }

    private void seedTopics() {
        topicRepository.save(new Topic("FAMILY", "Семья и друзья", "Family & Friends", "Oila va do'stlar", "👨‍👩‍👧", 1));
        topicRepository.save(new Topic("WORK", "Работа и карьера", "Work & Career", "Ish va karyera", "💼", 2));
        topicRepository.save(new Topic("TRAVEL", "Путешествия", "Travel", "Sayohat", "✈️", 3));
        topicRepository.save(new Topic("FOOD", "Еда и рестораны", "Food & Restaurants", "Ovqat va restoran", "🍕", 4));
        topicRepository.save(new Topic("HEALTH", "Здоровье", "Health", "Salomatlik", "🏥", 5));
    }

    private void seedDialogues() {
        List<Topic> topics = topicRepository.findAllByOrderByDisplayOrderAsc();
        for (Topic topic : topics) {
            for (int i = 1; i <= 5; i++) {
                String titleRu = String.format("Диалог %d: %s", i, topic.getTitleRu());
                String titleEn = String.format("Dialogue %d: %s", i, topic.getTitleEn());
                String titleUz = String.format("Dialog %d: %s", i, topic.getTitleUz());

                String contentRu = switch (topic.getTopicKey()) {
                    case "FAMILY" -> switch (i) {
                        case 1 -> "— Привет! Это твоя семья на фото?\n— Да, это мои родители и младшая сестра.\n— Они очень похожи на тебя!";
                        case 2 -> "— Чем занимается твой брат?\n— Он учится в университете на инженера.\n— Здорово! А сколько ему лет?";
                        case 3 -> "— Вы часто собираетесь вместе по выходным?\n— Да, каждое воскресенье мы готовим праздничный семейный обед.\n— Прекрасная традиция!";
                        case 4 -> "— Твои друзья живут рядом?\n— Мой лучший друг живёт в соседнем доме, мы дружим с детства.\n— Настоящая дружба — это ценность.";
                        default -> "— Как здоровье твоей бабушки?\n— Спасибо, она чувствует себя замечательно и шлёт всем привет!\n— Передавай ей наилучшие пожелания!";
                    };
                    case "WORK" -> switch (i) {
                        case 1 -> "— Доброе утро! Вы новый менеджер проектов?\n— Да, меня зовут Алекс. Рад познакомиться с командой.\n— Добро пожаловать! Давайте начнём с брифинга.";
                        case 2 -> "— До какого срока мы должны сдать отчет?\n— Дедлайн в пятницу до 18:00.\n— Понял, приступаю к аналитике прямо сейчас.";
                        case 3 -> "— У нас запланирован созвон с клиентом в два часа?\n— Да, ссылку на встречу я отправил вам на почту.\n— Отлично, я подготовлю презентацию.";
                        case 4 -> "— Как продвигаются переговоры по новому контракту?\n— Мы согласовали основные условия, осталось подписать документы.\n— Отличная работа!";
                        default -> "— Поздравляю с повышением!\n— Большое спасибо! Это новая ответственность, но я готов.\n— Мы все в тебя верим!";
                    };
                    case "TRAVEL" -> switch (i) {
                        case 1 -> "— Здравствуйте, где находится стойка регистрации на рейс?\n— Пройдите прямо к стойке номер 14.\n— Спасибо! Сколько мест багажа разрешено?";
                        case 2 -> "— У вас есть свободные номера с видом на море?\n— Да, у нас свободен номер на пятом этаже с балконом.\n— Превосходно, мы берём его на три ночи.";
                        case 3 -> "— Подскажите, как доехать до исторического центра города?\n— Лучше всего сесть на метро или прогуляться пешком через парк.\n— Спасибо за совет!";
                        case 4 -> "— Сколько стоит билет на скоростной поезд?\n— Двадцать евро во втором классе.\n— Оформите, пожалуйста, один билет у окна.";
                        default -> "— Это было потрясающее путешествие!\n— Согласен, местные пейзажи и культура оставили яркие впечатления.\n— Куда поедем в следующий раз?";
                    };
                    case "FOOD" -> switch (i) {
                        case 1 -> "— Добрый вечер! Вы готовы сделать заказ?\n— Да, принесите, пожалуйста, крем-суп и пасту с морепродуктами.\n— Что-нибудь из напитков?";
                        case 2 -> "— Какое фирменное блюдо рекомендует шеф-повар?\n— Сегодня наш шеф рекомендует запечённую рыбу со свежими травами.\n— Звучит аппетитно, попробуем!";
                        case 3 -> "— Можно нам, пожалуйста, счёт?\n— Конечно, вы будете платить картой или наличными?\n— Картой, пожалуйста.";
                        case 4 -> "— Этот десерт просто великолепен!\n— Рад, что вам понравилось! Он готовится по традиционному рецепту.\n— Обязательно закажем ещё раз.";
                        default -> "— Хочешь приготовить ужин дома сегодня?\n— С удовольствием! Давай сделаем овощной салат и стейк.\n— Идеальный план, я куплю продукты.";
                    };
                    default -> switch (i) {
                        case 1 -> "— Как ваше самочувствие сегодня?\n— Чувствую себя намного лучше, температура спала.\n— Отлично, продолжайте принимать назначенные витамины.";
                        case 2 -> "— Вы регулярно занимаетесь спортом?\n— Да, я бегаю по утрам три раза в неделю и делаю разминку.\n— Физическая активность очень полезна для сердца.";
                        case 3 -> "— У меня немного болит голова после работы за компьютером.\n— Делайте перерывы каждые 45 минут и пейте больше чистой воды.\n— Хороший совет, спасибо!";
                        case 4 -> "— Доктор, результаты анализов уже готовы?\n— Да, все ключевые показатели в норме. Вы в отличной форме!\n— Какое облегчение, спасибо за заботу.";
                        default -> "— Здоровый сон — залог бодрости на весь день.\n— Полностью согласен, стараюсь ложиться спать до одиннадцати вечера.\n— И тогда каждое утро будет наполнено энергией!";
                    };
                };

                String contentEn = switch (topic.getTopicKey()) {
                    case "FAMILY" -> switch (i) {
                        case 1 -> "— Hello! Is this your family in the photo?\n— Yes, these are my parents and younger sister.\n— They look so much like you!";
                        case 2 -> "— What does your brother do?\n— He is studying at university to become an engineer.\n— Awesome! How old is he?";
                        case 3 -> "— Do you often gather together on weekends?\n— Yes, every Sunday we prepare a celebratory family dinner.\n— What a wonderful tradition!";
                        case 4 -> "— Do your friends live nearby?\n— My best friend lives next door; we've been friends since childhood.\n— True friendship is a treasure.";
                        default -> "— How is your grandmother's health?\n— Thank you, she feels wonderful and sends her warmest regards!\n— Please send her my best wishes!";
                    };
                    case "WORK" -> switch (i) {
                        case 1 -> "— Good morning! Are you the new project manager?\n— Yes, my name is Alex. Glad to meet the team.\n— Welcome! Let's begin with a briefing.";
                        case 2 -> "— What is the deadline for this report?\n— The deadline is Friday by 6 PM.\n— Understood, I'll start the analytics right away.";
                        case 3 -> "— Do we have a client call scheduled for two o'clock?\n— Yes, I emailed you the meeting link.\n— Perfect, I'll prepare the slide deck.";
                        case 4 -> "— How is the negotiation on the new contract progressing?\n— We agreed on the key terms; just signing documents remains.\n— Outstanding work!";
                        default -> "— Congratulations on your promotion!\n— Thank you so much! It's a new responsibility, but I'm ready.\n— We all believe in you!";
                    };
                    case "TRAVEL" -> switch (i) {
                        case 1 -> "— Excuse me, where is the check-in counter for this flight?\n— Go straight to counter number 14.\n— Thank you! How many pieces of luggage are allowed?";
                        case 2 -> "— Do you have any available rooms with a sea view?\n— Yes, we have a room on the fifth floor with a balcony.\n— Wonderful, we'll take it for three nights.";
                        case 3 -> "— Could you tell me how to get to the historic downtown?\n— The best way is to take the subway or stroll through the park.\n— Thanks for the tip!";
                        case 4 -> "— How much is a ticket for the express train?\n— Twenty euros in second class.\n— One window seat ticket, please.";
                        default -> "— That was an incredible trip!\n— I agree, the local scenery and culture left vivid impressions.\n— Where shall we travel next?";
                    };
                    case "FOOD" -> switch (i) {
                        case 1 -> "— Good evening! Are you ready to order?\n— Yes, please bring the cream soup and seafood pasta.\n— Anything to drink?";
                        case 2 -> "— What signature dish does the chef recommend?\n— Today our chef recommends the baked fish with fresh herbs.\n— Sounds delicious, let's try it!";
                        case 3 -> "— Could we have the bill, please?\n— Certainly, will you be paying by card or cash?\n— By card, please.";
                        case 4 -> "— This dessert is absolutely sublime!\n— Glad you enjoyed it! It's made using a traditional recipe.\n— We will definitely order it again.";
                        default -> "— Would you like to cook dinner at home tonight?\n— With pleasure! Let's make a crisp vegetable salad and steak.\n— Perfect plan, I'll buy the groceries.";
                    };
                    default -> switch (i) {
                        case 1 -> "— How are you feeling today?\n— Feeling much better, the fever has gone down.\n— Great, continue taking the prescribed vitamins.";
                        case 2 -> "— Do you exercise regularly?\n— Yes, I run three times a week in the morning and stretch.\n— Physical activity is so beneficial for heart health.";
                        case 3 -> "— I have a slight headache after working at the computer.\n— Take breaks every 45 minutes and drink plenty of fresh water.\n— Great advice, thank you!";
                        case 4 -> "— Doctor, are my test results ready?\n— Yes, all key indicators are normal. You're in great shape!\n— What a relief, thank you for your care.";
                        default -> "— Healthy sleep is the key to energy throughout the day.\n— Totally agree, I try to go to bed before eleven PM.\n— And then every morning will be full of energy!";
                    };
                };

                String contentUz = switch (topic.getTopicKey()) {
                    case "FAMILY" -> "— Salom! Suratdagi sizning oilangizmi?\n— Ha, bu ota-onam va singlim.\n— Ular sizga juda o'xshar ekan!";
                    case "WORK" -> "— Xayrli tong! Siz loyiha boshqaruvchisimisiz?\n— Ha, ismim Alex. Jamoa bilan tanishganimdan xursandman.\n— Xush kelibsiz!";
                    case "TRAVEL" -> "— Kechirasiz, ro'yxatdan o'tish joyi qayerda?\n— 14-stolga to'g'ri boring.\n— Rahmat! Qancha yuk ruxsat etilgan?";
                    case "FOOD" -> "— Xayrli kech! Buyurtma berishga tayyormisiz?\n— Ha, iltimos, sho'rva va dengiz mahsulotlari bilan pasta keltiring.\n— Ichimlikka nima buyurasiz?";
                    default -> "— Bugun o'zingizni qanday his qilyapsiz?\n— Anchagina yaxshiman, isitmam tushdi.\n— Juda yaxshi, buyurilgan vitaminlarni ichishda davom eting.";
                };

                dialogueRepository.save(new Dialogue(topic.getId(), i, titleRu, titleEn, titleUz, contentRu, contentEn, contentUz));
            }
        }
    }

    private void seedWords() {
        List<Topic> topics = topicRepository.findAllByOrderByDisplayOrderAsc();
        for (Topic topic : topics) {
            List<Word> words = createWordsForTopic(topic);
            wordRepository.saveAll(words);
        }
    }

    private List<Word> createWordsForTopic(Topic topic) {
        List<Word> list = new ArrayList<>();
        Long tid = topic.getId();

        String[][] rawData = switch (topic.getTopicKey()) {
            case "FAMILY" -> new String[][]{
                    {"Семья", "Family", "Oila", "семья", "[ˈfæm.əl.i]", "oila", "Это моя семья", "This is my family", "Bu mening oilam"},
                    {"Родители", "Parents", "Ota-ona", "родители", "[ˈpeə.rənts]", "ota-ona", "Мои родители дома", "My parents are at home", "Ota-onam uyda"},
                    {"Отец", "Father", "Ota", "отец", "[ˈfɑː.ðər]", "ota", "Мой отец врач", "My father is a doctor", "Otam shifokor"},
                    {"Мать", "Mother", "Ona", "мать", "[ˈmʌð.ər]", "ona", "Мать готовит обед", "Mother is cooking lunch", "Onam tushlik pishirmoqda"},
                    {"Брат", "Brother", "Aka / Uka", "брат", "[ˈbrʌð.ər]", "aka-uka", "У меня есть брат", "I have a brother", "Mening akam bor"},
                    {"Сестра", "Sister", "Opa / Singil", "сестра", "[ˈsɪs.tər]", "opa-singil", "Сестра читает книгу", "Sister is reading a book", "Singlim kitob o'qiyapti"},
                    {"Друг", "Friend", "Do'st", "друг", "[frend]", "do'st", "Он мой лучший друг", "He is my best friend", "U mening eng yaqin do'stim"},
                    {"Дедушка", "Grandfather", "Bobo", "дедушка", "[ˈɡræn.fɑː.ðər]", "bobo", "Дедушка рассказывает истории", "Grandfather tells stories", "Bobom hikoyalar aytadi"},
                    {"Бабушка", "Grandmother", "Buvi", "бабушка", "[ˈɡræn.mʌð.ər]", "buvi", "Бабушка печет пирог", "Grandmother bakes a pie", "Buvim pirog pishirmoqda"},
                    {"Ребёнок", "Child", "Bola", "ребёнок", "[tʃaɪld]", "bola", "Ребёнок играет в саду", "The child plays in the garden", "Bola bog'da o'ynamoqda"},
                    {"Сын", "Son", "O'g'il", "сын", "[sʌn]", "o'g'il", "Их сын ходит в школу", "Their son goes to school", "Ularning o'g'li maktabga boradi"},
                    {"Дочь", "Daughter", "Qiz farzand", "дочь", "[ˈdɔː.tər]", "qiz", "Дочь учит английский", "The daughter learns English", "Qizi ingliz tilini o'rganmoqda"},
                    {"Дядя", "Uncle", "Tog'a / Amaki", "дядя", "[ˈʌŋ.kəl]", "amaki", "Дядя приехал в гости", "Uncle came to visit", "Tog'am mehmonga keldi"},
                    {"Тётя", "Aunt", "Xola / Amma", "тётя", "[ɑːnt]", "xola", "Тётя живёт в Ташкенте", "Aunt lives in Tashkent", "Xolam Toshkentda yashaydi"},
                    {"Двоюродный брат", "Cousin", "Amakivachcha", "кузен", "[ˈkʌz.ən]", "amakivachcha", "Мы с кузеном ровесники", "My cousin and I are the same age", "Amakivachcham bilan tengdoshmiz"},
                    {"Счастье", "Happiness", "Baxt", "счастье", "[ˈhæp.i.nəs]", "baxt", "Семья — это счастье", "Family is happiness", "Oila bu baxt"},
                    {"Дом", "Home", "Uy", "дом", "[həʊm]", "uy", "Добро пожаловать домой", "Welcome home", "Uyga xush kelibsiz"},
                    {"Любовь", "Love", "Sevgi", "любовь", "[lʌv]", "sevgi", "Любовь объединяет нас", "Love unites us", "Sevgi bizni birlashtiradi"},
                    {"Уважение", "Respect", "Hurmat", "уважение", "[rɪˈspekt]", "hurmat", "Уважение к старшим", "Respect for elders", "Kattalarga hurmat"},
                    {"Традиция", "Tradition", "An'ana", "традиция", "[trəˈdɪʃ.ən]", "an'ana", "Это семейная традиция", "This is a family tradition", "Bu oilaviy an'ana"}
            };
            case "WORK" -> new String[][]{
                    {"Работа", "Job", "Ish", "работа", "[dʒɒb]", "ish", "Мне нравится моя работа", "I like my job", "Menga ishim yoqadi"},
                    {"Карьера", "Career", "Karyera", "карьера", "[kəˈrɪər]", "karyera", "Успешная карьера", "Successful career", "Muvaffaqiyatli karyera"},
                    {"Офис", "Office", "Ofis", "офис", "[ˈɒf.ɪs]", "ofis", "Наш офис в центре", "Our office is downtown", "Ofisimiz shahar markazida"},
                    {"Коллега", "Colleague", "Hamkasb", "коллега", "[ˈkɒl.iːɡ]", "hamkasb", "Мы с коллегой готовим отчет", "My colleague and I prepare the report", "Hamkasbim bilan hisobot tayyorlayapmiz"},
                    {"Менеджер", "Manager", "Menejer", "менеджер", "[ˈmæn.ɪ.dʒər]", "menejer", "Менеджер одобрил план", "The manager approved the plan", "Menejer rejani ma'qulladi"},
                    {"Встреча", "Meeting", "Uchrashuv", "встреча", "[ˈmiː.tɪŋ]", "uchrashuv", "Утренняя встреча", "Morning meeting", "Tonggi uchrashuv"},
                    {"Проект", "Project", "Loyiha", "проект", "[ˈprɒdʒ.ekt]", "loyiha", "Новый IT проект", "New IT project", "Yangi IT loyiha"},
                    {"Зарплата", "Salary", "Maosh", "зарплата", "[ˈsæl.ər.i]", "maosh", "Высокая зарплата", "High salary", "Yuqori maosh"},
                    {"Дедлайн", "Deadline", "Muddat", "дедлайн", "[ˈded.laɪn]", "muddat", "Дедлайн в понедельник", "The deadline is on Monday", "Muddat dushanba kuni"},
                    {"Контракт", "Contract", "Shartnoma", "контракт", "[ˈkɒn.trækt]", "shartnoma", "Подписать контракт", "Sign the contract", "Shartnomani imzolash"},
                    {"Команда", "Team", "Jamoa", "команда", "[tiːm]", "jamoa", "Сильная команда", "Strong team", "Kuchli jamoa"},
                    {"Задача", "Task", "Vazifa", "задача", "[tɑːsk]", "vazifa", "Важная задача", "Important task", "Muhim vazifa"},
                    {"Интервью", "Interview", "Suhbat", "интервью", "[ˈɪn.tə.vjuː]", "suhbat", "Пройти интервью", "Pass an interview", "Suhbatdan o'tish"},
                    {"Опыт", "Experience", "Tajriba", "опыт", "[ɪkˈspɪə.ri.əns]", "tajriba", "Большой опыт работы", "Extensive work experience", "Katta ish tajribasi"},
                    {"Навык", "Skill", "Ko'nikma", "навык", "[skɪl]", "ko'nikma", "Профессиональный навык", "Professional skill", "Kasbiy ko'nikma"},
                    {"Успех", "Success", "Muvaffaqiyat", "успех", "[səkˈses]", "muvaffaqiyat", "Достичь успеха", "Achieve success", "Muvaffaqiyatga erishish"},
                    {"Цель", "Goal", "Maqsad", "цель", "[ɡəʊl]", "maqsad", "Наша главная цель", "Our main goal", "Bizning asosiy maqsadimiz"},
                    {"Презентация", "Presentation", "Taqdimot", "презентация", "[ˌprez.ənˈteɪ.ʃən]", "taqdimot", "Подготовить презентацию", "Prepare a presentation", "Taqdimot tayyorlash"},
                    {"Клиент", "Client", "Mijoz", "клиент", "[ˈklaɪ.ənt]", "mijoz", "Довольный клиент", "Satisfied client", "Mamnun mijoz"},
                    {"Отчёт", "Report", "Hisobot", "отчёт", "[rɪˈpɔːt]", "hisobot", "Ежемесячный отчёт", "Monthly report", "Oylik hisobot"}
            };
            case "TRAVEL" -> new String[][]{
                    {"Путешествие", "Travel", "Sayohat", "путешествие", "[ˈtræv.əl]", "sayohat", "Я люблю путешествовать", "I love to travel", "Men sayohat qilishni yaxshi ko'raman"},
                    {"Аэропорт", "Airport", "Aeroport", "аэропорт", "[ˈeə.pɔːt]", "aeroport", "Мы едем в аэропорт", "We are going to the airport", "Biz aeroportga boryapmiz"},
                    {"Самолёт", "Airplane", "Samolyot", "самолёт", "[ˈeə.pleɪn]", "samolyot", "Самолёт взлетает", "The airplane is taking off", "Samolyot havoga ko'tarilmoqda"},
                    {"Паспорт", "Passport", "Pasport", "паспорт", "[ˈpɑːs.pɔːt]", "pasport", "Покажите ваш паспорт", "Show your passport", "Pasportingizni ko'rsating"},
                    {"Билет", "Ticket", "Chipta", "билет", "[ˈtɪk.ɪt]", "chipta", "Билет на поезд", "Train ticket", "Poyezd chiptasi"},
                    {"Отель", "Hotel", "Mehmonxona", "отель", "[həʊˈtel]", "mehmonxona", "Забронировать отель", "Book a hotel", "Mehmonxonani band qilish"},
                    {"Багаж", "Luggage", "Yuk", "багаж", "[ˈlʌɡ.ɪdʒ]", "yuk", "Где мой багаж?", "Where is my luggage?", "Mening yukim qayerda?"},
                    {"Виза", "Visa", "Viza", "виза", "[ˈviː.zə]", "viza", "Туристическая виза", "Tourist visa", "Sayyohlik vizasi"},
                    {"Пляж", "Beach", "Plyaj", "пляж", "[biːtʃ]", "plyaj", "Песчаный пляж", "Sandy beach", "Qumli plyaj"},
                    {"Горы", "Mountains", "Tog'lar", "горы", "[ˈmaʊn.tɪnz]", "tog'lar", "Поход в горы", "Trip to the mountains", "Tog'larga sayr"},
                    {"Город", "City", "Shahar", "город", "[ˈsɪt.i]", "shahar", "Красивый старый город", "Beautiful old city", "Chiroyli qadimiy shahar"},
                    {"Карта", "Map", "Xarita", "карта", "[mæp]", "xarita", "Смотреть на карту", "Look at the map", "Xaritaga qarash"},
                    {"Гид", "Guide", "Gid / Yo'lboshchi", "гид", "[ɡaɪd]", "gid", "Наш экскурсовод", "Our tour guide", "Bizning yo'lboshchimiz"},
                    {"Музей", "Museum", "Muzey", "музей", "[mjuːˈziː.əm]", "muzey", "Исторический музей", "History museum", "Tarixiy muzey"},
                    {"Поезд", "Train", "Poyezd", "поезд", "[treɪn]", "poyezd", "Скоростной поезд", "High-speed train", "Tezyurar poyezd"},
                    {"Море", "Sea", "Dengiz", "море", "[siː]", "dengiz", "Тёплое море", "Warm sea", "Iliq dengiz"},
                    {"Остров", "Island", "Orol", "остров", "[ˈaɪ.lənd]", "orol", "Тропический остров", "Tropical island", "Tropik orol"},
                    {"Приключение", "Adventure", "Sarguzasht", "приключение", "[ədˈven.tʃər]", "sarguzasht", "Увлекательное приключение", "Exciting adventure", "Qiziqarli sarguzasht"},
                    {"Сувенир", "Souvenir", "Esdalik sovg'a", "сувенир", "[ˌsuː.vənˈɪər]", "esdalik", "Купить сувениры", "Buy souvenirs", "Esdalik sovg'alar sotib olish"},
                    {"Фотография", "Photo", "Surat", "фотография", "[ˈfəʊ.təʊ]", "surat", "Сделать красивое фото", "Take a nice photo", "Chiroyli suratga olish"}
            };
            case "FOOD" -> new String[][]{
                    {"Еда", "Food", "Ovqat", "еда", "[fuːd]", "ovqat", "Вкусная еда", "Delicious food", "Mazali ovqat"},
                    {"Ресторан", "Restaurant", "Restoran", "ресторан", "[ˈres.trɒnt]", "restoran", "Ужинать в ресторане", "Dine in a restaurant", "Restoranda kechki ovqatlanish"},
                    {"Меню", "Menu", "Menyu", "меню", "[ˈmen.juː]", "menyu", "Пожалуйста, дайте меню", "Please give me the menu", "Iltimos, menyuni bering"},
                    {"Заказ", "Order", "Buyurtma", "заказ", "[ˈɔː.dər]", "buyurtma", "Сделать заказ", "Place an order", "Buyurtma berish"},
                    {"Вода", "Water", "Suv", "вода", "[ˈwɔː.tər]", "suv", "Стакан холодной воды", "Glass of cold water", "Bir stakan sovuq suv"},
                    {"Кофе", "Coffee", "Qahva", "кофе", "[ˈkɒf.i]", "qahva", "Чашка горячего кофе", "Cup of hot coffee", "Bir finjon issiq qahva"},
                    {"Чай", "Tea", "Choy", "чай", "[tiː]", "choy", "Зелёный чай", "Green tea", "Ko'k choy"},
                    {"Хлеб", "Bread", "Non", "хлеб", "[bred]", "non", "Свежий хлеб", "Fresh bread", "Yangi non"},
                    {"Мясо", "Meat", "Go'sht", "мясо", "[miːt]", "go'sht", "Жареное мясо", "Roast meat", "Qovurilgan go'sht"},
                    {"Рыба", "Fish", "Baliq", "рыба", "[fɪʃ]", "baliq", "Свежая рыба", "Fresh fish", "Yangi baliq"},
                    {"Суп", "Soup", "Sho'rva", "суп", "[suːp]", "sho'rva", "Горячий суп", "Hot soup", "Issiq sho'rva"},
                    {"Салат", "Salad", "Salat", "салат", "[ˈsæl.əd]", "salat", "Овощной салат", "Vegetable salad", "Sabzavotli salat"},
                    {"Сыр", "Cheese", "Pishloq", "сыр", "[tʃiːz]", "pishloq", "Твёрдый сыр", "Hard cheese", "Qattiq pishloq"},
                    {"Фрукты", "Fruit", "Meva", "фрукты", "[fruːt]", "meva", "Свежие фрукты", "Fresh fruit", "Yangi mevalar"},
                    {"Овощи", "Vegetables", "Sabzavotlar", "овощи", "[ˈvedʒ.tə.bəlz]", "sabzavot", "Полезные овощи", "Healthy vegetables", "Foydali sabzavotlar"},
                    {"Десерт", "Dessert", "Desert", "десерт", "[dɪˈzɜːt]", "desert", "Шоколадный десерт", "Chocolate dessert", "Shokoladli desert"},
                    {"Завтрак", "Breakfast", "Nonushta", "завтрак", "[ˈbrek.fəst]", "nonushta", "Вкусный завтрак", "Tasty breakfast", "Mazali nonushta"},
                    {"Обед", "Lunch", "Tushlik", "обед", "[lʌntʃ]", "tushlik", "Время обеда", "Lunch time", "Tushlik vaqti"},
                    {"Ужин", "Dinner", "Kechki ovqat", "ужин", "[ˈdɪn.ər]", "kechki ovqat", "Семейный ужин", "Family dinner", "Oilaviy kechki ovqat"},
                    {"Счёт", "Bill", "Hisob", "счёт", "[bɪl]", "hisob", "Принесите счёт, пожалуйста", "Bring the bill, please", "Iltimos, hisobni olib keling"}
            };
            default -> new String[][]{
                    {"Здоровье", "Health", "Salomatlik", "здоровье", "[helθ]", "salomatlik", "Крепкое здоровье", "Good health", "Mustahkam salomatlik"},
                    {"Врач", "Doctor", "Shifokor", "врач", "[ˈdɒk.tər]", "shifokor", "Опытный врач", "Experienced doctor", "Tajribali shifokor"},
                    {"Больница", "Hospital", "Shifoxona", "больница", "[ˈhɒs.pɪ.təl]", "shifoxona", "Городская больница", "City hospital", "Shahar shifoxonasi"},
                    {"Лекарство", "Medicine", "Dori", "лекарство", "[ˈmed.sən]", "dori", "Принимать лекарство", "Take medicine", "Dori ichish"},
                    {"Аптека", "Pharmacy", "Dorixona", "аптека", "[ˈfɑː.mə.si]", "dorixona", "Круглосуточная аптека", "24-hour pharmacy", "Tunu-kun dorixona"},
                    {"Боль", "Pain", "Og'riq", "боль", "[peɪn]", "og'riq", "Головная боль", "Headache pain", "Bosh og'rig'i"},
                    {"Спорт", "Sport", "Sport", "спорт", "[spɔːt]", "sport", "Заниматься спортом", "Do sports", "Sport bilan shug'ullanish"},
                    {"Бег", "Running", "Yugurish", "бег", "[ˈrʌn.ɪŋ]", "yugurish", "Утренний бег", "Morning running", "Tonggi yugurish"},
                    {"Витамины", "Vitamins", "Vitaminlar", "витамины", "[ˈvɪt.ə.mɪnz]", "vitaminlar", "Комплекс витаминов", "Vitamin complex", "Vitaminlar to'plami"},
                    {"Сон", "Sleep", "Uyqu", "сон", "[sliːp]", "uyqu", "Глубокий здоровый сон", "Deep healthy sleep", "Chuqur sog'lom uyqu"},
                    {"Вода", "Hydration", "Suv balansi", "гидратация", "[haɪˈdreɪ.ʃən]", "suv balansi", "Пить достаточно воды", "Drink enough water", "Yetarlicha suv ichish"},
                    {"Диета", "Diet", "Parhez", "диета", "[ˈdaɪ.ət]", "parhez", "Сбалансированная диета", "Balanced diet", "Muvozanatli parhez"},
                    {"Сердце", "Heart", "Yurak", "сердце", "[hɑːt]", "yurak", "Здоровое сердце", "Healthy heart", "Sog'lom yurak"},
                    {"Энергия", "Energy", "Energiya", "энергия", "[ˈen.ə.dʒi]", "energiya", "Полон энергии", "Full of energy", "Kuch-quvvatga to'la"},
                    {"Отдых", "Rest", "Dam olish", "отдых", "[rest]", "dam olish", "Полноценный отдых", "Proper rest", "To'laqonli dam olish"},
                    {"Привычка", "Habit", "Odat", "привычка", "[ˈhæb.ɪt]", "odat", "Полезная привычка", "Healthy habit", "Foydali odat"},
                    {"Температура", "Temperature", "Harorat", "температура", "[ˈtem.prə.tʃər]", "harorat", "Нормальная температура", "Normal temperature", "Me'yordagi harorat"},
                    {"Простуда", "Cold", "Shamollash", "простуда", "[kəʊld]", "shamollash", "Быстро вылечить простуду", "Quickly cure a cold", "Shamollashni tez davolash"},
                    {"Иммунитет", "Immunity", "Immunitet", "иммунитет", "[ɪˈmjuː.nə.ti]", "immunitet", "Укреплять иммунитет", "Boost immunity", "Immunitetni mustahkamlash"},
                    {"Свежий воздух", "Fresh Air", "Toza havo", "свежий воздух", "[freʃ eər]", "toza havo", "Прогулка на свежем воздухе", "Walk in the fresh air", "Toza havoda sayr"}
            };
        };

        for (int i = 0; i < rawData.length; i++) {
            String[] r = rawData[i];
            list.add(new Word(tid, i + 1, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]));
        }
        return list;
    }

    private void cleanupFakerUsers() {
        List<User> fakeUsers = userRepository.findAll().stream()
                .filter(u -> u.getTelegramId() != null && u.getTelegramId() >= 100001L && u.getTelegramId() <= 100100L)
                .toList();
        if (!fakeUsers.isEmpty()) {
            log.info("Removing {} faker users to keep strictly real users...", fakeUsers.size());
            for (User fu : fakeUsers) {
                learningStateRepository.findByUserId(fu.getId()).ifPresent(learningStateRepository::delete);
                userRepository.delete(fu);
            }
            log.info("Faker users successfully removed. Only real users remain.");
        }
    }
}
