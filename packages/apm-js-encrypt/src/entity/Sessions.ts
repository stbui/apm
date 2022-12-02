import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sessions {
    @PrimaryGeneratedColumn()
    session_id: number;

    @Column()
    project_id: number;

    @Column({
        nullable: true,
    })
    tracker_version: string;

    @Column({
        nullable: true,
    })
    start_ts: number;

    @Column({
        nullable: true,
    })
    duration: number;

    @Column({
        nullable: true,
    })
    rev_id: string;

    @Column({
        nullable: true,
    })
    platform: string;

    @Column({
        nullable: true,
    })
    is_snippet: boolean;

    @Column({
        nullable: true,
    })
    user_id: string;

    @Column({
        nullable: true,
    })
    user_anonymous_id: string;
}
