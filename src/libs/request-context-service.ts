import { RequestContext } from "./request-context";

export class RequestContextService {
  
    static getContext() {
      return RequestContext.getContext();
    }
  
    static setRequestId(id: string): void {
      const ctx = this.getContext();
      ctx.requestId = id;
    }
  
    static getRequestId(): string {
      return this.getContext().requestId;
    }
  
    static getTransactionConnection() {
      return this.getContext().transactionConnection;
    }
  
    static setTransactionConnection(transactionConnection?: any): void {
      const ctx = this.getContext();
      ctx.transactionConnection = transactionConnection;
    }
  
    static cleanTransactionConnection(): void {
      const ctx = this.getContext();
      ctx.transactionConnection = undefined;
    }
  }
  