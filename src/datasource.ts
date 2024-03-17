import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DAAL_WALLET_AUTH_POSTGRES_URL,
  port: +process.env.DAAL_WALLET_AUTH_POSTGRES_PORT,
  username: process.env.DAAL_WALLET_AUTH_POSTGRES_USERNAME,
  password: process.env.DAAL_WALLET_AUTH_POSTGRES_PASSWORD,
  database: process.env.DAAL_WALLET_AUTH_POSTGRES_DBNAME,
});

export default AppDataSource;
