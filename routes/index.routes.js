const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get("/artist", (req, res, next) => {
    const artist = {
        profile: "Vienna-born, Los Angeles-based electronic music composer, producer, remixer, and DJ. His professional output of music began in 1994, and he has since released four albums on [l715], as well as releases on [l779], [l959], [l1493], [l446357], [l361], [l98], and his own label [l=Palette Recordings] which he founded in 1996, and his own studio [l1611347]. He has remixed well over 100 songs for the likes of The Postal Service, Bomb the Bass, Télépopmusic, Kevin Saunderson, Way Out West, The Field, Darren Emerson, Gui Boratto, Simian Mobile Disco, and many more.",
        name: "John Tejada",
        releases: [{
                stats: {
                    community: {
                        in_collection: 231,
                        in_wantlist: 1745
                    }
                },
                thumb: "",
                title: "Love Buzz b/w Big Cheese",
                main_release: 392900,
                artist: "Nirvana",
                role: "Main",
                year: 1988,
                resource_url: "https://api.discogs.com/masters/155876",
                type: "master",
                id: 155876
            },
            {
                stats: {
                    community: {
                        in_collection: 531,
                        in_wantlist: 2929
                    }
                },
                thumb: "",
                title: "Bleach",
                main_release: 2795554,
                artist: "Nirvana",
                role: "Main",
                year: 1989,
                resource_url: "https://api.discogs.com/masters/13773",
                type: "master",
                id: 13773
            },
            {
                stats: {
                    community: {
                        in_collection: 483,
                        in_wantlist: 239
                    }
                },
                thumb: "",
                title: "Blew",
                main_release: 531354,
                artist: "Nirvana",
                role: "Main",
                year: 1989,
                resource_url: "https://api.discogs.com/masters/42479",
                type: "master",
                id: 42479
            }
        ],
        members: [{
                active: true,
                resource_url: "https://api.discogs.com/artists/203017",
                id: 203017,
                name: "Dave Grohl"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/251654",
                id: 251654,
                name: "Chad Channing"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/252301",
                id: 252301,
                name: "Dan Peters"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/261337",
                id: 261337,
                name: "Dale Crover"
            },
            {
                active: true,
                resource_url: "https://api.discogs.com/artists/275118",
                id: 275118,
                name: "Kurt Cobain"
            },
            {
                active: true,
                resource_url: "https://api.discogs.com/artists/281754",
                id: 281754,
                name: "Krist Novoselic"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/441072",
                id: 441072,
                name: "Jason Everman"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/455772",
                id: 455772,
                name: "Aaron Burckhard"
            },
            {
                active: true,
                resource_url: "https://api.discogs.com/artists/975603",
                id: 975603,
                name: "Georg Ruthenberg"
            },
            {
                active: false,
                resource_url: "https://api.discogs.com/artists/5525291",
                id: 5525291,
                name: "Dave Foster (14)"
            }
        ],
        releases_url: "https://api.discogs.com/artists/125246/releases",
        id: 125246,
    };
    res.render("artist", artist)
})
router.get("/release/:artist_id", (req, res, next) => {
    const id_artist = req.params.artist_id
    console.log(id_artist)
    const release = {
        pagination: {
            per_page: 50,
            pages: 29,
            page: 1,
            urls: {
                last: "https://api.discogs.com/artists/125246/releases?per_page=50&page=29",
                next: "https://api.discogs.com/artists/125246/releases?per_page=50&page=2"
            },
            items: 1427
        },
        releases: [{
                stats: {
                    community: {
                        in_collection: 231,
                        in_wantlist: 1745
                    }
                },
                thumb: "",
                title: "Love Buzz b/w Big Cheese",
                main_release: 392900,
                artist: "Nirvana",
                role: "Main",
                year: 1988,
                resource_url: "https://api.discogs.com/masters/155876",
                type: "master",
                id: 155876
            },
            {
                stats: {
                    community: {
                        in_collection: 532,
                        in_wantlist: 2929
                    }
                },
                thumb: "",
                title: "Bleach",
                main_release: 2795554,
                artist: "Nirvana",
                role: "Main",
                year: 1989,
                resource_url: "https://api.discogs.com/masters/13773",
                type: "master",
                id: 13773
            },
            {
                stats: {
                    community: {
                        in_collection: 484,
                        in_wantlist: 239
                    }
                },
                thumb: "",
                title: "Blew",
                main_release: 531354,
                artist: "Nirvana",
                role: "Main",
                year: 1989,
                resource_url: "https://api.discogs.com/masters/42479",
                type: "master",
                id: 42479
            },
            {
                stats: {
                    community: {
                        in_collection: 1914,
                        in_wantlist: 456
                    }
                },
                thumb: "",
                title: "Sliver",
                main_release: 368047,
                artist: "Nirvana",
                role: "Main",
                year: 1990,
                resource_url: "https://api.discogs.com/masters/13934",
                type: "master",
                id: 13934
            },
            {
                status: "Accepted",
                stats: {
                    community: {
                        in_collection: 56,
                        in_wantlist: 113
                    }
                },
                thumb: "",
                format: "CD, Single, Promo",
                title: "On A Plain",
                label: "DGC",
                role: "Main",
                year: 1991,
                resource_url: "https://api.discogs.com/releases/2659685",
                artist: "Nirvana",
                type: "release",
                id: 2659685
            }
        ]
    }

    res.render("release", release)
})

module.exports = router;