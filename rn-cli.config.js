module.exports = {
    resolver: {
      extraNodeModules: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        fs: require.resolve('react-native-level-fs'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream')
      }
    }
  };