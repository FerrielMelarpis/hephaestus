import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  purpose: string;

  @Column({ default: 'now()' })
  created_at: Date;

  @Column({ default: 'now()' })
  updated_at: Date;
}
