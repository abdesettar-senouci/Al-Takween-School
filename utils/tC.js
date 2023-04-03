module.exports = (tfunc)=>{
    try{
        tfunc();
    }catch(e){
        res.status(500).send(e);
    }
}