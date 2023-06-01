import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AppModule } from '../../src/modules/core/main/app.module';
import {AppDataSource} from '../e2e.database.config';
import { modules } from '@src/modules/core/main/modules';

export class AppFactory {
  constructor(
    private readonly appInstance: INestApplication,
    protected readonly connection: DataSource
  ) {}

  get instance() {
    return this.appInstance;
  }

  get dbConnection() {
    return this.connection;
  }

  static async new() {
    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule,...modules]
    })


    const module = await moduleBuilder.compile();
    const app = module.createNestApplication(undefined, {
      logger: false
    });
    await app.init();
    await AppDataSource.initialize();
    return new AppFactory(app, AppDataSource);
  }

  async close() {
    // await this.connection.dropDatabase();
    if (this.appInstance) {
      await this.appInstance.close();
    }
  }

  async cleanupDB() {
    if (this.connection.isInitialized) {
      const entities = this.connection.entityMetadatas;
      for (const entity of entities) {
        const queryRunner = this.connection.manager.getRepository(entity.name);

        // delete everything from table ignoring relations
        await queryRunner.query(
          `TRUNCATE TABLE ${entity.tableName};`
        );

        await queryRunner.query(
            `ALTER TABLE ${entity.tableName} AUTO_INCREMENT = 1;`
          );
      }
    }
  }
}

