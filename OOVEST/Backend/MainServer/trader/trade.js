var exchangeApi = require('../API/nobitex');

module.exports = {
    order, getOrderStatus, getAllOrders, cancelOrder, getWallets
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

}

// setting: type,src,dst,amount,price
function order(setting, clientId, res) {

    var exchangeIdentity = getExchangeToken(clientId);
    console.log(exchangeIdentity)
    exchangeIdentity.then(function (exchangeIdentity) {

        if (exchangeIdentity == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        var orderPromise = exchangeApi.setOrder(exchangeIdentity.get("token"), setting);
        orderPromise.then(function (response) {

            if (response.status == 401) {
                console.log("requesting to update token.")
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
                                    "message": "Invalid user/pass in Exchanger Account -> cannot access to token."
                                });
                                return;

                            }

                            var vestToken = answer.key;
                            exchangeIdentity.set("token", vestToken);
                            await exchangeIdentity.save();

                            exchangeApi.setOrder(vestToken, setting)
                                .then(function (response) {

                                    if (response.status / 100 == 2) {

                                        response.text().then(
                                            function (result) {
                                                result = JSON.parse(result);
                                                console.log(result);
                                                if (result.status == "failed") {
                                                    res.status(400);
                                                    res.json({
                                                        "message": result.code
                                                    });
                                                } else {
                                                    res.status(200);
                                                    res.json({
                                                        "order": result.order
                                                    });
                                                }
                                            }
                                        )

                                    } else {

                                        res.status(500);
                                        res.json({
                                            "message": "Exchanger's Server not responding."
                                        })
                                    }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500);
                                    res.json({
                                        "message": "Exchanger's Server not responding."
                                    });
                                })

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

            } else if (response.status == 200) {
                response.text().then(function (result) {
                    result = JSON.parse(result);
                    console.log(result);
                    if (result.status == "failed") {
                        res.status(400);
                        res.json({
                            "message": result.code
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "order": result.order
                        });
                    }
                })
            } else {
                // unknown Error.
                res.status(400);
                res.json({
                    "message": "bad request."
                });
            }
        });
    });

}

function getOrderStatus(orderId, clientId, res) {

    var exchangeIdentity = getExchangeToken(clientId);
    console.log(exchangeIdentity)
    exchangeIdentity.then(function (exchangeIdentity) {

        if (exchangeIdentity == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        var orderPromise = exchangeApi.getOrderState(exchangeIdentity.get("token"), orderId);
        orderPromise.then(function (response) {

            if (response.status == 401) {
                console.log("requesting to update token.")
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
                                    "message": "Invalid user/pass in Exchanger Account -> cannot access to token."
                                });
                                return;

                            }

                            var vestToken = answer.key;
                            exchangeIdentity.set("token", vestToken);
                            await exchangeIdentity.save();

                            exchangeApi.getOrderState(vestToken, orderId)
                                .then(function (response) {

                                    if (response.status / 100 == 2) {

                                        response.text().then(
                                            function (result) {
                                                result = JSON.parse(result);
                                                console.log(result);
                                                if (result.status == "failed") {
                                                    res.status(400);
                                                    res.json({
                                                        "message": "invalid request params."
                                                    });
                                                } else {
                                                    res.status(200);
                                                    res.json({
                                                        "order": result.order
                                                    });
                                                }
                                            }
                                        )

                                    } else {

                                        res.status(500);
                                        res.json({
                                            "message": "Exchanger's Server not responding."
                                        })

                                    }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500);
                                    res.json({
                                        "message": "Exchanger's Server not responding."
                                    });
                                })

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

            } else if (response.status == 200) {

                response.text().then(function (result) {
                    result = JSON.parse(result);
                    console.log(result);
                    if (result.status == "failed") {
                        res.status(400);
                        res.json({
                            "message": "invalid id"
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "order": result.order
                        });
                    }
                })

            } else {
                if (response.status == 404) {
                    res.status(404);
                    res.json({
                        "message": "Order with this id doesnt exist."
                    })
                } else {
                    res.status(400);
                    res.json({
                        "message": "bad Request(check your params)."
                    })
                }
            }
        }).catch(function (error) {
            console.log("getOrderState");
            res.status(500);
            res.json("Exchange Server is not available.")
        });
    });


}

