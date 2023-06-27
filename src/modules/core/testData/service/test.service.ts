import { Inject } from "@nestjs/common";
import { Request } from "express";

import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Tests } from "../entity/test.entity";
import { DataListRequest, TestDataInterface } from "../interface/test.interface";
import { CreateOperationFailedException } from "../exception/create.exception";
import { faker } from '@faker-js/faker';
import { RetreiveFailedException } from "../exception/retrive.exception";

export class TestDataService {
    constructor(
        @InjectRepository(Tests)
        private readonly repo: Repository<Tests>,
        private dataSource: DataSource,

    ) { }

    async getTestDataList(query?: DataListRequest) {
        try {
            const [result, count] = await this.repo.findAndCount({
                skip: query.attributes.offset ? query.attributes.offset : 0,
                take: query.attributes.limit ? query.attributes.limit : 25,
              });
              return { data: result, count };
        } catch (e) {
            throw new RetreiveFailedException(e, 'Game list fetch operation failed.');
        }
    }

    async createTestData(dto: TestDataInterface) {
        try {
            const insertedData = await this.saveData(dto);
            const response = this.makeResponseData(insertedData);
            return response;
        } catch (e) {
            throw new CreateOperationFailedException(e, 'Create test Data operation failed.');
        }
    }

    async getDataById(_id: number): Promise<any> {
        try {
            const userData = await this.repo.findOneBy({ "id": _id })
            if(!userData){
                throw new RetreiveFailedException('data not found')
            }
            return userData;
        } catch (e) {

            throw new RetreiveFailedException(e);

        }
    }

    makeResponseData(data) {
        return {
            name: data ? data.name : null,
            title: data ? data.title : null,
            description: data ? data.description : null,
            email: data ? data.email : null,

        }
    }



    async saveData(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const responseData = this.repo.create({
                title: this.generateRandomText(10),
                description: faker.lorem.sentence(),
                name: faker.internet.userName(),
                email: faker.internet.email(),
            });
            await queryRunner.manager.save(responseData);
            await queryRunner.commitTransaction();
            return responseData;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    generateRandomText(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

}