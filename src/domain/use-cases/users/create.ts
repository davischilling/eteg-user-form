import { UsecaseInterface } from '#/domain/contracts'
import { User } from '#/domain/entities'
import { UserFactory } from '#/domain/entities/factories'

export interface UserRepositoryInterface<Input, Output> {
  create(data: Input): Promise<Output>
}

export namespace CreateUser {
  export type InputDto = User.Props
  export type OutputDto = User.Model

  export class UseCase implements UsecaseInterface<InputDto, OutputDto> {
    constructor(
      private readonly userRepo: UserRepositoryInterface<
        User.Entity,
        User.Model
      >,
    ) {}

    handle(inputDto: InputDto): Promise<User.Model> {
      const user = UserFactory.create(inputDto)
      return this.userRepo.create(user)
    }
  }
}
