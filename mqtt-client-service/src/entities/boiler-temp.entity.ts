import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BoilerTemp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column()
  timestamp!: Date;

  @Column("decimal", { precision: 6, scale: 2 })
  temp!: number;
}

export const BoilerTempMetaData = {
  dataColumns: ["temp"],
  primaryKey: "id",
  otherColumns: ["timestamp", "topic"],
};
