import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";
import { emailTemplateService } from "./service";
import { CreateTemplateRoute } from "./routes";

export const createTemplateHandler: AppRouteHandler<
  CreateTemplateRoute
> = async (c) => {
  try {
    const data = c.req.valid("json");
    const template = await emailTemplateService.createTemplate(data);
    return c.json(template, HttpStatusCodes.CREATED);
  } catch (error) {
    return c.json(
      { message: "An error occured!" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      {}
    );
  }
};
