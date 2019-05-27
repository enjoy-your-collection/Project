const express = require('express');
const router = express.Router();
const axios = require("axios")
    /* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get("/artist/:artist_id/release", (req, res, next) => {
    axios
        .get(`https://api.discogs.com/artists/${req.params.artist_id}/releases`)
        .then(response => {
            res.render("release", response.data);
        })
        .catch(err => console.log("hubo un error", err));

})
router.get("/artist/:artist_id", (req, res, next) => {
    console.log(req.params)
    axios
        .get(`https://api.discogs.com/artists/${req.params.artist_id}`)
        .then(response => {
            res.render("artist-detail", response.data);
        })
        .catch(err => console.log("hubo un error", err));
});








module.exports = router;