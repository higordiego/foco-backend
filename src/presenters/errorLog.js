module.exports.RegisterError = async (err, req, res, next) => {
    try {
        console.log(err)
        res.status(500).json([{ title: 'Internal Error', message: err }])
    } catch (err) {
        res.status(500).json([{ title: 'Internal Error', message: 'Internal Error' }])
    }
}
