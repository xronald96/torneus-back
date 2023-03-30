import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../graphql/schemas/user.schema';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      creationDate: new Date().toISOString(),
    });
    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === 11000)
        throw new ConflictException('Email already exists');
      throw new InternalServerErrorException();
    }
  }
}
