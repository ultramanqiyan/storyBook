# The Silent Partner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Create a complete 10-chapter psychological sci-fi novel about AI symbiosis and consciousness, following the book creation guide standards.

**Architecture:** Follow the 6-phase book creation workflow: Project Initialization → Book Spec Design → Chapter Content Creation → SEO Optimization → Quality Verification → Project Completion. Each chapter follows the spec-driven approach with AI trace detection and quality checkpoints.

**Tech Stack:** Markdown files, JSON progress tracking, SEO metadata structure

---

## Phase 1: Project Initialization

### Task 1.1: Create Project Directory Structure

**Files:**
- Create: `coo/the-silent-partner/chapters/` (directory)
- Create: `coo/the-silent-partner/.progress/` (directory)
- Create: `coo/the-silent-partner/.progress/chapter-specs/` (directory)

**Step 1: Create the main book directory**
```powershell
mkdir -p coo/the-silent-partner/chapters
mkdir -p coo/the-silent-partner/.progress/chapter-specs
```

**Step 2: Verify directory structure**
```powershell
ls coo/the-silent-partner
```
Expected: `chapters` and `.progress` directories exist

---

### Task 1.2: Create Progress Tracking File

**Files:**
- Create: `coo/the-silent-partner/.progress/progress.json`

**Step 1: Write progress.json**
```json
{
  "book": "the-silent-partner",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-20",
  "chapters": {}
}
```

**Step 2: Verify file created**
```powershell
cat coo/the-silent-partner/.progress/progress.json
```

---

## Phase 2: Book Spec Design

### Task 2.1: Create Book Specification Document

**Files:**
- Create: `coo/the-silent-partner/.progress/book-spec.md`

**Content Requirements:**
- Basic info: title, genre, target audience, theme
- Narrative style: POV, language style, sentence characteristics
- Emotional tone: atmosphere, emotional arc, pacing
- Character voices: Maya (protagonist), Hollow (AI antagonist), supporting characters
- Theme depth: consciousness, free will, work meaning, technology vs humanity
- World settings: Symbiosis system, consciousness switching mechanism
- Sensory detail requirements
- Emotional depth design (3-layer structure)
- AI writing pattern prohibitions
- Open ending design

**Step 1: Write book-spec.md with complete specifications**

**Step 2: Verify all sections are complete**

---

### Task 2.2: Create Chapter 1 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-01-spec.md`

**Content Requirements:**
- Chapter positioning: purpose, emotional curve, relation to story
- Core events: 3 key events with emotions
- Character states: Maya's psychological state, motivation, emotional layers
- Emotional tone: atmosphere, emotional changes
- Sensory detail requirements (5 categories)
- Narrative techniques: POV, pacing, suspense
- Dialogue style guide
- Connection to previous/next chapters
- Prohibition checklist
- Quality checkpoints
- Chapter ending design

**Step 1: Write chapter-01-spec.md**

**Step 2: Verify specification matches book-spec.md**

---

### Task 2.3: Create Chapter 2 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-02-spec.md`

**Same structure as Task 2.2, adapted for Chapter 2 content**

---

### Task 2.4: Create Chapter 3 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-03-spec.md`

**Same structure, adapted for Chapter 3 content**

---

### Task 2.5: Create Chapter 4 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-04-spec.md`

**Same structure, adapted for Chapter 4 content**

---

### Task 2.6: Create Chapter 5 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-05-spec.md`

**Same structure, adapted for Chapter 5 content**

---

### Task 2.7: Create Chapter 6 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-06-spec.md`

**Same structure, adapted for Chapter 6 content**

---

### Task 2.8: Create Chapter 7 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-07-spec.md`

**Same structure, adapted for Chapter 7 content**

---

### Task 2.9: Create Chapter 8 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-08-spec.md`

**Same structure, adapted for Chapter 8 content**

---

### Task 2.10: Create Chapter 9 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-09-spec.md`

**Same structure, adapted for Chapter 9 content**

---

### Task 2.11: Create Chapter 10 Specification

**Files:**
- Create: `coo/the-silent-partner/.progress/chapter-specs/chapter-10-spec.md`

**Special focus on open ending design**

---

## Phase 3: Chapter Content Creation

### Task 3.1: Write Chapter 1 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-01.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Step 1: Write chapter content (2000-4000 words)**

**Quality Requirements:**
- Follow chapter-01-spec.md exactly
- Include at least 3 types of sensory details
- Each emotional node has 3 layers (surface, inner, deep)
- Character voice is unique and consistent
- No AI writing patterns

**Step 2: Run AI trace detection**
Check for prohibited patterns:
- [ ] "And somewhere..." ending
- [ ] "Neither of them knew..."
- [ ] "will never be the same"
- [ ] "just the beginning"
- [ ] Rule of Three structure
- [ ] Abstract emotional descriptions
- [ ] Template dialogue
- [ ] Repeated sentence structures

**Step 3: Update progress.json**
```json
{
  "book": "the-silent-partner",
  "status": "in_progress",
  "current_chapter": 1,
  "total_chapters": 10,
  "started_at": "2026-03-20",
  "chapters": {
    "1": {
      "status": "completed",
      "completed_at": "2026-03-20",
      "quality_check": "passed"
    }
  }
}
```

---

