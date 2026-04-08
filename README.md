# Мягкие Окна - Nuxt 3 SSR

Сайт для компании по производству и монтажу мягких окон из ПВХ.

## Технологии

- **Nuxt 3** (SSR)
- **TypeScript**
- **Vue 3** (Composition API)
- **Nodemailer** (отправка email)

## Установка

```bash
# Установка зависимостей
pnpm install

# Запуск в режиме разработки
pnpm dev

# Сборка для продакшена
pnpm build

# Предпросмотр продакшен-сборки
pnpm preview
```

## Настройка окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните переменные:

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_TO=recipient@example.com
SITE_URL=https://your-domain.com
```

### Настройка Gmail

Для использования Gmail:
1. Включите двухфакторную аутентификацию
2. Создайте "Пароль приложения" в настройках безопасности Google
3. Используйте этот пароль в `MAIL_PASS`

## Структура проекта

```
├── app.vue                 # Главный компонент приложения
├── nuxt.config.ts          # Конфигурация Nuxt
├── assets/
│   └── css/
│       └── main.css        # Глобальные стили и CSS переменные
├── components/
│   ├── AppHeader.vue       # Шапка сайта
│   ├── AppFooter.vue       # Подвал сайта
│   ├── HeroSection.vue     # Главный экран
│   ├── PricesSection.vue   # Секция цен
│   ├── MaterialsSection.vue # Секция материалов
│   ├── WhyUsSection.vue    # Почему мы
│   ├── AdvantagesSection.vue # Преимущества
│   ├── GallerySection.vue  # Галерея работ
│   ├── FAQSection.vue      # Частые вопросы
│   └── QuizSection.vue     # Квиз-форма
├── composables/
│   └── useTheme.ts         # Переключение темы
├── layouts/
│   └── default.vue         # Основной layout
├── pages/
│   └── index.vue           # Главная страница
├── server/
│   └── api/
│       └── send-email.post.ts # API для отправки email
├── types/
│   └── index.ts            # TypeScript типы
└── public/
    └── images/             # Изображения (добавьте свои)
```

## Изображения

Добавьте изображения в папку `public/images/`:

- `hero-veranda.jpg` - главное изображение
- `price-econom.jpg`, `price-self.jpg`, `price-turnkey.jpg` - для карточек цен
- `material-pvc.jpg`, `material-edge.jpg`, `material-hardware.jpg` - материалы
- `gallery/veranda-1.jpg`, `gallery/balcony-1.jpg`, `gallery/gazebo-1.jpg` и т.д. - галерея

## Темизация

Сайт поддерживает светлую (по умолчанию) и тёмную темы. 

Основные CSS-переменные находятся в `assets/css/main.css`:

```css
:root {
  --accent: #82dbf7;        /* Акцентный цвет */
  --bg-primary: #ffffff;    /* Основной фон */
  --text-primary: #1e293b;  /* Основной текст */
  /* ... */
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... */
}
```

## Особенности

- SSR (Server-Side Rendering) для SEO
- Адаптивный дизайн (mobile-first)
- Переключение светлой/тёмной темы
- 7-шаговый квиз с отправкой на email
- Галерея с фильтрацией и лайтбоксом
- Аккордеон FAQ с HTML-форматированием
- Анимации появления секций при скролле
- Современный дизайн с glass-эффектами

## SEO

Настроены:
- Meta-теги (title, description, keywords)
- Open Graph теги
- Schema.org разметка
- Семантическая HTML-структура
- Alt-тексты для изображений

## Деплой

### Vercel

```bash
npm i -g vercel
vercel
```

### Node.js сервер

```bash
pnpm build
node .output/server/index.mjs
```

## Лицензия

MIT
