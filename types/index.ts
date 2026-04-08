// Price Card Types
export interface PriceItem {
  label?: string
  value: string
  subvalue?: string
}

export interface PriceCard {
  title: string
  subtitle?: string
  description: string[]
  prices: PriceItem[]
  extra?: string[]
  badge?: string
  image?: string
}

// Gallery Types
export interface GalleryImage {
  id: number
  src: string
  alt: string
  category: string
}

export interface GalleryCategory {
  id: string
  name: string
}

// FAQ Types
export interface FAQItem {
  id: number
  question: string
  answer: string | FAQContent
}

export interface FAQContent {
  intro?: string
  items?: FAQListItem[]
  note?: string
}

export interface FAQListItem {
  text: string
  bold?: boolean
  highlight?: boolean
  color?: string
}

// Why Us Types
export interface WhyUsCard {
  id: number
  icon: string
  title: string
  description: string
  alt: string
}

// Quiz Types
export interface QuizStep {
  id: number
  question: string
  type: 'select' | 'radio' | 'text' | 'contact'
  options?: QuizOption[]
  placeholder?: string
  required?: boolean
}

export interface QuizOption {
  value: string
  label: string
  description?: string
}

export interface QuizAnswers {
  area: string
  doors: string
  base: string
  package: string
  installation: string
  timing: string
  name: string
  phone: string
  comment: string
}

// Contact Form Types
export interface ContactForm {
  name: string
  phone: string
  email?: string
  message?: string
}

// Navigation Types
export interface NavItem {
  id: string
  label: string
  href: string
}

// Email Types
export interface EmailPayload {
  type: 'quiz' | 'contact' | 'estimate'
  data: QuizAnswers | ContactForm
}

export interface EmailResponse {
  success: boolean
  message: string
}
