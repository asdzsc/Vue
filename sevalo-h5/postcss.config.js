module.exports = {
    // 配置所需相关文件
    plugins: {
        // 把px转换为rem
        'postcss-pxtorem': {
            rootValue: 37.5,
            // 需要转换的css属性，*是所有的属性都可以转换
            propList: ['*'],
        },
    },
};