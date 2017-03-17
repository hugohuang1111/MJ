import path from 'path';
import webpack from 'webpack';

const dest_dir = path.join(__dirname, 'app', 'asset', 'src');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

export default (function() {
    let config = [{
        devtool: 'cheap-module-eval-source-map',
        entry: {
            mj: './src/index'
        },
        output: {
            path: dest_dir,
            filename: '[name].js',
            publicPath: '/app/asset/src/',
            chunkFilename: '[name].[chunkhash:5].min.js',
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
            }]
        },
        plugins: []
    }];

    if (isProd) {
        for (let i in config) {
            let c = config[i];
            c.plugins.push(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }));
        }
    }

    return config;
}());
