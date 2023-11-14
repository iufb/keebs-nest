import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keyboard, KeyboardDocument } from './keyboard.model';
import { Model, Types } from 'mongoose';
import { AddKeyboardDto } from './dto/add-keyboard.dto';

@Injectable()
export class KeyboardService {
  constructor(
    @InjectModel(Keyboard.name) private keyboardModel: Model<KeyboardDocument>,
  ) {}
  async addKeyboard(addKeyboardDto: AddKeyboardDto) {
    const newKeyboard = new this.keyboardModel(addKeyboardDto);
    return newKeyboard.save();
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
}
