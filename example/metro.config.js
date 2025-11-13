const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(projectRoot);

const resolveFromApp = relativePath =>
  path.resolve(projectRoot, 'node_modules', relativePath);

const escapeForRegExp = input =>
  input.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

const blockList = exclusionList(
  [
    'react',
    'react-dom',
    'react-refresh',
    'react-native',
    'scheduler',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'tslib',
  ].map(pkg =>
    new RegExp(
      `^${escapeForRegExp(
        path.join(workspaceRoot, 'node_modules', pkg)
      )}\\/.*$`
    )
  )
);

const config = {
  projectRoot,
  watchFolders: Array.from(
    new Set([
      workspaceRoot,
      ...(defaultConfig.watchFolders ?? []),
    ])
  ),
  resolver: {
    extraNodeModules: {
      'react-native-paodiario-bible': workspaceRoot,
      react: resolveFromApp('react'),
      'react/jsx-runtime': resolveFromApp('react/jsx-runtime'),
      'react/jsx-dev-runtime': resolveFromApp('react/jsx-dev-runtime'),
      'react-native': resolveFromApp('react-native'),
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter': resolveFromApp(
        'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter'
      ),
      'react-native/Libraries/EventEmitter/NativeEventEmitter': resolveFromApp(
        'react-native/Libraries/EventEmitter/NativeEventEmitter'
      ),
      tslib: resolveFromApp('tslib'),
    },
    blockList,
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(defaultConfig, config);
