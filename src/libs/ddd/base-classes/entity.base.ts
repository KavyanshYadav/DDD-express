import { AggregateID } from "./types/aggregate-id.type";

export interface CreateEnitityProsp<T> {
    id:AggregateID,
    props : T,
    createdAt? :Date,
    updatedAt? : Date
}


export abstract class  EntityBase<Props> {
    protected readonly _id: AggregateID;
     protected readonly props: Props;
    constructor(
        {id,props} : CreateEnitityProsp<Props>
    ){
        this._id = id;
        this.props = props;
    }

    getProps(): Props{
        return this.props;
    }
}