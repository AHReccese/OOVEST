//----------------------------Requiring ThirdParty Libraries----------------------------//
const util = require('../utilities/util')
const mailController = require("../controllers/mailController");
//---------------------------------------------------------------------------------------
var exchangeApi = require('../API/nobitex');
var tradeKernel = require('../trader/trade');
var chartController = require('../charts/sparkLine');
//---------------------------------------------------------------------------------------

let signup = (req, res) => {

    //console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    //console.log(count);

    if (count != 3) {
        res.status(400);
        res.json({
            "message": "Request Length should be 3"
        });
        return
    }

    username = body.username;
    password = body.password;
    email = body.email;

    if (password == undefined || email == undefined || username == undefined) {
        res.status(400);
        res.json({
            "message": "invalid inputs."
        });
        return
    }

    if (password.length <= 5) {
        res.status(400);
        res.json({
            "message": "filed `password`.length should be gt 5"
        });
        return
    }

    if (!util.validateEmail(email)) {
        res.status(400);
        res.json({
            "message": "filed `email` is not valid"
        });
        return
    }

    var userConflict = util.userDoesExist(email, password);
    userConflict.then(function (result) {
        if (result.status) {
            res.status(409);
            res.json({
                "message": "user with this email does exist."
            })
        } else {
            promise = util.signUp(email, username, password);
            promise.then(error => {
                if (error == undefined) {
                    mailController.welcome({ 'username': username, 'email': email })
                    res.status(201);
                    res.json({
                        "message": "user has been created."
                    });
                } else {
                    res.status(409);
                    res.json({
                        "message": "email already exist."
                    });
                }
            });
        }
    })
}

let signin = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count != 2) {
        res.status(400);
        res.json({
            "message": "Request Length should be 2"
        });
        return
    }

    email = body.email;
    password = body.password;

    if (password == undefined || email == undefined) {
        res.status(400);
        res.json({
            "message": "invalid inputs."
        });
        return
    }

    if (password.length <= 5) {
        res.status(400);
        res.json({
            "message": "filed `password`.length should be gt 5"
        });
        return
    }

    if (!util.validateEmail(email)) {
        res.status(400);
        res.json({
            "message": "filed `email` is not valid"
        });
        return
    }

    promise = util.userDoesExist(email, password);
    promise.then(exist => {

        if (exist.status) {
            token = util.getToken(email, password);
            console.log("token", token);
            res.status(200);
            res.json({
                "message": {
                    "token": "Bearer " + token
                }
            })

        } else {
            res.status(401);
            res.json({
                "message": "wrong email or password."
            });
        }

    });

}

