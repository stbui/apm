import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { ApiService } from './api.service';
import { activities } from './api.db';
import { activities2 } from './activities';

@Controller('api')
export class ApiController {
  constructor(private service: ApiService) {}

  @Get('/sessions/:id')
  sessions(@Param() p) {
    // console.log(p);
    return this.service.select();
  }

  // @Get('/sessions/5b06130e37c6da78554cc4a5')
  // indexAction(@Param() p) {
  //   return this.service.select();
  // }

  @Get('/sessions/:id/activities')
  activities(@Param() p, @Query() q) {
    // console.log(p);
    if (q.events_timestamp !== '0') {
      return activities2;
    } else {
      return activities;
    }
  }

  @Get('/sessions/:id/status')
  status(@Query() q) {
    return { isLive: false, length: 9078133 };
  }

  @Post('/session/:id/identity')
  identity() {
    return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
  }

  @Post('/session')
  session() {
    return {
      id: '5b0d85b42fb746c2082a38ae',
      mappings: {
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
      },
      serverSessionId: '5b0d85b42fb746c2082a38ad',
      nr: false,
    };
  }

  // @Get('/settings')
  settings(@Query() q) {
    return {
      website: {
        autoLogErrors: 1,
        autoStartRecording: 1,
        sensitiveInputFields: 0,
        autoLogFailedNetworkRequests: 1,
        autoLogConsoleLog: 1,
        autoLogConsoleError: 1,
        autoLogConsoleWarn: 1,
        autoLogConsoleInfo: 1,
        autoLogConsoleDebug: 1,
        maxLogMessageLength: 1000,
        storeStaticResources: 1,
        origin: null,
        sensitiveElementsSelector: '',
        shouldRecordPage: true,
      },
      session: { isActive: false },
      mappings: {
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
      },
    };
  }
}
