const express = require('express');
const router = express.Router();
const axios = require("axios")
const Review = require("../models/review")
const Artist = require("../models/artist")
const hbs = require("express-hbs");
const helpers = require("handlebars-helpers");
const comparison = helpers.comparison()

//helpers config

// helpers.contains = function(collection, value, startIndex, options) {
//   if (typeof startIndex === 'object') {
//     options = startIndex;
//     startIndex = undefined;
//   }
//   var val = utils.contains(collection, value, startIndex);
//   return util.value(val, this, options);
// };



        /* GET home page */
router.get('/', (req, res, next) => {
  Promise.all([
    Review.find({})
      .sort({ updated_at: -1 })
      .limit(6),
    Artist.find({})
      .sort({ updated_at: -1 })
      .limit(6)
  ])
    .then(arr => {
      console.log(arr);
      res.render("index", { artist: arr[1], review: arr[0] });
    })
    .catch(err => console.log("no hay datos"));
            })


    

// VISTA DISCOGRAFÍA
router.get("/release", (req, res, next) => {
  const {release_url} = req.query

    axios
      .get(`${release_url}?key=${process.env.discogsKey}&secret=${process.env.discogsSecret}`)
      .then(response => {
        console.log(response.data)
        response.data.releases = response.data.releases.map(data => {
          if (data.type == "artist") {
            data.urlHbs = `/artist?artistId=${data.id}&image=${
              data.thumb
            }`;
          } else if (data.type == "master") {
            data.urlHbs = `/albums?masterId=${data.id}&image=${
              data.thumb
            }`;
          } else if (data.type == "release") {
            data.urlHbs = `/release?release_url=${
              data.resource_url
            }`;
          } else {
         
            
          }
          return data;
        });
        console.log(response.data)
        res.render("discography", response.data);
      })
      .catch(err =>
        res.render("discography", {
          msg: "ese album no esta disponible"
        })
      );
})

// VISTA ALBUM
router.get('/albums', (req, res, next) => {
    const {masterId, image} = req.query
    //masterulr=${ data.resource_url}&image=${data.cover_image}`;
    //https://api.discogs.com/masters/5598
        axios
          .get(
            `https://api.discogs.com/masters/${masterId}?key=${
              process.env.discogsKey
            }&secret=${process.env.discogsSecret}`
          )
          .then(response => {
           // console.log("holamundo",response.data)
            const urlImage = response.data.images[0].uri
            let songTabs = response.data.tracklist.map(song => {
              song.titleUri = encodeURIComponent(song.title);
              return song;
            });
            Review.find({ idAlbum: response.data.id }).then(elm => {
              res.render("albums", {
                album: response.data,
                review: elm,
                songTabs,
                art: response.data.artists[0].name,
                image: urlImage
              });
            });
          })
          .catch(err =>
            res.render("discography", {
              msg: "This release info is not available at the moment"
            })
          );


    })
    // Vista artista
router.get("/artist", (req, res, next) => {
    const { artistId, image } = req.query

    Artist.findOne({ idArtist:  artistId }, )
        .then(found => {
            if (!found) {
              newArt()
                return
            }
            res.render("artist-detail", found)
        })
        .catch(err=>console.log(err))

    const newArt = () => {
        axios
          .get(
            `https://api.discogs.com/artists/${artistId}?key=${
              process.env.discogsKey
            }&secret=${process.env.discogsSecret}`
          )
          .then(response => {
            console.log(response.data)
            const url = response.data.images[0].uri
            const {
              name,
              profile,
              members,
              releases_url,
            } = response.data;
        
            const newArtist = new Artist({
              name,
              profile,
              members,
              idArtist: artistId,
              image_url:url,
              release_url: releases_url
            });
            newArtist.save().then(created => {
              if (!created.members || !created.profile) {
                res.render("artist-detail", {
                  msg: "no se pudo encontrar ese artista"
                });
                return;
              }
              res.render("artist-detail", created);
            });
          })
          .catch(err =>
            res.render("artist-detail", {
              msg: "no se pudo encontrar ese artista"
            })
          );
    }
})



// VISTA BÚSQUEDA ARTISTAS


router.post("/artists", (req, res, post) => {
    axios.get(
            `https://api.discogs.com/database/search?q=${req.body.artist}&key=${process.env.discogsKey}&secret=${process.env.discogsSecret}`
        )
        .then(results => {
            //console.log("results.data", results.data)
            results.data.results = results.data.results.map(
              data => {
                console.log(data)
                if (!data.thumb.includes(".gif")) {
                  if (data.type == "artist") {
                    data.urlHbs = `/artist?artistId=${
                      data.id
                    }&image=${data.thumb}`;
                  } else if (data.type == "master") {
                    data.urlHbs = `/albums?masterId=${
                      data.master_id
                    }&image=${data.thumb}`;
                  } else if (data.type == "release") {
                    data.urlHbs = `/release?releaseId=${
                      data.id
                    }&image=${data.thumb}`;
                  } else {
                   
                  }
                }
                return data;
              }
            );
            res.render("search", { results: results.data.results });
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
            res.redirect(`/albums?masterId=${id}`)
        })
        .catch(error => console.log(error));

})




module.exports = router;