var express = require('express');
var router = express.Router();

var Goods = require('../models/goods')
var FlowerLabels = require('../models/label')


/**
 * 查询所有数据
 * 访问方式
 * http://localhost:3000/shopping
 * */
router.get('/', function(req, res, next) {
    Goods.find({},function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:doc
                })
            }
        }
    })
});
/**
 * 查询所有标签
 * 访问方式
 * http://localhost:3000/shopping/label
 * */
router.get('/label', function(req, res, next) {
    FlowerLabels.findOne({},function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                console.log(doc)
                res.json({
                    status:'0',
                    msg:'',
                    result:doc
                })
            }
        }
    })
});
/**
 * 根据id查询一条数据
 * 访问方式
 * http://localhost:3000/shopping/goodsId?_id=5c087f2cea3e3e2ed466b368
 * */
router.get('/goodsId', function(req, res, next) {
    let id = req.query._id
    Goods.findOne({"_id":id},function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:doc
                })
            }
        }
    })
});
/**
 * 根据id查询一条数据
 * 访问方式
 * http://localhost:3000/shopping/goodsId_base?_id=5c087f2cea3e3e2ed466b368
 * */
router.get('/goodsId_base', function(req, res, next) {
    let id = req.query._id
    Goods.findOne({"_id":id},{base:1},function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:doc
                })
            }
        }
    })
});

/**
 * 根据条件查询一条数据
 * 访问方式
 * http://localhost:3000/shopping/goodsCondition_base
 * 参数
 *  priceLevel:2  page:1  pageSize:1  goodsType:21,11  goodsType:21  sort:-1
 * */

router.post('/goodsCondition_base', function(req, res, next) {
    //返回标签集合查询
    var getGoodsType = function (goodsType) {
        if (typeof goodsType === 'undefined') return null
        var arr = goodsType.split(',')
        var obj = {$all:arr}
        return obj
    }
    //返回金额擦寻
    var getPriceLevel = function (priceLevel) {
        if (typeof priceLevel === 'undefined') return null
        let obj = {}
        switch (String(priceLevel)) {
            case 'all':
                return null
            case '0':
                obj = {
                    $gt: 0,
                    $lte: 100
                };
                break
            case '1':
                obj = {
                    $gt: 100,
                    $lte: 400,
                };
                break
            case '2':
                obj = {
                    $gt: 400
                };
                break
        }
        return obj
    }


    let params = {}//查询条件，由于全部查询，暂时为空

    if(getPriceLevel(req.body.priceLevel))//价格区间
        params["base.price"] = getPriceLevel(req.body.priceLevel)
    if(getGoodsType(req.body.goodsType))//标签属性
        params["base.goodsType.TypeId"]=getGoodsType(req.body.goodsType)

    let page = parseInt(req.body.page)//第几页 1，2，3
    let pageSize = parseInt(req.body.pageSize)//每页大小 3
    let sort = parseInt(req.body.sort)//是否排序 1，-1

    let skip = (page - 1) * pageSize//从第几条查
    //0*pageSize（8）从0条开始查
    //1*pageSize（8）从8条开始查
    //2*pageSize（8）从16条开始查

    let goodsModel = Goods.find(params,{base:1})
        .skip(skip)//从第几条查
        .limit(pageSize)//差几条
        .sort({"base.price": sort})//对base.price字段排序
    goodsModel.exec(function (err,doc) {
        if(err){
            next(err)
        }else{
            if(doc){
                res.json({
                    status:'0',
                    msg:'',
                    result:doc
                })
            }
        }
    })
});



module.exports = router;