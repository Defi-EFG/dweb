const IN_PRODUCTION = process.env.NODE_ENV === 'production'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    require('autoprefixer'),
    IN_PRODUCTION &&
      purgecss({
        content: [
          `./public/index.html`,
          `./src/components/**/*.vue`,
          `./src/views/**/*.vue`,
          `./src/app.vue`
        ],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
          return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
        fontFace: true,
        keyframes: true,
        variables: true,
        whitelist: [],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/
        ],
        whitelistPatternsChildren: [/^toast/, /^b-toast/]
      })
  ]
}
