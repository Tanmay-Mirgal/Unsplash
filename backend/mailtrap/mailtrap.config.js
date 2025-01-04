
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

 export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  testInboxId: process.env.MAILTRAP_TEST_INBOX_ID,
});

 export const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
