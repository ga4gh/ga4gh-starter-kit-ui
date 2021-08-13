import express from 'express';
import config from '../config';

let configRouter = express.Router();

configRouter.get("/services", function(req, res) {
    res.send(config.services);
})

export default configRouter;
