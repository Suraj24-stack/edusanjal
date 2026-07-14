'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    // Client-side validations
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      setFormLoading(false);
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      setFormLoading(false);
      return;
    }

    try {
      const result = await register(name, email, password);
      if (result.success) {
        setFormSuccess(true);
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      } else {
        setFormError(result.message || 'Registration failed');
        setFormLoading(false);
      }
    } catch (err) {
      setFormError('An error occurred during registration');
      setFormLoading(false);
    }
  };

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

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-ping"></span>
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Account created! Redirecting to sign in...</span>
              </div>
            )}

            <form data-auth-form className="auth-form" onSubmit={handleSignUp}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formLoading || formSuccess}
                className="auth-submit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? 'Creating account...' : 'Sign up'}
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
