/**
 * Inspired by Adam Argyle's theme switcher https://web.dev/articles/building/a-theme-switch-component
 *
 * @element theme-switch
 * @cssproperty --size - size of the switch
 * @cssproperty --icon-fill-dark - icon color in dark theme
 * @cssproperty --icon-fill-dark-hover - icon hover color in dark theme
 * @cssproperty --icon-fill-light - icon color in light theme
 * @cssproperty --icon-fill-light-hover - icon hover color in light theme
 */

import { html, css, LitElement } from 'lit';

export class ThemeSwitch extends LitElement {
  static styles = css`
    .theme-toggle {
      --icon-size: var(--size);
      --icon-fill: var(--icon-fill-light);
      --icon-fill-hover: var(--icon-fill-light-hover);
      background: none;
      border: none;
      padding: 0;
      inline-size: var(--icon-size);
      block-size: var(--icon-size);
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      outline-offset: 5px;

      & > svg {
        inline-size: 100%;
        block-size: 100%;
        stroke-linecap: round;
      }

      @media (hover: none) {
        --size: 48px;
      }
    }

    .sun-and-moon {
      & > :is(.moon, .sun, .sun-beams) {
        transform-origin: center center;
      }

      & > :is(.moon, .sun) {
        fill: var(--icon-fill);

        .theme-toggle:is(:hover, :focus-visible) & {
          fill: var(--icon-fill-hover);
        }
      }

      & > .sun-beams {
        stroke: var(--icon-fill);
        stroke-width: 2px;

        .theme-toggle:is(:hover, :focus-visible) & {
          stroke: var(--icon-fill-hover);
        }
      }

      [data-theme='dark'] & {
        --icon-fill: var(--icon-fill-dark);
        --icon-fill-hover: var(--icon-fill-dark-hover);
        & > .sun {
          transform: scale(1.75);
          transition-timing-function: cubic-bezier(0.25, 0, 0.3, 1);
          transition-duration: 0.25s;
        }

        & > .sun-beams {
          transform: rotateZ(-25deg);
          transition-duration: 0.15s;
          opacity: 0;
        }

        & > .moon > circle {
          transform: translateX(-7px);
          transition-delay: 0.25s;
          transition-duration: 0.5s;

          @supports (cx: 1) {
            transform: translateX(0);
            cx: 17;
          }
        }
      }

      & > .sun {
        transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25);
      }

      & > .sun-beams {
        transition:
          transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25),
          opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
      }

      & .moon > circle {
        transition: transform 0.25s cubic-bezier(0, 0, 0, 1);
        @supports (cx: 1) {
          transition: cx 0.25s var(--ease-out-5);
        }

        [data-theme='dark'] & {
          & > .sun {
            transform: scale(1.75);
            transition-timing-function: var(--ease-3);
            transition-duration: 0.25s;
          }

          & > .sun-beams {
            transform: rotateZ(-25deg);
            transition-duration: 0.15s;
          }
        }
      }
    }
  `;

  static properties = {
    storageKey: { type: String },
    theme: { type: String, state: true },
  };

  constructor() {
    super();
    this.theme = '';
    this.storageKey = 'theme-preference';
  }

  getColorPreference() {
    let theme = localStorage.getItem(this.storageKey);
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  }

  reflectPreference() {
    document.firstElementChild.setAttribute('data-theme', this.theme);
  }

  setPreference() {
    localStorage.setItem(this.storageKey, this.theme);
    this.reflectPreference();
  }

  connectedCallback() {
    super.connectedCallback();
    this.theme = this.getColorPreference();
    this.reflectPreference();
    window.onload = () => {
      this.reflectPreference();
    };
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        this.theme = isDark ? 'dark' : 'light';
        this.setPreference();
      });
  }

  onClick() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setPreference();
  }

  render() {
    return html`
      <button
        class="theme-toggle"
        id="theme-toggle"
        title="Toggles light and dark"
        aria-label=${this.theme}
        data-theme=${this.theme}
        aria-live="polite"
        @click=${this.onClick}
      >
        <svg
          class="sun-and-moon"
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <circle
            class="sun"
            cx="12"
            cy="12"
            r="6"
            mask="url(#moon-mask)"
            fill="currentColor"
          />
          <g class="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
          <mask class="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
        </svg>
      </button>
    `;
  }
}
