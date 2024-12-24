import { NextResponse } from "next/server";
import connectMongo from "@/DB/connect";
import { faker } from "@faker-js/faker";
import User from "@/model/user";
export async function GET() {
  try {
    await connectMongo();
    const userData = [];
    for (let i = 0; i < 20; i++) {
      userData.push(generateUser());
    }
    await User.insertMany(userData);
    return NextResponse.json({ message: userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing data", error },
      { status: 500 }
    );
  }
}

function generateUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "Mentor",
    bio: faker.lorem.sentence(100),
    skills: formatArr(
      Array.from({ length: 15 }, () => faker.helpers.arrayElement(skills))
    ),
    image: Math.floor(Math.random() * 10) + 1,
    interests: formatArr(
      Array.from({ length: 15 }, () => faker.helpers.arrayElement(interests))
    ),
    xp: Math.floor(Math.random() * 100) + 1,
  };
}
function formatArr(Arr: string[]) {
  let str = "";
  Arr.map((i) => {
    str += i + ",";
  });
  return str;
}
const skills = [
  "JavaScript ES6+",
  "React",
  "Node.js",
  "Express.js",
  "TypeScript",
  "Redux",
  "Next.js",
  "Angular",
  "Vue.js",
  "Webpack",
  "Babel",
  "Jest ",
  "Mocha ",
  "Chai ",
  "GraphQL",
  "REST APIs",
  "MongoDB with Mongoose",
  "PostgreSQL with Sequelize",
  "Firebase",
  "Axios",
  "Socket.IO",
  "D3.js ",
  "Three.js ",
  "Electron.js ",
  "npm/Yarn ",
  "JavaScript Design Patterns",
  "TDD ",
  "Functional Programming",
  "Object-Oriented Programming ",
  "Asynchronous Programming ",
  "Service Workers",
  "PWA ",
  "WebSockets",
  "WebRTC",
  "HTML Canvas",
  "CSS-in-JS ",
  "State Management ",
  "Local Storage / Session Storage",
  "Browser Storage APIs ",
  "Internationalization ",
  "Command Line Interface  Tools",
  "Express Middleware",
  "Authentication ",
  "CORS ",
  "Web Accessibility ",
  "Web Performance Optimization",
  "Progressive Enhancement",
  "Unit Testing",
  "End-to-End Testing ",
  "Code Bundling & Minification",
];

const interests = [
  "Web Development",
  "Front-End Development",
  "Back-End Development",
  "Full-Stack Development",
  "Mobile Development ",
  "UX/UI Design",
  "Open Source Contributions",
  "Progressive Web Apps ",
  "API Development",
  "Data Visualization",
  "Gaming ",
  "Automation ",
  "Cloud Computing ",
  "Cybersecurity",
  "DevOps",
  "Code Quality & Refactoring",
  "Serverless Architecture",
  "Cloud Databases",
  "Microservices",
  "Agile/Scrum Methodologies",
  "Web Security ",
  "AI/ML ",
  "Design Systems",
  "Automation Testing",
  "Code Reviews",
  "Browser Extensions",
  "Chatbots",
  "Content Management Systems ",
  "Blogging",
  "Web Performance Optimization",
  "Node.js APIs",
  "Virtual Reality ",
  "WebAssembly",
  "Cross-Platform Development",
  "Code Mentoring",
  "API Testing ",
  "Data Privacy",
  "Social Media Integrations",
  "Blockchain Development",
  "Event-Driven Programming",
  "Time Series Data",
  "Augmented Reality",
  "UX Research",
  "SaaS Development",
  "Podcasting",
  "Digital Marketing",
  "Crypto Development",
  "Tech Meetups",
  "Cloud Storage Solutions",
];
