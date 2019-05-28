const express = require('express');
const router = express.Router();
const axios = require("axios")
const Review = require("../models/review")
const Artist = require("../models/artist")
    /* GET home page */
router.get('/', (req, res, next) => {

    let randomArtist = (Math.floor(Math.random() * 6279473))

    axios
        .get(`https://api.discogs.com/artists/${randomArtist}`)
        .then(response => res.render("index", response.data))
        .catch(err => console.log("hubo un error", err));


});
// Vista discografía
router.get("/artist/:artist_id/release", (req, res, next) => {
    axios.get(`https://api.discogs.com/artists/${req.params.artist_id}/releases`)
        .then(response => {
            res.render("discography", response.data);


        })
        .catch(err => res.render("discography", { msg: "ese album no esta disponible", }));



})

// Vista álbum
router.get('/artist/albums/:release_id', (req, res, next) => {

        axios
            .get(`https://api.discogs.com/masters/${req.params.release_id}`)
            .then(response => {
                Review.find({ idAlbum: response.data.id }).then(elm =>
                    res.render("albums", { album: response.data, review: elm })
                );
            })
            .catch(err => res.render("discography", { msg: "ese album no esta disponible", }));


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


    Artist.findOne({ idArtist: req.params.artist_id }, )
        .then(found => {
            if (!found) {
                newArt()
                return

            }
            res.render("artist-detail", found)
        });

    const newArt = () => {
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
                        res.render("artist-detail", created);


                    })

            })
            .catch(err => res.render("artist-detail", { msg: "no se pudo encontrar ese artista" }))
    }
})

<<<<<<< HEAD


// Vista búsqueda artistas

=======
>>>>>>> 6b15bb38cb1946b95aff7301f352f7d6ae68bf54
router.post("/artists", (req, res, post) => {
    axios.get(
            `https://api.discogs.com/database/search?q=${req.body.artist}&key=${process.env.discogsKey}&secret=${process.env.discogsSecret}`
        )
        .then(results => {
            res.render("search", { results: results.data });
        })
        .catch(err => console.log(err));
})
router.post("/review/:album_id", (req, res, next) => {
    const { title, rate, description } = req.body;
    const id = req.params.album_id
    const newReview = new Review({
        title,
        rating: rate,
        description,
        idAlbum: id
    });
    newReview.save()
        .then(x => {
            res.redirect(`/artist/albums/${id}`)
        })
        .catch(error => console.log(error));

})






module.exports = router;