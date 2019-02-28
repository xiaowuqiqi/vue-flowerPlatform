var express = require('express');
var router = express.Router();

var User = require('../models/user')
var Goods = require('../models/goods')
var Order = require('../models/order')

/* GET users listing. */
/**
 * user页面所需要的数据
 * 访问方式
 * http://localhost:3000/serverUsers
 * */
router.get('/', function (req, res, next) {
    //测试userId
    let userId = req.session.user._id
    User.findOne({_id: userId}, function (err, doc) {
        if (err) {
            next(err)
        } else {

            if (doc) {
                let userObj = JSON.parse(JSON.stringify(doc))//doc->obj

                //注意，此处可能有错误，收藏与订单可能为空时出现错误

                pushByGoodsIdGoodsDate(res, userObj.collectionGoods, function () {
                    //添加 collectionGoods（收藏）中鲜花的详细信息
                    pushByOrderIdOrederDate(userObj.userOrder, function () {
                        //添加 userOrder（订单）中订单的详细信息
                        let orderIndex = 0
                        userObj.userOrder.forEach(function (orderItem) {
                            pushByGoodsIdGoodsDate(res, orderItem.order.orderGoods, function () {
                                //添加 order.orderGoods（订单的商品）中鲜花的详细信息
                                orderIndex++
                                console.log(orderIndex)
                                if (userObj.userOrder.length == orderIndex)
                                    res.json({
                                        status: '0',
                                        msg: '',
                                        result: userObj
                                    })
                            })

                        })
                    })
                })

            }
        }
    })
});
/**
 * cort页面所需要信息
 * */
router.get('/cart', function (req, res, next) {
    //测试userId
    let userId = req.session.user._id
    User.findOne({_id: userId}, {cart: 1}, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                let cartObj = JSON.parse(JSON.stringify(doc))//doc->obj
                pushByGoodsIdGoodsDate(res, cartObj.cart, function () {
                    res.json({
                        status: '0',
                        msg: '',
                        result: cartObj
                    })
                })
            } else {
                res.json({
                    status: '-1',
                    msg: '没有此用户',
                    result: ''
                })
            }
        }
    })
});
/**
 * 地址页面所需要信息
 * */
router.get('/address', function (req, res, next) {
    //测试userId
    let userId = req.session.user._id
    User.findOne({_id: userId}, {recAddress: 1}, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                let cartObj = JSON.parse(JSON.stringify(doc))//doc->obj
                res.json({
                    status: '0',
                    msg: '',
                    result: cartObj
                })
            } else {
                res.json({
                    status: '-1',
                    msg: '没有地址',
                    result: ''
                })
            }
        }
    })
});
/**
 * 确认订单页面所需要信息
 * */
router.get('/temporary', function (req, res, next) {
    //测试userId
    let userId = req.session.user._id
    getTemporary(res, userId, function (temObj) {
        res.json({
            status: '0',
            msg: '',
            result: temObj
        })
    })

});
let getTemporary = function (res, usersId, fn) {
    let userId = usersId
    let temporary = function () {
        return new Promise(function (resolve, reject) {
            //promise start
            User.findOne({_id: userId}, function (err, doc) {
                if (err) {
                    res.status(err.status || 500);
                    res.json({
                        status: "1",
                        msg: err.message
                    })
                } else {
                    if (doc) {
                        let docObj = JSON.parse(JSON.stringify(doc))//doc->obj
                        pushByGoodsIdGoodsDate(res, docObj.cart, function () {
                            resolve(docObj)
                        })
                    }
                }
            })
            //promise ends
        })
    }

    temporary().then(function (docObj) {
        let temObj = docObj.temporary
        let cartObj = docObj.cart
        let addObj = docObj.recAddress
        //添加详细地址数据
        addObj.forEach(function (addItem) {
            if (addItem._id == temObj.recAddressId) {
                return temObj.recAddress = addItem
            }
        })
        //添加购物车数据
        let orderGoodsArr = []
        if (temObj.checkedOne == '2') {//在购物车来的数据
            temObj.orderGoods.forEach(function (temGoodsId) {
                cartObj.forEach(function (cartItem) {
                    if (cartItem.goodsId == temGoodsId) {
                        return orderGoodsArr.push(cartItem)
                    }

                })
            })
            temObj.orderGoods = orderGoodsArr
            //返回数据
            fn(temObj)
        }
        else {//直接购买的数据
            orderGoodsArr = [{
                goodsNum: 1,
                goodsTotalPrice: '',
                goodsId: temObj.orderGoods[0]
            }]
            pushByGoodsIdGoodsDate(res, orderGoodsArr, function () {
                orderGoodsArr[0].goodsTotalPrice = orderGoodsArr[0].goods.base.price
                temObj.orderGoods = orderGoodsArr

                //返回数据
                fn(temObj)
            })
        }

    })
}
//添加//添加//添加//添加

