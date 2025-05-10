import { UserInterface } from "../interfaces";
import { UserRepository } from "../repositories";

export class UsersService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async findOne({ email }: { email: string }): Promise<UserInterface> {
    return this.repository.findOne({
      where: {
        email: email,
      },
    });
  }
}
