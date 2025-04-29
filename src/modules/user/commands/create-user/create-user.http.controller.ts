import { Request, Response } from "express";
import { CreateUserService } from "./create-user.service";
import { Address } from "../../domain/value-objects/address.value-object";
import { injectable,inject } from "tsyringe";
import { CreateUserCommand } from "./create-user.command";
import { MCommandBus } from "../../../..";
import { UserEntity } from "../../domain/user.entity";

interface CreateUserRequestBody {
    email: string;
    password: string;
    street: string;
    postalCode: string;
    country: string;
  }
@injectable()
export class CreateUserHttpController {
    constructor(
        @inject(CreateUserService)private readonly createUserservice:CreateUserService){}

    async handle(req:Request,res:Response):Promise<void> {
        try {
            const { email, password, street, postalCode, country }:CreateUserRequestBody = req.body;
            const createUserCommand = new CreateUserCommand({
                email,
                street,
                postalCode,
                country, 
            })
             const user = await MCommandBus.execute<CreateUserCommand,UserEntity>(createUserCommand);
             res.status(201).json({
                id: user.id,
                email: user.getProps().email,
                role: user.getProps().role,
                address: user.getProps().address.unpack(), // if you want address in response
            });
                    
        } catch (error) {
            
             console.error('❌ Error creating user:', error);
             res.status(400).json({ message: (error as Error).message });
        }
    }
}