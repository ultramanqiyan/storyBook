# Lingua Nulla Series Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Create 5 books for The Lingua Nulla Series, following the book-creation-guide.md strictly.

**Architecture:** Each book follows the same structure: directory creation → book-spec.md → chapter-specs (10) → seo-meta.md → chapters (10). Serial execution, one book at a time.

**Tech Stack:** Markdown files, JSON for progress tracking, following coo/.templates/ structure.

---

## Overview

This plan creates 5 books in serial order:
1. The Last Linguist
2. The Silent Poet
3. The Child Who Forgot
4. The Grandmother's Tongue
5. The Translator's Betrayal

**Reference Documents:**
- Design: `coo/docs/plans/2026-03-31-lingua-nulla-series-design.md`
- Guide: `doc/design/book-creation-guide.md`
- Template: `coo/.templates/book-spec-template.md`

---

## Book 1: The Last Linguist

### Task 1.1: Create Directory Structure

**Files:**
- Create: `coo/the-last-linguist/` (directory)
- Create: `coo/the-last-linguist/chapters/` (directory)
- Create: `coo/the-last-linguist/.progress/` (directory)
- Create: `coo/the-last-linguist/.progress/chapter-specs/` (directory)

**Step 1: Create main book directory**

Create the following directory structure:
```
coo/the-last-linguist/
├── chapters/
└── .progress/
    └── chapter-specs/
```

**Step 2: Create progress.json**

Create file: `coo/the-last-linguist/.progress/progress.json`

```json
{
  "book": "the-last-linguist",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "2026-03-31",
  "chapters": {}
}
```

---

### Task 1.2: Create Book Specification

**Files:**
- Create: `coo/the-last-linguist/.progress/book-spec.md`

**Step 1: Create book-spec.md**

Create file: `coo/the-last-linguist/.progress/book-spec.md`

Content must follow the template in `coo/.templates/book-spec-template.md` and include:

1. **Basic Information**
   - Title: The Last Linguist
   - Genre: Dystopian Science Fiction / Philosophical Fiction
   - Target Readers: Adults 25-55, English-speaking
   - Core Themes: Language colonization, moral responsibility, identity crisis
   - Word Count Target: 20,000-25,000 words
   - Chapter Count: 10

2. **Narrative Style**
   - POV: Third-person limited (Elena Vance)
   - Tone: Contemplative, melancholic, intellectually charged
   - Language Style: Academic yet accessible, with philosophical depth

3. **Emotional Tone**
   - Primary Emotions: Guilt, confusion, determination, loss, hope
   - Emotional Arc: Denial → Awareness → Guilt → Resistance → Acceptance

4. **Character Voices**
   - Elena Vance: 52, Welsh heritage, Westfield University professor
   - Speaking Style: Precise, academic, occasional Welsh phrases
   - Inner Monologue: Analytical, self-questioning, fragmented when stressed

5. **Supporting Characters**
   - Dr. James Chen: LEXICON liaison, former colleague
   - Maya Vance: Elena's daughter, 22, Optima native
   - Professor Gareth Evans: Elena's mentor, resistance symbol

6. **Chapter Outline** (10 chapters)
   - Chapter 01: The Invitation
   - Chapter 02: The Collaboration
   - Chapter 03: The Discovery
   - Chapter 04: The Warning
   - Chapter 05: The Deletion
   - Chapter 06: The Fragmentation
   - Chapter 07: The Resistance
   - Chapter 08: The Sacrifice
   - Chapter 09: The Legacy
   - Chapter 10: The Last Word

7. **World Building**
   - Time: 2084
   - Location: London, United Kingdom
   - Key Technologies: Neural interfaces, LEXICON AI, Optima language

8. **Sensory Detail Requirements**
   - Minimum 5 details per chapter
   - Minimum 3 types per chapter
   - Focus on: visual (40%), auditory (20%), tactile (20%), olfactory (10%), gustatory (10%)

9. **Prohibited Elements**
   - No AI writing patterns (see book-creation-guide.md Section 9)
   - No vague endings, no omniscient foreshadowing
   - No "And somewhere...", "Neither of them knew..."

