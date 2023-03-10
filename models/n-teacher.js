// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Course = require('./course');

// const teacherSchema = new Schema({
// 	name:String,
// 	email:String,
// 	password:String,
// 	description:String,
// 	courses:[{type:Schema.Types.ObjectId,ref:'Course'}]
// });

// teacherSchema.post('findOneAndDelete',async(doc)=>{
// 	if(doc){
// 		await Course.deleteMany({
// 			_id:{ $in:doc.courses }	
// 		});
// 	};
// });

// const teacher = mongoose.model('Teacher',teacherSchema);
// module.exports = teacher;