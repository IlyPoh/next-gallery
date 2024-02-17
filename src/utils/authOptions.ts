import { env } from 'process';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const clientId = env.GITHUB_ID ?? '';
const clientSecret = env.GITHUB_SECRET ?? '';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
};

export const handler = NextAuth(authOptions);

export default handler;
