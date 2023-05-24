import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from "typeorm";
import { Response } from "express";
import { HttpStatus, Res } from "@nestjs/common";
import { AppModule } from '@src/modules/core/main/app.module';

// import { CreateController }  from 'apps/api/user/create.controller'
// import { ArpStudioCreateUserService } from "src/modules/core/user/services/arpstudio/createUser.service";
// import { VelaCreateUserService } from "src/modules/core/user/services/vela/createUser.service";
// import { EvolutionCreateUserService } from "src/modules/core/user/services/evolution/createUser.service";
// import { CreateUserDto } from "src/modules/core/user/dtos/main/createUser.dto";


describe('AppUser', () => {


    let app;
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        app = moduleRef.createNestApplication();
        await app.init();
    })

    afterEach(async () => {
        await app.close();
    });


    describe('createUser', () => {
        it('it should return success status', async () => {
            const mockUsers = {
                gameProvider: 'ARP_STUDIO',
                username: 'Test23',
                nickname: 'tnickname',
                currency: 'AUD',
                host_id: 'ex_host_id',
                member_id: 'tst_member_id',
                uuid: 93839,

            }
            const response = await request(app.getHttpServer()).post('/users').send(mockUsers);
            expect(response.statusCode).toBe(HttpStatus.CREATED);
            //expect(response.body).toEqual(mockUsers);
        });
    });

})


