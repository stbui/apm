import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class SubscriptionEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column({ default: 3 }) userSeats: number;
    @Column({ nullable: true }) nextBillingDate: Date;
    @Column({ default: 'Free Trial' }) planName: string;
    @Column({ nullable: true }) subscriptionId: number | string;
    @Column({ default: true }) isFree: boolean;
    @Column({ default: false }) hasCustomPlan: boolean;
    @Column({ default: 1000 }) monthlySessions: number;
    @Column() planEndDate: string;
}
