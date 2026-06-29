import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { title, description, startTime, endTime, room, capacity, eventId, speakerIds } = await req.json()
    if (!title || !startTime || !endTime || !room || !eventId) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    const parsedStartTime = new Date(startTime)
    const parsedEndTime = new Date(endTime)
    if (parsedEndTime <= parsedStartTime) {
      return NextResponse.json(
        { error: 'La date de fin doit être supérieure à la date de début sélectionnée' },
        { status: 400 }
      )
    }
    const newSession = await prisma.session.create({
      data: {
        title,
        description: description || '',
        startTime: parsedStartTime,
        endTime: parsedEndTime,
        room,
        capacity: capacity ? parseInt(capacity) : null,
        eventId,
        
        speakers: { connect: (speakerIds || []).map(id => ({ id })) },
      },
    })
    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}





