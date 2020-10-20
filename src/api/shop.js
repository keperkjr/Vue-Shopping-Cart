/**
 * Mocking client-server processing
 */
const _products = [
    {
        "id": 1, 
        "title": 
        "iPad 4 Mini", 
        "price": 500.01, 
        "inventory": 2, 
        "image": 'https://images-na.ssl-images-amazon.com/images/I/61V9XmqGscL._AC_SX679_.jpg',
        "categories": ["Electronics"],
    },
    {
        "id": 2, 
        "title": "H&M T-Shirt White", 
        "price": 10.99, 
        "inventory": 10, 
        "image": 'https://i.pinimg.com/474x/ea/ac/ef/eaacef3ef23baa14d93cc51aeb3e2bae.jpg',
        "categories": ["Clothing"], 
    },
    {
        "id": 3, 
        "title": "Charli XCX - Sucker CD", 
        "price": 19.99, 
        "inventory": 5, 
        "image": 'https://img.discogs.com/OdNOxMrIDLtuhxG3jAoMuy1sKg4=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6417881-1582920045-4712.jpeg.jpg',
        "categories": ["Music", "Electronics"]
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