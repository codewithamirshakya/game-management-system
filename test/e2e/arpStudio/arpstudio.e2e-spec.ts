import { BalanceModule } from './../../../src/modules/core/balance/balance.module';
import { INestApplication, forwardRef } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '@src/modules/core/user/users.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ArpStudioBalance } from '@src/modules/core/balance/entity/arpStudioBalance.entity';

jest.setTimeout(30000);
const depositRequest = {
    "gameProvider": "ARP_STUDIO",
    "notifyid": "a",
    "username": "igaming-test",
    "atype": 1,
    "source": "test",
    "amount": 10,
    "available_balance": 0,
    "deposit_balance": 0,
};
const getBalanceRequest = {
    gameProvider: "ARP_STUDIO",
    username: "igaming-test"
};

const newUser = {
    gameProvider: "ARP_STUDIO",
    username: "igaming-test",
    nickname: 'test',
};


describe('UserController (e2e)', () => {
    let app: INestApplication;
    let arpStudioBalanceRepository: Repository<ArpStudioBalance>;
    let userRepository: Repository<ArpStudioUser>;

    const clearDatabase = async () => {
        await arpStudioBalanceRepository.delete({});
        await userRepository.delete({});

    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    ...require('../../../src/config/ormconfig.test'),
                    synchronize: true,
                    entities: [ArpStudioBalance, ArpStudioUser],
                }),
                forwardRef(() => BalanceModule),
                forwardRef(() => UsersModule),

            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        arpStudioBalanceRepository = moduleFixture.get<Repository<ArpStudioBalance>>(getRepositoryToken(ArpStudioBalance));
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
        it('should get detail for Arp Studio new user', async () => {
          const response = await request(app.getHttpServer())
            .get('/user/detail')
            .query(newUser)
          const detailUser = response.body;
          expect(detailUser.statusCode).toBe(200);
          expect(detailUser.data.username).toBe(newUser.username);
        });
      })
    describe('/Deposit Balance In Arp Studio', () => {
        it('should deposit balance in arp studio', async () => {
            const response = await request(app.getHttpServer())
                .post('/balance/deposit')
                .send(depositRequest)
            const depositData = response.body;
            expect(depositData.statusCode).toBe(200);
        });
    })

    describe('Get balance for Arp studio', () => {
        it('should get balance detail for Arp Studio', async () => {
            const response = await request(app.getHttpServer())
                .get('/balance/get')
                .query(getBalanceRequest)
            const detailBalance = response.body;
            expect(detailBalance.statusCode).toBe(200);
            expect(detailBalance.data.username).toBe(getBalanceRequest.username);


        });

    })

    afterAll(async () => {
        await clearDatabase();
        await app.close();
    });
});
