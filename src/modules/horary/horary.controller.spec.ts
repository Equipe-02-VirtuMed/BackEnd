import { Test, TestingModule } from '@nestjs/testing';
import { HoraryController } from './horary.controller';
import { HoraryService } from './horary.service';

describe('HoraryController', () => {
  let controller: HoraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoraryController],
      providers: [HoraryService],
    }).compile();

    controller = module.get<HoraryController>(HoraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
