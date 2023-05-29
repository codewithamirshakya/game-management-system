import { Body } from '@nestjs/common';
import * as request from 'supertest';
import { AppFactory } from '../../factories/app';
import { UserFactory } from '../../factories/user.factory';
jest.setTimeout(30000);

describe('Balance Controller (e2e)', () => {

  let app: AppFactory;

  beforeAll(async () => {
    app = await AppFactory.new();
  });

  beforeEach(async () => {
    await app.cleanupDB();
    // await app.cleanupDB();
  });

  afterAll(async () => {
    // await app.cleanupDB();
    await app.close();
  });

  const requestBody = {
    gameProvider: "ARP_STUDIO",
    notifyid: "a",
    username: "karki12",
    atype: 1,
    source: "test",
    amount: 10,
    id: 1,
  }

  describe('getUsers detail', () => {
    it('deposit the balance requires request body', async () => {
      const user = await UserFactory.new(app.dbConnection).create
      console.log(user);
      const response= await request(app.instance.getHttpServer()).get('/user/detail?gameProvider=ARP_STUDIO&username=karki22')
    console.log('test',response.body);
    expect(response.statusCode).toBe(200);
    // expect(response.success).toBe(true);
    // expect(response.message).toBe(200);
    })
  })

});
