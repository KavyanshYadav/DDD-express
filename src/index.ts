import "reflect-metadata";
import express, { Request, Response } from "express";
import { UserModule } from "./modules/user/user.module";
import { configService } from "./config/config";
import { bootstrapDependencies } from "./config/dependency-graph";
import { requestContextMiddleware } from "./libs/request-context-middleware";
import { RequestContext } from "./libs/request-context";
import { RequestContextService } from "./libs/request-context-service";
import { CommandBus } from "./libs/command-bus";


bootstrapDependencies();
export const MCommandBus = new CommandBus();

const app = express();
app.use(express.json())
app.use(requestContextMiddleware)
app.get("/", (req: Request, res: Response) => {
  console.log(RequestContextService.getContext())
  res.send("hei");
  configService.set("logger","winston")
});

console.log(configService.get("environment"))

app.use(new UserModule().router)


app.listen(2000, (e) => {
  console.log("Server running on http://localhost:2000");
});


