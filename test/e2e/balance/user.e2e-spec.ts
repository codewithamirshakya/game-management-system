import { Body, INestApplication, forwardRef } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '@src/modules/core/user/users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { SharedModule } from '@src/modules/shared/shared.module';


jest.setTimeout(30000);

describe('UserController (e2e)', () => {
  let app: INestApplication;

  let userRepository: Repository<ArpStudioUser>;

  const clearDatabase = async () => {
    await userRepository.delete({});
};

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      UsersModule,
      SharedModule, // Add the SharedModule
      TypeOrmModule.forRoot({
        ...require('../../../src/config/ormconfig.test'),
        entities: [ArpStudioUser],
      }),
    ],
  }).compile();
  app = moduleFixture.createNestApplication();
  userRepository = moduleFixture.get<Repository<ArpStudioUser>>(getRepositoryToken(ArpStudioUser));

  await app.init();

});



  describe('/Create User (POST)', () => {
    it('should create a Arp Studio new user', async () => {
      const newUser = {
        gameProvider: "ARP_STUDIO",
        username: 'ram',
        nickname:'test',
      };

      const response = await request(app.getHttpServer())
        .post('/user/create')
        .send(newUser)
        .expect(201);
      const createdUser = response.body;
      expect(createdUser.username).toBe(newUser.username);
      expect(createdUser.isActive).toBe(true);


    });

})

afterAll(async () => {
  // await clearDatabase();
  await app.close();
});
});
