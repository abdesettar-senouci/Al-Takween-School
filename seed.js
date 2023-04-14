const Course = require('./models/course');
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

// const newCourses = [  {    title: "Introduction to Python",    description: "Learn the basics of Python programming language and start your journey as a developer!",    img: "https://example.com/python.jpg",    category: "Programming",    type: "online",    price: 99.99,    hours: 20,    certificate: true,    subscribe: true,    students: [ObjectId("60f2d024d1067d06d69c62b5"), ObjectId("60f2d024d1067d06d69c62b6")],
// waitlist: [ObjectId("60f2d024d1067d06d69c62bb"), ObjectId("60f2d024d1067d06d69c62bc")],
// teacher: ObjectId("60f2d024d1067d06d69c62af")
// },
// {
// title: "Photography for Beginners",
// description: "Master the art of photography with this comprehensive course for beginners!",
// img: "https://example.com/photography.jpg",
// category: "Arts",
// type: "on site",
// price: 149.99,
// hours: 30,
// certificate: true,
// subscribe: true,
// students: [ObjectId("60f2d024d1067d06d69c62b7")],
// waitlist: [ObjectId("60f2d024d1067d06d69c62bd"), ObjectId("60f2d024d1067d06d69c62be")],
// teacher: ObjectId("60f2d024d1067d06d69c62b0")
// },
// {
// title: "Digital Marketing Fundamentals",
// description: "Learn the core concepts and strategies of digital marketing and boost your online presence!",
// img: "https://example.com/digital-marketing.jpg",
// category: "Business",
// type: "online",
// price: 199.99,
// hours: 40,
// certificate: true,
// subscribe: true,
// students: [ObjectId("60f2d024d1067d06d69c62b8"), ObjectId("60f2d024d1067d06d69c62b9"), ObjectId("60f2d024d1067d06d69c62ba")],
// waitlist: [ObjectId("60f2d024d1067d06d69c62bf")],
// teacher: ObjectId("60f2d024d1067d06d69c62b1")
// },
// {
// title: "Yoga for Stress Relief",
// description: "Reduce stress, improve flexibility, and boost your energy with this relaxing yoga course.",
// img: "https://example.com/yoga.jpg",
// category: "Fitness",
// type: "on site",
// price: 79.99,
// hours: 15,
// certificate: false,
// subscribe: true,
// students: [ObjectId("60f2d024d1067d06d69c62c0"), ObjectId("60f2d024d1067d06d69c62c1"), ObjectId("60f2d024d1067d06d69c62c2"), ObjectId("60f2d024d1067d06d69c62c3"), ObjectId("60f2d024d1067d06d69c62c4")],
// waitlist: [],
// teacher: ObjectId("60f2d024d1067d06d69c62b2")}]

const courses2 =[
  {
    title: "Introduction to Python",
    description: "Learn the basics of Python programming language and start your journey as a developer!",
    img: "https://example.com/python.jpg",
    category: "Programming",
    type: "online",
    price: 99.99,
    hours: 20,
    certificate: true,
    subscribe: true,
    users: [
      {
        username: "John Doe",
        googleId: "1234567890",
        email: "johndoe@example.com",
        role: "student",
        img: "https://example.com/johndoe.jpg",
        appliedCourses: [],
        enrolledCourses: [],
        teachers: [],
        academicLevel: "Bachelor's degree",
        phone: "123-456-7890",
        address: "123 Main St, Anytown USA",
        dateOfBirth: new Date("1990-01-01T00:00:00.000Z")
      },
      {
        username: "Jane Smith",
        googleId: "0987654321",
        email: "janesmith@example.com",
        role: "student",
        img: "https://example.com/janesmith.jpg",
        appliedCourses: [],
        enrolledCourses: [],
        teachers: [],
        academicLevel: "Master's degree",
        phone: "555-555-5555",
        address: "456 Broadway, Anytown USA",
        dateOfBirth: new Date("1995-05-05T00:00:00.000Z")
      }
    ],
    teacher: "60f2d024d1067d06d69c62af"
  },
  {
    title: "Photography for Beginners",
    description: "Master the art of photography with this comprehensive course for beginners!",
    img: "https://example.com/photography.jpg",
    category: "Arts",
    type: "on site",
    price: 149.99,
    hours: 30,
    certificate: true,
    subscribe: true,
    users: [
      {
        username: "Alice Jones",
        googleId: "abcdefghij",
        email: "alicejones@example.com",
        role: "student",
        img: "https://example.com/alicejones.jpg",
        appliedCourses: [],
        enrolledCourses: [],
        teachers: [],
        academicLevel: "High school diploma",
        phone: "555-123-4567",
        address: "789 Main St, Anytown USA",
        dateOfBirth: new Date("2000-12-31T00:00:00.000Z")
      }
    ],
    teacher: "60f2d024d1067d06d69c62b0"
  },
  {
    title: "Digital Marketing Fundamentals",
    description: "Learn the core concepts and strategies of digital marketing and boost your online presence!",
    img: "https://example.com/digital-marketing.jpg",
    category: "Business",
    type: "online",
    price: 199.99,
    hours: 40,
    certificate: true,
    subscribe: true,
    users: [
      {
        username: "Bob Johnson",
        googleId: "ijklmnopqr",
        email: "bobjohnson@example.com",
        role: "student",
        img: "https://example.com/bobjohnson.jpg",
        appliedCourses: [],
        enrolledCourses: [],
        teachers: [],
        academicLevel: "Associate's degree",
        phone: "555-987-6543",
      }
    ],
    teacher: "60f2d024d1067d06d69c62b0"
  }
]


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

const seedCourses = async()=>{
  for(course of courses2){
    const newCourse = await new Course({
    title: course.title,
    description: course.description,
    img: course.img,
    category: course.category,
    type: course.type,
    price: course.price,
    hours: course.hours,
    certificate: course.certificate,
    subscribe: course.subscribe,
    students: course.users,
    teacher:'berbague chmisou',
    }).save()
  }
}

seedCourses().then(()=>{
  mongoose.connection.close();
})

// seedDB().then(() => {
//     mongoose.connection.close();
// });