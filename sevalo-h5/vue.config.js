module.exports = {
    publicPath: '/sevaloh5',
    outputDir: 'sevaloh5',
    assetsDir: 'static',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '千里马SCRM'
                return args
            })
        config.cache(true)
    },
}