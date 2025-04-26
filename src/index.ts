import "reflect-metadata";
import express, { Request, Response } from "express";
import { UserModule } from "./modules/user/user.module";
import { configService } from "./config/config";
import { bootstrapDependencies } from "./config/dependency-graph";


bootstrapDependencies();

const app = express();
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("hei");
  configService.set("logger","winston")
});

console.log(configService.get("environment"))

app.use(new UserModule().router)


app.listen(2000, () => {
  console.log("Server running on http://localhost:2000");
});


