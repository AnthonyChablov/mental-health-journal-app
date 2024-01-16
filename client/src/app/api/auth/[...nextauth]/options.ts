import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import LinkedInProvider from "next-auth/providers/linkedin";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      user && (token.user = user);
      return token;
    },
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 60 * 60, // 2 hours in seconds
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
};
