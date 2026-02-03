import NextAuth, { type AuthOptions } from 'next-auth';
import YandexProvider from 'next-auth/providers/yandex';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session }) {
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.image
          ? `https://avatars.yandex.net/get-yapic/${profile.image}/islands-200`
          : null;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
