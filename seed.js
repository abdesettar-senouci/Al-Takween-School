// const Course = require('./models/course');
const {Student} = require('./models/user');
const mongoose = require('mongoose');
require('dotenv').config();


const courses = [  {    "title": "Introduction to Python",    "description": "Learn the basics of Python programming language and its applications.",    "link": "https://www.example.com/courses/introduction-to-python"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Data Structures and Algorithms",    "description": "Learn common data structures and algorithms used in programming.",    "link": "https://www.example.com/courses/data-structures-and-algorithms"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Web Development with React",    "description": "Learn how to build web applications using React framework.",    "link": "https://www.example.com/courses/web-development-with-react"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Machine Learning Fundamentals",    "description": "Learn the basics of machine learning algorithms and their applications.",    "link": "https://www.example.com/courses/machine-learning-fundamentals"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Introduction to HTML and CSS",    "description": "Learn how to create websites using HTML and CSS.",    "link": "https://www.example.com/courses/introduction-to-html-css"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Introduction to Java",    "description": "Learn the basics of Java programming language and its applications.",    "link": "https://www.example.com/courses/introduction-to-java"  ,'teacher':'640cbc7c2c6aff6c12680ef9'},  {    "title": "Mobile App Development with Flutter",    "description": "Learn how to build mobile apps using Flutter framework.",    "link": "https://www.example.com/courses/mobile-app-development-with-flutter"  ,'teacher':'640cbc7c2c6aff6c12680ef9'}];
const teachers = [
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password1",
      "description": "I am a seasoned computer science professor with over 10 years of experience teaching programming languages and software development."
    },
    {
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "password": "password2",
      "description": "I am a passionate educator with a specialization in mathematics, and I have been teaching for over 8 years."
    },
    {
      "name": "Bob Johnson",
      "email": "bjohnson@example.com",
      "password": "password3",
      "description": "I am a software engineer with a background in teaching computer science, and I enjoy sharing my knowledge with others."
    },
    {
      "name": "Alice Lee",
      "email": "alicelee@example.com",
      "password": "password4",
      "description": "I am a professor of statistics with a passion for teaching data analysis and statistical modeling."
    },
    {
      "name": "Mark Taylor",
      "email": "marktaylor@example.com",
      "password": "password5",
      "description": "I am a seasoned educator with a background in teaching literature, writing, and critical thinking skills."
    }
  ];
const students = [
  {
    "name": "Alice Brown",
    "email": "alicebrown@example.com",
    "password": "password1",
    "membership": "Gold",
    "membershipDate": "2022-01-01"
  },
  {
    "name": "Bob Green",
    "email": "bobgreen@example.com",
    "password": "password2",
    "membership": "Silver",
    "membershipDate": "2022-02-15"
  },
  {
    "name": "Cathy White",
    "email": "cathywhite@example.com",
    "password": "password3",
    "membership": "Bronze",
    "membershipDate": "2022-03-05"
  },
  {
    "name": "David Black",
    "email": "davidblack@example.com",
    "password": "password4",
    "membership": "Gold",
    "membershipDate": "2022-04-20"
  },
  {
    "name": "Emily Gray",
    "email": "emilygray@example.com",
    "password": "password5",
    "membership": "Silver",
    "membershipDate": "2022-05-10"
  },
  {
    "name": "Frank Red",
    "email": "frankred@example.com",
    "password": "password6",
    "membership": "Bronze",
    "membershipDate": "2022-06-25"
  },
  {
    "name": "Grace Blue",
    "email": "graceblue@example.com",
    "password": "password7",
    "membership": "Gold",
    "membershipDate": "2022-07-15"
  },
  {
    "name": "Henry Orange",
    "email": "henryorange@example.com",
    "password": "password8",
    "membership": "Silver",
    "membershipDate": "2022-08-05"
  },
  {
    "name": "Isabel Purple",
    "email": "isabelpurple@example.com",
    "password": "password9",
    "membership": "Bronze",
    "membershipDate": "2022-09-20"
  },
  {
    "name": "Jake Yellow",
    "email": "jakeyellow@example.com",
    "password": "password10",
    "membership": "Gold",
    "membershipDate": "2022-10-10"
  }
];

  
  

//connect to mongoose
// mongoose.set('strictQuery', false);
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect(process.env.MONGO_URL)
//   .then(console.log('starting seeding'));
// }
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true,})
  .then(console.log('database connected'));
};

//seed data
// const seedDB = async () => {
//     await Course.deleteMany({});
//     await Teacher.deleteMany({});
//     await Student.deleteMany({});
//     for (let i = 0; i < 10; i++) {
//       const s = new Student(students[i]);
//       await s.save();
//   };
//     for (let i = 0; i < 5; i++) {
//         const t = new Teacher(teachers[i]);
//         await t.save();
//     };
//     let t = await Teacher.findOne({});
//     for (let i = 0; i < 10; i++) {
//         courses[i].teacher=t;
//         const c = new Course(courses[i]);
//         t.courses.push(c);
//         await c.save();
//     };
//     console.log(t);
//     await t.save();
//     console.log('seeded succesfully');
// };

const seedDB = async()=>{
  const student = new Student({
    name:'default name',
    email:'default email',
    phone:0666666666,
  })
  await student.save()
}

seedDB().then(() => {
    mongoose.connection.close();
});