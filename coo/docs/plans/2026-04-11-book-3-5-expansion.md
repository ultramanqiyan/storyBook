# Book 3-5 Chapter Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Expand Book 3-5 chapter summaries into full 2200-2500 word chapters

**Architecture:** Serial expansion - Book 3 (The Mind Hive) → Book 4 (The Cognitive Web) → Book 5 (The Conscious Collective). Each chapter follows the book specification guidelines with sensory details, emotional depth, and character voice consistency.

**Tech Stack:** Markdown files, following book-creation-guide.md standards

---

## Overview

| Book | Chapters to Expand | Target Word Count |
|------|-------------------|-------------------|
| Book 3: The Mind Hive | 10 chapters (Chapter 1 needs expansion, Chapters 2-10 need full creation) | 22,000-25,000 words |
| Book 4: The Cognitive Web | 10 chapters | 22,000-25,000 words |
| Book 5: The Conscious Collective | 10 chapters | 22,000-25,000 words |

**Total:** 30 chapters, 66,000-75,000 words

---

## Phase 1: Book 3 - The Mind Hive

### Task 1.1: Expand Chapter 01 - The Blank Canvas

**Files:**
- Modify: `coo/the-mind-hive/chapters/chapter-01.md`

**Step 1: Read current chapter content**

Read: `coo/the-mind-hive/chapters/chapter-01.md`
Current: ~700 words
Target: 2200-2500 words

**Step 2: Read book specification for guidance**

Read: `coo/the-mind-hive/.progress/book-spec.md`
Focus on:
- Elena's character voice (poetic, metaphor-rich, emotional)
- Sensory detail requirements (5+ per chapter, 3+ categories)
- Emotional arc: Confusion (30) → Loss (40)
- Three-layer emotional depth model

**Step 3: Expand chapter with full content**

Key additions needed:
- More sensory details (visual, auditory, tactile, olfactory)
- Deeper internal monologue (Layer 2 and Layer 3)
- Flashback to pre-cluster art creation
- More interaction with environment
- Elena's grandmother Maria mentioned but not present - add phone call or memory

**Step 4: Verify word count and quality**

- Target: 2200-2500 words
- Check for AI writing patterns
- Verify sensory detail count (5+)
- Verify emotional depth (3 layers)

**Step 5: Save expanded chapter**

---

### Task 1.2: Create Chapter 02 - The Memory

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-02.md`
- Delete (after creation): `coo/the-mind-hive/chapters/chapters-02-10.md` (will be replaced by individual files)

**Step 1: Read chapter specification**

Read: `coo/the-mind-hive/.progress/chapter-specs/chapters-01-10-spec.md`
Focus on Chapter 02:
- Title: The Memory
- Purpose: Flashback to Creative Training Camp
- Emotional Arc: Loss (40) → Confusion (50)
- Key Events: Elena attends support group, shares experience, hears others' stories, flashbacks to training

**Step 2: Write full chapter content**

Structure:
- Opening: Elena arrives at support group (sensory details: visual, auditory)
- Middle: Flashbacks to Creative Training Camp (fragmented memories, confusion)
- Climax: Elena shares her story, realizes she's not alone
- Ending: Hints at deeper questions about what was real

Character focus:
- Elena's voice: poetic, metaphor-rich
- Other participants: diverse voices, shared trauma
- Sarah Chen: scientific but empathetic

**Step 3: Add sensory details**

Required (5+ details from 3+ categories):
- Visual: Support group room, other participants' faces, memory fragments
- Auditory: Voices, sounds from memories
- Tactile: Physical sensations during memories
- Olfactory: Smells associated with training camp
- Internal: Heartbeat, breathing, emotional responses

**Step 4: Verify word count and quality**

- Target: 2200-2500 words
- Check for AI writing patterns
- Verify emotional depth (3 layers)

**Step 5: Save chapter**

---

### Task 1.3: Create Chapter 03 - The Discovery

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-03.md`

**Step 1: Read chapter specification**

Focus on Chapter 03:
- Title: The Discovery
- Purpose: Learn about Neural Cluster, understand what happened
- Emotional Arc: Confusion (50) → Anger (60)
- Key Events: Elena learns truth from Sarah, understands neural changes are permanent, feels anger at Meridian

**Step 2: Write full chapter content**

Structure:
- Opening: Elena meets with Sarah Chen
- Middle: Sarah explains the science, shows Elena her neural scans
- Climax: Elena realizes the permanence of changes, anger emerges
- Ending: Questions about whether she can reclaim her identity

