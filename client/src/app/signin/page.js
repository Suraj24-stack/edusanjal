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
    <section data-auth-page="signin" className="auth-page">
      <div className="auth-shell">
        <header className="auth-header">
          <Link href="/" className="auth-brand">
            <div className="auth-brand-mark">
              <div className="auth-brand-mark-inner">
                <span className="auth-brand-letter">E</span>
              </div>
            </div>
            <span className="auth-brand-name">EduLink</span>
          </Link>

          <Link
            href="/"
            className="auth-back-link"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </header>

        <div className="auth-layout">
          <div className="auth-copy">
            <div className="auth-eyebrow">
              <User className="auth-eyebrow-icon" />
              EduLink student profile
            </div>

            <h1 className="auth-title">
              Welcome back to your education journey.
            </h1>

            <p className="auth-description">
              Sign in to explore saved colleges, track admissions, and continue discovering courses and opportunities across Nepal.
            </p>

            <div className="auth-highlight-grid">
              {profileHighlights.map((item) => (
                <div key={item} className="auth-highlight-card">
                  <CheckCircle2 className="auth-highlight-icon" />
                  {item}
                </div>
              ))}
            </div>

            <div className="auth-trust-grid">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="auth-trust-card">
                    <Icon className="auth-trust-icon" />
                    <h2 className="auth-trust-title">{item.title}</h2>
                    <p className="auth-trust-text">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div data-auth-card className="auth-card">
            <div className="mb-8">
              <div className="auth-card-icon">
                <User className="h-7 w-7" />
              </div>
              <h2 className="auth-card-title">Sign in to EduLink</h2>
              <p className="auth-card-text">Use your email and password to access your profile.</p>
            </div>

            <form data-auth-form className="auth-form">
              <div>
                <label htmlFor="email" className="auth-field-label">
                  Email address
                </label>
                <div className="auth-input-wrap">
                  <Mail className="auth-input-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="auth-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="auth-field-label">
                  Password
                </label>
                <div className="auth-input-wrap">
                  <Lock className="auth-input-icon" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-form-row">
                <label className="auth-checkbox-label">
                  <input type="checkbox" className="auth-checkbox" />
                  Remember me
                </label>
                <Link href="/forgot-password" className="auth-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="button"
                className="auth-submit"
              >
                Sign in
              </button>
            </form>

            <p className="auth-switch-text">
              New to EduLink?{' '}
              <Link href="/signup" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
