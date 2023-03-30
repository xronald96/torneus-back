import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/services/user.service';
import { createMock } from '@golevelup/ts-jest';
import { User } from '../../src/graphql/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: createMock<User>(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.getUsers()).toHaveBeenCalled();
  });
});
