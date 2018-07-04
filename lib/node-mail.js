const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
class RentMailer{
  static test (to_email , from_email , detail_address){
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
 
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'Naver',
        auth: {
            user: process.env.Naver_email,
            pass: process.env.Naver_pwd
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: process.env.Naver_email , // sender address
          to: to_email, // list of receivers
          subject: '방 대여 하고 싶어요~!', // Subject line
          text: detail_address + '여기 방 대여 하고 싶어요~! 답장은 ' + from_email + '로 해주세요~'
      };

      console.log(mailOptions);
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
    });
  }
}
 
module.exports = RentMailer;