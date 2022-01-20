/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:[
        "cdn.shopify.com",
      "images.canadagoose.com",
      "images-na.ssl-images-amazon.com",
      "store.storeimages.cdn-apple.com"
    ]
  }

}

module.exports = nextConfig
