import path from 'path';
import express from 'express';
import configRoutes from './routes/configRouter';

let app = express();
app.use("/api/config", configRoutes);

app.use(express.static('public'));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
})

app.listen(8989, function() {
    console.log("server has started");
})
