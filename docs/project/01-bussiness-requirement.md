# BUSINESS REQUIREMENTS DOCUMENT
## Quizizz Clone (Lite Version)
### LearnWeb LMS Project

---

| Attribute | Value |
|-----------|-------|
| Document ID | DOC-QCL-BRD-001 |
| Version | 1.0 |
| Status | Draft |
| Author | Product Team |
| Created | Februari 2026 |
| Last Updated | 25 Februari 2026 |
| Reviewed By | - |
| Approved By | - |

---

## Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 25 Februari 2026 | Product Team | Initial version based on template |

---

## DAFTAR ISI

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
12. [Glossary](#12-glossary)
13. [Approval Sign-off](#13-approval-sign-off)

---

## 1. EXECUTIVE SUMMARY

### 1.1 Latar Belakang

Dalam ekosistem pendidikan modern, kebutuhan akan platform evaluasi pembelajaran yang interaktif dan mudah diakses semakin meningkat. Guru membutuhkan alat yang memungkinkan mereka membuat kuis menarik dengan berbagai jenis soal, sementara siswa menginginkan pengalaman pengerjaan kuis yang sederhana tanpa hambatan teknis seperti registrasi yang rumit.

Kondisi saat ini menunjukkan bahwa banyak platform kuis existing mengharuskan semua pengguna (termasuk siswa) untuk melakukan registrasi lengkap sebelum dapat berpartisipasi. Hal ini menciptakan friksi dalam proses pembelajaran, terutama untuk sesi kuis spontan atau kuis dengan durasi pendek. Selain itu, fleksibilitas dalam jenis soal seringkali terbatas, sehingga guru tidak dapat melakukan variasi evaluasi secara optimal.

Quizizz Clone (Lite Version) hadir sebagai solusi yang menjembatani kebutuhan tersebut dengan mengadopsi pendekatan hybrid: Teacher sebagai registered user dengan otoritas penuh, dan Student sebagai guest user yang dapat bergabung hanya dengan access code dan nama.

### 1.2 Solusi yang Diusulkan

Quizizz Clone (Lite Version) adalah aplikasi berbasis web untuk kuis interaktif yang mendukung berbagai jenis soal (Multiple Choice, Essay, Fill in the Blank, Match, dan Reorder) dalam sistem Course yang terstruktur. Aplikasi ini memungkinkan Teacher untuk membuat dan mengelola Course serta Assessment secara fleksibel, sementara Student dapat bergabung sebagai guest hanya dengan memasukkan access code dan nama, tanpa perlu registrasi formal.

Sistem menggunakan arsitektur database yang scalable dengan UUID sebagai primary key dan JSON-based configuration untuk mendukung penambahan jenis soal baru tanpa perubahan schema database.

### 1.3 Manfaat Utama

| Manfaat | Deskripsi |
|---------|-----------|
| Efisiensi Waktu | Siswa dapat bergabung kuis dalam < 2 menit tanpa registrasi rumit |
| Fleksibilitas Soal | 5 jenis soal yang dapat diperluas tanpa perubahan database |
| Manajemen Terpusat | Guru dapat mengelola multiple course dan assessment dalam satu platform |
| Reporting Real-time | Guru dapat melihat hasil skor siswa segera setelah pengerjaan |

### 1.4 Scope Summary

- **5 modul utama:** Authentication & User Management, Course Management, Assessment Management, Question Management, Reporting & Analytics
- **Integrasi dengan:** Email service (untuk verifikasi teacher), Session management system
- **Platform:** Web-based (responsive untuk desktop, tablet, mobile)
- **Estimasi pengguna:** Support hingga 1000+ concurrent quiz takers per instance

---

## 2. BUSINESS OBJECTIVES

### 2.1 Strategic Alignment

Project ini mendukung strategi digitalisasi pembelajaran LearnWeb LMS dengan menyediakan alat evaluasi yang modern, mudah digunakan, dan scalable. Quizizz Clone menjadi komponen kunci dalam ekosistem LMS yang memungkinkan interaksi langsung antara guru dan siswa dalam konteks penilaian formatif.

### 2.2 Business Objectives (SMART)

| ID | Objective | Specific | Measurable | Target |
|----|-----------|----------|------------|--------|
| BO-01 | Simplifikasi Student Onboarding | Menghilangkan barrier registrasi untuk student guest | Waktu join kuis | < 2 menit dari enter code sampai mulai kuis |
| BO-02 | Fleksibilitas Assessment | Menyediakan variasi jenis soal untuk evaluasi komprehensif | Jumlah jenis soal | 5 jenis soal pada release pertama |
| BO-03 | Skalabilitas Sistem | Mendukung pertumbuhan pengguna dan soal | Concurrent users & question types | 1000+ concurrent users, arsitektur可扩展 untuk 10+ jenis soal |
| BO-04 | Visibility Hasil Belajar | Memberikan insight real-time kepada guru | Reporting availability | Skor tersedia < 5 detik setelah submit |

### 2.3 Success Criteria

Proyek dianggap berhasil dalam 3 bulan pasca go-live:
1. ✅ 90% guru dapat membuat course dan assessment pertama mereka dalam < 15 menit
2. ✅ 95% student guest dapat bergabung dan mulai kuis tanpa bantuan teknis
3. ✅ System uptime > 99.5% selama periode kuis aktif
4. ✅ Average page load time < 3 detik untuk semua halaman utama
5. ✅ Zero data loss pada student responses saat submit

---

## 3. STAKEHOLDER ANALYSIS

### 3.1 Stakeholder Matrix

| Stakeholder | Role | Interest | Influence | Engagement Strategy |
|-------------|------|----------|-----------|---------------------|
| Product Owner | Executive Sponsor | Tinggi | Tinggi | Weekly sync, approval untuk scope changes |
| Lead Developer | Technical Owner | Tinggi | Tinggi | Daily standup, technical decision maker |
| UI/UX Designer | Design Lead | Medium | Medium | Design review sessions, user testing |
| QA Engineer | Quality Owner | Medium | Medium | Test planning, UAT coordination |
| Teacher (End User) | Primary User | Tinggi | Medium | User interviews, beta testing |
| Student (End User) | Primary User | Tinggi | Low | Usability testing, feedback surveys |
| School Administrator | Business Stakeholder | Medium | Tinggi | Progress reporting, go-live approval |

### 3.2 RACI untuk Key Deliverables

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

### 4.1 Sistem yang Digunakan Saat Ini

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
│  │           MASALAH UMUM:                          │       │
│  │  • Semua user wajib registrasi lengkap          │       │
│  │  • Jenis soal terbatas (hanya multiple choice)  │       │
│  │  • Tidak ada guest access                       │       │
│  │  • Setup waktu lama (> 10 menit per kuis)       │       │
│  │  • Reporting terbatas                           │       │
│  └─────────────────────────────────────────────────┘       │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              PROSES MANUAL (Jika tanpa platform):       ││
│  │  • Cetak soal kertas → Distribusi → Koreksi manual     ││
│  │  • Input nilai manual ke spreadsheet                   ││
│  │  • Total waktu: 3-5 hari untuk feedback                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Pain Points Detail

| ID | Pain Point | Dampak Bisnis | Frekuensi |
|----|------------|---------------|-----------|
| PP-01 | Registrasi wajib untuk semua user | 30-40% siswa abandon sebelum mulai kuis | Setiap sesi kuis baru |
| PP-02 | Jenis soal monoton (hanya pilihan ganda) | Tidak dapat mengukur higher-order thinking skills | Setiap assessment |
| PP-03 | Setup kuis memakan waktu lama (> 15 menit) | Mengurangi waktu efektif pembelajaran | Setiap pembuatan kuis |
| PP-04 | Tidak ada guest access | Siswa tidak bisa ikut kuis mendadak | Setiap kuis spontan |
| PP-05 | Reporting tidak real-time | Guru tidak bisa langsung tindak lanjuti hasil | Setiap selesai kuis |
| PP-06 | Tidak scalable untuk jenis soal baru | Terbatas pada fitur yang disediakan vendor | Saat perlu variasi |

### 4.3 Current Process Flow

```
PROSES TRADISIONAL (Tanpa Platform Digital):

1. Guru membuat soal di dokumen (30-60 menit)
2. Guru mencetak soal untuk setiap siswa (15 menit)
3. Distribusi kertas ke siswa (5 menit)
4. Siswa mengerjakan (30-60 menit)
5. Guru mengumpulkan dan mengoreksi (60-120 menit)
6. Input nilai ke spreadsheet (15 menit)
7. Feedback ke siswa (1-2 hari kemudian)

Total waktu: 3-5 HARI untuk feedback
Total effort guru: 4-6 JAM per kuis
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
│                   │   QUIZIZZ CLONE (LITE)  │               │
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
PROSES BARU (Dengan Quizizz Clone):

1. Guru login dan buat course (5 menit)
2. Guru buat assessment dengan soal (10-20 menit)
3. Guru share access code ke siswa (< 1 menit)
4. Siswa enter code + input nama (2 menit)
5. Siswa kerjakan kuis (30-60 menit)
6. Auto-grading langsung untuk objective questions (< 5 detik)
7. Guru lihat report real-time

Total waktu: < 5 DETIK untuk feedback (objective questions)
Total effort guru: 15-25 MENIT per kuis (improvement: 85-90%)
```

### 5.3 Gap Analysis

| Aspek | Current State | Future State | Gap |
|-------|---------------|--------------|-----|
| Student Onboarding | Registrasi lengkap (5-10 menit) | Guest access (2 menit) | Perlu sistem auto-register guest dengan UUID |
| Question Types | 1-2 jenis (fixed schema) | 5+ jenis (JSON-based) | Perlu desain schema flexible dengan settings JSON |
| Grading Speed | Manual (1-2 hari) | Auto (< 5 detik) | Perlu algoritma auto-grading per tipe soal |
| Reporting | Batch/Manual | Real-time | Perlu database indexing dan caching strategy |
| Scalability | Limited by vendor | Extensible via JSON | Perlu arsitektur modular dengan clear interfaces |

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

### 6.2 MODUL 1: AUTHENTICATION & USER MANAGEMENT

**Deskripsi:** Modul untuk mengelola registrasi, login, dan profil pengguna (Teacher registered user).

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M1-01 | Sebagai Teacher, saya ingin registrasi dengan email, sehingga saya dapat membuat akun | **Given** saya di halaman registrasi<br>**When** saya isi form dengan email valid dan password<br>**Then** akun dibuat dan email verifikasi terkirim | Must Have |
| US-M1-02 | Sebagai Teacher, saya ingin login dengan email dan password, sehingga saya dapat akses dashboard | **Given** saya punya akun terverifikasi<br>**When** saya input kredensial yang benar<br>**Then** saya diarahkan ke dashboard | Must Have |
| US-M1-03 | Sebagai Teacher, saya ingin verifikasi email, sehingga akun saya aktif | **Given** saya baru registrasi<br>**When** saya klik link verifikasi di email<br>**Then** status akun berubah menjadi active | Must Have |
| US-M1-04 | Sebagai Teacher, saya ingin logout, sehingga sesi saya aman | **Given** saya sedang login<br>**When** saya klik logout<br>**Then** sesi dihapus dan diarahkan ke login page | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M1-01 | Teacher Registration | Form registrasi: nama, email, password. Email harus unik. Password minimal 8 karakter. | Must Have |
| FR-M1-02 | Password Hashing | Password di-hash menggunakan bcrypt/argon2 sebelum disimpan | Must Have |
| FR-M1-03 | Email Verification | Token verifikasi dikirim via email, expired dalam 24 jam | Must Have |
| FR-M1-04 | Login Authentication | Validasi email/password, create session token dengan expiry | Must Have |
| FR-M1-05 | Session Management | Session token stored in HTTP-only cookie, expiry 24 jam | Must Have |
| FR-M1-06 | Guest Auto-Registration | Sistem auto-create user guest dengan UUID saat student join quiz | Must Have |
| FR-M1-07 | User Role Management | Role: 'teacher' dan 'student_guest' dengan permission berbeda | Must Have |
| FR-M1-08 | Profile Management | Teacher dapat edit nama, avatar, dan informasi profil | Should Have |

---

### 6.3 MODUL 2: COURSE MANAGEMENT

**Deskripsi:** Modul untuk membuat, mengelola, dan mengorganisir Course (Kelas) yang akan berisi Assessment.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M2-01 | Sebagai Teacher, saya ingin membuat course baru, sehingga saya dapat mengorganisir kelas saya | **Given** saya login di dashboard<br>**When** saya klik "Create Course" dan isi form<br>**Then** course dibuat dengan UUID unik | Must Have |
| US-M2-02 | Sebagai Teacher, saya ingin set course sebagai Private, sehingga hanya siswa dengan access code yang bisa join | **Given** saya membuat course<br>**When** saya pilih tipe Private<br>**Then** sistem generate access code 6 karakter | Must Have |
| US-M2-03 | Sebagai Student Guest, saya ingin join course dengan access code, sehingga saya bisa ikut kuis | **Given** saya punya access code<br>**When** saya input code yang valid<br>**Then** saya dapat lihat info course dan join | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M2-01 | Create Course | Form: nama, deskripsi, tipe (Public/Private), access_code (jika Private) | Must Have |
| FR-M2-02 | Auto-Generate Access Code | Sistem generate 6 karakter alphanumeric unik untuk Private course | Must Have |
| FR-M2-03 | Custom Access Code | Teacher dapat custom access code (min 6 karakter, unik) | Should Have |
| FR-M2-04 | Course Visibility | Public course dapat dicari, Private course hanya via access code | Must Have |
| FR-M2-05 | Course Listing | Teacher dapat lihat semua course yang dibuat dengan statistik | Must Have |
| FR-M2-06 | Edit Course | Teacher dapat edit detail course (nama, deskripsi, tipe) | Must Have |
| FR-M2-07 | Delete Course | Hapus course dengan cascade ke assessments (soft delete) | Must Have |
| FR-M2-08 | View Enrolled Students | Teacher dapat lihat daftar siswa yang enroll dengan status | Must Have |
| FR-M2-09 | Student Enrollment | Auto-enrollment saat guest student join dengan access code | Must Have |
| FR-M2-10 | Course Activation | Toggle active/inactive untuk course, inactive course tidak bisa dijoin | Should Have |

---

### 6.4 MODUL 3: ASSESSMENT MANAGEMENT

**Deskripsi:** Modul untuk membuat dan mengelola Assessment (Kuis) di dalam Course.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M3-01 | Sebagai Teacher, saya ingin membuat assessment dalam course, sehingga saya dapat evaluasi siswa | **Given** saya punya course<br>**When** saya klik "Create Assessment" dan isi form<br>**Then** assessment dibuat sebagai draft | Must Have |
| US-M3-02 | Sebagai Teacher, saya ingin set time limit untuk kuis, sehingga siswa punya batas waktu | **Given** saya membuat assessment<br>**When** saya set time_limit = 30 menit<br>**Then** timer countdown tampil saat siswa kerjakan | Must Have |
| US-M3-03 | Sebagai Teacher, saya ingin publish assessment, sehingga siswa dapat mengerjakan | **Given** assessment dalam status draft<br>**When** saya klik "Publish"<br>**Then** status berubah dan siswa dapat akses | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M3-01 | Create Assessment | Form: judul, deskripsi, time_limit, open_date, close_date | Must Have |
| FR-M3-02 | Assessment Status | Status: draft, published, archived. Default: draft | Must Have |
| FR-M3-03 | Time Limit Configuration | Time limit dalam menit, optional (null = unlimited) | Must Have |
| FR-M3-04 | Schedule Management | open_date dan close_date untuk kontrol akses temporal | Must Have |
| FR-M3-05 | Assessment Listing | List assessments dalam course dengan statistik (jumlah soal, siswa yang sudah kerjakan) | Must Have |
| FR-M3-06 | Edit Assessment | Edit detail assessment, hanya jika belum ada yang mengerjakan | Must Have |
| FR-M3-07 | Delete Assessment | Soft delete assessment dengan cascade ke questions | Should Have |
| FR-M3-08 | Publish/Unpublish | Toggle status published untuk enable/disable student access | Must Have |
| FR-M3-09 | Assessment Preview | Preview assessment seperti yang akan dilihat siswa | Should Have |

---

### 6.5 MODUL 4: QUESTION MANAGEMENT

**Deskripsi:** Modul untuk membuat dan mengelola soal dengan berbagai jenis menggunakan arsitektur JSON-based yang scalable.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M4-01 | Sebagai Teacher, saya ingin membuat soal Multiple Choice, sehingga saya dapat evaluasi pengetahuan faktual | **Given** saya di editor soal<br>**When** saya pilih tipe Multiple Choice dan input opsi<br>**Then** soal tersimpan dengan konfigurasi shuffle | Must Have |
| US-M4-02 | Sebagai Teacher, saya ingin membuat soal Essay, sehingga saya dapat evaluasi pemahaman mendalam | **Given** saya di editor soal<br>**When** saya pilih tipe Essay<br>**Then** soal ditandai butuh manual grading | Must Have |
| US-M4-03 | Sebagai Teacher, saya ingin membuat soal Match (Menjodohkan), sehingga saya dapat evaluasi kemampuan asosiasi | **Given** saya di editor soal<br>**When** saya pilih tipe Match dan input pasangan<br>**Then** soal tersimpan dengan pair_id | Should Have |
| US-M4-04 | Sebagai Teacher, saya ingin membuat soal Reorder, sehingga saya dapat evaluasi kemampuan sequencing | **Given** saya di editor soal<br>**When** saya pilih tipe Reorder dan set urutan benar<br>**Then** soal tersimpan dengan correct_order | Should Have |

#### Functional Requirements Detail

##### Multiple Choice

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-01 | Create Multiple Choice | Soal dengan 2-10 opsi, 1 atau lebih jawaban benar | Must Have |
| FR-M4-02 | Shuffle Options | Opsi dapat di-shuffle saat presentasi ke siswa | Must Have |
| FR-M4-03 | Single/Multiple Answer | Konfigurasi apakah ada 1 atau lebih jawaban benar | Must Have |

##### Essay

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-04 | Create Essay | Soal dengan text area untuk jawaban panjang | Must Have |
| FR-M4-05 | Manual Grading Flag | Essay ditandai requires_manual_grading = true | Must Have |
| FR-M4-06 | Grading Rubric | Teacher dapat input rubric penilaian di extra_data | Should Have |

##### Fill in the Blank

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-07 | Create Fill Blank | Soal isian singkat dengan accepted_answers multiple | Must Have |
| FR-M4-08 | Case Sensitivity | Konfigurasi apakah jawaban case-sensitive | Must Have |
| FR-M4-09 | Multiple Accepted Answers | Support multiple variasi jawaban yang benar | Must Have |

##### Match (Menjodohkan)

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-10 | Create Match | Soal dengan pasangan left-right items | Should Have |
| FR-M4-11 | Shuffle Match Items | Left items dapat di-shuffle, right items tetap | Should Have |
| FR-M4-12 | Pair Identification | Setiap pasangan diidentifikasi dengan pair_id di extra_data | Should Have |

##### Reorder

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-13 | Create Reorder | Soal mengurutkan items dengan correct_order | Should Have |
| FR-M4-14 | Partial Credit | Skor parsial berdasarkan jumlah posisi benar | Should Have |

##### General Question Features

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M4-15 | Question Editor | WYSIWYG editor untuk question_text (support rich text) | Must Have |
| FR-M4-16 | Points Configuration | Set points per soal (default 10) | Must Have |
| FR-M4-17 | Sort Order | Atur urutan soal dalam assessment | Must Have |
| FR-M4-18 | Question Preview | Preview soal sebelum publish | Must Have |
| FR-M4-19 | Edit/Delete Question | Edit atau hapus soal yang sudah dibuat | Must Have |
| FR-M4-20 | JSON Schema Validation | Validasi settings dan extra_data sesuai question_type | Must Have |

---

### 6.6 MODUL 5: REPORTING & ANALYTICS

**Deskripsi:** Modul untuk menampilkan hasil dan analisis performa siswa dalam assessment.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M5-01 | Sebagai Teacher, saya ingin lihat skor semua siswa, sehingga saya dapat monitor progress kelas | **Given** assessment sudah ada yang mengerjakan<br>**When** saya buka halaman report<br>**Then** tampil tabel skor semua siswa | Must Have |
| US-M5-02 | Sebagai Teacher, saya ingin lihat detail jawaban per siswa, sehingga saya dapat analisis kesalahan | **Given** saya di halaman report<br>**When** saya klik nama siswa<br>**Then** tampil detail jawaban per soal | Must Have |
| US-M5-03 | Sebagai Student Guest, saya ingin lihat skor saya setelah submit, sehingga saya tahu hasil | **Given** saya selesai kerjakan kuis<br>**When** saya submit jawaban<br>**Then** tampil skor dan review jawaban | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M5-01 | Score Table View | Tabel: nama siswa, skor, persentase, waktu pengerjaan, status | Must Have |
| FR-M5-02 | Sort & Filter | Sort berdasarkan skor/nama, filter berdasarkan tanggal | Must Have |
| FR-M5-03 | Individual Report | Detail jawaban per siswa dengan correct/wrong indicator | Must Have |
| FR-M5-04 | Question Analysis | Statistik per soal: % benar, % salah, % blank | Should Have |
| FR-M5-05 | Export Scores | Export tabel skor ke CSV/Excel | Should Have |
| FR-M5-06 | Student Result View | Halaman hasil untuk student dengan score dan review | Must Have |
| FR-M5-07 | Pending Grading Indicator | Tandai soal essay yang butuh manual grading | Must Have |
| FR-M5-08 | Manual Grading Interface | Interface untuk guru grade essay dengan rubric | Must Have |

---

### 6.7 MODUL 6: GUEST STUDENT EXPERIENCE

**Deskripsi:** Modul untuk pengalaman Student Guest dari join hingga melihat hasil.

#### User Stories

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| US-M6-01 | Sebagai Student Guest, saya ingin enter access code, sehingga saya bisa join kuis | **Given** saya di halaman join<br>**When** saya input access code valid<br>**Then** tampil info course/quiz | Must Have |
| US-M6-02 | Sebagai Student Guest, saya ingin input nama, sehingga saya dapat identifikasi diri | **Given** access code valid<br>**When** saya input nama lengkap<br>**Then** sistem auto-register saya sebagai guest | Must Have |
| US-M6-03 | Sebagai Student Guest, saya ingin kerjakan kuis dengan timer, sehingga saya tahu sisa waktu | **Given** saya sedang dalam quiz session<br>**When** timer berjalan<br>**Then** tampil countdown yang jelas | Must Have |
| US-M6-04 | Sebagai Student Guest, saya ingin auto-save jawaban, sehingga tidak hilang jika koneksi putus | **Given** saya sedang menjawab<br>**When** saya input jawaban<br>**Then** jawaban auto-save setiap 30 detik | Must Have |

#### Functional Requirements Detail

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| FR-M6-01 | Access Code Entry | Form input access code (case-insensitive) | Must Have |
| FR-M6-02 | Code Validation | Validasi code exists, course active, dalam date range | Must Have |
| FR-M6-03 | Guest Name Input | Form input nama (min 3 karakter, max 100) | Must Have |
| FR-M6-04 | Auto-Register Guest | Create user dengan role student_guest, email guest_{uuid}@quizizz.local | Must Have |
| FR-M6-05 | Auto-Enrollment | Create enrollment record saat guest join | Must Have |
| FR-M6-06 | Quiz Info Display | Tampil: judul, jumlah soal, time limit sebelum mulai | Must Have |
| FR-M6-07 | Quiz Interface | Navigasi soal, answer input per tipe, progress indicator | Must Have |
| FR-M6-08 | Timer Display | Countdown timer dengan warning (5 min, 1 min, 30 sec) | Must Have |
| FR-M6-09 | Auto-Save | Auto-save jawaban ke database setiap 30 detik | Must Have |
| FR-M6-10 | Manual Submit | Submit sebelum waktu habis dengan konfirmasi | Must Have |
| FR-M6-11 | Auto-Submit | Auto-submit saat timer mencapai 00:00 | Must Have |
| FR-M6-12 | Result Display | Tampil skor, correct/wrong breakdown, time spent | Must Have |

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-PERF-01 | Page load time | < 3 seconds untuk semua halaman utama | Must Have |
| NFR-PERF-02 | API response time | < 500 ms (95th percentile) | Must Have |
| NFR-PERF-03 | Concurrent users | Support 1000+ concurrent quiz takers per instance | Must Have |
| NFR-PERF-04 | Database query time | < 100 ms untuk queries umum | Must Have |
| NFR-PERF-05 | Quiz submit processing | < 2 detik untuk auto-grading dan save | Must Have |
| NFR-PERF-06 | Report generation | < 3 detik untuk generate score table | Should Have |

### 7.2 Availability & Reliability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-AVL-01 | System uptime | 99.5% availability | Must Have |
| NFR-AVL-02 | RTO (Recovery Time Objective) | < 4 hours | Must Have |
| NFR-AVL-03 | RPO (Recovery Point Objective) | < 1 hour | Must Have |
| NFR-AVL-04 | Backup frequency | Daily automated backup | Must Have |
| NFR-AVL-05 | Auto-save resilience | Jawaban tidak hilang jika disconnect < 30 detik | Must Have |

### 7.3 Security

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-SEC-01 | UUID Implementation | UUID v4 untuk semua primary keys | Must Have |
| NFR-SEC-02 | Password Hashing | bcrypt dengan cost factor 10+ | Must Have |
| NFR-SEC-03 | Session Security | HTTP-only cookies, secure flag, sameSite = strict | Must Have |
| NFR-SEC-04 | Access Code Protection | Access code tidak exposed di public API responses | Must Have |
| NFR-SEC-05 | SQL Injection Prevention | Parameterized queries / ORM untuk semua DB access | Must Have |
| NFR-SEC-06 | XSS Prevention | Input sanitization dan output encoding | Must Have |
| NFR-SEC-07 | Rate Limiting | 100 requests/minute per IP untuk prevent abuse | Should Have |
| NFR-SEC-08 | HTTPS Enforcement | All traffic via TLS 1.3 | Must Have |
| NFR-SEC-09 | Audit Logging | Log semua user actions (create, update, delete) | Must Have |

### 7.4 Scalability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-SCL-01 | Question Type Scalability | Arsitektur JSON support 10+ jenis soal tanpa schema change | Must Have |
| NFR-SCL-02 | Horizontal Scaling | Stateless architecture, support load balancing | Should Have |
| NFR-SCL-03 | Data Growth | Support 100,000+ questions dan 1,000,000+ responses | Must Have |
| NFR-SCL-04 | User Growth | Support 10,000+ registered teachers | Must Have |
| NFR-SCL-05 | Database Indexing | Index pada access_code, user_id, assessment_id | Must Have |

### 7.5 Usability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-USE-01 | Browser Support | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | Must Have |
| NFR-USE-02 | Responsive Design | Support desktop (1920x1080), tablet (768x1024), mobile (375x667) | Must Have |
| NFR-USE-03 | Language | Bahasa Indonesia (default), English | Must Have |
| NFR-USE-04 | Guest Flow Simplicity | Join quiz dalam maksimal 3 langkah | Must Have |
| NFR-USE-05 | Error Messages | User-friendly error messages dengan actionable guidance | Should Have |
| NFR-USE-06 | Accessibility | WCAG 2.1 Level AA (target future release) | Nice to Have |

### 7.6 Compliance

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-COMP-01 | Data Residency | Data disimpan di server Indonesia (jika applicable) | Should Have |
| NFR-COMP-02 | Privacy Compliance | Guest data retained max 1 tahun, dapat dihapus | Should Have |
| NFR-COMP-03 | Audit Support | Export logs untuk audit purposes | Must Have |

---

## 8. BUSINESS RULES & CONSTRAINTS

### 8.1 Business Rules

| ID | Rule | Description |
|----|------|-------------|
| BR-01 | Teacher Ownership | Teacher adalah owner penuh dari course yang dibuat, hanya teacher tersebut yang dapat edit/delete |
| BR-02 | Access Code Uniqueness | Access code harus unik di seluruh sistem (case-insensitive) |
| BR-03 | Course Enrollment | Satu siswa hanya bisa enroll sekali per course (tidak ada duplicate enrollment) |
| BR-04 | Assessment Attempt | Satu siswa hanya bisa mengerjakan satu assessment sekali (tidak ada re-take tanpa reset dari teacher) |
| BR-05 | Guest User Lifetime | Guest user record retained selama 1 tahun setelah aktivitas terakhir |
| BR-06 | Auto-Grading Rules | Hanya soal objective (Multiple Choice, Fill Blank, Match, Reorder) yang di-auto-grade. Essay butuh manual grading |
| BR-07 | Score Calculation | Skor total = sum(points_earned) dari semua soal. Essay yang belum graded = 0 poin sementara |
| BR-08 | Timer Behavior | Saat timer habis, jawaban yang sudah tersimpan otomatis di-submit |
| BR-09 | Course Type Change | Course dapat diubah dari Public ke Private atau sebaliknya, tetapi access_code harus di-set jika berubah ke Private |
| BR-10 | Assessment Publishing | Assessment hanya dapat dikerjakan siswa jika status = 'published' dan dalam date range |

### 8.2 Constraints

| ID | Constraint | Impact |
|----|------------|--------|
| CON-01 | Guest User Limitation | Guest student tidak dapat akses fitur advanced (history tracking, multiple attempts) |
| CON-02 | No Mobile App | Hanya web-based, tidak ada native mobile application pada fase ini |
| CON-03 | No Payment Integration | Tidak ada fitur paid course atau subscription pada lite version |
| CON-04 | No Live Multiplayer | Tidak ada fitur live quiz dengan real-time leaderboard pada lite version |
| CON-05 | Browser Dependency | Fitur auto-save dan timer bergantung pada browser JavaScript enabled |
| CON-06 | Email Verification Required | Teacher harus verifikasi email sebelum dapat membuat course |
| CON-07 | UUID Storage Overhead | UUID (128-bit) lebih besar dari auto-increment integer, impact pada storage dan index size |
| CON-08 | JSON Validation Complexity | Validasi JSON settings memerlukan logic tambahan di application layer |

---

## 9. DATA REQUIREMENTS

### 9.1 Data Entities

| Entity | Source | Volume (Est.) | Update Frequency |
|--------|--------|---------------|------------------|
| users | Generated | 10,000+ records (Year 1) | Low (registrasi teacher + auto guest) |
| courses | Teacher Input | 1,000+ records | Low (create/edit course) |
| course_enrollments | Auto-Generated | 100,000+ records | Medium (saat student join) |
| assessments | Teacher Input | 5,000+ records | Medium (create/edit assessment) |
| questions | Teacher Input | 50,000+ records | Medium (create/edit questions) |
| question_options | Teacher Input | 200,000+ records | Low (set saat create question) |
| student_responses | Auto-Generated | 500,000+ records | High (saat student take quiz) |
| response_details | Auto-Generated | 5,000,000+ records | High (setiap jawaban per soal) |

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
| Completeness | Semua required fields (NOT NULL) harus terisi. Validasi di application layer sebelum insert |
| Accuracy | UUID auto-generated, tidak ada manual input untuk primary keys. Foreign key constraints enforced |
| Timeliness | Timestamps (created_at, updated_at) auto-update. Response data real-time saat submit |
| Consistency | Status transitions validated (contoh: draft → published, tidak bisa langsung draft → archived) |
| Integrity | Cascade delete untuk soft deletes. Hard delete hanya untuk guest users > 1 tahun inactive |

---

## 10. ASSUMPTIONS & DEPENDENCIES

### 10.1 Assumptions

| ID | Assumption | Risk if Invalid |
|----|------------|-----------------|
| ASM-01 | Teacher memiliki akses internet stabil untuk membuat course | Jika tidak, proses create/edit soal dapat terganggu dan data mungkin hilang |
| ASM-02 | Student memiliki device (HP/laptop) dengan browser modern | Jika tidak, student tidak dapat ikut kuis |
| ASM-03 | Email service (SMTP) tersedia dan reliable untuk verifikasi | Jika tidak, teacher tidak dapat aktivasi akun |
| ASM-04 | UUID v4 collision sangat jarang (1 dalam 2^122) sehingga tidak perlu handling khusus | Jika collision terjadi, dapat menyebabkan data corruption |
| ASM-05 | Guest student nama yang diinput adalah nama asli/valid | Jika tidak, reporting dan identifikasi siswa menjadi tidak akurat |
| ASM-06 | Teacher kompeten menggunakan teknologi web dasar | Jika tidak, diperlukan training dan onboarding tambahan |

### 10.2 Dependencies

| ID | Dependency | Owner | Impact if Delayed |
|----|------------|-------|-------------------|
| DEP-01 | Email Service (SMTP) Configuration | DevOps | Teacher registration tidak berfungsi |
| DEP-02 | Database Server (PostgreSQL/MySQL) Setup | DevOps | Seluruh sistem tidak dapat berjalan |
| DEP-03 | SSL/TLS Certificate for HTTPS | DevOps | Security requirement tidak terpenuhi |
| DEP-04 | Frontend Framework (React/Vue) Setup | Tech Lead | Development frontend tertunda |
| DEP-05 | Backend Framework (Node.js/Python) Setup | Tech Lead | Development backend tertunda |
| DEP-06 | UI/UX Design Mockups | Designer | Developer tidak punya referensi visual |
| DEP-07 | Testing Environment Setup | QA | UAT tidak dapat dilakukan |

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

**Project dianggap SUKSES jika:**

1. ✅ Go-live sesuai timeline (estimasi: 8-12 minggu development)
2. ✅ Budget tidak melebihi ceiling yang disetujui
3. ✅ Seluruh Must Have requirements (49 items) delivered dan tested
4. ✅ Zero critical bugs saat go-live
5. ✅ 100+ teachers registered dalam 3 bulan pertama
6. ✅ 90%+ student dapat join dan complete quiz tanpa bantuan teknis
7. ✅ System uptime > 99.5% dalam 3 bulan pertama
8. ✅ Average page load time < 3 detik untuk semua halaman utama

---

## 12. GLOSSARY

| Term | Definition |
|------|------------|
| **Access Code** | Kode unik 6 karakter alphanumeric untuk join Private course |
| **Assessment** | Kuis atau penilaian yang berisi kumpulan soal dalam sebuah Course |
| **Course** | Kelas atau mata pelajaran yang dibuat oleh Teacher, dapat berisi multiple Assessments |
| **Guest Student** | Siswa yang tidak melakukan registrasi formal, bergabung sebagai guest via access code |
| **Question Options** | Pilihan jawaban untuk soal Multiple Choice, atau items untuk Match/Reorder |
| **Question Settings** | JSON configuration untuk properti spesifik per tipe soal (shuffle, case_sensitive, dll) |
| **Question Extra Data** | JSON data tambahan untuk kompleksitas soal (pair_id, correct_order, accepted_answers) |
| **Student Response** | Record pengerjaan kuis oleh siswa, berisi skor dan status submission |
| **Response Details** | Detail jawaban per soal dalam sebuah Student Response |
| **Teacher** | Pengguna terdaftar dengan role 'teacher', memiliki otoritas membuat Course dan Assessment |
| **UUID** | Universally Unique Identifier (128-bit) digunakan sebagai primary key untuk semua tabel |
| **Auto-Grading** | Proses penilaian otomatis untuk soal objective (Multiple Choice, Fill Blank, Match, Reorder) |
| **Manual Grading** | Penilaian yang dilakukan Teacher secara manual, biasanya untuk soal Essay |
| **Public Course** | Course yang dapat dicari dan dilihat oleh siapa saja tanpa access code |
| **Private Course** | Course yang memerlukan access code untuk join |
| **Soft Delete** | Penghapusan data dengan men-set flag is_active/inactive, bukan delete fisik dari database |
| **Enrollment** | Record yang merepresentasikan siswa yang bergabung ke sebuah Course |

---

## 13. APPROVAL SIGN-OFF

### 13.1 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | _________________ | _________________ | _________ |
| Product Owner | _________________ | _________________ | _________ |
| Business Owner | _________________ | _________________ | _________ |
| IT Owner | _________________ | _________________ | _________ |
| Tech Lead | _________________ | _________________ | _________ |

### 13.2 Requirements Approval

Dengan menandatangani dokumen ini, stakeholder menyetujui bahwa:

1. ✅ Requirements telah direview dan dipahami secara menyeluruh
2. ✅ Scope sudah sesuai dengan kebutuhan bisnis dan prioritas
3. ✅ Prioritas requirements (Must/Should/Nice to Have) sudah tepat
4. ✅ Dokumen ini menjadi baseline untuk development dan change management
5. ✅ Setiap perubahan scope setelah approval akan melalui change request process

---

## APPENDICES

### Appendix A: Referensi Dokumen Terkait

| Dokumen | Lokasi |
|---------|--------|
| Project Execution Plan | `/docs/project/02-project-execution-plan.md` |
| Implementation & Architecture | `/docs/project/03-implementation-and-architecture.md` |
| Database Schema | `/docs/project/04-database-schema.md` (To be created) |
| API Documentation | `/docs/project/05-api-specification.md` (To be created) |

### Appendix B: Question Type JSON Examples

Lihat Section 6.5 untuk contoh lengkap JSON schema untuk setiap tipe soal.

### Appendix C: User Journey Maps

Lihat Section 2 untuk user personas dan journey maps detail.

---

*Dokumen ini adalah bagian dari Project Documentation Quizizz Clone (Lite Version)*  
*Lokasi: `/docs/project/01-bussiness-requirement.md`*  
*LearnWeb LMS Project © 2026*
