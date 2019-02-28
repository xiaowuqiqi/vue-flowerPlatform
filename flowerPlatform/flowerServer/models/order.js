var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({

    "orderNumber": String,
    "orderType": String,//订单类型1：已经支付，2：运输途中，3：订单完成
    "orderTypeName": String,
    "orderDiscount": Number,//折扣金额
    "orderTotal": Number,
    "orderDate": String,
    "sendDate": String,
    "user": {
        "userId": String,
        "Tel": String,
        "Name": String,
        "Email": String
    },
    "orderGoods": [
        {
            "orderGoodsId": Number,
            //collection数组的下标
            "goodsId": String,
            "goodsNum": Number,
            //商品数量
            "goodsTotalPrice": Number
            //商品小计
        }
    ],
    "recAddress": {
        "consignee": String,
        "Tel": String,
        "address": String
    },
    "senderName": String,//送华人名字
    "senderTel": String,//送华人电话
    "blessing": String,//祝福
    "remark": String//备注


}, {
    versionKey: false//不需要版本号字段“__v”
})

module.exports = mongoose.model('Order', produtSchema, 'order')
