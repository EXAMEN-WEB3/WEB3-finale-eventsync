import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const { title, description, startDate, endDate, location } = await req.json()
    const parsedStartDate = new Date(startDate)
    const parsedEndDate = new Date(endDate)
    if (parsedEndDate <= parsedStartDate) {
      return NextResponse.json(
        { error: 'La date de fin doit être supérieure à la date de début sélectionnée' },
        { status: 400 }
      )
    }
    const updated = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        location,
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    await prisma.event.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}





