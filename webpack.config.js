const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: prod ? "production" : "development",
	entry: "./src/index.tsx",
	output: {
		path: __dirname + "/dist/",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: [".ts", ".tsx", ".js", ".json"],
				},
				use: "ts-loader",
			},
		],
	},
	devServer: {
		host: "localhost",
		port: 3000,
		historyApiFallback: true,
	},
	devtool: prod ? undefined : "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
		}),
	],
};
