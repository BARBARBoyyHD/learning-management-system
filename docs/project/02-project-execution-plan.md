# PROJECT EXECUTION PLAN
## BrainBlitz
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-PEP-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Project Management Team |
| Created | Februari 2026 |
| Last Updated | 25 Februari 2026 |
| Reviewed By | - |
| Approved By | Project Sponsor |

---

## Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 25 Februari 2026 | PM Team | Initial version based on BRD v1.0 |

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Project Organization](#3-project-organization)
4. [Scope Management](#4-scope-management)
5. [Work Breakdown Structure](#5-work-breakdown-structure)
6. [Module & Feature Schedule](#6-module--feature-schedule)
7. [Sprint Planning Detail](#7-sprint-planning-detail)
8. [Timeline & Milestones](#8-timeline--milestones)
9. [Resource Plan](#9-resource-plan)
10. [Communication Plan](#10-communication-plan)
11. [Risk Management](#11-risk-management)
12. [Quality Assurance Plan](#12-quality-assurance-plan)
13. [Deliverables Matrix](#13-deliverables-matrix)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Project Snapshot

| Attribute | Value |
|-----------|-------|
| Project Name | BrainBlitz |
| Project Code | QCL-2026-001 |
| Start Date | Maret 2026 (M1) |
| End Date | Agustus 2026 (M6) |
| Duration | 6 bulan |
| Methodology | Agile Scrum (Hybrid) |
| Sprint Duration | 2 minggu |
| Total Sprints | 12 sprints (development) |
| Budget | IDR 500.000.000 - 750.000.000 |

### 1.2 Key Milestones Summary

| Milestone | Target Date | Description |
|-----------|-------------|-------------|
| M1: Project Kickoff | Maret 2026 W1 | Contract signed, team onboarded |
| M2: Design Complete | Maret 2026 W4 | UI/UX dan Architecture approved |
| M3: MVP Ready | Mei 2026 W2 | Core modules functional (Auth, Course, Quiz Taking) |
| M4: Feature Complete | Juli 2026 W2 | All features developed |
| M5: UAT Complete | Juli 2026 W4 | User acceptance signed |
| M6: Go-Live | Agustus 2026 W1 | Production deployment |

### 1.3 Phase Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJECT TIMELINE                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  M1──────M2──────M3──────M4──────M5──────M6                            │
│  │       │       │       │       │       │                             │
│  │PHASE 0│    PHASE 1    │     PHASE 2      │  PHASE 3  │  PHASE 4    │
│  │ Setup │   Design      │   Development    │  Testing  │  Rollout    │
│  │       │               │                  │           │             │
│  ├───────┼───────────────┼──────────────────┼───────────┼─────────────┤
│  │1 bulan│     1 bulan   │     3 bulan      │  1 bulan  │  1 bulan    │
│  │       │               │                  │           │             │
│  │ S0-S1 │    S2-S3      │    S4-S9         │  S10-S11  │  S12        │
│  │       │               │                  │           │             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PROJECT OVERVIEW

### 2.1 Project Description

BrainBlitz adalah proyek pengembangan aplikasi berbasis web untuk kuis interaktif yang mendukung berbagai jenis soal (Multiple Choice, Essay, Fill in the Blank, Match, dan Reorder) dalam sistem Course yang terstruktur. Aplikasi ini dirancang untuk memfasilitasi guru (Teacher) dalam membuat dan mengelola assessment, sementara siswa dapat bergabung sebagai guest user hanya dengan access code dan nama tanpa registrasi formal.

Proyek ini akan dieksekusi menggunakan metodologi Agile Scrum dengan adaptasi hybrid, menggabungkan iterative development untuk fitur dengan dokumentasi comprehensive untuk requirement tracking. Development akan dibagi dalam 12 sprint (2 minggu per sprint) dengan fokus bertahap: foundation & design (Sprint 0-3), core development (Sprint 4-9), testing & stabilization (Sprint 10-11), dan deployment (Sprint 12).

### 2.2 Project Objectives

Referensi: BRD Section 2.2 - Business Objectives (BO-01 s/d BO-04)

| ID | Objective | Target |
|----|-----------|--------|
| BO-01 | Simplifikasi Student Onboarding | < 2 menit dari enter code sampai mulai kuis |
| BO-02 | Fleksibilitas Assessment | 5 jenis soal pada release pertama |
| BO-03 | Skalabilitas Sistem | 1000+ concurrent users |
| BO-04 | Visibility Hasil Belajar | Skor tersedia < 5 detik setelah submit |

### 2.3 Success Criteria

| Criteria | Target | Measurement Method |
|----------|--------|-------------------|
| Timeline | Go-live M6 (Agustus 2026) | Project schedule tracking |
| Budget | ≤ IDR 750.000.000 | Financial tracking |
| Scope | 100% Must Have (49 requirements) | Requirements traceability matrix |
| Quality | < 10 critical bugs at UAT | Defect tracking system (Jira) |
| Adoption | 100+ teachers dalam 3 bulan | Database analytics |

### 2.4 Methodology

**Agile Scrum (Hybrid)** dengan adaptasi:
- **Sprint duration:** 2 minggu
- **Sprint ceremonies:** Sprint Planning, Daily Standup, Sprint Review, Sprint Retrospective
- **Artifacts:** Product Backlog, Sprint Backlog, Increment, Burndown Chart
- **Definition of Done per sprint:**
  - Code complete dan unit tests pass (>80% coverage)
  - Code review approved oleh Tech Lead
  - Integration tests pass
  - Deployed ke staging environment
  - Demo ke stakeholder

---

## 3. PROJECT ORGANIZATION

### 3.1 Organization Structure

```
                    ┌─────────────────────┐
                    │  STEERING COMMITTEE │
                    │  - Project Sponsor  │
                    │  - Business Owner   │
                    │  - IT Director      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   PROJECT SPONSOR   │
                    │   [Nama/TBD]        │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
┌─────────▼─────────┐ ┌───────▼────────┐ ┌────────▼────────┐
│   CLIENT TEAM     │ │  VENDOR TEAM   │ │  SUPPORT TEAM   │
│                   │ │                │ │                 │
│ - Project Manager │ │ - Tech Lead    │ │ - DevOps        │
│ - Business Analyst│ │ - Backend Dev  │ │ - Security      │
│ - Subject Matter  │ │ - Frontend Dev │ │ - Infrastructure│
│   Expert (SME)    │ │ - UI/UX        │ │                 │
│                   │ │ - QA Engineer  │ │                 │
└───────────────────┘ └────────────────┘ └─────────────────┘
```

### 3.2 Team Composition

#### Client Internal Team

| Role | Name | Allocation | Responsibilities |
|------|------|------------|------------------|
| Project Manager | TBD | 50% | Overall project delivery, stakeholder management, budget tracking |
| Business Analyst | TBD | 100% | Requirements clarification, UAT coordination, documentation review |
| Subject Matter Expert (SME) | TBD (Teacher) | 25% | Domain expertise, user feedback, UAT execution |
| IT Liaison | TBD | 25% | Infrastructure coordination, security review, IT policy alignment |

#### Vendor Team (Expected)

| Role | Count | Allocation | Responsibilities |
|------|-------|------------|------------------|
| Tech Lead | 1 | 100% | Architecture design, technical decisions, code review, mentoring |
| Backend Developer | 2 | 100% | API development, database design, integration, auto-grading logic |
| Frontend Developer | 2 | 100% | UI development, responsive design, quiz interface, real-time features |
| UI/UX Designer | 1 | 100% (M1-M2), 50% (M3-M4), 25% after | Design system, mockups, prototyping, usability testing |
| QA Engineer | 1 | 50% (M1-M2), 100% (M3-M6) | Test planning, test case creation, automation, execution |
| DevOps Engineer | 1 | 50% | CI/CD pipeline, deployment, infrastructure setup, monitoring |

### 3.3 RACI Matrix

| Deliverable | Steering | Sponsor | PM Client | BA | Tech Lead | Dev Team | QA |
|-------------|----------|---------|-----------|----|-----------|-----------|----|
| Project Charter | A | R | R | C | C | I | I |
| Requirements (BRD) | I | A | R | R | C | C | C |
| Architecture Design | I | A | C | C | R | R | C |
| UI/UX Design | I | A | R | R | C | R | C |
| Sprint Planning | I | I | A | R | R | R | C |
| Development | I | I | A | C | R | R | C |
| Code Review | I | I | I | I | A | R | C |
| Testing | I | I | A | C | C | C | R |
| UAT | I | A | R | R | C | C | C |
| Deployment | I | A | R | C | R | R | C |
| Training | I | A | R | R | C | C | I |
| Go-Live Decision | A | R | R | C | C | I | C |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

## 4. SCOPE MANAGEMENT

### 4.1 In Scope

Referensi BRD Section 6: Functional Requirements

| Module | Scope | Priority |
|--------|-------|----------|
| Authentication & User Management | Teacher registration, login, guest auto-registration, session management | Must Have |
| Course Management | Create/edit/delete course, public/private type, access code generation, enrollment | Must Have |
| Assessment Management | Create/edit/delete assessment, time limit, scheduling, publish/unpublish | Must Have |
| Question Management | 5 question types (Multiple Choice, Essay, Fill Blank, Match, Reorder), JSON-based settings | Must Have |
| Reporting & Analytics | Score table, individual report, manual grading interface, export | Must Have |
| Guest Student Experience | Access code entry, guest registration, quiz taking, timer, auto-save, result view | Must Have |

### 4.2 Out of Scope

| Item | Reason | Future Phase? |
|------|--------|---------------|
| Mobile App (Native iOS/Android) | Fokus pada web-based untuk lite version | Ya (Phase 2) |
| Live Multiplayer Mode | Kompleksitas tinggi, butuh WebSocket infrastructure | Ya (Phase 2) |
| Payment/Subscription System | Tidak diperlukan untuk lite version | Tidak |
| Gamification (Avatar, Power-ups) | Di luar scope lite version | Ya (Phase 2) |
| Bulk Import Questions (CSV/Excel) | Nice to have, dapat manual dulu | Ya (Phase 2) |
| Advanced Analytics (Learning Path) | Kompleksitas tinggi | Ya (Phase 3) |
| Parent Dashboard | Target user adalah teacher dan student | Tidak |
| Integration dengan LMS lain | Fokus standalone dulu | Ya (Phase 3) |

### 4.3 Change Control Process

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Change    │────▶│   Impact    │────▶│   Review    │────▶│  Decision   │
│   Request   │     │  Analysis   │     │   by CCB    │     │ & Update    │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     │                    │                   │                    │
     │                    │                   │                    │
     ▼                    ▼                   ▼                    ▼
 Requestor            PM + Tech           Steering            PM Update
 Submit Form          Lead Assess         Committee           Plan/Budget
```

**Change Control Board (CCB):**
- Project Sponsor - Chair
- Project Manager - Member
- Tech Lead - Member
- Business Analyst - Secretary

**Threshold untuk eskalasi:**
- Effort > 5 man-days → CCB review required
- Budget impact > IDR 50.000.000 → Sponsor approval required
- Timeline impact > 2 minggu → Steering Committee approval required

---

## 5. WORK BREAKDOWN STRUCTURE

### 5.1 WBS Hierarchy

```
1. BrainBlitz
├── 1.1 Phase 0: Setup & Discovery (M1 W1-W2)
│   ├── 1.1.1 Project Kickoff
│   ├── 1.1.2 Team Onboarding
│   ├── 1.1.3 Environment Setup
│   └── 1.1.4 Requirement Validation
│
├── 1.2 Phase 1: Design (M1 W3 - M2 W4)
│   ├── 1.2.1 Architecture Design
│   ├── 1.2.2 Database Design
│   ├── 1.2.3 UI/UX Design
│   ├── 1.2.4 Integration Design
│   └── 1.2.5 Design Sign-off
│
├── 1.3 Phase 2: Core Development (M3 W1 - M5 W2)
│   ├── 1.3.1 Sprint 4-5: Authentication & User Management
│   ├── 1.3.2 Sprint 6-7: Course Management
│   ├── 1.3.3 Sprint 8-9: Assessment & Question Management
│   └── 1.3.4 Sprint 10-11: Guest Student Experience
│
├── 1.4 Phase 3: Advanced Development (M5 W3 - M6 W2)
│   ├── 1.4.1 Sprint 12-13: Reporting & Analytics
│   ├── 1.4.2 Sprint 14-15: Auto-Grading Logic
│   └── 1.4.3 Sprint 16-17: Integration & Polish
│
├── 1.5 Phase 4: Testing (M6 W3 - M7 W2)
│   ├── 1.5.1 System Integration Testing
│   ├── 1.5.2 Performance Testing
│   ├── 1.5.3 Security Testing
│   └── 1.5.4 User Acceptance Testing
│
└── 1.6 Phase 5: Deployment & Rollout (M7 W3 - M8 W2)
    ├── 1.6.1 Pilot Deployment
    ├── 1.6.2 Training
    ├── 1.6.3 Full Rollout
    └── 1.6.4 Hypercare Support
```

### 5.2 Effort Estimation Summary

| Phase | Duration | Effort (Man-days) |
|-------|----------|-------------------|
| Phase 0: Setup | 2 weeks | 10 |
| Phase 1: Design | 6 weeks | 45 |
| Phase 2: Core Development | 10 weeks | 150 |
| Phase 3: Advanced Development | 8 weeks | 120 |
| Phase 4: Testing | 6 weeks | 60 |
| Phase 5: Deployment | 4 weeks | 40 |
| **Total** | **36 weeks (~8 bulan)** | **425 man-days** |

---

## 6. MODULE & FEATURE SCHEDULE

### 6.1 Module Development Sequence

| Sprint | Module | Features | Dependencies | Deliverables |
|--------|--------|----------|--------------|--------------|
| S0-S1 | Setup & Design | Environment, architecture, UI mockups | None | Tech stack, design system |
| S2-S3 | Auth Module | Teacher registration, login, guest auto-reg | None | Working auth flow |
| S4-S5 | Course Module | CRUD course, access code, enrollment | Auth Module | Course management |
| S6-S7 | Assessment Module | CRUD assessment, scheduling, publish | Course Module | Assessment management |
| S8-S9 | Question Module | 5 question types, editor, preview | Assessment Module | Question editor |
| S10-S11 | Guest Quiz Module | Join flow, quiz interface, timer, auto-save | All previous | Working quiz flow |
| S12-S13 | Reporting Module | Score table, individual report, export | Question Module | Reporting dashboard |
| S14-S15 | Auto-Grading | Grading logic per type, manual grading | Reporting Module | Auto-grading complete |
| S16-S17 | Integration | End-to-end testing, bug fixes, polish | All modules | Release candidate |

### 6.2 Feature Priority Matrix

| Feature | Business Value | Technical Complexity | Dependencies | Priority | Sprint |
|---------|---------------|---------------------|--------------|----------|--------|
| Teacher Registration | High | Low | None | P1 | S2 |
| Guest Auto-Registration | High | Medium | Auth system | P1 | S2 |
| Create Course | High | Low | Auth | P1 | S4 |
| Access Code Generation | High | Medium | Course | P1 | S4 |
| Create Assessment | High | Low | Course | P1 | S6 |
| Multiple Choice Question | High | Low | Assessment | P1 | S8 |
| Essay Question | High | Low | Assessment | P1 | S8 |
| Fill Blank Question | High | Medium | Assessment | P1 | S9 |
| Match Question | Medium | High | Assessment | P2 | S9 |
| Reorder Question | Medium | High | Assessment | P2 | S9 |
| Quiz Taking Interface | High | High | All questions | P1 | S10 |
| Timer & Auto-Submit | High | Medium | Quiz interface | P1 | S11 |
| Auto-Save Answers | High | Medium | Quiz interface | P1 | S11 |
| Score Table View | High | Low | Responses | P1 | S12 |
| Individual Report | High | Medium | Score table | P1 | S13 |
| Auto-Grading (MC) | High | Low | MC questions | P1 | S14 |
| Auto-Grading (Fill Blank) | High | Medium | Fill Blank | P1 | S14 |
| Auto-Grading (Match/Reorder) | Medium | High | Match/Reorder | P2 | S15 |
| Manual Grading Interface | High | Medium | Essay | P1 | S15 |

---

## 7. SPRINT PLANNING DETAIL

### 7.1 Sprint 0-1: Setup & Foundation

**Objective:** Setup development environment, finalize architecture, create design system

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-SETUP-01 | Setup project repository & CI/CD pipeline | 5 | Tech Lead | Planned |
| US-SETUP-02 | Setup database schema & migrations | 5 | Backend | Planned |
| US-SETUP-03 | Create design system & component library | 8 | UI/UX + Frontend | Planned |
| US-SETUP-04 | Setup development & staging environments | 3 | DevOps | Planned |
| US-SETUP-05 | Create API documentation template | 2 | Backend | Planned |
| **Total** | | **23** | | |

**Sprint Deliverables:**
- [ ] Project repository initialized (Git)
- [ ] CI/CD pipeline configured
- [ ] Database schema deployed to dev
- [ ] Design system (Figma) approved
- [ ] Staging environment accessible

**Risks/Dependencies:**
- Infrastructure access approval needed
- Design tool license required

---

### 7.2 Sprint 2-3: Authentication Module

**Objective:** Implement teacher authentication and guest auto-registration

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M1-01 | Teacher Registration with Email Verification | 8 | Backend + Frontend | Planned |
| US-M1-02 | Teacher Login & Session Management | 5 | Backend + Frontend | Planned |
| US-M1-03 | Guest Auto-Registration Flow | 8 | Backend + Frontend | Planned |
| US-M1-04 | User Role Management (Teacher/Guest) | 3 | Backend | Planned |
| US-M1-05 | Profile Management for Teacher | 5 | Frontend | Planned |
| **Total** | | **29** | | |

**Sprint Deliverables:**
- [ ] Registration form with email verification
- [ ] Login page with session handling
- [ ] Guest auto-registration API
- [ ] Role-based access control implemented
- [ ] Profile edit page

**Risks/Dependencies:**
- Email service (SMTP) configuration required
- Session security review needed

---

### 7.3 Sprint 4-5: Course Management Module

**Objective:** Implement course CRUD and enrollment system

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M2-01 | Create Course (Public/Private) | 5 | Backend + Frontend | Planned |
| US-M2-02 | Auto-Generate Access Code | 3 | Backend | Planned |
| US-M2-03 | Course Listing & Detail View | 5 | Frontend | Planned |
| US-M2-04 | Edit & Delete Course | 5 | Backend + Frontend | Planned |
| US-M2-05 | Student Enrollment (Auto-enroll Guest) | 8 | Backend | Planned |
| US-M2-06 | View Enrolled Students | 5 | Frontend | Planned |
| **Total** | | **31** | | |

**Sprint Deliverables:**
- [ ] Course CRUD pages
- [ ] Access code generation working
- [ ] Enrollment API functional
- [ ] Student list view

**Risks/Dependencies:**
- Access code uniqueness validation critical
- Cascade delete logic needs careful testing

---

### 7.4 Sprint 6-7: Assessment Management Module

**Objective:** Implement assessment creation and scheduling

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M3-01 | Create Assessment with Settings | 5 | Backend + Frontend | Planned |
| US-M3-02 | Time Limit Configuration | 3 | Backend + Frontend | Planned |
| US-M3-03 | Schedule Management (Open/Close Date) | 5 | Backend | Planned |
| US-M3-04 | Publish/Unpublish Assessment | 3 | Backend + Frontend | Planned |
| US-M3-05 | Assessment Listing in Course | 5 | Frontend | Planned |
| US-M3-06 | Assessment Preview | 5 | Frontend | Planned |
| **Total** | | **26** | | |

**Sprint Deliverables:**
- [ ] Assessment CRUD pages
- [ ] Timer configuration working
- [ ] Schedule-based access control
- [ ] Preview mode functional

**Risks/Dependencies:**
- Date/timezone handling needs attention
- Preview should match student view exactly

---

### 7.5 Sprint 8-9: Question Management Module

**Objective:** Implement 5 question types with JSON-based architecture

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M4-01 | Multiple Choice Question Editor | 8 | Backend + Frontend | Planned |
| US-M4-02 | Essay Question Editor | 5 | Backend + Frontend | Planned |
| US-M4-03 | Fill in the Blank Question Editor | 8 | Backend + Frontend | Planned |
| US-M4-04 | Match (Menjodohkan) Question Editor | 13 | Backend + Frontend | Planned |
| US-M4-05 | Reorder Question Editor | 13 | Backend + Frontend | Planned |
| US-M4-06 | Question Preview & Validation | 5 | Frontend | Planned |
| US-M4-07 | JSON Schema Validation | 5 | Backend | Planned |
| **Total** | | **57** | | |

**Sprint Deliverables:**
- [ ] Question editor for all 5 types
- [ ] JSON settings stored correctly
- [ ] Preview renders correctly per type
- [ ] Schema validation working

**Risks/Dependencies:**
- Match and Reorder are complex, may need extra time
- JSON validation critical for data integrity

---

### 7.6 Sprint 10-11: Guest Student Quiz Experience

**Objective:** Implement end-to-end quiz taking flow for guest students

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M6-01 | Access Code Entry & Validation | 5 | Backend + Frontend | Planned |
| US-M6-02 | Guest Name Input & Auto-Register | 5 | Frontend | Planned |
| US-M6-03 | Quiz Info Display (Before Start) | 3 | Frontend | Planned |
| US-M6-04 | Quiz Interface with Navigation | 13 | Frontend | Planned |
| US-M6-05 | Answer Input per Question Type | 13 | Frontend | Planned |
| US-M6-06 | Timer Display with Warnings | 5 | Frontend | Planned |
| US-M6-07 | Auto-Save Every 30 Seconds | 8 | Backend + Frontend | Planned |
| US-M6-08 | Manual & Auto-Submit | 8 | Backend | Planned |
| US-M6-09 | Result Display with Review | 8 | Frontend | Planned |
| **Total** | | **68** | | |

**Sprint Deliverables:**
- [ ] Join flow complete (code → name → quiz)
- [ ] Quiz interface responsive
- [ ] All question types answerable
- [ ] Timer and auto-submit working
- [ ] Auto-save functional
- [ ] Result page with review

**Risks/Dependencies:**
- Auto-save reliability critical
- Browser compatibility testing needed
- Timer sync across devices

---

### 7.7 Sprint 12-13: Reporting & Analytics Module

**Objective:** Implement reporting dashboard for teachers

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-M5-01 | Score Table View with Sort/Filter | 8 | Backend + Frontend | Planned |
| US-M5-02 | Individual Student Report | 8 | Backend + Frontend | Planned |
| US-M5-03 | Question Analysis Statistics | 5 | Backend + Frontend | Planned |
| US-M5-04 | Export Scores to CSV/Excel | 5 | Backend | Planned |
| US-M5-05 | Pending Grading Indicator | 3 | Frontend | Planned |
| **Total** | | **29** | | |

**Sprint Deliverables:**
- [ ] Score table with sorting/filtering
- [ ] Individual report page
- [ ] Question statistics dashboard
- [ ] CSV export functional
- [ ] Pending grading badges

**Risks/Dependencies:**
- Large dataset performance needs optimization
- Export file size management

---

### 7.8 Sprint 14-15: Auto-Grading & Manual Grading

**Objective:** Implement grading logic for all question types

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-GRD-01 | Auto-Grading Multiple Choice | 3 | Backend | Planned |
| US-GRD-02 | Auto-Grading Fill in the Blank | 5 | Backend | Planned |
| US-GRD-03 | Auto-Grading Match with Partial Credit | 8 | Backend | Planned |
| US-GRD-04 | Auto-Grading Reorder with Partial Credit | 8 | Backend | Planned |
| US-GRD-05 | Manual Grading Interface for Essay | 8 | Backend + Frontend | Planned |
| US-GRD-06 | Grading Rubric Display | 3 | Frontend | Planned |
| US-GRD-07 | Score Calculation & Update | 5 | Backend | Planned |
| **Total** | | **40** | | |

**Sprint Deliverables:**
- [ ] Auto-grading for all objective types
- [ ] Partial credit for Match/Reorder
- [ ] Manual grading page for essays
- [ ] Score calculation accurate
- [ ] Real-time score update

**Risks/Dependencies:**
- Grading logic must be thoroughly tested
- Case sensitivity handling for Fill Blank

---

### 7.9 Sprint 16-17: Integration & Polish

**Objective:** End-to-end integration testing, bug fixes, and final polish

| Story ID | Story Title | Story Points | Assignee | Status |
|----------|-------------|--------------|----------|--------|
| US-INT-01 | End-to-End Flow Testing | 13 | QA + All Devs | Planned |
| US-INT-02 | Performance Optimization | 8 | Backend + DevOps | Planned |
| US-INT-03 | UI/UX Polish & Consistency | 5 | Frontend + UI/UX | Planned |
| US-INT-04 | Bug Fixes from Internal Testing | 13 | All Devs | Planned |
| US-INT-05 | Documentation Finalization | 5 | BA + Tech Lead | Planned |
| **Total** | | **44** | | |

**Sprint Deliverables:**
- [ ] E2E test scenarios passed
- [ ] Performance benchmarks met
- [ ] UI consistent across pages
- [ ] Critical bugs fixed
- [ ] Documentation complete

**Risks/Dependencies:**
- May need buffer for unexpected issues
- Stakeholder feedback incorporation

---

## 8. TIMELINE & MILESTONES

### 8.1 Project Timeline (Gantt Representation)

```
                    M1      M2      M3      M4      M5      M6      M7      M8
                    │       │       │       │       │       │       │       │
Phase 0: Setup      ███████▌
Phase 1: Design           ███████████████▌
Phase 2: Core Dev                 ████████████████████████████▌
Phase 3: Adv Dev                                        ████████████████▌
Phase 4: Testing                                                        ███████▌
Phase 5: Rollout                                                                █████▌
                    │       │       │       │       │       │       │       │
Milestones:         ▲               ▲               ▲               ▲       ▲
                   M1              M3              M5              M7      M8
                 Kickoff         MVP Ready     Feature        UAT      Go-Live
                                               Complete       Complete
```

### 8.2 Key Milestones Detail

| ID | Milestone | Target Date | Entry Criteria | Exit Criteria | Deliverables |
|----|-----------|-------------|----------------|---------------|--------------|
| M1 | Project Kickoff | Maret 2026 W1 | Contract signed | Kick-off meeting done | Project Charter, Team onboarded |
| M2 | Design Complete | Maret 2026 W4 | Requirements final | Architecture & UI/UX approved | Architecture Doc, Design System |
| M3 | MVP Ready | Mei 2026 W2 | Design approved | Auth, Course, Quiz Taking working | MVP Demo (core flow) |
| M4 | Feature Complete | Juli 2026 W2 | MVP accepted | All 62 features coded | Feature complete build |
| M5 | UAT Complete | Juli 2026 W4 | SIT passed | UAT sign-off from SME | UAT Report, Sign-off |
| M6 | Go-Live | Agustus 2026 W1 | UAT approved | Production live | Go-live certificate |

### 8.3 Critical Path

```
[Kickoff] ─▶ [Arch Design] ─▶ [DB Setup] ─▶ [Auth Module] ─▶ [Course Module] ─▶ 
    │             │              │              │                 │
    └─ 1 week     └─ 2 weeks     └─ 1 week      └─ 4 weeks        └─ 4 weeks

[Assessment Module] ─▶ [Question Module] ─▶ [Quiz Module] ─▶ [Reporting] ─▶ 
       │                    │                    │                 │
       └─ 4 weeks           └─ 6 weeks           └─ 6 weeks        └─ 4 weeks

[UAT] ─▶ [Go-Live]
   │            │
   └─ 4 weeks   └─ 2 weeks

Critical Path Duration: 48 weeks (~11 bulan dengan buffer)
```

---

## 9. RESOURCE PLAN

### 9.1 Resource Loading

| Role | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 |
|------|-----|-----|-----|-----|-----|-----|-----|-----|
| Tech Lead | 100% | 100% | 100% | 100% | 100% | 100% | 50% | 50% |
| Backend Dev (x2) | 50% | 100% | 100% | 100% | 100% | 100% | 100% | 50% |
| Frontend Dev (x2) | 50% | 100% | 100% | 100% | 100% | 100% | 100% | 50% |
| UI/UX Designer | 100% | 100% | 50% | 50% | 25% | 25% | - | - |
| QA Engineer | 25% | 50% | 75% | 100% | 100% | 100% | 100% | 50% |
| DevOps Engineer | 100% | 50% | 50% | 50% | 50% | 75% | 100% | 100% |
| BA (Client) | 100% | 100% | 100% | 100% | 100% | 100% | 100% | 50% |
| PM (Client) | 50% | 50% | 50% | 50% | 50% | 75% | 100% | 100% |

### 9.2 Skills Matrix

| Skill | Required | Available (Team) | Gap | Mitigation |
|-------|----------|------------------|-----|------------|
| Node.js/Express | High | High | No | - |
| React/Vue.js | High | High | No | - |
| PostgreSQL/MySQL | High | Medium | Yes | Training M1 |
| UUID Implementation | Medium | Low | Yes | Tech Lead workshop |
| JSON Schema Validation | Medium | Medium | No | - |
| Auto-Grading Algorithms | High | Low | Yes | External consultant review |
| WebSocket (optional) | Low | Medium | No | - |
| CI/CD (GitHub Actions) | High | High | No | - |

### 9.3 Leave & Holidays Calendar

| Period | Event | Impact | Mitigation |
|--------|-------|--------|------------|
| Maret 2026 W4 | Nyai (Hindu) | -2 days | Buffer included |
| April 2026 W1 | Good Friday | -1 day | Adjust sprint |
| April 2026 W2 | Eid al-Fitr | -3 days | Sprint planning adjusted |
| Mei 2026 W2 | Labor Day | -1 day | Normal |
| Mei 2026 W4 | Ascension Day | -1 day | Normal |
| Juni 2026 W1 | Pancasila Day | -1 day | Normal |
| Agustus 2026 W3 | Independence Day | -1 day | Go-live buffer |

---

## 10. COMMUNICATION PLAN

### 10.1 Regular Meetings

| Meeting | Frequency | Participants | Duration | Day/Time | Output |
|---------|-----------|--------------|----------|----------|--------|
| Daily Standup | Daily | Dev Team | 15 min | Mon-Fri, 09:00 | Status update, blockers |
| Sprint Planning | Bi-weekly | All + PM, BA | 2-4 hrs | Sprint start, 10:00 | Sprint backlog committed |
| Sprint Review | Bi-weekly | All + Stakeholders | 1-2 hrs | Sprint end, 14:00 | Demo, feedback |
| Sprint Retro | Bi-weekly | Dev Team | 1 hr | After review, 16:00 | Action items |
| Weekly Status | Weekly | PM, BA, Tech Lead | 30 min | Friday, 15:00 | Weekly report |
| Steering Committee | Monthly | SC members + PM | 1-2 hrs | Last week of month | Decisions, escalations |

### 10.2 Reporting

| Report | Frequency | Audience | Format | Owner |
|--------|-----------|----------|--------|-------|
| Weekly Status | Weekly | PM, Sponsor, Stakeholders | Email + Dashboard | PM |
| Sprint Report | Bi-weekly | All stakeholders | PPT/PDF | PM + BA |
| Monthly Executive | Monthly | Steering Committee | PPT | PM |
| Risk Report | Weekly | PM, Tech Lead, QA | Document (Jira) | PM |
| Burndown Chart | Daily | Dev Team | Dashboard (Jira) | Scrum Master |
| Quality Metrics | Bi-weekly | PM, Tech Lead, QA | Dashboard | QA Lead |

### 10.3 Escalation Matrix

| Level | Issue Type | Escalation To | Response Time |
|-------|------------|---------------|---------------|
| L1 | Technical blockers, code issues | Tech Lead | 4 hours |
| L2 | Resource conflicts, timeline slippage | PM | 1 day |
| L3 | Scope changes, budget issues | Sponsor | 2 days |
| L4 | Critical project risks, go/no-go | Steering Committee | As needed (emergency) |

---

## 11. RISK MANAGEMENT

### 11.1 Risk Register

| ID | Risk Description | Category | Prob | Impact | Score | Response | Owner | Status |
|----|------------------|----------|------|--------|-------|----------|-------|--------|
| R01 | Email service unreliable for verification | Technical | Medium | High | 6 | Mitigate: Use reliable SMTP provider (SendGrid/AWS SES) | Tech Lead | Open |
| R02 | Guest auto-registration creates duplicate users | Technical | Low | High | 4 | Mitigate: Unique constraint on session+assessment | Backend | Open |
| R03 | Auto-save fails during network interruption | Technical | Medium | Critical | 8 | Mitigate: LocalStorage queue + retry logic | Frontend | Open |
| R04 | Timer desync between client and server | Technical | Medium | High | 6 | Mitigate: Server-authoritative timer with sync | Backend | Open |
| R05 | JSON schema validation too complex | Technical | Low | Medium | 3 | Accept: Add extra testing time | Tech Lead | Open |
| R06 | Auto-grading logic incorrect for edge cases | Technical | Medium | High | 6 | Mitigate: Comprehensive test cases + manual review | QA | Open |
| R07 | Performance degradation with concurrent users | Performance | Medium | High | 6 | Mitigate: Load testing M5, caching strategy | DevOps | Open |
| R08 | Key team member resignation | Resource | Low | Critical | 4 | Mitigate: Knowledge sharing, documentation | PM | Open |
| R09 | Scope creep from stakeholder requests | Scope | High | Medium | 6 | Mitigate: Strict change control process | PM | Open |
| R10 | UAT feedback requires major rework | Quality | Medium | High | 6 | Mitigate: Early demos, iterative feedback | BA | Open |

**Risk Score Matrix:**
- Probability: Low=1, Medium=2, High=3
- Impact: Low=1, Medium=2, High=3, Critical=4
- Score = Prob × Impact
- **High Risk (Score ≥ 6):** Requires active mitigation plan
- **Medium Risk (Score 4-5):** Monitor closely
- **Low Risk (Score ≤ 3):** Accept with contingency

### 11.2 Risk Response Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Avoid** | High probability, high impact | Cancel low-priority features if timeline tight |
| **Mitigate** | Reduce probability or impact | POC for auto-grading, load testing early |
| **Transfer** | Shift to third party | Use managed email service instead of self-hosted |
| **Accept** | Low probability or impact | JSON complexity - add testing buffer |

### 11.3 Contingency Plan

| Scenario | Trigger | Contingency |
|----------|---------|-------------|
| Timeline slippage > 4 weeks | Sprint velocity < 80% for 3 sprints | Add developer, reduce Nice-to-Have scope |
| Critical bug found in UAT | Severity 1 bug blocking core flow | Hotfix sprint, delay go-live if needed |
| Budget overrun > 20% | Financial tracking shows variance | Defer Phase 2 features, negotiate additional budget |
| Key developer leaves | Resignation notice | Activate backup resource, knowledge transfer |

---

## 12. QUALITY ASSURANCE PLAN

### 12.1 Quality Gates

| Gate | Phase | Entry Criteria | Exit Criteria | Approver |
|------|-------|----------------|---------------|----------|
| G1 | Design | BRD approved | Architecture Doc, UI/UX mockups approved | Tech Lead, Sponsor |
| G2 | Development | Design approved | Code complete, unit tests >80%, code reviewed | Tech Lead |
| G3 | Integration | All modules developed | Integration tests pass, no critical bugs | QA Lead |
| G4 | Testing | SIT complete | Performance, security tests pass | QA Lead, Security |
| G5 | UAT | Testing complete | UAT sign-off, <10 critical bugs | Business Owner |
| G6 | Go-Live | UAT approved | Production checklist complete, rollback plan ready | Steering |

### 12.2 Testing Strategy

| Test Type | Scope | Responsibility | Tools | Timing |
|-----------|-------|----------------|-------|--------|
| Unit Test | Functions, methods, utilities | Developers | Jest/Vitest | Each sprint |
| Integration Test | API endpoints, database | Developers, QA | Supertest, Postman | Each sprint |
| System Test (SIT) | End-to-end flows | QA | Playwright/Cypress | Sprint 12-15 |
| Performance Test | Load, stress, scalability | QA, DevOps | k6, JMeter | Sprint 14 |
| Security Test | Vulnerabilities, OWASP | Security Team | OWASP ZAP, SonarQube | Sprint 15 |
| UAT | Business scenarios | BA, SME (Teacher) | Manual | Sprint 16-17 |

### 12.3 Definition of Done

**Story Level:**
- [x] Code complete and committed to main branch
- [x] Unit tests written (>80% coverage for new code)
- [x] Code reviewed and approved (min 1 reviewer)
- [x] API documentation updated (if applicable)
- [x] No critical/major bugs (P1/P2)
- [x] Deployed to staging environment
- [x] Demo'd to BA/PM

**Sprint Level:**
- [x] All committed stories marked Done
- [x] Sprint demo completed with stakeholders
- [x] No critical bugs open
- [x] Deployment to staging successful
- [x] Sprint retrospective conducted

**Release Level:**
- [x] All Must Have features tested and accepted
- [x] Performance benchmarks met (page load <3s, API <500ms)
- [x] Security scan passed (no high/critical vulnerabilities)
- [x] User documentation complete
- [x] Deployment runbook ready
- [x] Rollback plan documented and tested

### 12.4 Defect Management

| Severity | Description | Response Time | Resolution Time |
|----------|-------------|---------------|-----------------|
| Critical (P1) | System down, data loss, security breach | 1 hour | 4 hours |
| Major (P2) | Feature not working, core flow broken | 4 hours | 2 days |
| Minor (P3) | Cosmetic issue, workaround exists | 1 day | 1 week |
| Trivial (P4) | Enhancement, nice-to-have | Backlog | Next sprint/phase |

**Bug Triage Process:**
1. QA logs bug in Jira with severity
2. Daily bug triage meeting (PM, Tech Lead, QA)
3. Priority assigned, owner designated
4. Progress tracked in daily standup
5. Fixed bugs verified by QA before closure

---

## 13. DELIVERABLES MATRIX

### 13.1 Phase 0: Setup & Discovery

| Deliverable | Format | Owner | Due Date | Reviewer |
|-------------|--------|-------|----------|----------|
| Project Charter | Document | PM | M1 W1 | Sponsor |
| Stakeholder Register | Document | PM | M1 W1 | PM |
| Communication Plan | Document | PM | M1 W2 | Sponsor |
| Environment Setup | Working env | DevOps | M1 W2 | Tech Lead |
| Requirement Validation Report | Document | BA | M1 W2 | PM, SME |

### 13.2 Phase 1: Design

| Deliverable | Format | Owner | Due Date | Reviewer |
|-------------|--------|-------|----------|----------|
| Architecture Document | Document (Markdown) | Tech Lead | M2 W2 | Sponsor, Dev Team |
| UI/UX Design Specs | Figma | Designer | M2 W3 | BA, Users (SME) |
| Database Schema | Document + SQL | Backend | M2 W2 | Tech Lead |
| Integration Design | Document | Tech Lead | M2 W3 | External Team (if any) |
| Design Sign-off Report | Document | PM | M2 W4 | Sponsor |

### 13.3 Phase 2-3: Development

| Deliverable | Format | Owner | Due Date | Reviewer |
|-------------|--------|-------|----------|----------|
| Authentication Module | Code + API | Backend + Frontend | M3 W2 | Tech Lead |
| Course Module | Code + API | Backend + Frontend | M4 W1 | Tech Lead |
| Assessment Module | Code + API | Backend + Frontend | M4 W3 | Tech Lead |
| Question Module | Code + API | Backend + Frontend | M5 W2 | Tech Lead |
| Guest Quiz Module | Code + UI | Frontend | M5 W4 | Tech Lead |
| Reporting Module | Code + UI | Backend + Frontend | M6 W2 | Tech Lead |
| API Documentation | OpenAPI/Swagger | Backend | Each sprint | Tech Lead |
| Sprint Demo Videos | Recording | PM | Each sprint | Stakeholders |

### 13.4 Phase 4: Testing

| Deliverable | Format | Owner | Due Date | Reviewer |
|-------------|--------|-------|----------|----------|
| Test Plan Document | Document | QA | M5 W1 | PM, Tech Lead |
| SIT Test Cases | Document + Scripts | QA | M6 W1 | Tech Lead |
| SIT Report | Document | QA | M6 W3 | Tech Lead |
| Performance Test Plan | Document | QA + DevOps | M6 W2 | Tech Lead |
| Performance Test Report | Document | QA | M6 W4 | Tech Lead |
| Security Audit Report | Document | Security | M7 W1 | Sponsor |
| UAT Test Cases | Document | BA | M6 W4 | SME (Teacher) |
| UAT Execution Report | Document | BA | M7 W2 | Sponsor |
| Bug Triage Report | Document | QA | Weekly | PM |

### 13.5 Phase 5: Deployment & Rollout

| Deliverable | Format | Owner | Due Date | Reviewer |
|-------------|--------|-------|----------|----------|
| Deployment Runbook | Document | DevOps | M7 W1 | Tech Lead |
| Production Environment | Infrastructure | DevOps | M7 W2 | Tech Lead, Security |
| Training Material | PPT + Video | BA | M7 W2 | SME |
| User Guide (Final) | Document (PDF) | BA | M7 W3 | Users (SME) |
| Admin Guide | Document | Tech Lead | M7 W3 | IT Ops |
| Go-Live Checklist | Document | PM | M7 W4 | Steering |
| Rollback Plan | Document | DevOps | M7 W3 | Tech Lead |
| Project Closure Report | Document | PM | M8 W2 | Sponsor |
| Lessons Learned Report | Document | PM | M8 W2 | Team |

---

## APPENDIX

### A. Sprint Calendar 2026

| Sprint | Start Date | End Date | Phase | Focus |
|--------|------------|----------|-------|-------|
| S0 | 2026-03-02 | 2026-03-06 | Setup | Project kickoff, environment |
| S1 | 2026-03-09 | 2026-03-20 | Setup | Architecture, design system |
| S2 | 2026-03-23 | 2026-04-03 | Design | Auth module design |
| S3 | 2026-04-06 | 2026-04-17 | Design | Course design, DB finalization |
| S4 | 2026-04-20 | 2026-05-01 | Core Dev | Auth development |
| S5 | 2026-05-04 | 2026-05-15 | Core Dev | Course development |
| S6 | 2026-05-18 | 2026-05-29 | Core Dev | Assessment development |
| S7 | 2026-06-01 | 2026-06-12 | Core Dev | Question (MC, Essay) |
| S8 | 2026-06-15 | 2026-06-26 | Core Dev | Question (Fill, Match, Reorder) |
| S9 | 2026-06-29 | 2026-07-10 | Core Dev | Quiz interface |
| S10 | 2026-07-13 | 2026-07-24 | Adv Dev | Timer, auto-save, submit |
| S11 | 2026-07-27 | 2026-08-07 | Adv Dev | Reporting module |
| S12 | 2026-08-10 | 2026-08-21 | Adv Dev | Auto-grading logic |
| S13 | 2026-08-24 | 2026-09-04 | Testing | SIT, bug fixes |
| S14 | 2026-09-07 | 2026-09-18 | Testing | Performance, security |
| S15 | 2026-09-21 | 2026-10-02 | Testing | UAT execution |
| S16 | 2026-10-05 | 2026-10-16 | Rollout | Pilot deployment, training |
| S17 | 2026-10-19 | 2026-10-30 | Rollout | Full rollout, hypercare |

### B. Abbreviations

| Abbr | Full Form |
|------|-----------|
| BA | Business Analyst |
| CCB | Change Control Board |
| CI/CD | Continuous Integration/Continuous Deployment |
| E2E | End-to-End |
| MVP | Minimum Viable Product |
| PM | Project Manager |
| POC | Proof of Concept |
| QA | Quality Assurance |
| RACI | Responsible, Accountable, Consulted, Informed |
| SC | Steering Committee |
| SIT | System Integration Testing |
| SME | Subject Matter Expert |
| TBD | To Be Determined |
| UAT | User Acceptance Testing |
| WBS | Work Breakdown Structure |

### C. Budget Breakdown (Estimate)

| Category | Item | Estimated Cost (IDR) |
|----------|------|---------------------|
| Personnel | Vendor Team (6 months) | 400.000.000 |
| Infrastructure | Cloud hosting (AWS/GCP) | 50.000.000 |
| Tools & Licenses | Figma, Jira, Email Service | 30.000.000 |
| Testing | Security audit, performance tools | 20.000.000 |
| Training | Team training, workshops | 15.000.000 |
| Contingency | 15% of total | 77.500.000 |
| **Total** | | **592.500.000** |

---

*Dokumen ini adalah bagian dari Project Documentation BrainBlitz*  
*Lokasi: `/docs/project/02-project-execution-plan.md`*  
*LearnWeb LMS Project © 2026*
