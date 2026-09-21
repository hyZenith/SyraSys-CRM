import { Controller, All, Req, Res } from "@nestjs/common";
import { auth } from "@syracrm/auth";
import type { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";

@Controller("auth")
export class AuthController {
  private nodeHandler = toNodeHandler(auth);

  @All("*splat")
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    // NestJS/Express strips the controller prefix from req.url.
    // Better Auth needs the full original path to match its own routes.
    req.url = req.originalUrl;
    return this.nodeHandler(req, res);
  }
}
