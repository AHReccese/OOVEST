const jwt = require('jsonwebtoken');
const exchangeApi = require('../API/nobitex')

var crypto = require('crypto');

module.exports = {
    isNumber, getNews, getExchangeProfileStatus,
    sendBankCards, sendBankAccounts, getProfileStatus,
    updateExchangeToken, getExchangeToken, setUpExchange,
    addVestAccountPointer, addExchangeAccount, addBankCard,
    addToCards, addToAccounts, addBankAccount,
    validateEmail, signUp, userDoesExist,
    getToken, tokenValidation, getPassword, sleep
}

function isNumber(num) {
    return !isNaN(num)
}

async function getNews(limit) {
    const News = Parse.Object.extend("News");
    const query = new Parse.Query(News);

    if (limit != undefined) {
        query.limit(limit)
    }

    const results = await query.find();
    //console.log(results)
    var output = {
        news: []
    };

    for (var i in results) {

        var singleNews = results[i];
        //console.log(singleNews);
        output.news.push({

            "url": singleNews.get("url"),
            "imageurl": singleNews.get("imageUrl"),
            "title": singleNews.get("title"),
            "body": singleNews.get("body"),
            "source": singleNews.get("source"),
            "tags": singleNews.get("tags"),
            "categories": singleNews.get("categories")

        });

    }

    return output;

}

async function getExchangeProfileStatus(res, clientId) {

    const Client = Parse.Object.extend("Client");
    const query = new Parse.Query(Client);
    query.equalTo("objectId", clientId);
    const results = await query.find();
    if (results.length > 0) {
        var user = results[0];
        var vestUser = user.get("vestAccount")
        if (vestUser == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return
        }
        var vestUserId = vestUser.id;
        const VestUser = Parse.Object.extend("VestUser");
        const _query = new Parse.Query(VestUser);
        _query.equalTo("objectId", vestUserId);
        const _results = await _query.find();
        if (_results.length > 0) {
            res.status(200)
            res.json({
                "firstName": _results[0].get("firstName"),
                "lastName": _results[0].get("lastName"),
                "mobile": _results[0].get("mobile")
            });
        }

    } else {
        res.status(404);
        res.json({
            "message": "user not found."
        })
    }

}

