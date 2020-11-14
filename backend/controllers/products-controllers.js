const httpError = require('../models/http-errors');

let dummy_product = [
    {
        p_id : 'p1',
        name : 'ACI Pure Premium Maida 1 kg',
        brand: 'ACI',
        price : '48',
        category : 'consumer_food',
        sub_category: 'flour',
        tag : ['ata','moyda','flour','ACI','Maida'],
        s_id : 'sell1',
        sh_name: 'Shohag store'
    },
    {
        p_id : 'p2',
        name : 'Miniket Rice 5 kg',
        brand: 'Bashundhara',
        price : '300',
        category : 'consumer_food',
        sub_category: 'rice',
        tag : ['cal','chal','rice','Miniket','Bashundhara'],
        s_id : 'sell1',
        sh_name: 'Shohag store'
    },
    {
        p_id : 'p3',
        name : 'Air Freshner',
        brand: 'ACI',
        price : '570',
        category : 'Toiletries',
        sub_category: 'Air freshner',
        tag : ['freser','freshner','air freshner','ACI'],
        s_id : 'sell2',
        sh_name: 'Dani store'
    }
];

const getproductbyid = (req,res,next) =>{
    const prod_id = req.params.pid;
    const prod_info = dummy_product.find(a =>{
        return a.p_id == prod_id;
    });
    if (!prod_info){
        throw new httpError('Could not find the provided Product.',404);
    }
    res.json({prod_info});
};

const createproduct = (req,res,next) => {
    const {p_id, name,brand,price,category,sub_category,tag,s_id } = req.body;
    const createdprod = {
        p_id, name,brand,price,category,sub_category,tag,s_id
    };
    dummy_product.push(createdprod);
    res.status(201).json({msg : 'New Product added'});
};

const deleteproduct = (req,res,nest) => {
    const del_prod = req.body.pid;
    dummy_product = dummy_product.filter(p => p.id !== del_prod);
    res.status(200).json({msg : 'Product Deleted'});
};

const productSearch  = (req,res,next) => {
    const pname = req.params.pname;
    const dum_prod = dummy_product.filter(p => p.name === pname);
    if(dum_prod.length === 0){
        return res.status(404).json({msg : 'Product not found'});
    }
    res.status(200).json(dum_prod);
};
const prodSearchbyCategory = (req ,res ,next) =>{
    const p_cat = req.params.pcat;
    const dum_product = dummy_product.filter(p => p.category === p_cat);
    if(dum_product.length === 0){
        return res.status(404).json({msg : 'Product not found'});
    }
    res.status(200).json(dum_product);
};

exports.getproductbyid = getproductbyid;
exports.createproduct = createproduct;
exports.deleteproduct = deleteproduct;
exports.productSearch = productSearch;
exports.prodSearchbyCategory = prodSearchbyCategory;