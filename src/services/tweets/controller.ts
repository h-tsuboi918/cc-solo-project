import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import TweetManager from "./manager";
import BaseController from "../common/controller";

class TweetController extends BaseController {
  public path: string = "/Tweets";
  public router: Router;

  protected manager: TweetManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new TweetManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();

    return router;
  }

}

export default TweetController;
