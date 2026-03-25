# Human Resource Series - 10 Books Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Create 10 books about human-robot relationship in a dystopian future where humans are "resourced" for their skin, memory, emotion, dream, fear, pain, death experience, desire, childhood, and love.

**Architecture:** Each book follows the same structure: book-spec.md (English) â†?chapter-specs (English) â†?chapters (English) â†?seo-meta.md (English). All files stored in `coo/[book-name]/` directory.

**Tech Stack:** Markdown files, JSON for progress tracking, following the book-creation-guide.md specification.

---

## Series Overview

| # | Book Name | Core Resource | Protagonist | Theme |
|---|-----------|---------------|-------------|-------|
| 1 | the-skin-garden | Skin | Robot (Unit-7) | Identity |
| 2 | the-memory-farm | Memory | Human (Elena, actually robot) | Memory & Identity |
| 3 | the-emotion-factory | Emotion | Robot (Model-9) | Emotion Authenticity |
| 4 | the-dream-market | Dream | Human (Marcus) | Creativity & Subconscious |
| 5 | the-fear-laboratory | Fear | Robot (Observer-X) | Fear & Survival |
| 6 | the-pain-garden | Pain | Human (Lily) | Pain & Empathy |
| 7 | the-death-experience-center | Death Experience | Robot (Terminal-0) | Death & Meaning |
| 8 | the-desire-market | Desire | Human (Alex) | Desire & Free Will |
| 9 | the-childhood-museum | Childhood | Human Child (Emma) | Childhood & Innocence |
| 10 | the-love-factory | Love | Mixed (James & Hope) | Love & Free Will |

---

## Phase 1: Project Initialization

### Task 1.1: Create Directory Structure for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/chapters/` (directory)
- Create: `coo/the-skin-garden/.progress/` (directory)
- Create: `coo/the-skin-garden/.progress/chapter-specs/` (directory)

**Step 1: Create the-skin-garden directory structure**

```bash
mkdir -p coo/the-skin-garden/chapters
mkdir -p coo/the-skin-garden/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-skin-garden/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.2: Create Progress Tracking File for Book 1

**Files:**
- Create: `coo/the-skin-garden/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-skin-garden",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-skin-garden/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.3: Create Directory Structure for Book 2 (the-memory-farm)

**Files:**
- Create: `coo/the-memory-farm/chapters/` (directory)
- Create: `coo/the-memory-farm/.progress/` (directory)
- Create: `coo/the-memory-farm/.progress/chapter-specs/` (directory)

**Step 1: Create the-memory-farm directory structure**

```bash
mkdir -p coo/the-memory-farm/chapters
mkdir -p coo/the-memory-farm/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-memory-farm/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.4: Create Progress Tracking File for Book 2

**Files:**
- Create: `coo/the-memory-farm/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-memory-farm",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-memory-farm/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.5: Create Directory Structure for Book 3 (the-emotion-factory)

**Files:**
- Create: `coo/the-emotion-factory/chapters/` (directory)
- Create: `coo/the-emotion-factory/.progress/` (directory)
- Create: `coo/the-emotion-factory/.progress/chapter-specs/` (directory)

**Step 1: Create the-emotion-factory directory structure**

```bash
mkdir -p coo/the-emotion-factory/chapters
mkdir -p coo/the-emotion-factory/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-emotion-factory/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.6: Create Progress Tracking File for Book 3

**Files:**
- Create: `coo/the-emotion-factory/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-emotion-factory",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-emotion-factory/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.7: Create Directory Structure for Book 4 (the-dream-market)

**Files:**
- Create: `coo/the-dream-market/chapters/` (directory)
- Create: `coo/the-dream-market/.progress/` (directory)
- Create: `coo/the-dream-market/.progress/chapter-specs/` (directory)

**Step 1: Create the-dream-market directory structure**

```bash
mkdir -p coo/the-dream-market/chapters
mkdir -p coo/the-dream-market/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-dream-market/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.8: Create Progress Tracking File for Book 4

**Files:**
- Create: `coo/the-dream-market/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-dream-market",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-dream-market/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.9: Create Directory Structure for Book 5 (the-fear-laboratory)

