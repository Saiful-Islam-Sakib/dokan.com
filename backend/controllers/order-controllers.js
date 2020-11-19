const httpError = require('../models/http-errors');
const {validationResult} = require('express-validator');
const order = require('../models/order-model');
const customer = require('../models/customer-model');
const mongo  = require('mongoose');
const product = require('../models/product-model');

let dummy_order = [
    {
        o_id : '1',
        product : 'p1',
	    quantity : '2',
        total_amount : '1000',
        c_id : 'cus1',
        order_confirmation: 'false',
        order_delivered: 'false'
    }
];

const createNewOrder = async (req,res,next) =>{
    const err  = validationResult(req);
    if(!err.isEmpty()){
        console.log(err);
        throw new httpError('Something wrong in Order',422);
    }
    //const cus_id = req.body.cid;
    const {p_id,quantity,total_amount,c_id,order_confirmation,order_delivered,order_date} = req.body;

    // const createdorder = new order ({p_id,quantity,total_amount,c_id,order_confirmation,order_delivered,order_date});
    let customerexist;
    try{
        customerexist = await customer.findById(c_id);
    }catch(err){
        const erro = new httpError('Could not make an order',500);
        return next(erro);
    }
    if(!customerexist){
        const erro = new httpError('Could not find user',500);
        return next(erro);
    }
    let productexist;
    try{
        productexist = await product.findById(p_id);
    }catch(err){
        const erro = new httpError('Could not make an order',500);
        return next(erro);
    }
    if(!productexist){
        const erro = new httpError('Could not find product',500);
        return next(erro);
    }
    const s_id = productexist.s_id;
    const createdorder = new order ({p_id,quantity,total_amount,c_id,order_confirmation,order_delivered,order_date,s_id});
    //console.log(customerexist);
    try{
        //await createdorder.save();
        const session = await mongo.startSession();
        session.startTransaction();
        await createdorder.save({session: session});
        customerexist.orders.push(createdorder);
        await customerexist.save({session: session});
        await session.commitTransaction();
    }catch(err){
        const erro = new httpError('Could not place an order',500);
        return next(erro);
    }
    //dummy_order.push(createdorder);
    res.status(201).json({msg : 'Your Order has been placed'});
};

const getOrderbyid = async (req,res,next) =>{
    const cus_id = req.params.cid;
    let orders;
    try{
        orders = await order.find({c_id : cus_id});
    }catch(err){
        const erro = new httpError('Could not find any order',500);
        return next(erro);
    }
    if(!orders || orders === 0){
        //console.log(orders);
        throw new httpError('Order not found',404);
    }
    res.json({msg: orders.map(orders => orders.toObject({getters :true}))});
    //res.json({msg : orders});
};

const orderConfirmation = async (req,res,next) => {
    const err  = validationResult(req);
    if(!err.isEmpty()){
        console.log(err);
        throw new httpError('Not appropiate confirmation was sent',204);
    }
    const { order_confirmation } = req.body;
    const order_id = req.params.oid;
    let orderinfo;
    try{
        orderinfo = await order.findById(order_id);
        //console.log(orderinfo);
    }catch(err){
        const erro = new httpError('Could not find any order',500);
        return next(erro);
    }
    if(orderinfo.order_confirmation === order_confirmation){
        //console.log(orderinfo.order_confirmation);
        //console.log(order_confirmation);
        return res.json('Already confirmed order');
    }
    orderinfo.order_confirmation = order_confirmation;
    try{
        await orderinfo.save();
    }catch(err){
        const erro = new httpError('Something went wrong',500);
        return next(erro);
    }
    res.status(201).json({msg : 'Your order has been confirmed'});
};

const deleteOrder = async (req,res,next) => {
    const order_id = req.params.oid;
    let orderinfo;
    try{
        orderinfo = await order.findById(order_id).populate('c_id'); 
    }catch(err){
        const erro = new httpError('Order not found',500);
        return next(erro);
    }
    if(!orderinfo){
        const erro = new httpError('Order not found',500);
        return next(erro);
    }
    if(orderinfo.order_confirmation === true){
        return res.json({msg : 'Your order is already confirmed'});
    }
    try{
        //await orderinfo.remove();
        //console.log('here3');
        const session = await mongo.startSession();
        //console.log('here2');
        session.startTransaction();
        //console.log('here');
        await orderinfo.remove({session : session});
        //console.log('1');
        orderinfo.c_id.orders.pull(orderinfo);
        //console.log('2');
        await orderinfo.c_id.save({session : session});
        //console.log('3');
        await session.commitTransaction();
        //console.log('4');
    }catch(err){
        const erro = new httpError('Something went wrong',500);
        return next(erro);
    }
    return res.status(201).json({msg : 'Successfully deleted order'});
};

const orderDelivered = async (req,res,next) => {
    const err  = validationResult(req);
    if(!err.isEmpty()){
        console.log(err);
        throw new httpError('Not appropiate confirmation was sent',204);
    }
    const { order_delivered} = req.body;
    const order_id = req.params.oid;
    let orderinfo;
    try{
        orderinfo = await order.findById(order_id);
    }catch(err){
        const erro = new httpError('Could not find any order',500);
        return next(erro);
    }
    console.log(orderinfo);
    console.log(order_delivered);
    if(orderinfo.order_delivered === order_delivered){
        return res.json('Delivery already confirmed');
    }
    orderinfo.order_delivered = order_delivered;
    try{
        console.log('done');
        await orderinfo.save();
    }catch(err){
        const erro = new httpError('Something went wrong',500);
        return next(erro);
    }
    res.status(201).json({msg : 'Order delivered'});
};

exports.getOrderbyid = getOrderbyid;
exports.orderConfirmation = orderConfirmation;
exports.createNewOrder = createNewOrder;
exports.deleteOrder = deleteOrder;
exports.orderDelivered = orderDelivered;