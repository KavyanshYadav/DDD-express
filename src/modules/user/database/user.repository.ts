import { UserEntity } from "../domain/user.entity";

export abstract class UserRepository {
    abstract save(user:UserEntity) : Promise<void>;
   // abstract update(user:UserEntity) : Promise<void>;
}