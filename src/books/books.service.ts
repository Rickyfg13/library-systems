import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThan, Not, Repository } from 'typeorm';
import { Book } from './book.entity';
import { User } from '../users/user.entity';
import { CreateBookDto } from './dto/create-books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['borrowedBy'] });
  }

  async borrowBook(bookId: number, user: User): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['borrowedBy'],
    });

    if (book.borrowedBy) {
      throw new Error('Buku sedang dipinjam oleh pengguna lain');
    }

    book.borrowedBy = user;
    book.borrowedAt = new Date();

    return this.booksRepository.save(book);
  }

  async returnBook(bookId: number, user: User): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['borrowedBy'],
    });

    if (book.borrowedBy.id !== user.id) {
      throw new Error('Anda tidak meminjam buku ini');
    }

    book.borrowedBy = null;
    book.borrowedAt = null;

    return this.booksRepository.save(book);
  }

  async findOverdueBooks(): Promise<Book[]> {
    const overdueBooks = await this.booksRepository.find({
      where: {
        borrowedAt: LessThan(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)), // Books borrowed more than 14 days aja
        borrowedBy: Not(IsNull()),
      },
      relations: ['borrowedBy'],
    });

    return overdueBooks;
  }

  async deleteBook(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
