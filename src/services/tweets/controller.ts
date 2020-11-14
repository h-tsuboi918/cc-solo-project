import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import TweetManager from "./manager";
import UserManager from "../users/manager"
import BaseController from "../common/controller";
import User from "entities/User";

class TweetController extends BaseController {
  public path: string = "/api";
  public router: Router;

  protected manager: TweetManager;
  protected userManager: UserManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new TweetManager();
    this.userManager = new UserManager();
  }

  /**
   * Using a factory method here
   */
  protected createRouter(): Router {
    const router = Router();
    router.get("/tweets", this.getAll);
    router.get("/users/:userId/tweets", this.getAllByUser);
    router.get("/users/:userId/tweets/:id", this.get);
    router.post("/users/:userId/tweets", this.post);
    router.patch("/users/:userId/tweets/:id", this.patch);
    router.delete("/users/:userId/tweets/:id", this.delete);
    return router;
  }

  protected getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tweets = await this.manager.getAllTweet();
      if (!tweets) {
        return res.status(404).send({ error: "tweet not found" });
      }
      res.json(tweets);
    } catch (err) {
      next(err);
    }
  }

  protected getAllByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userManager.getUser(req.params.userId);
      if (!user) {
        return res.status(404).send({ error: "user not found" });
      }
      const tweets = await this.manager.getAllTweetByUser(user.id);
      if (!tweets) {
        return res.status(404).send({ error: "tweet not found" });
      }
      res.status(200).json(tweets);
    } catch (err) {
      next(err);
    }
  };

  protected get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tweet = await this.manager.get(req.params.id);
      if (!tweet || tweet.userId !== req.params.userId) {
        return res.status(404).send({ error: "tweet not found" });
      }
      res.status(200).json(tweet);
    } catch (err) {
      next(err);
    }
  }

  protected post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tweet = await this.manager.createTweet(req.params.userId, req.body);
      if (!tweet) {
        return res.status(500).end();
      } else {
        return res.status(201).json(tweet);
      }
    } catch (err) {
      next(err);
    }
  }

  protected patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const check = await this.manager.get(req.params.id);
      if (check.userId !== req.params.userId) {
        return res.status(404).end();
      }
      const tweet = await this.manager.updateTweet(req.params.id, req.body);
      if (!tweet) {
        return res.status(500).end();
      }
      res.status(200).json(tweet);
    } catch (err) {
      next(err);
    }
  }

  protected delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const check = await this.manager.get(req.params.id);
      if (check.userId !== req.params.userId) {
        return res.status(404).end();
      }
      await this.manager.deleteTweet(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

export default TweetController;
