// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import {  Repository } from "typeorm";
// import { Response } from "express";
// import { HttpStatus, Res} from "@nestjs/common";
// import { AppModule } from '@src/modules/core/main/app.module';
// import { ApiLogModule } from '@src/modules/core/apiLog/apiLog.module';
// import { ArpStudioBalance } from '@src/modules/core/balance/entity/arpStudioBalance.entity';
// import { ApiLog } from '@src/modules/core/apiLog/domain/apiLog.entity';
// import e2eConfig from '../../../test/e2e.database.config';
// jest.setTimeout(6000000)
// describe('Get Balance', ()=> {
//     let app;
//     beforeEach(async () => {
//         const moduleRef: TestingModule = await Test.createTestingModule({
//             imports:[AppModule,ApiLogModule,
//                     TypeOrmModule.forRoot(e2eConfig)

//             ]
//           }).compile();
//         app = moduleRef.createNestApplication();
//         await app.init();
//     })

//     afterEach(async () => {
//         await app.close();
//       });

//     describe('GET /', () => {
//         it('should fetch user balance info successfully', () => {
//           const dto = {
//             gameProvider: 'ARP_STUDIO',
//             username:'karki22',

//           };

//           return request(app.getHttpServer()).get('/balance/get').query(dto)
//             // .expect(200)
//             // .expect('Content-Type', 'json')
//             .expect((res) => {
//                 console.log(res)
//               // Assert the response body or structure
//               expect(res.body.message).toBe('User balance info fetched successfully.');
//               // Additional assertions...
//             });
//         });
//       });


// })
