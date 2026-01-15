const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

module.exports = makeMetroConfig({
  watchFolders: [root],
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
});
