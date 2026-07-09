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
    <section data-auth-page="signup" className="auth-page">
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
              <UserPlus className="auth-eyebrow-icon" />
              New EduLink profile
            </div>

            <h1 className="auth-title">
              Create your EduLink account.
            </h1>

            <p className="auth-description">
              Sign up to save education options, follow admission timelines, and personalize your path across Nepal.
            </p>

            <div className="auth-highlight-grid">
              {profileBenefits.map((item) => (
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
              <h2 className="auth-card-title">Create your EduLink account</h2>
              <p className="auth-card-text">Start with your basic details and create a secure password.</p>
            </div>

            <form data-auth-form className="auth-form">
              <div>
                <label htmlFor="name" className="auth-field-label">
                  Full name
                </label>
                <div className="auth-input-wrap">
                  <User className="auth-input-icon" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className="auth-input"
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="auth-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="auth-field-label">
                  Confirm password
                </label>
                <div className="auth-input-wrap">
                  <Lock className="auth-input-icon" />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    className="auth-input"
                  />
                </div>
              </div>

              <button
                type="button"
                className="auth-submit"
              >
                Sign up
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account?{' '}
              <Link href="/signin" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
