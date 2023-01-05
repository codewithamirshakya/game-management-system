import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArpStudioUser } from "../../../domain/arpStudio.user.entity";
import {
  UpdateUserRepositoryInterface
} from "../../../domain/repository/intefaces/arpStudio/update.user.repository.interface";
import { ArpStudioRequestService } from "../../../../shared/application/service/arpStudio.request.service";
import { UpdateUserDto } from "../../../domain/dtos/request/arpStudio/update.user.dto";
import { ArpStudioRequestDto } from "../../../../shared/application/dto/arpStudio.request.dto";

@Injectable()
export class UpdateUserRepository implements UpdateUserRepositoryInterface {

  @Inject(ArpStudioRequestService)
  public arpStudioRequestService: ArpStudioRequestService

  constructor(
    @InjectRepository(ArpStudioUser) private usersRepository: Repository<ArpStudioUser>,
    ) {}

  async update(data: UpdateUserDto): Promise<any> {
    return this.arpStudioRequestService.request(new ArpStudioRequestDto({
      method: 'POST',
      params: data,
      endpoint: '/user/update'
    }));
    // return this.usersRepository.save(data);
  }
}