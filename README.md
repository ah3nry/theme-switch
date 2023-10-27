# \<theme-switch>

A webcomponent to toggle between light & dark modes.
The switch supports users system preferences but also
gives them the ability to override the system preference.

Run the local demo to see it in action.

```bash
npm start
```

This runs a local development server that serves the basic demo located in `demo/index.html`

## Features
The switch sets the `data-theme` attribute on the `html` element to `light` or `dark` depending on the mode.
Light and dark stlyes can be conditionally applied to elements based on the `data-theme` attribute.

## Styling example
In your project you could have styles that look something
like this:

```css
html {
  --background-color: var(--background-color-light);
  --text-color: var(--text-color-light);

  &[data-theme="dark"] {
    --background-color: var(--background-color-dark);
    --text-color: var(--text-color-dark);
  }
}
```


This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i theme-switch
Or
yarn add theme-switch
```

## Usage

```html
<script type="module">
  import 'theme-switch/theme-switch.js';
</script>

<theme-switch 
  style="
    --size: 2rem;
    --icon-fill-dark: #801515;
    --icon-fill-dark-hover: #AA3939;
    --icon-fill-light: #D46A6A;
    --icon-fill-light-hover: #FFAAAA;
    "
/>
            
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.


