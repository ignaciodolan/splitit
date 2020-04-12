const withCSS = require('@zeit/next-css');

// module.exports = withCSS({});

module.exports = withCSS({
    publicRuntimeConfig: {},
    serverRuntimeConfig: {},
    webpack(config, {dev}) {
      if (!dev) {
        config.devtool = 'source-map'
        for (const plugin of config.optimization.minimizer) {
          if (plugin.constructor.name === 'TerserPlugin') {
            plugin.options.sourceMap = true
            break
          }
        }
      }
      return config
    },
  })