const botNotifier = require('../index.js').notifyBotServer
console.log(typeof botNotifier)

Parse.Cloud.afterSave("SignalBlue", (request) => {

    const sender = require('../index.js').notifyClient
    console.log(typeof sender)

    let signalBlue = request.object;

    if (!signalBlue.get("send")) {
        return;
    }

    const signalMessage = signalBlue.get("signalMessage");
    const signalFileUrl = signalBlue.get("signalFile")._url;
    const signalAssetManagment = signalBlue.get("riskManagment");

    getAllSignalContacts("signalBlue").then(contacts => {
        sender({
            "contacts": contacts,
            "data": {
                "signalMessage": signalMessage,
                "signalFile": signalFileUrl,
                "riskManagment": signalAssetManagment
            }
        })
        console.log("Sender called.")
    }).catch(error => {
        console.log(error)
        console.log("Failed.")
    });

});

Parse.Cloud.afterSave("VIP", (request) => {

    const sender = require('../index.js').notifyClient
    console.log(typeof sender)

    let vip = request.object;

    if (!vip.get("send")) {
        return;
    }

    const signalMessage = vip.get("signalMessage");
    const signalFileUrl = vip.get("signalFile")._url;
    const signalPic = vip.get("signalPicture");
    let signalPicture;
    if (signalPic == undefined) {
        signalPicture = ""
    } else {
        signalPicture = signalPic._url;
    }
    const signalAssetManagment = vip.get("riskManagment");

    getAllSignalContacts("VIP").then(contacts => {
        sender({
            "contacts": contacts,
            "data": {
                "signalMessage": signalMessage,
                "signalPicture": signalPicture,
                "signalFile": signalFileUrl,
                "riskManagment": signalAssetManagment
            }
        })
        console.log("Sender called.")
    }).catch(error => {
        console.log(error)
        console.log("Failed.")
    });

});

async function getAllSignalContacts(signal) {

    const Client = Parse.Object.extend("Client");
    const query = new Parse.Query(Client);
    query.equalTo(signal, true);
    const results = await query.find();
    console.log("Successfully retrieved " + results.length + " scores.");
    let contactData = []
    for (let i = 0; i < results.length; i++) {
        const object = results[i];
        let data = {
            "chatId": object.get("chatId"),
            "sendAssetManagment": object.get("riskManagment")
        }
        contactData.push(data);
    }
    return contactData;

}