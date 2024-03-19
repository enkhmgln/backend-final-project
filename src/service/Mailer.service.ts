import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "enkh-amgalan.n@ufe.edu.mn",
    pass: "enhamgalan1A",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function MailerService(email: string) {
  try {
    await transporter.sendMail({
      from: "Enkh-amgalan <sad64137@gmail.com>",
      to: email,
      subject: "Бүртгэл",
      html: "Сайн байна уу? Таны бүртгэл амжилттай хийгдлээ.",
    });
    console.log(`${email} и-мэйл рүү амжилттай майл илгээлээ.`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
