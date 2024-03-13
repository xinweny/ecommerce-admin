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

export const sendPasswordResetEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const resetLink = `${process.env.NEXT_URL}/password?token=${token}`;

  await resend.emails.send({
    from: process.env.SMTP_ADDRESS as string,
    to: email,
    subject: "Reset your password",
    html:  `<p>
      <p>Forgot your password? It happens to the best of us. Click the button below to reset your password:</p>
      <br>
      <a href="${resetLink}">Reset Password</a>
      <br>
      <p>The link will expire after 24 hours.</p>
      <br>
      <p>Thank you,</p>
      <br>
      <p>Songbird Instruments</p>
      <a href="${process.env.NEXT_URL}">${process.env.NEXT_URL}</a>
    </p>`,
  });
};