var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchemas = new Schema({
//  花材： 勿忘我 草莓 菊花 玫瑰 百合 康乃馨 向日葵 郁金香 绣球 满天星 扶郎
//  节日： 缅怀 生日 母亲节 感恩节 中秋节 光棍节 圣诞节 妇女节 教师节 情人节
//  鲜花用途： 爱情鲜花 求婚鲜花 纪念日鲜花 生日鲜花 友情鲜花 探望病人 孝敬长辈 商务用花 缅怀日鲜花
//  按对象选花： 病人 长辈 客户 老师 领导 父母 朋友 恋人
    "material": Array,
    "festival": Array,
    "use": Array,
    "seniority": Array
})

module.exports = mongoose.model('FlowerLabels', produtSchemas, 'flowerlabels')