// nobitex cleaned
// setting: src,dst
function getAllOrders(setting, clientId, res) {

    var exchangeIdentity = getExchangeToken(clientId);
    console.log(exchangeIdentity)
    exchangeIdentity.then(function (exchangeIdentity) {

        if (exchangeIdentity == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        var orderPromise = exchangeApi.getOrders(exchangeIdentity.get("token"), setting);
        orderPromise.then(function (response) {

            if (response.status == 401) {
                console.log("requesting to update token.")
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
                                    "message": "Invalid user/pass in Exchanger Account -> cannot access to token."
                                });
                                return;

                            }

                            var vestToken = answer.key;
                            exchangeIdentity.set("token", vestToken);
                            await exchangeIdentity.save();

                            exchangeApi.getOrders(vestToken, setting)
                                .then(function (response) {

                                    if (response.status / 100 == 2) {

                                        response.text().then(
                                            function (result) {

                                                result = JSON.parse(result);
                                                if (result.status == "ok") {
                                                    res.status(200);
                                                    res.json({
                                                        "orders": result.orders
                                                    });
                                                } else {
                                                    res.status(400);
                                                    res.json({
                                                        "message": "request failed(unknown)"
                                                    });
                                                }

                                            }
                                        )

                                    } else {
                                        console.log(response)
                                        res.status(400);
                                        res.json({
                                            "message": "Back request."
                                        })
                                    }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500);
                                    res.json({
                                        "message": "Exchanger's Server not responding."
                                    });
                                })

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

            } else if (response.status == 200) {
                response.text().then(function (result) {

                    result = JSON.parse(result);
                    if (result.status == "ok") {
                        res.status(200);
                        res.json({
                            "orders": result.orders
                        });
                    } else {
                        res.status(400);
                        res.json({
                            "message": "request failed(unknown)"
                        });
                    }

                })
            } else {
                // unknown Error.
                res.status(400);
                res.json({
                    "message": "bad request."
                });
            }
        });
    });

}

// nobitex cleaned
// setting orderId,status
function cancelOrder(setting, clientId, res) {

    var exchangeIdentity = getExchangeToken(clientId);
    console.log(exchangeIdentity)
    exchangeIdentity.then(function (exchangeIdentity) {

        if (exchangeIdentity == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        var orderPromise = exchangeApi.updateOrder(exchangeIdentity.get("token"),
            setting.orderId,
            setting.status);
        orderPromise.then(function (response) {

            if (response.status == 401) {
                console.log("requesting to update token.")
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
                                    "message": "Invalid user/pass in Exchanger Account -> cannot access to token."
                                });
                                return;

                            }

                            var vestToken = answer.key;
                            exchangeIdentity.set("token", vestToken);
                            await exchangeIdentity.save();

                            exchangeApi.updateOrder(vestToken,
                                setting.orderId,
                                setting.status)
                                .then(function (response) {

                                    if (response.status / 100 == 2) {

                                        response.text().then(
                                            function (result) {

                                                result = JSON.parse(result);
                                                if (result.status == "ok") {
                                                    res.status(200);
                                                    res.json({
                                                        "updatedStatus": result.updatedStatus
                                                    });
                                                } else {
                                                    res.status(400);
                                                    res.json({
                                                        "message": "request failed(unknown)"
                                                    });
                                                }

                                            }
                                        )

                                    } else {

                                        console.log(response)
                                        res.status(400);
                                        res.json({
                                            "message": "bad request."
                                        })
                                    }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500);
                                    res.json({
                                        "message": "Exchanger's Server not responding."
                                    });
                                })

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

            } else if (response.status == 200) {
                response.text().then(function (result) {

                    result = JSON.parse(result);
                    if (result.status == "ok") {
                        res.status(200);
                        res.json({
                            "updatedStatus": result.updatedStatus
                        });
                    } else {
                        res.status(400);
                        res.json({
                            "message": "request failed(unknown)"
                        });
                    }

                })
            } else {
                console.log(response)
                res.status(400);
                res.json({
                    "message": "bad request."
                });
            }
        });
    });

}

function getWallets(clientId, res) {

    var exchangeIdentity = getExchangeToken(clientId);
    console.log(exchangeIdentity)
    exchangeIdentity.then(function (exchangeIdentity) {

        if (exchangeIdentity == undefined) {
            res.status(404);
            res.json({
                "message": "Exchange account does not exist."
            })
            return;
        }

        var orderPromise = exchangeApi.getWallets(exchangeIdentity.get("token"));
        orderPromise.then(function (response) {

            if (response.status == 401) {
                console.log("requesting to update token.")
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
                                    "message": "Invalid user/pass in Exchanger Account -> cannot access to token."
                                });
                                return;

                            }

                            var vestToken = answer.key;
                            exchangeIdentity.set("token", vestToken);
                            await exchangeIdentity.save();

                            exchangeApi.getWallets(vestToken)
                                .then(function (response) {

                                    if (response.status / 100 == 2) {

                                        response.text().then(
                                            function (result) {

                                                result = JSON.parse(result);
                                                if (result.status == "ok") {
                                                    res.status(200);
                                                    res.json({
                                                        "wallets": result.wallets
                                                    });
                                                } else {
                                                    console.log(result)
                                                    res.status(400);
                                                    res.json({
                                                        "message": "request failed(unknown)"
                                                    });
                                                }

                                            }
                                        )

                                    } else {

                                        console.log(response)
                                        res.status(400);
                                        res.json({
                                            "message": "bad request."
                                        })
                                    }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500);
                                    res.json({
                                        "message": "Exchanger's Server not responding."
                                    });
                                })

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

            } else if (response.status == 200) {
                response.text().then(function (result) {

                    result = JSON.parse(result);
                    if (result.status == "ok") {
                        res.status(200);
                        res.json({
                            "wallets": result.wallets
                        });
                    } else {
                        console.log(result)
                        res.status(400);
                        res.json({
                            "message": "request failed(unknown)"
                        });
                    }

                })
            } else {
                console.log(response)
                res.status(400);
                res.json({
                    "message": "bad request."
                });
            }
        });
    });

}
