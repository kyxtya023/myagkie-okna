<template>
  <div class="floating-contacts">
    <div class="contacts-wrapper">
      <!-- Trigger -->
      <div class="contacts-trigger">
        <Icon name="lucide:message-circle" size="22" />
      </div>

      <!-- Links -->
      <div class="contacts-list">
        <a
          href="https://max.ru"
          target="_blank"
          class="contact-item"
        >
          <Icon name="lucide:globe" size="20" />
          <span>Max</span>
        </a>

        <a
          href="https://t.me/your_username"
          target="_blank"
          class="contact-item"
        >
          <Icon name="ph:telegram-logo-fill" size="20" />
          <span>Telegram</span>
        </a>

        <a
          href="tel:+79991234567"
          class="contact-item"
        >
          <Icon name="lucide:phone" size="20" />
          <span>Позвонить</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-contacts {
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  z-index: 999;
}

/* Обертка */
.contacts-wrapper {
  position: relative;
}

/* Кнопка */
.contacts-trigger {
  width: 5rem;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--accent);
  color: #fff;

  border-radius: 50%;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);

  cursor: pointer;
  transition: all var(--transition-fast);
}

.contacts-trigger:hover {
  transform: translateY(-3px) scale(1.05);
}

/* Список */
.contacts-list {
  position: absolute;
  bottom: 110%;
  padding-bottom: 0.75rem;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);

  transition: all var(--transition-fast);
}

/* Показ при наведении */
.contacts-wrapper:hover .contacts-list {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Элемент */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;

  padding: 0.8rem 1.2rem;

  background: var(--bg-glass);
  backdrop-filter: blur(10px);

  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);

  color: var(--text-primary);
  font-size: 1.3rem;

  white-space: nowrap;

  transition: all var(--transition-fast);
}

.contact-item:hover {
  background: var(--accent);
  color: #fff;
  transform: translateX(-5px);
}
</style>