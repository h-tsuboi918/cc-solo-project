import { Router, Request, Response, NextFunction } from "express";
import _ from "lodash";
import UserManager from "./manager";
import BaseController from "../common/controller";
import User from "../../entities/User";

/**
 * FIXME
 * Advance requirements:
 * - All request handlers should verify if
 *   the authenticated user is authorized to
 *   perform operations on the specified User object
 */
class UserController extends BaseController {
  public path: string = "/api/users";
  public router: Router;

  protected manager: UserManager;

  constructor() {
    super();
    this.router = this.createRouter();
    this.manager = new UserManager();
  }

  protected createRouter(): Router {
    const router = Router();
    router.get("/", this.getAll);
    router.get("/:id", this.get);
    router.post("/", this.post);
    router.patch("/:id", this.patch);
    router.delete("/:id", this.delete);
    return router;
  }

  protected getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.manager.getAllUser();
      if (!users) {
        res.status(404).send({ error: "user not found" });
      }
      res.json(users);
    } catch (err) {
      next(err);
    }
  };

  protected get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.manager.getUser(req.params.id);
      if (!user) {
        res.status(404).end();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  };

  protected post = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.manager.createUser(req.body);
      if (!user) {
        res.status(500).end();
      } else {
        res.status(201).json(user);
      }
    } catch (err) {
      next(err);
    }
  };

  protected patch = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.manager.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(500).end();
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      next(err);
    }
  };

  protected delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await this.manager.deleteUser(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
