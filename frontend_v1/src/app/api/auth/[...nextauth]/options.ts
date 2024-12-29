import NextAuth, { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
}
export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/'
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log('signIn:- ', user, account)
            return true
        },
        async session({ session, user, token }:{ 
            session: CustomSession, 
            user: CustomUser, 
            token: JWT 
        }) {
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        // Force Google to re-issue a Refresh Token on each sign in
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
  ],
}
export default NextAuth(authOptions)