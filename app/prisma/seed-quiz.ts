/**
 * Seed Script: Add Test Quiz with Questions
 *
 * Creates a sample quiz with multiple choice questions for testing.
 * Run with: npm run db:seed
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed: Test Quiz with Questions...')

  // Find or create a test teacher
  let teacher = await prisma.user.findFirst({
    where: { email: 'teacher@test.com' },
  })

  if (!teacher) {
    teacher = await prisma.user.create({
      data: {
        name: 'Test Teacher',
        email: 'teacher@test.com',
        role: 'teacher',
      },
    })
    console.log('✅ Created test teacher:', teacher.id)
  } else {
    console.log('✅ Found existing teacher:', teacher.id)
  }

  // Create test quiz
  const quiz = await prisma.quiz.upsert({
    where: { accessCode: 'TEST12' },
    update: {},
    create: {
      teacherId: teacher.id,
      title: 'Math Chapter 5 - Test Quiz',
      description: 'A test quiz for students to practice math concepts',
      timeLimit: 30,
      isPublic: false,
      accessCode: 'TEST12',
    },
  })

  console.log('✅ Created/Found quiz:', quiz.id, 'with code:', quiz.accessCode)

  // Delete existing questions for this quiz (to avoid duplicates on re-seed)
  await prisma.question.deleteMany({
    where: { quizId: quiz.id },
  })

  console.log('🗑️  Cleared existing questions')

  // Create Multiple Choice Questions
  const questions = [
    {
      questionText: 'What is 5 + 7?',
      questionType: 'multiple_choice',
      points: 10,
      orderIndex: 0,
      options: [
        { option: '10', isCorrect: false, sortOrder: 0 },
        { option: '12', isCorrect: true, sortOrder: 1 },
        { option: '14', isCorrect: false, sortOrder: 2 },
        { option: '15', isCorrect: false, sortOrder: 3 },
      ],
    },
    {
      questionText: 'What is 9 × 8?',
      questionType: 'multiple_choice',
      points: 10,
      orderIndex: 1,
      options: [
        { option: '72', isCorrect: true, sortOrder: 0 },
        { option: '64', isCorrect: false, sortOrder: 1 },
        { option: '81', isCorrect: false, sortOrder: 2 },
        { option: '56', isCorrect: false, sortOrder: 3 },
      ],
    },
    {
      questionText: 'What is 100 ÷ 4?',
      questionType: 'multiple_choice',
      points: 10,
      orderIndex: 2,
      options: [
        { option: '20', isCorrect: false, sortOrder: 0 },
        { option: '30', isCorrect: false, sortOrder: 1 },
        { option: '25', isCorrect: true, sortOrder: 2 },
        { option: '15', isCorrect: false, sortOrder: 3 },
      ],
    },
    {
      questionText: 'Which number is a prime number?',
      questionType: 'multiple_choice',
      points: 10,
      orderIndex: 3,
      options: [
        { option: '4', isCorrect: false, sortOrder: 0 },
        { option: '9', isCorrect: false, sortOrder: 1 },
        { option: '17', isCorrect: true, sortOrder: 2 },
        { option: '21', isCorrect: false, sortOrder: 3 },
      ],
    },
    {
      questionText: 'What is 15 - 8?',
      questionType: 'multiple_choice',
      points: 10,
      orderIndex: 4,
      options: [
        { option: '6', isCorrect: false, sortOrder: 0 },
        { option: '7', isCorrect: true, sortOrder: 1 },
        { option: '8', isCorrect: false, sortOrder: 2 },
        { option: '9', isCorrect: false, sortOrder: 3 },
      ],
    },
  ]

  // Create questions with options
  for (const q of questions) {
    const { options, ...questionData } = q

    const question = await prisma.question.create({
      data: {
        quizId: quiz.id,
        ...questionData,
        settings: {
          shuffle: true,
          multipleAnswers: false,
        },
      },
    })

    // Create options for this question
    for (const option of options) {
      await prisma.questionOption.create({
        data: {
          questionId: question.id,
          ...option,
        },
      })
    }

    console.log(`✅ Created question ${question.orderIndex + 1}: ${question.questionText}`)
  }

  console.log('\n🎉 Seed complete!')
  console.log('\n📝 Test Quiz Details:')
  console.log(`   Quiz ID: ${quiz.id}`)
  console.log(`   Access Code: ${quiz.accessCode}`)
  console.log(`   Questions: ${questions.length}`)
  console.log(`   Total Points: ${questions.reduce((sum, q) => sum + q.points, 0)}`)
  console.log('\n🧪 Test the flow:')
  console.log(`   1. Go to: http://localhost:3000/join`)
  console.log(`   2. Enter code: ${quiz.accessCode}`)
  console.log(`   3. Enter your name`)
  console.log(`   4. Click "Start Quiz"`)
  console.log(`   5. Answer questions and submit`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
