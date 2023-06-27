import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from 'apps/api/testData/testController';
import { Tests } from './entity/test.entity';
import { TestDataService } from './service/test.service';
import { UtilsModule } from '../utils/query.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Tests,
        ]),UtilsModule
    ],
    controllers: [TestController],
    providers: [TestDataService],
})

export class TestModule { }
