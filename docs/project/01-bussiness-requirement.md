# BUSINESS REQUIREMENTS DOCUMENT
## BrainBlitz
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-BRD-001 |
| Version | 1.1 |
| Status | Draft |
| Author | Product Team |
| Created | February 2026 |
| Last Updated | 28 February 2026 |
| Reviewed By | Muhammad Nahrul Hayat |
| Approved By | Fadel Najmi Aiansyah|

---

## Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 25 February 2026 | Product Team | Initial version based on template |
| 1.1 | 28 February 2026 | Product Team | Translated to English, added technology stack from ITA |

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Business Objectives](#2-business-objectives)
3. [Stakeholder Analysis](#3-stakeholder-analysis)
4. [Current State Analysis (As-Is)](#4-current-state-analysis-as-is)
5. [Future State Vision (To-Be)](#5-future-state-vision-to-be)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Business Rules & Constraints](#8-business-rules--constraints)
9. [Data Requirements](#9-data-requirements)
10. [Assumptions & Dependencies](#10-assumptions--dependencies)
11. [Success Metrics & KPIs](#11-success-metrics--kpis)
12. [Technology Stack](#12-technology-stack)
13. [Glossary](#13-glossary)
14. [Approval Sign-off](#14-approval-sign-off)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Background

In the modern education ecosystem, the need for interactive and easily accessible learning evaluation platforms continues to grow. Teachers need tools that allow them to create engaging quizzes with various question types, while students desire a simple quiz-taking experience without technical barriers such as complex registration processes.

Current conditions show that many existing quiz platforms require all users (including students) to complete full registration before participating. This creates friction in the learning process, especially for spontaneous quiz sessions or short-duration quizzes. Additionally, question type flexibility is often limited, preventing teachers from varying their assessments optimally.

BrainBlitz emerges as a solution bridging these needs by adopting a hybrid approach: Teachers as registered users with full authority, and Students as guest users who can join with just an access code and name.

### 1.2 Proposed Solution

BrainBlitz is a web-based application for interactive quizzes supporting multiple question types (Multiple Choice, Essay, Fill in the Blank, Match, and Reorder) within a structured Course system. The application allows Teachers to create and manage Courses and Assessments flexibly, while Students can join as guests by simply entering an access code and name without formal registration.

The system uses a scalable database architecture with UUIDs as primary keys and JSON-based configurations to support adding new question types without database schema changes.

### 1.3 Key Benefits

| Benefit | Description |
|---------|-------------|
| Time Efficiency | Students can join quizzes in < 2 minutes without complex registration |
| Question Flexibility | 5 question types expandable without database changes |
| Centralized Management | Teachers can manage multiple courses and assessments in one platform |
| Real-time Reporting | Teachers can view student scores immediately after submission |

### 1.4 Scope Summary

- **5 main modules:** Authentication & User Management, Course Management, Assessment Management, Question Management, Reporting & Analytics
- **Integrations with:** Email service (for teacher verification), Session management system
- **Platform:** Web-based (responsive for desktop, tablet, mobile)
- **Estimated users:** Support for 1000+ concurrent quiz takers per instance

---

## 2. BUSINESS OBJECTIVES

### 2.1 Strategic Alignment

This project supports LearnWeb LMS's digitalization strategy by providing a modern, easy-to-use, and scalable assessment tool. BrainBlitz becomes a key component in the LMS ecosystem, enabling direct interaction between teachers and students in the context of formative assessment.

### 2.2 Business Objectives (SMART)

| ID | Objective | Specific | Measurable | Target |
|----|-----------|----------|------------|--------|
| BO-01 | Simplify Student Onboarding | Eliminate registration barriers for guest students | Time to join quiz | < 2 minutes from entering code to starting quiz |
| BO-02 | Assessment Flexibility | Provide varied question types for comprehensive evaluation | Number of question types | 5 question types in first release |
| BO-03 | System Scalability | Support user and question type growth | Concurrent users & question types | 1000+ concurrent users, architecture extensible for 10+ question types |
| BO-04 | Learning Outcome Visibility | Provide real-time insights to teachers | Reporting availability | Scores available < 5 seconds after submission |

### 2.3 Success Criteria

The project is considered successful within 3 months post go-live:
1. ✅ 90% of teachers can create their first course and assessment in < 15 minutes
2. ✅ 95% of guest students can join and start quizzes without technical assistance
3. ✅ System uptime > 99.5% during active quiz periods
4. ✅ Average page load time < 3 seconds for all main pages
5. ✅ Zero data loss on student responses during submission

---

## 3. STAKEHOLDER ANALYSIS

### 3.1 Stakeholder Matrix

| Stakeholder | Role | Interest | Influence | Engagement Strategy |
|-------------|------|----------|-----------|---------------------|
| Product Owner | Executive Sponsor | High | High | Weekly sync, approval for scope changes |
| Lead Developer | Technical Owner | High | High | Daily standup, technical decision maker |
| UI/UX Designer | Design Lead | Medium | Medium | Design review sessions, user testing |
| QA Engineer | Quality Owner | Medium | Medium | Test planning, UAT coordination |
| Teacher (End User) | Primary User | High | Medium | User interviews, beta testing |
| Student (End User) | Primary User | High | Low | Usability testing, feedback surveys |
| School Administrator | Business Stakeholder | Medium | High | Progress reporting, go-live approval |

### 3.2 RACI for Key Deliverables

| Deliverable | Product Owner | Lead Developer | UI/UX Designer | QA Engineer | End Users |
|-------------|---------------|----------------|----------------|-------------|-----------|
| Business Requirements | A | R | C | C | I |
| Technical Architecture | C | A/R | I | I | I |
| UI/UX Design | A | C | R | C | C |
| Development | I | A/R | C | C | I |
| Testing & QA | I | C | I | A/R | C |
| UAT | A | C | I | R | R |
| Go-Live Decision | A/R | C | I | C | C |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

## 4. CURRENT STATE ANALYSIS (AS-IS)

### 4.1 Current Systems

```
┌─────────────────────────────────────────────────────────────┐
│                     CURRENT STATE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Platform Quiz 1 │         │  Platform Quiz 2 │         │
│  │  (Commercial)    │         │  (Open Source)   │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                    │
│           ▼                            ▼                    │
│  ┌─────────────────────────────────────────────────┐       │
│  │           COMMON ISSUES:                         │       │
│  │  • All users required full registration         │       │
│  │  • Limited question types (only multiple choice)│       │
│  │  • No guest access                              │       │
│  │  • Long setup time (> 10 minutes per quiz)      │       │
│  │  • Limited reporting                            │       │
│  └─────────────────────────────────────────────────┘       │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              MANUAL PROCESS (Without platform):         ││
│  │  • Print questions → Distribute → Manual grading       ││
│  │  • Manual grade entry to spreadsheet                   ││
│  │  • Total time: 3-5 days for feedback                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Pain Points Detail

| ID | Pain Point | Business Impact | Frequency |
|----|------------|-----------------|-----------|
| PP-01 | Mandatory registration for all users | 30-40% of students abandon before starting quiz | Every new quiz session |
| PP-02 | Monotonous question types (only multiple choice) | Cannot measure higher-order thinking skills | Every assessment |
| PP-03 | Quiz setup takes too long (> 15 minutes) | Reduces effective learning time | Every quiz creation |
| PP-04 | No guest access | Students cannot join spontaneous quizzes | Every spontaneous quiz |
| PP-05 | Non-real-time reporting | Teachers cannot immediately act on results | Every quiz completion |
| PP-06 | Not scalable for new question types | Limited to vendor-provided features | When variety is needed |

### 4.3 Current Process Flow

```
TRADITIONAL PROCESS (Without Digital Platform):

1. Teacher creates questions in document (30-60 minutes)
2. Teacher prints questions for each student (15 minutes)
3. Distribute papers to students (5 minutes)
4. Students complete quiz (30-60 minutes)
5. Teacher collects and grades (60-120 minutes)
6. Enter grades manually to spreadsheet (15 minutes)
7. Feedback to students (1-2 days later)

Total time: 3-5 DAYS for feedback
Total teacher effort: 4-6 HOURS per quiz
```

---

## 5. FUTURE STATE VISION (TO-BE)

### 5.1 Solution Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FUTURE STATE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                   ┌─────────────────────────┐               │
│                   │   BRAINBLITZ (LITE)  │               │
│                   │      (New System)       │               │
│                   └───────────┬─────────────┘               │
│                               │                              │
│    ┌───────────┬──────────────┼──────────────┬───────────┐  │
│    │           │              │              │           │  │
│    ▼           ▼              ▼              ▼           ▼  │
│ ┌──────┐  ┌──────┐      ┌──────────┐  ┌──────┐   ┌──────┐  │
│ │ Auth │  │Course│      │Assessment│  │Question│  │Report│  │
│ │Module│  │Module│      │ Module   │  │ Module │  │Module│  │
│ └──────┘  └──────┘      └──────────┘  └──────┘   └──────┘  │
│                                                              │
│                   INTEGRATION LAYER                          │
│    ┌───────────┬───────────┬───────────┬───────────┐       │
│    │           │           │           │           │       │
│    ▼           ▼           ▼           ▼           ▼       │
│ ┌──────┐  ┌──────┐   ┌──────────┐  ┌──────┐   ┌──────┐    │
│ │Email │  │Session│  │ Database │  │Cache │   │Logger│    │
│ │Service│ │Manager│  │ (UUID+JSON)│ │Layer│   │System│    │
│ └──────┘  └──────┘   └──────────┘  └──────┘   └──────┘    │
│                                                              │
│    USER ACCESS LAYER                                         │
│    ┌─────────────────────────┐  ┌────────────────────────┐  │
│    │   TEACHER (Registered)  │  │ STUDENT (Guest)        │  │
│    │  • Register & Login     │  │ • Enter access code    │  │
│    │  • Create Course        │  │ • Input name           │  │
│    │  • Create Assessment    │  │ • Take quiz            │  │
│    │  • View Reports         │  │ • View score           │  │
│    └─────────────────────────┘  └────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Future Process Flow

```
NEW PROCESS (With BrainBlitz):

1. Teacher logs in and creates course (5 minutes)
2. Teacher creates assessment with questions (10-20 minutes)
3. Teacher shares access code with students (< 1 minute)
4. Students enter code + input name (2 minutes)
5. Students complete quiz (30-60 minutes)
6. Auto-grading immediately for objective questions (< 5 seconds)
7. Teacher views report in real-time

Total time: < 5 SECONDS for feedback (objective questions)
Total teacher effort: 15-25 MINUTES per quiz (improvement: 85-90%)
```

### 5.3 Gap Analysis

| Aspect | Current State | Future State | Gap |
|--------|---------------|--------------|-----|
| Student Onboarding | Full registration (5-10 minutes) | Guest access (2 minutes) | Need auto-register guest system with UUID |
| Question Types | 1-2 types (fixed schema) | 5+ types (JSON-based) | Need flexible schema design with JSON settings |
| Grading Speed | Manual (1-2 days) | Auto (< 5 seconds) | Need auto-grading algorithm per question type |
| Reporting | Batch/Manual | Real-time | Need database indexing and caching strategy |
| Scalability | Limited by vendor | Extensible via JSON | Need modular architecture with clear interfaces |

---

## 6. FUNCTIONAL REQUIREMENTS

### 6.1 Requirements Overview

| Module | Total Requirements | Must Have | Should Have | Nice to Have |
|--------|-------------------|-----------|-------------|--------------|
| Authentication & User Management | 8 | 6 | 2 | 0 |
| Course Management | 10 | 8 | 2 | 0 |
| Assessment Management | 9 | 7 | 2 | 0 |
| Question Management | 15 | 12 | 3 | 0 |
| Reporting & Analytics | 8 | 6 | 2 | 0 |
| Guest Student Experience | 12 | 10 | 2 | 0 |
| **Total** | **62** | **49** | **13** | **0** |

---

### 6.2 MODULE 1: AUTHENTICATION & USER MANAGEMENT

**Description:** Module for managing registration, login, and user profiles (Teacher registered users).

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M1-01 | As a Teacher, I want to register with email so that I can create an account | **Given** I am on the registration page<br>**When** I fill the form with valid email and password<br>**Then** account is created and verification email is sent | Must Have |
| US-M1-02 | As a Teacher, I want to login with email and password so that I can access the dashboard | **Given** I have a verified account<br>**When** I enter correct credentials<br>**Then** I am redirected to the dashboard | Must Have |
| US-M1-03 | As a Teacher, I want to verify my email so that my account becomes active | **Given** I just registered<br>**When** I click the verification link in the email<br>**Then** account status changes to active | Must Have |
| US-M1-04 | As a Teacher, I want to logout so that my session is secure | **Given** I am logged in<br>**When** I click logout<br>**Then** session is cleared and I am redirected to login page | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M1-01 | Teacher Registration | Registration form: name, email, password. Email must be unique. Password minimum 8 characters. | Must Have |
| FR-M1-02 | Password Hashing | Password hashed using bcrypt/argon2 before storage | Must Have |
| FR-M1-03 | Email Verification | Verification token sent via email, expires in 24 hours | Must Have |
| FR-M1-04 | Login Authentication | Validate email/password, create session token with expiry | Must Have |
| FR-M1-05 | Session Management | Session token stored in HTTP-only cookie, 24-hour expiry | Must Have |
| FR-M1-06 | Guest Auto-Registration | System auto-creates guest user with UUID when student joins quiz | Must Have |
| FR-M1-07 | User Role Management | Roles: 'teacher' and 'student_guest' with different permissions | Must Have |
| FR-M1-08 | Profile Management | Teacher can edit name, avatar, and profile information | Should Have |

---

### 6.3 MODULE 2: COURSE MANAGEMENT

**Description:** Module for creating, managing, and organizing Courses that will contain Assessments.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M2-01 | As a Teacher, I want to create a new course so that I can organize my classes | **Given** I am logged into the dashboard<br>**When** I click "Create Course" and fill the form<br>**Then** course is created with unique UUID | Must Have |
| US-M2-02 | As a Teacher, I want to set course as Private so that only students with access code can join | **Given** I am creating a course<br>**When** I select Private type<br>**Then** system generates 6-character access code | Must Have |
| US-M2-03 | As a Student Guest, I want to join a course with access code so that I can take the quiz | **Given** I have an access code<br>**When** I enter a valid code<br>**Then** I can see course info and join | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M2-01 | Create Course | Form: name, description, type (Public/Private), access_code (if Private) | Must Have |
| FR-M2-02 | Auto-Generate Access Code | System generates unique 6-character alphanumeric code for Private courses | Must Have |
| FR-M2-03 | Custom Access Code | Teacher can customize access code (min 6 characters, unique) | Should Have |
| FR-M2-04 | Course Visibility | Public courses are searchable, Private courses only via access code | Must Have |
| FR-M2-05 | Course Listing | Teacher can view all created courses with statistics | Must Have |
| FR-M2-06 | Edit Course | Teacher can edit course details (name, description, type) | Must Have |
| FR-M2-07 | Delete Course | Delete course with cascade to assessments (soft delete) | Must Have |
| FR-M2-08 | View Enrolled Students | Teacher can view list of enrolled students with status | Must Have |
| FR-M2-09 | Student Enrollment | Auto-enrollment when guest student joins with access code | Must Have |
| FR-M2-10 | Course Activation | Toggle active/inactive for course, inactive courses cannot be joined | Should Have |

---

### 6.4 MODULE 3: ASSESSMENT MANAGEMENT

**Description:** Module for creating and managing Assessments (Quizzes) within a Course.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M3-01 | As a Teacher, I want to create an assessment in a course so that I can evaluate students | **Given** I have a course<br>**When** I click "Create Assessment" and fill the form<br>**Then** assessment is created as draft | Must Have |
| US-M3-02 | As a Teacher, I want to set time limit for quiz so that students have time constraints | **Given** I am creating an assessment<br>**When** I set time_limit = 30 minutes<br>**Then** countdown timer displays when students take quiz | Must Have |
| US-M3-03 | As a Teacher, I want to publish assessment so that students can complete it | **Given** assessment is in draft status<br>**When** I click "Publish"<br>**Then** status changes and students can access | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M3-01 | Create Assessment | Form: title, description, time_limit, open_date, close_date | Must Have |
| FR-M3-02 | Assessment Status | Status: draft, published, archived. Default: draft | Must Have |
| FR-M3-03 | Time Limit Configuration | Time limit in minutes, optional (null = unlimited) | Must Have |
| FR-M3-04 | Schedule Management | open_date and close_date for temporal access control | Must Have |
| FR-M3-05 | Assessment Listing | List assessments in course with statistics (number of questions, students who completed) | Must Have |
| FR-M3-06 | Edit Assessment | Edit assessment details, only if no one has completed it yet | Must Have |
| FR-M3-07 | Delete Assessment | Soft delete assessment with cascade to questions | Should Have |
| FR-M3-08 | Publish/Unpublish | Toggle published status to enable/disable student access | Must Have |
| FR-M3-09 | Assessment Preview | Preview assessment as students will see it | Should Have |

---

### 6.5 MODULE 4: QUESTION MANAGEMENT

**Description:** Module for creating and managing questions with various types using JSON-based scalable architecture.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M4-01 | As a Teacher, I want to create Multiple Choice questions so that I can evaluate factual knowledge | **Given** I am in the question editor<br>**When** I select Multiple Choice type and input options<br>**Then** question is saved with shuffle configuration | Must Have |
| US-M4-02 | As a Teacher, I want to create Essay questions so that I can evaluate deep understanding | **Given** I am in the question editor<br>**When** I select Essay type<br>**Then** question is marked as requiring manual grading | Must Have |
| US-M4-03 | As a Teacher, I want to create Match questions so that I can evaluate association skills | **Given** I am in the question editor<br>**When** I select Match type and input pairs<br>**Then** question is saved with pair_id | Should Have |
| US-M4-04 | As a Teacher, I want to create Reorder questions so that I can evaluate sequencing skills | **Given** I am in the question editor<br>**When** I select Reorder type and set correct order<br>**Then** question is saved with correct_order | Should Have |

#### Functional Requirements Detail

##### Multiple Choice

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-01 | Create Multiple Choice | Question with 2-10 options, 1 or more correct answers | Must Have |
| FR-M4-02 | Shuffle Options | Options can be shuffled when presented to students | Must Have |
| FR-M4-03 | Single/Multiple Answer | Configuration whether there is 1 or more correct answers | Must Have |

##### Essay

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-04 | Create Essay | Question with text area for long answers | Must Have |
| FR-M4-05 | Manual Grading Flag | Essay marked as requires_manual_grading = true | Must Have |
| FR-M4-06 | Grading Rubric | Teacher can input grading rubric in extra_data | Should Have |

##### Fill in the Blank

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-07 | Create Fill Blank | Short answer question with multiple accepted_answers | Must Have |
| FR-M4-08 | Case Sensitivity | Configuration whether answers are case-sensitive | Must Have |
| FR-M4-09 | Multiple Accepted Answers | Support multiple answer variations that are correct | Must Have |

##### Match

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-10 | Create Match | Question with left-right item pairs | Should Have |
| FR-M4-11 | Shuffle Match Items | Left items can be shuffled, right items remain fixed | Should Have |
| FR-M4-12 | Pair Identification | Each pair identified with pair_id in extra_data | Should Have |

##### Reorder

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-13 | Create Reorder | Question ordering items with correct_order | Should Have |
| FR-M4-14 | Partial Credit | Partial score based on number of correct positions | Should Have |

##### General Question Features

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-15 | Question Editor | WYSIWYG editor for question_text (supports rich text) | Must Have |
| FR-M4-16 | Points Configuration | Set points per question (default 10) | Must Have |
| FR-M4-17 | Sort Order | Arrange question order in assessment | Must Have |
| FR-M4-18 | Question Preview | Preview question before publishing | Must Have |
| FR-M4-19 | Edit/Delete Question | Edit or delete created questions | Must Have |
| FR-M4-20 | JSON Schema Validation | Validate settings and extra_data according to question_type | Must Have |

---

### 6.6 MODULE 5: REPORTING & ANALYTICS

**Description:** Module for displaying results and analysis of student performance in assessments.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M5-01 | As a Teacher, I want to see all student scores so that I can monitor class progress | **Given** assessment has completions<br>**When** I open the report page<br>**Then** score table of all students is displayed | Must Have |
| US-M5-02 | As a Teacher, I want to see detailed answers per student so that I can understand weaknesses | **Given** I am viewing a student's result<br>**When** I click on student name<br>**Then** detailed answers with correct/wrong indicators are shown | Must Have |
| US-M5-03 | As a Student Guest, I want to see my score after submission so that I know my result | **Given** I finished the quiz<br>**When** I submit answers<br>**Then** score and answer review are displayed | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M5-01 | Score Table View | Table: student name, score, percentage, time spent, status | Must Have |
| FR-M5-02 | Sort & Filter | Sort by score/name, filter by date | Must Have |
| FR-M5-03 | Individual Report | Detail answers per student with correct/wrong indicator | Must Have |
| FR-M5-04 | Question Analysis | Statistics per question: % correct, % wrong, % blank | Should Have |
| FR-M5-05 | Export Scores | Export score table to CSV/Excel | Should Have |
| FR-M5-06 | Student Result View | Result page for student with score and review | Must Have |
| FR-M5-07 | Pending Grading Indicator | Mark essay questions requiring manual grading | Must Have |
| FR-M5-08 | Manual Grading Interface | Interface for teacher to grade essays with rubric | Must Have |

---

### 6.7 MODULE 6: GUEST STUDENT EXPERIENCE

**Description:** Module for Student Guest experience from joining to viewing results.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M6-01 | As a Student Guest, I want to enter access code so that I can join a quiz | **Given** I am on the join page<br>**When** I enter a valid access code<br>**Then** course/quiz info is displayed | Must Have |
| US-M6-02 | As a Student Guest, I want to input my name so that I can identify myself | **Given** access code is valid<br>**When** I enter my full name<br>**Then** system auto-registers me as guest | Must Have |
| US-M6-03 | As a Student Guest, I want to take quiz with timer so that I know remaining time | **Given** I am in quiz session<br>**When** timer is running<br>**Then** clear countdown is displayed | Must Have |
| US-M6-04 | As a Student Guest, I want my answers to auto-save so that they won't be lost if connection drops | **Given** I am answering<br>**When** I input answers<br>**Then** answers auto-save every 30 seconds | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M6-01 | Access Code Entry | Access code input form (case-insensitive) | Must Have |
| FR-M6-02 | Code Validation | Validate code exists, course active, within date range | Must Have |
| FR-M6-03 | Guest Name Input | Name input form (min 3 characters, max 100) | Must Have |
| FR-M6-04 | Auto-Register Guest | Create user with student_guest role, email guest_{uuid}@quizizz.local | Must Have |
| FR-M6-05 | Auto-Enrollment | Create enrollment record when guest joins | Must Have |
| FR-M6-06 | Quiz Info Display | Display: title, number of questions, time limit before starting | Must Have |
| FR-M6-07 | Quiz Interface | Question navigation, answer input per type, progress indicator | Must Have |
| FR-M6-08 | Timer Display | Countdown timer with warnings (5 min, 1 min, 30 sec) | Must Have |
| FR-M6-09 | Auto-Save | Auto-save answers to database every 30 seconds | Must Have |
| FR-M6-10 | Manual Submit | Submit before time expires with confirmation | Must Have |
| FR-M6-11 | Auto-Submit | Auto-submit when timer reaches 00:00 | Must Have |
| FR-M6-12 | Result Display | Display score, correct/wrong breakdown, time spent | Must Have |

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-PERF-01 | Page load time | < 3 seconds for all main pages | Must Have |
| NFR-PERF-02 | API response time | < 500 ms (95th percentile) | Must Have |
| NFR-PERF-03 | Concurrent users | Support 1000+ concurrent quiz takers per instance | Must Have |
| NFR-PERF-04 | Database query time | < 100 ms for common queries | Must Have |
| NFR-PERF-05 | Quiz submit processing | < 2 seconds for auto-grading and save | Must Have |
| NFR-PERF-06 | Report generation | < 3 seconds for generating score table | Should Have |

### 7.2 Availability & Reliability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-AVL-01 | System uptime | 99.5% availability | Must Have |
| NFR-AVL-02 | RTO (Recovery Time Objective) | < 4 hours | Must Have |
| NFR-AVL-03 | RPO (Recovery Point Objective) | < 1 hour | Must Have |
| NFR-AVL-04 | Backup frequency | Daily automated backup | Must Have |
| NFR-AVL-05 | Auto-save resilience | Answers not lost if disconnect < 30 seconds | Must Have |

### 7.3 Security

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-SEC-01 | UUID Implementation | UUID v4 for all primary keys | Must Have |
| NFR-SEC-02 | Password Hashing | bcrypt with cost factor 10+ | Must Have |
| NFR-SEC-03 | Session Security | HTTP-only cookies, secure flag, sameSite = strict | Must Have |
| NFR-SEC-04 | Access Code Protection | Access code not exposed in public API responses | Must Have |
| NFR-SEC-05 | SQL Injection Prevention | Parameterized queries / ORM for all DB access | Must Have |
| NFR-SEC-06 | XSS Prevention | Input sanitization and output encoding | Must Have |
| NFR-SEC-07 | Rate Limiting | 100 requests/minute per IP to prevent abuse | Should Have |
| NFR-SEC-08 | HTTPS Enforcement | All traffic via TLS 1.3 | Must Have |
| NFR-SEC-09 | Audit Logging | Log all user actions (create, update, delete) | Must Have |

### 7.4 Scalability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-SCL-01 | Question Type Scalability | JSON architecture supports 10+ question types without schema change | Must Have |
| NFR-SCL-02 | Horizontal Scaling | Stateless architecture, support load balancing | Should Have |
| NFR-SCL-03 | Data Growth | Support 100,000+ questions and 1,000,000+ responses | Must Have |
| NFR-SCL-04 | User Growth | Support 10,000+ registered teachers | Must Have |
| NFR-SCL-05 | Database Indexing | Index on access_code, user_id, assessment_id | Must Have |

### 7.5 Usability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-USE-01 | Browser Support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | Must Have |
| NFR-USE-02 | Responsive Design | Support desktop (1920x1080), tablet (768x1024), mobile (375x667) | Must Have |
| NFR-USE-03 | Language | English (default), Bahasa Indonesia | Must Have |
| NFR-USE-04 | Guest Flow Simplicity | Join quiz in maximum 3 steps | Must Have |
| NFR-USE-05 | Error Messages | User-friendly error messages with actionable guidance | Should Have |
| NFR-USE-06 | Accessibility | WCAG 2.1 Level AA (target future release) | Nice to Have |

### 7.6 Compliance

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-COMP-01 | Data Residency | Data stored in Indonesia servers (if applicable) | Should Have |
| NFR-COMP-02 | Privacy Compliance | Guest data retained max 1 year, can be deleted | Should Have |
| NFR-COMP-03 | Audit Support | Export logs for audit purposes | Must Have |

---

## 8. BUSINESS RULES & CONSTRAINTS

### 8.1 Business Rules

| ID | Rule | Description |
|----|------|-------------|
| BR-01 | Teacher Ownership | Teacher is the full owner of created courses, only that teacher can edit/delete |
| BR-02 | Access Code Uniqueness | Access code must be unique across the entire system (case-insensitive) |
| BR-03 | Course Enrollment | A student can only enroll once per course (no duplicate enrollment) |
| BR-04 | Assessment Attempt | A student can only complete an assessment once (no re-take without teacher reset) |
| BR-05 | Guest User Lifetime | Guest user record retained for max 1 year after last activity |
| BR-06 | Auto-Grading Rules | Only objective questions (Multiple Choice, Fill Blank, Match, Reorder) are auto-graded. Essay requires manual grading |
| BR-07 | Score Calculation | Total score = sum(points_earned) from all questions. Ungraded essays = 0 temporary points |
| BR-08 | Timer Behavior | When timer expires, saved answers are automatically submitted |
| BR-09 | Course Type Change | Course can be changed from Public to Private or vice versa, but access_code must be set if changing to Private |
| BR-10 | Assessment Publishing | Assessment can only be completed by students if status = 'published' and within date range |

### 8.2 Constraints

| ID | Constraint | Impact |
|----|------------|--------|
| CON-01 | Guest User Limitation | Guest students cannot access advanced features (history tracking, multiple attempts) |
| CON-02 | No Mobile App | Web-based only, no native mobile application in this phase |
| CON-03 | No Payment Integration | No paid course or subscription features in lite version |
| CON-04 | No Live Multiplayer | No live quiz with real-time leaderboard feature in lite version |
| CON-05 | Browser Dependency | Auto-save and timer features depend on browser JavaScript being enabled |
| CON-06 | Email Verification Required | Teacher must verify email before creating courses |
| CON-07 | UUID Storage Overhead | UUID (128-bit) is larger than auto-increment integer, impact on storage and index size |
| CON-08 | JSON Validation Complexity | JSON settings validation requires additional logic at application layer |

---

## 9. DATA REQUIREMENTS

### 9.1 Data Entities

| Entity | Source | Volume (Est.) | Update Frequency |
|--------|--------|---------------|------------------|
| users | Generated | 10,000+ records (Year 1) | Low (teacher registration + auto guest) |
| courses | Teacher Input | 1,000+ records | Low (create/edit course) |
| course_enrollments | Auto-Generated | 100,000+ records | Medium (when student joins) |
| assessments | Teacher Input | 5,000+ records | Medium (create/edit assessment) |
| questions | Teacher Input | 50,000+ records | Medium (create/edit questions) |
| question_options | Teacher Input | 200,000+ records | Low (set during question creation) |
| student_responses | Auto-Generated | 500,000+ records | High (when student takes quiz) |
| response_details | Auto-Generated | 5,000,000+ records | High (every answer per question) |

### 9.2 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │   Teacher    │─────────────────┐                         │
│  │  (Register)  │                 │                         │
│  └──────────────┘                 ▼                         │
│                            ┌──────────────┐                 │
│         ┌──────────────────│    users     │                 │
│         │                  │  (UUID PK)   │                 │
│         │                  └──────────────┘                 │
│         │                           │                       │
│         │         ┌─────────────────┴─────────┐             │
│         │         │                           │             │
│         ▼         ▼                           │             │
│  ┌──────────────┐                    ┌──────────────┐       │
│  │   courses    │                    │student_responses│    │
│  │  (UUID PK)   │◄───────────────────│  (UUID PK)   │       │
│  └──────────────┘   assessment_id    └──────────────┘       │
│         │                           │         │              │
│         │                           │         │              │
│         ▼                           ▼         ▼              │
│  ┌──────────────┐            ┌──────────────┐                │
│  │ assessments  │            │response_details│               │
│  │  (UUID PK)   │            │  (UUID PK)   │                │
│  └──────────────┘            └──────────────┘                │
│         │                           │                        │
│         │                           │                        │
│         ▼                           ▼                        │
│  ┌──────────────┐            ┌──────────────┐                │
│  │  questions   │────────────│question_options│               │
│  │  (UUID PK)   │  question_id│  (UUID PK)   │                │
│  │  (JSON)      │            │  (JSON)      │                │
│  └──────────────┘            └──────────────┘                │
│                                                              │
│  ┌──────────────┐                                           │
│  │Student Guest │                                           │
│  │  (Join Quiz) │                                           │
│  └──────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.3 Data Quality Requirements

| Aspect | Requirement |
|--------|-------------|
| Completeness | All required fields (NOT NULL) must be filled. Validation at application layer before insert |
| Accuracy | UUID auto-generated, no manual input for primary keys. Foreign key constraints enforced |
| Timeliness | Timestamps (created_at, updated_at) auto-update. Response data real-time on submit |
| Consistency | Status transitions validated (e.g., draft → published, cannot go directly draft → archived) |
| Integrity | Cascade delete for soft deletes. Hard delete only for guest users > 1 year inactive |

---

## 10. ASSUMPTIONS & DEPENDENCIES

### 10.1 Assumptions

| ID | Assumption | Risk if Invalid |
|----|------------|-----------------|
| ASM-01 | Teachers have stable internet access for creating courses | If not, course creation/editing may be interrupted and data may be lost |
| ASM-02 | Students have devices (phone/laptop) with modern browsers | If not, students cannot take quizzes |
| ASM-03 | Email service (SMTP) is available and reliable for verification | If not, teachers cannot activate accounts |
| ASM-04 | UUID v4 collision is extremely rare (1 in 2^122) so no special handling needed | If collision occurs, it can cause data corruption |
| ASM-05 | Guest student names entered are real/valid | If not, reporting and student identification become inaccurate |
| ASM-06 | Teachers are competent in using basic web technologies | If not, additional training and onboarding is required |

### 10.2 Dependencies

| ID | Dependency | Owner | Impact if Delayed |
|----|------------|-------|-------------------|
| DEP-01 | Email Service (SMTP) Configuration | DevOps | Teacher registration will not function |
| DEP-02 | Database Server (PostgreSQL) Setup | DevOps | Entire system cannot run |
| DEP-03 | SSL/TLS Certificate for HTTPS | DevOps | Security requirement not met |
| DEP-04 | Frontend Framework (React) Setup | Tech Lead | Frontend development delayed |
| DEP-05 | Backend Framework (Next.js API) Setup | Tech Lead | Backend development delayed |
| DEP-06 | UI/UX Design Mockups | Designer | Developers have no visual reference |
| DEP-07 | Testing Environment Setup | QA | UAT cannot be performed |

---

## 11. SUCCESS METRICS & KPIs

### 11.1 Project KPIs

| KPI | Target | Measurement |
|-----|--------|-------------|
| On-time Delivery | 100% milestones met | Project schedule tracking (Jira/Trello) |
| Budget Compliance | ≤ 100% of budget | Financial reporting |
| Defect Rate | < 10 major bugs at UAT | Defect tracking system |
| Scope Completion | 100% Must Have requirements delivered | Requirements traceability matrix |
| Code Coverage | > 80% unit test coverage | CI/CD pipeline reports |

### 11.2 Product KPIs (Post Go-Live)

| KPI | Baseline | Target (3 months) | Measurement |
|-----|----------|-------------------|-------------|
| Teacher Registration | 0 | 100+ registered teachers | Database count |
| Course Creation | 0 | 50+ active courses | Database count |
| Quiz Completion Rate | N/A | > 90% students complete quiz | response_details / started |
| Average Join Time | N/A | < 2 minutes from code to quiz start | Session timing logs |
| System Uptime | N/A | > 99.5% | Monitoring tools (Prometheus/Grafana) |
| Page Load Time | N/A | < 3 seconds (p95) | APM tools (New Relic/DataDog) |
| User Satisfaction | N/A | NPS > 50 | User survey (post-quiz) |
| Auto-Grading Accuracy | N/A | 100% for objective questions | QA testing |

### 11.3 Success Criteria Summary

**Project is considered SUCCESSFUL if:**

1. ✅ Go-live on schedule (estimated: 8-12 weeks development)
2. ✅ Budget does not exceed approved ceiling
3. ✅ All Must Have requirements (49 items) delivered and tested
4. ✅ Zero critical bugs at go-live
5. ✅ 100+ teachers registered within first 3 months
6. ✅ 90%+ students can join and complete quiz without technical assistance
7. ✅ System uptime > 99.5% in first 3 months
8. ✅ Average page load time < 3 seconds for all main pages

---

## 12. TECHNOLOGY STACK

### 12.1 Technology Stack Overview

This section defines the complete technology stack for the BrainBlitz as specified in the Implementation & Technical Architecture (ITA) document.

```
┌─────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND          │  BACKEND           │  DATA             │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Next.js 15      │  • Next.js API     │  • Supabase       │
│  • TypeScript 5    │    Routes          │    (PostgreSQL)   │
│  • Tailwind CSS 4  │  • Server Actions  │  • Prisma ORM     │
│  • Shadcn/ui       │  • Zod Validation  │  • Supabase Auth  │
│  • TanStack Query  │  • Supabase JS     │  • Supabase       │
│  • React Hook Form │    Client          │    Storage        │
│  • Zod             │  • Edge Runtime    │                   │
│  • Lucide React    │                    │                   │
│                                                              │
│  INFRASTRUCTURE    │  DEVOPS            │  INTEGRATION      │
│  ─────────────     │  ─────────────     │  ─────────────    │
│  • Vercel          │  • GitHub Actions  │  • Google OAuth   │
│  • Supabase        │  • ESLint          │  • Email (Resend) │
│  • Edge Network    │  • Prettier        │  • reCAPTCHA      │
│  • CDN             │  • Husky           │                   │
│  • Blob Storage    │  • Playwright      │                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Frontend Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| **Framework** | Next.js | 15.x (App Router) | Server Components, API Routes, optimal performance |
| **Language** | TypeScript | 5.x | Type safety, better DX, catch errors early |
| **State Management** | TanStack Query | 5.x | Server state management, caching, background sync |
| **Form State** | React Hook Form | 8.x | Performant form handling, minimal re-renders |
| **Styling** | Tailwind CSS | 4.x | Utility-first, consistent design, small bundle |
| **UI Components** | Shadcn/ui | Latest | Accessible, customizable, copy-paste components |
| **Icons** | Lucide React | Latest | Consistent icon set, tree-shakeable |
| **Validation** | Zod | 3.x | Schema validation, type inference, client+server |
| **HTTP Client** | Fetch API (native) | - | Built-in, no extra dependency, works with Next.js |
| **Date Handling** | date-fns | 3.x | Lightweight, modular, tree-shakeable |
| **Charts** | Recharts | 2.x | Composable, responsive, works well with React |

### 12.3 Backend Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| **Runtime** | Next.js API Routes | 15.x | Integrated with frontend, edge runtime support |
| **Framework** | Next.js App Router | 15.x | Server Actions, Route Handlers, middleware |
| **Language** | TypeScript | 5.x | Type safety end-to-end |
| **ORM** | Prisma | 6.x | Type-safe queries, migrations, excellent DX |
| **Validation** | Zod | 3.x | Request validation, type inference, error messages |
| **Authentication** | Supabase Auth | Latest | Email/password + Google OAuth, JWT sessions |
| **Database Client** | Supabase JS | 2.x | PostgreSQL with realtime, RLS, storage |
| **API Documentation** | OpenAPI (via types) | 3.0 | Auto-generated from TypeScript types |
| **Logging** | Pino (via Vercel) | - | Structured logging, Vercel Analytics integration |
| **Testing** | Playwright + Vitest | Latest | E2E + Unit testing |

### 12.4 Database Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Primary Database** | Supabase (PostgreSQL) | 15.x | All application data, 8 core tables |
| **Auth** | Supabase Auth | Latest | User authentication, sessions, OAuth |
| **Object Storage** | Supabase Storage | Latest | User avatars, course covers, question assets |
| **Realtime** | Supabase Realtime | Latest | Live quiz updates (future feature) |
| **Edge Functions** | Supabase Edge Functions | Latest | Custom backend logic (if needed) |

### 12.5 Infrastructure Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **Hosting** | Vercel | Latest | Next.js optimized hosting, edge network |
| **Database Hosting** | Supabase Cloud | Latest | Managed PostgreSQL, auth, storage |
| **CDN** | Vercel Edge Network | - | Global content delivery, caching |
| **DNS** | Vercel DNS | - | Domain management, SSL certificates |
| **Secret Management** | Vercel Environment Variables | - | Secure env var management |

### 12.6 DevOps Stack

| Component | Technology | Version | Use Case |
|-----------|------------|---------|----------|
| **CI/CD** | GitHub Actions | Latest | Automated testing, deployment |
| **Version Control** | Git + GitHub | Latest | Source control, PR reviews |
| **Package Manager** | pnpm | 9.x | Fast, disk-efficient dependency management |
| **Code Quality** | ESLint + Prettier | Latest | Linting, formatting, consistency |
| **Type Checking** | TypeScript | 5.x | Compile-time type checking |
| **Testing** | Playwright + Vitest | Latest | E2E + Unit testing |
| **Security Scanning** | GitHub Dependabot | Latest | Dependency vulnerability alerts |
| **Pre-commit Hooks** | Husky + lint-staged | Latest | Auto-format, lint before commit |

### 12.7 Architecture Principles

| Principle | Description | Rationale |
|-----------|-------------|-----------|
| **Component-Driven** | All UI built from reusable composable components | UI consistency, maintainability, development speed |
| **Type Safety First** | TypeScript strict mode across entire codebase | Prevent runtime errors, better DX, self-documenting code |
| **Server Components Default** | Next.js App Router with Server Components as default | Performance, SEO, reduced bundle size |
| **Single Source of Truth** | Supabase as primary database and auth provider | Data consistency, reduced complexity |
| **API Versioning** | All API endpoints follow pattern `/api/v1/{context}/{resource}/{action}` | Future-proof, clear API structure |
| **Validation Everywhere** | Zod schema validation on client and server | Type safety end-to-end, consistent error handling |

### 12.8 Development Environment

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20.x LTS (or 22.x) | JavaScript runtime |
| pnpm | 9.x | Package manager |
| Git | 2.x | Version control |
| VS Code | Latest | Recommended IDE |
| Supabase CLI | Latest (optional) | Local Supabase development |

### 12.9 Recommended IDE Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "msjsdiag.vscode-react-native"
  ]
}
```

---

## 13. GLOSSARY

| Term | Definition |
|------|------------|
| **Access Code** | Unique 6-character alphanumeric code to join Private courses |
| **Assessment** | Quiz or assessment containing a collection of questions within a Course |
| **Course** | Class or subject created by Teacher, can contain multiple Assessments |
| **Guest Student** | Student who does not perform formal registration, joins as guest via access code |
| **Question Options** | Answer options for Multiple Choice questions, or items for Match/Reorder |
| **Question Settings** | JSON configuration for type-specific properties (shuffle, case_sensitive, etc.) |
| **Question Extra Data** | JSON data for question complexities (pair_id, correct_order, accepted_answers) |
| **Student Response** | Record of quiz completion by student, contains score and submission status |
| **Response Details** | Answer details per question in a Student Response |
| **Teacher** | Registered user with 'teacher' role, has authority to create Courses and Assessments |
| **UUID** | Universally Unique Identifier (128-bit) used as primary key for all tables |
| **Auto-Grading** | Automatic grading process for objective questions (Multiple Choice, Fill Blank, Match, Reorder) |
| **Manual Grading** | Grading performed manually by Teacher, usually for Essay questions |
| **Public Course** | Course that can be searched and viewed by anyone without access code |
| **Private Course** | Course that requires access code to join |
| **Soft Delete** | Data deletion by setting is_active/inactive flag, not physical delete from database |
| **Enrollment** | Record representing a student joining a Course |

---

## 14. APPROVAL SIGN-OFF

### 14.1 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | _________________ | _________________ | _________ |
| Product Owner | _________________ | _________________ | _________ |
| Business Owner | _________________ | _________________ | _________ |
| IT Owner | _________________ | _________________ | _________ |
| Tech Lead | _________________ | _________________ | _________ |

### 14.2 Requirements Approval

By signing this document, stakeholders agree that:

1. ✅ Requirements have been reviewed and thoroughly understood
2. ✅ Scope aligns with business needs and priorities
3. ✅ Requirement priorities (Must/Should/Nice to Have) are appropriate
4. ✅ This document becomes the baseline for development and change management
5. ✅ Any scope changes after approval will go through change request process

---

## APPENDICES

### Appendix A: Related Document References

| Document | Location |
|----------|----------|
| Project Execution Plan | `/docs/project/02-project-execution-plan.md` |
| Implementation & Architecture | `/docs/project/03-implementation-and-architecture.md` |
| Database Schema | `/docs/project/04-database-schema.md` (To be created) |
| API Documentation | `/docs/project/05-api-specification.md` (To be created) |

### Appendix B: Question Type JSON Examples

See Section 6.5 for complete JSON schema examples for each question type.

### Appendix C: User Journey Maps

See Section 2 for detailed user personas and journey maps.

---

*This document is part of the BrainBlitz Project Documentation*
*Location: `/docs/project/01-bussiness-requirement.md`*
*LearnWeb LMS Project © 2026*
