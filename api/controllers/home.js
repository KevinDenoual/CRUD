const etoileModel = require('../database/model');
const path = require('path');
const fs = require('fs')

module.exports = {

    get: async (req, res) => {
        const dbEtoileModel = await etoileModel.find(req.params.id)
        res.render('home', { dbEtoileModel })
    },

    post: async (req, res) => {
        etoileModel.create(
            {
                etoile: req.body.etoile,
                type: req.body.type,
                distance: req.body.distance,
                imgEtoile: `/assets/images/${req.file.originalname}`,   
                name: req.file.originalname

            }
        ),
            res.redirect('/')
    },

    delete: async (req, res) => {
        const dbEtoile = await etoileModel.findById(req.params.id)
        const query = { _id: req.params.id }
        const pathImg = path.resolve("public/images/" + dbEtoile.name)

        etoileModel.deleteOne(
            query,
            (err) => {
                if (!err) {
                    fs.unlink(pathImg,
                        (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('File Deleted')
                                res.redirect('/')
                            }
                        })
                } else {
                    res.send(err)
                }
            })
    },

    getEdition: (req, res) => {
        const query = { _id: req.params.id }
        etoileModel.findOne(
            query,
            (err, item) => {
                if (!err) {
                    res.render('edition', {

                        _id: item.id,
                        etoile: item.etoile,
                        type: item.type,
                        distance: item.distance,

                    })
                } else {
                    res.send(err)
                }
            }
        )
    },

    put: (req, res) => {
        const query = { _id: req.params.id }
        if (!req.file) {
            if (!req.body) {
                console.log('no req.body')
            } else if (req.body) {

                etoileModel.findOneAndUpdate(
                    query,
                    {
                        etoile: req.body.etoile,
                        type: req.body.type,
                        distance: req.body.distance,
                    },
                    { multi: true },
                    (err) => {
                        if (!err) {
                            res.redirect('/')
                        } else {
                            res.send(err)
                        }
                    })
            } else {
                console.log('no req.file');
            }
        } else {
            etoileModel.findOneAndUpdate(
                query,
                {
                    etoile: req.body.etoile,
                    type: req.body.type,
                    distance: req.body.distance,
                    name: req.body.originalname,
                    image: `/assets/images/${req.file.originalname}`
                },
                { multi: true },
                (err) => {
                    if (!err) {
                        res.redirect('/')
                    } else {
                        res.send(err)
                    }
                })
        }
    }






}
