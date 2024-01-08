import connectDB from "@/libs/db";
import UserModel from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import bcrypt from "bcryptjs"

export const authOptions = {
    providers:[

       GoogleProvider({
        clientId:process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_SECRET
       }),
       GithubProvider({
        clientId:process.env.GITHUB_ID,
        clientSecret:process.env.GITHUB_SECRET
       }),

        CredentialsProvider({
            name:"credentials",
            credentials:{},

            async authorize(credentials){
            try {
                const {email,password}=credentials;
                await connectDB();
                const user = await UserModel.findOne({email})
  
                if(!user){
                  return null;
                }
  
                const passOk= bcrypt.compareSync(password,user.password)
  
                if(!passOk){
                  return null;
                }
                return user;
            } catch (error) {
                console.log(error)
            }
            },

        })
    ],
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};