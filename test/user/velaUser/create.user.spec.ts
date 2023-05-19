import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken } from '@nestjs/typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { VelaCreateUserService } from '@src/modules/core/user/services/vela/createUser.service';
import { createUserArpStudio, saveUserArpStudio } from '@src/modules/core/user/interface/arpStudioCreateUser.interface';
import { DataSource, Repository} from 'typeorm';
import { ApiRequestService } from '@src/modules/core/shared/application/service/apiRequest.service';
import {dataSourceStubs} from '../../stubs/datasource.stubs'
import { CreateUserVela, saveUserVela } from '@src/modules/core/user/interface/velaCreateUser.interface';
import { VelaUser } from '@src/modules/core/user/entity/createVelaUser.entity';
const { initializeTransactionalContext } = require('typeorm');

const arpStudioServiceMock = () => ({
    create: jest.fn(),
    findOneBy:jest.fn(),
    saveData:jest.fn(),
    createUserArpStudio:jest.fn(),
  });

  const ApiRequestMock = () => ({
    requestApi: jest.fn(),
  });

  const arpStudioServiceRepositoryMock = () => ({
    save: jest.fn(),
  });

  const saveData :saveUserVela = {
        id: 1,
        username: 'computer12345',
        member_id: 'igaming-test',
        host_id: 'test',
        currency: 'PHP',
        created_at: new Date(),
        updated_at: new Date()
  };

const createUserDto: CreateUserVela = {
    host_id: 'test',

    member_id: 'igaming-test',

    currency: 'PHP',
};



describe('VelaCreateUserService', () => {
  let service: VelaCreateUserService,apiRequestService,arpStudioRepository;
  let repo: Repository<VelaUser>;
  let req: any; // Mocked request object
  const ip = '127.0.0.1';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

    providers: [
        VelaCreateUserService,
          {
            provide: ApiRequestService,
            useFactory: ApiRequestMock
          },
          {
            provide: DataSource,
            useValue: dataSourceStubs
          },

          {
            provide: getRepositoryToken(VelaUser),
            useClass: Repository,
          },
    ],
    }).compile();

    service = module.get<VelaCreateUserService>(VelaCreateUserService);
    apiRequestService = module.get<ApiRequestService>(ApiRequestService);
    arpStudioRepository = module.get<Repository<VelaUser>>(getRepositoryToken(VelaUser));

  });

  afterEach(() => {
    jest.clearAllMocks();
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should throw error when user exits', async () => {
    jest.spyOn(service, 'isUserExits').mockResolvedValue(saveData);
    try{
        await service.createPlayer(createUserDto);
    }catch(e){
      expect(e.message).toEqual('User already exists.')
    }
  });

  it('should throw error when Server response status code is not zero', async () => {
    jest.spyOn(service, 'isUserExits').mockResolvedValue(null);
    jest.spyOn(service, 'createPlayer').mockResolvedValue({status_code:0});
    try{
     await service.createPlayer(createUserDto);
    }catch(e){
      expect(e.message).toEqual('Player creation failed.')
    }
    jest.spyOn(service, 'createPlayer').mockResolvedValue(null);
    try{
        await service.createPlayer(createUserDto);
    }catch(e){
      expect(e.message).toEqual('Player creation failed.')
    }
  });

    it('should save data when conditions are fullfilled', async () => {
        jest.spyOn(service, 'isUserExits').mockResolvedValue(null);
        jest.spyOn(service, 'createPlayer').mockResolvedValue({ status_code: 0 });
        jest.spyOn(service, 'saveData').mockResolvedValue(saveData);
        try {
            const result = await service.create(createUserDto,req,ip);
            expect(apiRequestService.requestApi).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                username: saveData.username,
            });
        } catch (e) {
            expect(e.message).toEqual('User Create retrieve operation failed.')
        }
    });

});

