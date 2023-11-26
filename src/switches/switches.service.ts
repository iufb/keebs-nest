import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Switches, SwitchesDocument } from './switches.model';
import { Model, Types } from 'mongoose';
import { AddSwitchesDto } from './dto/add-switches.dto';
import { switchesFilters } from './switches.constants';
import { FilterSwitchesDto } from './dto/filter-switches.dto';

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
  getById(id: string) {
    return this.switchesModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }
  async getSwitches(params?: FilterSwitchesDto) {
    if (!params.filters && !params.sort) {
      return this.getAll();
    }
    const pipeline = params.filters.map(({ filterSlug, value }) => {
      return { [filterSlug]: value };
    });
    const result = await this.switchesModel
      .find(
        pipeline.length > 0
          ? {
              $or: pipeline,
            }
          : {},
      )
      .sort({ price: params.sort })
      .exec();
    return result;
  }
  getFilters() {
    return switchesFilters;
  }
}
