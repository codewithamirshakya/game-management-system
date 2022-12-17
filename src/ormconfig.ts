import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const OrmConfig: MysqlConnectionOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "nest_game_integration",
    "entities": [`${__dirname}/**/*.entity{.ts,.js}`],
    "synchronize": true
  }