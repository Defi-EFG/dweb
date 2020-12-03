// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

// module.exports = {
//   configureWebpack: {
//     plugins: [new BundleAnalyzerPlugin(), new VuetifyLoaderPlugin()]
//   },
//   productionSourceMap: false
// }

// // module.exports = {
// //   chainWebpack: config => {
// //     config.plugin('VuetifyLoaderPlugin').tap(args => [
// //       {
// //         match(originalTag, { kebabTag, camelTag, path, component }) {
// //           if (kebabTag.startsWith('core-')) {
// //             return [
// //               camelTag,
// //               `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
// //             ]
// //           }
// //         }
// //       }
// //     ])
// //   }
// // }