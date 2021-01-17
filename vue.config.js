// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  vue.config.js
//    Description: Adds additional options to the site config
// ============================================================================ 
module.exports = {
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    publicPath: process.env.NODE_ENV === 'production' ? '/demo/vue-store/' : '/',
   
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = 'My Programming Notes - Vue Store'
            return args;
        });
    }
}