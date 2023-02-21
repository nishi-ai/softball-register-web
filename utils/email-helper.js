const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const recipient = process.env.ADMIN_RECIPIENT.split(",");
const sender = process.env.ADMIN_SENDER;
const signedUptemplate_id = process.env.EMAIL_TEMPLATE_ID;

const sendEmail = async (emailParams) => {
  try {
    await sgMail.send(emailParams);
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

const getAdminEmailObject = (name, email, date) => {
  return {
    to: recipient,
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

const getSignedUpEmailObject = (email, name) => {
  return {
    to: email,
    from: sender,
    templateId: signedUptemplate_id,
    dynamicTemplateData: {
      name: name,
    },
  };
};

const sendAdminEmail = async (name, email, date) => {
  const message = getAdminEmailObject(name, email, date);
  await sendEmail(message);
};

const sendSignedUpEmail = async (email, name) => {
  const message = getSignedUpEmailObject(email, name);
  await sendEmail(message);
};

module.exports = {
  sendAdminEmail,
  sendSignedUpEmail,
};
