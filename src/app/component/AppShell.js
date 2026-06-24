'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const AUTH_ROUTES = ['/signin', '/signup'];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  return (
    <>
      {!isAuthRoute && <Header />}
      {!isAuthRoute && <NavBar />}

      <main className="min-h-screen">
        {children}
      </main>

      {!isAuthRoute && <Footer />}
    </>
  );
}
