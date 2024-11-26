const assignments = [
  {
    id: 1,
    course: 'Computer Science',
    title: 'Homework 1',
    dueDate: '2024-11-30T23:59:00Z',
    priority: 'High',
  },
  {
    id: 2,
    course: 'Advanced Mathematics',
    title: 'Quiz 2',
    dueDate: '2024-12-02T23:59:00Z',
    priority: 'Medium',
  },
];

const users = [
  {
    id: 1,
    username: 'student1',
    password: 'password1',
    name: 'Dexter Smith',
    phoneNumber: '+1234567890',
    preferences: {
      notifications: true,
    },
  },
  {
    id: 2,
    username: 'student2',
    password: 'password2',
    name: 'Tom Bacrich',
    phoneNumber: '+1987654321',
    preferences: {
      notifications: true,
    },
  },
];

module.exports = { assignments, users };
