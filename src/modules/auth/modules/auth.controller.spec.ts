import { Test, TestingModule } from '@nestjs/testing';
import { ModulesAuthController } from './auth.controller'; // Use forward slashes for paths
import { ModulesAuthService } from './auth.service';

describe('ModulesAuthController', () => {
  let controller: ModulesAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesAuthController], // Use the actual class or token here
      providers: [ModulesAuthService],
    }).compile();

    controller = module.get<ModulesAuthController>(ModulesAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
