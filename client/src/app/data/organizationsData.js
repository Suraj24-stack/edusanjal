export const categories = [
  { name: 'All', count: 6 },
  { name: 'Government', count: 2 },
  { name: 'University', count: 2 },
  { name: 'Association', count: 1 },
  { name: 'Counseling & Prep', count: 2 }
];

export const organizationsData = [
  {
    id: 1,
    name: "Ministry of Education, Science and Technology (MoEST)",
    shortName: "MoEST",
    type: "Government",
    category: "Government",
    established: "1951",
    location: "Singha Durbar, Kathmandu, Nepal",
    website: "https://moest.gov.np",
    email: "info@moest.gov.np",
    phone: "+977-1-4200340",
    logo: "🏛️",
    image: "https://images.unsplash.com/photo-1541829019-259276a7f85c?w=800&h=450&fit=crop",
    description: "The primary government body responsible for formulating educational policies, administering scholarships, licensing educational institutions, and coordinating all scientific and academic affairs in Nepal.",
    services: [
      "Educational policy formulation & implementation",
      "National scholarship administration & distribution",
      "School curriculum oversight & regulatory compliance",
      "Teacher licensing & professional development programs",
      "No Objection Certificate (NOC) facilitation for students going abroad"
    ],
    likes: 124,
    views: 3120,
    faqs: [
      {
        question: "How do I apply for a student No Objection Certificate (NOC)?",
        answer: "You can apply online via the MoEST NOC portal by uploading your academic transcripts, citizenship certificate, and offer letter from the host university."
      },
      {
        question: "Does MoEST provide foreign study scholarships directly?",
        answer: "Yes, MoEST regularly announces government-to-government (G2G) scholarships and competitive national scholarship seats for various technical and non-technical fields."
      }
    ]
  },
  {
    id: 2,
    name: "Tribhuvan University (TU)",
    shortName: "TU",
    type: "University",
    category: "University",
    established: "1959",
    location: "Kirtipur, Kathmandu, Nepal",
    website: "https://tribhuvan-university.edu.np",
    email: "info@tribhuvan-university.edu.np",
    phone: "+977-1-4330120",
    logo: "🎓",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=450&fit=crop",
    description: "The oldest and largest public university in Nepal, offering thousands of undergraduate, postgraduate, and doctoral programs through its central departments, constituent campuses, and affiliated colleges across the nation.",
    services: [
      "Affiliation & supervision of colleges nationwide",
      "Undergraduate, postgraduate, and PhD degree programs",
      "National academic examinations administration",
      "Advanced research programs in science, humanities, management, and law"
    ],
    likes: 340,
    views: 7890,
    faqs: [
      {
        question: "What is the procedure for getting transcript certificates from TU?",
        answer: "You need to fill out the application form at the Office of the Controller of Examinations (Balkhu) with copies of your registration card, exam marksheets, and bank deposit voucher."
      },
      {
        question: "Does TU offer distance learning programs?",
        answer: "Yes, the Open University of Nepal (OUN) and TU's School of Mathematical Sciences offer select hybrid and online courses."
      }
    ]
  },
  {
    id: 3,
    name: "Kathmandu University (KU)",
    shortName: "KU",
    type: "University",
    category: "University",
    established: "1991",
    location: "Dhulikhel, Kavre, Nepal",
    website: "https://ku.edu.np",
    email: "info@ku.edu.np",
    phone: "+977-11-415100",
    logo: "🏫",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop",
    description: "An autonomous, public, not-for-profit institution dedicated to high-quality technical education, research, and professional training in engineering, medicine, management, science, and education.",
    services: [
      "Professional undergraduate and graduate degree courses",
      "Applied science, energy systems, and biotech research labs",
      "Academic exchange agreements with global universities",
      "Specialized training for community development programs"
    ],
    likes: 289,
    views: 5670,
    faqs: [
      {
        question: "How is KU's admission process structured?",
        answer: "KU admits students through its competitive entrance examinations (e.g., KUCAT for engineering, KUMET for medicine) followed by interviews and merit lists."
      },
      {
        question: "Does KU offer financial aid options?",
        answer: "Yes, KU provides merit-based, need-based scholarships, and community-level fee waivers for eligible students in all programs."
      }
    ]
  },
  {
    id: 4,
    name: "Private and Boarding Schools' Organization Nepal (PABSON)",
    shortName: "PABSON",
    type: "Association",
    category: "Association",
    established: "1990",
    location: "Anamnagar, Kathmandu, Nepal",
    website: "https://pabson.org.np",
    email: "info@pabson.org.np",
    phone: "+977-1-5705352",
    logo: "🤝",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=450&fit=crop",
    description: "An umbrella organization representing and advocating for private and boarding schools across Nepal, ensuring quality standards, coordinating inter-school tournaments, and protecting institutional rights.",
    services: [
      "Advocacy and policy representation for private schools",
      "Extracurricular coordination & inter-school events",
      "Training seminars and workshops for private school teachers",
      "Academic research on primary and secondary school education quality"
    ],
    likes: 95,
    views: 2430,
    faqs: [
      {
        question: "What role does PABSON play in standardizing school exams?",
        answer: "PABSON coordinates regional examinations, including mock boards for Grade 10 (SEE) prep, to ensure secondary schools share standard difficulty scales."
      }
    ]
  },
  {
    id: 5,
    name: "British Council Nepal",
    shortName: "British Council",
    type: "Counseling & Prep",
    category: "Counseling & Prep",
    established: "1959",
    location: "Lainchaur, Kathmandu, Nepal",
    website: "https://www.britishcouncil.org.np",
    email: "general.enquiry@britishcouncil.org.np",
    phone: "+977-1-4237700",
    logo: "🇬🇧",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
    description: "The United Kingdom's international organization for educational opportunities and cultural relations, supporting English language training, IELTS test delivery, and study abroad counseling for UK universities.",
    services: [
      "Official IELTS exam registration & testing services",
      "English language course packages and certifications",
      "United Kingdom university placement fairs & counseling",
      "Arts, culture, and educational development programs in Nepal"
    ],
    likes: 210,
    views: 4560,
    faqs: [
      {
        question: "How do I register for an IELTS exam through British Council?",
        answer: "You can book your IELTS test slot online on the British Council Nepal website, make the payment via local mobile banking/wallets, and select your preferred venue."
      },
      {
        question: "Are there free preparation resources available for IELTS test takers?",
        answer: "Yes, British Council provides registered candidates with the 'IELTS Ready Member' prep portal containing mock tests, guides, and masterclasses."
      }
    ]
  },
  {
    id: 6,
    name: "United States-Nepal Education Foundation (USEF-Nepal)",
    shortName: "USEF / EducationUSA",
    type: "Counseling & Prep",
    category: "Counseling & Prep",
    established: "1961",
    location: "Gyaneshwor, Kathmandu, Nepal",
    website: "https://usefnepal.org",
    email: "advising@usefnepal.org",
    phone: "+977-1-4544717",
    logo: "🇺🇸",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=450&fit=crop",
    description: "Home of EducationUSA in Nepal, USEF provides official, unbiased, and comprehensive advising services for students aspiring to study in the United States and administers the prestigious Fulbright scholarships.",
    services: [
      "Unbiased USA higher education advising & info sessions",
      "Fulbright scholarship administration and interviews",
      "Standardized testing space (TOEFL, GRE, ACT)",
      "Reference library and resources for US university applicants"
    ],
    likes: 185,
    views: 3980,
    faqs: [
      {
        question: "What are the hours of the USEF library for research?",
        answer: "The library and EducationUSA advising center are open to registered members from Monday to Friday. Appointments must be scheduled online."
      },
      {
        question: "Who is eligible to apply for the Fulbright Student Program?",
        answer: "Nepali citizens with a completed Bachelor's/Master's degree, a strong academic record, and relevant work experience can apply for postgraduate study in the USA."
      }
    ]
  }
];
