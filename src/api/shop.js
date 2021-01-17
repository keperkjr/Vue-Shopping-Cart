// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  shop.js
//    Description: Mocking client-server processing
// ============================================================================ 

// The images below are stored in the 'assets' folder. You could 
// also use an image url hosted online as the image source
const _products = [
    {
        'id': 1, 
        'title': 
        'iPad 4 Mini', 
        'price': 500.01, 
        'inventory': 2, 
        // Source: https://images-na.ssl-images-amazon.com/images/I/61V9XmqGscL._AC_SX679_.jpg
        'image': 'ipad.jpg',
        'categories': ['Electronics'],
    },
    {
        'id': 2, 
        'title': 'H&M T-Shirt White', 
        'price': 10.99, 
        'inventory': 10, 
        // Source: https://i.pinimg.com/474x/ea/ac/ef/eaacef3ef23baa14d93cc51aeb3e2bae.jpg
        'image': 't-shirt.jpg',
        'categories': ['Clothing'], 
    },
    {
        'id': 3, 
        'title': 'Charli XCX - Sucker CD', 
        'price': 19.99, 
        'inventory': 5, 
        // Source: https://img.discogs.com/OdNOxMrIDLtuhxG3jAoMuy1sKg4=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6417881-1582920045-4712.jpeg.jpg
        'image': 'sucker-cd.jpg',
        'categories': ['Music', 'Electronics']
    },
]

export default {
  getProducts (cb, timeout = 100) {
    setTimeout(() => cb(_products), timeout)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.webdriver)
        ? cb()
        : errorCb()
    }, 100)
  }
}