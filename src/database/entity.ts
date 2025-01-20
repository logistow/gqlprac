import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
    id: number;

  @Column({ name: "Name", type: "varchar", length: "32" })
    name: string;

  @Column({ name: "Email", type: "varchar", length: "32" })
    email: string;

  @Column({ name: "Age", type: "int" })
    age: number;

  @Column({ name: "createdAt", type: "timestamp" })
    created: Date;
}
