//Creación Middleware

export const serverLog = (req, res, next) => {
    console.log({
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        params: req.params,
        query: req.query,
    });
    next()
}