import { createTestAccount, createTransport } from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
    service: "gmail",
    auth: {
        // add these to .env file
        user: process.env.G_USER,
        pass: process.env.G_PWD,
    },
});

const sendEmail = async (mailOptions: {}): Promise<void> => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

export const sendRegEmail = async (
    email: string,
    user: string
): Promise<void> => {
    const mailOptions = {
        from: "testnodejs02@gmail.com",
        to: email,
        subject: `Welcome ${user}!`,
        text: "You have registered to blog app.",
    };
    try {
        await sendEmail(mailOptions);
    } catch (e: any) {
        throw new Error(e);
    }
};
