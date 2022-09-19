import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { UserEntity } from '../entity/User';

export class UserController {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getByChatId(chatId: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ chatId });
  }

  async add(chatId: string): Promise<UserEntity> {
    let user = await this.getByChatId(chatId);
    if (user) return Promise.reject('user already exists')

    user = this.userRepository.create({ chatId });
    return await this.userRepository.save(user);
  }

  async remove(chatId: string): Promise<UserEntity> {
    const user = await this.getByChatId(chatId);
    if (!user) return Promise.reject('user not found')
    return await this.userRepository.remove(user)
  }
}
