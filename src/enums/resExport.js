const resExport = (status, mess, data = null, res) => {
    res.status(status).json({
        status: status,
        message: mess,
        data: data,
    })
}

module.exports = {resExport};