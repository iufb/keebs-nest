import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SwitchesService } from './switches.service';
import { AddSwitchesDto } from './dto/add-switches.dto';

@Controller('switches')
export class SwitchesController {
  constructor(private readonly switchesService: SwitchesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  addSwitches(@Body() dto: AddSwitchesDto) {
    return this.switchesService.addSwitches(dto);
  }
  @Get()
  getAll() {
    return this.switchesService.getAll();
  }
}