let setup = (req, res) => {

    //console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    //console.log(count);

    if (count == 2) {

        user = body.user;
        pass = body.pass;

        if (pass == undefined || user == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {
            console.log("validationResult", result);
            if (result.status) {
                // authorized.
                var userBundle = {
                    "userId": result.userAccount.id,
                    "signInSetting": { "user": user, "pass": pass }
                }
                console.log(userBundle);
                util.setUpExchange(res, userBundle);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else if (count == 3) {

        user = body.user;
        pass = body.pass;
        verif = body.code;

        if (pass == undefined || user == undefined || code == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {

            if (result.status) {
                // authorized.
                var userBundle = {
                    "id": result.id,
                    "signInSetting": { "user": user, "pass": pass, "code": code }
                }
                util.setUpExchange(res, userBundle);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else {
        res.status(400);
        res.json({
            "message": "Request Length should be 2 or 3"
        });
    }

}

let addBankCard = (req, res) => {

    //console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    //console.log(count);
    if (count != 2) {
        res.status(400);
        res.json({
            "message": "Request Length should be 2 or 3"
        });
        return
    }

    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {

            // authorized.
            var number = body.number;
            var bank = body.bank;
            console.log(result)
            var exchangeIdentity = util.getExchangeToken(result.userAccount.id);
            exchangeIdentity.then(function (exchangeIdentity) {

                if (exchangeIdentity == undefined) {
                    res.status(404);
                    res.json({
                        "message": "Exchange account does not exist."
                    })
                    return;
                }

                console.log("ExchangeToken", exchangeIdentity)
                exchangeApi.addBankCard(exchangeIdentity.get("token"), { "number": number, "bank": bank })
                    .then(function (response) {
                        if (response.status == 401) {
                            // requesting to update token.
                            var login = exchangeApi.login(exchangeIdentity.get("username"), exchangeIdentity.get("password"))
                            login.then(result => result.text())
                                .then(

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
                                        exchangeIdentity.set("token", vestToken);
                                        await exchangeIdentity.save();
                                        var cardData = { "number": number, "bank": bank };
                                        exchangeApi.addBankCard(exchangeIdentity.get("token"), cardData)
                                            .then(function (response) {
                                                if (response.status / 100 != 2) {

                                                    res.status(500);
                                                    res.json({
                                                        "message": "Exchange Server not responding."
                                                    });
                                                    return;

                                                } else {
                                                    res.status(200);
                                                    res.json({
                                                        "message": "BankCard Added Successfully."
                                                    });

                                                    util.addToCards({ "number": number, "bank": bank }, exchangeIdentity)
                                                    return;
                                                }
                                            });

                                    })
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
                        else {
                            res.status(200)
                            res.json({
                                "message": "card added successfully."
                            })

                            util.addToCards({ "number": number, "bank": bank }, exchangeIdentity)
                            return;
                        }

                    })
                    //.then(result => console.log('result',result))
                    .catch(error => console.log('error', error));
            });

        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;

        }
    });

}

let addBankAccount = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    //console.log(count);
    if (count != 3) {
        res.status(400);
        res.json({
            "message": "Request Length should be 2 or 3"
        });
        return
    }

    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {

            // authorized.
            var number = body.number;
            var bank = body.bank;
            var shaba = body.shaba;
            console.log(result)
            var exchangeIdentity = util.getExchangeToken(result.userAccount.id);
            exchangeIdentity.then(function (exchangeIdentity) {

                if (exchangeIdentity == undefined) {
                    res.status(404);
                    res.json({
                        "message": "Exchange account does not exist."
                    })
                    return;
                }

                console.log("ExchangeToken", exchangeIdentity)
                var accountData = { "number": number, "bank": bank, "shaba": shaba }
                exchangeApi.addBankAccount(exchangeIdentity.get("token"), accountData)
                    .then(function (response) {
                        if (response.status == 401) {
                            // requesting to update token.
                            var login = exchangeApi.login(exchangeIdentity.get("username"), exchangeIdentity.get("password"))
                            login.then(result => result.text())
                                .then(

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
                                        exchangeIdentity.set("token", vestToken);
                                        await exchangeIdentity.save();
                                        exchangeApi.addBankAccount(exchangeIdentity.get("token"), accountData)
                                            .then(function (response) {
                                                if (response.status / 100 != 2) {

                                                    res.status(500);
                                                    res.json({
                                                        "message": "Exchange Server not responding."
                                                    });
                                                    return;

                                                } else {
                                                    res.status(200);
                                                    res.json({
                                                        "message": "BankAccount Added Successfully."
                                                    });

                                                    util.addToAccounts(accountData, exchangeIdentity)
                                                    return;
                                                }
                                            }).catch(error => console.log("Failed"));

                                    })
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


                        } else if (response.status / 100 == 2) {
                            res.status(200);
                            res.json({
                                "message": "done."
                            });

                            util.addToAccounts(accountData, exchangeIdentity)
                            return;

                        } else {
                            console.log("unknown error.")
                            res.status(400);
                            res.json({
                                "message": "Exchange Server failed."
                            });
                        }
                    })
                    //.then(result => console.log('result',result))
                    .catch(function (error) {
                        res.status(400);
                        res.json({
                            "message": "Exchange Server failed."
                        });
                    });
            });

        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;

        }
    });

}

let getProfile = (req, res) => {

    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {
            // authorized.
            util.getProfileStatus(res, result.userAccount.id);
        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;
        }
    });

}

let getBankCards = (req, res) => {
    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {
            // authorized.
            util.sendBankCards(res, result.userAccount.id);
        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;
        }
    });
}

let getBankAccount = (req, res) => {
    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {
            // authorized.
            util.sendBankAccounts(res, result.userAccount.id);
        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;
        }
    });
}

