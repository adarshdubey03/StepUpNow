import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/mongoosedb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { 
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          console.log("No user found:", credentials.email);
          throw new Error("No user found with this email");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          console.log("Incorrect password for:", credentials.email);
          throw new Error("Incorrect password");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async jwt({ token, user, account }) {
      await connectDB();

      if (user) {
        token.id = user.id;
      }

      if (account?.provider === "google") {
        let dbUser = await User.findOne({ email: token.email });
        if (!dbUser) {
          console.log(" Creating new user in DB for Google login:", token.email);
          dbUser = await User.create({
            name: token.name || "No Name",
            email: token.email,
          });
        } else {
          console.log(" Found existing user in DB for Google login:", token.email);
        }
        token.id = dbUser._id;
      }

      // 🔑 Always attach phone info from DB to token
      if (token.email) {
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.phone = dbUser.phone || null;
          token.phoneVerified = dbUser.phoneVerified || false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id;
        session.user.phone = token.phone || null;
        session.user.phoneVerified = token.phoneVerified || false;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
