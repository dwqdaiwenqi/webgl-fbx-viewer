var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ENV = process.env.npm_lifecycle_event
const pkg = require('./package.json')

module.exports = {
  entry:  './src/main.js',
  devtool: ENV==='dev'?'#source-map':'',
  output: { 
    path: __dirname+'/dist/'
    ,filename: ENV==='dev'?`scripts/assetstore-webgl-${pkg.version}.js`:`scripts/assetstore-webgl-${pkg.version}.min.js`
    ,library: 'WebGlAssetStore'
    ,libraryTarget: 'umd' 
    ,libraryExport: 'default'
  },
  
  module: {
    rules: [
      {    
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
        // query: {
        //   presets: ['env', 'stage-1'],
        //   plugins: ['transform-runtime']
        // }   
      },
      {
        test: /\.(css|less)$/,
        use: [

        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
          plugins: ()=>[require('autoprefixer')]
          }},  
        'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath:'',
              name :'img/[name].[ext]?[hash:6]',
              // limit: 1024*1024*100
              limit: 1
            }
          }
        ]
      }
      // ,{
      //   test: /\.(md|obj|mtl|fbx|FBX)$/,
      //   loader : 'raw-loader'
      // }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("assetstore-webgl-sdk v"+require('./package.json').version),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.npm_lifecycle_event),
      __VERSION__: JSON.stringify(require('./package.json').version)
    }),
    new HtmlWebpackPlugin({
      title: 'assetstore-webgl-sdk',
      filename: 'index.html',
      template:'./src/index.html',
      inject:'head'
    })
  ]

}