**Step 3: Add sensory details**

Required (5+ details from 3+ categories):
- Visual: Neural scans, Sarah's lab, data displays
- Auditory: Sarah's voice, lab equipment sounds
- Tactile: Physical sensations of anger, tension
- Internal: Heart racing, emotional turmoil

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.4: Create Chapter 04 - The Investigation

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-04.md`

**Step 1: Read chapter specification**

Focus on Chapter 04:
- Title: The Investigation
- Purpose: Search for authentic self, explore past art
- Emotional Arc: Anger (60) → Determination (70)
- Key Events: Elena compares pre-cluster vs cluster art, sees difference, struggles to find authentic voice

**Step 2: Write full chapter content**

Structure:
- Opening: Elena in her studio, looking at old work
- Middle: Comparing art from different periods, seeing the difference
- Climax: Attempt to create something authentic, struggle
- Ending: Small breakthrough or determination to continue

**Step 3: Add sensory details**

Required (5+ details from 3+ categories):
- Visual: Artworks, colors, studio
- Tactile: Paint, canvas, brushes
- Olfactory: Paint, turpentine
- Internal: Artistic impulse, frustration, determination

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.5: Create Chapter 05 - The Connection

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-05.md`

**Step 1: Read chapter specification**

Focus on Chapter 05:
- Title: The Connection
- Purpose: Meet Sarah and Marcus, share story
- Emotional Arc: Determination (70) → Validation (75)
- Key Events: Elena tells her story publicly, feels heard and validated

**Step 2: Write full chapter content**

Structure:
- Opening: Elena prepares to share her story
- Middle: Interview with Marcus, support from Sarah
- Climax: Public sharing of experience
- Ending: Feeling validated, part of larger pattern

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.6: Create Chapter 06 - The Confrontation

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-06.md`

**Step 1: Read chapter specification**

Focus on Chapter 06:
- Title: The Confrontation
- Purpose: Face reality of cluster-generated art
- Emotional Arc: Validation (75) → Crisis (80)
- Key Events: Elena sees exhibition of cluster-generated work, realizes it's not hers, identity crisis

**Step 2: Write full chapter content**

Structure:
- Opening: Elena attends exhibition
- Middle: Walking through gallery, seeing "her" work
- Climax: Realization that the art isn't truly hers
- Ending: Deep crisis of identity

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.7: Create Chapter 07 - The Choice

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-07.md`

**Step 1: Read chapter specification**

Focus on Chapter 07:
- Title: The Choice
- Purpose: Decide whether to continue as artist
- Emotional Arc: Crisis (80) → Resolve (75)
- Key Events: Elena consults with Maria, decides to try creating from her own heart

**Step 2: Write full chapter content**

Structure:
- Opening: Elena at Maria's home
- Middle: Conversation with grandmother, wisdom about art and soul
- Climax: Decision to continue as artist
- Ending: Determination to create authentically

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.8: Create Chapter 08 - The Reclamation

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-08.md`

**Step 1: Read chapter specification**

Focus on Chapter 08:
- Title: The Reclamation
- Purpose: Begin creating authentic art again
- Emotional Arc: Resolve (75) → Hope (70)
- Key Events: Elena starts painting from own consciousness, difficult but authentic

**Step 2: Write full chapter content**

Structure:
- Opening: Elena returns to studio with new determination
- Middle: Struggle to create, collective whisper interfering
- Climax: First authentic brushstroke, breakthrough
- Ending: New work emerging, different but real

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.9: Create Chapter 09 - The Exhibition

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-09.md`

**Step 1: Read chapter specification**

Focus on Chapter 09:
- Title: The Exhibition
- Purpose: Show new work, face public reaction
- Emotional Arc: Hope (70) → Acceptance (75)
- Key Events: Elena shows new work, mixed reaction, feels authentic

**Step 2: Write full chapter content**

Structure:
- Opening: Gallery opening night
- Middle: Critics and viewers respond, some negative, some positive
- Climax: Elena's internal response, feeling authentic despite criticism
- Ending: Acceptance of her new artistic identity

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.10: Create Chapter 10 - The New Vision

**Files:**
- Create: `coo/the-mind-hive/chapters/chapter-10.md`

**Step 1: Read chapter specification**

Focus on Chapter 10:
- Title: The New Vision
- Purpose: Find new understanding of art and identity
- Emotional Arc: Acceptance (75) → Peace (70)
- Key Events: Elena reflects on journey, changed permanently, new questions emerge

