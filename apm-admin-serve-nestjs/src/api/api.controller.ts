import { Controller, Get, Query, Post, Body, Param, Put } from '@nestjs/common';
import { ApiService } from './api.service';
import { activities1 } from './activities1';
import { activities2 } from './activities2';
import { ApiDb } from './api.db';
import { SnapshotService } from '../snapshot/snapshot.service';

@Controller('api')
export class ApiController {
  lastActive = null;
  timestamp: number;

  constructor(
    private service: ApiService,
    private snapshotService: SnapshotService,
  ) {}

  @Get('/sessions/:id')
  async sessions(@Param() p) {
    let session = await this.snapshotService.findById(p.id);
    // session.start = session.timestamp;
    // session.lastActive = session.timestamp;
    // session.clientStartMilliseconds = session.timestamp;

    let result = {
      log: null,
      session: session,
    };

    return result;
  }

  @Get('/sessions/:id/activities')
  async activities(@Param() p, @Query() q) {
    if (q.events_timestamp !== '0') {
      return activities2;
    } else {
      const activities = await this.service.select({
        _id: 0,
        __v: 0,
      });

      return {
        activities,
        lastEventIndex: 0,
        // lastEventTimestamp: activities[activities.length - 1].timestamp,
        lastEventTimestamp: 0,
        lastLogTimestamp: 0,
      };
    }
  }

  @Put('/session/:id/server_session/:i')
  server_session() {
    return { id: '5b154cb1455b11537d0baa84' };
  }

  @Get('/sessions/:id/status')
  status(@Query() q) {
    return { isLive: false, length: 9078133 };
  }

  @Post('/session/:id/identity')
  async identity(@Body() b, @Param() p) {
    const result = await this.snapshotService.findById(p.id);
    return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
  }

  @Put('/session/:id/ping')
  ping() {
    return;
  }

  // 快照
  @Post('/session')
  async session(@Body() b) {
    this.timestamp = b.timestamp;
    const result = await this.snapshotService.add(b);
    // console.log(result)

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
      serverSessionId: result.id,
      nr: false,
    };
  }

  @Get('/settings')
  settings(@Query() q) {
    // console.log(q);
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
      session: {
        isActive: false,
        // isActive: q.session_id ? true : false,
        // sessionId: '5b0d85b42fb746c2082a38ae',
      },
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

  @Post('/session/:id/data')
  async data(
    @Param('id') session_id,
    @Body() b,
    @Query('server_session_id') server_session_id,
  ) {
    let mappings = b;
    let sessions = [];

    // 转换数据
    for (let mapping in mappings) {
      switch (mapping) {
        case 'uc':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'url_change'),
          );
          break;
        case 'mov':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'mouse_over'),
          );
          break;
        case 'mm':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'mouse_move'),
          );
          break;
        case 'mou':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'mouse_out'),
          );
          break;
        case 'la':
          this.lastActive = mappings[mapping];
          break;
      }
    }

    sessions = sessions.map((session, index) => {
      const data = {
        ...session,
        time: session.timestamp - this.timestamp,
        session_id,
      };

      this.service.add(data);

      return data;
    });

    return sessions;
  }

  proccessMappings(mappings, type) {
    return mappings.map(value => {
      return {
        ...value,
        type,
      };
    });
  }

  @Get()
  query() {
    // const db = ApiDb.session;
    // this.snapshotService.add(db)
    // return this.snapshotService.findByIdentifier();
  }

  add() {
    const { activities } = activities1;
    activities.forEach(activitie => this.service.add(activitie));
    return [];
  }
}
