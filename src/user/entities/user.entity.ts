import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @Index({ unique: true })
  username: string;

  @Column({ nullable: true, length: 255 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  address: string;

  @Column({ nullable: true, length: 100 })
  @Index({ unique: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birthdate: string;

  @Column({ default: 1 })
  gender: number;

  @Column({ length: 1000 })
  password: string;

  @Column()
  roles: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: 0 })
  coin: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password || this.password, saltRounds);
  }
}
