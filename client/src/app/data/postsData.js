export const categories = [
  'All',
  'Notices',
  'Q&A',
  'Study Groups',
  'General'
];

export const initialPosts = [
  {
    id: 1,
    title: "Tribhuvan University BBA Entrance Exam (CMAT) Registration Date Extended",
    content: "For all students planning to enroll in BBA, BIM, BBM, or BHM courses under Tribhuvan University, the Faculty of Management has officially extended the CMAT form submission deadline until July 25, 2026. The entrance examination has been rescheduled for August 8, 2026. Make sure to download your admit card online and check your exam centers three days prior.",
    category: "Notices",
    author: "EduLink Official Updates",
    authorRole: "EduLink Coordinator",
    authorImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
    date: "July 09, 2026",
    likes: 45,
    commentsCount: 2,
    views: 890,
    tags: ["TU", "CMAT", "Notices", "Admissions"],
    comments: [
      {
        id: 101,
        author: "Aarav Sharma",
        authorRole: "BBA Aspirant",
        authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        content: "This is a lifesaver. I was waiting for my Class 12 character certificate. Do we need it for CMAT registration?",
        date: "July 09, 2026"
      },
      {
        id: 102,
        author: "EduLink Official Updates",
        authorRole: "EduLink Coordinator",
        authorImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
        content: "@Aarav You can upload a temporary provisional mark sheet or your grade 11 marksheet if grade 12 results are not fully compiled yet.",
        date: "July 09, 2026"
      }
    ]
  },
  {
    id: 2,
    title: "Which is better for Computer Science in Kathmandu: Pulchowk Campus or St. Xavier's College?",
    content: "I am really confused between studying B.E. Computer Engineering at Pulchowk Campus (IOE) and B.Sc. CSIT at St. Xavier's College. Pulchowk has the government tag and cheaper fees, but St. Xavier's offers a more structured timeline and high academic discipline. I want to build a career in AI and machine learning. Which college offers better internship/placement opportunities, faculty support, and peer group for software development?",
    category: "Q&A",
    author: "Rohan Adhikari",
    authorRole: "+2 Science Graduate",
    authorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    date: "July 08, 2026",
    likes: 38,
    commentsCount: 2,
    views: 1250,
    tags: ["CSIT", "IOE", "Computer Engineering", "College Review"],
    comments: [
      {
        id: 201,
        author: "Niranjan Gupta",
        authorRole: "Software Engineer at F1Soft",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "If you get a regular/scholarship seat at Pulchowk, choose Pulchowk. The peer group is outstanding, which matters most for dev careers. Otherwise, St. Xavier's CSIT is a fantastic alternative with a lighter academic structure (more time for self-study).",
        date: "July 08, 2026"
      },
      {
        id: 202,
        author: "Sujata Thapa",
        authorRole: "Pulchowk CS Student",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "For AI/ML, neither curriculum is perfect. You will have to self-study anyway. Pulchowk labs are decent, but student clubs (like LOCUS) are where the real learning happens.",
        date: "July 09, 2026"
      }
    ]
  },
  {
    id: 3,
    title: "IOE Entrance Prep: Daily Physics Practice Thread (Mechanics)",
    content: "Welcome to our daily study group thread! Today we are focusing on Mechanics. Feel free to share complex numerical questions, shortcut formulas, or cheat sheets for Rotational Dynamics and Conservation laws. Let's solve them together. Question of the day: A block of mass m is attached to a pulley of mass M and radius R. What is the acceleration of the block when released?",
    category: "Study Groups",
    author: "Prabin Shrestha",
    authorRole: "IOE Entrance Mentor",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "July 07, 2026",
    likes: 54,
    commentsCount: 2,
    views: 650,
    tags: ["IOE Prep", "Physics", "Study Group", "Engineering"],
    comments: [
      {
        id: 301,
        author: "Kushal Rijal",
        authorRole: "Engineering Aspirant",
        authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
        content: "Is the pulley a solid disk? If so, moment of inertia I = 1/2 * M * R^2. The acceleration a should be g / (1 + M/2m). Am I correct?",
        date: "July 07, 2026"
      },
      {
        id: 302,
        author: "Prabin Shrestha",
        authorRole: "IOE Entrance Mentor",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        content: "@Kushal Spot on! Great application of torque and translational dynamics equations.",
        date: "July 07, 2026"
      }
    ]
  },
  {
    id: 4,
    title: "Scholarship opportunities in Indian Universities under COMPEX Scheme 2026",
    content: "The Embassy of India in Kathmandu has released the guidelines for the COMPEX Scholarship Scheme 2026. This fully funded scholarship covers tuition, hostel fee, and basic stipend for undergraduate courses like B.E., B.Pharmacy, B.Sc. (Agri), and B.Sc. (Nursing) in top Indian universities. Application registration starts on July 15, 2026. Ensure your class 12 transcripts and passport/citizenship documents are scanned.",
    category: "Notices",
    author: "EduLink Career Desk",
    authorRole: "Counselor",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    date: "July 05, 2026",
    likes: 29,
    commentsCount: 2,
    views: 740,
    tags: ["COMPEX", "Scholarships", "Study in India", "Notices"],
    comments: [
      {
        id: 401,
        author: "Anjali KC",
        authorRole: "+2 Bio Student",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        content: "Are CBSE students from Nepal eligible to apply, or is it strictly for NEB students?",
        date: "July 05, 2026"
      },
      {
        id: 402,
        author: "EduLink Career Desk",
        authorRole: "Counselor",
        authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
        content: "@Anjali Both CBSE (Nepal board) and NEB students are eligible as long as they are Nepali citizens.",
        date: "July 06, 2026"
      }
    ]
  },
  {
    id: 5,
    title: "Sharing my experience shifting from Science in +2 to BBA in Bachelors",
    content: "Many students feel that if they study Science in +2, they have to study Engineering or Medicine. I had 78% in +2 Science, but I chose to do BBA at Kathmandu University School of Management (KUSOM). It was a tough decision but honestly one of the best ones. The transition was relatively easy, and high school mathematics helped me a lot in finance and statistics modules. AMA about the transition, syllabus, or KUSOM admissions!",
    category: "General",
    author: "Sneha Pokharel",
    authorRole: "KUSOM BBA Student",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    date: "July 03, 2026",
    likes: 67,
    commentsCount: 2,
    views: 1100,
    tags: ["BBA", "Science Transition", "KUSOM", "Career Choice"],
    comments: [
      {
        id: 501,
        author: "Bibek Poudel",
        authorRole: "+2 Student",
        authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        content: "How hard is the KUMAT entrance exam compared to IOE entrance? I'm worried about the English vocabulary section.",
        date: "July 03, 2026"
      },
      {
        id: 502,
        author: "Sneha Pokharel",
        authorRole: "KUSOM BBA Student",
        authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        content: "@Bibek KUMAT math is much easier than IOE engineering mathematics, but yes, the verbal/English section is quite challenging and requires a good vocabulary. Focus on critical reasoning and reading comprehension.",
        date: "July 04, 2026"
      }
    ]
  }
];
