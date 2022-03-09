import webpack from 'webpack';

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
          stream: require.resolve('stream-browserify'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.IgnorePlugin({
          // only use the English word list to reduce application size
          resourceRegExp: /^\.\/wordlists\/(?!english)/,
          contextRegExp: /bip39\/src$/,
        }),
      ],
    },
  },
};
