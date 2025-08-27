module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src/'],
					extensions: [
						'.ios.ts',
						'.android.ts',
						'.ts',
						'.ios.tsx',
						'.android.tsx',
						'.tsx',
						'.jsx',
						'.js',
						'.json',
					],
					alias: {
						'@src': './src',
						'@data': './src/data',
						'@screens': './src/screens',
						'@theme': './src/themes',
						'@style': './src/style',
						'@utils': './src/utils',
						'@assets': './src/assets',
						'@commonComponents': './src/commonComponents',
						'@components': './src/components',
						'@App': './App',
						'@': './',
						'@src': './src',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};