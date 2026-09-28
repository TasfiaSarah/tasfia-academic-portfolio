const teaching = {
  theoryCourses: [
    {
      code: "CSE-205",
      title: "Object Oriented Programming",
      institution: "MIST, Bangladesh",
      role: "Lecturer",
      students: 85,
      semesters: ["Spring 2026", "Spring 2025"],
    },
    {
      code: "CSE-217",
      title: "Theory of Computation",
      institution: "MIST, Bangladesh",
      role: "Lecturer",
      students: 60,
      semesters: ["Spring 2024"],
    },
    {
      code: "CSE-109",
      title: "Computer Programming",
      institution: "MIST, Bangladesh",
      role: "Lecturer",
      students: 100,
      semesters: ["Fall 2025", "Fall 2024"],
    },
  ],

  sessionalCourses: [
    {
      code: "CSE-206",
      title: "Object Oriented Programming Sessional",
      students: 85,
      semesters: ["Spring 2026", "Spring 2025"],
    },
    {
      code: "CSE-204",
      title: "Data Structure and Algorithm Sessional",
      students: 45,
      semesters: ["Spring 2026"],
    },
    {
      code: "CSE-302",
      title: "Database Management System",
      students: 45,
      semesters: ["Spring 2024"],
    },
    {
      code: "CSE-308",
      title: "Operating System",
      students: 45,
      semesters: ["Spring 2024"],
    },
    {
      code: "CSE-106",
      title: "Structured Programming Language",
      students: 105,
      semesters: ["Fall 2024"],
    },
    {
      code: "CSE-110",
      title: "Computer Programming",
      students: 100,
      semesters: ["Fall 2025", "Fall 2024"],
    },
    {
      code: "CSE-104",
      title: "Digital Logic Design Sessional",
      students: 85,
      semesters: ["Fall 2025"],
    },
  ],
};

export default teaching;

export const courseAreas = [
  {
    title: 'Programming & Object-Oriented Development',
    icon: 'programming',
    description: 'Building strong programming foundations through theory, implementation, and hands-on problem solving.',
    courses: [
      ['CSE-109', 'Computer Programming'],
      ['CSE-110', 'Computer Programming Sessional'],
      ['CSE-106', 'Structured Programming Language'],
      ['CSE-205', 'Object Oriented Programming'],
      ['CSE-206', 'Object Oriented Programming Sessional'],
    ],
  },
  {
    title: 'Algorithms & Computational Foundations',
    icon: 'algorithms',
    description: 'Connecting computational thinking with data structures, algorithms, and the theoretical foundations of computing.',
    courses: [['CSE-204', 'Data Structure and Algorithm Sessional'], ['CSE-217', 'Theory of Computation']],
  },
  {
    title: 'Systems & Data',
    icon: 'systems',
    description: 'Guiding students through core system concepts, data management, and practical computing environments.',
    courses: [['CSE-302', 'Database Management System'], ['CSE-308', 'Operating System']],
  },
  {
    title: 'Digital Logic & Computing Fundamentals',
    icon: 'logic',
    description: 'Introducing hardware-oriented computing concepts through digital logic and hands-on laboratory work.',
    courses: [['CSE-104', 'Digital Logic Design Sessional']],
  },
];

// Replace paths and descriptions here when selecting new classroom photographs.
export const teachingPhotos = [
  { src: '/teaching/2.jpg', alt: 'Students and their lecturer gathered outdoors on campus', width: 1280, height: 591, position: '50% 50%' },
  { src: '/teaching/3.jpg', alt: 'Group selfie with students seated throughout a classroom', width: 1280, height: 960, position: '50% 50%' },
  { src: '/teaching/4.jpg', alt: 'Classroom group photograph in front of a projection screen', width: 1600, height: 1124, position: '50% 50%' },
  { src: '/teaching/5.jpg', alt: 'Students and faculty gathered in a computer laboratory', width: 828, height: 504, position: '50% 50%' },
  { src: '/teaching/6.jpg', alt: 'Students in uniform posing together at the front of a classroom', width: 1600, height: 836, position: '50% 50%' },
];
