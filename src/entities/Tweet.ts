import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"tweets"})
class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Tweetname: string;

  @ManyToOne(() => User,(user) => user.tweets,{
      onDelete:'CASCADE',
  })
  public user: User

  @Column()
  userId: number;

}


export default Tweet;