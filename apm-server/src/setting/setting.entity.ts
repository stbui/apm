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

    // @OneToMany(type => SessionEntity, session => session.isLive)
    // @JoinColumn()
    // session: SessionEntity;
}