async function sendBankCards(res, clientId) {

    const Client = Parse.Object.extend("Client");
    const query1 = new Parse.Query(Client);
    query1.equalTo("objectId", clientId);
    const results = await query1.find();
    if (results.length > 0) {
        const VestUser = Parse.Object.extend("VestUser");
        const query2 = new Parse.Query(VestUser);

        if (results[0].get("vestAccount") == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        query2.equalTo("objectId", results[0].get("vestAccount").id);
        const vUsers = await query2.find();
        if (vUsers.length > 0) {
            const vestUser = vUsers[0]
            console.log(vestUser);
            var bankCardsQuery = vestUser.relation("bankCards").query();
            var cards = await bankCardsQuery.find()

            var jsonCards = {
                bankCards: []
            };

            for (var card in cards) {
                var item = cards[card];

                jsonCards.bankCards.push({
                    "bank": item.get("bank"),
                    "number": item.get("number"),
                });
            }

            res.status(200);
            res.json(jsonCards);

        } else {
            res.status(404);
            res.json({
                "message": "user doesnt have any cards."
            })
        }

    } else {
        res.status(404);
        res.json({
            "message": "user not found."
        })
    }
}

async function sendBankAccounts(res, clientId) {

    const Client = Parse.Object.extend("Client");
    const query1 = new Parse.Query(Client);
    query1.equalTo("objectId", clientId);
    const results = await query1.find();
    if (results.length > 0) {
        const VestUser = Parse.Object.extend("VestUser");
        const query2 = new Parse.Query(VestUser);

        if (results[0].get("vestAccount") == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        query2.equalTo("objectId", results[0].get("vestAccount").id);
        const vUsers = await query2.find();

        if (vUsers.length > 0) {

            const vestUser = vUsers[0]
            var bankAccountsQuery = vestUser.relation("bankAccounts").query();
            var accounts = await bankAccountsQuery.find()

            var jsonAccounts = {
                bankAccounts: []
            };

            for (var account in accounts) {
                var item = accounts[account];

                jsonAccounts.bankAccounts.push({
                    "bank": item.get("bank"),
                    "number": item.get("number"),
                    "shaba": item.get("shaba"),
                });
            }

            res.status(200);
            res.json(jsonAccounts);

        } else {
            res.status(404);
            res.json({
                "message": "user doesnt have any Exchange accounts."
            })
        }

    } else {
        res.status(404);
        res.json({
            "message": "user not found."
        })
    }
}

async function getProfileStatus(res, objectId) {
    const Client = Parse.Object.extend("Client");
    const query = new Parse.Query(Client);
    query.equalTo("objectId", objectId);
    const results = await query.find();
    if (results.length > 0) {
        var user = results[0];
        res.status(200);
        res.json({
            "username": user.get("username"),
            //"password":user.get("password")
            "email": user.get("email")
        });
    } else {
        res.status(404);
        res.json({
            "message": "user not found."
        })
    }
}

function updateExchangeToken(res, vestAccount, code) {

    console.log("updateExchangeToken", vestAccount);

    var vestToken;
    exchangeApi.login(vestAccount.get("username"), vestAccount.get("password"), code)
        .then(response => response.text())
        .then(

            // gets token to exchange account.
            async function (result) {
                const answer = JSON.parse(result);
                console.log(answer)

                if (answer.status != "success") {

                    res.status(400);
                    res.json({
                        "message": "invalid inputs(wrong user/pass) -> cannot access to token."
                    });
                    return;

                }

                vestToken = answer.key;
                vestAccount.set("token", vestToken);
                await vestAccount.save();

            }
        )
        .catch(
            function (error) {
                console.log(error);
                res.status(500);
                res.json({
                    "message": "Exchange Server not responding."
                });
                return;
            }
        );

}

async function getExchangeToken(userId) {

    const client = Parse.Object.extend("Client");
    const query = new Parse.Query(client);
    query.equalTo("objectId", userId);
    const results = await query.find();
    //console.log("Successfully retrieved " + results.length + " scores.");
    var user = results[0]

    if (user.get("vestAccount") == undefined) {
        return undefined
    }
    var vestAccount = user.get("vestAccount").id
    //console.log(vestAccount)
    const vestAcc = Parse.Object.extend("VestUser");
    const loader = new Parse.Query(vestAcc);
    loader.equalTo("objectId", vestAccount);
    const accounts = await loader.find();
    return accounts[0];

    // if(exchangeTokenIsValid(user.get("token"))){

    // }else{
    //   // todo inform user.
    // }

}

function setUpExchange(res, userBundle) {

    var id = userBundle.userId;

    var user = userBundle["signInSetting"]["user"];
    var pass = userBundle["signInSetting"]["pass"];
    var code = userBundle["signInSetting"]["code"];
    console.log("input", userBundle);
    console.log("SetUpExchange", user, pass, code)

    var vestToken;
    exchangeApi.login(user, pass, code)
        .then(response => response.text())
        .then(

            // gets token to exchange account.
            async function (result) {
                const answer = JSON.parse(result);
                console.log(answer)

                if (answer.status != "success") {

                    res.status(400);
                    res.json({
                        "message": "invalid inputs(wrong user/pass) -> cannot access to Exchangetoken."
                    });
                    return;

                }

                vestToken = answer.key;
                res.status(200);
                res.json({
                    "message": "access is Acquired."
                });
                res.send()
                addExchangeAccount(id, user, pass, vestToken);

            }
        )
        .catch(
            function (error) {
                console.log(error);
                res.status(500);
                res.json({
                    "message": "Exchanger Server is not responding."
                });
                return;
            }
        );

}

async function addVestAccountPointer(userId, vestId) {

    const User = Parse.Object.extend("Client");
    const query = new Parse.Query(User);
    query.equalTo("objectId", userId);
    const results = await query.find();
    // todo handling.
    var user = results[0]

    console.log("adding vestAccount to user", userId, vestId)

    const VestUser = Parse.Object.extend("VestUser");
    const vestUser = new VestUser();
    vestUser.id = vestId;
    vestUser.set("owner", user);
    await vestUser.save();

    user.set("vestAccount", vestUser);
    await user.save();

}

function addExchangeAccount(id, user, pass, vestToken) {

    const VestUser = Parse.Object.extend("VestUser");
    const vestUser = new VestUser();
    vestUser.set("username", user);
    vestUser.set("password", pass);
    vestUser.set("token", vestToken);

    // get profile ...
    exchangeApi.getProfileStatus(vestToken)
        .then(response => response.text())
        .then(
            async function (result) {
                var answer = JSON.parse(result);
                if (answer.status == "ok") {

                    answer = answer.profile;
                    // general
                    vestUser.set("email", answer.email);
                    vestUser.set("mobile", answer.mobile);
                    vestUser.set("firstName", answer.firstName);
                    vestUser.set("lastName", answer.lastName);
                    var bankCardsRelation = vestUser.relation("bankCards");
                    var bankAccountsRelation = vestUser.relation("bankAccounts");

                    const bankCards = answer.bankCards;
                    for (var i = 0; i < bankCards.length; i++) {
                        var createdBankCard = await addBankCard(bankCards[i])
                        bankCardsRelation.add(createdBankCard);
                    }

                    const bankAccounts = answer.bankAccounts;
                    for (var i = 0; i < bankAccounts.length; i++) {
                        var createdBankAccount = await addBankAccount(bankAccounts[i])
                        bankAccountsRelation.add(createdBankAccount);
                    }

                    await vestUser.save()
                    addVestAccountPointer(id, vestUser.id);

                } else {
                    console.log("exchangeProfile doesnt fetched.")
                    return '-1';
                }
            }
        )
        .catch(function (error) {
            console.log(error);
            res.status(500);
            res.json({
                "message": "Exchange Server not responding."
            })
        });

}

async function addBankCard(card) {

    const BankCard = Parse.Object.extend("BankCard");
    var bankCard = new BankCard();

    bankCard.set("number", card.number);
    bankCard.set("bank", card.bank);
    bankCard.set("owner", card.owner);
    bankCard.set("confirmed", card.confirmed);
    bankCard.set("status", card.status);
    return await bankCard.save()

}

async function addToCards(card, vestUser) {

    const BankCard = Parse.Object.extend("BankCard");
    var bankCard = new BankCard();

    bankCard.set("number", card.number);
    bankCard.set("bank", card.bank);
    bankCard.set("owner", vestUser.get("firstName") + " " + vestUser.get("lastName"));
    bankCard.set("confirmed", false);
    bankCard.set("status", "notConfirmed");
    bankCard = await bankCard.save()
    console.log(bankCard);
    vestUser.relation("bankCards").add(bankCard)
    await vestUser.save()

}

async function addToAccounts(account, vestUser) {

    const BankAccount = Parse.Object.extend("BankAccount");
    var bankAccount = new BankAccount();

    bankAccount.set("number", account.number);
    bankAccount.set("bank", account.bank);
    bankAccount.set("shaba", account.shaba);
    bankAccount.set("owner", vestUser.get("firstName") + " " + vestUser.get("lastName"));
    bankAccount.set("confirmed", false);
    bankAccount.set("status", "notConfirmed");
    bankAccount = await bankAccount.save()
    vestUser.relation("bankAccounts").add(bankAccount)
    await vestUser.save()

}

async function addBankAccount(account) {

    const BankCard = Parse.Object.extend("BankAccount");
    const bankAccount = new BankCard();

    bankAccount.set("id", account.id);
    bankAccount.set("number", account.number);
    bankAccount.set("shaba", account.shaba);
    bankAccount.set("bank", account.bank);
    bankAccount.set("owner", account.owner);
    bankAccount.set("confirmed", account.confirmed);
    bankAccount.set("status", account.status);
    return await bankAccount.save()

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function signUp(email, username, pass) {

    const User = Parse.Object.extend("Client");
    const user = new User()
    user.set("username", username);
    const hashedPass = crypto.createHash('sha256').update(pass.toString(10)).digest('base64');
    user.set("password", hashedPass);
    user.set("email", email);
    user.set("check", email + "#" + hashedPass);

    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return true;
    }
}

async function userDoesExist(email, pass) {

    const userClass = Parse.Object.extend("Client");
    const query = new Parse.Query(userClass);
    const hashedPass = crypto.createHash('sha256').update(pass.toString(10)).digest('base64');
    query.equalTo("check", email + "#" + hashedPass);
    const results = await query.find();
    console.log(results);
    if (results.length == 1) {
        var user = results[0]
        return {
            userAccount: {
                "id": user.id,
                "email": email,
                "username": user.get("username"),
                "created_at": user.get('createdAt')
            }, status: true
        }
    } else {
        return { status: false };
    }

}

function getToken(email, pass) {

    var expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);
    const expirationTime = expiryDate.getTime();

    var token;
    try {

        token = jwt.sign(
            { user: email, password: pass, expiresIn: expirationTime },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: String(expirationTime) }
        );

        return token;

    } catch (e) {
        console.log(e)
        console.log('error Happened during token creation.')
        return "Error";
    }
}

async function tokenValidation(givenToken) {

    //console.log(givenToken);
    try {
        const token = givenToken.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const expirationTime = decodedToken.expiresIn

        if (new Date().getTime() >= expirationTime) {
            // todo
            console.log('expired')
            return { status: false };
        }

        const email = decodedToken.user;
        const pass = decodedToken.password;


        console.log(email);
        console.log(pass);
        console.log(expirationTime);

        var result = await userDoesExist(email, pass);

        if (result.status) {
            return result;
        } else {
            return { status: false };
        }

    } catch (e) {
        //console.log(e)
        return { status: false };
    }

}

async function getPassword(email) {

    const userClass = Parse.Object.extend("Client");
    const query = new Parse.Query(userClass);
    query.equalTo("email", email);
    query.limit(1)
    const results = await query.find();
    //console.log(results);
    if (results.length == 1) {
        var user = results[0]
        return {
            userAccount: {
                "username": user.get("username"),
                "email": email,
                "password": user.get("password"),
            }, status: true
        }
    } else {
        return { status: false };
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}