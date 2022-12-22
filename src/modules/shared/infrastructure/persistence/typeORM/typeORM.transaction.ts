import { DataSource } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class TypeORMTransaction implements TransactionalInterface {
  public queryRunner;

  constructor(private dataSource: DataSource) {
    this.queryRunner = dataSource.createQueryRunner();
  }

  public async begin() {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit() {
    await this.queryRunner.commitTransaction();
  }

  async release() {
    await this.queryRunner.release();
  }

  async rollback() {
    await this.queryRunner.rollbackTransaction();
  }

  async save(data: any) {
    await this.queryRunner.manager.save(data);
  }

}