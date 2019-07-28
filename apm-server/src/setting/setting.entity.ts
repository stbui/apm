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

    // @OneToMany(type => SessionEntity, session => session.isLive)
    // @JoinColumn()
    // session: SessionEntity;

    @Column() lastActive: string = 'la';
    @Column() logs: string = 'lg';
    @Column() css_rule_delete: string = 'crd';
    @Column() css_rule_insert: string = 'cri';
    @Column() url_change: string = 'uc';
    @Column() visibility_change: string = 'vc';
    @Column() checkbox_change: string = 'cbc';
    @Column() radio_button_change: string = 'rbc';
    @Column() scroll_position_change: string = 'spc';
    @Column() dom_snapshot: string = 'ds';
    @Column() window_resize: string = 'wr';
    @Column() mouse_out: string = 'mou';
    @Column() mouse_over: string = 'mov';
    @Column() mouse_click: string = 'mc';
    @Column() mouse_move: string = 'mm';
    @Column() dom_mutation: string = 'dm';
    @Column() dom_element_value_change: string = 'evc';
}
