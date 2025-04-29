import { NextFunction, Request, Response } from "express";
import { RequestContext, RequestContextType } from "./request-context";
import { randomUUID } from "crypto";

export function requestContextMiddleware(req:Request,res:Response,next:NextFunction){
    const context:RequestContextType = {
        requestId : randomUUID(),
        transactionConnection :undefined,
    }
    RequestContext.run(context,()=>{
        console.log("Context")
        next();
    })
}