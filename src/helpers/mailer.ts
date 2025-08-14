import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

interface SendEmailParams {
  email: string
  emailType: 'VERIFY' | 'RESET'
  userId: string
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d7fc6548fbfe14",
        pass: "71ca2241ccad1c",
      },
    })

    const mailOptions = {
      from: "hixuttam@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>
        `,
    }

    const mailresponse = await transport.sendMail(mailOptions)
    return mailresponse
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Email sending failed'
    throw new Error(errorMessage)
  }
}
