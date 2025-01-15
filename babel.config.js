module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin',
    ...(process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [])
  ],
};
