import Link from 'next/link';
import { BookOpen, Lock, Mail, User } from 'lucide-react';

export const metadata = {
  title: 'Sign in | EduLink',
  description: 'Sign in to your EduLink account to manage your education profile.',
};

export default function SignInPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0B3C5D] via-[#153f58] to-[#0B3C5D] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15">
            <BookOpen className="h-4 w-4 text-[#F2A900]" />
            EduLink student profile
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome back to your education journey.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            Sign in to explore saved colleges, track admissions, and continue discovering courses and opportunities across Nepal.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            {['Saved colleges', 'Admission alerts', 'Profile updates'].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F2A900]/15 text-[#0B3C5D]">
              <User className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sign in to EduLink</h2>
            <p className="mt-2 text-sm text-gray-600">Use your email and password to access your profile.</p>
          </div>

          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#0B3C5D] focus:ring-[#F2A900]" />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-semibold text-[#0B3C5D] hover:text-[#F2A900]">
                Forgot password?
              </Link>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-gradient-to-r from-[#F2A900] to-[#D9A100] px-4 py-3 font-bold text-[#0B3C5D] shadow-md transition hover:from-[#D9A100] hover:to-[#C09000]"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New to EduLink?{' '}
            <Link href="/signup" className="font-semibold text-[#0B3C5D] hover:text-[#F2A900]">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