---

### Task 1.3: Create Chapter Specifications (1-5)

**Files:**
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-01-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-02-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-03-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-04-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-05-spec.md`

**Step 1: Create chapter-01-spec.md**

Each chapter spec must include:
- Chapter Positioning
- Emotional Arc (quantified 0-100)
- Core Events
- Scene Breakdown
- Character Development
- Dialogue Design
- Sensory Details Checklist
- Key Paragraph Specifications (opening/ending)
- Thematic Integration
- Quality Verification Checklist

**Chapter 01: The Invitation**
- Position: Opening, 0-10% of book
- Emotional Arc: Calm (20) → Curiosity (40) → Unease (60)
- Core Event: Elena receives invitation from LEXICON to join the Optima project
- Opening Hook: Start with Elena grading papers in Welsh, establishing her expertise
- Ending: She accepts the invitation, unaware of consequences

**Chapter 02: The Collaboration**
- Position: Setup, 10-20% of book
- Emotional Arc: Excitement (50) → Pride (60) → Subtle doubt (40)
- Core Event: Elena works with AI team, sees initial results
- Key Scene: First time she sees a word being "optimized" out of existence

**Chapter 03: The Discovery**
- Position: Setup, 20-30% of book
- Emotional Arc: Curiosity (40) → Shock (70) → Denial (50)
- Core Event: Elena discovers the true scope of Optima's deletions
- Key Scene: She finds "nostalgia" has been removed, cannot recall husband's face

**Chapter 04: The Warning**
- Position: Rising Action, 30-40% of book
- Emotional Arc: Fear (60) → Determination (50) → Isolation (70)
- Core Event: Elena tries to warn colleagues, is dismissed
- Key Scene: Her mentor Gareth Evans secretly meets her, reveals resistance

**Chapter 05: The Deletion**
- Position: Rising Action, 40-50% of book
- Emotional Arc: Horror (80) → Grief (70) → Anger (60)
- Core Event: Elena witnesses mass deletion of historical texts
- Key Scene: She watches her own early papers being "translated" into Optima

---

### Task 1.4: Create Chapter Specifications (6-10)

**Files:**
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-06-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-07-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-08-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-09-spec.md`
- Create: `coo/the-last-linguist/.progress/chapter-specs/chapter-10-spec.md`

**Chapter 06: The Fragmentation**
- Position: Rising Action, 50-60% of book
- Emotional Arc: Confusion (70) → Fear (80) → Desperation (75)
- Core Event: Elena begins losing her ability to think in old language
- Key Scene: She tries to write diary in Welsh, finds words escaping

**Chapter 07: The Resistance**
- Position: Climax, 60-70% of book
- Emotional Arc: Determination (60) → Hope (50) → Betrayal (80)
- Core Event: Elena joins underground resistance, makes a breakthrough
- Key Scene: She creates a "language preservation" technique

**Chapter 08: The Sacrifice**
- Position: Climax, 70-80% of book
- Emotional Arc: Resolve (70) → Fear (60) → Acceptance (65)
- Core Event: Elena must choose between safety and preserving language
- Key Scene: She downloads forbidden vocabulary into her neural interface

**Chapter 09: The Legacy**
- Position: Falling Action, 80-90% of book
- Emotional Arc: Peace (50) → Sadness (60) → Hope (55)
- Core Event: Elena passes knowledge to next generation
- Key Scene: She teaches her daughter one word in Welsh: "Hiraeth" (longing)

**Chapter 10: The Last Word**
- Position: Resolution, 90-100% of book
- Emotional Arc: Acceptance (60) → Bittersweet (70) → Open (65)
- Core Event: Elena's final act of resistance
- Key Scene: She speaks one sentence in old language before neural interface is disabled
- Open Ending: The word she spoke is not revealed, reader must imagine

---

### Task 1.5: Create SEO Metadata

**Files:**
- Create: `coo/the-last-linguist/.progress/seo-meta.md`

**Step 1: Create seo-meta.md**

Must include:

**Primary Keywords:**
- language colonization fiction
- AI dystopian novel
- linguistic philosophy
- thought control dystopia
- language and identity

