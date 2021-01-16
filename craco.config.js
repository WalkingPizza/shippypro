const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@select-item-selected-bg': '#EBF3FA',
              '@primary-color': '#799BF3',
              '@card-padding-base': '20px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};