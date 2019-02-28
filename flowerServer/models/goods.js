var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "base": {
        "goodsName": String,
        "originalprice": Number,
        "price": Number,
        "material": String,
        //材料
        "packaging": String,
        //包装
        "recommend": Boolean,
        //推荐属性
        "quality": Boolean,
        //精品属性
        "goodsType": [
            {
                "TypeId": String,
                "TypeTitle": String
            }
        ],
        "CoverImgUrl": String
    },
    "detailed": {
        "record": {
            "clickheat": Number,
            "praiseheat": Number,
            "collectionheat": Number,
            "purchaseheat": Number
        },
        "detail": {
            "reason": String,
            "specifications": String,
            "brandstory": String,
            "maintenance": String,
            "transport": String,
            "remind": String,
            "returnorexchange": String
        },
        "ItemImgUrls": Array
    }
})

module.exports = mongoose.model('Goods',produtSchema,'goods')