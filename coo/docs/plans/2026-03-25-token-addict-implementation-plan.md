# The Token Addict Series Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Create 8-book series design documents following book-creation-guide.md specifications

**Architecture:** Each book follows the standard structure: .progress/book-spec.md, .progress/seo-meta.md, .progress/chapter-specs/, and chapters/ directory

**Tech Stack:** Markdown, following coo/.templates/book-spec-template.md

---

## Phase 1: Book 1 - Borrowed Mind

### Task 1.1: Create Book 1 Directory Structure

**Files:**
- Create: `coo/the-token-addict-borrowed-mind/chapters/` (directory)
- Create: `coo/the-token-addict-borrowed-mind/.progress/` (directory)
- Create: `coo/the-token-addict-borrowed-mind/.progress/chapter-specs/` (directory)
- Create: `coo/the-token-addict-borrowed-mind/.progress/progress.json`

**Step 1: Create directories**

```bash
mkdir -p coo/the-token-addict-borrowed-mind/chapters
mkdir -p coo/the-token-addict-borrowed-mind/.progress/chapter-specs
```

**Step 2: Create progress.json**

```json
{
  "book": "the-token-addict-borrowed-mind",
  "series": "the-token-addict",
  "book_number": 1,
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-25",
  "chapters": {}
}
```

---

### Task 1.2: Create Book 1 Specification Document

**Files:**
- Create: `coo/the-token-addict-borrowed-mind/.progress/book-spec.md`

**Content:** Full English specification following book-spec-template.md, including:
- Basic Information (Title, Genre, Target Readers, Core Themes)
- Narrative Style (First-person, Marcus Webb POV)
- Emotional Tone (Quantified)
- Character Voices (Marcus Webb detailed)
- Thematic Depth (Cognitive degeneration philosophy)
- World Building (Silicon Valley, Nexus Technologies)
- Sensory Detail Requirements
- Emotional Depth Design
- Prohibited Elements
- Chapter Outline (10 chapters)
- Open Ending Design

---

### Task 1.3: Create Book 1 SEO Metadata

**Files:**
- Create: `coo/the-token-addict-borrowed-mind/.progress/seo-meta.md`

**Content:** Full English SEO metadata including:
- Primary Keywords (AI dependency, cognitive decline, silicon valley fiction)
- Secondary Keywords
- Long-tail Keywords
- Meta Title (≤60 chars)
- Meta Description (≤160 chars)
- Philosophical Themes
- Categories
- Target Audience
- Chapter-level SEO (10 chapters)
- Schema.org Structured Data
- Social Media Tags

---

### Task 1.4: Create Book 1 Chapter Specifications

**Files:**
- Create: `coo/the-token-addict-borrowed-mind/.progress/chapter-specs/chapter-01-spec.md`
- Create: `coo/the-token-addict-borrowed-mind/.progress/chapter-specs/chapter-02-spec.md`
- ... (chapter-03 through chapter-10)

**Content per chapter:** Full English specification following chapter-spec-template.md, including:
- Chapter Positioning
- Emotional Arc (Quantified with intensity values)
- Core Events
- Scene Breakdown
- Character Development
- Dialogue Design
- Sensory Details Checklist
- Key Paragraph Specifications
- Thematic Integration
- Technical Requirements
- Quality Verification Checklist

---

## Phase 2: Book 2 - Rusty Craft

### Task 2.1: Create Book 2 Directory Structure

**Files:**
- Create: `coo/the-token-addict-rusty-craft/chapters/` (directory)
- Create: `coo/the-token-addict-rusty-craft/.progress/` (directory)
- Create: `coo/the-token-addict-rusty-craft/.progress/chapter-specs/` (directory)
- Create: `coo/the-token-addict-rusty-craft/.progress/progress.json`

**Step 1: Create directories**

```bash
mkdir -p coo/the-token-addict-rusty-craft/chapters
mkdir -p coo/the-token-addict-rusty-craft/.progress/chapter-specs
```

**Step 2: Create progress.json**

```json
{
  "book": "the-token-addict-rusty-craft",
  "series": "the-token-addict",
  "book_number": 2,
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-25",
  "chapters": {}
}
```

---

### Task 2.2: Create Book 2 Specification Document

**Files:**
- Create: `coo/the-token-addict-rusty-craft/.progress/book-spec.md`

**Content:** Full English specification focusing on:
- Technical Degeneration theme
- Marcus at age 32, promoted to Tech Lead
- Philosophy: "When skills rust, does craft still exist?"
- Competitive pressure elements (AI-first strategy, layoffs)

---

### Task 2.3: Create Book 2 SEO Metadata

**Files:**
- Create: `coo/the-token-addict-rusty-craft/.progress/seo-meta.md`

---

### Task 2.4: Create Book 2 Chapter Specifications

**Files:**
- Create: `coo/the-token-addict-rusty-craft/.progress/chapter-specs/chapter-01-spec.md` through chapter-10

