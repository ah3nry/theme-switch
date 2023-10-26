import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../theme-switch.js';

describe('ThemeSwitch', () => {
  // Mock matchMedia - dark mode
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: () => {},
    }),
  });

  it('renders dark mode button when `prefers-color-scheme: dark`', async () => {
    const el = await fixture(html` <theme-switch
      style="
          --size: 2rem;
          --icon-fill-dark: #801515;
          --icon-fill-dark-hover: #AA3939;
          --icon-fill-light: #D46A6A;
          --icon-fill-light-hover: #FFAAAA;
        "
    />`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.ariaLabel).to.equal('dark');
    expect(document.firstElementChild.dataset.theme).to.equal('dark');
  });

  it('renders light mode button when `prefers-color-scheme: light`', async () => {
    // Mock matchMedia - light mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
      }),
    });

    const el = await fixture(html` <theme-switch
      style="
          --size: 2rem;
          --icon-fill-dark: #801515;
          --icon-fill-dark-hover: #AA3939;
          --icon-fill-light: #D46A6A;
          --icon-fill-light-hover: #FFAAAA;
        "
    />`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.ariaLabel).to.equal('light');
    expect(document.firstElementChild.dataset.theme).to.equal('light');
  });

  it('toggles between modes when button clicked', async () => {
    const el = await fixture(html` <theme-switch
      style="
          --size: 2rem;
          --icon-fill-dark: #801515;
          --icon-fill-dark-hover: #AA3939;
          --icon-fill-light: #D46A6A;
          --icon-fill-light-hover: #FFAAAA;
        "
    />`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.ariaLabel).to.equal('light');
    await button.click();
    expect(button.ariaLabel).to.equal('dark');
    expect(document.firstElementChild.dataset.theme).to.equal('dark');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<theme-switch
      style="
    --size: 2rem;
    --icon-fill-dark: #801515;
    --icon-fill-dark-hover: #AA3939;
    --icon-fill-light: #D46A6A;
    --icon-fill-light-hover: #FFAAAA;
  "
    ></theme-switch>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
