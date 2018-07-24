import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { activities1 } from './activities1';
import { activities2 } from './activities2';
import { ApiDb } from './api.db';
import { SnapshotService } from '../snapshot/snapshot.service';

@Controller('api')
export class ApiController {
  lastActive = null;
  timestamp: number;
  clientOnline: boolean = true;
  clientUnOnlineTimer: NodeJS.Timer;

  constructor(
    private service: ApiService,
    private snapshotService: SnapshotService,
  ) {}

  /**
   * 用于页面加载时渲染的数据
   */
  @Get('/sessions/:id')
  async sessions(@Param() p) {
    let session = await this.snapshotService.findById(p.id);

    let result = {
      log: null,
      session: session,
    };

    return result;
  }

  // 播放列表
  @Get('/sessions/:session_id/activities')
  async activities(@Param('session_id') session_id, @Query() q) {
    const activities = await this.service
      .where({ snaphot_id: session_id })
      .order({ _id: 1 })
      .select({ _id: 0, __v: 0 });

    return {
      activities,
      lastEventIndex: 0,
      // lastEventTimestamp: 0,
      // lastLogTimestamp: 0,
      lastEventTimestamp: activities[activities.length - 1].timestamp,
      lastLogTimestamp: q.events_timestamp,
    };
  }

  // 建立全局页面快照
  @Post('/session')
  async session(@Body() body) {
    this.timestamp = Number(body.timestamp);

    // 直接保存到数据库
    const result = await this.snapshotService.add(body);

    // 返回配置参数
    return {
      id: result.id,
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
      serverSessionId: '5b0d85b42fb746c2082a38ae',
      nr: false,
    };
  }

  // 配置字段
  @Get('/settings')
  async settings(@Query() q) {
    const result = await this.snapshotService.findById(q.session_id);

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
        isActive: result.isLive,
        sessionId: q.session_id,
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

  /**
   * 实时接收dom变化数据
   * @param id
   * @param b
   * @param server_session_id
   */
  @Post('/session/:id/data')
  async data(
    @Param('id') id,
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
        case 'dm':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'dom_mutation'),
          );
          break;
        case 'crd':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'css_rule_delete'),
          );
          break;
        case 'cri':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'css_rule_insert'),
          );
          break;
        case 'vc':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'visibility_change'),
          );
          break;
        case 'cbc':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'checkbox_change'),
          );
          break;
        case 'rbc':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'radio_button_change'),
          );
          break;
        case 'spc':
          sessions.push(
            ...this.proccessMappings(
              mappings[mapping],
              'scroll_position_change',
            ),
          );
          break;
        case 'ds':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'dom_snapshot'),
          );
          break;
        case 'wr':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'window_resize'),
          );
          break;
        case 'mc':
          sessions.push(
            ...this.proccessMappings(mappings[mapping], 'mouse_click'),
          );
          break;
        case 'evc':
          sessions.push(
            ...this.proccessMappings(
              mappings[mapping],
              'dom_element_value_change',
            ),
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
        snaphot_id: id,
        server_session_id,
      };

      this.service.add(data);

      return data;
    });

    // 将time最后一个值保存到全局快照length中
    // console.log('start', sessions[0]);
    // bug
    const size = sessions.length - 1 <= 0 ? 0 : sessions.length - 1;
    const sessionEndTime = sessions[size].time;

    // 在线状态
    if (this.clientOnline) {
      // 更新snapshot
      this.snapshotService
        .where({ _id: id })
        .update({ length: sessionEndTime, isLive: true });

      clearTimeout(this.clientUnOnlineTimer);
      this.clientUnOnlineTimer = setTimeout(() => {
        this.clientOnline = false;
        console.log('离线');
        this.snapshotService.where({ _id: id }).update({ isLive: false });
      }, 60 * 1000);
    }

    return sessions;
  }

  @Post('/session/:id/identity')
  async identity(@Body() b, @Param() p) {
    const result = await this.snapshotService.findById(p.id);
    // console.log(result.userIdentity.identifier)
    return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
  }

  // 客户端与服务端是否同时在线
  @Put('/session/:id/ping')
  ping(@Param('id') id) {
    this.clientOnline = true;
    this.snapshotService.where({ _id: id }).update({ isLive: true });
    return {};
  }

  @Put('/session/:id/server_session/:i')
  server_session() {
    return { id: '5b154cb1455b11537d0baa84' };
  }

  @Get('/sessions/:id/status')
  status(@Query() q) {
    return { isLive: false, length: 9078133 };
  }

  proccessMappings(mappings, type) {
    return mappings.map(value => {
      return {
        ...value,
        type,
      };
    });
  }

  add() {
    const { activities } = activities1;
    activities.forEach(activitie => this.service.add(activitie));
    return [];
  }
}
