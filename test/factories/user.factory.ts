import { DataSource } from 'typeorm';
import { ArpStudioUser } from '../../src/modules/core/user/entity/createArpStudio.entity';


export class UserFactory {
  private connection: DataSource;

  static new(connection: DataSource) {
    return new UserFactory(connection);
  }

  constructor(connection: DataSource) {
    this.connection = connection;
  }


  async create(user: Partial<ArpStudioUser> = {}) {

    const payload = {
      username: 'karki22',
      nickname: 'test',
      open_url: 'test' ,
    };
    return this.connection.manager.save(ArpStudioUser, payload);
  }

  getByUsername() {
    return this.connection.manager.findOneBy(ArpStudioUser, { username: 'karki22' });
  }

}
