import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    const result = await this.usersRepository.find();
    return result;
  }

  public async findByEmail(email: string): Promise<User> {
    const result = await this.usersRepository.findOneBy({ email: email });
    return result;
  }

  public register(
    username: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    const result = this.usersRepository.create({
      firstName: username,
      lastName: lastname,
      email: email,
      password: password,
    });

    console.log("result----in user service",result);

    return result;
  }
}
