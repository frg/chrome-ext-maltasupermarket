/*global require, module, __dirname*/

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",

    entry: {
        popup: "./src/js/popup.js",
        background: "./src/js/background.js",
        "in-content": "./src/js/in-content.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },

    cache: true,
    devtool: "inline-source-map",

    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, "src")],
                use: "babel-loader",
            },
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./manifest.json" },
                { from: "./src/images" },
                { from: "./src/views" },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ],
};
