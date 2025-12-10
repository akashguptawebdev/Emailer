// import nodemailer from 'nodemailer';
// import { join } from 'path';

// export const sendEmailFunction = async (to, subject, text, attachmentFileName = null) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     secure: true,
//     port: 465,
//     auth: {
//       user: 'akashgupta.webdev@gmail.com',
//       pass: 'iipd ycvn jmpo mefu',
//     },
//   });

//   // Define base mail options
//   const mailOptions = {
//     from: 'akashgupta.webdev@gmail.com',
//     to: to,
//     html: text,
//     subject: subject,
//     // text: text,
//   };

//   // If there's a PDF file to attach
//   if (attachmentFileName) {
//     const filePath = join(process.cwd(), 'utils', 'upload', attachmentFileName);
//     console.log("email with file =>", filePath)
//     mailOptions.attachments = [
//       {
//         filename: attachmentFileName,
//         path: filePath,
//         contentType: 'application/pdf'
//       }
//     ];
//   }

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     return "Email sent successfully!";
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email.");
//   }
// };


import dotenv from "dotenv";
dotenv.config();

import { join } from "path";
import fs from "fs";
import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmailFunction = async (
  to,
  subject,
  text,
  attachmentFileName = null
) => {
  try {
    // 1. Initialize Brevo Client
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY; // IMPORTANT

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    // 2. Base email structure
    const emailPayload = {
      sender: {
        name: process.env.SENDER_NAME || "Akash Gupta",
        email: process.env.SENDER_EMAIL, // must be SAME as verified sender!
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: text,
    };

    // 3. If file attachment exists
    if (attachmentFileName) {
      const filePath = join(
        process.cwd(),
        "utils",
        "upload",
        attachmentFileName
      );

      console.log("email with file =>", filePath);

      const fileBuffer = fs.readFileSync(filePath);
      const base64File = fileBuffer.toString("base64");

      emailPayload.attachment = [
        {
          name: attachmentFileName,
          content: base64File,
        },
      ];
    }

    // 4. Send email
    const result = await tranEmailApi.sendTransacEmail(emailPayload);
    console.log("Email sent:", result);

    return "Email sent successfully!";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
