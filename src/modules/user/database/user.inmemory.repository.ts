import { UserEntity } from "../domain/user.entity";
import { UserRepository } from "./user.repository";

export class InMemoryUserRepository implements UserRepository{
    async save(user: UserEntity): Promise<void> {
        await new Promise((res)=>{
            return setTimeout(res,1000)
        })
         console.log('📦 User saved (fake):', {
      id: user.id,
      ...user.getProps(),
    });
    }
}