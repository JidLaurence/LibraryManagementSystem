module.exports = {
  env: {
    dev: true,
  },
  hapi: {
    port: process.env.HAPI_PORT,
  },
  app: {
    name: "LibraryManagementSystem",
    title: "Library Management System",
  },
  mongodb_production: {
    ip: process.env.MONGODB_PRODUCTION_IP,
    port: process.env.MONGODB_PRODUCTION_PORT,
    app: process.env.MONGODB_PRODUCTION_APP,
    username: process.env.MONGODB_PRODUCTION_USERNAME,
    password: process.env.MONGODB_PRODUCTION_PASSWORD,
  },
  mongodb_local: {
    ip: process.env.MONGODB_LOCAL_IP,
    port: process.env.MONGODB_LOCAL_PORT,
    app: process.env.MONGODB_LOCAL_APP,
  },
  url: {
    local: "",
  },
  crypto: {
    privateKey: process.env.CRYPTO_PRIVATE_KEY,
    tokenExpiry: 1 * 30 * 1000 * 60, //1 hour,
    cookie: "9f32956280f700be779728f3742e969ce273beb01d8c",
  },
  validation: {
    username: /^[a-zA-Z0-9]{5,12}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
  },
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    pass: process.env.GMAIL_PASSWORD,
    email: process.env.GMAIL_EMAIL,
  },
};
