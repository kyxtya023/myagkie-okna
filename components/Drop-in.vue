<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from "vue";

const isVisible = ref(false);
const isExpanded = ref(false);
const slider = ref(50);

const config = ref<any>(null);

const device = ref<"desktop" | "tablet" | "mobile">("desktop");
const orientation = ref<"portrait" | "landscape">("portrait");
const mobileSize = ref<"xs" | "sm" | "md">("md");

const width = ref(0);
const height = ref(0);

const setSize = () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
};

/* =========================
   ЗАГРУЗКА КОНФИГА
========================= */
const loadConfig = async () => {
  try {
    const res = await fetch(
      `${useRuntimeConfig().app.baseURL}config/design-toast.json`,
    );

    config.value = await res.json();
  } catch (e) {
    console.warn("Не удалось загрузить конфиг toast", e);
    config.value = null;
  }
};

/* =========================
   ИНИЦИАЛИЗАЦИЯ
========================= */
onMounted(async () => {
  setSize();
  window.addEventListener("resize", setSize);

  await loadConfig();

  if (!config.value?.enabled) return;

  const expiresAt = new Date(config.value.expiresAt).getTime();
  const now = Date.now();

  // ❌ срок истёк — больше никогда не показываем
  if (now > expiresAt) return;

  const STORAGE_KEY = config.value.storageKey || "design-update-v1";

  const data = localStorage.getItem(STORAGE_KEY);

  // ❌ если уже закрыто — больше не показываем
  if (data) {
    try {
      const parsed = JSON.parse(data);

      if (parsed?.closed === true) {
        return;
      }
    } catch (e) {
      console.warn("Ошибка в данных toast в localStorage");
    }
  }

  // ✔ показать уведомление
  isVisible.value = true;
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setSize);
});

/* =========================
   ЛОГИКА УСТРОЙСТВА
========================= */
watchEffect(() => {
  if (!width.value || !height.value) return;

  const w = width.value;
  const h = height.value;

  orientation.value = w > h ? "landscape" : "portrait";

  const isTouch =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.matchMedia("(pointer: coarse)").matches;

  if (!isTouch) {
    device.value = "desktop";
  } else if (w >= 768) {
    device.value = "tablet";
  } else {
    device.value = "mobile";
  }

  if (w <= 360) mobileSize.value = "xs";
  else if (w <= 480) mobileSize.value = "sm";
  else mobileSize.value = "md";
});

watch(isVisible, (val) => {
  document.body.dataset.dropin = val ? "open" : "closed";
});

/* =========================
   ИЗОБРАЖЕНИЯ
========================= */
const images = {
  old: {
    desktop: {
      portrait: "/img/drop-in/old-desktop-1920x1080.jpg",
      landscape: "/img/drop-in/old-desktop-1920x1080.jpg",
    },
    tablet: {
      portrait: "/img/drop-in/old-tablet-port-1024x1366.jpg",
      landscape: "/img/drop-in/old-tablet-land-1366x1024.jpg",
    },
    mobile: {
      md: {
        portrait: "/img/drop-in/old-mobile-port-750x1334.jpg",
        landscape: "/img/drop-in/old-mobile-land-1334x750.jpg",
      },
      sm: {
        portrait: "/img/drop-in/old-mobile-port-480x854.jpg",
        landscape: "/img/drop-in/old-mobile-land-854x480.jpg",
      },
      xs: {
        portrait: "/img/drop-in/old-mobile-port-360x640.jpg",
        landscape: "/img/drop-in/old-mobile-land-640x360.jpg",
      },
    },
  },

  new: {
    desktop: {
      portrait: "/img/drop-in/new-desktop-1920x1080.jpg",
      landscape: "/img/drop-in/new-desktop-1920x1080.jpg",
    },
    tablet: {
      portrait: "/img/drop-in/new-tablet-port-1024x1366.jpg",
      landscape: "/img/drop-in/new-tablet-land-1366x1024.jpg",
    },
    mobile: {
      md: {
        portrait: "/img/drop-in/new-mobile-port-750x1334.jpg",
        landscape: "/img/drop-in/new-mobile-land-1334x750.jpg",
      },
      sm: {
        portrait: "/img/drop-in/new-mobile-port-480x854.jpg",
        landscape: "/img/drop-in/new-mobile-land-854x480.jpg",
      },
      xs: {
        portrait: "/img/drop-in/new-mobile-port-360x640.jpg",
        landscape: "/img/drop-in/new-mobile-land-640x360.jpg",
      },
    },
  },
};

