const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { email: 'admin@eventsync.com' },
    update: { password: hashedPassword },
    create: { email: 'admin@eventsync.com', password: hashedPassword },
  })

  const eventCount = await prisma.event.count()
  if (eventCount === 0) {
    const speakers = await Promise.all([
      prisma.speaker.create({
        data: {
          name: 'Amina Rakoto',
          bio: 'Ingénieure blockchain spécialisée dans les expériences Web3 accessibles.',
          photoUrl: null,
          links: JSON.stringify({
            website: 'https://example.com',
            github: 'https://github.com/example',
          }),
        },
      }),
      prisma.speaker.create({
        data: {
          name: 'Lucas Morel',
          bio: 'Product designer orienté communautés, événements hybrides et outils temps réel.',
          photoUrl: null,
          links: JSON.stringify({
            twitter: 'https://twitter.com/example',
          }),
        },
      }),
    ])

    await prisma.event.create({
      data: {
        title: 'EventSync Demo Summit',
        description: 'Un événement de démonstration pour tester la planification, les sessions et les questions en direct.',
        startDate: new Date('2026-07-15T09:00:00.000Z'),
        endDate: new Date('2026-07-15T18:00:00.000Z'),
        location: 'Antananarivo',
        sessions: {
          create: [
            {
              title: 'Construire une expérience événementielle Web3',
              description: 'Panorama des fonctionnalités clés: planning, favoris, speakers et interactions live.',
              startTime: new Date('2026-07-15T09:30:00.000Z'),
              endTime: new Date('2026-07-15T10:30:00.000Z'),
              room: 'Main Hall',
              capacity: 120,
              speakers: {
                connect: [{ id: speakers[0].id }],
              },
            },
            {
              title: 'Questions live et engagement participant',
              description: 'Bonnes pratiques pour garder les sessions interactives et utiles.',
              startTime: new Date('2026-07-15T11:00:00.000Z'),
              endTime: new Date('2026-07-15T12:00:00.000Z'),
              room: 'Room A',
              capacity: 80,
              speakers: {
                connect: [{ id: speakers[1].id }],
              },
              questions: {
                create: [
                  {
                    content: 'Comment prioriser les questions les plus pertinentes pendant une session ?',
                    authorName: 'Participant demo',
                    upvotes: 3,
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }

  console.log('Admin créé/mis à jour : admin@eventsync.com / admin123')
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
