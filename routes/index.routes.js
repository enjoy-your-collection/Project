const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => res.render('index'))

router.get('/albums', (req, res, next) => {
  const data = 
    {
    styles: [
      "Grunge"
    ],
      genres: [
        "Rock"
      ],
        videos: [],
          num_for_sale: 2204,
            title: "Nevermind",
              most_recent_release: 10967651,
                main_release: 367084,
                  main_release_url: "https://api.discogs.com/releases/367084",
                    uri: "https://www.discogs.com/Nirvana-Nevermind/master/13814",
                      artists: [
                        {
                          join: "",
                          name: "Nirvana",
                          anv: "",
                          tracks: "",
                          role: "",
                          resource_url: "https://api.discogs.com/artists/125246",
                          id: 125246
                        }
                      ],
                        versions_url: "https://api.discogs.com/masters/13814/versions",
                          data_quality: "Correct",
                            most_recent_release_url: "https://api.discogs.com/releases/10967651",
                              year: 1991,
                                images: [],
                                  resource_url: "https://api.discogs.com/masters/13814",
                                    lowest_price: 0.01,
                                      id: 13814,
                                        tracklist: [
                                          {
                                            duration: "5:01",
                                            position: "1",
                                            type_: "track",
                                            title: "Smells Like Teen Spirit"
                                          },
                                          {
                                            duration: "4:14",
                                            position: "2",
                                            type_: "track",
                                            title: "In Bloom"
                                          },
                                          {
                                            duration: "3:39",
                                            position: "3",
                                            type_: "track",
                                            title: "Come As You Are"
                                          },
                                          {
                                            duration: "3:03",
                                            position: "4",
                                            type_: "track",
                                            title: "Breed"
                                          },
                                          {
                                            duration: "4:17",
                                            position: "5",
                                            type_: "track",
                                            title: "Lithium"
                                          },
                                          {
                                            duration: "2:57",
                                            position: "6",
                                            type_: "track",
                                            title: "Polly"
                                          },
                                          {
                                            duration: "2:23",
                                            position: "7",
                                            type_: "track",
                                            title: "Territorial Pissings"
                                          },
                                          {
                                            duration: "3:43",
                                            position: "8",
                                            type_: "track",
                                            title: "Drain You"
                                          },
                                          {
                                            duration: "2:36",
                                            position: "9",
                                            type_: "track",
                                            title: "Lounge Act"
                                          },
                                          {
                                            duration: "3:32",
                                            position: "10",
                                            type_: "track",
                                            title: "Stay Away"
                                          },
                                          {
                                            duration: "3:16",
                                            position: "11",
                                            type_: "track",
                                            title: "On A Plain"
                                          },
                                          {
                                            duration: "3:51",
                                            position: "12",
                                            type_: "track",
                                            extraartists: [
                                              {
                                                join: "",
                                                name: "Kirk Canning",
                                                anv: "",
                                                tracks: "",
                                                role: "Cello",
                                                resource_url: "https://api.discogs.com/artists/261726",
                                                id: 261726
                                              }
                                            ],
                                            title: "Something In The Way"
                                          }
                                        ]
  }
  res.render('albums', data)
})

module.exports = router;
