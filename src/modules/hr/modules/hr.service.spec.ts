import { Test, TestingModule } from '@nestjs/testing';
import { ModulesHrService } from './hr.service'; // Use forward slashes for paths

describe('ModulesHrService', () => {
  let service: ModulesHrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesHrService], // Use the actual class or token here
    }).compile();

    service = module.get<ModulesHrService>(ModulesHrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
