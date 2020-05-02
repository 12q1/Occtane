const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'baplodiscobar@gmail.com',
        pass: 'yeahnonicetry'
    }
})

const mailOptions = {
    from: 'baplodiscobar@gmail.com',
    to: 'thomasham89@gmail.com',
    subject: 'Test',
    text: 'This is a test email'
}

const sendIt = () => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

module.exports = sendIt

//mostly taken from https://blog.mailtrap.io/nodemailer-gmail/ by Piotr Malek
