module.exports = function catchAsync(f){
    return (req,res,next)=>{
        f(req,res,next).catch(next);
    };
};

