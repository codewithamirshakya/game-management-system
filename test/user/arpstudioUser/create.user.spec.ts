import { Test, TestingModule } from '@nestjs/testing';
import {getRepositoryToken } from '@nestjs/typeorm';
import { ArpStudioUser } from '@src/modules/core/user/entity/createArpStudio.entity';
import { ArpStudioCreateUserService } from '@src/modules/core/user/services/arpstudio/createUser.service';
import { createUserArpStudio } from '@src/modules/core/user/interface/arpStudioCreateUser.interface';
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


  const bodyPayload: createUserArpStudio = {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const createUserDto: createUserArpStudio = bodyPayload ;
    // jest.spyOn(service, 'findOneBy').mockReturnValue(mockRefreshToken);
    const result = await service.create(createUserDto);
    expect(apiRequestService.requestApi).toHaveBeenCalledTimes(1);
    // expect(service.findOneBy).not.toThrow();
    // expect(result).toBe(undefined);
  });
});