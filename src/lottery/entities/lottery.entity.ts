import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique('result_date_type', ['date', 'type'])
export class Lottery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'json' })
  result: string;

  @Column({ type: 'tinyint' })
  type: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()'
  })
  updated: string;
}
