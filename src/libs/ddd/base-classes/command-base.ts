import { randomUUID } from "crypto";
import { Guard } from "../../guard";

type CommandMetaData = {
    readonly userID? :string;
    readonly timeStamp? : number;

}
export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

export abstract class Command {
    readonly id:string;
    readonly metadata: CommandMetaData


    constructor(props:CommandProps<unknown>){
        if(Guard.isEmpty(props)){
            throw Error("Argument Error")        
        }else{
            this.id = props.id || randomUUID();
            this.metadata = props.metadata || {};
        }
    }
}