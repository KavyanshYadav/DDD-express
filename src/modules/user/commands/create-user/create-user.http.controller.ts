import { Request, Response } from "express";
import { CreateUserService } from "./create-user.service";
import { Address } from "../../domain/value-objects/address.value-object";

interface CreateUserRequestBody {
    email: string;
    password: string;
    street: string;
    postalCode: string;
    country: string;
  }

export class CreateUserHttpController {
    constructor(private readonly createUserservice:CreateUserService){}

    async handle(req:Request,res:Response):Promise<void> {
        try {
            const { email, password, street, postalCode, country } = req.body;
            
             const user = await this.createUserservice.execute({
                    email,
                    address : new Address({
                        street,postalCode,country
                    })
                });
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