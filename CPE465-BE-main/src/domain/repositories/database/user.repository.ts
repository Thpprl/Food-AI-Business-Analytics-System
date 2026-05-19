import { User } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class UserRepository extends IGenericRepository<User> {
    abstract getByEmail(email: string): Promise<User | null>;
}
