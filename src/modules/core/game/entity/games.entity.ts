import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Games {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable:true})
    game_name: string;

    @Column({nullable:true})
    game_desc: string;

    @Column({ type: 'text', nullable: true })
    game_type: string;

    @Column({nullable:true})
    game_provider_id: number;

    @Column({ type: 'text', nullable: true })
    game_id: string;

    @Column({ type: 'text', nullable: true })
    settings: string;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}