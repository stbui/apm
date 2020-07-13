import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SettingService } from './setting.service';
import { SettingEntity } from './setting.entity';

@ApiTags('setting')
@Controller('setting')
export class SettingController extends CrudController<SettingEntity> {
    constructor(protected service: SettingService) {
        super();
    }

    // /**
    //  *
    //  * @param q
    //  */
    // @Get()
    // async setting(@Query() q) {
    //   return {
    //     website: {
    //       autoLogErrors: 1,
    //       autoStartRecording: 1,
    //       sensitiveInputFields: 0,
    //       autoLogFailedNetworkRequests: 1,
    //       autoLogConsoleLog: 1,
    //       autoLogConsoleError: 1,
    //       autoLogConsoleWarn: 1,
    //       autoLogConsoleInfo: 1,
    //       autoLogConsoleDebug: 1,
    //       maxLogMessageLength: 1000,
    //       storeStaticResources: 1,
    //       origin: null,
    //       sensitiveElementsSelector: '',
    //       shouldRecordPage: true,
    //     },
    //     session: {
    //       isActive: false,
    //       sessionId: q.session_id,
    //     },
    //     mappings: {
    //       lastActive: 'la',
    //       logs: 'lg',
    //       css_rule_delete: 'crd',
    //       css_rule_insert: 'cri',
    //       url_change: 'uc',
    //       visibility_change: 'vc',
    //       checkbox_change: 'cbc',
    //       radio_button_change: 'rbc',
    //       scroll_position_change: 'spc',
    //       dom_snapshot: 'ds',
    //       window_resize: 'wr',
    //       mouse_out: 'mou',
    //       mouse_over: 'mov',
    //       mouse_click: 'mc',
    //       mouse_move: 'mm',
    //       dom_mutation: 'dm',
    //       dom_element_value_change: 'evc',
    //     },
    //   };
    // }
}
