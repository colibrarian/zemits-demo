/* Zemits device catalogue: data + detail popup, shared by index.html and aparati.html.
   The page provides the globals `i18n`, `currentLang` and `requestDevice(name)`,
   and calls mergeDeviceUi(i18n) once after defining its translations. */

/* ───────── DEVICE DATA (price-descending single list) ───────── */
/* tag: face | body | laser | new | acc | analysis  → class & label resolved at render */
const tagCls = { face:'teal', body:'', laser:'laser', new:'new', acc:'acc', analysis:'analysis', needle:'micro', both:'both' };
const devices = [
  { name:'Zemits Quidion NG', price:null, tag:'new', icon:'💫',
    type:{lv:'Diožu lāzers matu epilācijai · 808 nm', ru:'Диодный лазер для эпиляции · 808 нм', en:'Diode hair-removal laser · 808 nm'},
    feat:{
      lv:['1200W jauda + QDC® impulsu stabilizācija','4 maināmi spota izmēri (Ø6 · 15×15 · 15×20 · 15×30)','2× spēcīgāka dzesēšanas sistēma','Droša ādas tipiem I–V','Visa ķermeņa un sejas zonas'],
      ru:['Мощность 1200 Вт + стабилизация импульса QDC®','4 сменных размера пятна (Ø6 · 15×15 · 15×20 · 15×30)','Усиленная система охлаждения 2×','Безопасно для типов кожи I–V','Все зоны тела и лица'],
      en:['1200W power + QDC® pulse stabilization','4 interchangeable spot sizes (Ø6 · 15×15 · 15×20 · 15×30)','2× stronger cooling system','Safe for skin types I–V','All body and facial zones']
    }},
  { name:'Zemits OgmaLaze', price:null, tag:'laser', icon:'🔴',
    type:{lv:'Nd:YAG lāzers tetovējumu noņemšanai', ru:'Nd:YAG лазер для удаления татуировок', en:'Nd:YAG laser for tattoo removal'},
    feat:{
      lv:['Tetovējumu noņemšana (melns, zils, sarkans u.c.)','Permanentā grima noņemšana','Hiperpigmentācijas ārstēšana','Oglekļa sejas pīlings'],
      ru:['Удаление татуировок (чёрный, синий, красный и др.)','Удаление перманентного макияжа','Лечение гиперпигментации','Карбоновый пилинг'],
      en:['Tattoo removal (black, blue, red, etc.)','Permanent makeup removal','Hyperpigmentation treatment','Carbon peel facial']
    }},
  { name:'Zemits Skyfrax Pro', price:null, tag:'needle', icon:'⊕',
    type:{lv:'Mikroadatu RF sistēma', ru:'RF-система с микроиглами', en:'Microneedling RF system'},
    feat:{
      lv:['Mikroadatu un RF kombinācija','Dabiskā kolagēna un elastīna veidošanās','Ādas elastības un stingrības uzlabošana','Akne rētu izlīdzināšana'],
      ru:['Комбинация микроигл и RF','Выработка натурального коллагена и эластина','Улучшение эластичности и упругости кожи','Выравнивание текстуры и шрамов от акне'],
      en:['Microneedling & RF combination','Natural collagen & elastin production','Improved skin elasticity & firmness','Acne scar & texture smoothing']
    }},
  { name:'Zemits Endoluxx Pro', price:13000, tag:'both', icon:'🌊',
    type:{lv:'Endomasāžas iekārta ķermenim un sejai', ru:'Аппарат эндомассажа для тела и лица', en:'Endo-massage device for body & face'},
    feat:{
      lv:['Endomasāža ar 3D rotējošām sfērām','Uzlaboti uzgaļi sejai un ķermenim','Dziļo audu masāža'],
      ru:['Эндомассаж с 3D-вращающимися сферами','Улучшенные насадки для лица и тела','Глубокий массаж тканей'],
      en:['Endo-massage with 3D rotating spheres','Advanced attachments for face and body','Deep tissue massage']
    }},
  { name:'Zemits Bionexis Lite', price:11000, tag:'body', icon:'💆',
    type:{lv:'Ķermeņa kontūrēšanas sistēma', ru:'Система контурирования тела', en:'Body contouring system'},
    feat:{
      lv:['Vakuuma terapija','Pretcelulīta ruļļu masāža','RF liftings','LED terapija','Kavitācija'],
      ru:['Вакуумная терапия','Антицеллюлитный роликовый массаж','RF-лифтинг','LED-терапия','Кавитация'],
      en:['Vacuum therapy','Anti-cellulite roller massage','RF lifting','LED therapy','Cavitation']
    }},
  { name:'Zemits Veraface Pro NG', price:5200, tag:'analysis', icon:'🔬',
    type:{lv:'Jaunākās paaudzes ādas analizators', ru:'Анализатор кожи нового поколения', en:'New-generation skin analyzer'},
    feat:{
      lv:['Augstas izšķirtspējas 20 MP kamera ar 5 spektra režīmiem','8 vizuālās projekcijas, tostarp negatīvā un pozitīvā polarizācija','Padziļināta profilēšana pēc Baumana (Baumann) 16 ādas tipiem','VeraScope™ sistēma: ādas mitruma mērījumi 4 zonās','VeraScope™ uzgalis sejas ādas un galvas ādas mikrofotografēšanai','15,6 collu skārienekrāns, kas pielāgots ērtai konsultāciju vadīšanai'],
      ru:['Камера высокого разрешения 20 Мп с 5 спектральными режимами','8 визуальных проекций, включая негативную и позитивную поляризацию','Глубокое профилирование по 16 типам кожи Бауманн','Система VeraScope™: замер гидробаланса в 4 зонах','Насадка VeraScope™ для микросъёмки кожи и кожи головы','Сенсорный дисплей 15,6″, оптимизированный под консультации'],
      en:['20 MP high-resolution camera with 5 spectral modes','8 visual projections, incl. negative and positive polarisation','In-depth profiling by the 16 Baumann skin types','VeraScope™ system: 4-zone hydration measurement','VeraScope™ attachment for close-up skin and scalp imaging','15.6″ touch display optimised for consultations']
    }},
  { name:'Zemits Verstand HD Pro', price:4200, tag:'face', icon:'💎',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная платформа для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['RF liftings','Elektroporācija','Elektroporācija (periorbitālajai zonai)','Hidrodermabrāzija','Ultraskaņas skrubis','Vakuuma terapija','Aukstuma terapija','Skābekļa terapija','Dimantu dermabrāzija'],
      ru:['RF-лифтинг','Электропорация','Электропорация (периорбитальная зона)','Гидродермабразия','Ультразвуковой пилинг','Вакуумная терапия','Криотерапия','Кислородная терапия','Алмазная дермабразия'],
      en:['RF lifting','Electroporation','Electroporation (periorbital area)','Hydrodermabrasion','Ultrasonic scrubber','Vacuum therapy','Cold therapy','Oxygen therapy','Diamond dermabrasion']
    }},
  { name:'Zemits Veraface', price:4200, tag:'analysis', icon:'🔬',
    type:{lv:'Ādas analizators', ru:'Анализатор кожи', en:'Skin analyzer'},
    feat:{
      lv:['HD kamera ar 3 gaismas spektriem (RGB, UV, PL)','Ādas analīze pēc 12 parametriem','Ādas taukainuma un sausuma bāzes novērtējums','Iebūvēts mitruma līmeņa sensors','Personalizēti procedūru ieteikumi','Klientu datubāze, procedūru vēsture un «pirms/pēc» salīdzinājums'],
      ru:['HD-камера с 3 спектрами света (RGB, UV, PL)','Анализ кожи по 12 параметрам','Базовая оценка жирности и сухости кожи','Встроенный датчик влажности','Персональные рекомендации по процедурам','Учёт клиентов, история и сравнение до/после'],
      en:['HD camera with 3 light spectra (RGB, UV, PL)','Skin analysis across 12 parameters','Basic oiliness and dryness assessment','Built-in moisture sensor','Personalised treatment recommendations','Client records, history and before/after comparison']
    }},
  { name:'Zemits Friolift', price:3200, tag:'both', icon:'❄️',
    type:{lv:'Kontrastterapija ādas atjaunošanai sejai un ķermenim', ru:'Контрастная терапия для омоложения кожи лица и тела', en:'Contrast therapy for face and body skin rejuvenation'},
    feat:{
      lv:['Multipolārs RF liftings','Bipolārs RF liftings','Tripolārs RF liftings','Krioterapija'],
      ru:['Мультиполярный RF-лифтинг','Биполярный RF-лифтинг','Триполярный RF-лифтинг','Криотерапия'],
      en:['Multipolar RF lifting','Bipolar RF lifting','Tripolar RF lifting','Cryotherapy']
    }},
  { name:'Zemits Verstand HD', price:3200, tag:'face', icon:'💎',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная платформа для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['RF liftings','Elektroporācija','Elektroporācija (periorbitālajai zonai)','Hidrodermabrāzija','Ultraskaņas skrubis','Vakuuma terapija','Aukstuma terapija','Skābekļa terapija'],
      ru:['RF-лифтинг','Электропорация','Электропорация (периорбитальная зона)','Гидродермабразия','Ультразвуковой пилинг','Вакуумная терапия','Криотерапия','Кислородная терапия'],
      en:['RF lifting','Electroporation','Electroporation (periorbital area)','Hydrodermabrasion','Ultrasonic scrubber','Vacuum therapy','Cold therapy','Oxygen therapy']
    }},
  { name:'Zemits OxiVelour Pro', price:3200, tag:'face', icon:'💨',
    type:{lv:'Skābekļa terapijas un skābekļa infūzijas ierīce', ru:'Аппарат кислородной терапии и кислородной инфузии', en:'Oxygen therapy & oxygen infusion device'},
    feat:{
      lv:['Komplektā ietilpst: aerogrāfs un skābekļa kupols','Procedūra tiek papildināta ar aktīvajām vielām'],
      ru:['В комплекте: аэрограф и кислородный купол','Процедура дополняется активными веществами'],
      en:['Included: airbrush and oxygen dome','Treatment enhanced with active ingredients']
    }},
  { name:'Zemits Celluspice Pro', price:3000, tag:'both', icon:'🌡️',
    type:{lv:'Vakuuma–termomasāžas iekārta', ru:'Вакуумно-термомассажный аппарат', en:'Vacuum thermo-massage device'},
    feat:{
      lv:['Divkārša iedarbība cīņā ar tauku nogulsnējumiem','Ieteicama pēc kriolipolīzes vai kavitācijas'],
      ru:['Двойное воздействие в борьбе с жировыми отложениями','Рекомендуется после криолиполиза или кавитации'],
      en:['Dual action against fat deposits','Recommended after cryolipolysis or cavitation']
    }},
  { name:'Zemits EvoPlasm', price:3000, tag:'face', icon:'⚡',
    type:{lv:'Aukstās plazmas iekārta', ru:'Аппарат холодной плазмы', en:'Cold plasma device'},
    feat:{
      lv:['Aukstā plazma: universāls papildinājums jebkurai procedūrai','Nodrošinot rezultātus, kas ir redzami jau pēc pirmās vizītes'],
      ru:['Холодная плазма: универсальное дополнение к любой процедуре','Результат заметен уже после первого визита'],
      en:['Cold plasma: a universal add-on to any treatment','Results visible after the very first visit']
    }},
  { name:'Zemits Abigon Pro', price:2900, tag:'both', icon:'🌀',
    type:{lv:'Ķermeņa un sejas kontūrēšanas sistēma', ru:'Система контурирования тела и лица', en:'Body & face contouring system'},
    feat:{
      lv:['Vakuuma terapija','Multipolārs RF liftings','Bipolārs RF liftings','Tripolārs RF liftings','Kavitācija'],
      ru:['Вакуумная терапия','Мультиполярный RF-лифтинг','Биполярный RF-лифтинг','Триполярный RF-лифтинг','Кавитация'],
      en:['Vacuum therapy','Multipolar RF lifting','Bipolar RF lifting','Tripolar RF lifting','Cavitation']
    }},
  { name:'Zemits Verstand Pro', price:2700, tag:'face', icon:'✨',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная платформа для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['RF liftings','Elektroporācija','Dimanta mikrodermabrāzija','Ultraskaņas skrubis','Sonoforēze','Mikrostrāvas terapija','Vakuuma terapija'],
      ru:['RF-лифтинг','Электропорация','Алмазная микродермабразия','Ультразвуковой пилинг','Фонофорез','Микротоковая терапия','Вакуумная терапия'],
      en:['RF lifting','Electroporation','Diamond microdermabrasion','Ultrasonic scrubber','Sonophoresis','Microcurrent therapy','Vacuum therapy']
    }},
  { name:'Zemits Eau Sante NG', price:2700, tag:'face', icon:'💧',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная система для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['RF liftings','Ultraskaņas skrubis','Sonoforēze','Hidrodermabrāzija','Skābekļa terapija','Aukstuma terapija'],
      ru:['RF-лифтинг','Ультразвуковой пилинг','Фонофорез','Гидродермабразия','Кислородная терапия','Криотерапия'],
      en:['RF lifting','Ultrasonic scrubber','Sonophoresis','Hydrodermabrasion','Oxygen therapy','Cold therapy']
    }},
  { name:'Zemits Verstand', price:2600, tag:'face', icon:'🧴',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная платформа для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['RF liftings','Elektroporācija','Elektroporācija (periorbitālajai zonai)','Dimanta mikrodermabrāzija','Ultraskaņas skrubis','Aukstuma terapija','Skābekļa terapija','Vakuuma terapija'],
      ru:['RF-лифтинг','Электропорация','Электропорация (периорбитальная зона)','Алмазная микродермабразия','Ультразвуковой пилинг','Криотерапия','Кислородная терапия','Вакуумная терапия'],
      en:['RF lifting','Electroporation','Electroporation (periorbital area)','Diamond microdermabrasion','Ultrasonic scrubber','Cold therapy','Oxygen therapy','Vacuum therapy']
    }},
  { name:'Zemits Dermeluxx Pro', price:2600, tag:'face', icon:'💧',
    type:{lv:'Daudzfunkcionāla sejas platforma', ru:'Многофункциональная платформа для лица', en:'Multifunctional facial platform'},
    feat:{
      lv:['Hidrodermabrāzija','Skābekļa terapija','Aukstuma terapija'],
      ru:['Гидродермабразия','Кислородная терапия','Криотерапия'],
      en:['Hydrodermabrasion','Oxygen therapy','Cold therapy']
    }},
  { name:'Zemits Demeter Pro', price:null,   // price not known yet → "Cena pēc pieprasījuma"
    tag:'body', icon:'🦵',
    type:{lv:'Presoterapija — limfodrenāžas iekārta', ru:'Прессотерапия — аппарат лимфодренажа', en:'Pressotherapy — lymphatic drainage'},
    feat:{
      lv:['Profesionāla limfodrenāžas ierīce ar 44 kamerām','Gaisa spiediena intensitāti var regulēt četros līmeņos (120 līdz 240 mm Hg)','Kostīms ir izgatavots no izturīga materiāla, un tam ir universāls izmērs','Maksimālais klienta svars līdz 200 kg','Apstrādes zonas — kājas, vēders, sēžamvieta un rokas'],
      ru:['Профессиональный аппарат лимфодренажа с 44 камерами','Интенсивность давления регулируется на четырёх уровнях (от 120 до 240 мм рт. ст.)','Костюм из прочного материала, универсальный размер','Максимальный вес клиента — до 200 кг','Зоны воздействия — ноги, живот, ягодицы и руки'],
      en:['Professional lymphatic drainage device with 44 chambers','Air pressure adjustable in four levels (120 to 240 mmHg)','Durable suit material, universal size','Maximum client weight up to 200 kg','Treatment zones — legs, abdomen, buttocks and arms']
    }},
  { name:'Zemits Sisley 2.0', price:2000, tag:'body', icon:'🦵',
    type:{lv:'Presoterapija — limfodrenāžas iekārta', ru:'Прессотерапия — аппарат лимфодренажа', en:'Pressotherapy — lymphatic drainage'},
    feat:{
      lv:['Profesionāla limfodrenāžas ierīce ar 24 kamerām','Gaisa spiediena intensitāti var regulēt četros līmeņos (120 līdz 240 mm Hg)','Kostīms ir izgatavots no izturīga materiāla, un tam ir universāls izmērs','Maksimālais klienta svars līdz 200 kg','Apstrādes zonas — kājas, vēders, sēžamvieta un rokas'],
      ru:['Профессиональный аппарат лимфодренажа с 24 камерами','Интенсивность давления регулируется на четырёх уровнях (от 120 до 240 мм рт. ст.)','Костюм из прочного материала, универсальный размер','Максимальный вес клиента — до 200 кг','Зоны воздействия — ноги, живот, ягодицы и руки'],
      en:['Professional lymphatic drainage device with 24 chambers','Air pressure adjustable in four levels (120 to 240 mmHg)','Durable suit material, universal size','Maximum client weight up to 200 kg','Treatment zones — legs, abdomen, buttocks and arms']
    }},
  { name:'Zemits Leger 2.0', price:1000, tag:'both', icon:'🫧',
    type:{lv:'Vakuuma terapijas sistēma', ru:'Система вакуумной терапии', en:'Vacuum therapy system'},
    feat:{
      lv:['Vakuuma terapija','Trīs metāliski uzgaļi','Trīs pāri plastikas uzgaļi','Seši pāri stikla uzgaļi'],
      ru:['Вакуумная терапия','Три металлические насадки','Три пары пластиковых насадок','Шесть пар стеклянных насадок'],
      en:['Vacuum therapy','Three metal tips','Three pairs of plastic tips','Six pairs of glass tips']
    }},
  { name:'Zemits Vivalumix', price:1000, tag:'both', icon:'💡',
    type:{lv:'LED gaismas terapija', ru:'LED светотерапия', en:'LED light therapy'},
    feat:{
      lv:['Zilā gaisma','Sarkanā gaisma','Infrasarkanā gaisma','Zaļā gaisma','Dzeltenā gaisma','Ciāna gaisma','Violetā gaisma'],
      ru:['Синий свет','Красный свет','Инфракрасный свет','Зелёный свет','Жёлтый свет','Циановый свет','Фиолетовый свет'],
      en:['Blue light','Red light','Infrared light','Green light','Yellow light','Cyan light','Violet light']
    }},
  { name:'Zemits Adrinox 2.0', price:950, tag:'both', icon:'🔌',
    type:{lv:'Mikrostrāvas terapija', ru:'Микротоковая терапия', en:'Microcurrent therapy'},
    feat:{
      lv:['Trīs pāri manipulas','Viens pāris cimdi'],
      ru:['Три пары манипул','Одна пара перчаток'],
      en:['Three pairs of probes','Conductive glove set']
    }},
  { name:'Zemits Klein El', price:750, tag:'both', icon:'💉',
    type:{lv:'Bezadatu mezoterapija (elektroporācija)', ru:'Безыгольная мезотерапия (электропорация)', en:'No-needle mesotherapy (electroporation)'},
    feat:{
      lv:['Elektroporācija sejai','Elektroporācija ķermenim','Elektroporācija periorbitālajai zonai'],
      ru:['Электропорация для лица','Электропорация для тела','Электропорация для периорбитальной зоны'],
      en:['Electroporation for face','Electroporation for body','Electroporation for periorbital area']
    }},
  { name:'Zemits Skin Expert', price:240, tag:'face', icon:'🪞',
    type:{lv:'Ultraskaņas pīlings', ru:'Ультразвуковой пилинг', en:'Ultrasonic peeling'},
    feat:{
      lv:['Ultraskaņas pīlings','Sejas attīrīšana'],
      ru:['Ультразвуковой пилинг','Очищение лица'],
      en:['Ultrasonic peeling','Facial cleansing']
    }},
  { name:'Zemits Elastistrom', price:240, tag:'face', icon:'🧤',
    type:{lv:'Mikrostrāvas terapija (cimdi)', ru:'Микротоковая терапия (перчатки)', en:'Microcurrent therapy (gloves)'},
    feat:{
      lv:['Mikrostrāvas terapija'],
      ru:['Микротоковая терапия'],
      en:['Microcurrent therapy']
    }},
  { name:'Zemits Celltite', price:240, tag:'face', icon:'🔋',
    type:{lv:'Mikrostrāvas terapija sejai', ru:'Микротоковая терапия для лица', en:'Microcurrent therapy for face'},
    feat:{
      lv:['Mikrostrāvas terapija'],
      ru:['Микротоковая терапия'],
      en:['Microcurrent therapy']
    }},
  { name:'Zemits PrimeCart', price:170, from:true, tag:'acc', icon:'🛒',
    type:{lv:'Procedūru ratiņi · vairāki izmēri', ru:'Косметологическая тележка · несколько размеров', en:'Treatment trolley · several sizes'},
    feat:{
      lv:['Stabils statīvs iekārtām','Pārvietojams, ar ritenīšiem','Atvērti plaukti aksesuāriem'],
      ru:['Устойчивая стойка для аппаратов','Мобильная, на колёсиках','Открытые полки для аксессуаров'],
      en:['Stable equipment stand','Mobile, on casters','Open shelves for accessories']
    }}
];

