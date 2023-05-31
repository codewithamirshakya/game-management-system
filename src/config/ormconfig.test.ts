require('dotenv').config();

module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME || 'root',
    database: process.env.DB_NAME_TEST,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: ['src/**/*.entity.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };

