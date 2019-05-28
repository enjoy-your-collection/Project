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


router.get('/artist/albums/:release_id', (req, res, next) => {
    console.log("esto es ", req.params.release_id)

    axios
        .get(`https://api.discogs.com/masters/${req.params.release_id}`)
        .then(response => {
            res.render('albums', response.data)
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
router.post("/artists", (req, res, post) => {
    axios.get(
            `https://api.discogs.com/database/search?q=${req.body.artist}&key=aZPWSvWzWSrzydPcQNVw&secret=jhiOqYTPMVIeUXHnolYuNsZQuLBRUJRQ`
        )
        .then(results => {
            console.log(results.data)
            res.render("search", { results: results.data })

        })
        .catch(err => console.log(err))
})



//https://api.discogs.com/database/
//search?q=name&key=aZPWSvWzWSrzydPcQNVw&secret=jhiOqYTPMVIeUXHnolYuNsZQuLBRUJRQ





module.exports = router;