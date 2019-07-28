import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_sessions')
export class SessionEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column({ comment: '浏览器名称' }) browserName: string;
    @Column({ comment: '浏览器版本' }) browserVersion: string;
    @Column({ comment: '文档类型' }) docType: string;
    @Column({ comment: '引擎' }) layoutName: string;
    @Column({ comment: '生产商' }) manufacturer: string;
    @Column({ comment: '访问链接' }) origin: string;
    @Column({ comment: '系统' }) os: string;
    @Column({ comment: '访问页面' }) pageUrl: string;
    @Column({ comment: '产品' }) product: string;
    @Column({ comment: '来源' }) referrer: string;
    @Column({ comment: '宽度' }) screenWidth: number;
    @Column({ comment: '高度' }) screenHeight: number;
    @Column({ comment: '时间戳' }) timestamp: number;
    //
    // @Column({ comment: '文档快照' }) snapshot: Object;
    @Column() left: number;
    @Column() top: number;
    @Column() sensitiveInputFields: boolean;
    @Column() version: string;
    @Column() visibilityState: string;
    @Column() hostname: string;
    // server更新
    @Column({ comment: '开始时间' }) start: number;
    @Column({ comment: '结束时间' }) lastActive: number;
    @Column({ comment: '国家' }) country: string;
    @Column({ comment: '城市' }) city: string;
    @Column() clientStartMilliseconds: number;
    @Column() hasInaccessibleResources: string;
    @Column() ip: string;
    @Column() isLive: boolean = false;
    @Column() isWatched: boolean = true;
    @Column({ comment: '时长' }) length: number;
    // 关联用户
    @Column() userIdentity: Object;
    // @Column() userIdentity: any = {
    //     displayName: 'stbui',
    //     email: 'stbui',
    //     identifier: '123',
    //     customFields: [
    //         {
    //             value: '899元/月',
    //             key: 'pricingPlan',
    //         },
    //         {
    //             value: 'user',
    //             key: 'role',
    //         },
    //         {
    //             value: 'True',
    //             key: 'subscribedToEmail',
    //         },
    //     ],
    // };
}
