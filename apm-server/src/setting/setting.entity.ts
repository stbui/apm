import {
  BaseEntity,
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  Generated,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SessionEntity } from '../session/session.entity';

@Entity('apm_setting')
export class SettingEntity extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: 1 })
  autoLogErrors: number;
  @Column({ default: 1 })
  autoStartRecording: number;
  @Column({ default: 0 })
  sensitiveInputFields: number;
  @Column({ default: 1 })
  autoLogFailedNetworkRequests: number;
  @Column({ default: 1 })
  autoLogConsoleLog: number;
  @Column({ default: 1 })
  autoLogConsoleError: number;
  @Column({ default: 1 })
  autoLogConsoleWarn: number;
  @Column({ default: 1 })
  autoLogConsoleInfo: number;
  @Column({ default: 1 })
  autoLogConsoleDebug: number;
  @Column({ default: 1000 })
  maxLogMessageLength: number;
  @Column({ default: 1 })
  storeStaticResources: number;
  @Column()
  origin: string;
  @Column({ default: '' })
  sensitiveElementsSelector: string;
  @Column({ default: true })
  shouldRecordPage: boolean;

  @OneToMany(type => SessionEntity, session => session.isLive)
  @JoinColumn()
  session: SessionEntity;
}
