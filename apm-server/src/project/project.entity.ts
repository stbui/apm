import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class ProjectEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() name: string;
    @Column() isOwner: boolean = true;
    @Column() isSubscribeForReportsEnabled: boolean = true;
    @Column() isSubscribedForAlerts: boolean = true;
    @Column() isSubscribedForReports: boolean = true;
}
