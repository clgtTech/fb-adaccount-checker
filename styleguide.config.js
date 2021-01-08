const fs = require('fs');
const path = require('path');

module.exports = {
  components: getComponentsPaths('src/components'),
  require: [path.join(__dirname, 'src/index.scss')],
  serverPort: 3040,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/wrapper'),
  },
  theme: {
    fontFamily: {
      base: 'var(--dc-font-base)',
    },
  },
  title: 'FbTools Components',
};

/**
 * Returns array of paths to components.
 * @param {string} componentsDirectory - The path to a directory where components are located.
 * @returns {string[]}
 */
function getComponentsPaths(componentsDirectory) {
  return fs
    .readdirSync(componentsDirectory)
    .filter((filename) => {
      if (filename.startsWith('.')) {
        return false;
      }
      const stats = fs.statSync(path.join(componentsDirectory, filename));
      return stats.isDirectory();
    })
    .map((directoryName) =>
      path.join(componentsDirectory, directoryName, `${directoryName}.tsx`)
    );
}
