import ExcelJS from 'exceljs'
import { prisma } from '@/lib/prisma'

/**
 * Excel Export Service
 *
 * Generates Excel files for student quiz responses and scores.
 * Premium-only feature for teachers to export quiz results.
 */

export interface ExportData {
  quizTitle: string
  quizDescription?: string | null
  exportedAt: string
  rows: ExportRow[]
}

export interface ExportRow {
  studentName: string
  studentEmail: string
  score: number | null
  totalQuestions: number
  correctAnswers: number
  completionDate: string
  timeSpent: string
  answers: string
}

export const excelExportService = {
  /**
   * Get quiz data for export
   */
  async getQuizExportData(quizId: string): Promise<ExportData | null> {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          select: {
            id: true,
            questionType: true,
            questionText: true,
            points: true,
          },
          orderBy: { orderIndex: 'asc' },
        },
        responses: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            details: {
              select: {
                questionId: true,
                answerGiven: true,
                isCorrect: true,
              },
            },
          },
          orderBy: { completedAt: 'desc' },
        },
      },
    })

    if (!quiz) {
      return null
    }

    const totalQuestions = quiz.questions.length

    const rows: ExportRow[] = quiz.responses.map((response) => {
      const correctCount = response.details.filter((d) => d.isCorrect).length
      const score = response.score ?? 0

      // Calculate time spent (from createdAt to completedAt)
      const startTime = response.completedAt
      const timeSpentMs = Date.now() - startTime.getTime()
      const timeSpent = formatDuration(timeSpentMs)

      // Format answers as text
      const answers = formatAnswers(response.details)

      return {
        studentName: response.user.name,
        studentEmail: response.user.email,
        score,
        totalQuestions,
        correctAnswers: correctCount,
        completionDate: response.completedAt.toISOString(),
        timeSpent,
        answers,
      }
    })

    return {
      quizTitle: quiz.title,
      quizDescription: quiz.description,
      exportedAt: new Date().toISOString(),
      rows,
    }
  },

  /**
   * Generate Excel workbook from export data
   */
  async generateExcel(data: ExportData): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'BrainBlitz'
    workbook.created = new Date()
    workbook.lastModifiedBy = 'BrainBlitz Export'

    // Add main worksheet
    const worksheet = workbook.addWorksheet('Quiz Results', {
      properties: {
        tabColor: { argb: 'FF6467F2' },
      },
    })

    // Add header row with quiz info
    worksheet.mergeCells('A1:H1')
    worksheet.getCell('A1').value = data.quizTitle
    worksheet.getCell('A1').font = {
      bold: true,
      size: 18,
      color: { argb: 'FFFFFFFF' },
    }
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6467F2' },
    }
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' }

    // Add description if exists
    if (data.quizDescription) {
      worksheet.mergeCells('A2:H2')
      worksheet.getCell('A2').value = data.quizDescription
      worksheet.getCell('A2').font = { italic: true, size: 11 }
      worksheet.getCell('A2').alignment = { horizontal: 'left', vertical: 'middle' }
    }

    // Add metadata row
    const metaRow = data.quizDescription ? 3 : 2
    worksheet.mergeCells(`A${metaRow}:H${metaRow}`)
    worksheet.getCell(`A${metaRow}`).value = `Exported: ${data.exportedAt} | Total Responses: ${data.rows.length}`
    worksheet.getCell(`A${metaRow}`).font = { size: 10, color: { argb: 'FF666666' } }

    // Add column headers
    const headerRow = metaRow + 1
    const headers = [
      'Student Name',
      'Student Email',
      'Score',
      'Total Questions',
      'Correct Answers',
      'Completion Date',
      'Time Spent',
      'Answers',
    ]

    const headerCell = worksheet.getRow(headerRow)
    headers.forEach((header, index) => {
      const cell = headerCell.getCell(index + 1)
      cell.value = header
      cell.font = { bold: true, size: 11 }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E7FF' },
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    })

    // Add data rows
    data.rows.forEach((row, index) => {
      const dataRowIndex = headerRow + index + 1
      const dataRow = worksheet.getRow(dataRowIndex)

      dataRow.getCell(1).value = row.studentName
      dataRow.getCell(2).value = row.studentEmail
      dataRow.getCell(3).value = row.score
      dataRow.getCell(4).value = row.totalQuestions
      dataRow.getCell(5).value = row.correctAnswers
      dataRow.getCell(6).value = new Date(row.completionDate)
      dataRow.getCell(7).value = row.timeSpent
      dataRow.getCell(8).value = row.answers

      // Style the row
      for (let i = 1; i <= 8; i++) {
        const cell = dataRow.getCell(i)
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true }
      }

      // Highlight score column
      dataRow.getCell(3).font = { bold: true }
      dataRow.getCell(5).font = { bold: true }

      // Alternate row colors
      if (index % 2 === 0) {
        for (let i = 1; i <= 8; i++) {
          dataRow.getCell(i).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF9FAFB' },
          }
        }
      }
    })

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      if (column.number === 8) {
        // Answers column - wider
        column.width = 50
      } else if (column.number === 2) {
        // Email column
        column.width = 25
      } else if (column.number === 6) {
        // Date column
        column.width = 20
      } else {
        column.width = 15
      }
    })

    // Freeze header row
    worksheet.views = [{ state: 'frozen', ySplit: headerRow }]

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer as unknown as Buffer
  },

  /**
   * Generate filename for export
   */
  generateFilename(quizTitle: string): string {
    const sanitizedTitle = quizTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const date = new Date().toISOString().split('T')[0]
    return `${sanitizedTitle}_${date}.xlsx`
  },
}

/**
 * Format duration in milliseconds to human-readable string
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  if (minutes > 0) {
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${seconds}s`
}

/**
 * Format answer details as readable text
 */
function formatAnswers(details: Array<{ questionId: string; answerGiven: string | null; isCorrect: boolean | null }>): string {
  return details
    .map((detail, index) => {
      const answer = detail.answerGiven || 'No answer'
      const status = detail.isCorrect ? '✓' : '✗'
      return `Q${index + 1}: ${answer} ${status}`
    })
    .join(' | ')
}
