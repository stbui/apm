import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  addProject(@Body() body) {
    const data = Object.assign(body, {
      token: 'cbf379b9df19461a949be4f54f5a4b41',
    });
    return this.projectService.add(body);
  }

  @Get(':id')
  installation(@Param() id) {
    return id;
  }
}
