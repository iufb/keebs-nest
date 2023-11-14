import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  USERS_NOT_FOUND,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from './user.constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isExisted = await this.userService.findByEmail(createUserDto.email);
    if (isExisted) {
      throw new HttpException(USER_ALREADY_EXISTS, 409);
    }
    return this.userService.create(createUserDto);
  }
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if (users.length == 0) {
      throw new NotFoundException(USERS_NOT_FOUND);
    }
    return users;
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async findById(@Req() req: Request) {
    const userId = req.user['sub'];
    const user = await this.userService.getProfile(userId);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessTokenGuard)
  @Patch()
  async update(id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }
}
