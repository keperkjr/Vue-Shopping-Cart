// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  vue.config.js
//    Description: Adds additional options to the site config
// ============================================================================ 
module.exports = {
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = 'My Programming Notes - Vue Store'
            return args;
        });
    }
}