const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getIfUtils } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);

const assetGeneratorFilename = dir => ({
  generator: {
    filename: ifProduction(`${dir}/[name].[contenthash][ext]`, `${dir}/[name][ext]`),
  }
})

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: join(__dirname, 'dist'),
    },
    port: 8001,
    hot: true,
  },
  output: {
    // To keep JS files to a specific directory, update the path to source in index.html 
    // filename: 'javascripts/[name].js',

    // Change the public path if you want to serve the app from a subdirectory or path
    publicPath: '/',
    path: resolve(__dirname, 'dist')

    // It keeps assets to images folder instead of the top level folder, Not using it here,
    // because we are specifying generator option for each assets.
    // assetModuleFilename: 'images'/[name][ext][query],
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        // add test; /\.jsx?$/ if you are using the .jsx synatx to create react components and
        // add resolve object specifying the extensions to be used for resolving modules.
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // test: /\.s?css$/i - to process both css and scss files, scss needs sass and sass-loader packages
        // or test: /\.(s[ac]|c)ss$/i - to process only css/scss/sass files
        test: /\.css$/,
        // style-loader package can be used instead, it injects the css into the DOM.
        // Add sass-loader to the use array to process scss files.

        // Loaders are processed in reverse order, so the first loader will be applied last.
        // use: [MiniCssExtractPlugin.loader, 'css-loader' 'postcss-loader', 'sass-loader'] should be in this order
        use: [MiniCssExtractPlugin.loader, 'css-loader']

        // If you get an error: "Automatic publicPath is not supported in this browser" after adding image loaders
        // specify the publicPath in the loader options for MiniCssExtractPlugin as 
        // use: [{ loader: MiniCssExtractPlugin.loader, publicPath: '' }, 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource', // assest/inline is used to inline the image into the js file (not recommended - increases the bundle size)
        ...assetGeneratorFilename('images'),
      },
      {
        test: /\.(png|svg|json|xml|ico)$/,
        // Specify "include" option to look for specific folders, otherwise webpack scans the whole src folder
        // Specify "generator" option to generate the file name, otherwise webpack give a name with hash 
        include: [resolve(__dirname, 'src', 'assets', 'favicons')],
        type: 'asset/resource',
        // If assets are referenced inside the html file, make sure to import them to the main entry file,
        // ico, xml and manifest.json files referenced by html file for PWA
        ...assetGeneratorFilename('favicons'),
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // If you want to keep the css files to diffrent folder specify the filename option
  // new MiniCssExtractPlugin({
  //   filename: ifProduction('stylesheets/[name].[contenthash].css', 'stylesheets/[name].css')
  // })
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: resolve(__dirname, 'src/static/index.html')
  })],
  // If you are using postcss and .browserlistrc, hot reloading will not work.
  // In that case set target as browserlist for a production build.
  // Could have been fixes, try before updating it.
  target: 'web'
}