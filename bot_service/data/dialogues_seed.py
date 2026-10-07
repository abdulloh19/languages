import json

DIALOGUES_DATA = [
    # 1. TAXI (3 Scenarios)
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Aeroportdan mehmonxonaga taksi chaqirish",
        "description_uz": "Siz aeroportga kelib tushdingiz va mehmonxonagacha taksi haydovchisi bilan narx va manzilni kelishyapsiz.",
        "participants": "Yo'lovchi (Siz) & Taksi haydovchisi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Haydovchi",
                "target_line": "Hello! Do you need a taxi to the city center?",
                "uzbek_translation": "Salom! Shahar markaziga taksi kerakmi?",
                "key_vocab": [{"word": "need", "meaning": "kerak bo'lmoq"}, {"word": "city center", "meaning": "shahar markazi"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Yes, please. How much does it cost to get to the Grand Hotel?",
                "uzbek_translation": "Ha, iltimos. Grand mehmonxonasiga borish qancha turadi?",
                "key_vocab": [{"word": "how much", "meaning": "qancha"}, {"word": "cost", "meaning": "turadi / narxi"}]
            },
            {
                "order_index": 2,
                "speaker": "Haydovchi",
                "target_line": "It is about twenty dollars with tax and luggage included.",
                "uzbek_translation": "Soliq va yuk bilan birga taxminan yigirma dollar bo'ladi.",
                "key_vocab": [{"word": "luggage", "meaning": "yuk, chamadon"}, {"word": "included", "meaning": "ichiga olgan"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Great! Can I pay with a credit card?",
                "uzbek_translation": "Ajoyib! Plastik karta bilan to'lasam bo'ladimi?",
                "key_vocab": [{"word": "pay", "meaning": "to'lamoq"}, {"word": "credit card", "meaning": "bank kartasi"}]
            },
            {
                "order_index": 4,
                "speaker": "Haydovchi",
                "target_line": "Yes, card payment is accepted. Put your luggage in the trunk, please.",
                "uzbek_translation": "Ha, karta qabul qilinadi. Yuklaringizni yukxonaga (bagajga) qo'ying, marhamat.",
                "key_vocab": [{"word": "accepted", "meaning": "qabul qilinadi"}, {"word": "trunk", "meaning": "yukxona (bagaj)"}]
            }
        ]
    },
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Tirbandlik va yo'l haqida so'rash",
        "description_uz": "Yo'lda tirbandlik borligini ko'rib, haydovchidan qancha vaqt ketishini so'rayapsiz.",
        "participants": "Yo'lovchi (Siz) & Haydovchi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Excuse me, is there usually heavy traffic at this hour?",
                "uzbek_translation": "Kechirasiz, odatda bu vaqtda tirbandlik kuchli bo'ladimi?",
                "key_vocab": [{"word": "traffic", "meaning": "yo'l harakati/tirbandlik"}, {"word": "heavy", "meaning": "kuchli, og'ir"}]
            },
            {
                "order_index": 1,
                "speaker": "Haydovchi",
                "target_line": "Yes, rush hour just started, but I know a shortcut through the parkway.",
                "uzbek_translation": "Ha, eng tirband soat boshlandi, lekin men xiyobon orqali aylanma qisqa yo'lni bilaman.",
                "key_vocab": [{"word": "rush hour", "meaning": "eng tig'iz payt"}, {"word": "shortcut", "meaning": "qisqa yo'l"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "That would be wonderful because I have an important meeting at three.",
                "uzbek_translation": "Ajoyib bo'lardi, chunki soat uchda muhim uchrashuvim bor.",
                "key_vocab": [{"word": "wonderful", "meaning": "ajoyib"}, {"word": "meeting", "meaning": "uchrashuv"}]
            },
            {
                "order_index": 3,
                "speaker": "Haydovchi",
                "target_line": "Do not worry, we will arrive in fifteen minutes safely.",
                "uzbek_translation": "Xavotir olmang, o'n besh daqiqada xavfsiz yetib boramiz.",
                "key_vocab": [{"word": "arrive", "meaning": "yetib bormoq"}, {"word": "safely", "meaning": "xavfsiz, bexatar"}]
            }
        ]
    },
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Yo'l chetida to'xtashni so'rash",
        "description_uz": "Belgilangan manzilga yaqinlashganda haydovchidan qulay joyda to'xtashini so'rash.",
        "participants": "Yo'lovchi (Siz) & Haydovchi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Could you please pull over near that pharmacy on the right?",
                "uzbek_translation": "Iltimos, o'ng tarafdagi dorixona yonida to'xtata olasizmi?",
                "key_vocab": [{"word": "pull over", "meaning": "yo'l chetiga to'xtamoq"}, {"word": "pharmacy", "meaning": "dorixona"}]
            },
            {
                "order_index": 1,
                "speaker": "Haydovchi",
                "target_line": "Sure, right next to the entrance.",
                "uzbek_translation": "Albatta, to'g'ri kiraverishning yonida.",
                "key_vocab": [{"word": "entrance", "meaning": "kirish joyi"}, {"word": "next to", "meaning": "yonida"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Here is twenty dollars. Please keep the change.",
                "uzbek_translation": "Mana yigirma dollar. Qaytimi sizga qolsin (choypuli).",
                "key_vocab": [{"word": "keep the change", "meaning": "qaytimini olib qoling"}]
            },
            {
                "order_index": 3,
                "speaker": "Haydovchi",
                "target_line": "Thank you very much! Have a pleasant day!",
                "uzbek_translation": "Katta rahmat! Kuningiz xayrli o'tsin!",
                "key_vocab": [{"word": "pleasant", "meaning": "yoqimli, xayrli"}]
            }
        ]
    },

    # 2. HOTEL (3 Scenarios)
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Xonani ro'yxatdan o'tkazish (Check-in)",
        "description_uz": "Mehmonxona resepshnida oldindan bron qilingan xonaga ro'yxatdan o'tish jarayoni.",
        "participants": "Mehmon (Siz) & Resepshn xodimi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Resepshn",
                "target_line": "Good afternoon! Welcome to Sunrise Hotel. How may I assist you?",
                "uzbek_translation": "Xayrli kun! Sunrise mehmonxonasiga xush kelibsiz. Sizga qanday yordam bera olaman?",
                "key_vocab": [{"word": "welcome", "meaning": "xush kelibsiz"}, {"word": "assist", "meaning": "yordam bermoq"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Hello, I have a reservation under the name Alimov for three nights.",
                "uzbek_translation": "Salom, men Alimov nomiga uch kechaga xona bron qilgan edim.",
                "key_vocab": [{"word": "reservation", "meaning": "bron, buyurtma"}, {"word": "nights", "meaning": "kechalar/tunlar"}]
            },
            {
                "order_index": 2,
                "speaker": "Resepshn",
                "target_line": "Yes, I see your booking. May I have your passport and credit card?",
                "uzbek_translation": "Ha, buyurtmangizni ko'ryapman. Pasportingiz va bank kartangizni olsam bo'ladimi?",
                "key_vocab": [{"word": "booking", "meaning": "buyurtma"}, {"word": "passport", "meaning": "pasport"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Here you go. Does the room price include breakfast?",
                "uzbek_translation": "Mana marhamat. Xona narxiga nonushta kiradimi?",
                "key_vocab": [{"word": "price", "meaning": "narx"}, {"word": "breakfast", "meaning": "nonushta"}]
            },
            {
                "order_index": 4,
                "speaker": "Resepshn",
                "target_line": "Yes, breakfast is served on the second floor from 7 to 10 AM. Here is your key card.",
                "uzbek_translation": "Ha, nonushta ikkinchi qavatda soat 7 dan 10 gacha beriladi. Mana xonangiz kartasi.",
                "key_vocab": [{"word": "key card", "meaning": "elektron kalit"}, {"word": "served", "meaning": "tortiladi, xizmat qilinadi"}]
            }
        ]
    },
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Xona xizmatidan sochiq va tozalash so'rash",
        "description_uz": "Xonangizga qo'shimcha sochiq va Wi-Fi parolini bilish uchun resepshnga qo'ng'iroq qilish.",
        "participants": "Mehmon (Siz) & Xizmatchi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Xizmatchi",
                "target_line": "Front desk, how can I help you?",
                "uzbek_translation": "Resepshn, sizga qanday yordam berishim mumkin?",
                "key_vocab": [{"word": "front desk", "meaning": "qabulxona/resepshn"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Could you please send extra clean towels to room 305?",
                "uzbek_translation": "305-xonaga qo'shimcha toza sochiqlar yubora olasizmi?",
                "key_vocab": [{"word": "extra", "meaning": "qo'shimcha"}, {"word": "towels", "meaning": "sochiqlar"}]
            },
            {
                "order_index": 2,
                "speaker": "Xizmatchi",
                "target_line": "Certainly, our housekeeping team will bring them in a few minutes.",
                "uzbek_translation": "Albatta, xona xizmati xodimlari bir necha daqiqada keltirishadi.",
                "key_vocab": [{"word": "housekeeping", "meaning": "xona tozalash xizmati"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Also, what is the Wi-Fi password for guests?",
                "uzbek_translation": "Shuningdek, mehmonlar uchun Wi-Fi paroli nima?",
                "key_vocab": [{"word": "password", "meaning": "parol"}, {"word": "guests", "meaning": "mehmonlar"}]
            },
            {
                "order_index": 4,
                "speaker": "Xizmatchi",
                "target_line": "The network name is SunriseGuest and the password is on your key envelope.",
                "uzbek_translation": "Tarmoq nomi SunriseGuest, parol esa kalit konvertingiz ustida yozilgan.",
                "key_vocab": [{"word": "network", "meaning": "tarmoq"}, {"word": "envelope", "meaning": "konvert"}]
            }
        ]
    },
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Mehmonxonadan chiqish (Check-out) va taksi buyurtma qilish",
        "description_uz": "Safar oxirida to'lovni yakunlash va aeroportga transfer so'rash.",
        "participants": "Mehmon (Siz) & Resepshn",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "I would like to check out now from room 412.",
                "uzbek_translation": "Men hozir 412-xonadan chiqmoqchiman (check-out qilmoqchiman).",
                "key_vocab": [{"word": "check out", "meaning": "mehmonxonadan chiqish"}]
            },
            {
                "order_index": 1,
                "speaker": "Resepshn",
                "target_line": "Did you enjoy your stay with us? Any mini-bar usage?",
                "uzbek_translation": "Mehmonxonamiz sizga ma'qul keldimi? Mini-bardan foydalandingizmi?",
                "key_vocab": [{"word": "stay", "meaning": "turar joy/yashash muddati"}, {"word": "mini-bar", "meaning": "mini-bar"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Everything was perfect, no mini-bar. Could you call a taxi to the airport?",
                "uzbek_translation": "Hammasi a'lo darajada edi, mini-bar ishlatmadim. Aeroportga taksi chaqirib bera olasizmi?",
                "key_vocab": [{"word": "perfect", "meaning": "mukammal, a'lo"}]
            },
            {
                "order_index": 3,
                "speaker": "Resepshn",
                "target_line": "Already done! The taxi will be waiting outside in five minutes.",
                "uzbek_translation": "Bajarildi! Taksi besh daqiqada tashqarida kutib turadi.",
                "key_vocab": [{"word": "waiting", "meaning": "kutib turish"}, {"word": "outside", "meaning": "tashqarida"}]
            }
        ]
    },

    # 3. RESTAURANT (3 Scenarios)
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Stol buyurtma qilish va menyu so'rash",
        "description_uz": "Restoranga kirib deraza yonidagi stolga o'tirish va menyuni ko'rish.",
        "participants": "Mijoz (Siz) & Ofitsiant",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Ofitsiant",
                "target_line": "Good evening! Table for how many people?",
                "uzbek_translation": "Xayrli oqshom! Necha kishilik stol kerak?",
                "key_vocab": [{"word": "table", "meaning": "stol"}, {"word": "people", "meaning": "odamlar"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "A table for two by the window, please.",
                "uzbek_translation": "Deraza yonidan ikki kishilik stol, iltimos.",
                "key_vocab": [{"word": "by the window", "meaning": "deraza yonida"}]
            },
            {
                "order_index": 2,
                "speaker": "Ofitsiant",
                "target_line": "Right this way. Here are the menus. Can I bring you some water to start?",
                "uzbek_translation": "Bu yoqqa yuring. Mana menyular. Boshlanishiga suv keltiraymi?",
                "key_vocab": [{"word": "menu", "meaning": "menyu"}, {"word": "water", "meaning": "suv"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Still water with lemon, please. What is your special dish today?",
                "uzbek_translation": "Gazsiz suv limon bilan, iltimos. Bugungi maxsus taomingiz nima?",
                "key_vocab": [{"word": "still water", "meaning": "gazsiz suv"}, {"word": "special dish", "meaning": "maxsus taom"}]
            }
        ]
    },
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Ovqat buyurtma qilish va go'sht tayyorlanishini tanlash",
        "description_uz": "Asosiy taomni tanlash va steykning pishirilish darajasini aytish.",
        "participants": "Mijoz (Siz) & Ofitsiant",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Ofitsiant",
                "target_line": "Are you ready to order your main course?",
                "uzbek_translation": "Asosiy taomni buyurtma berishga tayyormisiz?",
                "key_vocab": [{"word": "ready", "meaning": "tayyor"}, {"word": "main course", "meaning": "asosiy taom"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "I will have the grilled steak with mashed potatoes.",
                "uzbek_translation": "Men qovurilgan steyk va kartoshka pyuresi olaman.",
                "key_vocab": [{"word": "grilled steak", "meaning": "grilda pishgan steyk"}, {"word": "mashed potatoes", "meaning": "kartoshka pyuresi"}]
            },
            {
                "order_index": 2,
                "speaker": "Ofitsiant",
                "target_line": "How would you like your steak cooked: rare, medium, or well done?",
                "uzbek_translation": "Steykingiz qanday pishirilishini xohlaysiz: xomroq, o'rtacha yoki yaxshi pishgan?",
                "key_vocab": [{"word": "medium", "meaning": "o'rtacha pishgan"}, {"word": "well done", "meaning": "to'liq yaxshi pishgan"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Medium, please. And make sure the salad has no nuts, I am allergic.",
                "uzbek_translation": "O'rtacha pishgan, iltimos. Salatta yong'oq bo'lmasin, menda allergiya bor.",
                "key_vocab": [{"word": "allergic", "meaning": "allergiyasi bor"}, {"word": "nuts", "meaning": "yong'oqlar"}]
            }
        ]
    },
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Hisobni so'rash (Check please) va to'lash",
        "description_uz": "Tushlikdan so'ng hisob-kitob qilish va kartadan to'lov qilish.",
        "participants": "Mijoz (Siz) & Ofitsiant",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Excuse me, could we get the check, please?",
                "uzbek_translation": "Kechirasiz, hisobni olib kela olasizmi, iltimos?",
                "key_vocab": [{"word": "check / bill", "meaning": "hisob varaqasi"}]
            },
            {
                "order_index": 1,
                "speaker": "Ofitsiant",
                "target_line": "Of course! Together or separate?",
                "uzbek_translation": "Albatta! Birgalikdami yoki alohida-alohida?",
                "key_vocab": [{"word": "together", "meaning": "birgalikda"}, {"word": "separate", "meaning": "alohida"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Together, please. The food was delicious!",
                "uzbek_translation": "Birgalikda, iltimos. Ovqat juda mazali edi!",
                "key_vocab": [{"word": "delicious", "meaning": "juda mazali"}]
            },
            {
                "order_index": 3,
                "speaker": "Ofitsiant",
                "target_line": "Thank you! I will bring the portable card machine right away.",
                "uzbek_translation": "Rahmat! Hozir ko'chma karta terminalini olib kelaman.",
                "key_vocab": [{"word": "card machine", "meaning": "to'lov terminali"}]
            }
        ]
    },

    # 4. AIRPORT (3 Scenarios)
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Parvozga ro'yxatdan o'tish va yuk topshirish",
        "description_uz": "Reysga ro'yxatdan o'tish peshtaxtasida yukni topshirish va o'rindiq tanlash.",
        "participants": "Yo'lovchi (Siz) & Aviakompaniya xodimi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Xodim",
                "target_line": "Good morning. May I see your ticket and passport?",
                "uzbek_translation": "Xayrli tong. Chiptangiz va pasportingizni ko'rsam bo'ladimi?",
                "key_vocab": [{"word": "ticket", "meaning": "chipta"}, {"word": "passport", "meaning": "pasport"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Here they are. I have one suitcase to check in and one carry-on backpack.",
                "uzbek_translation": "Mana ular. Menda topshirish uchun bitta chamadon va bitta qo'l yuki ryukzaki bor.",
                "key_vocab": [{"word": "suitcase", "meaning": "chamadon"}, {"word": "carry-on", "meaning": "qo'l yuki"}]
            },
            {
                "order_index": 2,
                "speaker": "Xodim",
                "target_line": "Please place your suitcase on the scale. Would you prefer a window or aisle seat?",
                "uzbek_translation": "Chamadonni taroziga qo'ying, iltimos. Deraza yonidagi yoki yo'lak yonidagi o'rindiqni afzal ko'rasizmi?",
                "key_vocab": [{"word": "scale", "meaning": "tarozi"}, {"word": "window seat", "meaning": "deraza yonidagi o'rindiq"}, {"word": "aisle seat", "meaning": "yo'lak bo'yidagi o'rindiq"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "A window seat, please.",
                "uzbek_translation": "Deraza yonidagi o'rindiq, iltimos.",
                "key_vocab": [{"word": "prefer", "meaning": "afzal ko'rmoq"}]
            },
            {
                "order_index": 4,
                "speaker": "Xodim",
                "target_line": "Here is your boarding pass. Gate 14, boarding starts at 10:15.",
                "uzbek_translation": "Mana sizning samolyotga chiqish taloningiz. 14-darvoza (gate), chiqish soat 10:15 da boshlanadi.",
                "key_vocab": [{"word": "boarding pass", "meaning": "chiqish taloni"}, {"word": "gate", "meaning": "chiqish darvozasi"}]
            }
        ]
    },
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Xavfsizlik tekshiruvidan o'tish (Security check)",
        "description_uz": "Noutbuk, kamar va suyuqliklarni xavfsizlik lentasiga qo'yish.",
        "participants": "Yo'lovchi (Siz) & Xavfsizlik xodimi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Xavfsizlik",
                "target_line": "Please remove your belt, coat, and take your laptop out of the bag.",
                "uzbek_translation": "Iltimos, kamaringizni, paltongizni yeching va noutbukni sumkadan chiqaring.",
                "key_vocab": [{"word": "remove", "meaning": "yechmoq, olib tashlamoq"}, {"word": "belt", "meaning": "kamar"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Do I need to take off my shoes as well?",
                "uzbek_translation": "Oyoq kiyimimni ham yechishim kerakmi?",
                "key_vocab": [{"word": "take off", "meaning": "yechmoq"}, {"word": "shoes", "meaning": "poyabzal"}]
            },
            {
                "order_index": 2,
                "speaker": "Xavfsizlik",
                "target_line": "No, just step through the metal detector when the green light is on.",
                "uzbek_translation": "Yo'q, faqat yashil chiroq yonganda metall detektordan o'ting.",
                "key_vocab": [{"word": "metal detector", "meaning": "metall qidirgich"}, {"word": "step through", "meaning": "orqali qadam qo'ymoq"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Understood. Thank you.",
                "uzbek_translation": "Tushundim. Rahmat.",
                "key_vocab": [{"word": "understood", "meaning": "tushunildi"}]
            }
        ]
    },
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Reys kechikishi haqida ma'lumot olish",
        "description_uz": "Parvoz taxtasida reys kechikkanini ko'rib, axborot markazidan sababini so'rash.",
        "participants": "Yo'lovchi (Siz) & Axborot xodimi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Excuse me, Flight TK 370 to London is delayed. Do you know how long?",
                "uzbek_translation": "Kechirasiz, Londonga uchadigan TK 370 reysi kechikmoqda. Qancha vaqtga ekanini bilasizmi?",
                "key_vocab": [{"word": "flight", "meaning": "parvoz/reys"}, {"word": "delayed", "meaning": "kechiktirilgan"}]
            },
            {
                "order_index": 1,
                "speaker": "Xodim",
                "target_line": "Due to bad weather conditions, it is delayed by two hours.",
                "uzbek_translation": "Noqulay ob-havo sharoiti tufayli ikki soatga kechiktirildi.",
                "key_vocab": [{"word": "due to", "meaning": "tufayli, sababli"}, {"word": "weather conditions", "meaning": "ob-havo sharoiti"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Will meals or vouchers be provided during the waiting period?",
                "uzbek_translation": "Kutish vaqtida ovqat yoki vaucherlar beriladimi?",
                "key_vocab": [{"word": "vouchers", "meaning": "vaucherlar/talonlar"}, {"word": "provided", "meaning": "ta'minlanadi"}]
            },
            {
                "order_index": 3,
                "speaker": "Xodim",
                "target_line": "Yes, please show your boarding pass at the airline desk for a free snack voucher.",
                "uzbek_translation": "Ha, bepul tamaddi vaucheri uchun aviakompaniya peshtaxtasida chiqish talonini ko'rsating.",
                "key_vocab": [{"word": "free snack", "meaning": "bepul yengil tamaddi"}]
            }
        ]
    },

    # 5. SHOPPING (3 Scenarios)
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Kiyim do'konida o'lcham va rang so'rash",
        "description_uz": "Do'konda o'zingizga yoqqan ko'ylakning boshqa o'lchami va rangini so'rash.",
        "participants": "Xaridor (Siz) & Sotuvchi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Excuse me, do you have this blue sweater in medium size?",
                "uzbek_translation": "Kechirasiz, mana bu ko'k sviterning o'rtacha (M) o'lchami bormi?",
                "key_vocab": [{"word": "sweater", "meaning": "sviter"}, {"word": "medium size", "meaning": "o'rtacha o'lcham (M)"}]
            },
            {
                "order_index": 1,
                "speaker": "Sotuvchi",
                "target_line": "Let me check the stock. Yes, here is a medium one.",
                "uzbek_translation": "Omborni tekshirib ko'ray. Ha, mana o'rtacha o'lchami.",
                "key_vocab": [{"word": "check", "meaning": "tekshirmoq"}, {"word": "stock", "meaning": "ombor/zaxira"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Where is the fitting room? I would like to try it on.",
                "uzbek_translation": "Kiyib ko'rish xonasi qayerda? Buni kiyib ko'rmoqchi edim.",
                "key_vocab": [{"word": "fitting room", "meaning": "kiyib ko'rish xonasi"}, {"word": "try on", "meaning": "kiyib ko'rmoq"}]
            },
            {
                "order_index": 3,
                "speaker": "Sotuvchi",
                "target_line": "The fitting rooms are straight ahead on your left.",
                "uzbek_translation": "Kiyib ko'rish xonalari to'g'riga yurganda chap tomonda.",
                "key_vocab": [{"word": "straight ahead", "meaning": "to'g'riga qarab"}]
            }
        ]
    },
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Narx va chegirma haqida so'rash",
        "description_uz": "Kiyimga chegirma bor-yo'qligini bilish.",
        "participants": "Xaridor (Siz) & Sotuvchi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Is this jacket on sale today?",
                "uzbek_translation": "Bu kurtkaga bugun chegirma bormi?",
                "key_vocab": [{"word": "jacket", "meaning": "kurtka"}, {"word": "on sale", "meaning": "chegirmada"}]
            },
            {
                "order_index": 1,
                "speaker": "Sotuvchi",
                "target_line": "Yes, there is a twenty percent discount on all outerwear.",
                "uzbek_translation": "Ha, barcha ustki kiyimlarga yigirma foiz chegirma bor.",
                "key_vocab": [{"word": "discount", "meaning": "chegirma"}, {"word": "outerwear", "meaning": "ustki kiyim"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "That is wonderful! How much is it with the discount?",
                "uzbek_translation": "Ajoyib! Chegirma bilan narxi qancha bo'ladi?",
                "key_vocab": [{"word": "how much", "meaning": "qancha"}]
            },
            {
                "order_index": 3,
                "speaker": "Sotuvchi",
                "target_line": "It was eighty dollars, now it is only sixty-four.",
                "uzbek_translation": "Sakson dollar edi, hozir esa atigi oltmish to'rt dollar.",
                "key_vocab": [{"word": "only", "meaning": "faqat, atigi"}]
            }
        ]
    },
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Mahsulotni almashtirish yoki qaytarish",
        "description_uz": "Kichik bo'lib qolgan ko'ylakni chek bilan qaytarish yoki almashtirish.",
        "participants": "Xaridor (Siz) & Sotuvchi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Hello, I bought this shirt yesterday, but it is too tight. Can I exchange it?",
                "uzbek_translation": "Salom, bu ko'ylakni kecha sotib olgan edim, lekin u juda tor. Buni almashtira olamanmi?",
                "key_vocab": [{"word": "exchange", "meaning": "almashtirmoq"}, {"word": "tight", "meaning": "tor"}]
            },
            {
                "order_index": 1,
                "speaker": "Sotuvchi",
                "target_line": "Do you still have the receipt and the price tag attached?",
                "uzbek_translation": "Sizda to'lov cheki va uning narx yorlig'i bormi?",
                "key_vocab": [{"word": "receipt", "meaning": "to'lov cheki"}, {"word": "tag", "meaning": "yorliq (etiketka)"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Yes, here is the receipt and the tag is still on the shirt.",
                "uzbek_translation": "Ha, mana chek va yorliq hali ham ko'ylakda turibdi.",
                "key_vocab": [{"word": "still on", "meaning": "hali ham ustida"}]
            },
            {
                "order_index": 3,
                "speaker": "Sotuvchi",
                "target_line": "Perfect. You can choose a larger size or get a full refund.",
                "uzbek_translation": "A'lo. Siz kattaroq o'lcham tanlashingiz yoki pulingizni to'liq qaytarib olishingiz mumkin.",
                "key_vocab": [{"word": "larger size", "meaning": "kattaroq o'lcham"}, {"word": "refund", "meaning": "pulni qaytarish"}]
            }
        ]
    },

    # 6. DOCTOR (3 Scenarios)
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Shifokor qabulida alomatlarni (simptomlarni) aytish",
        "description_uz": "Bosh og'rig'i va tomoq og'rig'i shikoyati bilan shifokorga murojaat qilish.",
        "participants": "Bemor (Siz) & Shifokor",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Shifokor",
                "target_line": "Good morning. What symptoms are you experiencing today?",
                "uzbek_translation": "Xayrli tong. Bugun o'zingizda qanday alomatlarni sezyapsiz?",
                "key_vocab": [{"word": "symptoms", "meaning": "alomatlar (simptomlar)"}, {"word": "experiencing", "meaning": "boshdan kechirayotgan"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "I have had a severe headache and sore throat since yesterday evening.",
                "uzbek_translation": "Kecha kechqurundan beri qattiq bosh og'rig'i va tomoq og'rig'im bor.",
                "key_vocab": [{"word": "headache", "meaning": "bosh og'rig'i"}, {"word": "sore throat", "meaning": "tomoq og'rig'i"}]
            },
            {
                "order_index": 2,
                "speaker": "Shifokor",
                "target_line": "Do you also have a fever or a cough?",
                "uzbek_translation": "Haroratingiz (isitma) yoki yo'tal ham bormi?",
                "key_vocab": [{"word": "fever", "meaning": "isitma, harorat"}, {"word": "cough", "meaning": "yo'tal"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Yes, my temperature was 38 degrees this morning.",
                "uzbek_translation": "Ha, bugun ertalab haroratim 38 daraja edi.",
                "key_vocab": [{"word": "temperature", "meaning": "harorat"}]
            },
            {
                "order_index": 4,
                "speaker": "Shifokor",
                "target_line": "Let me examine your throat and listen to your chest.",
                "uzbek_translation": "Tomog'ingizni ko'rib, ko'kragingizni (o'pkangizni) eshitib ko'raychi.",
                "key_vocab": [{"word": "examine", "meaning": "ko'rikdan o'tkazmoq"}, {"word": "chest", "meaning": "ko'krak qafasi"}]
            }
        ]
    },
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Dorixonada retsept bo'yicha dori olish",
        "description_uz": "Shifokor yozib bergan retsept bilan dorixonaga borish va qabul qilish qoidasini so'rash.",
        "participants": "Mijoz (Siz) & Farmatsevt",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Hello, I have a prescription from my doctor for antibiotics.",
                "uzbek_translation": "Salom, menda shifokorimdan antibiotiklar uchun retsept bor.",
                "key_vocab": [{"word": "prescription", "meaning": "retsept"}, {"word": "antibiotics", "meaning": "antibiotiklar"}]
            },
            {
                "order_index": 1,
                "speaker": "Farmatsevt",
                "target_line": "Here is the medicine. Take one pill twice a day after meals.",
                "uzbek_translation": "Mana bu dori. Kuniga ikki marta ovqatdan keyin bitta tabletkadan iching.",
                "key_vocab": [{"word": "pill", "meaning": "tabletka/dori"}, {"word": "twice a day", "meaning": "kuniga ikki marta"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Are there any side effects I should be aware of?",
                "uzbek_translation": "Men bilishim kerak bo'lgan nojo'ya ta'sirlari bormi?",
                "key_vocab": [{"word": "side effects", "meaning": "nojo'ya ta'sirlar"}, {"word": "aware of", "meaning": "xabardor bo'lmoq"}]
            },
            {
                "order_index": 3,
                "speaker": "Farmatsevt",
                "target_line": "It might cause slight drowsiness, so avoid driving after taking it.",
                "uzbek_translation": "U biroz uyquchanlik keltirib chiqarishi mumkin, shuning uchun ichgandan so'ng mashina haydamang.",
                "key_vocab": [{"word": "drowsiness", "meaning": "uyquchanlik"}, {"word": "avoid", "meaning": "saqlanmoq, chetlanmoq"}]
            }
        ]
    },
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Tish shifokoriga qabulga yozilish (Dentist)",
        "description_uz": "Tish og'rig'i bo'yicha zudlik bilan shifokor ko'rigiga navbat olish.",
        "participants": "Bemor (Siz) & Qabulxona",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Hello, I have an urgent toothache. Is there any opening today?",
                "uzbek_translation": "Salom, tishim juda qattiq og'riyapti. Bugun bo'sh vaqt bormi?",
                "key_vocab": [{"word": "urgent", "meaning": "shoshilinch"}, {"word": "toothache", "meaning": "tish og'rig'i"}]
            },
            {
                "order_index": 1,
                "speaker": "Qabulxona",
                "target_line": "Dr. Smith has an available slot at 4:30 PM this afternoon.",
                "uzbek_translation": "Doktor Smitda bugun tushdan keyin 16:30 da bo'sh vaqt bor.",
                "key_vocab": [{"word": "available slot", "meaning": "bo'sh vaqt oralig'i"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "That works for me. What documents should I bring?",
                "uzbek_translation": "Bu menga to'g'ri keladi. Qanday hujjatlarni olib kelishim kerak?",
                "key_vocab": [{"word": "documents", "meaning": "hujjatlar"}]
            },
            {
                "order_index": 3,
                "speaker": "Qabulxona",
                "target_line": "Just your ID and health insurance card if you have one.",
                "uzbek_translation": "Faqat shaxsni tasdiqlovchi hujjat va agar bo'lsa tibbiy sug'urta kartangiz.",
                "key_vocab": [{"word": "insurance", "meaning": "sug'urta"}]
            }
        ]
    },

    # 7. BANK (3 Scenarios)
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Yangi bank hisobi va plastik karta ochish",
        "description_uz": "Bankka tashrif buyurib, debet karta ochish shartlarini bilish.",
        "participants": "Mijoz (Siz) & Bank xodimi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Bank xodimi",
                "target_line": "Good afternoon, how can I assist your banking today?",
                "uzbek_translation": "Xayrli kun, bugun sizga qanday bank xizmati bilan yordam bera olaman?",
                "key_vocab": [{"word": "banking", "meaning": "bank xizmatlari"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "I would like to open a checking account and apply for a debit card.",
                "uzbek_translation": "Men hisob raqami ochmoqchiman va debet karta olishga ariza bermoqchiman.",
                "key_vocab": [{"word": "checking account", "meaning": "hisob raqami"}, {"word": "debit card", "meaning": "debet karta"}]
            },
            {
                "order_index": 2,
                "speaker": "Bank xodimi",
                "target_line": "Please fill out this application form and provide proof of address.",
                "uzbek_translation": "Iltimos, ushbu ariza shaklini to'ldiring va yashash manzilingizni tasdiqlovchi hujjat taqdim eting.",
                "key_vocab": [{"word": "application form", "meaning": "ariza formasi"}, {"word": "proof of address", "meaning": "manzil tasdig'i"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Is there any monthly maintenance fee for this account?",
                "uzbek_translation": "Bu hisob raqami uchun oylik xizmat haqi bormi?",
                "key_vocab": [{"word": "monthly fee", "meaning": "oylik to'lov/komissiya"}]
            },
            {
                "order_index": 4,
                "speaker": "Bank xodimi",
                "target_line": "No, it is completely free if you maintain a minimum balance of one hundred dollars.",
                "uzbek_translation": "Yo'q, agar yuz dollar minimal qoldiqni saqlab tursangiz, butunlay bepul.",
                "key_vocab": [{"word": "minimum balance", "meaning": "minimal qoldiq"}]
            }
        ]
    },
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Valyuta ayirboshlash (Currency exchange)",
        "description_uz": "Valyuta kursini bilish va dollar/yevro almashtirish.",
        "participants": "Mijoz (Siz) & Kassir",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Hello, what is today's exchange rate for US dollars to Euros?",
                "uzbek_translation": "Salom, bugungi AQSh dollarining yevroga nisbatan almashinuv kursi qanday?",
                "key_vocab": [{"word": "exchange rate", "meaning": "almashinuv kursi"}]
            },
            {
                "order_index": 1,
                "speaker": "Kassir",
                "target_line": "One US dollar is currently equal to 0.92 Euros.",
                "uzbek_translation": "Hozirda bir AQSh dollari 0.92 Yevroga teng.",
                "key_vocab": [{"word": "currently", "meaning": "hozirda"}, {"word": "equal", "meaning": "teng"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "I would like to exchange five hundred dollars, please.",
                "uzbek_translation": "Men besh yuz dollar almashtirmoqchiman, iltimos.",
                "key_vocab": [{"word": "exchange", "meaning": "almashtirmoq"}]
            },
            {
                "order_index": 3,
                "speaker": "Kassir",
                "target_line": "Here are your Euros and the official exchange receipt.",
                "uzbek_translation": "Mana sizning yevrolaringiz va rasmiy almashuv cheki.",
                "key_vocab": [{"word": "official receipt", "meaning": "rasmiy chek"}]
            }
        ]
    },
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Karta yo'qolishi va uni bloklash",
        "description_uz": "Yo'qolgan bank kartasi haqida xabar berish va yangisini buyurtma qilish.",
        "participants": "Mijoz (Siz) & Qo'llab-quvvatlash xodimi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Help! I think I lost my card and I need to block it immediately.",
                "uzbek_translation": "Yordam bering! Men kartamni yo'qotdim deb o'ylayman va uni darhol bloklashim kerak.",
                "key_vocab": [{"word": "lost", "meaning": "yo'qolgan"}, {"word": "immediately", "meaning": "zudlik bilan, darhol"}]
            },
            {
                "order_index": 1,
                "speaker": "Xodim",
                "target_line": "Do not worry. I have blocked the card right now to prevent any unauthorized charges.",
                "uzbek_translation": "Xavotir olmang. Begona noqonuniy to'lovlarning oldini olish uchun kartani hoziroq blokladim.",
                "key_vocab": [{"word": "prevent", "meaning": "oldini olmoq"}, {"word": "unauthorized", "meaning": "ruxsatsiz"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "When can I receive a replacement card?",
                "uzbek_translation": "Yangi almashtirilgan kartani qachon olsam bo'ladi?",
                "key_vocab": [{"word": "replacement card", "meaning": "almashtirilgan yangi karta"}]
            },
            {
                "order_index": 3,
                "speaker": "Xodim",
                "target_line": "A new card will be issued and delivered to your branch in two business days.",
                "uzbek_translation": "Yangi karta chiqariladi va ikki ish kunida filialiingizga yetkaziladi.",
                "key_vocab": [{"word": "business days", "meaning": "ish kunlari"}, {"word": "delivered", "meaning": "yetkazib berilgan"}]
            }
        ]
    },

    # 8. MIXED (3 Scenarios)
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Shaharda yo'l so'rash (Ko'cha bo'ylab navigatsiya)",
        "description_uz": "Shaharda mashhur muzey yoki metro bekatini topish uchun yo'lovchidan yo'nalish so'rash.",
        "participants": "Sayyoh (Siz) & Yo'lovchi",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Pardon me, could you tell me how to get to the National Museum?",
                "uzbek_translation": "Kechirasiz, Milliy muzeyga qanday borish mumkinligini ayta olasizmi?",
                "key_vocab": [{"word": "pardon me", "meaning": "kechirasiz"}, {"word": "museum", "meaning": "muzey"}]
            },
            {
                "order_index": 1,
                "speaker": "Yo'lovchi",
                "target_line": "Sure! Walk straight for two blocks, then turn left at the traffic light.",
                "uzbek_translation": "Albatta! Ikki daha to'g'riga yuring, keyin svetofordan chapga buriling.",
                "key_vocab": [{"word": "traffic light", "meaning": "svetofor"}, {"word": "blocks", "meaning": "mavze/kvartallar"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Is it far from here? Should I take a bus?",
                "uzbek_translation": "Bu yerdan uzoqmi? Avtobusga chiqishim kerakmi?",
                "key_vocab": [{"word": "far", "meaning": "uzoq"}, {"word": "bus", "meaning": "avtobus"}]
            },
            {
                "order_index": 3,
                "speaker": "Yo'lovchi",
                "target_line": "No, it is only a five-minute walk. You cannot miss it!",
                "uzbek_translation": "Yo'q, piyoda atigi besh daqiqalik yo'l. Adashib ketmaysiz!",
                "key_vocab": [{"word": "cannot miss it", "meaning": "adashib ketmaysiz (ko'zdan qochirib bo'lmaydi)"}]
            }
        ]
    },
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Qahvaxonada kofe va shirinlik buyurtma qilish",
        "description_uz": "Qulay qahvaxonada o'tirib kapuchino va kruassan buyurtma qilish.",
        "participants": "Mijoz (Siz) & Barista",
        "lang": "en",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Barista",
                "target_line": "Hi! What can I get started for you today?",
                "uzbek_translation": "Salom! Bugun sizga nima tayyorlab beray?",
                "key_vocab": [{"word": "started", "meaning": "boshlamoq"}]
            },
            {
                "order_index": 1,
                "speaker": "Siz",
                "target_line": "Can I have a medium cappuccino with oat milk, please?",
                "uzbek_translation": "Iltimos, suli suti (oat milk) bilan o'rtacha o'lchamdagi kapuchino bera olasizmi?",
                "key_vocab": [{"word": "cappuccino", "meaning": "kapuchino"}, {"word": "oat milk", "meaning": "suli suti"}]
            },
            {
                "order_index": 2,
                "speaker": "Barista",
                "target_line": "Would you like a fresh pastry with that? Our chocolate croissants just came out.",
                "uzbek_translation": "U bilan birga yangi pishiriq xohlaysizmi? Shokoladli kruassanlarimiz hozirgina chiqdi.",
                "key_vocab": [{"word": "fresh pastry", "meaning": "yangi pishiriq"}, {"word": "croissant", "meaning": "kruassan"}]
            },
            {
                "order_index": 3,
                "speaker": "Siz",
                "target_line": "Yes, one chocolate croissant too, please. For here, not takeaway.",
                "uzbek_translation": "Ha, bitta shokoladli kruassan ham, iltimos. Olib ketishga emas, shu yerda yeyman.",
                "key_vocab": [{"word": "takeaway", "meaning": "olib ketishga"}]
            }
        ]
    },
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Kutubxonada kitob qidirish va a'zo bo'lish",
        "description_uz": "Shahar kutubxonasiga tashrif buyurib, til o'rganish bo'yicha kitob so'rash.",
        "participants": "Kitobxon (Siz) & Kutubxonachi",
        "lang": "en",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Siz",
                "target_line": "Hello, I am looking for grammar reference books for English learners.",
                "uzbek_translation": "Salom, men ingliz tilini o'rganuvchilar uchun grammatika qo'llanmalarini qidiryapman.",
                "key_vocab": [{"word": "reference books", "meaning": "ma'lumotnoma/qo'llanma kitoblari"}]
            },
            {
                "order_index": 1,
                "speaker": "Kutubxonachi",
                "target_line": "They are in section B on the third shelf. Do you hold a library card?",
                "uzbek_translation": "Ular uchinchi javonda B bo'limida. Sizda kutubxona a'zolik kartasi bormi?",
                "key_vocab": [{"word": "shelf", "meaning": "javon"}, {"word": "library card", "meaning": "kutubxona a'zolik kartasi"}]
            },
            {
                "order_index": 2,
                "speaker": "Siz",
                "target_line": "Not yet. Can I sign up for membership today?",
                "uzbek_translation": "Hozircha yo'q. Bugun a'zolikdan o'tsam bo'ladimi?",
                "key_vocab": [{"word": "sign up", "meaning": "ro'yxatdan o'tmoq"}, {"word": "membership", "meaning": "a'zolik"}]
            },
            {
                "order_index": 3,
                "speaker": "Kutubxonachi",
                "target_line": "Yes, just show your student or national ID card and it takes two minutes.",
                "uzbek_translation": "Ha, talabalik yoki pasportingizni ko'rsatsangiz kifoya, bu ikki daqiqa vaqt oladi.",
                "key_vocab": [{"word": "national ID", "meaning": "shaxsni tasdiqlovchi hujjat"}]
            }
        ]
    },
    # ==================== RUSSIAN DIALOGUES (8 Themes x 3 Scenarios = 24 Scenarios) ====================
    # 1. TAXI (RU)
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Аэропортдан такси чақириш ва манзилни келишиш",
        "description_uz": "Аэропортга қўниб, меҳмонхонагача таксичи билан нарх ва манзилни гаплашиш.",
        "participants": "Пассажир (Сиз) & Водитель такси",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Водитель",
                "target_line": "Здравствуйте! Вам нужно такси в центр города?",
                "uzbek_translation": "Ассалому алайкум! Сизга шаҳар марказига такси керакми?",
                "key_vocab": [{"word": "нужно", "meaning": "керак"}, {"word": "центр города", "meaning": "шаҳар маркази"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Да, пожалуйста. Сколько стоит доехать до гостиницы Гранд?",
                "uzbek_translation": "Ҳа, илтимос. Гранд меҳмонхонасигача бориш қанча туради?",
                "key_vocab": [{"word": "сколько стоит", "meaning": "қанча туради"}, {"word": "гостиница", "meaning": "меҳмонхона"}]
            },
            {
                "order_index": 2,
                "speaker": "Водитель",
                "target_line": "Примерно полторы тысячи рублей с учётом багажа.",
                "uzbek_translation": "Багаж билан бирга тахминан бир ярим минг рубль бўлади.",
                "key_vocab": [{"word": "примерно", "meaning": "тахминан"}, {"word": "багаж", "meaning": "юк, багаж"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Отлично. Можно оплатить банковской картой или переводом?",
                "uzbek_translation": "Ажойиб. Банк картаси ёки ўтказма билан тўласа бўладими?",
                "key_vocab": [{"word": "оплатить", "meaning": "тўламоқ"}, {"word": "перевод", "meaning": "ўтказма"}]
            },
            {
                "order_index": 4,
                "speaker": "Водитель",
                "target_line": "Да, конечно. Положите вещи в багажник и садитесь.",
                "uzbek_translation": "Ҳа, албатта. Юкларингизни юкхонага қўйинг ва ўтиринг.",
                "key_vocab": [{"word": "положите", "meaning": "қўйинг"}, {"word": "багажник", "meaning": "юкхона (багаж)"}]
            }
        ]
    },
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Йўлдаги тирбандлик ва қисқа йўл",
        "description_uz": "Йўлда тирбандлик бўлганда ҳайдовчидан вақтни сўраш.",
        "participants": "Пассажир (Сиз) & Водитель",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Извините, мы успеем до трёх часов? На дороге сильная пробка.",
                "uzbek_translation": "Кечирасиз, соат учгача улгурамизми? Йўлда кучли тирбандлик бор.",
                "key_vocab": [{"word": "успеем", "meaning": "улгурамиз"}, {"word": "пробка", "meaning": "тирбандлик"}]
            },
            {
                "order_index": 1,
                "speaker": "Водитель",
                "target_line": "Не волнуйтесь, я сейчас объеду затор через набережную.",
                "uzbek_translation": "Хавотир олманг, мен ҳозир қирғоқ бўйи кўчаси орқали тирбандликни айланиб ўтаман.",
                "key_vocab": [{"word": "не волнуйтесь", "meaning": "хавотир олманг"}, {"word": "объеду", "meaning": "айланиб ўтаман"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Спасибо большое, у меня очень важная встреча.",
                "uzbek_translation": "Катта раҳмат, менда жуда муҳим учрашув бор.",
                "key_vocab": [{"word": "встреча", "meaning": "учрашув"}]
            }
        ]
    },
    {
        "theme": "TAXI",
        "theme_title_uz": "Taksi",
        "scenario_title": "Манзилда тўхташ ва қайтимни қолдириш",
        "description_uz": "Бино ёнида тўхташни сўраш ва тўлов қилиш.",
        "participants": "Пассажир (Сиз) & Водитель",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Остановите, пожалуйста, вот здесь, возле аптеки.",
                "uzbek_translation": "Илтимос, мана шу ерда, дорихона ёнида тўхтатинг.",
                "key_vocab": [{"word": "остановите", "meaning": "тўхтатинг"}, {"word": "возле", "meaning": "ёнида, яқинида"}]
            },
            {
                "order_index": 1,
                "speaker": "Водитель",
                "target_line": "Хорошо, прямо у входа.",
                "uzbek_translation": "Яхши, тўғри киравериш ёнида.",
                "key_vocab": [{"word": "у входа", "meaning": "кираверишда"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Вот две тысячи рублей, сдачи не нужно. Всего доброго!",
                "uzbek_translation": "Мана икки минг рубль, қайтими керак эмас. Хайр, саломат бўлинг!",
                "key_vocab": [{"word": "сдача", "meaning": "қайтим пули"}]
            }
        ]
    },

    # 2. HOTEL (RU)
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Заселение в отель (Регистрация)",
        "description_uz": "Брон қилинган хонага кириш ва маълумотларни аниқлаштириш.",
        "participants": "Гость (Сиз) & Администратор",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Администратор",
                "target_line": "Добрый день! Добро пожаловать. У вас забронирован номер?",
                "uzbek_translation": "Хайрли кун! Хуш келибсиз. Сизда хона брон қилинганми?",
                "key_vocab": [{"word": "добро пожаловать", "meaning": "хуш келибсиз"}, {"word": "забронирован", "meaning": "брон қилинган"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Здравствуйте! Да, на фамилию Каримов на трое суток.",
                "uzbek_translation": "Ассалому алайкум! Ҳа, Каримов номига уч суткага.",
                "key_vocab": [{"word": "фамилия", "meaning": "фамилия"}, {"word": "сутки", "meaning": "сутка, кеча-кундуз"}]
            },
            {
                "order_index": 2,
                "speaker": "Администратор",
                "target_line": "Ваш номер готов. Завтрак включён в стоимость с 7 до 10 утра.",
                "uzbek_translation": "Хонангиз тайёр. Нонушта нарх ичига киритилган, эрталаб соат 7 дан 10 гача.",
                "key_vocab": [{"word": "завтрак", "meaning": "нонушта"}, {"word": "включён", "meaning": "киритилган"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Прекрасно, спасибо! На каком этаже находится номер?",
                "uzbek_translation": "Ажойиб, раҳмат! Хона нечанчи қаватда жойлашган?",
                "key_vocab": [{"word": "этаж", "meaning": "қават"}, {"word": "находится", "meaning": "жойлашган"}]
            }
        ]
    },
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Wi-Fi ва хона хизматини сўраш",
        "description_uz": "Қабулхонага қўнғироқ қилиб тоза сочиқ ва интернет сўраш.",
        "participants": "Гость (Сиз) & Ресепшн",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Здравствуйте, подскажите, пожалуйста, какой пароль от Wi-Fi?",
                "uzbek_translation": "Ассалому алайкум, Wi-Fi пароли қандайлигини айтиб юборолмайсизми?",
                "key_vocab": [{"word": "подскажите", "meaning": "айтиб юборинг"}, {"word": "пароль", "meaning": "парол"}]
            },
            {
                "order_index": 1,
                "speaker": "Ресепшн",
                "target_line": "Пароль указан на карточке от номера: HotelPass2026.",
                "uzbek_translation": "Парол хона карточкасида ёзилган: HotelPass2026.",
                "key_vocab": [{"word": "указан", "meaning": "кўрсатилган"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "И пришлите, пожалуйста, дополнительное полотенце в 204 номер.",
                "uzbek_translation": "Ва 204-хонага қўшимча сочиқ юбориб беринг, илтимос.",
                "key_vocab": [{"word": "полотенце", "meaning": "сочиқ"}, {"word": "дополнительное", "meaning": "қўшимча"}]
            }
        ]
    },
    {
        "theme": "HOTEL",
        "theme_title_uz": "Mehmonxona",
        "scenario_title": "Выселение (Check-out) ва ҳисоб-китоб",
        "description_uz": "Хонани топшириш ва аэропортга такси буюртма қилиш.",
        "participants": "Гость (Сиз) & Администратор",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Я хочу выехать из номера 310. Вот электронные ключи.",
                "uzbek_translation": "Мен 310-хонадан чиқмоқчиман (топширмоқчиман). Мана электрон калитлар.",
                "key_vocab": [{"word": "выехать", "meaning": "чиқиб кетмоқ, топширмоқ"}]
            },
            {
                "order_index": 1,
                "speaker": "Администратор",
                "target_line": "Спасибо! Всё в порядке. Вам вызвать такси до вокзала?",
                "uzbek_translation": "Раҳмат! Ҳаммаси жойида. Вокзалгача такси чақириб берайми?",
                "key_vocab": [{"word": "вокзал", "meaning": "вокзал"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Да, если можно, через десять минут.",
                "uzbek_translation": "Ҳа, иложи бўлса, ўн дақиқадан кейинга.",
                "key_vocab": [{"word": "если можно", "meaning": "агар иложи бўлса"}]
            }
        ]
    },

    # 3. RESTAURANT (RU)
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Столик буюртма қилиш ва меню сўраш",
        "description_uz": "Ресторанга кириб жой танлаш ва таомномани олиш.",
        "participants": "Гость (Сиз) & Официант",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Официант",
                "target_line": "Добрый вечер! На сколько человек нужен столик?",
                "uzbek_translation": "Хайрли оқшом! Неча кишига стол керак?",
                "key_vocab": [{"word": "столик", "meaning": "стол"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "На двоих, желательно у окна. Принесите меню, пожалуйста.",
                "uzbek_translation": "Икки кишига, иложи бўлса дераза ёнидан. Таомномани олиб келинг, илтимос.",
                "key_vocab": [{"word": "желательно", "meaning": "иложи бўлса / маъқули"}, {"word": "меню", "meaning": "таомнома"}]
            },
            {
                "order_index": 2,
                "speaker": "Официант",
                "target_line": "Пожалуйста, проходите. Что будете пить в начале?",
                "uzbek_translation": "Марҳамат, ўтинг. Бошланишига нима ичасиз?",
                "key_vocab": [{"word": "проходите", "meaning": "ўтинг"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Зелёный чай с лимоном и мятой, пожалуйста.",
                "uzbek_translation": "Кўк чой лимон ва ялпиз билан, илтимос.",
                "key_vocab": [{"word": "зелёный чай", "meaning": "кўк чой"}, {"word": "мята", "meaning": "ялпиз"}]
            }
        ]
    },
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Асосий таомни буюртма қилиш",
        "description_uz": "Официантга таом ва гарнир буюртма бериш.",
        "participants": "Гость (Сиз) & Официант",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Официант",
                "target_line": "Вы готовы сделать заказ по горячим блюдам?",
                "uzbek_translation": "Иссиқ таомлар бўйича буюртма беришга тайёрмисиз?",
                "key_vocab": [{"word": "заказ", "meaning": "буюртма"}, {"word": "горячие блюда", "meaning": "иссиқ таомлар"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Да, мне, пожалуйста, запечённую рыбу с овощами гриль.",
                "uzbek_translation": "Ҳа, менга печда пишган балиқ ва грил сабзавотлар, илтимос.",
                "key_vocab": [{"word": "запечённая", "meaning": "печда пиширилган"}, {"word": "овощи", "meaning": "сабзавотлар"}]
            },
            {
                "order_index": 2,
                "speaker": "Официант",
                "target_line": "Отличный выбор! Салат с морепродуктами будете?",
                "uzbek_translation": "Ажойиб танлов! Денгиз маҳсулотлари билан салат оласизми?",
                "key_vocab": [{"word": "выбор", "meaning": "танлов"}, {"word": "морепродукты", "meaning": "денгиз маҳсулотлари"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Да, и принесите хлебную корзину.",
                "uzbek_translation": "Ҳа, ва нон саватчасини ҳам олиб келинг.",
                "key_vocab": [{"word": "хлебная корзина", "meaning": "нон савати"}]
            }
        ]
    },
    {
        "theme": "RESTAURANT",
        "theme_title_uz": "Restoran",
        "scenario_title": "Ҳисобни сўраш ва тўлов қилиш",
        "description_uz": "Официантдан чекни сўраш ва хизмат учун миннатдорлик билдириш.",
        "participants": "Гость (Сиз) & Официант",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Будьте добры, принесите счёт, пожалуйста.",
                "uzbek_translation": "Марҳамат қилиб, ҳисобни (чекни) олиб келинг, илтимос.",
                "key_vocab": [{"word": "будьте добры", "meaning": "илтимос / марҳамат қилиб"}, {"word": "счёт", "meaning": "ҳисоб, чек"}]
            },
            {
                "order_index": 1,
                "speaker": "Официант",
                "target_line": "Вам вместе или раздельно? Оплата наличными или картой?",
                "uzbek_translation": "Сизга биргами ёки алоҳидами? Тўлов нақдми ёки картами?",
                "key_vocab": [{"word": "наличные", "meaning": "нақд пул"}, {"word": "раздельно", "meaning": "алоҳида"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Вместе, оплачу картой. Всё было очень вкусно!",
                "uzbek_translation": "Бирга, картада тўлайман. Ҳаммаси жуда мазали бўлди!",
                "key_vocab": [{"word": "вкусно", "meaning": "мазали"}]
            }
        ]
    },

    # 4. AIRPORT (RU)
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Регистрация на рейс ва юк топшириш",
        "description_uz": "Самолётга чиқиш учун паспорт ва чипта кўрсатиш.",
        "participants": "Пассажир (Сиз) & Сотрудник",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сотрудник",
                "target_line": "Здравствуйте. Предъявите ваш загранпаспорт и билет.",
                "uzbek_translation": "Ассалому алайкум. Хорижга чиқиш паспортингиз ва чиптангизни кўрсатинг.",
                "key_vocab": [{"word": "предъявите", "meaning": "кўрсатинг"}, {"word": "загранпаспорт", "meaning": "хорижий паспорт"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Вот документы. У меня один чемодан в багаж и рюкзак с собой.",
                "uzbek_translation": "Мана ҳужжатлар. Менда битта чемодан багажга ва рюкзак ўзим билан.",
                "key_vocab": [{"word": "чемодан", "meaning": "чемодан"}, {"word": "рюкзак", "meaning": "рюкзак"}]
            },
            {
                "order_index": 2,
                "speaker": "Сотрудник",
                "target_line": "Поставьте багаж на весы. Место хотите у окна или у прохода?",
                "uzbek_translation": "Багажни тарозига қўйинг. Жойни дераза ёниданми ёки йўлакдан хоҳлайсизми?",
                "key_vocab": [{"word": "весы", "meaning": "тарози"}, {"word": "у прохода", "meaning": "йўлак ёнида"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "У окна, если есть свободные.",
                "uzbek_translation": "Бўш бўлса, дераза ёнидан, илтимос.",
                "key_vocab": [{"word": "свободные", "meaning": "бўш жойлар"}]
            }
        ]
    },
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Хавфсизлик назоратидан ўтиш (Досмотр)",
        "description_uz": "Нарсаларни лентага қўйиш ва металл детектордан ўтиш.",
        "participants": "Пассажир (Сиз) & Офицер службы безопасности",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Служба",
                "target_line": "Выложите металлические предметы, телефон и ноутбук в пластиковый контейнер.",
                "uzbek_translation": "Металл буюмларни, телефон ва ноутбукни пластик идишга чиқариб қўйинг.",
                "key_vocab": [{"word": "выложите", "meaning": "чиқариб қўйинг"}, {"word": "предметы", "meaning": "буюмлар"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Воду в бутылке нужно выбрасывать?",
                "uzbek_translation": "Шишадаги сувни ташлаб юбориш керакми?",
                "key_vocab": [{"word": "бутылка", "meaning": "шиша/идиш"}, {"word": "выбрасывать", "meaning": "ташлаб юбормоқ"}]
            },
            {
                "order_index": 2,
                "speaker": "Служба",
                "target_line": "Да, жидкости объёмом более 100 мл проносить запрещено.",
                "uzbek_translation": "Ҳа, ҳажми 100 мл дан ортиқ суюқликларни олиб ўтиш тақиқланган.",
                "key_vocab": [{"word": "жидкости", "meaning": "суюқликлар"}, {"word": "запрещено", "meaning": "тақиқланган"}]
            }
        ]
    },
    {
        "theme": "AIRPORT",
        "theme_title_uz": "Aeroport",
        "scenario_title": "Рейс кечикиши ва чиқиш дарвозасини билиш",
        "description_uz": "Парвоз кечикканда маълумотлар столидан суриштириш.",
        "participants": "Пассажир (Сиз) & Справочная",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Скажите, рейс 450 в Москву задерживается?",
                "uzbek_translation": "Айтингчи, Москвага 450-рейс кечикяптими?",
                "key_vocab": [{"word": "задерживается", "meaning": "кечикяпти"}]
            },
            {
                "order_index": 1,
                "speaker": "Справочная",
                "target_line": "Да, вылет перенесён на один час из-за позднего прибытия борта.",
                "uzbek_translation": "Ҳа, самолёт кеч етиб келганлиги сабабли учиш бир соатга сурилди.",
                "key_vocab": [{"word": "вылет", "meaning": "учиш"}, {"word": "перенесён", "meaning": "кўчирилган, сурилган"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Номер выхода на посадку остаётся прежним?",
                "uzbek_translation": "Самолётга чиқиш дарвозаси рақами аввалгидек қоладими?",
                "key_vocab": [{"word": "посадка", "meaning": "самолётга чиқиш"}, {"word": "прежний", "meaning": "аввалги"}]
            }
        ]
    },

    # 5. SHOPPING (RU)
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Кийим дўконида ўлчам ва кийиб кўриш",
        "description_uz": "Ёққан кийимнинг ўлчамини сўраш ва синаб кўриш хонасини топиш.",
        "participants": "Покупатель (Сиз) & Продавец",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Здравствуйте! Есть ли этот пиджак в 48-м размере?",
                "uzbek_translation": "Ассалому алайкум! Бу пиджакнинг 48-ўлчами борми?",
                "key_vocab": [{"word": "пиджак", "meaning": "пиджак"}, {"word": "размер", "meaning": "ўлчам"}]
            },
            {
                "order_index": 1,
                "speaker": "Продавец",
                "target_line": "Да, как раз остался один. Желаете примерить?",
                "uzbek_translation": "Ҳа, айнан биттаси қолган эди. Кийиб кўришни хоҳлайсизми?",
                "key_vocab": [{"word": "примерить", "meaning": "кийиб кўрмоқ"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Да, подскажите, где находится примерочная?",
                "uzbek_translation": "Ҳа, кийиб кўриш хонаси қаердалигини кўрсатиб юборинг?",
                "key_vocab": [{"word": "примерочная", "meaning": "кийиб кўриш хонаси"}]
            }
        ]
    },
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Чегирма ва акциялар ҳақида билиш",
        "description_uz": "Нархни ва акция бўйича бонус олишни суриштириш.",
        "participants": "Покупатель (Сиз) & Консультант",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "На эту куртку сейчас действует какая-нибудь скидка?",
                "uzbek_translation": "Бу курткага ҳозир бирон бир чегирма амал қиладими?",
                "key_vocab": [{"word": "скидка", "meaning": "чегирма"}, {"word": "действует", "meaning": "амал қилади"}]
            },
            {
                "order_index": 1,
                "speaker": "Консультант",
                "target_line": "Да, при покупке двух вещей скидка тридцать процентов на вторую.",
                "uzbek_translation": "Ҳа, иккита буюм сотиб олганда иккинчисига ўттиз фоиз чегирма бор.",
                "key_vocab": [{"word": "покупка", "meaning": "харид"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Отлично, тогда я выберу ещё и шарф.",
                "uzbek_translation": "Ажойиб, унда мен яна шарф ҳам танлайман.",
                "key_vocab": [{"word": "шарф", "meaning": "шарф, бўйинбоғ"}]
            }
        ]
    },
    {
        "theme": "SHOPPING",
        "theme_title_uz": "Xarid",
        "scenario_title": "Товарни қайтариш ёки алмаштириш",
        "description_uz": "Тўғри келмаган буюмни чек билан алмаштириш.",
        "participants": "Покупатель (Сиз) & Кассир",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Здравствуйте, я хочу обменять этот свитер на размер больше.",
                "uzbek_translation": "Ассалому алайкум, мен бу свитерни бир ўлчам каттасига алмаштирмоқчиман.",
                "key_vocab": [{"word": "обменять", "meaning": "алмаштирмоқ"}]
            },
            {
                "order_index": 1,
                "speaker": "Кассир",
                "target_line": "Покажите, пожалуйста, чек и бирки на одежде.",
                "uzbek_translation": "Илтимос, тўлов чеки ва кийимдаги ёрлиқларни (биркаларни) кўрсатинг.",
                "key_vocab": [{"word": "бирки", "meaning": "ёрлиқлар, этикеткалар"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Вот чек, вещь не носили, всё в идеальном состоянии.",
                "uzbek_translation": "Мана чек, кийилмаган, ҳаммаси идеал ҳолатда.",
                "key_vocab": [{"word": "состояние", "meaning": "ҳолат"}]
            }
        ]
    },

    # 6. DOCTOR (RU)
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Шифокор қабулида шикоятларни айтиш",
        "description_uz": "Томоқ ва бош оғриғи шикояти билан шифокорга кўриниш.",
        "participants": "Пациент (Сиз) & Терапевт",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Терапевт",
                "target_line": "Здравствуйте! На что жалуетесь? Что вас беспокоит?",
                "uzbek_translation": "Ассалому алайкум! Нимадан шикоятингиз бор? Сизни нима безовта қилмоқда?",
                "key_vocab": [{"word": "жалуетесь", "meaning": "шикоят қиляпсиз"}, {"word": "беспокоит", "meaning": "безовта қилмоқда"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "У меня высокая температура, болит голова и першит в горле.",
                "uzbek_translation": "Менинг иситмам баланд, бошим оғрияпти ва томоғим қичишмоқда.",
                "key_vocab": [{"word": "болит голова", "meaning": "бош оғрияпти"}, {"word": "горло", "meaning": "томоқ"}]
            },
            {
                "order_index": 2,
                "speaker": "Терапевт",
                "target_line": "Давайте я послушаю дыхание. Дышите глубоко, не дышите.",
                "uzbek_translation": "Келинг, нафасингизни эшитиб кўраман. Чуқур нафас олинг, нафас олмай туринг.",
                "key_vocab": [{"word": "дыхание", "meaning": "нафас олиш"}, {"word": "глубоко", "meaning": "чуқур"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Доктор, это грипп или обычная простуда?",
                "uzbek_translation": "Доктор, бу гриппми ёки оддий шамоллашми?",
                "key_vocab": [{"word": "простуда", "meaning": "шамоллаш"}]
            }
        ]
    },
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Дорихонада рецепт бўйича дори олиш",
        "description_uz": "Фармацевтдан дори қабул қилиш тартибини билиш.",
        "participants": "Покупатель (Сиз) & Фармацевт",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Добрый день. Мне выписали этот сироп и таблетки.",
                "uzbek_translation": "Хайрли кун. Менга мана бу қиём (сироп) ва таблеткаларни ёзиб беришди.",
                "key_vocab": [{"word": "выписали", "meaning": "ёзиб беришди (рецепт)"}]
            },
            {
                "order_index": 1,
                "speaker": "Фармацевт",
                "target_line": "Принимайте по одной таблетке два раза в день строго после еды.",
                "uzbek_translation": "Кунига икки маҳал битта таблеткадан қатъий равишда овқатдан сўнг ичинг.",
                "key_vocab": [{"word": "принимайте", "meaning": "қабул қилинг"}, {"word": "строго", "meaning": "қатъий равишда"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Спасибо! Есть ли спрей для носа от заложенности?",
                "uzbek_translation": "Раҳмат! Бурун битишига қарши спрей борми?",
                "key_vocab": [{"word": "заложенность", "meaning": "бурун битиши"}]
            }
        ]
    },
    {
        "theme": "DOCTOR",
        "theme_title_uz": "Shifokor",
        "scenario_title": "Стоматолог қабулига ёзилиш",
        "description_uz": "Тиш оғриғи билан шифокор кўригига вақт белгилаш.",
        "participants": "Пациент (Сиз) & Регистратура",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Здравствуйте! У меня сильно разболелся зуб, есть ли свободное время сегодня?",
                "uzbek_translation": "Ассалому алайкум! Тишим жуда қаттиқ оғриб қолди, бугун бўш вақт борми?",
                "key_vocab": [{"word": "разболелся", "meaning": "оғриб қолди"}, {"word": "зуб", "meaning": "тиш"}]
            },
            {
                "order_index": 1,
                "speaker": "Регистратура",
                "target_line": "Врач может принять вас сегодня в 16:30 с острой болью.",
                "uzbek_translation": "Шифокор сизни бугун ўткир оғриқ билан соат 16:30 да қабул қила олади.",
                "key_vocab": [{"word": "острая боль", "meaning": "ўткир оғриқ"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Отлично, запишите меня на это время.",
                "uzbek_translation": "Ажойиб, мени шу вақтга ёзиб қўйинг.",
                "key_vocab": [{"word": "запишите", "meaning": "ёзиб қўйинг"}]
            }
        ]
    },

    # 7. BANK (RU)
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Банк картаси очиш ва ҳисоб рақами",
        "description_uz": "Банк филиалида янги карта очиш шартлари.",
        "participants": "Клиент (Сиз) & Менеджер банка",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Менеджер",
                "target_line": "Здравствуйте! Чем я могу вам помочь?",
                "uzbek_translation": "Ассалому алайкум! Сизга қандай ёрдам беришим мумкин?",
                "key_vocab": [{"word": "помочь", "meaning": "ёрдам бермоқ"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Я хочу открыть дебетовую карту с возможностью онлайн-переводов.",
                "uzbek_translation": "Мен онлайн ўтказмалар қилиш имконияти бўлган дебет карта очмоқчиман.",
                "key_vocab": [{"word": "открыть", "meaning": "очмоқ"}, {"word": "дебетовая карта", "meaning": "дебет карта"}]
            },
            {
                "order_index": 2,
                "speaker": "Менеджер",
                "target_line": "Потребуется ваш паспорт. Выпуск карты бесплатный, обслуживание тоже.",
                "uzbek_translation": "Паспортингиз керак бўлади. Карта чиқариш бепул, хизмат кўрсатиш ҳам.",
                "key_vocab": [{"word": "выпуск", "meaning": "чиқариш"}, {"word": "обслуживание", "meaning": "хизмат кўрсатиш"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Когда я смогу забрать готовую пластиковую карту?",
                "uzbek_translation": "Тайёр пластик картани қачон олиб кетишим мумкин?",
                "key_vocab": [{"word": "забрать", "meaning": "олиб кетмоқ"}]
            }
        ]
    },
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Валюта айирбошлаш (Обмен валюты)",
        "description_uz": "Кассада долларни рублга ёки сўмга алмаштириш.",
        "participants": "Клиент (Сиз) & Кассир",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Добрый день! Какой у вас курс покупки долларов?",
                "uzbek_translation": "Хайрли кун! Сизларда доллар сотиб олиш курси қандай?",
                "key_vocab": [{"word": "курс покупки", "meaning": "сотиб олиш курси"}]
            },
            {
                "order_index": 1,
                "speaker": "Кассир",
                "target_line": "Девяносто два рубля за один доллар. Сколько хотите поменять?",
                "uzbek_translation": "Бир долларга тўқсон икки рубль. Қанча алмаштирмоқчисиз?",
                "key_vocab": [{"word": "поменять", "meaning": "алмаштирмоқ"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Триста долларов, пожалуйста. Вот наличные.",
                "uzbek_translation": "Уч юз доллар, илтимос. Мана нақд пул.",
                "key_vocab": [{"word": "наличные", "meaning": "нақд пул"}]
            }
        ]
    },
    {
        "theme": "BANK",
        "theme_title_uz": "Bank",
        "scenario_title": "Картани блоклаш ва қайта чиқариш",
        "description_uz": "Йўқолган ёки банкомат ютган картани дарҳол блоклаш.",
        "participants": "Клиент (Сиз) & Служба поддержки",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Срочно помогите, банкомат заблокировал и не вернул мою карту!",
                "uzbek_translation": "Шошилинч ёрдам беринг, банкомат картамни блоклаб, қайтариб бермади!",
                "key_vocab": [{"word": "срочно", "meaning": "шошилинч, тезкор"}, {"word": "заблокировал", "meaning": "блоклаб қўйди"}]
            },
            {
                "order_index": 1,
                "speaker": "Поддержка",
                "target_line": "Не переживайте, деньги в безопасности. Я заблокировал карту.",
                "uzbek_translation": "Хавотирланманг, пуллар хавфсизликда. Мен картани блокладим.",
                "key_vocab": [{"word": "в безопасности", "meaning": "хавфсизликда"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Как мне перевыпустить её и снять средства?",
                "uzbek_translation": "Уни қандай қайта чиқариб оламан ва маблағларни ечаман?",
                "key_vocab": [{"word": "перевыпустить", "meaning": "қайта чиқармоқ"}, {"word": "снять средства", "meaning": "маблағларни ечиб олмоқ"}]
            }
        ]
    },

    # 8. MIXED (RU)
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Кўчада йўл сўраш ва метро бекатини топиш",
        "description_uz": "Шаҳар марказида адашиб қолганда йўловчидан йўл сўраш.",
        "participants": "Прохожий & Сиз",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Извините, не подскажете, как пройти к ближайшей станции метро?",
                "uzbek_translation": "Кечирасиз, энг яқин метро бекатига қандай боришни айтиб юборолмайсизми?",
                "key_vocab": [{"word": "ближайшая", "meaning": "энг яқин"}, {"word": "станция метро", "meaning": "метро бекати"}]
            },
            {
                "order_index": 1,
                "speaker": "Прохожий",
                "target_line": "Идите прямо до перекрёстка, затем поверните направо.",
                "uzbek_translation": "Чорраҳагача тўғри боринг, кейин ўнгга бурилинг.",
                "key_vocab": [{"word": "перекрёсток", "meaning": "чорраҳа"}, {"word": "поверните", "meaning": "бурилинг"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Это далеко? Сколько минут пешком?",
                "uzbek_translation": "У узоқми? Пиёда неча дақиқалик йўл?",
                "key_vocab": [{"word": "пешком", "meaning": "пиёда"}]
            },
            {
                "order_index": 3,
                "speaker": "Прохожий",
                "target_line": "Буквально три минуты, увидите большую букву «М».",
                "uzbek_translation": "Атиги уч дақиқа, катта «М» ҳарфини кўрасиз.",
                "key_vocab": [{"word": "буквально", "meaning": "атиги / сўзма-сўз"}]
            }
        ]
    },
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Қаҳвахонада буюртма бериш (Кофейня)",
        "description_uz": "Қаҳва ва ширинлик олиш.",
        "participants": "Бариста & Гость (Сиз)",
        "lang": "ru",
        "level": "BEGINNER",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Бариста",
                "target_line": "Здравствуйте! Что для вас приготовить?",
                "uzbek_translation": "Ассалому алайкум! Сиз учун нима тайёрлаб берай?",
                "key_vocab": [{"word": "приготовить", "meaning": "тайёрлаб бермоқ"}]
            },
            {
                "order_index": 1,
                "speaker": "Сиз",
                "target_line": "Один латте с карамельным сиропом и круассан, пожалуйста.",
                "uzbek_translation": "Битта карамелли латте ва круассан, илтимос.",
                "key_vocab": [{"word": "латте", "meaning": "латте"}, {"word": "сироп", "meaning": "қиём (сироп)"}]
            },
            {
                "order_index": 2,
                "speaker": "Бариста",
                "target_line": "Вам здесь или с собой навынос?",
                "uzbek_translation": "Сизга шу ердами ёки ўзингиз билан олиб кетасизми?",
                "key_vocab": [{"word": "навынос", "meaning": "олиб кетишга"}]
            },
            {
                "order_index": 3,
                "speaker": "Сиз",
                "target_line": "Здесь, пожалуйста. Можно оплатить телефоном?",
                "uzbek_translation": "Шу ерда, илтимос. Телефон орқали тўласа бўладими?",
                "key_vocab": [{"word": "оплатить", "meaning": "тўламоқ"}]
            }
        ]
    },
    {
        "theme": "MIXED",
        "theme_title_uz": "Aralash vaziyat",
        "scenario_title": "Кутубхонада китоб танлаш ва ўқиш зали",
        "description_uz": "Кутубхонага келиб тил ўрганиш адабиётини топиш.",
        "participants": "Библиотекарь & Читатель (Сиз)",
        "lang": "ru",
        "level": "INTERMEDIATE",
        "lines": [
            {
                "order_index": 0,
                "speaker": "Сиз",
                "target_line": "Здравствуйте! Где я могу найти словари и учебники по русскому языку?",
                "uzbek_translation": "Ассалому алайкум! Мен рус тили бўйича луғат ва дарсликларни қаердан топишим мумкин?",
                "key_vocab": [{"word": "словари", "meaning": "луғатлар"}, {"word": "учебники", "meaning": "дарсликлар"}]
            },
            {
                "order_index": 1,
                "speaker": "Библиотекарь",
                "target_line": "В третьем зале на стеллаже с филологией. Вы можете взять их в читальный зал.",
                "uzbek_translation": "Учинчи залда филология жавонида. Уларни ўқиш залига олиб киришингиз мумкин.",
                "key_vocab": [{"word": "стеллаж", "meaning": "китоб жавони"}, {"word": "читальный зал", "meaning": "ўқиш зали"}]
            },
            {
                "order_index": 2,
                "speaker": "Сиз",
                "target_line": "Спасибо! Есть ли у вас зона с бесплатным Wi-Fi для занятий?",
                "uzbek_translation": "Раҳмат! Сизларда дарс қилиш учун бепул Wi-Fi ҳудуди борми?",
                "key_vocab": [{"word": "зона", "meaning": "ҳудуд"}, {"word": "занятия", "meaning": "машғулотлар, дарс қилиш"}]
            }
        ]
    }
]
