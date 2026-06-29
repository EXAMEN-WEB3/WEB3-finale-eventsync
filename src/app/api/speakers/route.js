import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.get('ids')

    const speakers = await prisma.speaker.findMany({
      where: ids ? { id: { in: ids.split(',') } } : undefined,
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(speakers)
  } catch (error) {
    console.error('Erreur GET /api/speakers:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
