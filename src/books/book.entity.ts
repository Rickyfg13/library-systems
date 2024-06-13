import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @ManyToOne(() => User, (user) => user.borrowedBooks, { nullable: true })
  borrowedBy?: User;

  @Column({ type: 'timestamp', nullable: true })
  borrowedAt?: Date;
}
