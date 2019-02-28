var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({

    "Tel": String,
    "Password": String,
    "Name": String,
    "Img": String,
    "Email": String,
    "cart":[
    {
        //collection数组的下标
        "goodsId": String,
        "goodsNum": Number,
        //商品数量
        "goodsTotalPrice": Number,
        //小计
        "goodsCheck": Boolean
    }
],
    "userOrder": [//订单
    {
        "orderId":String,
        "orderNumber": String,
        "orderType": String//订单类型1：支付，2：运输，3：完成
    }
],
    "collectionGoods": [//收藏
    {
        "collectionId": Number,
        //collection数组的下标
        "goodsId": String
    }
],
    "recAddress": [//住址
    {
        "consignee":String,
        "Tel":String,
        "address":String
    }
],
    "temporary":{//临时存储
        "consignee":String,
        "tel":String,
        "recAddressId":String,
        "blessing":String,
        "remark":String,
        "orderGoods":Array,
        "checkedOne":String
    }


}, {
    versionKey: false//不需要版本号字段“__v”
})

module.exports = mongoose.model('User',produtSchema,'users')
