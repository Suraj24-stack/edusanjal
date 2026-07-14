'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Bell, BookOpen, CheckCircle2, Lock, Mail, ShieldCheck, User } from 'lucide-react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const result = await login(email, password);
      if (result.success) {
        if (result.user?.role === 'admin' || result.user?.email === 'admin@edulink.com') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setFormError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      setFormError('An error occurred during sign in');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section data-auth-page="signin" className="auth-page">
      <head>
        <title>Sign in | EduLink</title>
        <meta name="description" content="Sign in to your EduLink account to manage your education profile." />
      </head>
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

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-ping"></span>
                <span>{formError}</span>
              </div>
            )}

            <form data-auth-form className="auth-form" onSubmit={handleSignIn}>
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                type="submit"
                disabled={formLoading}
                className="auth-submit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? 'Signing in...' : 'Sign in'}
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
