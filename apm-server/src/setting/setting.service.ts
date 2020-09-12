import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { SettingEntity } from './setting.entity';
import { TOKEN } from './setting.constants';

@Injectable()
export class SettingService extends CrudService<SettingEntity> {
    constructor(
        @Inject(TOKEN)
        protected readonly repository: Repository<SettingEntity>,
    ) {
        super();
    }

    findMappings() {
        return {
            lastActive: 'la',
            logs: 'lg',
            css_rule_delete: 'crd',
            css_rule_insert: 'cri',
            url_change: 'uc',
            visibility_change: 'vc',
            checkbox_change: 'cbc',
            radio_button_change: 'rbc',
            scroll_position_change: 'spc',
            dom_snapshot: 'ds',
            window_resize: 'wr',
            mouse_out: 'mou',
            mouse_over: 'mov',
            mouse_click: 'mc',
            mouse_move: 'mm',
            dom_mutation: 'dm',
            dom_element_value_change: 'evc',
        };
    }
}
