export interface UsecaseInterface<Input, Output> {
  handle(inputDto: Input): Promise<Output>
}
