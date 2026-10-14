import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/shared/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        login: { label: "Логин", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { login: credentials.login as string },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        return ok ? { id: user.id, name: user.login } : null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.uid as string;
      return session;
    },
  },
});

export const getUserId = async (): Promise<string | null> => {
  const session = await auth();
  return session?.user?.id ?? null;
};
