module.exports = {
    webpackConfig: {
        module: {
            rules: [
                // Babel loader will use your project’s babel.config.js
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                // Other loaders that are needed for your components
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.(gif|png|jpg|jpeg)$/,
                    use: 'url-loader?limit=8192'
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'url-loader?limit=81920'
                },
            ]
        }
    },
    sections:[
        {
            name:"UI Components",
            components: "html/components/common/**.js"
        },
        {
            name:"Page Components",
            components: "html/components/**.js"
        },
    ],
    styleguideDir: "docs"
}