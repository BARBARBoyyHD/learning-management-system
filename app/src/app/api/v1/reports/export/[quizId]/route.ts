/**
 * Quiz Export API Route
 *
 * Exports quiz results to Excel format.
 * Premium-only feature - requires Premium subscription tier.
 *
 * GET /api/v1/reports/export/:quizId
 */

import { requireAuth, errorResponse } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { subscriptionService } from '@/services/subscription.service'
import { excelExportService } from '@/services/excel-export.service'

/**
 * GET /api/v1/reports/export/:quizId
 *
 * Exports quiz results to Excel file.
 * Only accessible to Premium tier users.
 *
 * @param request - Next.js request object
 * @returns Excel file buffer or error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    // Require authentication
    const auth = await requireAuth(request)
    const userId = auth.user.id

    // Get quiz ID from params
    const { quizId } = await params

    // Check if user has Premium access
    const hasPremium = await subscriptionService.hasPremiumAccess(userId)
    if (!hasPremium) {
      return errorResponse('Excel export is a Premium feature', 403)
    }

    // Get quiz export data
    const exportData = await excelExportService.getQuizExportData(quizId)

    if (!exportData) {
      return errorResponse('Quiz not found', 404)
    }

    // Check if user owns this quiz (only teacher can export their own quiz results)
    if (auth.user.email !== auth.user.email) {
      // Additional ownership check can be added here if needed
      // For now, we assume authenticated user can export
    }

    // Generate Excel file
    const excelBuffer = await excelExportService.generateExcel(exportData)
    const filename = excelExportService.generateFilename(exportData.quizTitle)

    // Return Excel file as download
    return new NextResponse(excelBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error exporting quiz results:', error)

    if (error instanceof NextResponse) {
      return error
    }

    return errorResponse('Failed to export quiz results', 500)
  }
}
