import { RepositoryInterface, UsecaseInterface } from '#/domain/contracts'
import { User } from '#/domain/entities'
import { UserFactory } from '#/domain/entities/factories'

export namespace CreateUser {
  export type InputDto = User.Props
  export type OutputDto = User.Model

  export class UseCase implements UsecaseInterface<InputDto, OutputDto> {
    constructor(
      private readonly userRepo: RepositoryInterface<User.Entity, User.Model>,
    ) {}

    handle(inputDto: InputDto): Promise<User.Model> {
      const user = UserFactory.create(inputDto)
      return this.userRepo.create(user)
    }
  }
}