/**
 * 添加物品到购物车
 * */
router.get('/addCart', function (req, res, next) {
    //测试userId
    let goodsId = req.query.goodsId
    let userId = req.session.user._id
    User.findOne({_id: userId}, function (err, userDoc) {
        if (err) {
            next(err)
        } else {
            if (userDoc) {
                //判断是否有此用户
                let goodsItem = '';
                userDoc.cart.forEach(function (item) {
                    if (item.goodsId == goodsId) {
                        //有此商品，商品数量+1
                        goodsItem = item
                        item.goodsNum++
                    }
                })
                if (goodsItem) {//判断是否有此商品
                    userDoc.save(function (err2, doc2) {
                        if (err2) {
                            next(err2)
                        } else {//返回商品+1完成信息
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc'
                            })
                        }
                    })
                } else {
                    //没有商品，需要查询
                    getByGoodsIdGoods(goodsId, function (doc) {
                        cartItem = {
                            goodsNum: 1,
                            goodsCheck: false,
                            goodsTotalPrice: doc.base.price,
                            goodsId: goodsId,
                            goodsPrice: doc.base.price,
                        }
                        userDoc.cart.push(cartItem)
                        userDoc.save(function (err2, doc2) {
                            if (err2) {
                                next(err2)
                            } else {//成功添加到购物车
                                res.json({
                                    status: '0',
                                    msg: '',
                                    result: 'suc'
                                })
                            }
                        })
                    })
                }
            }
            else {
                res.json({
                    status: '1',
                    msg: '查无此用户',
                    result: ''
                })
            }
        }
    })
});
/**
 * 添加地址信息
 * */
router.post('/pushAddress', function (req, res, next) {
    //测试userId
    let addName = String(req.body.addName)
    let addTel = String(req.body.addTel)
    let address = String(req.body.address)
    let userId = req.session.user._id
    User.update({_id: userId}, {
        $push: {
            'recAddress': {
                "consignee": addName,
                "Tel": addTel,
                "address": address
            }
        }
    }, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                })
            }
        }
    })
});

/**
 * 添加订单
 * */
router.post('/pushOrder', function (req, res, next) {
    let date = new Date()
    //计算总价并记录
    let getOrderTotal = function (orderGoods) {
        let goodsPrice = 0
        orderGoods.forEach(function (item) {
            goodsPrice += item.goodsNum * item.goods.base.price
        })
        return goodsPrice
    }
    //计算orderGoods
    let gotOrderGoods = function (orderGoods) {
        let orderGoodsP = []
        orderGoods.forEach(function (item, index) {
            let orderGoodsItem = {
                "orderGoodsId": index,
                //collection数组的下标
                "goodsId": item.goodsId,
                "goodsNum": item.goodsNum,
                //商品数量
                "goodsTotalPrice": item.goodsTotalPrice //商品小计
            }
            orderGoodsP.push(orderGoodsItem)
        })
        return orderGoodsP
    }


    //orderId
    const orderNumber = function (first) {

        let dateF = date.Format('yyyyMMMMddddhhmmss')
        let r = Math.floor(Math.random() * 899 + 100)
        return first + dateF + r
    }('0307')
    //测试用户的ID
    let userId = req.session.user._id

    //查询临时数据
    let getTemData = function () {
        return new Promise(function (resolve, reject) {
            //
            getTemporary(res, userId, function (temObj) {
                resolve(temObj)
            })
            //
        })
    }
    //添加订单表数据
    let pushOrd = function (_temData) {
        let temData = _temData
        return new Promise(function (resolve, reject) {
            //start
            new Order({
                "orderNumber": orderNumber,
                "orderType": "1",//订单类型1：已经支付，2：运输途中，3：订单完成
                "orderTypeName": "已经支付",
                "orderDiscount": 0,//折扣金额
                "orderTotal": getOrderTotal(temData.orderGoods),
                "orderDate": date.Format('yyyy-MM-dd') + "|" + date.Format('hh:mm:ss'),
                "sendDate": "暂无",
                "user": {
                    "userId": userId,
                    "Tel": "",
                    "Name": "",
                    "Email": ""
                },
                "orderGoods": gotOrderGoods(temData.orderGoods),
                "recAddress": {
                    "consignee": temData.recAddress.consignee,
                    "Tel": temData.recAddress.Tel,
                    "address": temData.recAddress.address
                },
                "senderName": temData.consignee,//送华人名字
                "senderTel": temData.tel,//送华人电话
                "blessing": temData.blessing,//祝福
                "remark": temData.remark//备注
            }).save(function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        resolve()
                    }
                }
            })
            //end
        })
    }
    //擦寻添加订单的订单_id
    let getOrd_Id = function (orderNumber) {
        return new Promise(function (resolve, reject) {
            Order.findOne({"orderNumber": orderNumber}, {_id: 1}, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        resolve(doc._id)
                    }
                }
            })
        })
    }
    //为用户添加订单
    let pushUserOrd = function (ordId) {
        return new Promise(function (resolve, reject) {
            //start
            User.update({_id: userId}, {
                $push: {
                    'userOrder': {
                        "orderId": ordId,
                        "orderNumber": orderNumber,
                        "orderType": '1'
                    }
                }
            }, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                        })
                    }
                }
            })
            //end
        })
    }
    let temData = {}
    getTemData().then(function (_temData) {
        temData = _temData
        return pushOrd(_temData)
    }).then(function () {

        return getOrd_Id(orderNumber)
    }).then(function (Ord_Id) {

        pushUserOrd(Ord_Id)
    })
});

