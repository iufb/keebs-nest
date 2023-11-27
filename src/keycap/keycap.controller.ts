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
import { FilterKeycapDto } from './dto/filter-keycap.dto';

@Controller('keycap')
export class KeycapController {
  constructor(private readonly keycapService: KeycapService) {}

  @UsePipes(new ValidationPipe())
  @Post('/add')
  addKeycap(@Body() dto: AddKeycapDto) {
    return this.keycapService.addKeycap(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  getKeycaps(@Body() dto: FilterKeycapDto) {
    return this.keycapService.getKeycaps(dto);
  }

  @Get('/filters')
  getFilters() {
    return this.keycapService.getFilters();
  }

  @Get('/byProfile/:profile')
  async getByProfile(@Param('profile') profile: string) {
    const keycaps = await this.keycapService.getByProfile(profile);
    if (keycaps.length == 0) {
      throw new NotFoundException(KEYCAP_NOT_FOUND_ERROR);
    }
    return keycaps;
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
