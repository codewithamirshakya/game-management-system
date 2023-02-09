import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host:'8.tcp.ngrok.io',
  port: 13195,
  username: process.env.DB_USERNAME || 'root',
  database: process.env.DB_NAME || 'nest_game_integration',
  password: process.env.DB_PASSWORD,
  entities: [ 'dist/src/modules/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;