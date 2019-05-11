import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CrudController } from '../common/crud/crud.controller';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@ApiUseTags('session')
@Controller('session')
export class SessionController extends CrudController<SessionEntity> {
  lastActive = null;
  private timestamp: number;
  clientOnline: boolean = true;
  clientUnOnlineTimer: NodeJS.Timer;

  constructor(protected service: SessionService) {
    super();
  }

  // 建立全局页面快照
  @Post()
  async session(@Body() body) {
    console.log('timestamp =>', body.timestamp, typeof body.timestamp);
    this.timestamp = Number(body.timestamp);

    const result = await this.service.create(body);

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

  /**
   * 用于页面加载时渲染的数据
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  async sessions(@Param('id') id) {
    console.log(':id', id);
    let session = await this.service.findOneById(id);

    let result = {
      log: null,
      session: session,
    };

    return result;
  }

  @Post(':id/identity')
  async identity(@Body() b, @Param() p) {
    const result = await this.service.findOneById(p.id);
    // console.log(result.userIdentity.identifier)
    return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
  }

  /**
   * 播放列表
   * @param session_id
   * @param q
   */
  @Get(':id/activities')
  async activities(@Param('id') id: any, @Query() q: any) {
    const model = await this.service.findOneById(id);

    // return {
    //   activities: model,
    //   lastEventIndex: 0,
    //   // lastEventTimestamp: 0,
    //   // lastLogTimestamp: 0,
    //   lastEventTimestamp: model[model.length - 1].timestamp,
    //   lastLogTimestamp: q.events_timestamp,
    // };

    return model;
  }

  /**
   * 实时接收dom变化数据
   * @param id
   * @param b
   * @param server_session_id
   */
  @Post(':id/data')
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
          // this.lastActive = mappings[mapping];
          break;
      }
    }

    sessions = sessions.map((session, index) => {
      const data = {
        ...session,
        // time: session.timestamp - this.timestamp,
        snaphot_id: id,
        server_session_id,
      };

      this.service.create(data);

      return data;
    });
  }

  // 客户端与服务端是否同时在线
  @Put(':id/ping')
  @Patch(':id/ping')
  ping(@Param('id') id) {
    this.clientOnline = true;
    this.service.update({ isLive: true });
    return {};
  }

  @Patch(':id/server_session/:i')
  server_session(@Param('id') id) {
    return { id: '5b154cb1455b11537d0baa84' };
  }

  @Get(':id/status')
  async status(@Param('id') id) {
    const result = await this.service.findOneById(id);
    const { isLive, length } = result;
    return { isLive, length };
  }

  private proccessMappings(mappings, type) {
    return mappings.map(value => {
      return {
        ...value,
        type,
      };
    });
  }
}
