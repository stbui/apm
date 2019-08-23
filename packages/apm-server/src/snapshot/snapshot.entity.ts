import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_snapshot')
export class SnapshotEntity extends BaseEntity {
    @ObjectIdColumn({ name: 'id' }) sid: ObjectID;
    @Column() index: number;
    @Column() serverSessionId: string;
    @Column() time: number;
    @Column() timestamp: Date;
    @Column() type: string;
    @Column() data: any;
}