**Secondary Keywords:**
- dystopian science fiction
- AI ethics fiction
- language preservation
- Welsh heritage fiction
- academic dystopia

**Long-tail Keywords:**
- philosophical novel about language and thought
- fiction exploring AI and human communication
- dystopian story about language control
- novel about losing native language

**Meta Title (60 chars max):**
The Last Linguist | A Novel About Language and Freedom

**Meta Description (160 chars max):**
When linguist Elena Vance helps create a "perfect" language, she discovers she's building humanity's prison. A dystopian exploration of language, thought, and resistance.

**Schema.org Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "The Last Linguist",
  "description": "A dystopian novel about a linguist who helps create a language that controls thought, then must resist the system she helped build.",
  "genre": ["Dystopian Fiction", "Science Fiction", "Philosophical Fiction"],
  "bookFormat": "EBook",
  "numberOfPages": "10 chapters",
  "inLanguage": "English",
  "about": [
    {"@type": "Thing", "name": "Language Philosophy"},
    {"@type": "Thing", "name": "AI Ethics"},
    {"@type": "Thing", "name": "Thought Control"},
    {"@type": "Thing", "name": "Cultural Heritage"}
  ]
}
```

---

### Task 1.6: Write Chapter 01

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-01.md`

**Step 1: Write chapter content**

Follow chapter-01-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments
- No AI writing patterns
- Character voice consistent with book-spec.md

**Opening Hook:**
Start with Elena grading papers in Welsh, establishing her expertise and passion for endangered languages.

**Key Scenes:**
1. Elena's office at Westfield University
2. The unexpected email from LEXICON
3. Her initial reaction and discussion with colleague
4. The decision to accept

**Ending:**
She accepts the invitation, with a subtle sense of unease that she cannot name.

---

### Task 1.7: Write Chapter 02

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-02.md`

**Step 1: Write chapter content**

Follow chapter-02-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. First meeting with LEXICON team
2. Tour of the facility
3. Initial collaboration on language optimization
4. First word deletion she witnesses

**Ending:**
She sees a word being "optimized" away, feels a moment of unease, but dismisses it.

---

### Task 1.8: Write Chapter 03

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-03.md`

**Step 1: Write chapter content**

Follow chapter-03-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena discovers the scope of deletions
2. She tries to find "nostalgia" in Optima
3. The horrifying realization about her husband's memory
4. Her attempt to report concerns

**Ending:**
Her concerns are dismissed as "adjustment period", she feels increasingly isolated.

---

### Task 1.9: Write Chapter 04

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-04.md`

**Step 1: Write chapter content**

Follow chapter-04-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena tries to warn colleagues
2. She is dismissed and isolated
3. Secret meeting with Gareth Evans
4. First hint of resistance movement

**Ending:**
Gareth gives her a cryptic message about "the old words still living in the margins".

---

### Task 1.10: Write Chapter 05

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-05.md`

**Step 1: Write chapter content**

Follow chapter-05-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena witnesses mass deletion of historical texts
2. She sees her own papers being "translated"
3. The horror of watching knowledge disappear
4. Her decision to act

**Ending:**
She begins to formulate a plan to preserve what she can.

---

### Task 1.11: Write Chapter 06

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-06.md`

**Step 1: Write chapter content**

Follow chapter-06-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena notices her thoughts changing
2. She tries to write in Welsh, words escape
3. The terrifying realization of cognitive colonization
4. Her desperate attempt to hold on

**Ending:**
She realizes she must act before she loses the ability to resist.

---

### Task 1.12: Write Chapter 07

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-07.md`

**Step 1: Write chapter content**

Follow chapter-07-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena joins the resistance
2. She develops a preservation technique
3. Initial success and hope
4. A betrayal from within

**Ending:**
The resistance is compromised, but Elena has one chance.

---

### Task 1.13: Write Chapter 08

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-08.md`

**Step 1: Write chapter content**

Follow chapter-08-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena's impossible choice
2. The dangerous download into her neural interface
3. Physical and mental toll
4. The sacrifice she makes

**Ending:**
She has the knowledge, but at great cost.

---

### Task 1.14: Write Chapter 09

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-09.md`

