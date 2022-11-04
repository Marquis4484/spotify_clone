import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { ApiError } from "next/dist/server/api-utils";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
    try{
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const {body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refreshed_token ?? token.refreshToken, 

        };

    } catch(error){
        console.error(error)

        return{
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  // adding additional authentication features
  secret: process.env.JWT_SECRET, // encrypting secret 
  pages: {
    signin: "/login"
  },
  callbacks: {

    // initial sign in 
    async jwt({token, account, user}){
        //initial sign in 
        if(account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000,
                // 1000 here acquates to milliseconds
            };
        }
       if(Date.now() < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
       }

       console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
       return await refreshAccessToken(token);
    },

    async session({ session, token }) {
        session.user.accessToken = token.accessToken; 
        session.user.refreshToken = token.refreshToken; 
        session.user.username = token.username;

        return session;
    },
  },
}
export default NextAuth(authOptions)