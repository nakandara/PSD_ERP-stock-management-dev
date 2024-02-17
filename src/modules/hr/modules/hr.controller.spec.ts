import { Test, TestingModule } from '@nestjs/testing';
import { ModulesHrController } from '../modules/hr.controller'; // Use forward slashes for paths
import { ModulesHrService } from '../modules/hr.service';

describe('ModulesHrController', () => {
  let controller: ModulesHrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesHrController], // Use the actual class or token here
      providers: [ModulesHrService],
    }).compile();

    controller = module.get<ModulesHrController>(ModulesHrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
