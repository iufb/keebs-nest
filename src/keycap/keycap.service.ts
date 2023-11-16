import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keycap, KeycapDocument } from './keycap.model';
import { Model } from 'mongoose';
import { AddKeycapDto } from './dto/add-keycap.dto';

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
}
