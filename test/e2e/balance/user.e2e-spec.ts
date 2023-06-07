import {INestApplication, forwardRef } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '@src/modules/core/user/users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { VelaUser } from '@src/modules/core/user/entity/createVelaUser.entity';
import { faker } from '@faker-js/faker';

jest.setTimeout(30000);
const newUser = {
  gameProvider: "ARP_STUDIO",
  username: "igaming-test",
  nickname: 'test',
};
const newUserVela = {
  gameProvider: "VELA_GAMING",
  username: faker.internet.userName(),
  host_id:"test1",
  currency:"PHP"
};


describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<ArpStudioUser>;
  let velaUserRepository: Repository<VelaUser>;

  const clearDatabase = async () => {
    await userRepository.delete({});
    await velaUserRepository.delete({});
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [

        TypeOrmModule.forRoot({
          ...require('../../../src/config/ormconfig.test'),
          synchronize: true,
          entities: [ArpStudioUser,VelaUser],
        }),
        forwardRef(() => UsersModule),


      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<ArpStudioUser>>(getRepositoryToken(ArpStudioUser));
    velaUserRepository = moduleFixture.get<Repository<VelaUser>>(getRepositoryToken(VelaUser));

    await app.init();

  });
  describe('/Create User For Vela Gaming (POST)', () => {
    it('should create a Vela gaming new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/create')
        .send(newUserVela)
      const createdUser = response.body;
      expect(createdUser.statusCode).toBe(200);
      expect(createdUser.data.username).toBe(newUserVela.username);

    });

  })

  afterAll(async () => {
    await clearDatabase();
    await app.close();
  });
});

