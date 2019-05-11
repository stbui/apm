import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_snapshot')
export class SnapshotEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  browserName: string;
  @Column()
  browserVersion: string;
  // city: string
  @Column()
  clientStartMilliseconds: number;
  // country: string
  @Column()
  docType: string;
  // hasInaccessibleResources: string
  // id: string
  @Column()
  ip: string;
  @Column()
  isLive: {
    type: boolean;
    default: false;
  };
  // isWatched: boolean
  @Column()
  lastActive: number;
  @Column()
  layoutName: string;
  @Column()
  left: number;
  @Column()
  length: number;
  @Column()
  manufacturer: string;
  @Column()
  origin: string;
  @Column()
  os: string;
  @Column()
  pageUrl: string;
  @Column()
  product: string;
  @Column()
  referrer: string;
  @Column()
  screenHeight: number;
  @Column()
  screenWidth: number;
  @Column()
  sensitiveInputFields: boolean;
  @Column()
  snapshot: Object;
  @Column()
  timestamp: number;
  @Column()
  start: number;
  @Column()
  top: number;
  @Column()
  userIdentity: Object;
  @Column()
  version: string;
  @Column()
  visibilityState: string;
}