/* =========================
   ВЫЧИСЛЯЕМЫЕ ИЗОБРАЖЕНИЯ
========================= */
const oldImage = computed(() => {
  if (device.value === "desktop") {
    return images.old.desktop.landscape;
  }

  if (device.value === "tablet") {
    return images.old.tablet[orientation.value];
  }

  return (
    images.old.mobile?.[mobileSize.value]?.[orientation.value] ||
    images.old.mobile.md.portrait
  );
});

const newImage = computed(() => {
  if (device.value === "desktop") {
    return images.new.desktop.landscape;
  }

  if (device.value === "tablet") {
    return images.new.tablet[orientation.value];
  }

  return (
    images.new.mobile?.[mobileSize.value]?.[orientation.value] ||
    images.new.mobile.md.portrait
  );
});

/* =========================
   UI ДЕЙСТВИЯ
========================= */
const openSlider = () => {
  isExpanded.value = true;
};

const closeAll = () => {
  const key = config.value?.storageKey || "design-update-v1";

  // 💥 навсегда закрываем уведомление
  localStorage.setItem(
    key,
    JSON.stringify({
      closed: true,
      closedAt: Date.now(),
    }),
  );

  isVisible.value = false;
};

/* =========================
   ПЕРЕТАСКИВАНИЕ СЛАЙДЕРА
========================= */
const startDrag = (e: MouseEvent | TouchEvent) => {
  const move = (event: any) => {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    const rect = (event.target as HTMLElement)
      .closest(".slider")!
      .getBoundingClientRect();

    let percent = ((clientX - rect.left) / rect.width) * 100;
    slider.value = Math.max(0, Math.min(100, percent));
  };

  const stop = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
    window.removeEventListener("touchmove", move);
    window.removeEventListener("touchend", stop);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  window.addEventListener("touchmove", move);
  window.addEventListener("touchend", stop);
};
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast">
      <div v-if="!isExpanded" class="toast-content">
        <div class="toast-text">✨ Мы обновили дизайн сайта</div>

        <button class="btn btn-primary" @click="openSlider">Посмотреть</button>
      </div>

      <div v-else class="slider-wrapper">
        <div class="slider">
          <img :src="oldImage" class="img after" />

          <div
            class="before"
            :style="{ clipPath: `inset(0 ${100 - slider}% 0 0)` }"
          >
            <img :src="newImage" class="img" />
          </div>

          <div
            class="handle"
            :style="{ left: slider + '%' }"
            @mousedown="startDrag"
            @touchstart.prevent="startDrag"
          ></div>
        </div>

        <button class="close-btn" @click="closeAll">
          <svg
            data-v-fb00e4b2=""
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
          >
            <path data-v-fb00e4b2="" d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  width: clamp(260px, 80vw, 442px);
  max-width: calc(100% - 4rem);

  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);

  overflow: hidden;
  z-index: 5;
}

.toast-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.toast-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.slider-wrapper {
  position: relative;
  padding: 1rem;
  animation: slideUp 0.9s ease;
}

.slider {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: ew-resize;
}

@media (max-width: 768px) {
  .slider {
    aspect-ratio: 9 / 16;
  }
}

@media (orientation: landscape) and (max-width: 900px) {
  .slider {
    aspect-ratio: 16 / 9;
  }
}

.img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.after {
  position: absolute;
  inset: 0;
}

.before {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  cursor: ew-resize;
}

.handle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  background: var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
