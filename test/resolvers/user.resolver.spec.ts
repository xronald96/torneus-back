import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../src/dto/user.dto';
import { UserResolver } from '../../src/graphql/resolvers/user.resolver';
import { UserService } from '../../src/services/user.service';
import { Sex, UserType } from '../../src/types/user.type';

const mockUser: UserType = {
  _id: '6412f7f9d8212bfb01357ea8',
  name: 'Pedro',
  surname: 'Veliz',
  email: 'ronaxdld881996@gmail.com',
  phone: '654119299',
  sex: Sex.male,
  password: '$2b$10$a47/dJBI0ueWiKR00wPzNO71ZDCQLssOoup09nh1.bMix3KSV4fza',
  city: 'Madrid',
  country: 'Spain',
  birthday: '08/05/1996',
  creationDate: '2023-03-16T11:05:29.348Z',
};

const userServiceMock = {
  getUsers: jest.fn((): UserType[] => [mockUser]),
  getUserById: jest.fn((id: string): UserType => mockUser),
  createUser: jest.fn((createUserDto: CreateUserDto): UserType => mockUser),
};
describe('User resolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all users', () => {
    const result = resolver.getUsers();
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should query by id', async () => {
    const result = await resolver.getUserById(mockUser._id);
    expect(result._id).toEqual(mockUser._id);
  });

  it('should mutation create user', async () => {
    const result = await resolver.createUser(mockUser);
    expect(result._id).toEqual(mockUser._id);
  });
});