/* ───────── EXPANDED INFO (flagships) → "Learn more" modal ───────── */
const deviceInfo = {
  'Zemits Quidion NG': {
    lv:{desc:'Nākamās paaudzes diožu lāzers matu epilācijai ar 808 nm viļņa garumu un 1200 W jaudu. QDC® impulsu stabilizācija nodrošina vienmērīgu enerģiju, ātru procedūru un komfortu visiem ādas tipiem.',
        treats:['Ilgstoša matu samazināšana visās ķermeņa zonās','Seja, paduses, bikini, kājas, mugura','Ieaugušie mati un kairinājums pēc skūšanās','Droša ādas tipiem I–V']},
    ru:{desc:'Диодный лазер нового поколения для эпиляции: длина волны 808 нм, мощность 1200 Вт. Стабилизация импульса QDC® обеспечивает равномерную энергию, скорость и комфорт для всех типов кожи.',
        treats:['Долговременное сокращение волос на всех зонах','Лицо, подмышки, бикини, ноги, спина','Вросшие волосы и раздражение после бритья','Безопасно для типов кожи I–V']},
    en:{desc:'Next-generation 808 nm diode hair-removal laser with 1200 W power. QDC® pulse stabilization delivers uniform energy, fast sessions, and comfort across all skin types.',
        treats:['Long-term hair reduction on all body zones','Face, underarms, bikini, legs, back','Ingrown hairs and post-shaving irritation','Safe for skin types I–V']}
  },
  'Zemits OgmaLaze': {
    lv:{desc:'Nd:YAG lāzers tetovējumu un pigmentācijas noņemšanai. Lāzera impulsi sasmalcina pigmenta daļiņas, kuras organisms pēc tam dabiski izvada.',
        treats:['Tetovējumu noņemšana (melns, zils, sarkans u.c.)','Permanentā grima korekcija','Hiperpigmentācija un vecuma plankumi','Oglekļa (karbona) sejas pīlings']},
    ru:{desc:'Nd:YAG лазер для удаления татуировок и пигментации. Импульсы разрушают частицы пигмента, которые затем естественно выводятся организмом.',
        treats:['Удаление татуировок (чёрный, синий, красный и др.)','Коррекция перманентного макияжа','Гиперпигментация и возрастные пятна','Карбоновый пилинг лица']},
    en:{desc:'Nd:YAG laser for tattoo and pigmentation removal. Pulses shatter pigment particles, which the body then clears naturally.',
        treats:['Tattoo removal (black, blue, red, etc.)','Permanent makeup correction','Hyperpigmentation and age spots','Carbon peel facial']}
  },
  'Zemits Skyfrax Pro': {
    lv:{desc:'Mikroadatu radiofrekvences sistēma, kas apvieno mikropunkcijas ar RF enerģiju, lai stimulētu kolagēna un elastīna veidošanos dziļākajos ādas slāņos.',
        treats:['Ādas elastības un stingrības uzlabošana','Akne rētas un paplašinātas poras','Smalkas grumbiņas un ādas tekstūra','Striju izskata mazināšana']},
    ru:{desc:'Микроигольчатая RF-система: сочетает микропроколы с RF-энергией для стимуляции коллагена и эластина в глубоких слоях кожи.',
        treats:['Улучшение эластичности и упругости кожи','Шрамы от акне и расширенные поры','Мелкие морщины и текстура кожи','Уменьшение видимости растяжек']},
    en:{desc:'Microneedling radiofrequency system combining micro-punctures with RF energy to stimulate collagen and elastin in deeper skin layers.',
        treats:['Improved skin elasticity and firmness','Acne scars and enlarged pores','Fine lines and skin texture','Reduced appearance of stretch marks']}
  },
  'Zemits Endoluxx Pro': {
    lv:{desc:'Endomasāžas aparāts ķermenim un sejai ar rotējošām sfērām, kas rada mikrovibrācijas un kompresijas efektu, uzlabojot mikrocirkulāciju, audu tonusu, limfas cirkulāciju, mazinātu celulītu un liekos taukaudus, novērstu toksīnu un šķidruma uzkrāšanos.',
        treats:['Celulīta un ķermeņa kontūru korekcija','Limfas aizplūšana un pietūkuma mazināšana','Muskuļu sasprindzinājuma atbrīvošana','Ādas tonusa un elastības uzlabošana']},
    ru:{desc:'Аппарат эндомассажа для тела и лица с вращающимися сферами, создающими эффект микровибрации и компрессии. Улучшает микроциркуляцию, тонус тканей и лимфоток, помогает уменьшить целлюлит и лишние жировые отложения, предотвращает накопление токсинов и жидкости.',
        treats:['Коррекция целлюлита и контуров тела','Лимфоотток и уменьшение отёчности','Снятие мышечного напряжения','Улучшение тонуса и эластичности кожи']},
    en:{desc:'Endo-massage device for body and face with rotating spheres that create a microvibration and compression effect. It improves microcirculation, tissue tone and lymph flow, helps reduce cellulite and excess fat, and prevents the build-up of toxins and fluid.',
        treats:['Cellulite and body contour correction','Lymphatic drainage and reduced puffiness','Muscle tension relief','Improved skin tone and elasticity']}
  },
  'Zemits Bionexis Lite': {
    lv:{desc:'Daudzfunkcionāla ķermeņa kontūrēšanas sistēma, kas vienā aparātā apvieno aparātmetodes izciliem rezultātiem ķermeņa kontūru korekcijai un svara samazināšanai, limfas cirkulācijas aktivizēšanai un tonusa uzlabošanai.',
        treats:['Celulīts un lokāli tauku uzkrājumi','Ķermeņa kontūru veidošana','Ādas stingrība un elastība','Limfodrenāža un mikrocirkulācija']},
    ru:{desc:'Многофункциональная система контурирования тела, объединяющая в одном аппарате несколько аппаратных методик для выдающихся результатов в коррекции контуров тела и снижении веса, активации лимфообращения и улучшении тонуса.',
        treats:['Целлюлит и локальные жировые отложения','Формирование контуров тела','Упругость и эластичность кожи','Лимфодренаж и микроциркуляция']},
    en:{desc:'A multifunctional body contouring system that combines several device methods in one unit for outstanding results in body contour correction and weight reduction, lymphatic activation and improved tone.',
        treats:['Cellulite and localized fat deposits','Body contour shaping','Skin firmness and elasticity','Lymphatic drainage and microcirculation']}
  },
  'Zemits Verstand HD Pro': {
    lv:{desc:'Inovatīva sejas platforma ar 8 tehnoloģijām un patentēto HydroDiamond™ procedūru. Viena iekārta ļauj veidot individuālus sejas protokolus, lai uzlabotu ādas kvalitāti un risinātu dažādas ādas problēmas.',
        treats:['Novecošanās pazīmes un ādas ļenganums','Aizsērējušas poras un komedoni','Dehidratācija un blāva āda','Pigmentācija un nevienmērīgs tonis']},
    ru:{desc:'Инновационная платформа для лица с 8 технологиями и запатентованной процедурой HydroDiamond™. Один аппарат позволяет создавать индивидуальные протоколы для лица, чтобы улучшить качество кожи и решать различные её проблемы.',
        treats:['Признаки старения и дряблость кожи','Забитые поры и комедоны','Обезвоженность и тусклость кожи','Пигментация и неровный тон']},
    en:{desc:'An innovative facial platform with 8 technologies and the patented HydroDiamond™ treatment. One device lets you build individual facial protocols to improve skin quality and address a range of skin concerns.',
        treats:['Signs of aging and skin laxity','Clogged pores and comedones','Dehydration and dull skin','Pigmentation and uneven tone']}
  },
  'Zemits Veraface Pro NG': {
    lv:{desc:'Jaunākās paaudzes ādas analizators, kas aprīkots ar 20 MP kameru un 5 spektra režīmiem. 8 vizuālās projekcijas, tostarp negatīvā un pozitīvā polarizācija, nodrošina visaptverošu ādas stāvokļa izvērtēšanu. Profilēšana pēc Baumana (Baumann) 16 ādas tipu sistēmas ļauj precīzi piemeklēt atbilstošākās salona procedūras un mājas kopšanas plānu. Integrētā VeraScope™ sistēma mēra mitruma līmeni 4 atsevišķās zonās, bet tās uzgalis sniedz iespēju veikt sejas un galvas ādas detalizētu mikrofotografēšanu. Lielais 15,6 collu skārienekrāns padara konsultācijas gaitu klientam skaidru, uzskatāmu un uzticamu.',
        treats:['Padziļināta ādas diagnostika','Ādas tipa noteikšana pēc Baumana (Baumann) klasifikācijas','Galvas ādas stāvokļa izvērtēšana','Individuālu procedūru un mājas kopšanas līdzekļu piemeklēšana']},
    ru:{desc:'Анализатор кожи нового поколения с камерой 20 Мп и 5 спектральными режимами. 8 визуальных проекций, включая негативную и позитивную поляризацию, позволяют детально оценить состояние кожи, а профилирование по 16 типам кожи Бауманн помогает точнее подобрать процедуры и домашний уход. Встроенная система VeraScope™ измеряет гидробаланс в 4 зонах, а её насадка позволяет делать микросъёмку кожи и кожи головы. Большой сенсорный дисплей 15,6″ делает консультацию наглядной для клиента.',
        treats:['Углублённая диагностика кожи','Определение типа кожи по классификации Бауманн','Оценка состояния кожи головы','Подбор процедур и домашнего ухода']},
    en:{desc:'A new-generation skin analyser with a 20 MP camera and 5 spectral modes. Eight visual projections, including negative and positive polarisation, give a detailed view of skin condition, while profiling by the 16 Baumann skin types helps you choose treatments and homecare more precisely. The integrated VeraScope™ system measures hydration in 4 zones, and its attachment captures close-up images of the skin and scalp. The large 15.6″ touch display makes every consultation clear and visual for the client.',
        treats:['In-depth skin diagnostics','Baumann skin type identification','Scalp assessment','Choosing treatments and homecare']}
  },
  'Zemits Veraface': {
    lv:{desc:'Profesionāls ādas analizators, kas vizualizē ādas stāvokli — poras, grumbas, pigmentāciju, mitruma līmeni un citus rādītājus. Sistēma veic padziļinātu ādas analīzi pēc 12 parametriem un automātiski ģenerē personalizētus procedūru ieteikumus, kas pielāgoti tieši jūsu klīnikas vai salona piedāvāto pakalpojumu klāstam.',
        treats:['Padziļināta ādas stāvokļa diagnostika','Datu balstīta procedūru plānošana','Klientu uzskaite un apmeklējumu vēsture','Uzskatāma rezultātu demonstrēšana «pirms un pēc»']},
    ru:{desc:'Профессиональный анализатор кожи, визуализирующий её состояние — поры, морщины, пигментацию, увлажнённость и др. Система проводит детальный анализ кожи по 12 параметрам и автоматически формирует персональные рекомендации по процедурам, адаптированные именно под ваш перечень услуг.',
        treats:['Углублённая диагностика кожи','Планирование процедур по данным','Учёт и история клиентов','Демонстрация результатов до/после']},
    en:{desc:'A professional skin analyser that visualises skin condition — pores, wrinkles, pigmentation, hydration and more. The system performs a detailed skin analysis across 12 parameters and automatically prepares personalised treatment recommendations tailored to the exact range of services you offer.',
        treats:['In-depth skin diagnostics','Data-driven treatment planning','Client records and history','Before/after result demonstration']}
  },
  'Zemits Friolift': {
    lv:{desc:'Progresīva ādas atjaunošanas sistēma, kas apvieno radiofrekvenci (RF) ar krioterapiju, lai stimulētu kolagēnu, nostiprinātu sejas ovālu, uzlabotu ādas kvalitāti un mazinātu novecošanās pazīmes. Kontrastterapija stimulē dabiskos reģenerācijas procesus un veicina kolagēna un elastīna izstrādi, padarot ādu tvirtāku un jauneklīgāku.',
        treats:['Ādas ļenganums un kontūru zudums','Smalkas grumbiņas','Pietūkums un nogurusi āda','Sejas un ķermeņa nostiprināšana']},
    ru:{desc:'Прогрессивная система омоложения кожи, сочетающая радиочастоту (RF) с криотерапией, чтобы стимулировать коллаген, подтянуть овал лица, улучшить качество кожи и уменьшить признаки старения. Контрастная терапия запускает естественные процессы регенерации и способствует выработке коллагена и эластина, делая кожу более упругой и молодой.',
        treats:['Дряблость кожи и потеря контуров','Мелкие морщины','Отёчность и уставшая кожа','Подтяжка лица и тела']},
    en:{desc:'An advanced skin rejuvenation system combining radiofrequency (RF) with cryotherapy to stimulate collagen, firm the facial contour, improve skin quality and reduce signs of ageing. Contrast therapy stimulates natural regeneration and promotes collagen and elastin production, leaving skin firmer and more youthful.',
        treats:['Skin laxity and loss of contour','Fine lines','Puffiness and tired skin','Face and body tightening']}
  },
  'Zemits Verstand HD': {
    lv:{desc:'Daudzfunkcionāla sejas platforma ar 8 tehnoloģijām un HydroDiamond™ procedūru attīrīšanai, hidratācijai un atjaunošanai. Tehnoloģijas izmantojamas atsevišķi vai kombinācijā.',
        treats:['Novecošanās un ādas ļenganums','Aizsērējušas poras un komedoni','Dehidratācija un blāva āda','Nevienmērīgs tonis']},
    ru:{desc:'Многофункциональная платформа для лица с 8 технологиями и процедурой HydroDiamond™ для очищения, увлажнения и обновления. Технологии работают по отдельности или в комбинации.',
        treats:['Старение и дряблость кожи','Забитые поры и комедоны','Обезвоженность и тусклость кожи','Неровный тон']},
    en:{desc:'Multifunctional facial platform with 8 technologies and HydroDiamond™ for cleansing, hydration, and renewal. Modalities work individually or combined.',
        treats:['Aging and skin laxity','Clogged pores and comedones','Dehydration and dull skin','Uneven tone']}
  },
  'Zemits Celluspice Pro': {
    lv:{desc:'Vakuuma–termomasāžas ir inovatīva ķermeņa kontūrēšanas ierīce, kas apvieno vakuuma un termisko masāžu, nodrošinot dziļu audu apstrādi un uzlabojot ādas tonusu. Pateicoties kontrolētai sildīšanai un vakuuma iedarbībai, ierīce efektīvi mazina tauku nogulsnējumus, uzlabo asinsriti un stimulē kolagēna veidošanos.',
        treats:['Celulīts un ķermeņa kontūras','Limfodrenāža un pietūkums','Ādas elastība','Atslābinoša ķermeņa masāža']},
    ru:{desc:'Вакуумно-термомассажный аппарат — инновационное устройство для контурирования тела, сочетающее вакуумный и термический массаж: обеспечивает глубокую проработку тканей и улучшает тонус кожи. Благодаря контролируемому нагреву и вакуумному воздействию аппарат эффективно уменьшает жировые отложения, улучшает кровообращение и стимулирует выработку коллагена.',
        treats:['Целлюлит и контуры тела','Лимфодренаж и отёчность','Эластичность кожи','Расслабляющий массаж тела']},
    en:{desc:'An innovative vacuum thermo-massage device for body contouring that combines vacuum and thermal massage for deep tissue work and improved skin tone. Thanks to controlled heating and vacuum action, it effectively reduces fat deposits, improves circulation and stimulates collagen production.',
        treats:['Cellulite and body contours','Lymphatic drainage and puffiness','Skin elasticity','Relaxing body massage']}
  },
  'Zemits EvoPlasm': {
    lv:{desc:'Zemits EvoPlasm™ ir inovatīva aukstās plazmas sistēma, kas acumirklī uzlabo jebkuras estētiskās procedūras rezultātus, attīrot, izgaismojot, atsvaidzinot un nostiprinot ādu. Plazma palīdz mazināt iekaisumu un uzlabot aktīvo vielu uzsūkšanos.',
        treats:['Problemātiska un akne nosliece','Ādas dezinfekcija un sanācija','Atjaunošana pēc procedūrām','Aktīvo vielu uzsūkšanās uzlabošana']},
    ru:{desc:'Zemits EvoPlasm™ — инновационная система холодной плазмы, которая мгновенно усиливает результат любой эстетической процедуры: очищает, придаёт сияние, освежает и подтягивает кожу. Плазма помогает уменьшить воспаление и улучшает проникновение активных веществ.',
        treats:['Проблемная и склонная к акне кожа','Дезинфекция и санация кожи','Восстановление после процедур','Улучшение впитывания активов']},
    en:{desc:'Zemits EvoPlasm™ is an innovative cold plasma system that instantly boosts the results of any aesthetic treatment by cleansing, brightening, refreshing and firming the skin. Plasma helps reduce inflammation and improves absorption of active ingredients.',
        treats:['Problematic and acne-prone skin','Skin disinfection and sanitation','Recovery after procedures','Improved active-ingredient absorption']}
  },
  'Zemits Abigon Pro': {
    lv:{desc:'Zemits Abigon Pro ir moderna un visaptveroša ķermeņa kontūrēšanas sistēma, kas apvieno progresīvas tehnoloģijas, lai panāktu optimālus rezultātus ķermeņa un sejas aprises uzlabošanā, kā arī ādas nostiprināšanā.',
        treats:['Lokāli tauku uzkrājumi','Celulīts','Ādas stingrība sejai un ķermenim','Limfodrenāža']},
    ru:{desc:'Zemits Abigon Pro — современная комплексная система контурирования тела, объединяющая передовые технологии для оптимальных результатов в улучшении контуров тела и лица, а также в подтяжке кожи.',
        treats:['Локальные жировые отложения','Целлюлит','Упругость кожи лица и тела','Лимфодренаж']},
    en:{desc:'Zemits Abigon Pro is a modern, all-round body contouring system that combines advanced technologies for optimal results in refining body and facial contours and tightening the skin.',
        treats:['Localized fat deposits','Cellulite','Skin firmness for face and body','Lymphatic drainage']}
  },
  'Zemits Verstand Pro': {
    lv:{desc:'Daudzfunkcionāla sejas iekārta ar RF, mikrostrāvām, dimanta mikrodermabrāziju un citas modernas tehnoloģijas efektīvai, kompleksai sejas ādas kopšanai un ādas kvalitātes uzlabošanai .',
        treats:['Novecošanās un ādas ļenganums','Pigmentācija','Blāva un dehidratēta āda','Sejas muskuļu tonizēšana']},
    ru:{desc:'Многофункциональный аппарат для лица с RF, микротоками, алмазной микродермабразией и др. SMART-управление автоматически подбирает программу.',
        treats:['Старение и дряблость кожи','Пигментация','Тусклая и обезвоженная кожа','Тонизирование мышц лица']},
    en:{desc:'Multifunction facial device with RF, microcurrent, diamond microdermabrasion, and more. SMART control auto-selects the program for each procedure.',
        treats:['Aging and skin laxity','Pigmentation','Dull and dehydrated skin','Facial muscle toning']}
  },
  'Zemits Eau Sante NG': {
    lv:{desc:'Hidrodermabrāzijas sistēma sejai, kas attīra, eksfoliē un hidratē ādu, papildināta ar RF, sonoforēzi un skābekļa terapiju.',
        treats:['Aizsērējušas poras un komedoni','Dehidratācija un blāva āda','Smalkas grumbiņas','Vispārēja ādas atjaunošana']},
    ru:{desc:'Система гидродермабразии для лица: очищает, отшелушивает и увлажняет кожу, дополнена RF, сонофорезом и кислородной терапией.',
        treats:['Забитые поры и комедоны','Обезвоженность и тусклость','Мелкие морщины','Общее обновление кожи']},
    en:{desc:'Hydrodermabrasion facial system that cleanses, exfoliates, and hydrates the skin, complemented by RF, sonophoresis, and oxygen therapy.',
        treats:['Clogged pores and comedones','Dehydration and dullness','Fine lines','Overall skin renewal']}
  },
  'Zemits Verstand': {
    lv:{desc:'Daudzfunkcionāla sejas iekārta ar RF, elektroporāciju, dimanta mikrodermabrāziju, aukstuma un skābekļa terapiju ikdienas salona protokoliem.',
        treats:['Novecošanās pazīmes','Aizsērējušas poras','Dehidratācija un blāva āda','Pietūkums un nogurusi āda']},
    ru:{desc:'Многофункциональный аппарат для лица с RF, электропорацией, алмазной микродермабразией, холодовой и кислородной терапией для ежедневных салонных протоколов.',
        treats:['Признаки старения','Забитые поры','Обезвоженность и тусклость','Отёчность и уставшая кожа']},
    en:{desc:'Multifunction facial device with RF, electroporation, diamond microdermabrasion, cold, and oxygen therapy for everyday salon protocols.',
        treats:['Signs of aging','Clogged pores','Dehydration and dullness','Puffiness and tired skin']}
  },
  'Zemits Dermeluxx Pro': {
    lv:{desc:'Kompakta hidrodermabrāzijas sistēma, kas attīra un hidratē ādu, apvienojot hidrodermabrāziju ar skābekļa un aukstuma terapiju.',
        treats:['Dehidratācija un blāva āda','Aizsērējušas poras','Maiga eksfoliācija','Ātra ādas atsvaidzināšana']},
    ru:{desc:'Компактная система гидродермабразии: очищает и увлажняет кожу, объединяя гидродермабразию с кислородной и холодовой терапией.',
        treats:['Обезвоженность и тусклость','Забитые поры','Мягкое отшелушивание','Быстрое освежение кожи']},
    en:{desc:'Compact hydrodermabrasion system that cleanses and hydrates skin, combining hydrodermabrasion with oxygen and cold therapy.',
        treats:['Dehydration and dullness','Clogged pores','Gentle exfoliation','Quick skin refresh']}
  },
  'Zemits OxiVelour Pro': {
    lv:{desc:'Zemits OxiVelour piedāvā drošu un efektīvu risinājumu klientiem, kuri vēlas maksimālu ādas piesātināšanu ar skābekli un barošanu. Koncentratora sistēma no telpas gaisa ģenerē 93–95% tīra skābekļa plūsmu.'},
    ru:{desc:'Zemits OxiVelour — безопасное и эффективное решение для клиентов, которые хотят максимально насытить кожу кислородом и питательными веществами. Система-концентратор генерирует из воздуха помещения поток 93–95% чистого кислорода.'},
    en:{desc:'Zemits OxiVelour is a safe and effective solution for clients who want maximum oxygen saturation and nourishment of the skin. Its concentrator system generates a 93–95% pure oxygen flow from room air.'}
  },
  'Zemits Demeter Pro': {
    lv:{desc:'Presoterapijas–limfodrenāžas aparāts, kas ar kontrolētu gaisa kompresiju uzlabo limfas aizplūšanu, mazina pietūkumu un smaguma sajūtu kājās.'},
    ru:{desc:'Аппарат прессотерапии–лимфодренажа: контролируемая компрессия воздухом улучшает лимфоотток, уменьшает отёки и тяжесть в ногах.'},
    en:{desc:'Pressotherapy / lymphatic-drainage device using controlled air compression to improve lymph flow and reduce swelling and heaviness in the legs.'}
  },
  'Zemits Adrinox 2.0': {
    lv:{desc:'Zemits Adrinox 2.0 darbojas, izmantojot progresīvu tehnoloģiju, kas atjauno audu funkcionālo aktivitāti šūnu līmenī. Procedūra vispusīgi iedarbojas uz visiem ādas slāņiem, kuros norisinās patoloģiski procesi. Mikrostrāvas iedarbojas uz limfātiskās sistēmas aktivizēšanu, muskuļu pārprogramēšanu, tonizēšanu — hipertonusu un hipotonusu. Aktivizē šūnu ATF un atjaunošanās procesus.'},
    ru:{desc:'Zemits Adrinox 2.0 использует прогрессивную технологию, восстанавливающую функциональную активность тканей на клеточном уровне. Процедура комплексно воздействует на все слои кожи, в которых протекают патологические процессы. Микротоки активизируют лимфатическую систему, перепрограммируют мышцы и нормализуют тонус — как при гипертонусе, так и при гипотонусе. Активируют синтез АТФ в клетках и процессы восстановления.'},
    en:{desc:'Zemits Adrinox 2.0 uses advanced technology that restores the functional activity of tissue at the cellular level. The treatment works comprehensively on all skin layers where pathological processes occur. Microcurrents activate the lymphatic system, re-educate the muscles and normalise tone — in both hypertonus and hypotonus. They also stimulate cellular ATP and regeneration processes.'}
  },
  'Zemits Klein El': {
    lv:{desc:'Elektroporācija ir aktīvo vielu ievadīšana, nebojājot ādas dabisko aizsargbarjeru. Procedūra ļauj aktīvajām vielām sasniegt ādas dziļākos slāņus un šūnu membrānu kanālus, tādējādi veicinot procedūras efektivitāti bez ādas bojājuma un kairinājuma.'},
    ru:{desc:'Электропорация — введение активных веществ без нарушения естественного защитного барьера кожи. Процедура позволяет активным веществам достигать глубоких слоёв кожи и каналов клеточных мембран, повышая эффективность процедуры без повреждения и раздражения кожи.'},
    en:{desc:'Electroporation delivers active ingredients without damaging the skin’s natural protective barrier. It allows actives to reach the deeper skin layers and cell membrane channels, boosting treatment effectiveness without skin damage or irritation.'}
  },
  'Zemits Skin Expert': {
    lv:{desc:'Ultraskaņas pīlinga ierīce sejas ādas attīrīšanai.'},
    ru:{desc:'Аппарат ультразвукового пилинга для очищения кожи лица.'},
    en:{desc:'Ultrasonic peeling device for facial skin cleansing.'}
  },
  'Zemits Elastistrom': {
    lv:{desc:'Mikrostrāvas terapijas ierīce sejai, kas strādā ar cimdiem — procedūru meistars veic ar savām rokām.'},
    ru:{desc:'Аппарат микротоковой терапии для лица, работающий с перчатками: мастер проводит процедуру руками.'},
    en:{desc:'Microcurrent therapy device for the face that works with gloves, so the specialist performs the treatment by hand.'}
  },
  'Zemits Celltite': {
    lv:{desc:'Mikrostrāvas terapijas ierīce sejas procedūrām.'},
    ru:{desc:'Аппарат микротоковой терапии для процедур на лице.'},
    en:{desc:'Microcurrent therapy device for facial treatments.'}
  },
  'Zemits Sisley 2.0': {
    lv:{desc:'Presoterapijas–limfodrenāžas aparāts, kas ar kontrolētu gaisa kompresiju uzlabo limfas aizplūšanu, mazina pietūkumu un smaguma sajūtu kājās.',
        treats:['Limfodrenāža un pietūkums','Smaguma sajūta kājās','Celulīta papildterapija','Atjaunošanās un relaksācija']},
    ru:{desc:'Аппарат прессотерапии–лимфодренажа: контролируемая компрессия воздухом улучшает лимфоотток, уменьшает отёки и тяжесть в ногах.',
        treats:['Лимфодренаж и отёки','Тяжесть в ногах','Дополнение к антицеллюлитным программам','Восстановление и релаксация']},
    en:{desc:'Pressotherapy / lymphatic-drainage device using controlled air compression to improve lymph flow and reduce swelling and heaviness in the legs.',
        treats:['Lymphatic drainage and swelling','Heaviness in the legs','Anti-cellulite support','Recovery and relaxation']}
  },
  'Zemits Leger 2.0': {
    lv:{desc:'Zemits Leger 2.0 ir daudzfunkcionāla vakuuma un rullīšu sistēma ar metāla, plastikas un stikla uzgaļu komplektu ķermeņa formas korekcijai, limfas atteces veicināšanai, masāžai un ādas tonizēšanai.',
        treats:['Ķermeņa formas korekcija','Sēžamvietu modelēšana','Celulīts','Mikrocirkulācija un ādas tonuss']},
    ru:{desc:'Zemits Leger 2.0 — многофункциональная вакуумно-роликовая система с набором металлических, пластиковых и стеклянных насадок для коррекции фигуры, улучшения лимфооттока, массажа и тонизирования кожи.',
        treats:['Коррекция формы тела','Моделирование ягодиц','Целлюлит','Микроциркуляция и тонус кожи']},
    en:{desc:'Zemits Leger 2.0 is a multifunctional vacuum and roller system with a set of metal, plastic and glass attachments for body shaping, lymphatic drainage, massage and skin toning.',
        treats:['Body shape correction','Buttock modeling','Cellulite','Microcirculation and skin tone']}
  },
  'Zemits Vivalumix': {
    lv:{desc:'LED gaismas terapijas panelis ar 7 gaismas krāsām — zilo, sarkano, infrasarkano, zaļo, dzelteno, ciāna un violeto — dažādu ādas stāvokļu atbalstam. Bezkontakta un relaksējoša procedūra.',
        treats:['Zilā gaisma: problemātiska, akne nosliece āda','Sarkanā gaisma: novecošanās un atjaunošana','Infrasarkanā: dziļa atjaunošanās','Papildprocedūra citiem protokoliem']},
    ru:{desc:'Панель LED-светотерапии с 7 цветами света — синим, красным, инфракрасным, зелёным, жёлтым, циановым и фиолетовым — для поддержки разных состояний кожи. Бесконтактная и расслабляющая процедура.',
        treats:['Синий свет: проблемная, склонная к акне кожа','Красный свет: старение и восстановление','Инфракрасный: глубокое восстановление','Дополнение к другим протоколам']},
    en:{desc:'LED light-therapy panel with 7 light colours — blue, red, infrared, green, yellow, cyan and violet — to support various skin conditions. A contactless, relaxing treatment.',
        treats:['Blue light: problematic, acne-prone skin','Red light: aging and recovery','Infrared: deep regeneration','Add-on to other protocols']}
  },
  'Zemits PrimeCart': {
    lv:{desc:'Procedūru ratiņi aparātu un materiālu ērtai izvietošanai darba zonā. Pieejami vairākos izmēros un konfigurācijās atbilstoši kabineta vajadzībām.',
        sizes:['Pamata modelis — 170 €','PrimeCart S — 470 €','PrimeCart M — 490 €']},
    ru:{desc:'Косметологическая тележка для удобного размещения аппаратов и материалов в рабочей зоне. Доступна в нескольких размерах и конфигурациях под нужды кабинета.',
        sizes:['Базовая модель — 170 €','PrimeCart S — 470 €','PrimeCart M — 490 €']},
    en:{desc:'Treatment trolley for conveniently arranging devices and supplies in the work area. Available in several sizes and configurations to suit your room.',
        sizes:['Basic model — 170 €','PrimeCart S — 470 €','PrimeCart M — 490 €']}
  }
};


