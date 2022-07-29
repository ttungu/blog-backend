exports.index_get = ((req, res, next) => {
    res.redirect('/api');
})

exports.nonexisting = (req, res) => {
    res.sendStatus(404);
}