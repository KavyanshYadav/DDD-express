import { Command, CommandProps } from "../../../../libs/ddd/base-classes/command-base";

export class CreateUserCommand extends Command{
     readonly email: string;

    readonly country: string;

    readonly postalCode: string;

    readonly street: string;
    constructor(props:CommandProps<CreateUserCommand>){
        super(props);
        this.country = props.country;
        this.email = props.email;
        this.postalCode = props.postalCode;
        this.street = props.street;
    }
}