import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_website')
export class WebsiteEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() name: string;
    @Column() inactiveFor: number;
    @Column({ comment: '站点拥有者' }) isOwner: boolean = true;
    @Column({ comment: 'session使用总数' }) sessionsCount: number;

    @Column({ comment: '报告' }) isSubscribeForReportsEnabled: boolean;
    @Column({ comment: '报告' }) isSubscribedForReports: boolean;
    @Column({ comment: '告警通知状态' }) isSubscribedForAlerts: boolean;

    @Column({ comment: '分配使用量' }) sessionsLimitForPlan: number;
    @Column({ comment: '当前使用量' }) sessionsCountForCurrentPeriod: number;

    @Column({ comment: '' }) isMaxLogMessageLengthEnabled: boolean;
    @Column({ comment: '' }) isOriginEnabled: boolean;

    @Column() autoLogErrors: boolean = true;
    @Column() autoLogNetworkRequests: string = 'all';
    @Column() autoLogConsoleDebug: boolean = true;
    @Column() autoLogConsoleError: boolean = true;
    @Column() autoLogConsoleInfo: boolean = true;
    @Column() autoLogConsoleLog: boolean = true;
    @Column() autoLogConsoleWarn: boolean = true;
    @Column() recordLocation: boolean = true;
    @Column() recordIp: boolean = true;
    @Column() sensitiveElements = [];
    @Column() sensitiveInputFields: boolean = false;
    @Column() storeStaticResources: boolean = true;
    @Column() maxLogMessageLength: number = 1000;
    @Column() origin: string;
    @Column() ownerEmail: string;

    // data =  {
    //     access_tokens:string
    //     id:string
    //     isOwner
    //     name
    // }
    // @Column() data: Object;

    @Column() access_tokens: string;
}
