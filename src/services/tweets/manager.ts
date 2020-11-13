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
  public async getAllTweet(userId: string): Promise<Tweet[]> {
    return this.tweetRepository.find({ userId: userId });
  }

  public async get(id: string): Promise<Tweet> {
    return this.tweetRepository.findOne(id);
  }

  public async createTweet(userId: string, inputTweet: Partial<Tweet>): Promise<Tweet> {
    inputTweet.userId = userId;
    return this.tweetRepository.save(inputTweet);
  }

  public async updateTweet(tweetId: string, inputTweet: Partial<Tweet>): Promise<Tweet> {
    await this.tweetRepository.update(tweetId, inputTweet);
    return this.tweetRepository.findOne(tweetId);
  }

  public async deleteTweet(tweetId: string): Promise<void> {
    const tweet = await this.tweetRepository.findOne(tweetId);
    await this.tweetRepository.remove(tweet);
  }
}

export default TweetManager;
