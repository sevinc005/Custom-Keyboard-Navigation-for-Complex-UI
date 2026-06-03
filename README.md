# Custom-Keyboard-Navigation-for-Complex-UI


An accessible, highly performant desktop-style menu bar built with **React**, featuring advanced keyboard navigation, absolute focus management, and strict **WAI-ARIA** compliance. The project is completely production-ready with optimized state-splitting via a Custom Hook.

---

## 🚀 Key Features

*   **Keyboard Navigation (WAI-ARIA Compliant):** Full arrow key support (`ArrowLeft` / `ArrowRight` to move between menu categories, `ArrowUp` / `ArrowDown` to navigate submenus).
*   **Accessible Activation:** Elements trigger instantly on `Enter` or `Space` keys. `Escape` closes active panels and gracefully returns focus to the parent element.
*   **Screen Reader Friendly (ARIA Live):** Uses an invisible dynamic announcement zone (`aria-live="polite"`) to notify visually impaired users about UI state shifts (e.g., "Fayl menyusu açıldı", "Yeni sənəd yadda saxlandı").
*   **Custom Hook Architecture:** Extracted all state management, ref registries, and event handling into a clean `useMenuNavigation` hook to strictly decouple logic from the visual layout.
*   **Callback Refs Pattern:** Solved ESLint immutability errors by adopting safe callback refs instead of directly manipulating mutable `.current` prop definitions.
*   **Zero Inline CSS:** Tailored completely using semantic external stylesheets supporting a responsive, fully immersive dark-theme desktop viewport wrapper.

---

## 📂 Project Architecture

```text
src/
├── components/
│   └── AccessibilityMenu/
│       ├── AccessibilityMenu.jsx    # Visual skeleton wrapper
│       ├── AccessibilityMenu.css    # Comprehensive dark mode layout
│       ├── MenuGroup.jsx            # Top-level menu tab logic
│       ├── Submenu.jsx              # Child dropdown component 
│       └── useMenuNavigation.js     # Extracted handling & focus state hook
├── App.jsx                          # Root layout rendering the widget
├── index.css                        # Reset and global fluid bounds setup
└── main.jsx                         # React entrypoint
