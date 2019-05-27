const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get("/artist", (req, res, next) => res.render("artist", artist))
router.get("/release/:artist_id", (req, res, next) => {
    const id_artist = req.params.artist_id

    res.render("release", release)
})

module.exports = router;