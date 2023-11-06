import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UpstairsEnv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column()
  timestamp!: Date;

  @Column("decimal", { precision: 6, scale: 2 })
  temp!: number;

  @Column("decimal", { precision: 6, scale: 2 })
  pressure!: number;

  @Column("decimal", { precision: 6, scale: 2 })
  humidity!: number;
}

export const UpstairsEnvMetaData = {
  dataColumns: ["temp", "pressure", "humidity"],
  primaryKey: "id",
  otherColumns: ["timestamp", "topic"],
};
