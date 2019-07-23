let path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

let conf = {
    entry: [
      './src/js/index.js',
      './src/css/style.sass'
    ],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'main.js',
        publicPath: '/dist'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.(css|sass|scss)$/,
           include: path.resolve(__dirname, 'src/css'),
           exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
              use: [{
                  loader: "css-loader",
                  options: {
                    sourceMap: true,
                  }
                },{
                  loader: 'postcss-loader',
                  options: {
                      plugins: [
                          autoprefixer({
                              browsers:['ie >= 8', 'last 4 version']
                          })
                      ],
                      sourceMap: true
                  }
                },{
                  loader: 'resolve-url-loader',

                },{
                  loader: "sass-loader",
                  options: {
                    sourceMap: true
                  }
                }
                
              ]
            }) 
          },
          { test: /\.(png|svg|jpg|gif)$/,loader: 'file-loader',options: {outputPath: 'img'} },
          { test: /\.(woff|woff2|eot|ttf|otf)$/,use: ['file-loader'] }
        ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: './css/style.bundle.css',
        allChunks: true,
        publicPath: '../../',
      }),
    ]


};

module.exports = (env, options) =>{
  let production = options.mode === 'production';
  conf.devtool = production
                  ?"source-map"
                  :"eval-sourcemap";
  return conf
};