let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    mode: "development",
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'main.js'
    },
    plugins:[//配置插件
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module:{//第三方模块解析
        rules:[//第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=4084&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体的loader
            {test: /\.m?js$/,exclude: /(node_modules|bower_components)/,use: 'babel-loader'},
            {test:/\.vue$/,use:'vue-loader'},//处理.vue文件的loader
        ]
    },
    resolve:{
        alias:{//修改vue导入包时的路径
            // 'vue$':'vue/dist/vue.js'
        }
    }
}