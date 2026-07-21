import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
  @Get()
  @UseGuards(RolesGuard)  @Roles(UserRole.ADMIN)
  getAdminDashboard() {
    return {
      message: 'Welcome Admin!',
    };
  }
}