/**
 * 登录
 * */
router.post('/login', function (req, res, next) {
    let Tel = String(req.body.tel || '')
    let Password = String(req.body.password || '')

    User.findOne({Tel: Tel, Password: Password}, {tel: 1}, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                req.session.user = {"tel": Tel, "_id": doc._id}
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        loginType: 2,
                        tel: Tel
                    }
                })
            } else {
                req.session.user = null
                res.json({
                    status: '4',
                    msg: '用户名密码不正确！',
                    result: ''
                })
            }
        }
    })

})
/**
 * 是否登录
 * */
router.post("/checkLogin", function (req, res, next) {
    if(req.session.user){
        res.json({
            status:"0",
            msg:'',
            result: {
                loginType: 2,
                tel: req.session.user.tel
            }
        })
    }else{
        res.json({
            status:'-1',
            msg:'没有登录',
            result:''
        })
    }

})
/**
 * 添加新用户
 * */
router.post('/pushUser', function (req, res, next) {
    let Tel = String(req.body.tel || '')
    let Password = String(req.body.password || '')
    let Email = String(req.body.email || '')
    let user = new User({
        Tel,
        Password,
        Email
    })
    let getTelCheck = function () {
        return new Promise(function (resolve, reject) {
            User.findOne({Tel: Tel}, {tel: 1}, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            })
        })
    }
    let pushUser = function () {
        return new Promise(function (resolve, reject) {
            //start
            user.save(function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        resolve()
                    }
                }
            })
            //end
        })
    }
    let getUserId = function () {
        return new Promise(function (resolve, reject) {
            User.findById(user, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        resolve(doc._id)
                    }
                }
            })
        })
    }

    getTelCheck()
        .then(function (check) {
            if (check) {//存在tel
                res.json({
                    status: '3',
                    msg: '注册手机号已存在',
                    result: ''
                })
            } else {
                return pushUser()
            }
        })
        .then(function () {
            return getUserId()
        })
        .then(function (_id) {
            req.session.user = {"tel": Tel, "_id": _id}
            res.json({
                status: '0',
                msg: '',
                result: {
                    loginType: 2,
                    tel: Tel
                }
            })
        })
})

//修改
/**
 * 注销登录
 * */
router.post('/logout', function (req, res, next) {
    req.session.user = null
    res.json({
        status: "0",
        msg: '',
        result: 'suc'
    })
})
/**
 *  修改购物车内一个物品数量与选中
 * */
