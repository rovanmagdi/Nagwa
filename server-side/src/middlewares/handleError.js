
//handle errors
const handleError = (err, req, res, next) => {
    res.json({ message: err.message, status: err.status })
    next(err);
}
module.exports = handleError;