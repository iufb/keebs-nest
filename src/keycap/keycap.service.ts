import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keycap, KeycapDocument } from './keycap.model';
import { Model, Types } from 'mongoose';
import { AddKeycapDto } from './dto/add-keycap.dto';
import { FilterKeycapDto } from './dto/filter-keycap.dto';
import { keycapFilters } from './keycap.constants';

@Injectable()
export class KeycapService {
  constructor(
    @InjectModel(Keycap.name) private keycapModel: Model<KeycapDocument>,
  ) {}

  addKeycap(dto: AddKeycapDto) {
    return this.keycapModel.create(dto);
  }

  getAll() {
    return this.keycapModel.find().exec();
  }
  async getKeycaps(params?: FilterKeycapDto) {
    if (!params.filters && !params.sort) {
      return this.getAll();
    }
    const pipeline = params.filters.map(({ filterSlug, value }) => {
      return { [filterSlug]: value };
    });
    const result = await this.keycapModel
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
  getByProfile(profile: string) {
    return this.keycapModel.find(
      { compatibility: profile },
      { name: 1, price: 1 },
    );
  }
  getFilters() {
    return keycapFilters;
  }
  getById(id: string) {
    return this.keycapModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }
}
