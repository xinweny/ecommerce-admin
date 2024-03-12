import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  const confirmLink = `${process.env.NEXT_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: process.env.SMTP_ADDRESS as string,
    to: email,
    subject: "Verify your Songbird account",
    html:  `<p>
      <p>Hello ${name},</p>
      <br>
      <p>Welcome to Songbird Instruments! Click the button below to activate your account:</p>
      <br>
      <a href="${confirmLink}">Activate account</a>
      <br>
      <p>Thank you,</p>
      <br>
      <p>Songbird Instruments</p>
      <a href="${process.env.NEXT_URL}">${process.env.NEXT_URL}</a>
    </p>`,
  });
};