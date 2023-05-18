import { Test, TestingModule } from "@nestjs/testing";
import { DepositController } from "../../../apps/api/balance/deposit.controller";
import { ArpStudioDepositService } from "../../../src/modules/core/balance/services/arpStudio/depositBalance.service";
import { VelaDepositBalanceService } from "../../../src/modules/core/balance/services/vela/deposit-balance.service";
import { DepositBalanceDto } from "@src/modules/core/balance/dtos/main/depositBalance.dto";
import {
    UnknownGamingProviderException
} from "../../../src/modules/core/shared/domain/exception/unknownGamingProvider.exception";
import { HttpStatus } from "@nestjs/common";
let mockResponse: any;
let mockRequest: any;
let mockIp: string;
let mockRes: any;
const arpStudioDepositServiceMock = () => ({
    depositBalance: jest.fn(),

});

const velaDepositServiceMock = () => ({
    depositBalance: jest.fn(),

});

const mockGamingProviderEnum = {
    ARP_STUDIO: 'ARP_STUDIO',
    VELA_GAMING: 'VELA_GAMING',
};

const mockResponseValue = {
    username: "karki22",
    amount: 100,
}

const finalResponse = {
    "success": true,
    "statusCode": 200,
    "message": "User balance deposited successfully.",
    "data": {
        "username": "karki22",
        "amount": 100
    }
}

const depositDto = {
    notifyid: "string",
    username: "string",
    tradeno: 0,
    atype: 0,
    currenttime: 0,
    source: "string",
    amount: 0,
    transid: "string",
    currency: "string",
    host_id: "string",
    member_id: "string",
    euID: "string",
    output: "string",
    tcheck: "string",
    uID: "string",
    createuser: "string",
};

const depositArpstudioDto = {
    notifyid: 'a',
    username: 'karki22',
    atype: 1,
    amount: 100,
    source: 'test',
};
describe("BalanceDepositController get()", () => {
    let depositController: DepositController;
    let arpStudioDepositService: ArpStudioDepositService;
    let velaDepositService: VelaDepositBalanceService;
    let res: any; // Mocked response object
    let req: any; // Mocked request object
    const ip = '127.0.0.1';
    mockResponse = { id: 1, amount: 100 };
    mockRequest = {};
    mockIp = '127.0.0.1';
    mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DepositController],
            providers: [

                {
                    provide: ArpStudioDepositService,
                    useFactory: arpStudioDepositServiceMock
                },

                {
                    provide: VelaDepositBalanceService,
                    useFactory: velaDepositServiceMock
                },
            ],
        }).compile();
        depositController = app.get<DepositController>(DepositController);
        arpStudioDepositService = app.get<ArpStudioDepositService>(ArpStudioDepositService);
        velaDepositService = app.get<VelaDepositBalanceService>(VelaDepositBalanceService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(depositController).toBeDefined();
    });

    it('should call requestService() and handle success response', async () => {

        const dto = { gameProvider: mockGamingProviderEnum.ARP_STUDIO };
        const requestServiceMock = jest.spyOn(depositController, 'requestService')
        .mockResolvedValue(mockResponseValue);
        const depositBalanceDto:DepositBalanceDto = { ...dto,...depositDto} as any;
        const result = await depositController.get(depositBalanceDto, mockRes, mockRequest, mockIp);
        expect(requestServiceMock).toHaveBeenCalledWith(depositBalanceDto, mockRequest, mockIp);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(finalResponse);
    });

    // it('should throw UnknownGamingProviderException when gameProvider is not recognized', async () => {
    //     const dto = { gameProvider: 'UNKNOWN_PROVIDER' };
    //     const depositBalanceDto = {...depositDto,...dto,  } as any
    //     // try {
    //         // Call the code that throws the exception
    //          await expect(()=>depositController.get(depositBalanceDto, res, req, ip)).rejects.toThrow(UnknownGamingProviderException);

    //         // If the exception is not thrown, fail the test
    //         // expect.fail('Expected UnknownGamingProviderException to be thrown');
    //     //   } catch (error) {
    //     //     // Assert that the correct exception is thrown
    //     //     expect(error.message).toBe('Game provider not found');
    //     //     expect(error.getStatus()).toBe(400);
    //     //   }
    //     // await expect(()=>depositController.get(depositBalanceDto, res, req, ip)).rejects.toThrow(UnknownGamingProviderException);
    // });

    it('should call arpStudioDepositService.depositBalance() when gameProvider is ARP_STUDIO', async () => {
        const dto = { gameProvider: 'ARP_STUDIO' };
        await depositController.get(dto as any,mockRes,req,ip);

        // Mock the depositBalance() method of arpStudioDepositService
        jest.spyOn(arpStudioDepositService, 'depositBalance').mockResolvedValue(mockResponseValue);
        arpStudioDepositService.depositBalance = jest.fn().mockResolvedValue(mockResponseValue);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(finalResponse);
       });

    it('should call velaDepositService.depositBalance() when gameProvider is VELA_GAMING', async () => {
        // Arrange
        const dto = { gameProvider: 'VELA_GAMING' };


        // Mock the depositBalance() method of velaDepositService
        velaDepositService.depositBalance = jest.fn().mockResolvedValue(mockResponseValue);

        // Act
        await depositController.get(dto as any, mockRes, req, ip);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(
            finalResponse,
        );
    });

  

});