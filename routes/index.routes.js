const express = require('express');
const router = express.Router();
const axios = require("axios")
const Review = require("../models/review")
    /* GET home page */
router.get('/', (req, res, next) => {
    
    let randomArtist = (Math.floor(Math.random() * 6279473))

    axios
        .get(`https://api.discogs.com/artists/${randomArtist}`)
        .then(response => {
            res.render("index", response.data);
        })
        .catch(err => console.log("hubo un error", err));    

    
});
// Vista discografía
router.get("/artist/:artist_id/release", (req, res, next) => {
    axios
        .get(`https://api.discogs.com/artists/${req.params.artist_id}/releases`)
        .then(response => {
            res.render("release", response.data);
        })
        .catch(err => console.log("hubo un error", err));

})

// Vista álbum
router.get('/artist/albums/:release_id', (req, res, next) => {
    console.log("esto es ", req.params.release_id)
        // let reviews = []
        // Review.find({})
        //     .then(elm => reviews = [...elm])
        //     .catch(err => console.log("error de find", err))
        // console.log(reviews)
    axios
        .get(`https://api.discogs.com/masters/${req.params.release_id}`)
        .then(response => {
            Review.find({ idAlbum: response.data.id }).then(elm =>
                res.render("albums", { album: response.data, review: elm })
            );
        })
        .catch(err => res.render("release", { msg: "ese album no esta disponible", }));


})
// Vista artista
router.get("/artist/:artist_id", (req, res, next) => {
    console.log(req.params)
    axios
        .get(`https://api.discogs.com/artists/${req.params.artist_id}`)
        .then(response => {
           let artistTab = encodeURIComponent(response.data.name)
            axios.get(`https://www.songsterr.com/a/ra/songs/byartists.json?artists=${artistTab}`)
            .then(resTab => {
                console.log(resTab.data, "FUCK YEAH!!!")
                res.render("albums", { s: resTab.data.splice(0, 10)});
            })
        })
        .catch(err => console.log("hubo un error", err));
});

// Vista búsqueda artistas
router.post("/artists", (req, res, post) => {
    axios
        .get(
            `https://api.discogs.com/database/search?q=${req.body.artist}&key=${process.env.discogsKey}&secret=${process.env.discogsSecret}`
        )
        .then(results => {
            console.log(results.data);
            res.render("search", { results: results.data });
        })
        .catch(err => console.log(err));
})
router.post("/review/:album_id", (req, res, next) => {
    const { title, rate, description } = req.body;
    console.log("el ratio es", req.body.rate)
    const id = req.params.album_id
    console.log("album id", id)
    const newReview = new Review({
        title,
        rating: rate,
        description,
        idAlbum: id
    });
    newReview.save()
        .then(x => {
            console.log("guardado", x)
            res.redirect(`/artist/albums/${id}`)
        })
        .catch(error => console.log(error));

})






module.exports = router;