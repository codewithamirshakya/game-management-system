// import { Inject, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { ArpStudioUser } from "../../../domain/arpStudio.user.entity";
// import {
//   UpdateUserRepositoryInterface
// } from "../../../domain/repository/intefaces/arpStudio/update.user.repository.interface";
// import { ArpStudioRequestService } from "../../../../shared/application/service/arpStudio.request.service";
// import { UpdateUserDto } from "../../../domain/dtos/request/arpStudio/update.user.dto";
// import { ArpStudioRequestDto } from "../../../../shared/application/dto/arpStudio.request.dto";
// import { UserNotFoundException } from "../../../domain/exception/userNotFound.exception";
// import * as moment from "moment";

// @Injectable()
// export class UpdateUserRepository implements UpdateUserRepositoryInterface {

//   @Inject(ArpStudioRequestService)
//   public arpStudioRequestService: ArpStudioRequestService

//   constructor(
//     @InjectRepository(ArpStudioUser) private usersRepository: Repository<ArpStudioUser>,
//     ) {}

//   async update(data: UpdateUserDto): Promise<any> {
//     const user = this.arpStudioRequestService.request(new ArpStudioRequestDto({
//       method: 'POST',
//       params: data,
//       endpoint: '/user/update'
//     }));

//     const arpUser = await this.usersRepository.findOneBy({
//       username: data.username
//     });

//     if(!arpUser) {
//       throw new UserNotFoundException();
//     }

//     if(data.state === 0 || data.state === -1 || data.state === -2) {
//       arpUser.state = data.state;
//     }

//     if(data.nickname) {
//       arpUser.nickname = data.nickname;
//     }
//     arpUser.updatedAt = moment().toDate();
//     await this.usersRepository.save(arpUser);
//     return user;
//   }
// }