const Course = require('./models/course');
const mongoose = require('mongoose');

const courses = [  {    "title": "Introduction to Python",    "description": "Learn the basics of Python programming language and its applications.",    "link": "https://www.example.com/courses/introduction-to-python"  },  {    "title": "Data Structures and Algorithms",    "description": "Learn common data structures and algorithms used in programming.",    "link": "https://www.example.com/courses/data-structures-and-algorithms"  },  {    "title": "Web Development with React",    "description": "Learn how to build web applications using React framework.",    "link": "https://www.example.com/courses/web-development-with-react"  },  {    "title": "Machine Learning Fundamentals",    "description": "Learn the basics of machine learning algorithms and their applications.",    "link": "https://www.example.com/courses/machine-learning-fundamentals"  },  {    "title": "Introduction to HTML and CSS",    "description": "Learn how to create websites using HTML and CSS.",    "link": "https://www.example.com/courses/introduction-to-html-css"  },  {    "title": "Introduction to Java",    "description": "Learn the basics of Java programming language and its applications.",    "link": "https://www.example.com/courses/introduction-to-java"  },  {    "title": "Mobile App Development with Flutter",    "description": "Learn how to build mobile apps using Flutter framework.",    "link": "https://www.example.com/courses/mobile-app-development-with-flutter"  },  {    "title": "Introduction to SQL",    "description": "Learn the basics of SQL programming language and its applications.",    "link": "https://www.example.com/courses/introduction-to-sql"  },  {    "title": "Full-Stack Web Development",    "description": "Learn how to build full-stack web applications using modern web technologies.",    "link": "https://www.example.com/courses/full-stack-web-development"  },  {    "title": "Introduction to Data Science",    "description": "Learn the basics of data science and its applications.",    "link": "https://www.example.com/courses/introduction-to-data-science"  }]

//connect to mongoose
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/school')
  .then(console.log('database connected'))
}

//seed data
const seedDB = async () => {
    await Course.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const c = new Course(courses[i]);
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});