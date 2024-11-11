const
	PostBuild = require('./PostBuild'),
	MinimalClassnameGenerator = require('webpack-minimal-classnames'),
	{ override, removeModuleScopePlugin, babelInclude, overrideDevServer } = require('customize-cra');

let DIST_DIR = '';

const isProduction = process.env.NODE_ENV === "production";

console.info({ isProduction });


const generateMinimalClassname = MinimalClassnameGenerator({
	length: 1,
	excludePatterns: [/ad/i]
})


const devServerConfig = () => config => {

	console.info(config);

	config.static.watch.ignored = [
		config.static.watch.ignored,
		/avatars/g
	]
    return config
}


module.exports = {

	paths: (paths) => {
		DIST_DIR = paths.appBuild;
	},

	devServer: overrideDevServer(devServerConfig()),

	webpack: override((config) => {

		if (isProduction) {
			JSON.stringify(config, (_key, value) => {
				if (typeof value === 'object' && value && typeof value.loader === 'string' &&
					value.loader.includes('css-loader') && value.options && value.options.modules) {
					value.options.modules.getLocalIdent = generateMinimalClassname;
				}
				return value;
			})
		}
		


		config = removeModuleScopePlugin()(config);
		config = babelInclude()(config);

		if (isProduction) {
			delete config.devtool;
		}

		config.plugins = config.plugins.map((plugin) => {
			
			if (isProduction && plugin.constructor.name === 'WebpackManifestPlugin') {
				return undefined;
			}
			
			else if (plugin.constructor.name === "DefinePlugin") {
				plugin = new plugin.constructor({
					...plugin.definitions,
					isProduction
				});
			}

			return plugin;
		})

		if (isProduction) {
			config.plugins.push(new PostBuild(DIST_DIR));
		}

		return config;
	})

};