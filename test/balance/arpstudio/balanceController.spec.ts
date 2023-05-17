import { Test, TestingModule } from "@nestjs/testing";
import { DepositController } from "../../../apps/api/balance/deposit.controller";
import { ArpStudioDepositService } from "../../../src/modules/core/balance/services/arpStudio/depositBalance.service";
import { VelaDepositBalanceService } from "../../../src/modules/core/balance/services/vela/deposit-balance.service";
import { DepositBalanceDto } from "@src/modules/core/balance/dtos/main/depositBalance.dto";


const arpStudioDepositServiceMock = () => ({
    depositBalance: jest.fn(),

});

const velaDepositServiceMock = () => ({
    depositBalance: jest.fn(),

});

const depositBalanceDto = {
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
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it.only('should be defined', () => {
        expect(depositController).toBeDefined();
    });

    it('should call arpStudioDepositService.depositBalance() when gameProvider is ARP_STUDIO', async () => {
        const depositArpstudioDto = {
            notifyid: 'a',
            username: 'karki22',
            atype: 1,
            amount: 100,
            source: 'test',
        };
        const dto = { gameProvider: 'ARP_STUDIO' };
        const expectedResponse = 'mocked response';
        const depositBalanceDto = { ...dto };

        // Mock the depositBalance() method of arpStudioDepositService
        arpStudioDepositService.depositBalance = jest.fn().mockResolvedValue(expectedResponse);

        // Act
        // await depositController.get(depositBalanceDto, res, req, ip);

        // Assert
        expect(arpStudioDepositService.depositBalance).toHaveBeenCalledWith(depositArpstudioDto);
        expect(res).toEqual({
            status: 200,
            body: {
                message: 'User balance deposited successfully.',
                data: expectedResponse,
            },
        });
    });

    // it('should call velaDepositService.depositBalance() when gameProvider is VELA_GAMING', async () => {
    //     // Arrange
    //     const dto = { gameProvider: 'VELA_GAMING' };
    //     const expectedResponse = 'mocked response';
    //     const depositBalanceDto = { ...dto };

    //     // Mock the depositBalance() method of velaDepositService
    //     velaDepositService.depositBalance = jest.fn().mockResolvedValue(expectedResponse);

    //     // Act
    //     await depositController.get(dto, res, req, ip);

    //     // Assert
    //     expect(velaDepositService.depositBalance).toHaveBeenCalledWith(depositBalanceDto);
    //     expect(res).toEqual({
    //         status: 200,
    //         body: {
    //             message: 'User balance deposited successfully.',
    //             data: expectedResponse,
    //         },
    //     });
    // });

    // it('should throw UnknownGamingProviderException when gameProvider is not recognized', async () => {
    //     // Arrange
    //     const dto = { gameProvider: 'UNKNOWN_PROVIDER' };

    //     // Act and assert
    //     await expect(depositController.get(dto, res, req, ip)).rejects.toThrow(UnknownGamingProviderException);
    // });

});