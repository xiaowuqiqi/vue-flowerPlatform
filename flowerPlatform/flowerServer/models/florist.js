var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({

    "floristMod":{
    "name":String,
        "dateLength":Number,
        "date":[
        {
            "title": String,
            "content": String,
            "imgUrl": String,
            "weChat":{
                "imgUrl": String,
                "weChatName":String
            },
            "tel":String
        }
    ]

}

})

module.exports = mongoose.model('Florist',produtSchema,'florist')