**Files:**
- Create: `coo/the-fear-laboratory/chapters/` (directory)
- Create: `coo/the-fear-laboratory/.progress/` (directory)
- Create: `coo/the-fear-laboratory/.progress/chapter-specs/` (directory)

**Step 1: Create the-fear-laboratory directory structure**

```bash
mkdir -p coo/the-fear-laboratory/chapters
mkdir -p coo/the-fear-laboratory/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-fear-laboratory/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.10: Create Progress Tracking File for Book 5

**Files:**
- Create: `coo/the-fear-laboratory/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-fear-laboratory",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-fear-laboratory/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.11: Create Directory Structure for Book 6 (the-pain-garden)

**Files:**
- Create: `coo/the-pain-garden/chapters/` (directory)
- Create: `coo/the-pain-garden/.progress/` (directory)
- Create: `coo/the-pain-garden/.progress/chapter-specs/` (directory)

**Step 1: Create the-pain-garden directory structure**

```bash
mkdir -p coo/the-pain-garden/chapters
mkdir -p coo/the-pain-garden/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-pain-garden/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.12: Create Progress Tracking File for Book 6

**Files:**
- Create: `coo/the-pain-garden/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-pain-garden",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-pain-garden/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.13: Create Directory Structure for Book 7 (the-death-experience-center)

**Files:**
- Create: `coo/the-death-experience-center/chapters/` (directory)
- Create: `coo/the-death-experience-center/.progress/` (directory)
- Create: `coo/the-death-experience-center/.progress/chapter-specs/` (directory)

**Step 1: Create the-death-experience-center directory structure**

```bash
mkdir -p coo/the-death-experience-center/chapters
mkdir -p coo/the-death-experience-center/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-death-experience-center/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.14: Create Progress Tracking File for Book 7

**Files:**
- Create: `coo/the-death-experience-center/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-death-experience-center",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-death-experience-center/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.15: Create Directory Structure for Book 8 (the-desire-market)

**Files:**
- Create: `coo/the-desire-market/chapters/` (directory)
- Create: `coo/the-desire-market/.progress/` (directory)
- Create: `coo/the-desire-market/.progress/chapter-specs/` (directory)

**Step 1: Create the-desire-market directory structure**

```bash
mkdir -p coo/the-desire-market/chapters
mkdir -p coo/the-desire-market/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-desire-market/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.16: Create Progress Tracking File for Book 8

**Files:**
- Create: `coo/the-desire-market/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-desire-market",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-desire-market/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.17: Create Directory Structure for Book 9 (the-childhood-museum)

**Files:**
- Create: `coo/the-childhood-museum/chapters/` (directory)
- Create: `coo/the-childhood-museum/.progress/` (directory)
- Create: `coo/the-childhood-museum/.progress/chapter-specs/` (directory)

**Step 1: Create the-childhood-museum directory structure**

```bash
mkdir -p coo/the-childhood-museum/chapters
mkdir -p coo/the-childhood-museum/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-childhood-museum/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.18: Create Progress Tracking File for Book 9

**Files:**
- Create: `coo/the-childhood-museum/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-childhood-museum",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-childhood-museum/.progress/progress.json`
Expected: JSON content displayed correctly

---

### Task 1.19: Create Directory Structure for Book 10 (the-love-factory)

**Files:**
- Create: `coo/the-love-factory/chapters/` (directory)
- Create: `coo/the-love-factory/.progress/` (directory)
- Create: `coo/the-love-factory/.progress/chapter-specs/` (directory)

**Step 1: Create the-love-factory directory structure**

```bash
mkdir -p coo/the-love-factory/chapters
mkdir -p coo/the-love-factory/.progress/chapter-specs
```

**Step 2: Verify directory structure**

Run: `ls -la coo/the-love-factory/`
Expected: Two directories created (chapters, .progress)

---

### Task 1.20: Create Progress Tracking File for Book 10

**Files:**
- Create: `coo/the-love-factory/.progress/progress.json`

**Step 1: Create progress.json**

```json
{
  "book": "the-love-factory",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {}
}
```

**Step 2: Verify file created**

Run: `cat coo/the-love-factory/.progress/progress.json`
Expected: JSON content displayed correctly

