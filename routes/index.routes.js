const express = require('express');
const router = express.Router();
const axios = require("axios")
const Review = require("../models/review")
const Artist = require("../models/artist")
    /* GET home page */
router.get('/', (req, res, next) => {
    Artist.find({})
    .then(found => {
                    console.log(found)
                    res.render("index", { found })            
                })
                .catch(err => console.log("no hay datos"))
            })


    

// VISTA DISCOGRAFÍA
router.get("/artist/:artist_id/release", (req, res, next) => {
    //https://api.discogs.com/database/search?q=Nirvana&key=aZPWSvWzWSrzydPcQNVw&secret=jhiOqYTPMVIeUXHnolYuNsZQuLBRUJRQ

    axios
        .get(
            `https://api.discogs.com/artists/${req.params.artist_id}/releases`
        )
        .then(
            response => {
                res.render(
                    "discography",
                    response.data
                );
            }
        )
        .catch(
            err =>
            res.render(
                "discography", {
                    msg: "ese album no esta disponible"
                }
            )
        );
})

// VISTA ALBUM
router.get('/artist/albums/:release_id', (req, res, next) => {
        axios
            .get(`https://api.discogs.com/masters/${req.params.release_id}`)
            .then(response => {
                let songTabs = response.data.tracklist.map(song => {
                    song.titleUri = encodeURIComponent(song.title)
                    return song
                })
                Review.find({ idAlbum: response.data.id })
                    .then(elm => {
                        res.render("albums", { album: response.data, review: elm, songTabs, art: response.data.artists[0].name })
                    });
            })
            .catch(err => res.render("discography", { msg: "This release info is not available at the moment", }));


    })
    // Vista artista
router.get("/artist", (req, res, next) => {
    const { artistId, image } = req.query

    Artist.findOne({ idArtist: req.query.artistId }, )
        .then(found => {
            if (!found) {
                newArt()
                return

            }
            if (!found.members || !found.profile) {
                res.render("artist-detail", { msg: "no se pudo encontrar ese artista" })
                return
            }
            res.render("artist-detail", found)
        });

    const newArt = () => {
        axios.get(`https://api.discogs.com/artists/${artistId}`)
            .then(response => {
                const { name, profile, members, } = response.data
                const newArtist = new Artist({
                    name,
                    profile,
                    members,
                    idArtist: artistId,
                    image_url: image
                });
                newArtist.save()
                    .then((created) => {
                        if (!created.members || !created.profile) {
                            res.render("artist-detail", {
                                msg: "no se pudo encontrar ese artista"
                            });
                            return;
                        }
                        res.render("artist-detail", created);


                    })

            })
            .catch(err => res.render("artist-detail", { msg: "no se pudo encontrar ese artista" }))
    }
})



// VISTA BÚSQUEDA ARTISTAS


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