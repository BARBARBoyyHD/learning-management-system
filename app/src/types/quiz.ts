export type QuizStatus = 'draft' | 'published' | 'archived'

export interface Quiz {
  id: string
  title: string
  description?: string | null
  status: QuizStatus
  questionCount: number
  accessCode?: string | null
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
