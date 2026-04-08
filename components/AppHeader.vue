<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "~/composables/useTheme";
import type { NavItem } from "~/types";

const { theme, toggleTheme } = useTheme();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const navItems: NavItem[] = [
  { id: "prices", label: "Цены", href: "#prices" },
  { id: "materials", label: "Материалы", href: "#materials" },
  { id: "why-us", label: "Почему мы", href: "#why-us" },
  { id: "advantages", label: "Преимущества", href: "#advantages" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "estimate", label: "Получить смету", href: "#quiz" },
];

const contactInfo = {
  phone: "+7 (999) 123-45-67",
  address: "Москва, ул. Примерная, 1",
  schedule: "Пн-Вс: 09:00-21:00",
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container header-container">
      <!-- Logo -->
      <a href="/" class="logo" @click="closeMenu">
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
        <span class="logo-text">Мягкие<span class="accent">Окна</span></span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" aria-label="Главное меню">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.id">
            <a :href="item.href" class="nav-link">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <!-- Contact Info Desktop -->
      <div class="contact-desktop">
        <a
          :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
          class="contact-phone"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
            />
          </svg>
          {{ contactInfo.phone }}
        </a>
        <div class="contact-details">
          <span class="contact-address">{{ contactInfo.address }}</span>
          <span class="contact-schedule">{{ contactInfo.schedule }}</span>
        </div>
      </div>

      <div style="display: flex; gap: 1.2rem;">
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :aria-label="
            theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'
          "
        >
          <svg
            v-if="theme === 'light'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            />
          </svg>
        </button>

        <button
          class="burger"
          :class="{ active: isMenuOpen }"
          @click="toggleMenu"
          aria-label="Меню"
          :aria-expanded="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="mobile-menu">
        <nav aria-label="Мобильное меню">
          <ul class="mobile-nav-list">
            <li
              v-for="(item, index) in navItems"
              :key="item.id"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <a :href="item.href" class="mobile-nav-link" @click="closeMenu">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="mobile-contact">
          <a
            :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
            class="mobile-phone"
          >
            {{ contactInfo.phone }}
          </a>
          <p class="mobile-address">{{ contactInfo.address }}</p>
          <p class="mobile-schedule">{{ contactInfo.schedule }}</p>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  padding: 1.5rem 0;
  transition: all var(--transition-base);
}

.header.scrolled {
  background: var(--bg-glass);
  /* backdrop-filter: blur(20px); */
  /* -webkit-backdrop-filter: blur(20px); */
  box-shadow: var(--shadow-md);
  padding: 1rem 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: var(--text-primary);
  text-decoration: none;
  z-index: 10;
}

.logo-icon {
  color: var(--accent);
}

.logo-text .accent {
  color: var(--accent);
}

/* Desktop Navigation */
.nav-desktop {
  display: none;
}

@media (min-width: 1300px) {
  .nav-desktop {
    display: flex;
  }
}

.nav-list {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 0.8rem 1.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--accent);
  background: rgba(130, 219, 247, 0.1);
}

/* Contact Desktop */
.contact-desktop {
  display: none;
}

@media (min-width: 1300px) {
  .contact-desktop {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
  }
}

.contact-phone {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-phone:hover {
  color: var(--accent);
}

.contact-details {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
  color: var(--text-muted);
}

/* Theme Toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(10px);
}

.theme-toggle:hover {
  background: rgba(130, 219, 247, 0.1);
  border-color: var(--accent);
  color: var(--accent);
}

/* Burger Menu */
.burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 4rem;
  height: 4rem;
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding: 1rem;
  z-index: 10;
  backdrop-filter: blur(10px);
}

@media (min-width: 1300px) {
  .burger {
    display: none;
  }
}

.burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  padding: 10rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 5;
}

.mobile-nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-list li {
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
}

.mobile-nav-link {
  display: block;
  padding: 1.5rem 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover {
  background: rgba(130, 219, 247, 0.1);
  color: var(--accent);
  padding-left: 3rem;
}

.mobile-contact {
  text-align: center;
  padding: 3rem 0;
  border-top: 1px solid var(--border-light);
}

.mobile-phone {
  display: block;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1rem;
}

.mobile-address,
.mobile-schedule {
  font-size: 1.4rem;
  color: var(--text-muted);
  margin: 0.5rem 0;
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