let setOrder = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count == 5) {

        var type = body.type;
        var src = body.src;
        var dst = body.dst;
        var amount = body.amount;
        var price = body.price;

        if (type == undefined || src == undefined ||
            dst == undefined || amount == undefined || price == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {
            console.log("validationResult", result);
            if (result.status) {
                // authorized.
                tradeKernel.order(
                    {
                        "type": type,
                        "src": src,
                        "dst": dst,
                        "amount": amount,
                        "price": price
                    }
                    , result.userAccount.id, res);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else {
        res.status(400);
        res.json({
            "message": "message length should be 5."
        });
    }
}

let getOrderStatus = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count == 1) {

        var orderId = body.id;

        if (orderId == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {
            console.log("validationResult", result);
            if (result.status) {
                // authorized.
                tradeKernel.getOrderStatus(
                    orderId
                    , result.userAccount.id, res);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else {
        res.status(400);
        res.json({
            "message": "message length should be 1."
        });
    }
}

let getExchangeProfile = (req, res) => {

    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {
            // authorized.
            util.getExchangeProfileStatus(res, result.userAccount.id);
        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;
        }
    });

}

let getAllOrders = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count == 2) {

        var src = body.src;
        var dst = body.dst;

        if (src == undefined || dst == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {
            console.log("validationResult", result);
            if (result.status) {

                // authorized.
                tradeKernel.getAllOrders(
                    { "src": src, "dst": dst }
                    , result.userAccount.id, res);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else {
        res.status(400);
        res.json({
            "message": "message length should be 2."
        });
    }
}

let cancelOrder = (req, res) => {

    console.log(req.body);
    var body = req.body;
    var count = Object.keys(body).length;
    console.log(count);

    if (count == 2) {

        var orderId = body.order;
        var state = body.status;

        if (orderId == undefined || state == undefined) {
            res.status(400);
            res.json({
                "message": "invalid inputs."
            });
            return
        }

        // authorization
        token = req.headers.authorization;
        validationResult = util.tokenValidation(token);
        validationResult.then(result => {
            console.log("validationResult", result);
            if (result.status) {

                // authorized.
                tradeKernel.cancelOrder(
                    { "status": state, "orderId": orderId }
                    , result.userAccount.id, res);

            } else {
                res.status(400);
                res.json({
                    "message": "invalid token"
                });
                return;

            }
        });

    } else {
        res.status(400);
        res.json({
            "message": "message length should be 2."
        });
    }
}

let getNewsHandler = (req, res) => {

    var newsNumber = req.query.count;
    //console.log(typeof newsNumber);
    if (newsNumber == undefined) {
        var news = util.getNews();
        news.then(function (result) {
            res.status(200);
            res.json(result);
        })
    } else if (util.isNumber(newsNumber)) {
        var limit = 50;
        var newsNumber = Number(newsNumber);
        if (newsNumber < limit) {
            limit = newsNumber;
        }
        var news = util.getNews(limit);
        news.then(function (result) {
            res.status(200);
            res.json(result);
        })

    } else {
        res.status(400);
        res.json({
            "message": "bad request."
        })
    }


}

let getWallets = (req, res) => {

    // authorization
    token = req.headers.authorization;
    validationResult = util.tokenValidation(token);
    validationResult.then(result => {
        console.log("validationResult", result);
        if (result.status) {
            // authorized.
            tradeKernel.getWallets(result.userAccount.id, res);

        } else {
            res.status(400);
            res.json({
                "message": "invalid token"
            });
            return;

        }

    });

}

let getSparkLine = (req, res) => {

    var coin = req.query.coin;
    var category = req.query.category // week,month,3month,6month,year
    //var from = req.query.from;
    //var to = req.query.to;

    if (coin == undefined || category == undefined/*from == undefined || to == undefined*/) {
        res.status(400);
        res.json({
            "message": "bad Request."
        })
        return;
    }

    chartController.getSparkLine(
        { "coin": coin, "category": category/*"from": from, to: to*/ }
        , res);

}

let passwordRetrieval = (req, res) => {

    console.log("Called");
    email = req.query.email;
    console.log(email);

    if (email == undefined) {
        res.status(400);
        res.json({
            "message": "invalid input."
        });
        return
    }

    if (!util.validateEmail(email)) {
        res.status(400);
        res.json({
            "message": "filed `email` is not valid"
        });
        return
    }

    var retrievedUser = util.getPassword(email);
    retrievedUser.then(async function (retrievedUser) {
        if (retrievedUser.status) {
            console.log(retrievedUser.userAccount)
            mailController.retrievePassword({
                "username": retrievedUser.userAccount.username,
                "password": retrievedUser.userAccount.password,
                "email": retrievedUser.userAccount.email
            })
            res.status(200);
            res.json({
                "message": "Password retrieval email has been sent."
            })
        } else {
            res.status(404);
            res.json({
                "message": "There isn't any account associated with this email. "
            })
        }
    })

}

module.exports = {
    signup, signin, setup,
    addBankCard, addBankAccount, getProfile,
    getBankAccount, getBankCards, setOrder,
    getOrderStatus, getExchangeProfile, getAllOrders,
    cancelOrder, getNewsHandler, getWallets,
    getSparkLine, passwordRetrieval
}
