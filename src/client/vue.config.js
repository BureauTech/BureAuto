module.exports = {
    configureWebpack: {
        devtool: "source-map"
    },
    transpileDependencies: ["vuetify"],
    dev: {
        SERVER_URL: process.env.SERVER_URL
    }
}
