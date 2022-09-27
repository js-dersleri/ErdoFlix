const express = require("express")
const loaders = require("./loaders")
const config = require("./config")
const event = require("../src/script/events")
const { UserRoutes } = require("./routers")

config()
loaders()
event()
const app = express()
const PORT = 4040
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server ${PORT}'dan ayağa kalktı`)
    app.use("/user", UserRoutes)

})
app.get('/', (req, res) => {
    res.json({
        message: "Welcome",
    });
})
app.get("/main-page", (req, res) => {
    res.json({
        message: "Home Page"
    })
})
