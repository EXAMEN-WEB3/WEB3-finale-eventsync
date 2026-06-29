import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      where: { room: { not: '' } },
      select: { room: true },
      distinct: ['room'],
      orderBy: { room: 'asc' },
    })
    const rooms = sessions.map((s) => ({ name: s.room }))
    return NextResponse.json(rooms)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
