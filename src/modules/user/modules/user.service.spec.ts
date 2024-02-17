import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service'; // Use forward slashes for paths

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService], // Use the actual class or token here
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
