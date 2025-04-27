import { SES } from '../aws';

const sendEmail = async (
  recipient: string,
  subject: string,
  body: string
) => {
  const params = {
    Source: process.env.AWS_SES_SENDER!,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
    },
  };
  return SES.sendEmail(params).promise();
};

export default sendEmail;
