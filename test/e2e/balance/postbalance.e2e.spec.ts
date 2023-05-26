import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/modules/core/main/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArpStudioCreateUserService } from '../../../src/modules/core/user/services/arpstudio/createUser.service';
import { UsersModule } from '@src/modules/core/user/users.module';
import { BalanceModule } from '@src/modules/core/balance/balance.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: ArpStudioCreateUserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,UsersModule,BalanceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<ArpStudioCreateUserService>(ArpStudioCreateUserService);
  });

  afterAll(async () => {
    await app.close();
  });

  const creatuser = {
    gameProvider: "ARP_STUDIO",
    username: "karki12",
    nickname: "test",
  }

  it('should have the response', async () => {
    // const existingUser = await userService.isUserExits(creatuser.username);
    // if(!existingUser){
    const response =await request(app.getHttpServer()).post('/api/user/create').send(creatuser);
    expect(response.status).toBe(200);
    // }
});

  it('POST /balance', async () => {
    const requestBody = {
        gameProvider: "ARP_STUDIO",
        notifyid: "a",
        username: "karki12",
        atype: 1,
        source: "test",
        amount: 10,
      }

    // const existingUser = await userService.isUserExits(requestBody.username);
    // if (existingUser) {
        const response = await request(app.getHttpServer())
        .post('/api/balance/deposit')
        .send(requestBody)
        .expect(200);
        expect(response.statusCode).toBe(200);

    // }

  });
});