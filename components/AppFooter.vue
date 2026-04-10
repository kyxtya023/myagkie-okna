<script setup lang="ts">
const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "Цены", href: "#prices" },
  { label: "Материалы", href: "#materials" },
  { label: "Почему мы", href: "#why-us" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Галерея", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const contactInfo = {
  phone: "+7 (966) 126-66-06",
  email: "plenochnieokna@mail.ru",
  address: "Московская область, Королёв, Пионерская улица, 1А",
  schedule: "Ежедневно: 10:00-19:00",
};
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="footer-logo">
            <div class="logo-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="4"
                  width="32"
                  height="32"
                  rx="4"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path d="M12 12h16v16H12z" fill="var(--accent)" opacity="0.3" />
                <path d="M16 16h8v8h-8z" fill="var(--accent)" />
              </svg>
            </div>
            <span>Мягкие<span class="accent">Окна</span></span>
          </a>
          <p class="footer-description">
            Производство и монтаж мягких окон из гибкого ПВХ для веранд, беседок
            и террас. Качественные материалы, честные цены, гарантия до 5 лет.
          </p>
        </div>

        <nav class="footer-nav" aria-label="Навигация в подвале">
          <h4 class="footer-title">Навигация</h4>
          <ul class="footer-links">
            <li v-for="link in navLinks" :key="link.label">
              <a :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer-contact">
          <h4 class="footer-title">Контакты</h4>
          <ul class="contact-list">
            <li>
              <Icon name="lucide:phone" size="18" />
              <a :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`">{{
                contactInfo.phone
              }}</a>
            </li>
            <li>
              <Icon name="lucide:mail" size="18" />
              <a :href="`mailto:${contactInfo.email}`">{{
                contactInfo.email
              }}</a>
            </li>
            <li>
              <Icon name="lucide:map-pin" size="18" />
              <span>{{ contactInfo.address }}</span>
            </li>
            <li>
              <Icon name="lucide:clock" size="18" />
              <span>{{ contactInfo.schedule }}</span>
            </li>
          </ul>
        </div>

        <div class="footer-cta">
          <h4 class="footer-title">Получить расчёт</h4>
          <p>
            Оставьте заявку и получите бесплатный расчёт стоимости за 15 минут
          </p>
          <a href="#quiz" class="btn btn-primary">
            <Icon name="lucide:calculator" size="18" />
            Рассчитать стоимость
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} МягкиеОкна. Все права защищены.
        </p>
        <div class="developer-credit">
          <span class="developer-trigger">
            Разработка сайта
            <Icon name="ph:code-bold" size="14" class="dev-icon" />
          </span>

          <div class="developer-tooltip">
            <p class="tooltip-title">Связаться с разработчиком</p>

            <div class="tooltip-links">
              <a
                href="https://vk.com/amberlock"
                target="_blank"
                rel="noopener noreferrer"
                class="tooltip-link"
              >
                <Icon name="akar-icons:vk-fill" size="18" />
                <span>ВКонтакте</span>
              </a>

              <a
                href="https://t.me/Uonu9l"
                target="_blank"
                rel="noopener noreferrer"
                class="tooltip-link"
              >
                <Icon name="ph:telegram-logo-fill" size="18" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-decor" aria-hidden="true">
      <div class="decor-line"></div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-primary);
  padding: 8rem 0 4rem;
  position: relative;
  border-top: 1px solid var(--border-light);
}

/* Grid */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 4rem;
  margin-bottom: 6rem;
}

@media (min-width: 1200px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  }
}

/* Brand */
.footer-brand {
  max-width: 35rem;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.logo-icon {
  color: var(--accent);
}

.footer-logo .accent {
  color: var(--accent);
}

.footer-description {
  font-size: 1.4rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.footer-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 1rem;
}

.footer-links a {
  font-size: 1.4rem;
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.footer-links a:hover {
  color: var(--accent);
  padding-left: 0.5rem;
}

.contact-list {
  list-style: none;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: var(--text-muted);
}

.contact-list li :deep(svg) {
  flex-shrink: 0;
  color: var(--accent);
  margin-top: 0.2rem;
}

.contact-list a {
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.contact-list a:hover {
  color: var(--accent);
}

.footer-cta {
  padding: 2.5rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.footer-cta p {
  font-size: 1.4rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.footer-cta .btn {
  width: 100%;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-light);
}

.copyright {
  font-size: 1.3rem;
  color: var(--text-muted);
  margin: 0;
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  font-size: 1.3rem;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.footer-legal a:hover {
  color: var(--accent);
}

.footer-decor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  pointer-events: none;
}

.decor-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent) 50%,
    transparent 100%
  );
  opacity: 0.3;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-legal {
    flex-direction: column;
    gap: 1rem;
  }
}

.developer-credit {
  position: relative;
  display: inline-block;
  font-size: 1.3rem;
  color: var(--text-muted);
}

.developer-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.developer-trigger:hover {
  color: var(--accent);
}

.dev-icon {
  transition: transform var(--transition-fast);
}

.developer-trigger:hover .dev-icon {
  transform: rotate(10deg) scale(1.1);
}

.developer-tooltip {
  position: absolute;
  bottom: 130%;
  right: 0;
  min-width: 20rem;
  padding: 1.2rem;

  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);

  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-fast);
  z-index: 10;
}

.developer-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  right: 20px;

  border-width: 6px;
  border-style: solid;
  border-color: var(--border-light) transparent transparent transparent;
}

@media (max-width: 480px) {
  .developer-tooltip {
    right: 0;
  }
}

.developer-credit:hover .developer-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.tooltip-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.tooltip-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tooltip-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);

  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.tooltip-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent);
}
</style>
