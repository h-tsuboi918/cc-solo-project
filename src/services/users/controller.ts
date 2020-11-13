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
    router.get("/",this.getAll);

    return router;
  }

  protected getAll = async (req: Request,res :Response, next: NextFunction):Promise<void> => {
      try{
          const users = await this.manager.getAllUser();
          if(!users) {
            res.status(404).send({error:"user not found"});
          }
          res.json(users);
      }catch(err){
          next(err);
      }
  }

}

export default UserController;
