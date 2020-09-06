import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_website')
export class WebsiteEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() name: string;
    @Column() inactiveFor: number;
    @Column() isOwner: boolean = true;
    @Column() sessionsCount: number;

    // @Column() autoLogConsoleDebug: boolean = true;
    // @Column() autoLogConsoleError: boolean = true;
    // @Column() autoLogConsoleInfo: boolean = true;
    // @Column() autoLogConsoleLog: boolean = true;
    // @Column() autoLogConsoleWarn: boolean = true;
    // @Column() autoLogErrors: boolean = true;
    // @Column() autoLogNetworkRequests: string = 'all';
    // @Column() maxLogMessageLength: number = 1000;
    // @Column() origin: string;
    // @Column() ownerEmail: string;
    // @Column() recordIp: boolean = true;
    // @Column() recordLocation: boolean = true;
    // @Column() sensitiveElements = [];
    // @Column() sensitiveInputFields: boolean = false;
    // @Column() storeStaticResources: boolean = true;

    //
    @Column() access_tokens: string;
}
