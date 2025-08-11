import {authOptions} from '@/lib/auth.config'
import NextAuth from 'next-auth'

export const {handlers, signIn, signOut, auth} = NextAuth({
	...authOptions,
})
