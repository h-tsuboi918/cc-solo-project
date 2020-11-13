import { getRepository, Repository, DeleteResult, UpdateResult } from "typeorm";
import Tweet from "../../entities/Tweet";
import { IManager } from "../common/manager";

interface TweetInput extends Tweet {
}

class TweetManager implements IManager {
  protected tweetRepository: Repository<Tweet>;

  constructor() {
    this.tweetRepository = getRepository(Tweet);
  }

}

export default TweetManager;
