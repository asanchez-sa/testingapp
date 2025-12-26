// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

// Obtén la ruta de tu app actual
const projectRoot = import.meta.dirname;

// Obtén la ruta raíz del workspace (dos niveles arriba)
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Indica a Metro que observe cambios en todo el monorepo
config.watchFolders = [workspaceRoot];

// Configura la resolución de node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Resuelve dependencias críticas desde la app para evitar duplicados
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Fuerza que react, react-native y react-dom se resuelvan desde la app
  if (
    moduleName === "react" ||
    moduleName === "react-native" ||
    moduleName === "react-dom"
  ) {
    return {
      filePath: require.resolve(moduleName, {
        paths: [path.resolve(projectRoot, "node_modules")],
      }),
      type: "sourceFile",
    };
  }

  // Usa la resolución por defecto para otros módulos
  return context.resolveRequest(context, moduleName, platform);
};

// Opcional pero recomendado: permite symlinks
config.resolver.unstable_enableSymlinks = true;

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

/** withStorybook Adds the config that storybook uses */
module.exports = withStorybook(config);