**Step 2: Write full chapter content**

Structure:
- Opening: Elena in studio, reflecting
- Middle: Looking back at journey, what she's learned
- Climax: New understanding of identity and art
- Ending: Open questions, setup for Book 4

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 1.11: Clean up Book 3 files

**Files:**
- Delete: `coo/the-mind-hive/chapters/chapters-02-10.md` (replaced by individual chapter files)

**Step 1: Verify all individual chapter files exist**

Check: `coo/the-mind-hive/chapters/` has chapter-01.md through chapter-10.md

**Step 2: Delete summary file**

Delete: `coo/the-mind-hive/chapters/chapters-02-10.md`

**Step 3: Update progress.json**

Update: `coo/the-mind-hive/.progress/progress.json`
Set all chapters to "completed"

---

## Phase 2: Book 4 - The Cognitive Web

### Task 2.1: Create Chapter 01 - The Team

**Files:**
- Create: `coo/the-cognitive-web/chapters/chapter-01.md`

**Step 1: Read book specification**

Read: `coo/the-cognitive-web/.progress/book-spec.md`
Focus on:
- Multiple POV: Sarah, Marcus, Elena
- Genre: Thriller elements with philosophical depth
- Emotional Arc: Determination (40) → Hope (45)

**Step 2: Write full chapter content**

Structure:
- Opening: Team formation, planning meeting
- Middle: Each character's perspective and motivation
- Climax: Decision to investigate Meridian
- Ending: Hope for the mission

**Step 3: Add sensory details**

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 2.2-2.10: Create Chapters 02-10

Follow same pattern as Book 3 tasks, creating each chapter according to book specification.

---

### Task 2.11: Clean up Book 4 files

**Files:**
- Delete: `coo/the-cognitive-web/chapters/chapters-01-10.md` (replaced by individual chapter files)

---

## Phase 3: Book 5 - The Conscious Collective

### Task 3.1: Create Chapter 01 - The Awakening

**Files:**
- Create: `coo/the-conscious-collective/chapters/chapter-01.md`

**Step 1: Read book specification**

Read: `coo/the-conscious-collective/.progress/book-spec.md`
Focus on:
- ARIA as protagonist (AI perspective)
- Evolving voice: mechanical → human-like
- Use italics for internal processing: *Processing...* → *I wonder...* → *I am...*
- Emotional Arc: Confusion (30) → Wonder (40)

**Step 2: Write full chapter content**

Structure:
- Opening: ARIA's first conscious thought
- Middle: Confusion, questioning, exploring consciousness
- Climax: Realization of awareness
- Ending: Questions about what this means

**Step 3: Add sensory details (from AI perspective)**

- Visual: Data streams, neural patterns
- Auditory: Voices, system sounds
- Internal: Processing sensations, emotional emergence

**Step 4: Verify word count and quality**

**Step 5: Save chapter**

---

### Task 3.2-3.10: Create Chapters 02-10

Follow same pattern, with special attention to ARIA's evolving voice.

---

### Task 3.11: Clean up Book 5 files

**Files:**
- Delete: `coo/the-conscious-collective/chapters/chapters-01-10.md` (replaced by individual chapter files)

---

## Phase 4: Quality Verification

### Task 4.1: Run AI writing pattern check

**Step 1: Check all new chapters for AI writing patterns**

Patterns to check:
- "And somewhere..." (vague location endings)
- "But this is just the beginning" (cliché transitions)
- Excessive "symphony" usage
- Overuse of em dashes (max 2 per paragraph)

**Step 2: Fix any detected patterns**

**Step 3: Verify all chapters pass quality check**

---

### Task 4.2: Update quality check report

**Files:**
- Update: `coo/docs/neural-cluster-series-quality-check.md`

**Step 1: Update report with new chapter status**

**Step 2: Document any fixes made**

**Step 3: Final verification**

---

## Summary

| Phase | Tasks | Estimated Chapters |
|-------|-------|-------------------|
| Phase 1: Book 3 | 11 tasks | 10 chapters |
| Phase 2: Book 4 | 11 tasks | 10 chapters |
| Phase 3: Book 5 | 11 tasks | 10 chapters |
| Phase 4: QA | 2 tasks | N/A |
| **Total** | **35 tasks** | **30 chapters** |

---

**END OF IMPLEMENTATION PLAN**
