export default () => ({
  port: parseInt(process.env.PORT),
  postgres: {
    url: process.env.DAAL_WALLET_AUTH_POSTGRES_URL,
    port: +process.env.DAAL_WALLET_AUTH_POSTGRES_PORT,
    username: process.env.DAAL_WALLET_AUTH_POSTGRES_USERNAME,
    password: process.env.DAAL_WALLET_AUTH_POSTGRES_PASSWORD,
    dbname: process.env.DAAL_WALLET_AUTH_POSTGRES_DBNAME,
  },
  user: {
    userJwtSecret: process.env.DAAL_WALLET_AUTH_USER_JWT_SECRET,
    userJwtExpirationTime:
      process.env.DAAL_WALLET_AUTH_USER_JWT_EXPIRATION_TIME,

    userJwtRefSecret: process.env.DAAL_WALLET_AUTH_USER_REFRESH_JWT_SECRET,
    userJwtRefExpirationTime:
      process.env.DAAL_WALLET_AUTH_USER_REFRESH_JWT_EXPIRATION_TIME,
  },
  admin: {
    superAdminJwtSecret: process.env.DAAL_WALLET_AUTH_ADMIN_JWT_SECRET,
    superAdminJwtExpirationTime:
      process.env.DAAL_WALLET_AUTH_ADMIN_JWT_EXPIRATION_TIME,
  },
  swagger: {
    username: process.env.DAAL_WALLET_SWAGGER_USERNAME,
    password: process.env.DAAL_WALLET_SWAGGER_PASSWORD,
  },
});