---

## Phase 3: Book 3 - Empty Canvas

### Task 3.1: Create Book 3 Directory Structure

Same structure as Book 1 and Book 2.

### Task 3.2: Create Book 3 Specification Document

**Focus:** Creativity Degeneration
**Marcus Age:** 34
**Philosophy:** "When creation becomes imitation, where does creativity go?"

### Task 3.3: Create Book 3 SEO Metadata

### Task 3.4: Create Book 3 Chapter Specifications

---

## Phase 4: Book 4 - Drifting Will

### Task 4.1: Create Book 4 Directory Structure

### Task 4.2: Create Book 4 Specification Document

**Focus:** Willpower Degeneration
**Marcus Age:** 36
**Philosophy:** "When drive becomes drift, does free will still exist?"
**Competitive Pressure:** AI-driven OKR, efficiency as only metric

### Task 4.3: Create Book 4 SEO Metadata

### Task 4.4: Create Book 4 Chapter Specifications

---

## Phase 5: Book 5 - Silent Room

### Task 5.1: Create Book 5 Directory Structure

### Task 5.2: Create Book 5 Specification Document

**Focus:** Social Degeneration
**Marcus Age:** 38
**Philosophy:** "When connection becomes silence, what is loneliness?"

### Task 5.3: Create Book 5 SEO Metadata

### Task 5.4: Create Book 5 Chapter Specifications

---

## Phase 6: Book 6 - Fragile Heart

### Task 6.1: Create Book 6 Directory Structure

### Task 6.2: Create Book 6 Specification Document

**Focus:** Emotional Resilience Degeneration
**Marcus Age:** 40
**Philosophy:** "When strength becomes fragility, how to face failure?"
**Competitive Pressure:** "Failure is unacceptable" culture

### Task 6.3: Create Book 6 SEO Metadata

### Task 6.4: Create Book 6 Chapter Specifications

---

## Phase 7: Book 7 - Blurred Line

### Task 7.1: Create Book 7 Directory Structure

### Task 7.2: Create Book 7 Specification Document

**Focus:** Moral Judgment Degeneration
**Marcus Age:** 42
**Philosophy:** "When right and wrong blur, does morality still exist?"
**Competitive Pressure:** Cost optimization leading to layoffs

### Task 7.3: Create Book 7 SEO Metadata

### Task 7.4: Create Book 7 Chapter Specifications

---

## Phase 8: Book 8 - Dissolving Self

### Task 8.1: Create Book 8 Directory Structure

### Task 8.2: Create Book 8 Specification Document

**Focus:** Self-Awareness Degeneration
**Marcus Age:** 45
**Philosophy:** "When self begins to dissolve, who am I?"
**Ending:** Open ending with hope/uncertainty

### Task 8.3: Create Book 8 SEO Metadata

### Task 8.4: Create Book 8 Chapter Specifications

---

## Quality Checklist

### Before Each Book

- [ ] Directory structure created correctly
- [ ] progress.json created with correct book_number
- [ ] All file paths are correct

### After Each Book Specification

- [ ] All sections from book-spec-template.md are filled
- [ ] Language is English (US)
- [ ] Character voices are consistent with series design
- [ ] Emotional arc is quantified
- [ ] Sensory requirements are specified
- [ ] Prohibited elements are listed
- [ ] Chapter outline matches series design

### After Each Chapter Specification

- [ ] All sections from chapter-spec-template.md are filled
- [ ] Emotional arc has intensity values (0-100)
- [ ] Sensory details are specified (≥5, ≥3 types)
- [ ] Three-layer emotional depth is planned
- [ ] Chapter connects to previous and next chapters

---

## Execution Notes

1. **Consistency Check**: Each book must reference the series design document for character consistency
2. **Progressive Degeneration**: Marcus's state in each book must reflect accumulated degeneration
3. **Competitive Pressure**: Integrate competitive elements naturally into each book
4. **Philosophy Integration**: Each book's philosophy theme must be woven into plot, not preached
5. **Legal Safety**: All company names, AI tool names are fictional

---

## File Summary

| Book | Directory | Files to Create |
|------|-----------|-----------------|
| 1 | the-token-addict-borrowed-mind | 13 files (progress.json, book-spec.md, seo-meta.md, 10 chapter-specs) |
| 2 | the-token-addict-rusty-craft | 13 files |
| 3 | the-token-addict-empty-canvas | 13 files |
| 4 | the-token-addict-drifting-will | 13 files |
| 5 | the-token-addict-silent-room | 13 files |
| 6 | the-token-addict-fragile-heart | 13 files |
| 7 | the-token-addict-blurred-line | 13 files |
| 8 | the-token-addict-dissolving-self | 13 files |

**Total:** 104 files + 1 series design document = 105 files

---

**END OF IMPLEMENTATION PLAN**
