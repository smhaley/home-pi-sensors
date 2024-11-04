import { Entity, Column } from "typeorm";

@Entity()
export class UiSettings {
  @Column({ primary: true })
  id: string;

  @Column("json")
  settings: Record<string, boolean>;

  constructor(settings: Record<string, boolean>) {
    this.id = "1";
    this.settings = settings;
  }
}
