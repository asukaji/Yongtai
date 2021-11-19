module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@amap/amap-vue',
        libraryDirectory: 'lib',
        camel2DashComponentName: true,
      },
    ]
  ]
};
