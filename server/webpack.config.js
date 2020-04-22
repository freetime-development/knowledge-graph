const nodeExternals = require("webpack-node-externals");
const { CheckerPlugin } = require("awesome-typescript-loader");
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
    mode: "development",
    watch: true,
    target: "node",
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: "source-map",
    entry: [
        "./src/server.ts"
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options : {
                            reportFiles: [
                                'src/**/*'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CheckerPlugin(),
        new NodemonPlugin()
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true
    }
};
