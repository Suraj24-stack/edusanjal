import Link from 'next/link';
import { ArrowLeft, Bell, BookOpen, CheckCircle2, Lock, Mail, ShieldCheck, User } from 'lucide-react';

export const metadata = {
  title: 'Sign in | EduLink',
  description: 'Sign in to your EduLink account to manage your education profile.',
};

const profileHighlights = [
  'Saved colleges and programs',
  'Admission deadline alerts',
  'Personal profile updates',
];

const trustItems = [
  {
    icon: BookOpen,
    title: 'Explore smarter',
    text: 'Keep your shortlisted courses, colleges, and schools in one clean profile.',
  },
  {
    icon: Bell,
    title: 'Stay on schedule',
    text: 'Follow admission updates and reminders without losing track of deadlines.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    text: 'Your student profile is only used to improve your EduLink experience.',
  },
];

export default function SignInPage() {
  return (
    <section className="min-h-screen overflow-hidden bg-[#0B3C5D] text-white">
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
              <User className="h-4 w-4 text-[#F2A900]" />
              EduLink student profile
            </div>

            <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Welcome back to your education journey.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              Sign in to explore saved colleges, track admissions, and continue discovering courses and opportunities across Nepal.
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {profileHighlights.map((item) => (
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

          <div className="rounded-2xl border border-white/15 bg-white p-6 text-gray-900 shadow-2xl shadow-black/25 sm:p-8">
            <div className="mb-8">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B3C5D]/10 text-[#0B3C5D]">
                <User className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-950">Sign in to EduLink</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">Use your email and password to access your profile.</p>
            </div>

            <form className="space-y-5">
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pl-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#F2A900] focus:bg-white focus:ring-4 focus:ring-[#F2A900]/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 font-medium text-gray-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#0B3C5D] focus:ring-[#F2A900]" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="font-bold text-[#0B3C5D] transition hover:text-[#D9A100]">
                  Forgot password?
                </Link>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-gradient-to-r from-[#F2A900] to-[#D9A100] px-4 py-3.5 font-black text-[#0B3C5D] shadow-lg shadow-[#F2A900]/20 transition hover:from-[#D9A100] hover:to-[#C09000] focus:outline-none focus:ring-4 focus:ring-[#F2A900]/30 active:scale-[0.99]"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              New to EduLink?{' '}
              <Link href="/signup" className="font-bold text-[#0B3C5D] transition hover:text-[#D9A100]">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
