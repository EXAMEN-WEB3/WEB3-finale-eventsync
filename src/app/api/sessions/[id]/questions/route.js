import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isSessionLive } from '@/lib/sessionUtils'

export async function GET(req, { params }) {
  const { id } = await params
  const questions = await prisma.question.findMany({
    where: { sessionId: id },
    orderBy: { upvotes: 'desc' },
  })
  return NextResponse.json(questions)
}

export async function POST(req, { params }) {
  try {
    const { id } = await params

    
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }

    const { content, participantId, pseudo } = body

    
    if (!participantId || typeof participantId !== 'string' || !participantId.startsWith('user_')) {
      return NextResponse.json(
        { error: 'Vous devez être connecté en tant que participant pour poser une question.' },
        { status: 401 }
      )
    }

    
    const session = await prisma.session.findUnique({ where: { id } })
    if (!session) {
      return NextResponse.json({ error: 'Session introuvable.' }, { status: 404 })
    }

    
    if (!isSessionLive(session.startTime, session.endTime)) {
      return NextResponse.json(
        { error: "La session n'est pas en direct. Les questions sont fermées." },
        { status: 403 }
      )
    }

    
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Le contenu de la question est requis.' }, { status: 400 })
    }

    
    const question = await prisma.question.create({
      data: {
        content: content.trim(),
        authorName: pseudo || 'Anonyme',
        participantId,
        sessionId: id,
      },
    })

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('Erreur POST question:', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}