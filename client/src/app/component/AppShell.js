'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const AUTH_ROUTES = ['/signin', '/signup'];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
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
