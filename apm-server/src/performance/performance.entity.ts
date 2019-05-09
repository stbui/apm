import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class PerformanceEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column() name: string;
    @Column() url: string;
    @Column() pageloadtime: number;
    @Column() total_time: number;
    @Column() ttfb: number;
    @Column() connect: number;
    @Column() dom: number;
    @Column() request: number;
    @Column() response: number;
    @Column() domReady: number;
    @Column() load: number;
    @Column() tcp: number;
    @Column() dns: number;
    @Column() black_waiting_time: number;
    @Column() fist_page_time: number;
    @Column() operation_time: number;
    @Column() last_unload: number;
    @Column() redirect: number;
    @Column() cb: number;
    @Column() ct: number;
    @Column() apiKey: string;

}