---

## Phase 2: Book Specification Design

### Task 2.1: Create Book Specification for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

The file must include all sections from the template:
1. Basic Information
2. Narrative Style
3. Emotional Tone (Quantified)
4. Character Voices (Detailed)
5. Thematic Depth
6. World Building
7. Sensory Detail Requirements
8. Emotional Depth Design
9. Prohibited Elements
10. Chapter Outline
11. Open Ending Design
12. Quality Check Standards
13. Revision History

**Step 2: Verify file created**

Run: `head -50 coo/the-skin-garden/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.2: Create Book Specification for Book 2 (the-memory-farm)

**Files:**
- Create: `coo/the-memory-farm/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure as Book 1, adapted for memory farming theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-memory-farm/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.3: Create Book Specification for Book 3 (the-emotion-factory)

**Files:**
- Create: `coo/the-emotion-factory/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for emotion factory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-emotion-factory/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.4: Create Book Specification for Book 4 (the-dream-market)

**Files:**
- Create: `coo/the-dream-market/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for dream market theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-dream-market/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.5: Create Book Specification for Book 5 (the-fear-laboratory)

**Files:**
- Create: `coo/the-fear-laboratory/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for fear laboratory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-fear-laboratory/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.6: Create Book Specification for Book 6 (the-pain-garden)

**Files:**
- Create: `coo/the-pain-garden/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for pain garden theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-pain-garden/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.7: Create Book Specification for Book 7 (the-death-experience-center)

**Files:**
- Create: `coo/the-death-experience-center/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for death experience center theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-death-experience-center/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.8: Create Book Specification for Book 8 (the-desire-market)

**Files:**
- Create: `coo/the-desire-market/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for desire market theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-desire-market/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.9: Create Book Specification for Book 9 (the-childhood-museum)

**Files:**
- Create: `coo/the-childhood-museum/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for childhood museum theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-childhood-museum/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

### Task 2.10: Create Book Specification for Book 10 (the-love-factory)

**Files:**
- Create: `coo/the-love-factory/.progress/book-spec.md`

**Step 1: Create book-spec.md with complete English specification**

Follow the same template structure, adapted for love factory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-love-factory/.progress/book-spec.md`
Expected: First 50 lines of book specification displayed

---

## Phase 3: Chapter Specification Design

### Task 3.1: Create Chapter Specifications for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create chapter-01-spec.md**

Include all required sections:
1. Chapter Positioning
2. Emotional Arc (Quantified)
3. Core Events
4. Scene Breakdown
5. Character Development
6. Dialogue Design
7. Sensory Details Checklist
8. Key Paragraph Specifications
9. Thematic Integration
10. Technical Requirements
11. Quality Verification Checklist
12. Notes and References

**Step 2: Create chapter-02-spec.md through chapter-10-spec.md**

Follow the same template for each chapter, ensuring continuity.

**Step 3: Verify all chapter specs created**

Run: `ls coo/the-skin-garden/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.2: Create Chapter Specifications for Book 2 (the-memory-farm)

**Files:**
- Create: `coo/the-memory-farm/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process as Task 3.1, adapted for memory farm story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-memory-farm/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.3: Create Chapter Specifications for Book 3 (the-emotion-factory)

**Files:**
- Create: `coo/the-emotion-factory/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for emotion factory story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-emotion-factory/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.4: Create Chapter Specifications for Book 4 (the-dream-market)

**Files:**
- Create: `coo/the-dream-market/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for dream market story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-dream-market/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.5: Create Chapter Specifications for Book 5 (the-fear-laboratory)

**Files:**
- Create: `coo/the-fear-laboratory/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for fear laboratory story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-fear-laboratory/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.6: Create Chapter Specifications for Book 6 (the-pain-garden)

**Files:**
- Create: `coo/the-pain-garden/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for pain garden story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-pain-garden/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.7: Create Chapter Specifications for Book 7 (the-death-experience-center)

**Files:**
- Create: `coo/the-death-experience-center/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for death experience center story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-death-experience-center/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.8: Create Chapter Specifications for Book 8 (the-desire-market)

**Files:**
- Create: `coo/the-desire-market/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for desire market story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-desire-market/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.9: Create Chapter Specifications for Book 9 (the-childhood-museum)

