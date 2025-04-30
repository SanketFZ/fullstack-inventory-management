import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';

const baseColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const shadeMapping = {
  50: 900,
  100: 800,
  200: 700,
  300: 600,
  400: 500,
  500: 400,
  600: 300,
  700: 200,
  800: 100,
  900: 50,
};

function generateInvertedColors(colorSet) {
  const inverted = {};
  for (const colorName of baseColors) {
    if (!colorSet[colorName]) continue;
    inverted[colorName] = {};
    for (const [lightShade, darkShade] of Object.entries(shadeMapping)) {
      inverted[colorName][lightShade] = colorSet[colorName][darkShade];
    }
  }
  return inverted;
}

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        light: Object.fromEntries(
          baseColors.map((c) => [c, colors[c]])
        ),
        dark: generateInvertedColors(colors),
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-bg': theme('colors.light.gray.50'),
          '--color-text': theme('colors.light.gray.900'),
        },
        '.dark': {
          '--color-bg': theme('colors.dark.gray.900'),
          '--color-text': theme('colors.dark.gray.50'),
        },
      });
    }),
  ],
};