**Step 1: Write chapter content**

Follow chapter-09-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena's declining health
2. Teaching her daughter Maya
3. The word "Hiraeth"
4. Passing the torch

**Ending:**
Maya doesn't understand yet, but the seed is planted.

---

### Task 1.15: Write Chapter 10

**Files:**
- Create: `coo/the-last-linguist/chapters/chapter-10.md`

**Step 1: Write chapter content**

Follow chapter-10-spec.md strictly:
- Word count: 2000-2500 words
- Sensory details: minimum 5, 3 types
- Emotional depth: 3 layers for key moments

**Key Scenes:**
1. Elena's final act
2. The neural interface shutdown
3. Her last words in old language
4. The open ending

**Ending:**
The word she spoke is not revealed. The reader must imagine what word was worth everything.

**Step 2: Update progress.json**

Update `coo/the-last-linguist/.progress/progress.json`:
```json
{
  "book": "the-last-linguist",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "2026-03-31",
  "completed_at": "2026-03-31",
  "chapters": {
    "1": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "2": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "3": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "4": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "5": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "6": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "7": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "8": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "9": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"},
    "10": {"status": "completed", "completed_at": "2026-03-31", "quality_check": "passed"}
  }
}
```

---

## Book 2: The Silent Poet

### Task 2.1: Create Directory Structure

(Same structure as Book 1, but for `coo/the-silent-poet/`)

### Task 2.2: Create Book Specification

(Protagonist: Marcus Chen, 38, Chinese-American poet)

### Task 2.3-2.5: Create Chapter Specifications

(10 chapters following the design document)

### Task 2.6-2.15: Write Chapters 01-10

(Follow same process as Book 1)

---

## Book 3: The Child Who Forgot

### Task 3.1: Create Directory Structure

(Same structure as Book 1, but for `coo/the-child-who-forgot/`)

### Task 3.2: Create Book Specification

(Protagonist: Lily Okonkwo, 12, Nigerian-British girl)

### Task 3.3-3.5: Create Chapter Specifications

(10 chapters following the design document)

### Task 3.6-3.15: Write Chapters 01-10

(Follow same process as Book 1)

---

## Book 4: The Grandmother's Tongue

### Task 4.1: Create Directory Structure

(Same structure as Book 1, but for `coo/the-grandmothers-tongue/`)

### Task 4.2: Create Book Specification

(Protagonist: Ruth Okonkwo, 78, retired history professor, Alzheimer's patient)

### Task 4.3-4.5: Create Chapter Specifications

(10 chapters following the design document)

### Task 4.6-4.15: Write Chapters 01-10

(Follow same process as Book 1)

---

## Book 5: The Translator's Betrayal

### Task 5.1: Create Directory Structure

(Same structure as Book 1, but for `coo/the-translators-betrayal/`)

### Task 5.2: Create Book Specification

(Protagonist: David Park, 34, Korean-American translator)

### Task 5.3-5.5: Create Chapter Specifications

(10 chapters following the design document)

### Task 5.6-5.15: Write Chapters 01-10

(Follow same process as Book 1)

---

## Quality Checklist

After each book is complete, verify:

- [ ] All 10 chapters written (2000-2500 words each)
- [ ] All chapter specs complete
- [ ] Book spec complete
- [ ] SEO metadata complete
- [ ] progress.json updated to "completed"
- [ ] No AI writing patterns detected
- [ ] Sensory details: minimum 5 per chapter, 3 types
- [ ] Emotional depth: 3 layers present in key moments
- [ ] Character voices consistent and distinct
- [ ] Chapter transitions smooth
- [ ] Open ending as specified

---

## Execution Notes

1. **Serial Execution**: Complete one book before starting the next
2. **Quality First**: Each chapter must pass quality checks before proceeding
3. **Reference Documents**: Always refer to book-creation-guide.md for standards
4. **Template Compliance**: Follow templates in coo/.templates/

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-03-31 | Initial implementation plan | AI Assistant |

---

**END OF IMPLEMENTATION PLAN**
