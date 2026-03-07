export interface Quiz {
  id: string
  teacherId?: string
  title: string
  description?: string | null
  timeLimit?: number | null
  isPublic: boolean
  accessCode?: string | null
  questionCount?: number
  studentCount?: number
  createdAt: string
  updatedAt: string
}
