import { Test, TestingModule } from '@nestjs/testing';
import { ModulesAuthService } from './auth.service'; // Use forward slashes for paths

describe('ModulesAuthService', () => {
  let service: ModulesAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesAuthService], // Use the actual class or token here
    }).compile();

    service = module.get<ModulesAuthService>(ModulesAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
