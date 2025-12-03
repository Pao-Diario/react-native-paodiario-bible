const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "..");

const config = {
  projectRoot,
  watchFolders: [workspaceRoot],
  resolver: {
    // Force Metro to resolve everything from the app's node_modules first to avoid duplicate React copies.
    disableHierarchicalLookup: true,
    // Point the example directly at the source for faster iteration.
    extraNodeModules: {
      "react-native-paodiario-bible": path.resolve(workspaceRoot, "src"),
      react: path.resolve(projectRoot, "node_modules/react"),
      "react-native": path.resolve(projectRoot, "node_modules/react-native"),
      "react-native-track-player": path.resolve(
        projectRoot,
        "node_modules/react-native-track-player"
      ),
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(workspaceRoot, "node_modules"),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
