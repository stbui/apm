import { Controller } from '@nestjs/common';

@Controller('snapshot')
export class SnapshotController {
  indexAction() {
      console.log('snapshot')
  }

  updateAction() {}
}
