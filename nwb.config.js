module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false
  },
  webpack:{
    extra: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [{test: /\.(ts|tsx)$/, loader: 'ts-loader'}],
      },
    },
  }
};
