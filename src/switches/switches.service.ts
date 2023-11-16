import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Switches, SwitchesDocument } from './switches.model';
import { Model } from 'mongoose';
import { AddSwitchesDto } from './dto/add-switches.dto';

@Injectable()
export class SwitchesService {
  constructor(
    @InjectModel(Switches.name) private switchesModel: Model<SwitchesDocument>,
  ) {}

  addSwitches(dto: AddSwitchesDto) {
    return this.switchesModel.create(dto);
  }
  getAll() {
    return this.switchesModel.find().exec();
  }
}
