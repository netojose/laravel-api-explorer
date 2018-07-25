const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: "./resources/assets/js/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "resources/assets/build")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: "svg-url-loader",
                    options: {}
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve("src")
    }
}
