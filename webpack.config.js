const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: {
            index: './src/index.js',
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('./public'),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@babel/preset-env',
                            ],
                        },
                    },
                },
            ],
        },
        devServer: {
            contentBase: './public',
            port: 8080,
            proxy: {
                '/dcard': {
                    target: 'https://www.dcard.tw',
                    pathRewrite: { '^/dcard': '' },
                    changeOrigin: true,
                },
            },
        },
        plugins: [new webpack.DefinePlugin(envKeys)],
    };
};
