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
import { SwitchesService } from './switches.service';
import { AddSwitchesDto } from './dto/add-switches.dto';
import { SWITCHES_NOT_FOUND_ERROR } from './switches.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

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

  @UsePipes(IdValidationPipe)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const switches = await this.switchesService.getById(id);
    if (!switches) {
      throw new NotFoundException(SWITCHES_NOT_FOUND_ERROR);
    }
    return switches;
  }
}
