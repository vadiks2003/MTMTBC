const expresso = require("express")
const binRouter = expresso.Router()

const binMap = require('./../json/binMap.json')
const hexMap = require('./../json/hexMap.json')
binRouter
    .route("/binMap")
    .get((req:any,res:any): void => {
        res.send(binMap)
    })


const hexRouter = expresso.Router()


hexRouter
    .route("/hexMap")
    .get((req:any,res:any): void =>{
        res.send(hexMap);
    })

const resRouter = expresso.Router()
resRouter.use(hexRouter);
resRouter.use(binRouter);
module.exports = resRouter;