import BuildHashPlugin from 'build-hash-webpack-plugin';
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
    new BuildHashPlugin({filename: 'version.json'})
  ],
}