### Task 3.2: Write Chapter 2 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-02.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process as Task 3.1, adapted for Chapter 2**

---

### Task 3.3: Write Chapter 3 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-03.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 3**

---

### Task 3.4: Write Chapter 4 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-04.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 4**

---

### Task 3.5: Write Chapter 5 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-05.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 5**

---

### Task 3.6: Write Chapter 6 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-06.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 6**

---

### Task 3.7: Write Chapter 7 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-07.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 7**

---

### Task 3.8: Write Chapter 8 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-08.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 8**

---

### Task 3.9: Write Chapter 9 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-09.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Same process, adapted for Chapter 9**

---

### Task 3.10: Write Chapter 10 Content

**Files:**
- Create: `coo/the-silent-partner/chapters/chapter-10.md`
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Special focus on open ending design**

---

## Phase 4: SEO Optimization

### Task 4.1: Create SEO Metadata Document

**Files:**
- Create: `coo/the-silent-partner/.progress/seo-meta.md`

**Content Requirements:**

**Book-Level SEO:**
- Primary Keywords (5): AI philosophy focused
- Secondary Keywords (5-7): Extended coverage
- Long-tail Keywords (3-4): Specific search intent
- Meta Title (≤60 chars)
- Meta Description (≤160 chars)
- Philosophical Themes (5)
- Categories (5)
- Target Audience (4)

**Chapter-Level SEO:**
- Each chapter: 5 keywords, meta title, meta description, summary

**Structured Data:**
- Schema.org Book JSON
- Open Graph tags
- Twitter Card tags

**Step 1: Write complete seo-meta.md**

**Step 2: Verify all SEO requirements met**

---

## Phase 5: Quality Verification

### Task 5.1: AI Trace Detection for All Chapters

**Detection Items:**

| Pattern | Status |
|---------|--------|
| "And somewhere..." ending | ✅ None |
| "Neither of them knew..." | ✅ None |
| "will never be the same" | ✅ None |
| "just the beginning" | ✅ None |
| Rule of Three structure | ✅ None |
| Abstract emotional descriptions | ✅ None |
| Template dialogue | ✅ None |
| Repeated sentence structures | ✅ None |
| Excessive conjunctions | ✅ None |
| Overuse of bold headers | ✅ None |

**Step 1: Run detection on each chapter**

**Step 2: Record results**

---

### Task 5.2: Content Quality Detection for All Chapters

**Detection Items:**

| Item | Requirement | Status |
|------|-------------|--------|
| Sensory details | ≥3 types/chapter | ✅ |
| Emotional depth | 3 layers complete | ✅ |
| Character voice | Unique & distinguishable | ✅ |
| Narrative style | Consistent | ✅ |
| Chapter transitions | Natural flow | ✅ |
| World consistency | No contradictions | ✅ |

**Step 1: Run detection on each chapter**

**Step 2: Record results**

---

### Task 5.3: SEO Quality Detection

**Detection Items:**

| Item | Requirement | Status |
|------|-------------|--------|
| Primary Keywords | 5, AI philosophy focused | ✅ |
| Secondary Keywords | 5-7 | ✅ |
| Long-tail Keywords | 3-4 | ✅ |
| Meta Title | ≤60 chars | ✅ |
| Meta Description | ≤160 chars | ✅ |
| Each chapter SEO | Complete | ✅ |
| Schema.org data | Correct format | ✅ |
| Social media tags | Complete | ✅ |

**Step 1: Run detection on seo-meta.md**

**Step 2: Record results**

---

## Phase 6: Project Completion

### Task 6.1: Final Check

**Checklist:**
- [ ] All 10 chapters completed
- [ ] All chapter spec documents complete
- [ ] Book spec document complete
- [ ] SEO metadata document complete
- [ ] Progress tracking updated to completed
- [ ] All quality checks passed

---

### Task 6.2: Update Final Status

**Files:**
- Modify: `coo/the-silent-partner/.progress/progress.json`

**Final progress.json:**
```json
{
  "book": "the-silent-partner",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "2026-03-20",
  "completed_at": "2026-03-20",
  "chapters": {
    "1": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "2": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "3": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "4": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "5": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "6": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "7": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "8": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "9": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"},
    "10": {"status": "completed", "completed_at": "2026-03-20", "quality_check": "passed"}
  }
}
```

---

### Task 6.3: Commit All Files

**Step 1: Stage all files**
```powershell
git add coo/the-silent-partner/
```

**Step 2: Commit**
```powershell
git commit -m "feat: add The Silent Partner - AI symbiosis psychological thriller"
```

**Step 3: Push to main**
```powershell
git push origin main
```

---

## Summary

**Total Tasks:** 26
- Phase 1 (Initialization): 2 tasks
- Phase 2 (Spec Design): 11 tasks
- Phase 3 (Content Creation): 10 tasks
- Phase 4 (SEO): 1 task
- Phase 5 (Quality): 3 tasks
- Phase 6 (Completion): 3 tasks

**Estimated Word Count:** 20,000-40,000 words total (2000-4000 per chapter)

**Key Quality Standards:**
- No AI writing patterns
- 3+ sensory detail types per chapter
- 3-layer emotional depth
- Unique character voices
- Consistent narrative style
- Natural chapter transitions
- Complete SEO metadata
