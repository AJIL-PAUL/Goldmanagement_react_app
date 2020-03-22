const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Customer } = require('../../models/customer');
var { Box, Coordinate } = require('../../models/box');

// => localhost:5000/gold/

// to deposite gold 
router.post('/', (req, res) => {
    var globals = {};
    Box.findOneAndUpdate({
        rem_weight: { $gte: req.body.weight }
    },
        {
            $inc: { rem_weight: -(req.body.weight), no_of_items: 1 },

        },
        { new: true },
        (err, doc) => {
            // console.log(doc.racket_id[0].x_cord);
            if (!err) {
                globals.coordinate = new Coordinate({
                    x_cord: doc.racket_id[0].x_cord,
                    y_cord: doc.racket_id[0].y_cord
                });
                console.log(globals.coordinate);
                var customer = new Customer({
                    customer_id: req.body.customer_id,
                    ownerName: req.body.ownerName,
                    weight: req.body.weight,
                    racket_id: [globals.coordinate],
                    status: "Not retrieved"
                });
                customer.save((err, doc) => {
                    if (!err) { res.send(doc); }
                    else {
                        console.log('Error :' + JSON.stringify(err, undefined, 2));
                        res.status(400).send(err);
                    }
                });
                console.log(doc);
            }
            else {
                console.log("Err:" + JSON.stringify(err, undefined, 2));
            }

        });
    console.log(globals.coordinate);

});

// to retrieve gold
router.post('/cust/retrieve', (req, res) => {
    // if (!ObjectId.isValid(req.param.id)) {
    //     return res.status(400).send(`No records with given id : ${req.params.id}`);
    // }
    globals = {}
    Customer.findOneAndUpdate({ customer_id: req.body.customer_id, status: "Not retrieved" },
        { $set: { status: "Retrieved" } },
        (err, doc) => {
            if (doc && !err) {
                globals.coordinate = new Coordinate({
                    x_cord: doc.racket_id[0].x_cord,
                    y_cord: doc.racket_id[0].y_cord
                });
                globals.weight = doc.weight;

                Box.findOneAndUpdate({
                    racket_id: globals.coordinate
                },
                    { $inc: { rem_weight: globals.weight, no_of_items: -1 } },
                    { new: true },
                    (err, doc) => {
                        if (!err) {
                            res.send(doc);
                            console.log(doc)
                        }
                        else {
                            console.log('Error :' + JSON.stringify(err, undefined, 2));
                            res.status(400).send(err);
                        }

                    });
            }
        })
})

// to get box details

router.get('/box/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Box.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

// get single customer details
router.post('/customer', (req, res) => {
    Customer.findOne({ customer_id: req.body.customer_id }, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
            res.status(400).send(err);
        }
    });
});

// to get not retrieved customer details
router.get('/customer/not_retrieved', (req, res) => {
    Customer.find({ status: "Not retrieved" }, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});
// to get retrieved customer details
router.get('/customer/retrieved', (req, res) => {
    Customer.find({ status: "Retrieved" }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});
// update customer details with id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var customerentry = {
        weight: req.body.weight,
        ownerName: req.body.ownerName,
        goldid: req.body.goldid,

    };
    Customer.findByIdAndUpdate(req.params.id, { $set: customerentry }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// to delete a customer
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Customer.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;