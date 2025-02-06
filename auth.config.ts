import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // if not set - redirects to /api/auth/signin
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn; // if false - Redirect unauthenticated users to login page
      }
      if (isLoggedIn) {
        // Redirect authenticated users to the dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      // Allow all other requests to go through
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