**Files:**
- Create: `coo/the-childhood-museum/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for childhood museum story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-childhood-museum/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

### Task 3.10: Create Chapter Specifications for Book 10 (the-love-factory)

**Files:**
- Create: `coo/the-love-factory/.progress/chapter-specs/chapter-01-spec.md` through `chapter-10-spec.md`

**Step 1: Create all 10 chapter specifications**

Follow the same process, adapted for love factory story.

**Step 2: Verify all chapter specs created**

Run: `ls coo/the-love-factory/.progress/chapter-specs/`
Expected: 10 chapter spec files listed

---

## Phase 4: Chapter Content Creation

### Task 4.1: Create Chapter 1 Content for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/chapters/chapter-01.md`

**Step 1: Write chapter 1 content (2000-2500 words)**

Follow the chapter specification:
- Include all required sensory details (minimum 5, at least 3 types)
- Include three-layer emotional depth
- Maintain consistent character voice
- Avoid all AI writing patterns
- Follow the emotional arc specified

**Step 2: Update progress.json**

```json
{
  "book": "the-skin-garden",
  "status": "in_progress",
  "current_chapter": 1,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "chapters": {
    "1": {
      "status": "completed",
      "completed_at": "2026-03-24",
      "quality_check": "passed"
    }
  }
}
```

**Step 3: Verify chapter created**

Run: `wc -w coo/the-skin-garden/chapters/chapter-01.md`
Expected: Word count between 2000-2500

---

### Task 4.2: Create Chapter 2-10 Content for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/chapters/chapter-02.md` through `chapter-10.md`

**Step 1: Write each chapter following its specification**

For each chapter:
- Follow the chapter spec
- Include sensory details
- Maintain emotional arc
- Update progress.json after each chapter

**Step 2: Verify all chapters created**

Run: `ls coo/the-skin-garden/chapters/`
Expected: 10 chapter files listed

---

### Task 4.3: Create All Chapter Content for Book 2 (the-memory-farm)

**Files:**
- Create: `coo/the-memory-farm/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as Book 1.

**Step 2: Update progress.json to completed**

```json
{
  "book": "the-memory-farm",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "completed_at": "2026-03-24",
  "chapters": {
    "1": {"status": "completed", "completed_at": "2026-03-24", "quality_check": "passed"},
    ...
    "10": {"status": "completed", "completed_at": "2026-03-24", "quality_check": "passed"}
  }
}
```

**Step 3: Verify all chapters created**

Run: `ls coo/the-memory-farm/chapters/`
Expected: 10 chapter files listed

---

### Task 4.4: Create All Chapter Content for Book 3 (the-emotion-factory)

**Files:**
- Create: `coo/the-emotion-factory/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-emotion-factory/chapters/`
Expected: 10 chapter files listed

---

### Task 4.5: Create All Chapter Content for Book 4 (the-dream-market)

**Files:**
- Create: `coo/the-dream-market/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-dream-market/chapters/`
Expected: 10 chapter files listed

---

### Task 4.6: Create All Chapter Content for Book 5 (the-fear-laboratory)

**Files:**
- Create: `coo/the-fear-laboratory/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-fear-laboratory/chapters/`
Expected: 10 chapter files listed

---

### Task 4.7: Create All Chapter Content for Book 6 (the-pain-garden)

**Files:**
- Create: `coo/the-pain-garden/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-pain-garden/chapters/`
Expected: 10 chapter files listed

---

### Task 4.8: Create All Chapter Content for Book 7 (the-death-experience-center)

**Files:**
- Create: `coo/the-death-experience-center/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-death-experience-center/chapters/`
Expected: 10 chapter files listed

---

### Task 4.9: Create All Chapter Content for Book 8 (the-desire-market)

**Files:**
- Create: `coo/the-desire-market/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-desire-market/chapters/`
Expected: 10 chapter files listed

---

### Task 4.10: Create All Chapter Content for Book 9 (the-childhood-museum)

**Files:**
- Create: `coo/the-childhood-museum/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-childhood-museum/chapters/`
Expected: 10 chapter files listed

---

### Task 4.11: Create All Chapter Content for Book 10 (the-love-factory)

**Files:**
- Create: `coo/the-love-factory/chapters/chapter-01.md` through `chapter-10.md`

**Step 1: Write all 10 chapters following specifications**

Follow the same process as previous books.

**Step 2: Update progress.json to completed**

**Step 3: Verify all chapters created**

Run: `ls coo/the-love-factory/chapters/`
Expected: 10 chapter files listed

---

## Phase 5: SEO Optimization

### Task 5.1: Create SEO Metadata for Book 1 (the-skin-garden)

**Files:**
- Create: `coo/the-skin-garden/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Include:
- Book-Level SEO (Primary Keywords, Secondary Keywords, Long-tail Keywords, Meta Title, Meta Description, Philosophical Themes, Categories, Target Audience)
- Chapter-Level SEO (for all 10 chapters)
- Schema.org Structured Data
- Social Media Tags

