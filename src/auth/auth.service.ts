import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from 'src/user/user.constants';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ACCESS_DENIED, WRONG_PASSWORD } from './auth.constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.userService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }
    const passwordHash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: passwordHash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(authDto: AuthDto) {
    const { userId, email } = await this.validateUser(
      authDto.email,
      authDto.password,
    );
    const tokens = await this.getTokens(userId, email);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }
  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null });
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }
    return { userId: user._id, email };
  }
  async hashData(data: string) {
    const salt = await genSalt(10);
    return hash(data, salt);
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '10m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(ACCESS_DENIED);
    }
    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException(ACCESS_DENIED);
    const tokens = await this.getTokens(userId, user.email);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens.accessToken;
  }
}
