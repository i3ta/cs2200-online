import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: number;

  @Column()
  name: string;

  @Column()
  isTa: boolean;
}
