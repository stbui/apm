import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_account')
export class AccountEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() lastName: string;
    @Column() firstName: string;
    @Column() organizationName: string;
    @Column() timezoneName: string;
    @Column() email: string;
    @Column() password: string;
}
