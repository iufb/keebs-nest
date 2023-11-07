import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }
  async getProfile(id: string) {
    return this.userModel
      .findById(id, { password: 0, refreshToken: 0, __v: 0 })
      .exec();
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
