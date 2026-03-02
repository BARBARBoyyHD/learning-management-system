## ADDED Requirements

### Requirement: Prisma ORM Configuration
The system SHALL have Prisma ORM v6 configured with PostgreSQL 16 as the database provider, following the ERD Guideline (DOC-QCL-ERD-001) Section 3.

#### Scenario: Prisma schema file created
- **WHEN** developer inspects /app/prisma/schema.prisma
- **THEN** file contains generator client, datasource db with postgresql provider, and DATABASE_URL environment variable reference

#### Scenario: Prisma Client generated
- **WHEN** developer runs `npm run db:generate`
- **THEN** Prisma Client is generated and available for import from `@prisma/client`

#### Scenario: Database connection established
- **WHEN** DATABASE_URL is set in .env.local
- **THEN** Prisma Client can connect to PostgreSQL database without connection errors

### Requirement: Six Core Tables Implementation
The system SHALL implement all 6 tables from the ERD Guideline: users, quizzes, questions, question_options, student_responses, and response_details, with UUID primary keys.

#### Scenario: Users table schema
- **WHEN** developer checks Prisma schema for User model
- **THEN** it contains: id (UUID @default(uuid())), username, email @unique, password, role, createdAt, with relations to quizzes and responses

#### Scenario: Quizzes table schema
- **WHEN** developer checks Prisma schema for Quiz model
- **THEN** it contains: id (UUID), teacherId (FK), title, description, isPublic, createdAt, with relations to teacher, questions, and responses

#### Scenario: Questions table schema
- **WHEN** developer checks Prisma schema for Question model
- **THEN** it contains: id (UUID), quizId (FK), questionType, questionText, mediaUrl, settings (Json), points @default(10), orderIndex, with onDelete: Cascade

#### Scenario: QuestionOptions table schema
- **WHEN** developer checks Prisma schema for QuestionOption model
- **THEN** it contains: id (UUID), questionId (FK), option, sortOrder, isCorrect @default(false), with onDelete: Cascade

#### Scenario: StudentResponses table schema
- **WHEN** developer checks Prisma schema for StudentResponse model
- **THEN** it contains: id (UUID), userId (FK), quizId (FK), score, completedAt @default(now()), with onDelete: Cascade for quiz relation

#### Scenario: ResponseDetails table schema
- **WHEN** developer checks Prisma schema for ResponseDetail model
- **THEN** it contains: id (UUID), responseId (FK), questionId (FK), answerGiven, isCorrect, with onDelete: Cascade for both relations

### Requirement: Database Indexes
The system SHALL include all indexes specified in ERD Guideline Section 7 for optimal query performance.

#### Scenario: Users table indexes
- **WHEN** migration is applied
- **THEN** indexes exist on users.email and users.role columns

#### Scenario: Quizzes table indexes
- **WHEN** migration is applied
- **THEN** indexes exist on quizzes.teacherId and quizzes.isPublic columns

#### Scenario: Questions table indexes
- **WHEN** migration is applied
- **THEN** indexes exist on questions.quizId and questions.questionType columns

#### Scenario: Response tables indexes
- **WHEN** migration is applied
- **THEN** indexes exist on student_responses.userId, student_responses.quizId, response_details.responseId, and response_details.questionId

### Requirement: Database Migration System
The system SHALL use Prisma Migrate for version-controlled database schema changes as specified in ERD Guideline Section 8.

#### Scenario: Initial migration created
- **WHEN** developer runs `npm run db:migrate`
- **THEN** migration file is created in prisma/migrations/ with timestamp and all 6 tables

#### Scenario: Migration applied to database
- **WHEN** migration runs successfully
- **THEN** all 6 tables exist in PostgreSQL with correct columns, types, and constraints

#### Scenario: Seed data script available
- **WHEN** developer runs `npm run db:seed`
- **THEN** seed script executes and populates database with test data (demo teacher account, sample quiz)

### Requirement: Environment Configuration for Database
The system SHALL have .env.example with all required database connection variables as specified in ITA Section 4.5.

#### Scenario: DATABASE_URL configured
- **WHEN** developer copies .env.example to .env.local
- **THEN** DATABASE_URL placeholder follows format: postgresql://user:password@host:5432/dbname

#### Scenario: Environment variables documented
- **WHEN** developer reads .env.example
- **THEN** all required variables are listed with comments explaining their purpose
