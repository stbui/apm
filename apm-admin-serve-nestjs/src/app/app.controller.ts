import { Controller, Get, Post, Body, Param, Query, Req, Res } from '@nestjs/common';
import { ScriptService } from './script/script.service';

import { readFileSync, readdirSync } from 'fs';

@Controller()
export class AppController {

    constructor(private scriptService: ScriptService) {

    }

    @Post()
    postAction( @Body() b) {
        return this.scriptService.add(b);
    }

    @Get('/apm.js')
    apmAction( @Res() res) {
        res.set('Content-Type', 'text/javascript');
        const rootPath = process.cwd();
        const file = `${rootPath}/static/raven.js`;
        const content = readFileSync(file, 'utf8');
        res.send(content);
    }
}
