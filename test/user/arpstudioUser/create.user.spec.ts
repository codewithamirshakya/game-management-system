import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken } from '@nestjs/typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { ArpStudioCreateUserService } from '@src/modules/core/user/services/arpstudio/createUser.service';
import { createUserArpStudio, saveUserArpStudio } from '@src/modules/core/user/interface/arpStudioCreateUser.interface';
import { DataSource, Repository} from 'typeorm';
import { ApiRequestService } from '@src/modules/core/shared/application/service/apiRequest.service';
import {dataSourceStubs} from '../../stubs/datasource.stubs'

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

  const saveData :saveUserArpStudio = {
    id: 1,
    username: 'gaming',
    nickname: 'test12',
    state: 0,
    open_url: 'https://arpstg-player.solaireonlinecasino.com/direct/login/MTY4NDQwMTgxOF8zMDBfMTM2NF8zM0UwQ0Y=?d=5',
    created_at: new Date(),
    updated_at: new Date()
  };

  const createUserDto: createUserArpStudio = {
    username: 'mahesh',
    nickname: 'karki22',
  };



describe('ArpStudioCreateUserService', () => {
  let service: ArpStudioCreateUserService,apiRequestService,arpStudioRepository;
  let repo: Repository<ArpStudioUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

    providers: [
        ArpStudioCreateUserService,
          {
            provide: ApiRequestService,
            useFactory: ApiRequestMock
          },
          {
            provide: DataSource,
            useValue: dataSourceStubs
          },

          {
            provide: getRepositoryToken(ArpStudioUser),
            useClass: Repository,
          },
    ],
    }).compile();

    service = module.get<ArpStudioCreateUserService>(ArpStudioCreateUserService);
    apiRequestService = module.get<ApiRequestService>(ApiRequestService);
    arpStudioRepository = module.get<Repository<ArpStudioUser>>(getRepositoryToken(ArpStudioUser));

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
      await service.create(createUserDto);
    }catch(e){
      expect(e.message).toEqual('User Create retrieve operation failed.')
    }
  });

  it('should throw error when Server response is not zero', async () => {
    jest.spyOn(service, 'isUserExits').mockResolvedValue(null);
    jest.spyOn(service, 'createUserArpStudio').mockResolvedValue({result:1});
    try{
     await service.createUserArpStudio(createUserDto);
    }catch(e){
      expect(e.message).toEqual('User Create retrieve operation failed.')
    }
    jest.spyOn(service, 'createUserArpStudio').mockResolvedValue(null);
    try{
     await service.createUserArpStudio(createUserDto);
    }catch(e){
      expect(e.message).toEqual('User Create retrieve operation failed.')
    }
  });

  it('should save data when conditions are fullfilled', async () => {
    jest.spyOn(service, 'isUserExits').mockResolvedValue(null);
    jest.spyOn(service, 'createUserArpStudio').mockResolvedValue({result:0});
    jest.spyOn(service, 'saveData').mockResolvedValue(saveData as any );
    try {
      const result = await service.create(createUserDto);
      expect(apiRequestService.requestApi).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        username: saveData.username,
        nickname: saveData.nickname,
        state: saveData.state,
      });
    } catch (e) {
      expect(e.message).toEqual('User Create retrieve operation failed.')}
  });

});

