import sgMail, { MailDataRequired } from "@sendgrid/mail";
import assert from "assert";

const apiKey = process.env.SENDGRID_API_KEY;
const recipents = process.env.ADMIN_RECIPIENT;
const sender = process.env.ADMIN_SENDER;
const signedUptemplate_id = process.env.EMAIL_TEMPLATE_ID;

assert(apiKey, "SENDGRID_API_KEY is not defined");
assert(recipents, "ADMIN_RECIPIENT is not defined");
assert(sender, "ADMIN_SENDER is not defined");
assert(signedUptemplate_id, "EMAIL_TEMPLATE_ID is not defined");

sgMail.setApiKey(apiKey);
const recipientsArray = recipents.split(",");

const sendEmail = async (messageBody: MailDataRequired) => {
  try {
    await sgMail.send(messageBody);
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const getRegisterAdminEmailObject = (
  name: string,
  email: string,
  date: string
) => {
  return {
    to: recipientsArray,
    from: sender,
    subject: "New registraion to your team!",
    html: `<p>Dear Admin</p>
                <p> You got a registraion to our team!</p>
                Name: ${name}<br>
                Email: ${email}<br>
                Registered at: ${date}
            `,
  };
};

const getUnsubscribeAdminEmailObject = (
  name: string,
  email: string,
  date: string
) => {
  return {
    to: recipientsArray,
    from: sender,
    subject: "👋 Unsubscription on your team!",
    html: `<p>Dear Admin</p>
                <p>A member has unsubscribed.</p>
                Name: ${name}<br>
                Email: ${email}<br>
                Unsubscribed at: ${date}
            `,
  };
};

const getSignedUpEmailObject = (email: string, name: string) => {
  return {
    to: email,
    from: sender,
    templateId: signedUptemplate_id,
    dynamicTemplateData: {
      name: name,
    },
  };
};

const sendAdminEmail = async (
  name: string,
  email: string,
  date: string,
  type: "register" | "unsubscribe"
) => {
  let messageBody;
  switch (type) {
    case "register":
      messageBody = getRegisterAdminEmailObject(name, email, date);
      break;
    case "unsubscribe":
      messageBody = getUnsubscribeAdminEmailObject(name, email, date);
      break;
  }
  await sendEmail(messageBody);
};

const sendSignedUpEmail = async (email: string, name: string) => {
  const messageBody = getSignedUpEmailObject(email, name);
  await sendEmail(messageBody);
};

export { sendAdminEmail, sendSignedUpEmail };
