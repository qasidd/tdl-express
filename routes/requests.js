'use strict';

const { TDL } = require('../config/db');
const router = require('express').Router();

router.get("/read/getAll", (req, res, next) => {
    TDL.find((err, results) => {
        if (err) {
            next(err);
        } else {
            res.send(results);
        }
    })
});

router.get("/read/:id", (req, res, next) => {
    TDL.findById(req.params.id, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send(result);
        }
    })
});

router.get("/read/getCompleted", (req, res, next) => {
    TDL.find({ completed: true }, (err, results) => {
        if (err) {
            next(err);
        } else {
            res.send(results);
        }
    })
});

router.delete("/delete/:id", (req, res, next) => {
    TDL.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            next(err);
        }
    })
    res.status(204).send(`Delete successful`);
});

router.post("/create", (req, res, next) => {
    const item = new TDL(req.body);

    item.save()
        .then((result) => {
            console.log(result);
            res.status(201).send(`${result.title} added`);
        })
        .catch((err) => next(err));
});

router.put("/update/:id", (req, res, next) => {
    const { title, completed } = req.query;
    TDL.findByIdAndUpdate(req.params.id, { title, completed }, { new: true }, (err, result) => {
        if (err) {
            next(err);
        }
        res.status(201).send(`${result.title} updated`);
    })
});

router.patch("/update/:id", (req, res, next) => {
    TDL.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(202).send(`Successfully updated!`);
        }
    })
});

module.exports = router;