const deviceImg = {
  'Zemits Quidion NG':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/1.png',
  'Zemits OgmaLaze':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/2.png',
  'Zemits Skyfrax Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/3.png',
  'Zemits Endoluxx Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/4.png',
  'Zemits Bionexis Lite':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/5.png',
  'Zemits Verstand HD Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/6.png',
  'Zemits Veraface Pro NG':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/Updated/3.jpg',
  'Zemits Veraface':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/101.jpg',
  'Zemits Friolift':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/102.jpg',
  'Zemits Verstand HD':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/Updated/5.jpg',
  'Zemits OxiVelour Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/Updated/1.jpg',
  'Zemits Celluspice Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/10.png',
  'Zemits EvoPlasm':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/11.png',
  'Zemits Abigon Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/12.png',
  'Zemits Verstand Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/13.png',
  'Zemits Eau Sante NG':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/14.png',
  'Zemits Verstand':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/Updated/2.jpg',
  'Zemits Demeter Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/Updated/4.jpg',
  'Zemits Dermeluxx Pro':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/103.jpg',
  'Zemits Sisley 2.0':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/17.png',
  'Zemits Leger 2.0':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/18.png',
  'Zemits Vivalumix':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/19.png',
  'Zemits Adrinox 2.0':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/20.png',
  'Zemits Klein El':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/21.png',
  'Zemits Skin Expert':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/23.png',
  'Zemits Elastistrom':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/104.jpg',
  'Zemits Celltite':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/25.png',
  'Zemits PrimeCart':'https://ik.imagekit.io/xwsgpirygo/Zemits/aparati/22.png'
};
/* serve resized photos via ImageKit (cards ≈400px wide → 800px for retina) */
Object.keys(deviceImg).forEach(k => { deviceImg[k] += '?tr=w-800'; });

