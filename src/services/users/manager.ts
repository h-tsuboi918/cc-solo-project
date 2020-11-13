import { getRepository, Repository, DeleteResult, UpdateResult } from "typeorm";
import User from "../../entities/User";
import { IManager } from "../common/manager";

class UserManager implements IManager {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async createUser(inputUser: Partial<User>): Promise<User> {
    return this.userRepository.save(inputUser);
  }

  public async updateUser(id: string, inputUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, inputUser);
    return this.userRepository.findOne(id);
  }

  public async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
  }
}

export default UserManager;
