'use client';

import { schoolsData } from '../data/schoolsData';
import { degreesData } from '../data/degreesData';
import { featuredBlogs } from '../data/blogsData';
import { vacanciesData } from '../data/vacanciesData';

const KEYS = {
  COLLEGES: 'edulink_colleges',
  COURSES: 'edulink_courses',
  BLOGS: 'edulink_blogs',
  VACANCIES: 'edulink_vacancies',
  APPLICATIONS: 'edulink_applications',
  ACTIVITIES: 'edulink_activities'
};

// Initial Mock Applications
const INITIAL_APPLICATIONS = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "9841234567",
    type: "Admission", // Admission or Job
    targetName: "St. Xavier's College", // College or Job Title
    details: "Applied for STEM Program, GPA 3.8",
    status: "Pending", // Pending, Approved, Rejected
    date: "2026-07-10"
  },
  {
    id: 2,
    name: "Sita Khadka",
    email: "sita.khadka@outlook.com",
    phone: "9812345678",
    type: "Job",
    targetName: "Senior English Teacher",
    details: "M.Ed. with 5 years experience, resume attached",
    status: "Approved",
    date: "2026-07-09"
  },
  {
    id: 3,
    name: "Rohan Shrestha",
    email: "rohan.shrestha@gmail.com",
    phone: "9801122334",
    type: "Admission",
    targetName: "Kathmandu Model Secondary School (KMSS)",
    details: "Applied for Computer Science, GPA 3.9",
    status: "Rejected",
    date: "2026-07-08"
  },
  {
    id: 4,
    name: "Pooja Adhikari",
    email: "pooja.adhikari@yahoo.com",
    phone: "9851098765",
    type: "Job",
    targetName: "Administrative Assistant",
    details: "BBS Graduate, strong typing and MS Office skills",
    status: "Pending",
    date: "2026-07-08"
  }
];

const INITIAL_ACTIVITIES = [
  { id: 1, text: "Aarav Sharma submitted an admission application.", time: "2 hours ago", type: "admission" },
  { id: 2, text: "New blog post 'Understanding $+2$ Admission Criteria in Nepal' published.", time: "4 hours ago", type: "blog" },
  { id: 3, text: "Updated program fees for St. Xavier's College.", time: "1 day ago", type: "college" },
  { id: 4, text: "Job vacancy 'Senior English Teacher' status updated to Approved.", time: "2 days ago", type: "job" }
];

// Helper to check if window/localStorage is available
const isBrowser = () => typeof window !== 'undefined';

const getStorageItem = (key, fallback) => {
  if (!isBrowser()) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading key ${key} from localStorage:`, error);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key ${key} to localStorage:`, error);
  }
};

// Initialize database
export function initializeDB() {
  if (!isBrowser()) return;

  if (!localStorage.getItem(KEYS.COLLEGES)) {
    setStorageItem(KEYS.COLLEGES, schoolsData);
  }
  if (!localStorage.getItem(KEYS.COURSES)) {
    setStorageItem(KEYS.COURSES, degreesData);
  }
  if (!localStorage.getItem(KEYS.BLOGS)) {
    setStorageItem(KEYS.BLOGS, featuredBlogs);
  }
  if (!localStorage.getItem(KEYS.VACANCIES)) {
    setStorageItem(KEYS.VACANCIES, vacanciesData);
  }
  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    setStorageItem(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  if (!localStorage.getItem(KEYS.ACTIVITIES)) {
    setStorageItem(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
}

// Getters & Setters
export function getColleges() {
  initializeDB();
  return getStorageItem(KEYS.COLLEGES, schoolsData);
}

export function saveColleges(colleges) {
  setStorageItem(KEYS.COLLEGES, colleges);
}

export function getCourses() {
  initializeDB();
  return getStorageItem(KEYS.COURSES, degreesData);
}

export function saveCourses(courses) {
  setStorageItem(KEYS.COURSES, courses);
}

export function getBlogs() {
  initializeDB();
  return getStorageItem(KEYS.BLOGS, featuredBlogs);
}

export function saveBlogs(blogs) {
  setStorageItem(KEYS.BLOGS, blogs);
}

export function getVacancies() {
  initializeDB();
  return getStorageItem(KEYS.VACANCIES, vacanciesData);
}

export function saveVacancies(vacancies) {
  setStorageItem(KEYS.VACANCIES, vacancies);
}

export function getApplications() {
  initializeDB();
  return getStorageItem(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
}

export function saveApplications(applications) {
  setStorageItem(KEYS.APPLICATIONS, applications);
}

export function getActivities() {
  initializeDB();
  return getStorageItem(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
}

export function logActivity(text, type = 'info') {
  if (!isBrowser()) return;
  const activities = getStorageItem(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  const newActivity = {
    id: Date.now(),
    text,
    time: "Just now",
    type
  };
  setStorageItem(KEYS.ACTIVITIES, [newActivity, ...activities.slice(0, 19)]);
}
