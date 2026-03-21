export interface Region {
  id: string
  name: string
  nameAr: string
  image: string
  heritageSites: number
  artisans: number
  itineraries: number
}

export interface HeritageCard {
  id: string
  title: string
  titleAr: string
  description: string
  image: string
  category: 'heritage' | 'craft' | 'food' | 'music' | 'architecture'
  saved?: boolean
}

export interface Artisan {
  id: string
  name: string
  photo: string
  craft: string
  city: string
  rating: number
  verified: boolean
  bio: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  artisanName: string
  artisanId: string
  category: string
  commission: number
}

export interface Itinerary {
  id: string
  name: string
  duration: string
  stops: ItineraryStop[]
}

export interface ItineraryStop {
  id: string
  name: string
  image: string
  time: string
  distance: string
  description: string
  completed?: boolean
}

export interface Badge {
  id: string
  name: string
  icon: string
  unlocked: boolean
  description: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  category: 'explorer' | 'cultural' | 'artisan' | 'historian'
  progress: number
  total: number
  reward: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  tags?: string[]
}

export type NavigationTab = 'map' | 'explore' | 'guide' | 'artisans' | 'profile'

export type TransportMode = 'walking' | 'car' | 'public'

export type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const LANGUAGES: Language[] = [
  { code: 'zgh', name: 'Tamazight', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: 'ⵣ' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇲🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
]

export const INTERESTS = [
  { id: 'tourism', label: 'Tourism', labelAr: 'سياحة', labelAmz: 'ⵜⴰⵎⴰⵍⵍⴰⵢⵜ' },
  { id: 'handicrafts', label: 'Handicrafts', labelAr: 'حرف يدوية', labelAmz: 'ⵜⵉⵥⵓⵕⵉⵡⵉⵏ ⵏ ⵓⴼⵓⵙ' },
  { id: 'history', label: 'History', labelAr: 'تاريخ', labelAmz: 'ⴰⵎⵣⵔⵓⵢ' },
  { id: 'gastronomy', label: 'Gastronomy', labelAr: 'فن الطبخ', labelAmz: 'ⴰⵙⵏⵡⵉ' },
  { id: 'music', label: 'Music & Arts', labelAr: 'الموسيقى والفنون', labelAmz: 'ⴰⵥⴰⵡⴰⵏ ⴷ ⵜⵥⵓⵕⵉⵡⵉⵏ' },
]

export const FILTER_CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'regions', label: 'Regions' },
  { id: 'cities', label: 'Cities' },
  { id: 'crafts', label: 'Crafts' },
  { id: 'heritage', label: 'Heritage Sites' },
  { id: 'festivals', label: 'Festivals' },
  { id: 'itineraries', label: 'Itineraries' },
]

export const CATEGORY_TABS = [
  { id: 'history', label: 'History', labelAr: 'التاريخ', labelAmz: 'ⴰⵎⵣⵔⵓⵢ' },
  { id: 'crafts', label: 'Crafts', labelAr: 'الحرف', labelAmz: 'ⵜⵉⵥⵓⵕⵉⵡⵉⵏ' },
  { id: 'food', label: 'Food', labelAr: 'الطعام', labelAmz: 'ⵓⵜⵛⵉ' },
  { id: 'music', label: 'Music', labelAr: 'الموسيقى', labelAmz: 'ⴰⵥⴰⵡⴰⵏ' },
  { id: 'architecture', label: 'Architecture', labelAr: 'العمارة', labelAmz: 'ⵜⴰⵎⵙⴷⴰⴳⵜ' },
]

export const CRAFT_CATEGORIES = [
  'Pottery',
  'Leather',
  'Jewelry',
  'Textiles',
  'Wood',
  'Zellige',
]
