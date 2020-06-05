exports.responseErrorHandle = (res, responseCode, message) => {
    res.status(responseCode).send({ message: message });
};
