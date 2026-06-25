import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from 'lucide-react';

export const metadata = {
  title: 'Sign up | EduLink',
  description: 'Create an EduLink account to save colleges, courses, and admission updates.',
};

const profileBenefits = [
  'Shortlist colleges and courses',
  'Get admission deadline alerts',
  'Build your student profile',
];

const trustItems = [
  {
    icon: BookOpen,
    title: 'Plan with clarity',
    text: 'Save programs, schools, colleges, and opportunities that match your goals.',
  },
  {
    icon: Bell,
    title: 'Never miss updates',
    text: 'Receive reminders for admissions, scholarships, and education events.',
  },
  {
    icon: ShieldCheck,
    title: 'Your data stays private',
    text: 'Use your profile to personalize EduLink without making it public.',
  },
];

export default function SignUpPage() {
  return (
    <section data-auth-page="signup" className="relative isolate min-h-screen overflow-hidden bg-[#0B3C5D] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-[#F2A900] p-1 shadow-lg shadow-black/10 rotate-12">
              <div className="flex h-full w-full -rotate-12 items-center justify-center rounded bg-white">
                <span className="text-base font-black text-[#0B3C5D]">E</span>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight">EduLink</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:py-14">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur">
              <UserPlus className="h-4 w-4 text-[#F2A900]" />
              New EduLink profile
            </div>

            <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Create your EduLink account.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Sign up to save education options, follow admission timelines, and personalize your path across Nepal.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {profileBenefits.map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/10 p-4 text-sm font-semibold text-white backdrop-blur">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-[#F2A900]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-3xl gap-4 lg:grid-cols-3">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/10 p-5 backdrop-blur">
                    <Icon className="h-6 w-6 text-[#F2A900]" />
                    <h2 className="mt-4 text-base font-bold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-white/70">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div data-auth-card className="rounded-2xl border border-white/15 bg-white p-6 text-gray-900 shadow-2xl shadow-black/25 sm:p-8">
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3C5D]/10 text-[#0B3C5D]">
                <User className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-950">Create your EduLink account</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">Start with your basic details and create a secure password.</p>
            </div>

            <form data-auth-form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-800">
                  Full name
                </label>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F2A900] focus:bg-white focus:ring-4 focus:ring-[#F2A900]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-800">
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F2A900] focus:bg-white focus:ring-4 focus:ring-[#F2A900]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-800">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F2A900] focus:bg-white focus:ring-4 focus:ring-[#F2A900]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-800">
                  Confirm password
                </label>
                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F2A900] focus:bg-white focus:ring-4 focus:ring-[#F2A900]/20"
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-gradient-to-r from-[#F2A900] to-[#D9A100] px-4 py-3.5 font-black text-[#0B3C5D] shadow-lg shadow-[#F2A900]/20 transition hover:from-[#D9A100] hover:to-[#C09000] focus:outline-none focus:ring-4 focus:ring-[#F2A900]/30 active:scale-[0.99]"
              >
                Sign up
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="font-bold text-[#0B3C5D] transition hover:text-[#D9A100]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
