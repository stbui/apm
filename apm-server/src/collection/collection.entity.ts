import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class CollectionEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column() name: string;
    @Column() domain: string;
    @Column() type: string;
    @Column() method: string;
    @Column() url: string;
    @Column() apiKey: string;
}