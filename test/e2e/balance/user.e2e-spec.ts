import { Body, INestApplication, forwardRef } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '@src/modules/core/user/users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

jest.setTimeout(30000);

const newUser = {
  gameProvider: "ARP_STUDIO",
  username: "ram",
  nickname:'test',
};


describe('UserController (e2e)', () => {
  let app: INestApplication ;

  let userRepository: Repository<ArpStudioUser>;

  const clearDatabase = async () => {
    await userRepository.delete({});
};

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [

      TypeOrmModule.forRoot({
        ...require('../../../src/config/ormconfig.test'),
        synchronize: true,
          dropSchema: true,
        entities: [ArpStudioUser],
      }),
      forwardRef(() => UsersModule),


    ],
  }).compile();
  app = moduleFixture.createNestApplication();
  userRepository = moduleFixture.get<Repository<ArpStudioUser>>(getRepositoryToken(ArpStudioUser));

  await app.init();

});
  describe('/Create User For Arp (POST)', () => {
    it('should create a Arp Studio new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/create')
        .send(newUser)
      const createdUser = response.body;
      expect(createdUser.statusCode).toBe(200);
      expect(createdUser.data.username).toBe(newUser.username);


    });

})

describe('Get detail for Arp studio', () => {
  it('should create a Arp Studio new user', async () => {
    const response = await request(app.getHttpServer())
      .get('/user/detail')
      .query(newUser)
    const detailUser = response.body;
    expect(detailUser.statusCode).toBe(200);
    expect(detailUser.data.username).toBe(newUser.username);


  });

})

afterAll(async () => {
  await clearDatabase();
  await app.close();
});
});
