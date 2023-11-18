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
import { KeycapService } from './keycap.service';
import { AddKeycapDto } from './dto/add-keycap.dto';
import { KEYCAP_NOT_FOUND_ERROR } from './keycap.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

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

  @UsePipes(IdValidationPipe)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const keycap = await this.keycapService.getById(id);
    if (!keycap) {
      throw new NotFoundException(KEYCAP_NOT_FOUND_ERROR);
    }
    return keycap;
  }
}
