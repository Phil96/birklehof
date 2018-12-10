const path = require("path");

module.exports = {
    entry: './index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    mode: "development",
    externals: {
        "oimo": true,
        "cannon": true,
        "earcut": true
    },
};

/*  module.exports = {
    entry: './Main.ts',
    output: {
        filename: 'Main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    mode: "development",
    externals: {
        "oimo": true,
        "cannon": true,
        "earcut": true
    },
}; */ 