const CracoAlias = require("craco-alias")

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      baseUrl: "./",
      aliases: {
        '@pages': './src/pages',
        '@styles': './src/styles',
      },
    },
  ],
//   babel: {
//     plugins: ["babel-plugin-styled-components"],
//   },
}
