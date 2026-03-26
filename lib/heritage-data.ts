// Shared heritage card data indexed by card ID.
// Images reference the same local assets used in region-detail-screen.

export interface HeritageDetail {
  id: string
  title: string
  titleAr: string
  city: string
  cityAr: string
  description: string
  pullQuote: string
  pullQuoteEn: string
  images: string[]           // [0] = hero; rest shown in carousel
  aiNarration: string        // what the AI "reads aloud" on the listen page
  suggestedQuestions: string[]
  timeline: { year: string; event: string; eventAr: string }[]
  tags: string[]
}

const D: Record<string, HeritageDetail> = {
  // ── Marrakech ──────────────────────────────────────────────────────────────
  m1: {
    id: 'm1', city: 'Marrakech', cityAr: 'مراكش',
    title: 'Jemaa el-Fna', titleAr: 'جامع الفنا',
    description: 'Jemaa el-Fna is the heart of Marrakech and a UNESCO World Heritage site. By day it fills with orange-juice vendors and henna artists; by dusk storytellers, snake charmers and gnawa musicians transform it into one of the world\'s great living spectacles.',
    pullQuote: 'جامع الفنا — قلب مراكش النابض بالحياة',
    pullQuoteEn: 'Jemaa el-Fna — the eternal beating heart of Marrakech',
    images: ['/cities/Marrakech/jama-el-fnaa.jpg', '/cities/Marrakech/bahia%20palace.jpeg', '/cities/Marrakech/majorelle.jpg'],
    aiNarration: 'Welcome to Jemaa el-Fna, the soul of Marrakech. Since the 11th century this vast open square has drawn traders, pilgrims, and storytellers. As the sun sets, the square transforms into an open-air theatre unlike anything else on earth — a UNESCO Intangible Cultural Heritage of Humanity.',
    suggestedQuestions: ['History of Jemaa el-Fna', 'Best time to visit', 'Gnawa music traditions', 'Where to eat nearby'],
    timeline: [
      { year: '1070', event: 'Square established by Almoravids', eventAr: 'تأسيس الساحة على يد المرابطين' },
      { year: '1985', event: 'City of Marrakech listed UNESCO', eventAr: 'إدراج مراكش في قائمة اليونسكو' },
      { year: '2001', event: 'Square itself gains UNESCO status', eventAr: 'اعتراف اليونسكو بالساحة' },
    ],
    tags: ['UNESCO', 'Marrakech', 'Culture', 'History'],
  },
  m2: {
    id: 'm2', city: 'Marrakech', cityAr: 'مراكش',
    title: 'Bahia Palace', titleAr: 'قصر الباهية',
    description: 'Built in the late 19th century for Si Moussa, grand vizier to the sultan, Bahia Palace is a masterpiece of Moroccan and Andalusian architecture. Its name means "brilliance", and the complex lives up to it with stunning zellij tilework, carved stucco and fragrant orange-blossom courtyards.',
    pullQuote: 'الباهية — قصر يروي حكاية الفخامة المغربية',
    pullQuoteEn: 'Bahia Palace — where Moroccan grandeur is carved in stone',
    images: ['/cities/Marrakech/bahia%20palace.jpeg', '/cities/Marrakech/jama-el-fnaa.jpg', '/cities/Marrakech/majorelle.jpg'],
    aiNarration: 'Bahia Palace was constructed over many years as a symbol of power and opulence. The name "Bahia" means brilliance. Wander through its eight hectares of gardens, intimate apartments and grand reception rooms, each adorned with hand-crafted zellij tiles and carved cedar ceilings.',
    suggestedQuestions: ['Who built Bahia Palace?', 'Zellij tile techniques', 'Moroccan architecture styles', 'Other palaces in Marrakech'],
    timeline: [
      { year: '1859', event: 'Construction begins', eventAr: 'بداية البناء' },
      { year: '1894', event: 'Grand Vizier Ba Ahmed takes over', eventAr: 'توسيع القصر من طرف الصدر الأعظم' },
      { year: '1900', event: 'Palace completed', eventAr: 'اكتمال القصر' },
    ],
    tags: ['Architecture', 'Marrakech', 'Zellij', 'Palace'],
  },
  m3: {
    id: 'm3', city: 'Marrakech', cityAr: 'مراكش',
    title: 'Majorelle Garden', titleAr: 'حديقة ماجوريل',
    description: 'Designed by French painter Jacques Majorelle in the 1920s and later rescued and restored by Yves Saint Laurent, this striking cobalt-blue garden is one of Morocco\'s most visited landmarks. It now houses the Berber Museum celebrating Amazigh culture.',
    pullQuote: 'حديقة ماجوريل — الأزرق يتنفس بين النباتات والفن',
    pullQuoteEn: 'Majorelle — where cobalt blue meets the Moroccan sky',
    images: ['/cities/Marrakech/majorelle.jpg', '/cities/Marrakech/jama-el-fnaa.jpg', '/cities/Marrakech/bahia%20palace.jpeg'],
    aiNarration: 'Majorelle Garden is an artist\'s paradise born in the 1920s. The electric "Majorelle Blue" walls contrast with lush tropical plants from five continents. After Jacques Majorelle\'s death, Yves Saint Laurent and Pierre Bergé purchased the garden in 1980, saving it from development and adding the Berber Museum.',
    suggestedQuestions: ['Who was Jacques Majorelle?', 'Yves Saint Laurent in Marrakech', 'Amazigh Berber culture', 'Best gardens in Morocco'],
    timeline: [
      { year: '1923', event: 'Majorelle begins the garden', eventAr: 'بداية إنشاء الحديقة' },
      { year: '1980', event: 'YSL & Bergé purchase & restore', eventAr: 'شراء الحديقة وترميمها' },
      { year: '2011', event: 'Berber Museum opens', eventAr: 'افتتاح المتحف الأمازيغي' },
    ],
    tags: ['Nature', 'Marrakech', 'Art', 'Berber'],
  },

  // ── Fès ────────────────────────────────────────────────────────────────────
  fs1: {
    id: 'fs1', city: 'Fès', cityAr: 'فاس',
    title: 'Al-Qarawiyyin', titleAr: 'جامعة القرويين',
    description: 'Founded in 859 AD by Fatima al-Fihri, Al-Qarawiyyin in Fès is the oldest continuously operating university in the world. It began as a mosque and grew into a seat of Islamic scholarship whose influence stretched across the medieval world.',
    pullQuote: 'القرويين — أعرق جامعة في العالم من قلب فاس',
    pullQuoteEn: 'Al-Qarawiyyin — the world\'s oldest university, born in Fès',
    images: ['/cities/fes/mezquita-al-karaouine-4.jpg', '/cities/fes/bou%20inania.webp', '/cities/fes/Chouara-Tannery.jpg'],
    aiNarration: 'Al-Qarawiyyin was founded in 859 by Fatima al-Fihri, a woman ahead of her time. For over a thousand years it has taught theology, grammar, rhetoric and logic. Scholars like Ibn Khaldun and Leo Africanus walked these halls. The Guinness Book of Records recognises it as the world\'s oldest continuously operating educational institution.',
    suggestedQuestions: ['Who was Fatima al-Fihri?', 'Medieval Islamic scholarship', 'History of Fès medina', 'Ibn Khaldun biography'],
    timeline: [
      { year: '859', event: 'Founded by Fatima al-Fihri', eventAr: 'تأسيسها على يد فاطمة الفهرية' },
      { year: '1349', event: 'Marinid expansion', eventAr: 'التوسعة المرينية' },
      { year: '1981', event: 'Fès medina listed UNESCO', eventAr: 'إدراج فاس في قائمة اليونسكو' },
    ],
    tags: ['UNESCO', 'Fès', 'History', 'Education'],
  },
  fs2: {
    id: 'fs2', city: 'Fès', cityAr: 'فاس',
    title: 'Bou Inania Madrasa', titleAr: 'مدرسة بو عنانية',
    description: 'The Bou Inania Madrasa, built between 1350 and 1357 by Marinid Sultan Bou Inan Faris, is considered the finest example of Marinid architecture. Its water clock, zellij floors and carved cedarwood screens make it a masterpiece of medieval Moroccan craftsmanship.',
    pullQuote: 'بو عنانية — درة العمارة المرينية في فاس',
    pullQuoteEn: 'Bou Inania — the jewel of Marinid architecture',
    images: ['/cities/fes/bou%20inania.webp', '/cities/fes/mezquita-al-karaouine-4.jpg', '/cities/fes/Chouara-Tannery.jpg'],
    aiNarration: 'Bou Inania Madrasa was built in the 14th century and remains a functioning mosque today — rare among Fès madrasas. Every surface is covered in intricate craftsmanship: lower walls in zellij tilework, middle tier in carved stucco, and upper registers in aromatic cedarwood. The legendary water clock on the street outside once chimed the hours.',
    suggestedQuestions: ['What is a Madrasa?', 'Marinid dynasty history', 'Zellij art techniques', 'Fès artisan crafts'],
    timeline: [
      { year: '1350', event: 'Construction begins', eventAr: 'بداية البناء' },
      { year: '1357', event: 'Madrasa completed', eventAr: 'اكتمال المدرسة' },
      { year: '1980', event: 'Designated national monument', eventAr: 'تصنيفها كمعلم وطني' },
    ],
    tags: ['Architecture', 'Fès', 'Marinid', 'Crafts'],
  },
  fs3: {
    id: 'fs3', city: 'Fès', cityAr: 'فاس',
    title: 'Chouara Tannery', titleAr: 'دباغة الشوارة',
    description: 'One of the oldest tanneries in the world, Chouara has been dyeing leather using traditional methods since the 11th century. The honeycombed vats — filled with pigeon dung, quicklime, and natural dyes — produce the rich colours of Moroccan leather goods sold across the medina.',
    pullQuote: 'شوارة فاس — ألوان الجلد تحكي قصة ألف عام',
    pullQuoteEn: 'Chouara — a thousand years of colour and craft',
    images: ['/cities/fes/Chouara-Tannery.jpg', '/cities/fes/mezquita-al-karaouine-4.jpg', '/cities/fes/bou%20inania.webp'],
    aiNarration: 'Chouara Tannery has operated continuously since the 11th century, making it one of the oldest in existence. Workers — known as dabbagha — stand knee-deep in vats of natural dyes including poppy red, indigo blue and saffron yellow. The strong smell of the traditional preparation process hits visitors before they even see the stunning patchwork of colour below.',
    suggestedQuestions: ['How is leather dyed in Fès?', 'Moroccan leather goods', 'Natural dye plants', 'Best view of the tannery'],
    timeline: [
      { year: '11th C', event: 'Tannery established', eventAr: 'تأسيس دباغة شوارة' },
      { year: '14th C', event: 'Marinid expansion of the quarter', eventAr: 'توسعة الحي المريني' },
      { year: 'Today', event: 'Still operating traditionally', eventAr: 'لا تزال تعمل بالطرق التقليدية' },
    ],
    tags: ['Crafts', 'Fès', 'Leather', 'History'],
  },

  // ── Casablanca ─────────────────────────────────────────────────────────────
  cb1: {
    id: 'cb1', city: 'Casablanca', cityAr: 'الدار البيضاء',
    title: 'Hassan II Mosque', titleAr: 'مسجد الحسن الثاني',
    description: 'The Hassan II Mosque stands partly over the Atlantic Ocean and is the largest mosque in Africa. Its 210-metre minaret — the tallest in the world — is visible from sea and features a laser beam pointing toward Mecca.',
    pullQuote: 'مسجد الحسن الثاني — بيت الله على ضفاف المحيط',
    pullQuoteEn: 'Hassan II Mosque — where the Atlantic meets the divine',
    images: ['/cities/Casablanca/hassan-ii-mosque-2.jpg', '/cities/Casablanca/habbous.png', '/cities/Casablanca/morocco-mall-3-.webp'],
    aiNarration: 'The Hassan II Mosque was completed in 1993 and took 35,000 craftsmen six years to build. It can hold 25,000 worshippers inside and another 80,000 in the grounds. The retractable roof opens to let in sea breezes. Look up at the carved cedarwood ceiling — every inch is hand-worked by Moroccan master craftsmen.',
    suggestedQuestions: ['How tall is Hassan II minaret?', 'Islamic architecture details', 'Visiting the mosque', 'Moroccan artisan crafts used'],
    timeline: [
      { year: '1986', event: 'Construction begins', eventAr: 'بداية البناء' },
      { year: '1993', event: 'Mosque inaugurated', eventAr: 'افتتاح المسجد' },
      { year: '2001', event: 'Minaret restoration', eventAr: 'ترميم الصومعة' },
    ],
    tags: ['Architecture', 'Casablanca', 'Islamic', 'UNESCO'],
  },
  cb2: {
    id: 'cb2', city: 'Casablanca', cityAr: 'الدار البيضاء',
    title: 'Quartier Habous', titleAr: 'حي الحبوس',
    description: 'Built by French colonial architects in the 1930s as a planned "new medina", Habous blends traditional Moroccan architecture with French urban planning. Its arcaded souks sell pastries, locally crafted goods and the famous Casablanca babouche slippers.',
    pullQuote: 'حي الحبوس — مدينة عتيقة بلمسة فرنسية',
    pullQuoteEn: 'Habous — old Moroccan soul in a French-planned quarter',
    images: ['/cities/Casablanca/habbous.png', '/cities/Casablanca/hassan-ii-mosque-2.jpg', '/cities/Casablanca/morocco-mall-3-.webp'],
    aiNarration: 'Quartier Habous was conceived in the 1930s as a hygienic alternative to the old medina overcrowding. French planners collaborated with Moroccan architects to create arcaded streets, a covered souk and a royal palace annexe. Today it remains one of Casablanca\'s most charming shopping and café districts.',
    suggestedQuestions: ['French colonial architecture', 'Shopping in Habous', 'Moroccan pastries to try', 'History of Casablanca'],
    timeline: [
      { year: '1930s', event: 'French colonial construction', eventAr: 'البناء الاستعماري الفرنسي' },
      { year: '1950s', event: 'Royal annexe added', eventAr: 'إضافة الملحق الملكي' },
      { year: 'Today', event: 'Vibrant artisan souk', eventAr: 'سوق حرفي نابض بالحياة' },
    ],
    tags: ['History', 'Casablanca', 'Architecture', 'Shopping'],
  },
  cb3: {
    id: 'cb3', city: 'Casablanca', cityAr: 'الدار البيضاء',
    title: 'Morocco Mall', titleAr: 'مول المغرب',
    description: 'Morocco Mall is Africa\'s second-largest shopping centre, famous for its extraordinary 1,000 m² aquarium — the largest aquarium in Africa — which houses thousands of marine species including sharks and rays.',
    pullQuote: 'مول المغرب — تحت الماء في قلب المدينة',
    pullQuoteEn: 'Morocco Mall — an ocean adventure at the heart of Casablanca',
    images: ['/cities/Casablanca/morocco-mall-3-.webp', '/cities/Casablanca/hassan-ii-mosque-2.jpg', '/cities/Casablanca/habbous.png'],
    aiNarration: 'Morocco Mall opened in 2011 and quickly became a landmark. Its centrepiece is a cylindrical aquarium stretching across three floors, home to sharks, rays and thousands of fish. A glass tunnel lets visitors walk beneath the marine life — a uniquely modern Casablanca experience beside the Atlantic coast.',
    suggestedQuestions: ['Morocco Mall aquarium details', 'Best things to do in Casablanca', 'Moroccan modern architecture', 'Shopping brands available'],
    timeline: [
      { year: '2011', event: 'Morocco Mall opens', eventAr: 'افتتاح مول المغرب' },
      { year: '2012', event: 'Aquarium record certified', eventAr: 'تسجيل رقم قياسي للأكواريوم' },
    ],
    tags: ['Casablanca', 'Modern', 'Aquarium', 'Shopping'],
  },

  // ── Rabat ──────────────────────────────────────────────────────────────────
  rb1: {
    id: 'rb1', city: 'Rabat', cityAr: 'الرباط',
    title: 'Hassan Tower', titleAr: 'صومعة حسان',
    description: 'Hassan Tower is the incomplete minaret of an ambitious 12th-century mosque begun by Almohad caliph Yacoub al-Mansour. At 44 metres it stands surrounded by the ruins of the mosque\'s columns and is paired with the magnificent Mohammed V Mausoleum.',
    pullQuote: 'صومعة حسان — شامخة رغم أنها لم تكتمل',
    pullQuoteEn: 'Hassan Tower — grandeur frozen in time',
    images: ['/cities/Rabat/hassan-tower2.webp', '/cities/Rabat/necropolis-de-chellah-3.jpg', '/cities/Rabat/Kasbah-Udayas-Rabat.webp'],
    aiNarration: 'Construction of Hassan Tower began in 1195 under Yacoub al-Mansour. Had it been completed, the mosque would have been the world\'s largest. The caliph died in 1199 and work stopped forever, leaving 44 metres of red sandstone rising above a field of broken columns — haunting and magnificent.',
    suggestedQuestions: ['Almohad dynasty history', 'Mohammed V Mausoleum', 'Rabat UNESCO sites', 'Best time to visit Rabat'],
    timeline: [
      { year: '1195', event: 'Construction begins', eventAr: 'بداية البناء' },
      { year: '1199', event: 'Caliph dies; work halted', eventAr: 'وفاة الخليفة وتوقف البناء' },
      { year: '2012', event: 'Rabat listed as UNESCO site', eventAr: 'إدراج الرباط في قائمة اليونسكو' },
    ],
    tags: ['UNESCO', 'Rabat', 'Almohad', 'Architecture'],
  },
  rb2: {
    id: 'rb2', city: 'Rabat', cityAr: 'الرباط',
    title: 'Chellah', titleAr: 'شالة',
    description: 'Chellah is a medieval fortified necropolis built over Roman ruins on the banks of the Bou Regreg river. Marinid sultans are buried here amid gardens of wild roses, fig trees and nesting storks. It is one of the most atmospheric places in Morocco.',
    pullQuote: 'شالة — حيث يتشابك التاريخ الروماني والمريني',
    pullQuoteEn: 'Chellah — ruins wrapped in roses, home to sultans and storks',
    images: ['/cities/Rabat/necropolis-de-chellah-3.jpg', '/cities/Rabat/hassan-tower2.webp', '/cities/Rabat/Kasbah-Udayas-Rabat.webp'],
    aiNarration: 'Chellah was once the Roman city of Sala Colonia. The Marinid dynasty later enclosed it as a royal necropolis in the 14th century. Wander through crumbling minarets, ornate tombs and overgrown Roman pavements, while white storks nest on every tower top — a surreal and deeply beautiful place.',
    suggestedQuestions: ['Roman history in Morocco', 'Marinid dynasty tombs', 'Stork migration routes', 'Rabat day trips'],
    timeline: [
      { year: '40 AD', event: 'Roman city Sala Colonia', eventAr: 'المدينة الرومانية سالا كولونيا' },
      { year: '1310', event: 'Marinid sultans build necropolis', eventAr: 'بناء المقبرة الملكية المرينية' },
      { year: '2012', event: 'UNESCO World Heritage Site', eventAr: 'إدراجها في قائمة التراث العالمي' },
    ],
    tags: ['UNESCO', 'Rabat', 'Roman', 'Marinid'],
  },
  rb3: {
    id: 'rb3', city: 'Rabat', cityAr: 'الرباط',
    title: 'Kasbah des Oudaias', titleAr: 'قصبة الوداية',
    description: 'Perched above where the Bou Regreg meets the Atlantic, the Kasbah des Oudaias is a fortified 12th-century Almohad citadel with blue-and-white washed streets rivalling those of Chefchaouen. Its Andalusian garden is a hidden oasis of calm.',
    pullQuote: 'قصبة الوداية — أزقتها الزرقاء تعانق أمواج الأطلسي',
    pullQuoteEn: 'Kasbah des Oudaias — blue alleyways above the Atlantic',
    images: ['/cities/Rabat/Kasbah-Udayas-Rabat.webp', '/cities/Rabat/hassan-tower2.webp', '/cities/Rabat/necropolis-de-chellah-3.jpg'],
    aiNarration: 'The Kasbah des Oudaias was built in the 12th century as a fortress watching over the river mouth. Andalusian refugees fleeing Spain in the 17th century settled here and left their mark on the architecture. Walk the bougainvillea-draped lanes and end in the serene Andalusian garden — a true hidden gem of Rabat.',
    suggestedQuestions: ['Andalusian history in Morocco', 'Rabat coastal walks', 'Boutique cafés in Oudaias', 'Best sunset spots in Rabat'],
    timeline: [
      { year: '1150', event: 'Fortress built by Almohads', eventAr: 'بناء القلعة من طرف الموحدين' },
      { year: '1609', event: 'Andalusian refugees arrive', eventAr: 'وصول اللاجئين الأندلسيين' },
      { year: '2012', event: 'UNESCO designation', eventAr: 'التصنيف في قائمة اليونسكو' },
    ],
    tags: ['UNESCO', 'Rabat', 'Andalusian', 'Fortress'],
  },

  // ── Tangier ────────────────────────────────────────────────────────────────
  tg1: {
    id: 'tg1', city: 'Tanger', cityAr: 'طنجة',
    title: 'Kasbah Museum', titleAr: 'متحف القصبة',
    description: 'The Kasbah Museum occupies the former Dar el-Makhzen palace in Tangier\'s hilltop kasbah. It houses an outstanding collection of Moroccan antiquities, Roman mosaics and traditional arts, with panoramic views over the Strait of Gibraltar.',
    pullQuote: 'متحف القصبة — التاريخ يطل على مضيق جبل طارق',
    pullQuoteEn: 'Kasbah Museum — history overlooking the Strait of Gibraltar',
    images: ['/cities/Tangier/kasbah%20museum.jpg', '/cities/Tangier/hercules.jpg', '/cities/Tangier/Grand_Socco_Tangier.jpg'],
    aiNarration: 'The Kasbah Museum sits inside a 17th-century palace where sultans once received foreign ambassadors. Tangier has always been a crossroads — Phoenician, Roman, Arab, Portuguese, and Spanish powers all left their mark. The museum\'s Roman mosaic collection from the nearby Volubilis-era city of Tingis is exceptional.',
    suggestedQuestions: ['Tangier history overview', 'Strait of Gibraltar facts', 'Roman Tingis city', 'Best views in Tangier'],
    timeline: [
      { year: '17th C', event: 'Palace built as sultanate seat', eventAr: 'بناء القصر كمقر للسلطنة' },
      { year: '1922', event: 'International Zone of Tangier', eventAr: 'المنطقة الدولية لطنجة' },
      { year: '1978', event: 'Opened as a museum', eventAr: 'افتتاحه كمتحف' },
    ],
    tags: ['History', 'Tanger', 'Museum', 'Roman'],
  },
  tg2: {
    id: 'tg2', city: 'Tanger', cityAr: 'طنجة',
    title: 'Caves of Hercules', titleAr: 'كهوف هرقل',
    description: 'The Caves of Hercules near Cape Spartel are where legend says Hercules rested before completing his 12th labour. The natural sea cave, enlarged by Phoenicians who cut millstones here for centuries, has an opening shaped like an inverted map of Africa.',
    pullQuote: 'كهوف هرقل — حيث الأسطورة تلتقي بالطبيعة',
    pullQuoteEn: 'Caves of Hercules — where myth and the Atlantic meet',
    images: ['/cities/Tangier/hercules.jpg', '/cities/Tangier/kasbah%20museum.jpg', '/cities/Tangier/Grand_Socco_Tangier.jpg'],
    aiNarration: 'The Caves of Hercules sit at Cap Spartel, where the Mediterranean meets the Atlantic. Ancient Phoenicians excavated them over millennia to quarry millstones. The sea-facing opening resembles Africa turned upside down. Greek mythology holds that Hercules himself sheltered here before separating Europe from Africa — creating the Strait of Gibraltar.',
    suggestedQuestions: ['12 labours of Hercules', 'Phoenician history in Morocco', 'Cap Spartel lighthouse', 'Day trips from Tangier'],
    timeline: [
      { year: 'Antiquity', event: 'Phoenician millstone quarrying', eventAr: 'استخراج حجر الطاحونة الفينيقي' },
      { year: '600 BC', event: 'Mentioned by classical writers', eventAr: 'ذكرها الكتّاب الكلاسيكيون' },
      { year: 'Today', event: 'Major tourist landmark', eventAr: 'معلم سياحي بارز' },
    ],
    tags: ['Nature', 'Tanger', 'Mythology', 'Phoenician'],
  },
  tg3: {
    id: 'tg3', city: 'Tanger', cityAr: 'طنجة',
    title: 'Grand Socco', titleAr: 'السوق الكبير',
    description: 'Grand Socco is the lively central square connecting Tangier\'s modern city with the medina. Ringed by cafés and bordered by a Moorish church and the medina gate, it fills each Thursday and Sunday with Riffian women in traditional striped garments selling produce.',
    pullQuote: 'السوق الكبير — ملتقى الأجيال في قلب طنجة',
    pullQuoteEn: 'Grand Socco — where old Tangier meets the new',
    images: ['/cities/Tangier/Grand_Socco_Tangier.jpg', '/cities/Tangier/kasbah%20museum.jpg', '/cities/Tangier/hercules.jpg'],
    aiNarration: 'Grand Socco — officially Place du 9 Avril 1947 — is the vibrant gateway between Tangier\'s modern boulevards and its ancient medina. Writers like Paul Bowles and Jack Kerouac sat in these cafés. On market days, Berber women from the Rif Mountains arrive in their distinctive red-and-white striped haïks to trade herbs, fruit and livestock.',
    suggestedQuestions: ['Paul Bowles in Tangier', 'Riffian Berber traditions', 'Tangier literary history', 'Best cafés in Tangier'],
    timeline: [
      { year: '19th C', event: 'Square becomes city centre', eventAr: 'تحول الساحة إلى مركز المدينة' },
      { year: '1947', event: 'King Mohammed V speech here', eventAr: 'خطاب الملك محمد الخامس' },
      { year: '1990s', event: 'Tangier urban renovation', eventAr: 'تجديد المدينة' },
    ],
    tags: ['Culture', 'Tanger', 'Medina', 'Markets'],
  },

  // ── Chefchaouen ─────────────────────────────────────────────────────────────
  ch1: {
    id: 'ch1', city: 'Chefchaouen', cityAr: 'شفشاون',
    title: 'Blue Medina', titleAr: 'المدينة الزرقاء',
    description: 'Chefchaouen\'s medina is the "Blue Pearl" of Morocco — a hillside maze of indigo, cobalt and sky-blue washed walls nested in the Rif Mountains. Founded in 1471, the tradition of painting buildings blue is said to ward off mosquitoes and symbolise the sky and heaven.',
    pullQuote: 'شفشاون — اللون الأزرق يسكن كل زقاق وكل حائط',
    pullQuoteEn: 'Chefchaouen — where every wall is a canvas of blue',
    images: ['/cities/Chefchaouen/blue%20medina.jpg', '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', '/cities/Chefchaouen/spanish%20mosque.jpg'],
    aiNarration: 'Chefchaouen was founded in 1471 as a small fortress. Jewish refugees fleeing the Spanish Inquisition in the 1490s arrived and introduced the tradition of painting walls blue, a colour sacred in Jewish mysticism. Today the entire medina glows with dozens of shades of blue — one of Morocco\'s most photographed and beloved destinations.',
    suggestedQuestions: ['Why is Chefchaouen blue?', 'Jewish history in Morocco', 'Rif Mountains hiking', 'Best streets to photograph'],
    timeline: [
      { year: '1471', event: 'Founded by Idrisid sharif', eventAr: 'تأسيسها على يد شريف إدريسي' },
      { year: '1494', event: 'Jewish refugees arrive, bring blue', eventAr: 'وصول اللاجئين اليهود وتقليد الأزرق' },
      { year: 'Today', event: 'Top Instagram destination', eventAr: 'وجهة سياحية عالمية' },
    ],
    tags: ['Culture', 'Chefchaouen', 'Medina', 'Heritage'],
  },
  ch2: {
    id: 'ch2', city: 'Chefchaouen', cityAr: 'شفشاون',
    title: 'Ras El Maa', titleAr: 'رأس الماء',
    description: 'Ras El Maa ("Source of Water") is a crystal-clear mountain spring and small waterfall at the edge of the medina. Locals wash clothes here as they have for centuries, while travellers rest on the stone steps to cool their feet in the refreshing Rif Mountain water.',
    pullQuote: 'رأس الماء — نبع الحياة في قلب الشاون',
    pullQuoteEn: 'Ras El Maa — the mountain spring that breathes life into Chefchaouen',
    images: ['/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', '/cities/Chefchaouen/blue%20medina.jpg', '/cities/Chefchaouen/akchour.jpg'],
    aiNarration: 'Ras El Maa has supplied fresh mountain water to Chefchaouen since the city\'s founding. The spring feeds through channels into the medina and cascades over rocks at the edge of town. Walking uphill from the blue streets to Ras El Maa offers one of the most refreshing and photogenic moments in all of Morocco.',
    suggestedQuestions: ['Rif Mountain water sources', 'Chefchaouen day walks', 'Akchour waterfalls trail', 'Best hikes near Chefchaouen'],
    timeline: [
      { year: '1471', event: 'Spring used since city foundation', eventAr: 'استخدام النبع منذ التأسيس' },
      { year: 'Today', event: 'Popular local gathering spot', eventAr: 'نقطة تجمع محلية شعبية' },
    ],
    tags: ['Nature', 'Chefchaouen', 'Water', 'Relaxation'],
  },

  // ── Meknès ─────────────────────────────────────────────────────────────────
  mk1: {
    id: 'mk1', city: 'Meknès', cityAr: 'مكناس',
    title: 'Bab Mansour', titleAr: 'باب منصور',
    description: 'Bab Mansour is one of the most monumental gates in North Africa, built by Sultan Moulay Ismail circa 1732. Its name comes from the Christian slave architect who designed it. Flanked by Corinthian columns taken from Volubilis, it is the crowning glory of Meknès.',
    pullQuote: 'باب منصور — أعظم بوابة في شمال أفريقيا',
    pullQuoteEn: 'Bab Mansour — the most magnificent gate in North Africa',
    images: ['/cities/Meknes/bab-mansour-gate.jpg', '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg', '/cities/Meknes/el-hedim-square.jpg'],
    aiNarration: 'Bab Mansour was the final great project of Sultan Moulay Ismail, completed just after his death in 1732. The gate is named for its architect — a freed Christian slave called Mansour. Its columns were taken from the Roman ruins of Volubilis nearby. Standing before it in Place El Hedim, the scale and artistry are simply breathtaking.',
    suggestedQuestions: ['Moulay Ismail and his empire', 'Volubilis Roman ruins', 'Meknès imperial city tour', 'North African Islamic gates'],
    timeline: [
      { year: '1672', event: 'Moulay Ismail begins imperial city', eventAr: 'مولاي إسماعيل يبدأ بناء مدينته الإمبراطورية' },
      { year: '1732', event: 'Bab Mansour completed', eventAr: 'اكتمال باب منصور' },
      { year: '1996', event: 'Meknès listed UNESCO', eventAr: 'إدراج مكناس في قائمة اليونسكو' },
    ],
    tags: ['UNESCO', 'Meknès', 'Architecture', 'Imperial'],
  },

  // ── Safi ───────────────────────────────────────────────────────────────────
  sf1: {
    id: 'sf1', city: 'Safi', cityAr: 'آسفي',
    title: 'Kechla Fortress', titleAr: 'قلعة كشلة',
    description: 'The Kechla is a Portuguese fortress perched on sea cliffs above Safi, built in the early 16th century as military garrison. Its thick walls and cannons still face the Atlantic, offering dramatic views and a window into Morocco\'s age of European encounter.',
    pullQuote: 'كشلة آسفي — شاهد على حقبة المواجهة مع المحيط',
    pullQuoteEn: 'Kechla — a fortress standing vigil over the Atlantic',
    images: ['/cities/Safi/kachla%20fortress.jpg', '/cities/Safi/pottery%20quarter.png', '/cities/Safi/tajine.webp'],
    aiNarration: 'The Kechla Fortress was built by the Portuguese in 1508 when they briefly controlled Safi. Inside its walls you\'ll find a small museum with Portuguese-era cannons, Safi pottery collections and panoramic terraces looking out over pounding Atlantic waves. It was later used by Moroccan sultans as a prison.',
    suggestedQuestions: ['Portuguese in Morocco', 'Atlantic fortresses of Morocco', 'Safi pottery tradition', 'Moroccan Atlantic coast'],
    timeline: [
      { year: '1508', event: 'Portuguese build fortress', eventAr: 'بناء القلعة من طرف البرتغاليين' },
      { year: '1541', event: 'Morocco retakes Safi', eventAr: 'استعادة المغرب لآسفي' },
      { year: 'Today', event: 'Museum and heritage site', eventAr: 'متحف وموقع تراثي' },
    ],
    tags: ['History', 'Safi', 'Portuguese', 'Fortress'],
  },
  sf2: {
    id: 'sf2', city: 'Safi', cityAr: 'آسفي',
    title: 'Pottery Quarter', titleAr: 'حي الفخار',
    description: 'Safi is Morocco\'s ceramics capital. The Pottery Quarter (Quartier des Potiers) holds dozens of workshops where master potters throw, glaze and fire in wood kilns, producing the distinctive blue-green pieces exported worldwide.',
    pullQuote: 'حي الفخار — خزف آسفي يعبر المحيطات',
    pullQuoteEn: 'Pottery Quarter — where Safi\'s clay tells a world-famous story',
    images: ['/cities/Safi/pottery%20quarter.png', '/cities/Safi/kachla%20fortress.jpg', '/cities/Safi/cathedrale-portugaise0-scaled.jpg'],
    aiNarration: 'Safi has been a ceramics centre since the 13th century. The characteristic blue-and-green glaze comes from copper and manganese oxides sourced locally. In the Quartier des Potiers you can watch the entire process: clay is mixed, thrown on foot-powered wheels, hand-painted with traditional geometric motifs, and fired in ancient wood-burning kilns.',
    suggestedQuestions: ['How is Safi pottery made?', 'Moroccan ceramic designs', 'Where to buy authentic pottery', 'Clay sourcing in Morocco'],
    timeline: [
      { year: '13th C', event: 'Pottery tradition established', eventAr: 'ترسيخ تقليد الفخار' },
      { year: '19th C', event: 'Trade expands across Europe', eventAr: 'توسع التجارة عبر أوروبا' },
      { year: 'Today', event: 'Major export craft', eventAr: 'حرفة تصديرية رائدة' },
    ],
    tags: ['Crafts', 'Safi', 'Pottery', 'Heritage'],
  },

  // ── Essaouira ──────────────────────────────────────────────────────────────
  es1: {
    id: 'es1', city: 'Essaouira', cityAr: 'الصويرة',
    title: 'Skala Ramparts', titleAr: 'أسوار الصقالة',
    description: 'The Skala de la Ville is a majestic 18th-century sea bastion lining Essaouira\'s north seafront, bristling with antique brass cannons aimed at the Atlantic. Walking the ramparts at dusk — with gulls wheeling and the ocean pounding below — is one of Morocco\'s great experiences.',
    pullQuote: 'أسوار الصقالة — حيث المدافع تواجه خضم الأطلسي',
    pullQuoteEn: 'Skala Ramparts — cannons, seagulls and the open Atlantic',
    images: ['/cities/Essaouira/skala.jpeg', '/cities/Essaouira/skala.webp'],
    aiNarration: 'The Skala de la Ville was built in the 18th century by Sultan Sidi Mohammed ben Abdallah with the help of a French engineer. The ramparts are lined with European bronze cannons — gifts and war trophies. Below, the waves of the Atlantic crash continuously as sea wind sweeps through. Essaouira was once the most important trading port linking Morocco to West Africa and Europe.',
    suggestedQuestions: ['Essaouira\'s trading history', 'Gnawa music festival', 'Windsurfing in Essaouira', 'Portuguese connections'],
    timeline: [
      { year: '1765', event: 'New city and port commissioned', eventAr: 'تأسيس المدينة الجديدة والميناء' },
      { year: '1769', event: 'Ramparts completed', eventAr: 'اكتمال الأسوار' },
      { year: '2001', event: 'UNESCO World Heritage Site', eventAr: 'إدراجها في قائمة اليونسكو' },
    ],
    tags: ['UNESCO', 'Essaouira', 'Architecture', 'Atlantic'],
  },
  es2: {
    id: 'es2', city: 'Essaouira', cityAr: 'الصويرة',
    title: 'Medina UNESCO', titleAr: 'المدينة العتيقة',
    description: 'Essaouira\'s medina is a UNESCO World Heritage site — a uniquely cosmopolitan port city whose grid of whitewashed and sea-blue streets reflects its 18th-century French-designed layout overlaid with Arab, Berber, Jewish, and Sub-Saharan African influences.',
    pullQuote: 'مدينة الصويرة — حيث التنوع الحضاري يصنع الجمال',
    pullQuoteEn: 'Essaouira Medina — a UNESCO jewel washed by Atlantic winds',
    images: ['/cities/Essaouira/skala.webp', '/cities/Essaouira/skala.jpeg'],
    aiNarration: 'Essaouira\'s medina was designed in 1765 by French architect Théodore Cornut on commission from Sultan Mohammed III. The broad avenues and rational grid are unusual for a Moroccan medina. The city became a meeting point of cultures — Jewish merchants, Gnawa musicians from Sub-Saharan Africa, Berber traders and European ambassadors all called it home.',
    suggestedQuestions: ['Gnawa music origins', 'Jewish history in Essaouira', 'Thuya wood crafts', 'Essaouira food specialities'],
    timeline: [
      { year: '1765', event: 'City designed by Cornut', eventAr: 'تصميم المدينة من طرف كورنو' },
      { year: '19th C', event: 'Peak of Atlantic trade', eventAr: 'ذروة التجارة الأطلسية' },
      { year: '2001', event: 'UNESCO designation', eventAr: 'تصنيفها من طرف اليونسكو' },
    ],
    tags: ['UNESCO', 'Essaouira', 'Medina', 'Cosmopolitan'],
  },
}

export const HERITAGE_DETAILS = D

export function getHeritageDetail(id: string | null | undefined): HeritageDetail | null {
  if (!id) return null
  return D[id] ?? null
}
