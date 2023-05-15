const totalRoutes = require("./data");

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('Welcome to main page')
    })

    totalRoutes(app, fs)
}

module.exports = appRouter;