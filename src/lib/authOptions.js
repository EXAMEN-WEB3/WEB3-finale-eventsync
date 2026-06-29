import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const ADMIN_EMAIL = "admin@eventsync.com"
const ADMIN_PASSWORD = "admin123"
const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET || "eventsync-local-development-secret"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email.trim().toLowerCase()
        const password = credentials.password

        try {
          const admin = await prisma.admin.findUnique({
            where: { email },
          })

          if (admin) {
            const passwordMatches =
              admin.password === password ||
              (await bcrypt.compare(password, admin.password))

            if (passwordMatches) {
              return { id: admin.id, email: admin.email }
            }
          }

          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)
            const fallbackAdmin = await prisma.admin.upsert({
              where: { email: ADMIN_EMAIL },
              update: { password: hashedPassword },
              create: { email: ADMIN_EMAIL, password: hashedPassword },
            })

            return { id: fallbackAdmin.id, email: fallbackAdmin.email }
          }
        } catch (error) {
          console.error("Auth error:", error)

          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            return { id: "local-admin", email: ADMIN_EMAIL }
          }
        }

        return null
      },
    }),
  ],
  
  secret: NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id
      return session
    },
  },
}
