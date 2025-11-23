import { dirname, join } from "path";
const CopyPlugin = require("copy-webpack-plugin");
const sass = require("sass");

/** Resolve la ruta absoluta de un paquete (útil en monorepos o Yarn PnP) */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-babel")
  ],

  framework: {
    name: getAbsolutePath("@storybook/web-components-webpack5"),
    options: {}
  },

  staticDirs: [
    '../../stencil/www/build',
    '../../stencil/dist',
  ],

  typescript: {
    check: false,
    reactDocgen: false,
  },

  webpackFinal: async (config) => {
    // Loader para archivos TypeScript
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript'
          ]
        }
      }
    });

    // Ignorar archivos JS de stencil/dist y stencil/www
    config.module.rules.push({
      test: /\.js$/,
      include: [
        /stencil.*dist/,
        /stencil.*www/
      ],
      loader: 'ignore-loader'
    });

    // Ignorar archivos .js.map
    config.module.rules.push({
      test: /\.js\.map$/,
      loader: 'ignore-loader'
    });

    // Alias para stencil si existe
    try {
      const stencilPath = require.resolve('../../stencil/dist/index.js');
      config.resolve.alias = {
        ...config.resolve.alias,
        '@workspace/stencil': stencilPath
      };
    } catch (e) {
      console.warn('Stencil dist not found, skipping alias');
    }

    // Copiar estilos y assets
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "../../packages/stencil/src/styles/styles.scss",
            to: "styles/styles.css",
            transform: (content, path) => {
              return sass.compile(path).css;
            },
          },
          {
            from: "../../packages/stencil/src/assets",
            to: "assets",
          },
          {
            from: "../../packages/stencil/www/assets",
            to: "assets"
          },
          {
            from: "../../packages/stencil/www/build/sherpa",
            to: "build/sherpa"
          }
        ],
      }),
    );

    return config;
  },

  docs: {}
};

export default config;