import express,{Application} from "express";

import BaseController from "./services/common/controller";
import UserController from "./services/users/controller";
import TweetController from "./services/tweets/controller";

class App {
  /* Constants, default config */
  public static readonly DEFAULT_PORT: number = 9000;
    public readonly app: Application;
    public readonly port: number;
    protected postStartHook: () => void;
    constructor({port}){
        this.app = express();
        this.port = port || App.DEFAULT_PORT;

        this.registerServices([
            new UserController(),
            new TweetController()
        ]);
        this.postStartHook = () => {
            console.log(`App listening on localhost:${this.port}`);
          };
        }

  protected registerServices(services: BaseController[]): void {
    services.forEach((_service) => this.app.use(_service.path, _service.router));
  }
}

export function setupServer(){
    return new App({port:5000});
}

export default App;