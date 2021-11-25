//----------------------------Requiring ThirdParty Libraries----------------------------//
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const config = require("../configs")
console.log(config)
const { EMAIL, PASSWORD, MAIN_URL } = require("../configs").mailSetting;
//---------------------------------------------------------------------------------------

const welcome = (user) => {

    let response = {
        body: {

            name: user.username,
            intro: "Welcome to OOVEST company.Hope you enjoy our services :).",
            action: {
                instructions: 'If there is any problem contact Us directly.',
                button: {
                    color: '#22BC66',
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        },
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: user.email,
        subject: "Welcome to our company.",
        html: mail,
    };

    transporter
        .sendMail(message)
        .then(() => {
            console.log('welcome mail sent to ' + user.email)
        })
        .catch((error) => {
            console.log('sending mail to user with email ' + user.email + ' has ecountered \
            an error.')
            console.log(error);
        });

};

const retrievePassword = (user) => {

    let response = {
        body: {

            name: user.username,
            intro: "Your password has been retrieved.",
            action: {
                instructions: 'Your retrieved password is: ' + user.password,
                button: {
                    color: '#22BC66',
                    text: 'Sign in',
                    link: MAIN_URL
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        },
    };

    let mail = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: user.email,
        subject: "Password retrieval",
        html: mail,
    };

    transporter
        .sendMail(message)
        .then(() => {
            console.log('retrievedPassword mail sent to ' + user.email)
        })
        .catch((error) => {
            console.log('sending retrievalPassword mail to user with email ' + user.email + ' has ecountered \
            an error.')
            console.log(error);
        });


}

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: "OOVEST Company",
        link: MAIN_URL,
    },
});

module.exports = {
    welcome,
    retrievePassword,
};





