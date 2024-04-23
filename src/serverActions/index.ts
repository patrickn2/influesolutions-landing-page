"use server";

import { ContactValues } from "@/app/page";
import { encode } from "html-entities";
import fs from "fs";
import { emailTemplate, sendEmail } from "@/modules/email";
interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: number; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the reCAPTCHA was solved
}

export const sendContactForm = async (data: ContactValues) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${
    process.env.RECAPCTHA_SECRET_KEY as string
  }&response=${data.token}`;

  try {
    const options = {
      method: "POST",
    };

    const response = await fetch(url, options);
    const reCaptchaData = (await response.json()) as ReCaptchaResponse;
    if (!reCaptchaData.success)
      return { status: false, error: "error.invalid.captcha" };

    const html = emailTemplate
      .replace("{website}", "Influesolutions.com")
      .replace("{name}", encode(data.name))
      .replace("{phone}", encode(data.phone))
      .replace("{phoneOnlyNumbers}", encode(data.phone.replaceAll(/\D/g, "")))
      .replace("{email}", encode(data.email))
      .replace("{message}", encode(data.message).replace(/\n/g, "<br/>"));

    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL as string,
      from: process.env.CONTACT_EMAIL as string,
      replyTo: data.email,
      subject: `Contato ${data.name} - Influesolutions.com`,
      html,
    });
    if (result.status === false)
      return {
        status: false,
        error:
          "Erro ao enviar contato. Envie email para comercial@influesolutions.com",
      };
    return {
      status: true,
    };
  } catch (error) {
    console.error("Error:", (error as Error).message);
    return { status: false, error: (error as Error).message };
  }
};
