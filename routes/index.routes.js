const express = require('express');
const router = express.Router();
const axios = require("axios")
const Review = require("../models/review")
const Artist = require("../models/artist")
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

router.get("/artist/:artist_id", (req, res, next) => {


    Artist.findOne({ idArtist: req.params.artist_id }, )
        .then(found => {
            if (!found) {
                newArt()
                return

            }
            console.log("este ya estaba")
            res.render("artist-detail", found)
        });

    const newArt = () => {
        console.log("este es nuevo")
        axios.get(`https://api.discogs.com/artists/${req.params.artist_id}`)
            .then(response => {
                const { name, profile, members, id } = response.data
                const newArtist = new Artist({
                    name,
                    profile,
                    members,
                    idArtist: id
                });
                newArtist.save()
                    .then((created) => {
                        console.log("guardado", created)
                        res.render("artist-detail", created);


                    })

            })
            .catch(err => console.log("hubo un error", err));
    }

});
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