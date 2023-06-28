import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'karki123',
  database: 'nest_game_test',
  synchronize: true,// Automatically synchronize database schema with entities (for testing purposes)
  entities: ['dist/src/modules/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: process.env.APP_ENV === 'test',
  dropSchema: process.env.APP_ENV === 'test',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);

