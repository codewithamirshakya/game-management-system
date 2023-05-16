import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken } from '@nestjs/typeorm';
import { ArpStudioCreateUserService } from '@src/modules/core/user/services/arpstudio/createUser.service';
import { DataSource, Repository} from 'typeorm';
import {dataSourceStubs} from '../../stubs/datasource.stubs'
import { ArpStudioDepositService } from '../../../src/modules/core/balance/services/arpStudio/depositBalance.service';
import { ArpStudioBalance } from '@src/modules/core/balance/entity/arpStudioBalance.entity';
import { DepositBalance } from '@src/modules/core/balance/interface/arpStudio/arpStudioDepositBalance';
import { ArpStudioRequestService } from '@src/modules/core/common/service/arpStudio.request.service';
const arpStudioServiceMock = () => ({
    create: jest.fn(),
    findOneBy:jest.fn(),
    saveData:jest.fn(),
    createUserArpStudio:jest.fn(),
  });

  const ApiRequestMock = () => ({
    request: jest.fn(),
  });

  const arpStudioCreateServiceMock = () => ({
    findOneBy:jest.fn(),
    isUserExits:jest.fn(),

  });

  const userExists = true;
  const serverResponse = { result: 0 };
  const depositBalanceDto: DepositBalance = {
    notifyid: 'a',
   username: 'karki22',
   atype: 1,
   amount: 100,
   source: 'test',
  };

  const saveData = {
    id:'1',
    username: 'karki22',
    account_type: 1,
    source:'test',
    amount:100,
    withdraw_balance:0,
    available_balance:0,
    created_at:new Date(),
    updated_at:new Date(),
    currency:"USD",
    transaction_date: new Date(),
  };

  const mockResponseValue={
    username:"karki22",
    amount:100,
  }

  const mockUser = {
    username:"karki21",
  }

describe('depositBalance', () => {
  let service: ArpStudioDepositService,arpStudioRequestService,arpStudioRepository,arpStudioUserService;
  let repo: Repository<ArpStudioBalance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

    providers: [
        ArpStudioDepositService,
          {
            provide: ArpStudioRequestService,
            useFactory: ApiRequestMock
          },

          {
            provide: ArpStudioCreateUserService,
            useFactory: arpStudioCreateServiceMock
          },
          {
            provide: DataSource,
            useValue: dataSourceStubs
          },

          {
            provide: getRepositoryToken(ArpStudioBalance),
            useClass: Repository,
          },
    ],
    }).compile();

    service = module.get<ArpStudioDepositService>(ArpStudioDepositService);
    arpStudioRequestService = module.get<ArpStudioRequestService>(ArpStudioRequestService);
    arpStudioRepository = module.get<Repository<ArpStudioBalance>>(getRepositoryToken(ArpStudioBalance));
    arpStudioUserService = module.get<ArpStudioCreateUserService>(ArpStudioCreateUserService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error when user does not exits', async () => {
    jest.spyOn(arpStudioUserService, 'isUserExits').mockResolvedValue(false);
    try{
     const result = await service.depositBalance(depositBalanceDto);
    }catch(e){
      expect(e.message).toEqual('Deposit operation failed.')
    }
  });

  it('should throw error when deposit response is not zero', async () => {
    jest.spyOn(arpStudioUserService, 'isUserExits').mockResolvedValue(true);
    jest.spyOn(service, 'deposit').mockResolvedValue({result:1});
    try{
     const result = await service.depositBalance(depositBalanceDto);
    }catch(e){
      expect(e.message).toEqual('Deposit operation failed.')
    }
    jest.spyOn(service, 'deposit').mockResolvedValue(null);
    try{
     const result = await service.depositBalance(depositBalanceDto);
    }catch(e){
      expect(e.message).toEqual('Deposit operation failed.')
    }
  });

  it('should save data when conditions are fullfilled', async () => {
    jest.spyOn(arpStudioUserService, 'isUserExits').mockResolvedValue(true);
    jest.spyOn(service, 'deposit').mockResolvedValue({result:0});
    jest.spyOn(service, 'saveData').mockResolvedValue(saveData as any);
    const result = await service.depositBalance(depositBalanceDto);
    expect(result).toEqual({username:saveData.username,amount:saveData.amount});
    // expect(result).toEqual(saveData);

  });
});