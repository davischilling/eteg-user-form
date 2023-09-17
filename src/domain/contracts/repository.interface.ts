export interface RepositoryInterface<Input, Output> {
  create(data: Input): Promise<Output>
}
