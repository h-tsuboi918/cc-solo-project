import { getRepository, Repository, DeleteResult, UpdateResult } from "typeorm";
import User from "../../entities/User";
import { IManager } from "../common/manager";

interface UserInput extends User {
  password: string;
}

class UserManager implements IManager {
  protected userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async getAllUser(): Promise<User[]> {
    return this.userRepository.createQueryBuilder("user").getMany();
  }

}

export default UserManager;