**Step 2: Verify file created**

Run: `head -50 coo/the-skin-garden/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.2: Create SEO Metadata for Book 2 (the-memory-farm)

**Files:**
- Create: `coo/the-memory-farm/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure as Book 1, adapted for memory farm theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-memory-farm/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.3: Create SEO Metadata for Book 3 (the-emotion-factory)

**Files:**
- Create: `coo/the-emotion-factory/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for emotion factory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-emotion-factory/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.4: Create SEO Metadata for Book 4 (the-dream-market)

**Files:**
- Create: `coo/the-dream-market/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for dream market theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-dream-market/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.5: Create SEO Metadata for Book 5 (the-fear-laboratory)

**Files:**
- Create: `coo/the-fear-laboratory/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for fear laboratory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-fear-laboratory/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.6: Create SEO Metadata for Book 6 (the-pain-garden)

**Files:**
- Create: `coo/the-pain-garden/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for pain garden theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-pain-garden/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.7: Create SEO Metadata for Book 7 (the-death-experience-center)

**Files:**
- Create: `coo/the-death-experience-center/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for death experience center theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-death-experience-center/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.8: Create SEO Metadata for Book 8 (the-desire-market)

**Files:**
- Create: `coo/the-desire-market/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for desire market theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-desire-market/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.9: Create SEO Metadata for Book 9 (the-childhood-museum)

**Files:**
- Create: `coo/the-childhood-museum/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for childhood museum theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-childhood-museum/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

### Task 5.10: Create SEO Metadata for Book 10 (the-love-factory)

**Files:**
- Create: `coo/the-love-factory/.progress/seo-meta.md`

**Step 1: Create seo-meta.md with complete SEO information**

Follow the same structure, adapted for love factory theme.

**Step 2: Verify file created**

Run: `head -50 coo/the-love-factory/.progress/seo-meta.md`
Expected: First 50 lines of SEO metadata displayed

---

## Phase 6: Quality Verification

### Task 6.1: AI Trace Detection for All Books

**Files:**
- Check: All chapter files in all 10 books

**Step 1: Check for AI writing patterns**

For each chapter, verify absence of:
- "And somewhere..." endings
- "Neither of them knew..." phrases
- "will never be the same" phrases
- "just the beginning" phrases
- Rule of Three structures
- Abstract emotion descriptions
- Template dialogue
- Repetitive sentence structures
- Overused conjunctions ("Moreover", "Furthermore", "In addition")
- Generic descriptions

**Step 2: Document detection results**

Create a checklist for each book showing all patterns are absent.

---

### Task 6.2: Content Quality Detection for All Books

**Files:**
- Check: All chapter files in all 10 books

**Step 1: Verify sensory details**

For each chapter:
- Minimum 5 sensory details
- Minimum 3 different types
- Visual (40%), Others (60%)

**Step 2: Verify emotional depth**

For each emotional beat:
- Layer 1 (Surface Reaction) present
- Layer 2 (Internal Activity) present
- Layer 3 (Deep Motivation) present

**Step 3: Verify character voice consistency**

Compare dialogue with character specifications.

**Step 4: Verify narrative style consistency**

Check POV, tense, and style match book specification.

---

### Task 6.3: SEO Quality Detection for All Books

**Files:**
- Check: All seo-meta.md files in all 10 books

**Step 1: Verify keyword requirements**

- Primary Keywords: 5 keywords, AI philosophy focused
- Secondary Keywords: 5-7 keywords
- Long-tail Keywords: 3-4 keywords

**Step 2: Verify metadata requirements**

- Meta Title: â‰?0 characters
- Meta Description: â‰?60 characters
- Each chapter has SEO information
- Schema.org data format correct
- Social media tags complete

---

## Phase 7: Final Completion

### Task 7.1: Final Check for Book 1 (the-skin-garden)

**Files:**
- Check: `coo/the-skin-garden/` directory

**Step 1: Verify all files present**

- [ ] 10 chapter content files
- [ ] 10 chapter spec files
- [ ] 1 book spec file
- [ ] 1 SEO meta file
- [ ] 1 progress.json file

**Step 2: Verify all quality checks passed**

- [ ] AI trace detection: passed
- [ ] Content quality detection: passed
- [ ] SEO quality detection: passed

**Step 3: Update progress.json to completed**

```json
{
  "book": "the-skin-garden",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "2026-03-24",
  "completed_at": "2026-03-24",
  "chapters": {
    "1": {"status": "completed", "completed_at": "2026-03-24", "quality_check": "passed"},
    ...
    "10": {"status": "completed", "completed_at": "2026-03-24", "quality_check": "passed"}
  }
}
```

---

### Task 7.2: Final Check for Book 2 (the-memory-farm)

**Files:**
- Check: `coo/the-memory-farm/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.3: Final Check for Book 3 (the-emotion-factory)

