module.exports = api => {
  api.cache.never()

  return {
    plugins: [
      '@babel/proposal-class-properties',
      'dynamic-import-node',
      'react-hot-loader/babel',
    ],
    presets: [
      ['@babel/env', {
        modules: !!process.env.TRANSPILE_COMMONJS_MODULES ? 'commonjs' : false,
      }],
      '@babel/react',
    ],
  }
}
