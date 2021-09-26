const requiredPlugins = [
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-optional-chaining',
]

const plugins = {
  development: requiredPlugins,
  test: requiredPlugins,
  production: requiredPlugins,
}

const requiredPresets = [
  [
    '@babel/preset-react',
    {runtime: 'automatic'},
  ],
]

const development = [
  ...requiredPresets,
  [
    '@babel/preset-env',
    {
      targets: 'last 1 chrome version',
      useBuiltIns: 'usage',
      // Install core-js package to polyfill
      corejs: 3,
      shippedProposals: true,
    },
  ],
]

const presets = {
  development,
  test: development,
  production: [
    ...requiredPresets,
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
        // Specifying 'useBuiltIns: 'usage' will polyfill all core-js features, need to install core-js package
        // and import the package in the entry file.

        // Specifying 'useBuiltIns: 'entry' will polyfill only the features used by the entry point,
        // 'entry' option doesn't require the core-js package to be installed.s
        useBuiltIns: 'entry',
        // May not be required to use core-js, remove if not needed, it will increase the bundle size
        corejs: 3,
        shippedProposals: true,
      },
    ],
  ],
}

module.exports = api => {
  const env = api.env()
  return {
    plugins: plugins[env],
    presets: presets[env],
    sourceMap: true,
  }
}