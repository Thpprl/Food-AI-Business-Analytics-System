export class UseCaseProxy<T> {
  constructor(private useCase: T) {}

  getUseCase(): T {
    return this.useCase;
  }
}