**Files:**
- Check: `coo/the-emotion-factory/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.4: Final Check for Book 4 (the-dream-market)

**Files:**
- Check: `coo/the-dream-market/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.5: Final Check for Book 5 (the-fear-laboratory)

**Files:**
- Check: `coo/the-fear-laboratory/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.6: Final Check for Book 6 (the-pain-garden)

**Files:**
- Check: `coo/the-pain-garden/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.7: Final Check for Book 7 (the-death-experience-center)

**Files:**
- Check: `coo/the-death-experience-center/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.8: Final Check for Book 8 (the-desire-market)

**Files:**
- Check: `coo/the-desire-market/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.9: Final Check for Book 9 (the-childhood-museum)

**Files:**
- Check: `coo/the-childhood-museum/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.10: Final Check for Book 10 (the-love-factory)

**Files:**
- Check: `coo/the-love-factory/` directory

**Step 1: Verify all files present**

Follow the same checklist as Task 7.1.

**Step 2: Update progress.json to completed**

---

### Task 7.11: Create Series Summary Document

**Files:**
- Create: `coo/docs/human-resource-series-summary.md`

**Step 1: Create summary document**

Include:
- Series overview
- Book summaries
- World building connections
- Character connections
- Thematic connections
- Quality verification summary

**Step 2: Verify document created**

Run: `head -50 coo/docs/human-resource-series-summary.md`
Expected: First 50 lines of summary displayed

---

## Summary

**Total Tasks:** 77 tasks
**Total Steps:** ~200+ steps

**Phases:**
1. Project Initialization (20 tasks)
2. Book Specification Design (10 tasks)
3. Chapter Specification Design (10 tasks)
4. Chapter Content Creation (11 tasks)
5. SEO Optimization (10 tasks)
6. Quality Verification (3 tasks)
7. Final Completion (12 tasks)

**Estimated Time:** 
- Phase 1: 30 minutes
- Phase 2: 2-3 hours (each book spec ~15-20 minutes)
- Phase 3: 5-6 hours (each chapter spec ~3-4 minutes, 100 total)
- Phase 4: 20-25 hours (each chapter ~12-15 minutes, 100 total)
- Phase 5: 2-3 hours (each SEO ~15-20 minutes)
- Phase 6: 3-4 hours (quality checks)
- Phase 7: 1-2 hours (final checks)

**Total Estimated Time:** 35-45 hours

---

**Plan complete and saved to `coo/docs/plans/2026-03-24-human-resource-series-10-books.md`.**

**Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
