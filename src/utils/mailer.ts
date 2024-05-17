import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dcdb3d38f9d838", //should be in env
        pass: "97a009119a9134", //should be in env
      },
    });

    const mailOptions = {
      from: "hello@nextjs.com", // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line

      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetemail"
      }?token=${hashedToken}" >here</a> to ${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      } or copy and paste the link below in your browser. <br/> 
      ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetemail"
      }?token=${hashedToken} 
      </p>`, // html body
    };

    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
