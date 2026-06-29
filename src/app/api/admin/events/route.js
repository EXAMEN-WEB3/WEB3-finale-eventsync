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
    const { title, description, startDate, endDate, location } = await req.json()
    
    if (!title || !startDate || !endDate || !location) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }
    const parsedStartDate = new Date(startDate)
    const parsedEndDate = new Date(endDate)
    if (parsedEndDate <= parsedStartDate) {
      return NextResponse.json(
        { error: 'La date de fin doit être supérieure à la date de début sélectionnée' },
        { status: 400 }
      )
    }
    const event = await prisma.event.create({
      data: {
        title,
        description: description || '',
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location,
      },
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}





