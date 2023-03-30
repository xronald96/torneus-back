import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { AuthCredentialsDto, JwtPayload } from 'src/dto/auth.dto';
import { User, UserDocument } from 'src/graphql/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(authCrendetialsDto: AuthCredentialsDto): Promise<JwtPayload> {
    const { email, password } = authCrendetialsDto;
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new NotFoundException('User not found');
    if (!compare(password, findUser.password))
      throw new BadRequestException('Invalid credentials');
    const token = await this.jwtService.sign({
      id: findUser.id,
      email: findUser.email,
    });

    return {
      user: findUser,
      token,
    };
  }
}
