const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require("fs");
const srcRoot = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = "index.js";


//多入口
function getEntry() {
	let entryMap = {};
	fs.readdirSync(pageDir).forEach((pathname) => {
		let fullPathName = path.resolve(pageDir, pathname);
		let stat = fs.statSync(fullPathName);
		let fileName = path.resolve(fullPathName, mainFile);

		//判断是文件并且入口文件存在
		if (stat.isDirectory() && fs.existsSync(fileName)) {
			entryMap[pathname] = fileName;
		}
	});
	return entryMap;
}

//多入口的html加载
function getHtmlArray(entryMap) {
	let htmlArray = [];
	Object.keys(entryMap).forEach(function (key) {
		let fullPathName = path.resolve(pageDir, key);
		let fileName = path.resolve(fullPathName, key + '.html')
		if (fs.existsSync(fileName)) {
			htmlArray.push(new HtmlWebpackPlugin({
				chunks: ["common" ,key], // 注意这里的key就是chunk
				filename: key + '.html',
				template: fileName,
				inlineSource: '.(js|css)'
			}))
		}
	});

	return htmlArray;

}


const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);
module.exports = {
	mode: 'production',
	devtool: false,
	//去掉后缀名称
	resolve: {
        extensions: ['.js','.jsx'],
        alias: {
			component: path.resolve(srcRoot, 'component'),
			static: path.resolve(srcRoot, 'static')
        },
    },
	entry: entryMap,
	output: {
		path: buildPath,
		filename: 'js/[name].[contenthash].min.js'
	},
	module: {	
		rules: [{
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'eslint-loader'
					}
				],
				include: srcRoot,
			},

			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader',
				{
					loader: 'px2rem-loader',
					options: {
						remUni: 75,
						remPrecision: 6,
					}
				},
				'less-loader',
				{
                    loader: 'sass-resources-loader',
					options: {
                        resources: srcRoot + '/component/common.less',
					}
				}],
				include: srcRoot
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]',
				include: srcRoot
			},
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					name: "common"
				},
			}
		}
	},
	plugins: [
        new CleanWebpackPlugin({buildPath}),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
        }),
        new CopyWebpackPlugin([
            { from: 'src/data', to: path.resolve(buildPath, 'data'), force: true },
            { from: 'src/static', to: path.resolve(buildPath, 'static'), force: true }
        ]),
        new OptimizeCssAssetsPlugin()
	].concat(htmlArray)
}