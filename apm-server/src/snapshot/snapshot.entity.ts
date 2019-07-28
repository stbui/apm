import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_snapshot')
export class SnapshotEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column({ comment: '浏览器名称' }) browserName: string;
    @Column({ comment: '浏览器版本' }) browserVersion: string;
    @Column({ comment: '浏览器名称' }) docType: string;
    @Column({ comment: '文档类型' }) layoutName: string;
    @Column({ comment: '生产商' }) manufacturer: string;
    @Column({ comment: '访问链接' }) origin: string;
    @Column({ comment: '系统' }) os: string;
    @Column({ comment: '访问页面' }) pageUrl: string;
    @Column({ comment: '产品' }) product: string;
    @Column({ comment: '来源' }) referrer: string;
    @Column({ comment: '宽度' }) screenWidth: number;
    @Column({ comment: '高度' }) screenHeight: number;
    @Column({ comment: '时间戳' }) timestamp: number;
    @Column({ comment: '文档快照' }) snapshot: Object;
    @Column() left: number;
    @Column() top: number;
    @Column() sensitiveInputFields: boolean;
    @Column() version: string;
    @Column() visibilityState: string;
    @Column() hostname: string;
    // server field
    @Column() userIdentity: Object;
    @Column() start: number;
    @Column() lastActive: number;
    @Column() city: string;
    @Column() country: string;
    @Column() clientStartMilliseconds: number;
    // hasInaccessibleResources: string
    @Column() ip: string;
    @Column()
    isLive: {
        type: boolean;
        default: false;
    };
    // isWatched: boolean
    @Column() length: number;
}
