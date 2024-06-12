import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '../auth/auth.guards';
import { User } from '../users/user.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('borrow/:id')
  async borrowBook(@Param('id') id: string, @Req() req) {
    const user: User = req.user;
    return this.booksService.borrowBook(+id, user);
  }

  @UseGuards(AuthGuard)
  @Post('return/:id')
  async returnBook(@Param('id') id: string, @Req() req) {
    const user: User = req.user;
    return this.booksService.returnBook(+id, user);
  }

  @UseGuards(AuthGuard)
  @Get('overdue')
  findOverdueBooks() {
    return this.booksService.findOverdueBooks();
  }
}
