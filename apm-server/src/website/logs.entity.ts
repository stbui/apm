import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_logs')
export class LogsEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column({ nullable: false }) websiteId: string;
    @Column({ nullable: false }) sessionId: string;

    @Column({ comment: '消息' }) message: string;
    @Column({ comment: '级别' }) level: string;
    @Column() usersAffected: number;
    @Column() firstOccurrence: number;
    @Column() lastOccurrence: number;
    @Column() totalOccurrences: number;

    @Column({ nullable: true }) request: string;

    @Column() isMessageTrimmed: boolean;
    @Column({ comment: '时间' }) time: number;
}
