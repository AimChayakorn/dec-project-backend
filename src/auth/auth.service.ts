import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const a = await this.usersService.createUser(username, email, password);
    return { ret: 'Success' };
  }
}
