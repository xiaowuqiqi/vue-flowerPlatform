var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "indexScroll": {
        "name": String,
        "indexScrollLength": Number,
        "indexScrollDate": [
            {
                "title": String,
                "smallTitle": String,
                "target": {
                    "url": String,
                    "Name": String
                }
            }
        ]
    },
    "goodsWell": {
        "name": String,
        "wellGoodsLength": Number,
        "wellGoods": [
            //6
            {
                "wellId": Number,
                //wellGoods数组的下标
                "goodsId": String,
                "wellType": String,
                "wellName": String
            }
        ]
    },
    "indexDiaries": {
        "name": String,
        "diariesGoodsLength": Number,
        "diariesGoods": [
            {
                "diariesId": Number,
                //diariesGoods数组的下标
                "goodsId": String,
                "title": String,
                "createdate": String,
                "weather": String,
                "author": String,
                "content": String,
                "imgUrl": String
            }
        ]
    },
    "indexQuestions": {
        "name": String,
        "datesLength": Number,
        "dates": [
            {
                "title": String,
                "content": String
            }
        ]
    },
    "indexStorefronts": {
        "name": String,
        "datesLength": Number,
        "dates": [
            {
                "title": String,
                "content": String,
                "imgUrl": String,
                "url":String
            }
        ]
    }
})

module.exports = mongoose.model('Index', produtSchema, 'indexs')
//参数：模板名字，模板，表名字
//把模型输出，基于模型可以调用他的API方法
//如果不加第三个参数，第三个参数默认是第一个参数+“s”，即：Good+s=goods