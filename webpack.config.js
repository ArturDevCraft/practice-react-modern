const taskNumber = '03';
// numer przerabianego zadania

const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// importuję odpowiedni plugin
module.exports = {
    entry: `./${taskNumber}/app.js`,
    // definiuje plik wejściowy
    mode: 'development',
    // definiuję tryb działania
    output: {
        path: path.resolve(__dirname, 'build'),
        // definiuje ścieżką wyjściową
        filename: 'app.min.js',
        // definiuję nazwę pliku wyjściowego
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // określam jakie pliki
                // będą brane pod uwagę
                exclude: /node_modules/,
                // określam wykluczenia
                use: ['babel-loader'],
                // określam jakie loader-y
                // mają być wykorzystywane
            },
        ],
        // obecnie brak dodatkowych ustawień
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./${taskNumber}/index.html`,
            // wskazuje plik źródłowy
            filename: 'index.html',
            // określan nazwę dla pliku
        }),
        new ESLintPlugin(),
    ],
};
// eksportuję ustawienia dla webpack-a