function fmtPrice(p){
  if (p === null) return null;
  return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + ' €';
}

/* if a resized photo fails (some mobile browsers / networks), retry the original file once, then fall back to the icon */
function photoFallback(img){
  if (img.dataset.retried) { img.style.display = 'none'; return; }
  img.dataset.retried = '1';
  img.src = img.src.split('?')[0];
}

/* catalogue card markup; used by aparati.html at runtime and by tools/build.mjs to pre-render the page */
const FEAT_CAP = 6;
function deviceCardHtml(d, i, t, lang){
  const tagLabel = t['tag_' + d.tag];
  const feats = d.feat[lang];
  const shown = feats.slice(0, FEAT_CAP);
  const extra = feats.length - shown.length;
  const moreHtml = extra > 0 ? `<div class="eq-more">${t.ui_more.replace('{n}', extra)}</div>` : '';
  let priceTxt = fmtPrice(d.price);
  if (priceTxt && d.from) priceTxt = `${t.ui_from} ${priceTxt}`;
  const priceHtml = priceTxt
    ? `<div class="eq-price">${priceTxt}</div>`
    : `<div class="eq-price req">${t.ui_onrequest}</div>`;
  const safeName = d.name.replace(/'/g, "\\'");
  const btnHtml = `<button class="eq-req eq-learn" onclick="openDeviceModal('${safeName}')">${t.ui_learn}</button>`;
  const img = deviceImg[d.name];
  return `
    <div class="eq-card reveal">
      <div class="eq-img">
        <span class="eq-tag ${tagCls[d.tag]}">${tagLabel}</span>
        <span class="eq-icon eq-icon-fallback">${d.icon}</span>
        ${img ? `<img class="eq-photo" src="${img}" alt="${d.name}" width="800" height="800" ${i < 6 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="window.photoFallback && photoFallback(this)">` : ''}
      </div>
      <div class="eq-body">
        <div class="eq-name">${d.name}</div>
        <div class="eq-type">${d.type[lang]}</div>
        <ul class="eq-features">${shown.map(f => `<li>${f}</li>`).join('')}</ul>
        ${moreHtml}
        <div class="eq-footer">
          ${priceHtml}
          ${btnHtml}
        </div>
      </div>
    </div>`;
}

/* popup / card strings, merged into the page's i18n (keys the page already has win) */
const deviceUi = {
  lv:{
    ui_request:'Pieprasīt cenu', ui_onrequest:'Cena pēc pieprasījuma', ui_more:'+ vēl {n} funkcijas', ui_learn:'Uzzināt vairāk',
    ui_contact:'Rakstīt mums', m_tech:'Tehnoloģijas un funkcijas', m_treats:'Ko risina', m_included:'Komplektā ar iekārtu', inc_train:'Apmācības',
    inc_warranty:'24 mēnešu garantija', inc_support:'Tehniskais atbalsts', inc_manual:'Instrukcija latviešu valodā', inc_ce:'CE sertifikāts',
    m_sizes:'Pieejamie izmēri', ui_close:'Aizvērt', ui_from:'No', tag_face:'Seja', tag_body:'Ķermenis', tag_laser:'Lāzers', tag_new:'Jaunums', tag_acc:'Aksesuāri',
    tag_analysis:'Ādas analīze', tag_needle:'Mikroadatas', tag_both:'Seja/ķermenis'
  },
  ru:{
    ui_request:'Запросить цену', ui_onrequest:'Цена по запросу', ui_more:'+ ещё {n} функций', ui_learn:'Узнать больше', ui_contact:'Написать нам',
    m_tech:'Технологии и функции', m_treats:'Решает задачи', m_included:'В комплекте с аппаратом', inc_train:'Обучение',
    inc_warranty:'Гарантия 24 месяца', inc_support:'Техническая поддержка', inc_manual:'Инструкция на латышском языке', inc_ce:'Сертификат CE',
    m_sizes:'Доступные размеры', ui_close:'Закрыть', ui_from:'от', tag_face:'Лицо', tag_body:'Тело', tag_laser:'Лазер', tag_new:'Новинка', tag_acc:'Аксессуары',
    tag_analysis:'Анализ кожи', tag_needle:'Микроиглы', tag_both:'Лицо/тело'
  },
  en:{
    ui_request:'Request price', ui_onrequest:'Price on request', ui_more:'+ {n} more functions', ui_learn:'Learn more', ui_contact:'Contact us',
    m_tech:'Technologies & functions', m_treats:'Helps with', m_included:'Included with the device', inc_train:'Training',
    inc_warranty:'24-month warranty', inc_support:'Technical support', inc_manual:'Manual in Latvian', inc_ce:'CE certificate',
    m_sizes:'Available sizes', ui_close:'Close', ui_from:'from', tag_face:'Face', tag_body:'Body', tag_laser:'Laser', tag_new:'New', tag_acc:'Accessories',
    tag_analysis:'Skin analysis', tag_needle:'Microneedling', tag_both:'Face/body'
  }
};
function mergeDeviceUi(dict){
  for (const l in deviceUi) if (dict[l]) for (const k in deviceUi[l]) if (dict[l][k] === undefined) dict[l][k] = deviceUi[l][k];
}

/* popup markup is injected once, so pages only need the stylesheet and this script */
function ensureDeviceModal(){
  if (document.getElementById('devModal')) return;
  const el = document.createElement('div');
  el.className = 'dev-modal-overlay'; el.id = 'devModal';
  el.addEventListener('click', e => { if (e.target === el) closeDeviceModal(); });
  el.innerHTML = '<div class="dev-modal" role="dialog" aria-modal="true"><button class="dev-modal-close" onclick="closeDeviceModal()" aria-label="Close">×</button><div id="devModalBody"></div></div>';
  document.body.appendChild(el);
}

/* ── DEVICE MODAL ── */
function openDeviceModal(name){
  ensureDeviceModal();
  const d = devices.find(x => x.name === name);
  if(!d) return;
  const t = i18n[currentLang], L = currentLang;   // page globals; popup strings come from deviceUi via mergeDeviceUi()
  const li = (deviceInfo[name] && deviceInfo[name][L]) || {};
  const tagLabel = t['tag_' + d.tag];
  let priceTxt = fmtPrice(d.price);
  if (priceTxt && d.from) priceTxt = `${t.ui_from} ${priceTxt}`;
  const priceHtml = priceTxt ? `<div class="dm-price">${priceTxt}</div>` : `<div class="dm-price req">${t.ui_onrequest}</div>`;
  const feats = d.feat[L].map(f => `<li>${f}</li>`).join('');
  const sizesBlock = (li.sizes && li.sizes.length)
    ? `<div class="dm-included"><div class="dm-h">${t.m_sizes}</div><ul class="dm-list">${li.sizes.map(s => `<li>${s}</li>`).join('')}</ul></div>`
    : '';
  const inc = [t.inc_train, t.inc_warranty, t.inc_support, t.inc_manual, t.inc_ce].map(f => `<li>${f}</li>`).join('');
  const img = deviceImg[d.name];
  const safeName = name.replace(/'/g, "\\'");
  document.getElementById('devModalBody').innerHTML = `
    <div class="dm-head">
      <div class="dm-icon"><span class="dm-emoji dm-emoji-fallback">${d.icon}</span>${img ? `<img class="dm-photo" src="${img}" alt="" decoding="async" onerror="window.photoFallback && photoFallback(this)">` : ''}</div>
      <div>
        <span class="eq-tag ${tagCls[d.tag]}" style="position:static;display:inline-block;margin-bottom:8px">${tagLabel}</span>
        <div class="dm-name">${d.name}</div>
        <div class="dm-type">${d.type[L]}</div>
      </div>
    </div>
    ${li.desc ? `<p class="dm-desc">${li.desc}</p>` : ''}
    <div class="dm-grid one">
      <div class="dm-block"><div class="dm-h">${t.m_tech}</div><ul class="dm-list">${feats}</ul></div>
    </div>
    ${sizesBlock}
    <div class="dm-included"><div class="dm-h">${t.m_included}</div><ul class="dm-list dm-inc">${inc}</ul></div>
    <div class="dm-foot">
      ${priceHtml}
      <button class="dm-req" onclick="closeDeviceModal();requestDevice('${safeName}')">${priceTxt ? t.ui_contact : t.ui_request}</button>
    </div>`;
  document.querySelector('#devModal .dev-modal-close').setAttribute('aria-label', t.ui_close);
  document.getElementById('devModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDeviceModal(){
  const m = document.getElementById('devModal');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDeviceModal(); });
