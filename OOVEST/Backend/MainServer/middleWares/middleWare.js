
const methodMiddleWare = function (req, res, next) {
    //console.log(req.method)
    if (req.method === 'POST') {
        next()
    } else {
        res.status(405);
        res.json({
            "message": "Only `Post` Method is Valid"
        })
        return
    }
}

module.exports = { methodMiddleWare }
