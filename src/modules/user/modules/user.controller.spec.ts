import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../modules/user.controller'; // Use forward slashes for paths
import { UserService } from '../modules/user.service';

describe('ModulesUserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], // Use the actual class or token here
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
