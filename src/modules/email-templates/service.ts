import * as HttpStatusCodes from "stoker/http-status-codes";

import type { NewTemplate, Template } from "@/db/schema/email_template";

import db from "@/db";
import { emailTemplate } from "@/db/schema/email_template";
import { AppError } from "@/utils/error";
import { eq } from "drizzle-orm"; // Adjust the import path if your ORM is different

// creating a template
export const emailTemplateService = {
  async createTemplate(data: NewTemplate): Promise<Template> {
    try {
      const emailtemplate = await db
        .insert(emailTemplate)
        .values(data)
        .returning();
      return emailtemplate[0];
    } catch (error) {
      throw new AppError(
        "Failed to create email",
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  },
};

// updating a template

export const updateTemplate = {
  async updateTemplate(
    id: string,
    data: Partial<NewTemplate>
  ): Promise<Template> {
    try {
      const emailUpdate = await db
        .update(emailTemplate)
        .set(data)
        .where(eq(emailTemplate.id, id))
        .returning();
      if (!emailUpdate[0]) {
        throw new AppError("Template not found", HttpStatusCodes.NOT_FOUND);
      }
      return emailUpdate[0];
    } catch (error) {
      throw new AppError(
        "Failed to update email template",
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        { cause: error }
      );
    }
  },
};

// Viewing a template
export const viewTemplate = {
  async viewTemplate(id: string): Promise<Template> {
    try {
      const template = await db
        .select()
        .from(emailTemplate)
        .where(eq(emailTemplate.id, id));
      if (!template[0]) {
        throw new AppError("Template not found", HttpStatusCodes.NOT_FOUND);
      }
      return template[0];
    } catch (error: any) {
      throw new AppError(
        "Failed to view email template",
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        { cause: error }
      );
    }
  },
};

// Deleting a template
export const deleteTemplate = {
  async deleteTemplate(id: string): Promise<void> {
    try {
      const result = await db
        .delete(emailTemplate)
        .where(eq(emailTemplate.id, id))
        .returning();
      if (result.length === 0) {
        throw new AppError("Template not found", HttpStatusCodes.NOT_FOUND);
      }
    } catch (error) {
      throw new AppError(
        "Failed to delete email template",
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        { cause: error }
      );
    }
  },
};

const emailTemplateServiceCombined = {
  emailTemplateService,
  updateTemplate,
  viewTemplate,
  deleteTemplate,
};

export default emailTemplateServiceCombined;
