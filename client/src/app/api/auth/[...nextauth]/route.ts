import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "login",
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const user = await response.json();
          if (user.status !== "NAD_REQUEST") {
            return user;
          } else {
            throw new Error(user.message);
          }
        } catch (error: any) {
          throw new Error(error ?? "Something Went wrong");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",

  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
