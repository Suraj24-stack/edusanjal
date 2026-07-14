'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

const AUTH_ROUTES = ['/signin', '/signup'];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');

  useEffect(() => {
    if (!loading) {
      const isAdmin = user && (user.role === 'admin' || user.email === 'admin@edulink.com');
      if (isAdmin && !isAdminRoute) {
        router.push('/admin');
      } else if (!isAdmin && isAdminRoute) {
        router.push('/signin');
      }
    }
  }, [user, loading, isAdminRoute, router]);

  // Prevent flashing content during auth validation and redirection
  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@edulink.com');

  if (isAdminRoute && (loading || !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#0B3C5D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAdmin && !isAdminRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#0B3C5D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {!isAuthRoute && !isAdminRoute && <Header />}
      {!isAuthRoute && !isAdminRoute && <NavBar />}

      <main className="min-h-screen">
        {children}
      </main>

      {!isAuthRoute && !isAdminRoute && <Footer />}
    </>
  );
}
