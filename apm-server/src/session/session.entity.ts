import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_sessions')
export class SessionEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  isLive: boolean;

  @Column()
  length: number;
}
