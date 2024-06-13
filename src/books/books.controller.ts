import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '../auth/auth.guards';
import { User } from '../users/user.entity';
import { CreateBookDto } from './dto/create-books.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.createBook(createBookDto);
  }

  @UseGuards(AuthGuard)
  @Post('borrow/:id')
  async borrowBook(@Param('id') id: string, @Req() req) {
    const user: User = req.user;
    return await this.booksService.borrowBook(+id, user);
  }

  @UseGuards(AuthGuard)
  @Post('return/:id')
  async returnBook(@Param('id') id: string, @Req() req) {
    const user: User = req.user;
    return await this.booksService.returnBook(+id, user);
  }

  @UseGuards(AuthGuard)
  @Get('overdue')
  async findOverdueBooks() {
    return await this.booksService.findOverdueBooks();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<{ message: string }> {
    await this.booksService.deleteBook(id);
    return { message: 'Book deleted successfully' };
  }
}
