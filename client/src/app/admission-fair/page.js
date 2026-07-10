import AdmissionFairClient from './AdmissionFairClient';

export const metadata = {
  title: "EduLink Mega Admission Fair 2026 - Participating Colleges & Registration",
  description: "Register for the EduLink Mega Admission Fair 2026 at Kathmandu Convention Center. Meet representatives from top colleges in Nepal and secure direct admission and scholarships.",
  keywords: ["admission fair", "college fair", "nepal college expo", "scholarship fair", "colleges kathmandu", "edulink fair"],
  alternates: {
    canonical: "/admission-fair"
  },
  openGraph: {
    title: "EduLink Mega Admission Fair 2026 - Register Now",
    description: "Register for the EduLink Mega Admission Fair 2026. View participating colleges and secure direct admission.",
    url: "https://edulink.surajkhadka7.com.np/admission-fair",
    type: "website"
  }
};

export default function Page() {
  return <AdmissionFairClient />;
}
