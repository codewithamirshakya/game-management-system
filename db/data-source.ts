import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME || 'root',
  database: process.env.DB_NAME || 'nest_game_integration',
  password: process.env.DB_PASSWORD,
  entities: [ 'dist/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;