var express = require('express');
var router = express.Router();
var Index = require('../models/index')
var Goods = require('../models/goods')

router.get('/', function (req, res, next) {
    Index.findOne({}, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                let indexDate = (JSON.parse(JSON.stringify(doc)))//doc->obj
                pushByGoodsIdGoodsDate(indexDate.goodsWell.wellGoods, function () {
                    pushByGoodsIdGoodsDate(indexDate.indexDiaries.diariesGoods, function () {
                        res.json({
                            status: '0',
                            msg: '',
                            result: indexDate
                        })
                    })

                })

            }
        }
    })

});
//在parents数组中的每一个元素下添加goods数据
//parents是含有goodsId的数组

var pushByGoodsIdGoodsDate = function (parents, fn) {
    let t = 0
    if (parents) {
        parents.forEach(function (item) {
            Goods.findOne({"_id": item.goodsId}, {base: 1}, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        t++
                        item.goods = doc
                        if (t == parents.length) {
                            fn()
                        }
                    }
                }
            })
        })
    }
}
module.exports = router;