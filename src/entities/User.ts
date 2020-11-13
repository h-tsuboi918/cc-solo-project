import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Tweet from "./Tweet";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  public tweets: Tweet[];
}

export default User;
