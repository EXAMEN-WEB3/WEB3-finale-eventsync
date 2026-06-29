import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'



export async function GET(req, { params }) {
  const { id } = await params
  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(event)
}





