import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeyboardService } from './keyboard.service';
import { AddKeyboardDto } from './dto/add-keyboard.dto';
import { KEYBOARD_NOT_FOUND } from './keyboard.constant';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { FilterKeyboardDto } from './dto/filter-keyboard.dto';

@Controller('keyboard')
export class KeyboardController {
  constructor(private readonly keyboardService: KeyboardService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  addKeyboard(@Body() dto: AddKeyboardDto[]) {
    return this.keyboardService.addKeyboard(dto);
  }
  @Get()
  async getAll() {
    const keyboards = await this.keyboardService.getAllKeyboards();
    if (keyboards.length == 0) {
      throw new NotFoundException(KEYBOARD_NOT_FOUND);
    }
    return keyboards;
  }
  @Get('filters')
  async getFilters() {
    return this.keyboardService.getFilters();
  }
  @UsePipes(new ValidationPipe())
  @Post('/filter')
  async getFilteredKeyboards(@Body() filters: FilterKeyboardDto) {
    return this.keyboardService.getFilteredKeyboards(filters);
  }

  @UsePipes(IdValidationPipe)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const keyboard = await this.keyboardService.getKeyboardById(id);
    if (!keyboard) {
      throw new NotFoundException(KEYBOARD_NOT_FOUND);
    }
    return keyboard;
  }
}
