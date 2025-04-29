import { AsyncLocalStorage } from "async_hooks";

export type  RequestContextType = {
    requestId : string;
    transactionConnection ? : any;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContextType>;

export class RequestContext {


    static run(context:RequestContextType , callback : () => void){
        asyncLocalStorage.run(context,callback)
    }

    static getContext(): RequestContextType {
    const store = asyncLocalStorage.getStore();
    if (!store) {
      throw new Error('No request context available');
    }
    return store;
  }

  static setContext(context: RequestContextType) {
    asyncLocalStorage.enterWith(context);
  }
}