router.post("/editCart", function (req, res, next) {
    let userId = req.session.user._id
    let goodsId = req.body.goodsId
    let goodsNum = req.body.goodsNum
    let goodsCheck = req.body.goodsCheck
    Goods.findOne({_id: goodsId}, {"base.price": 1}, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                let goodsPrice = doc.base.price
                User.update({_id: userId, 'cart.goodsId': goodsId}, {//更新子文档数据
                    'cart.$.goodsNum': goodsNum,
                    'cart.$.goodsCheck': goodsCheck,
                    'cart.$.goodsTotalPrice': goodsNum * goodsPrice
                }, function (err, doc) {
                    if (err) {
                        next(err)
                    } else {
                        if (doc) {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc'
                            })
                        }
                    }
                })
            }
        }
    })

})
/**
 *  修改临时数据的商品
 * */
router.post("/editTemporary", function (req, res, next) {
    let userId = req.session.user._id
    let temporary = {}
    temporary.checkedOne = req.body.checkedOne || ''
    temporary.consignee = req.body.consignee || ''
    temporary.tel = req.body.tel || ''
    temporary.recAddressId = req.body.recAddressId || ''
    temporary.remark = req.body.remark || ''
    let orderGoods = req.body.orderGoods ? req.body.orderGoods.split(",") : []
    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            next(err)
        } else {
            if (user) {
                for (let index in temporary) {
                    if (temporary[index]) {
                        user.temporary[index] = temporary[index]
                    }
                }
                if (orderGoods.length > 0)
                    user.temporary.orderGoods = orderGoods
                user.save(function (err1, doc) {
                    if (err1) {
                        next(err1)
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                        })
                    }
                })

            }
        }
    })

})
/**
 * 购物车内全选
 * */
router.post("/checkAllCart", function (req, res, next) {
    let userId = req.session.user._id
    let checkAll = req.body.checkAll
    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            next(err)
        } else {
            if (user) {
                user.cart.forEach((item) => {
                    item.goodsCheck = checkAll;
                })
                user.save(function (err1, doc) {
                    if (err1) {
                        next(err1)
                    } else {
                        res.json({
                            status: '0',
                            msg: '',
                            result: 'suc'
                        })
                    }
                })

            }
        }
    })
})

//删除//删除
/**
 * 购物车页面删除
 * */
router.post("/delCart", function (req, res, next) {
    let userId = req.session.user._id
    let goodsId = req.body.goodsId
    User.update({_id: userId}, {
        $pull: {//删除符合条件的一条元素
            cart: {
                goodsId: goodsId
            }
        }
    }, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                })
            }
        }
    })
})
/**
 * 地址页面删除
 * */
router.post("/delAddress", function (req, res, next) {
    let userId = req.session.user._id
    let addressId = req.body.addressId
    User.update({_id: userId}, {
        $pull: {//删除符合条件的一条元素
            recAddress: {
                _id: addressId
            }
        }
    }, function (err, doc) {
        if (err) {
            next(err)
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                })
            }
        }
    })
})

//工具

//查询一个数组下所有订单的详细信息，并放于该数组每个元素中的order字段中
var pushByOrderIdOrederDate = function (parents, fn) {
    if (parents.length < 1) return fn()
    let t = 0
    if (parents) {
        parents.forEach(function (item) {
            Order.findOne({"_id": item.orderId}, function (err, doc) {
                if (err) {
                    next(err)
                } else {
                    if (doc) {
                        let docObj = JSON.parse(JSON.stringify(doc))
                        t++
                        item.order = docObj
                        if (t == parents.length) {
                            fn()
                        }
                    }
                }
            })
        })
    }
}
//查询一个数组下所有鲜花的详细信息，并放于该数组每个元素中的goods字段中
var pushByGoodsIdGoodsDate = function (res, parents, fn) {
    if (parents.length < 1) return fn()
    let t = 0
    if (parents) {
        parents.forEach(function (item) {
            Goods.findOne({"_id": item.goodsId}, {base: 1}, function (err, doc) {
                if (err) {
                    res.status(err.status || 500);
                    res.json({
                        status: "1",
                        msg: err.message
                    })
                } else {
                    if (doc) {
                        let docObj = JSON.parse(JSON.stringify(doc))
                        t++
                        item.goods = docObj
                        if (t == parents.length) {
                            fn()
                        }
                    }
                }
            })
        })
    }
}
//查询根据商品id的详细信息
var getByGoodsIdGoods = function (goodsId, fn) {
    let cid = goodsId
    console.log(cid)
    Goods.findOne({"_id": goodsId}, function (err, goodsDoc) {
        if (err) {
            next(err)
        } else {
            console.log(goodsDoc)
            if (goodsDoc) {
                fn(goodsDoc)
            }

        }
    })
}


module.exports = router;
