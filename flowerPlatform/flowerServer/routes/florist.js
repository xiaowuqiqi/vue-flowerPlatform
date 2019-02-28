var express = require('express');
var router = express.Router();
var Florist = require('../models/florist')

router.get('/', function (req, res, next) {
    Florist.findOne({},function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                res.json({
                    status: '0',
                    msg: '',
                    result: doc
                })
            }
        }
    })
})

module.exports = router;