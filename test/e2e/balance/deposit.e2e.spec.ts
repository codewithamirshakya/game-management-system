import * as request from 'supertest';
require('dotenv').config();
import { ArpStudioCreateUserService } from '../../../src/modules/core/user/services/arpstudio/createUser.service'; // Import your service here
import { ApiRequestService } from '@src/modules/core/common/service/apiRequest.service';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { Repository } from 'typeorm';

const baseURL = process.env.APP_BASE_URL;
let repo: Repository<ArpStudioUser>;
let apiRequestService: ApiRequestService;
describe('Todo', () => {
    const apiRequest = request(baseURL);

    const requestBody = {
        gameProvider: "ARP_STUDIO",
        notifyid: "a",
        username: "karki12",
        atype: 1,
        source: "test",
        amount: 10
    }

    const creatuser = {
        gameProvider: "ARP_STUDIO",
        username: "karki12",
        nickname: "test",
    }

    // let userService: ArpStudioCreateUserService; // Declare a variable to hold the service instance

    // beforeAll(() => {
    //     repo = {

    //         findOneBy: jest.fn(),
    //         save: jest.fn(),
    //     } as unknown as Repository<ArpStudioUser>;

    //     apiRequestService = {
    //         findOneBy: jest.fn(),
    //     } as unknown as ApiRequestService;
    //     userService = new ArpStudioCreateUserService(repo, apiRequestService); // Create an instance of your service
    // });

    describe('POST: arp studio user', () => {
        it('should have the response', async () => {
            // const existingUser = await userService.isUserExits(creatuser.username);
            // if (!existingUser) {
                const response = await apiRequest.post('api/user/create').send(creatuser);
                expect(response.status).toBe(200);
            // }
        })

    });

    describe('POST: arp studio user', () => {
        it('should have the response', async () => {
            // const existingUser = await userService.isUserExits(creatuser.username);
            // if (!existingUser) {
                const response = await apiRequest.post('api/user/create').send(creatuser);
                expect(response.status).toBe(200);
            // }
        })

    });
    describe('POST: deposit balance', () => {
        it('should have the response', async () => {
            const response = await apiRequest.post('api/balance/deposit').send(requestBody);
            console.log(response.body)
            expect(response.status).toBe(200);
        });
    });

});