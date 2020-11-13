import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"users"})
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

}


export default User;