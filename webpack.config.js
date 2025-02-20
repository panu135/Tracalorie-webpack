const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    mode:'development',
    entry:'./src/app.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js',
    },
    devServer:{
        static:{
            directory: path.resolve(__dirname,'dist'),
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
    },

    module: {
rules:[
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader'],
    }
]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Webpack App',
            filename:'index.html',
            template:'./src/index.html',
        }),
        new MiniCssExtractPlugin(),
    ]
};