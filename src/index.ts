import express, { Request, Response } from "express";
import { UserModule } from "./modules/user/user.module";

const app = express();
app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.send("hei");
});

app.use(new UserModule().router)


app.listen(2000, () => {
  console.log("Server running on http://localhost:2000");
});

