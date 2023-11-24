import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keyboard, KeyboardDocument } from './keyboard.model';
import { Model, Types } from 'mongoose';
import { AddKeyboardDto } from './dto/add-keyboard.dto';
import { keyboardFilters } from './keyboard.constant';
import { FilterKeyboardDto } from './dto/filter-keyboard.dto';

@Injectable()
export class KeyboardService {
  constructor(
    @InjectModel(Keyboard.name) private keyboardModel: Model<KeyboardDocument>,
  ) {}
  async addKeyboard(addKeyboardDto: AddKeyboardDto[]) {
    return addKeyboardDto.map((keyboard) =>
      this.keyboardModel.create(keyboard),
    );
  }
  getAllKeyboards() {
    return this.keyboardModel.find().exec();
  }
  getKeyboardById(id: string) {
    return this.keyboardModel
      .findOne({
        _id: new Types.ObjectId(id),
      })
      .exec();
  }
  getFilters() {
    return keyboardFilters;
  }
  async getFilteredKeyboards(filters: FilterKeyboardDto) {
    const pipeline = filters.filters.map(({ filterSlug, value }) => {
      if (filterSlug == 'features') {
        return { [filterSlug]: { $in: value } };
      }
      return { [filterSlug]: value };
    });
    console.log(pipeline);
    const result = await this.keyboardModel
      .find(
        pipeline.length > 0
          ? {
              $or: pipeline,
            }
          : {},
      )
      .sort({ price: filters.sort })
      .exec();
    return result;
  }
}
