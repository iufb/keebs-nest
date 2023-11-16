import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeycapService } from './keycap.service';
import { AddKeycapDto } from './dto/add-keycap.dto';

@Controller('keycap')
export class KeycapController {
  constructor(private readonly keycapService: KeycapService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  addKeycap(@Body() dto: AddKeycapDto) {
    return this.keycapService.addKeycap(dto);
  }
  @Get()
  getAll() {
    return this.keycapService.getAll();
  }
}
