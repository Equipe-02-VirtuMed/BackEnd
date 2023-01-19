import { Test, TestingModule } from '@nestjs/testing';
import { HoraryService } from './horary.service';

describe('HoraryService', () => {
  let service: HoraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoraryService],
    }).compile();

    service = module.get<HoraryService>(HoraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
