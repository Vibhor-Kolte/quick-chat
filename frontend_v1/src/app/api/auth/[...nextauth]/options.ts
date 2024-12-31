import NextAuth, { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { LOGIN_URL } from "@/lib/apiEndPoints";

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
        async signIn({
            user,
            account,
        }: {
            user: CustomUser;
            account: Account | null;
        }) {
            try {
                const payload = {
                    email: user.email!,
                    name: user.name!,
                    oauth_id: account?.providerAccountId!,
                    provider: account?.provider!,
                    image: user?.image,
                };

                const { data } = await axios.post(LOGIN_URL, payload);

                user.id = data?.user?.id?.toString();
                user.token = data?.user?.token;
                return true;
                
            } catch (error) {
                if (error instanceof AxiosError) {
                    return redirect(`/auth/error?message=${error.message}`);
                }
                return redirect(
                    `/auth/error?message=Something went wrong.please try again!`
                );
            }
        },
        async session({ session, user, token }: {
            session: CustomSession,
            user: CustomUser,
            token: JWT
        }) {
            session.user = token.user as CustomUser;
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            // console.log(token);
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