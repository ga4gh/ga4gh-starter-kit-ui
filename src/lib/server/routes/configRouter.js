import express from 'express';
import config from '../config';

let configRouter = express.Router();

configRouter.get("/", function(req, res) {
    res.send(config);
})

export default configRouter;
