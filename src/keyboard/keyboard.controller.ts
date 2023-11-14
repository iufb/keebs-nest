import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeyboardService } from './keyboard.service';
import { AddKeyboardDto } from './dto/add-keyboard.dto';
import { KEYBOARD_NOT_FOUND } from './keyboard.constant';

@Controller('keyboard')
export class KeyboardController {
  constructor(private readonly keyboardService: KeyboardService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  addKeyboard(@Body() dto: AddKeyboardDto) {
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
  @Get(':id')
  async getById(@Param('id') id: string) {
    const keyboard = await this.keyboardService.getKeyboardById(id);
    if (!keyboard) {
      throw new NotFoundException(KEYBOARD_NOT_FOUND);
    }
    return keyboard;
  }
}
