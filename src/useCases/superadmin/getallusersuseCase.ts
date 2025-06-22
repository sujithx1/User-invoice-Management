import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserMap } from "../../map/usermap";
import { UserMap_type } from "../../types/types";

export class GetAllusersuseCase {
  constructor(private userrep: IUserRepository) {}

  async execute(): Promise<UserMap_type[] | []> {
    const users = await this.userrep.findAll();
    console.log(users)
    
    return users.length ? users.map((user) => UserMap(user)) : [];
  }
}
