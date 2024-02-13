import { env } from 'process';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID ?? '',
      clientSecret: env.GITHUB_SECRET ?? '',
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
