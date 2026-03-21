# 预设书籍制作指导文档

> 基于 the-silicon-sorcerer 项目经验总结

---

## 目录

1. [制作流程](#制作流程)
2. [质量要求](#质量要求)
3. [SEO要求](#seo要求)
4. [文件结构规范](#文件结构规范)
5. [检查清单](#检查清单)

---

## 制作流程

### 阶段一：项目初始化

#### 步骤 1.1：创建项目目录结构

**操作内容：**
```
coo/[book-name]/
├── chapters/
│   ├── chapter-01.md
│   ├── chapter-02.md
│   └── ... (chapter-10.md)
└── .progress/
    ├── progress.json
    ├── book-spec.md
    ├── seo-meta.md
    └── chapter-specs/
        ├── chapter-01-spec.md
        └── ... (chapter-10-spec.md)
```

**产出要求：**
- 创建完整的目录结构
- 确保所有必要的文件夹存在

---

#### 步骤 1.2：创建进度追踪文件

**文件：** `.progress/progress.json`

**模板：**
```json
{
  "book": "[book-name]",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "chapters": {}
}
```

**产出要求：**
- JSON格式正确
- 包含所有必要字段

---

### 阶段二：书籍规格设计

> ⚠️ **强制要求**：书籍规格文档必须使用**全英文**。请使用下面的英文模板创建规格文档。

#### 步骤 2.1：创建书籍规格文档

**文件：** `.progress/book-spec.md`

> 📌 **完整模板文件位置**：`coo/.templates/book-spec-template.md`

**必须包含的章节（英文模板）：**

```markdown
# Book Specification: [Book Title]

> **Template Version**: 1.0
> **Last Updated**: 2026-03-20
> **Language**: English (US)

---

## 1. Basic Information

| Field | Value |
|-------|-------|
| **Title** | [Full book title] |
| **Genre** | [Primary genre / Secondary genre] |
| **Target Readers** | [Demographics: age, interests, reading level] |
| **Core Themes** | [2-3 main themes, comma-separated] |
| **Word Count Target** | [Approximate total word count] |
| **Chapter Count** | [Number of chapters] |

---

## 2. Narrative Style

### 2.1 Perspective
- **Point of View**: [First-person / Third-person limited / Third-person omniscient]
- **POV Character(s)**: [Main perspective character(s)]
- **POV Consistency**: [Single / Multiple / Shifting]

### 2.2 Narrative Structure
- **Dual Structure**: [Yes / No]
- **If Yes - Structure Type**: [Reality line + Inner line / Past + Present / Other]
- **Interweaving Method**: [How the two lines connect and transition]

### 2.3 Language Style
- **Overall Tone**: [Descriptive adjectives: e.g., "contemporary, accessible prose with philosophical elements"]
- **Sentence Characteristics**: [Length, complexity, rhythm patterns]
- **Vocabulary Level**: [Simple / Moderate / Complex / Mixed]
- **Unique Stylistic Elements**: [Specific techniques that define this book's voice]

### 2.4 Distinctive Features
- **What Makes This Book Unique**: [1-2 sentences on unique selling point]
- **Comparative Titles**: [Similar books in style or theme]

---

## 3. Emotional Tone (Quantified)

### 3.1 Overall Atmosphere
**Primary Emotions**: [List 3-5 dominant emotions throughout the book]

### 3.2 Emotional Arc
```
Chapter Distribution:
Chapters 1-3: [Initial emotional state]
Chapters 4-6: [Developing emotional state]
Chapters 7-8: [Intensifying emotional state]
Chapters 9-10: [Climax and resolution emotional state]
```

### 3.3 Emotional Pacing
| Phase | Chapters | Pacing | Description |
|-------|----------|--------|-------------|
| Setup | 1-2 | [Slow/Medium/Fast] | [Description] |
| Rising | 3-5 | [Slow/Medium/Fast] | [Description] |
| Climax | 6-8 | [Slow/Medium/Fast] | [Description] |
| Resolution | 9-10 | [Slow/Medium/Fast] | [Description] |

---

## 4. Character Voices (Detailed)

### 4.1 Protagonist

#### [Character Name]
| Attribute | Description |
|-----------|-------------|
| **Occupation** | [Job/Role] |
| **Age** | [Age range] |
| **Speaking Style** | [Formal/Informal, vocabulary level, speech patterns] |
| **Word Choice** | [High-frequency words, signature phrases] |
| **Sentence Patterns** | [Short/Long, fragmented/complete, questions/statements ratio] |
| **Personality Traits** | [3-5 core traits] |
| **Inner Monologue Style** | [How they think: analytical, emotional, fragmented, etc.] |
| **Unique Expressions** | [Specific phrases or speech habits unique to this character] |
| **Speech Quirks** | [Stutters, pauses, fillers, accent markers] |

### 4.2 Supporting Characters

#### [Character Name]
[Same structure as protagonist]

#### [Character Name]
[Same structure as protagonist]

### 4.3 Antagonist (if applicable)

#### [Character Name]
[Same structure, plus:]
- **Motivation**: [What drives their opposition]
- **Conflict Style**: [How they create conflict]

---

## 5. Thematic Depth

### 5.1 Core Themes
1. **[Theme 1]**: [Brief description]
2. **[Theme 2]**: [Brief description]
3. **[Theme 3]**: [Brief description, if applicable]

### 5.2 Philosophical Exploration
| Question | Exploration Approach |
|----------|---------------------|
| [Question 1] | [How the book explores this] |
| [Question 2] | [How the book explores this] |
| [Question 3] | [How the book explores this] |

### 5.3 Real-World Metaphors
| Book Element | Real-World Parallel |
|--------------|---------------------|
| [Element 1] | [What it represents] |
| [Element 2] | [What it represents] |
| [Element 3] | [What it represents] |

---

## 6. World Building

### 6.1 Setting
| Aspect | Details |
|--------|---------|
| **Time Period** | [Era/Year/General timeframe] |
| **Primary Location** | [City/Region/World] |
| **Environment** | [Urban/Rural/Space/Virtual/etc.] |
| **Social Context** | [Relevant social/political climate] |

### 6.2 Technology/Society (if applicable)
- **Key Technologies**: [List relevant technologies]
- **Social Structure**: [Class system, organizations, power dynamics]
- **Cultural Norms**: [What is considered normal in this world]

### 6.3 World Rules
1. **[Rule 1]**: [Description and implications]
2. **[Rule 2]**: [Description and implications]
3. **[Rule 3]**: [Description and implications]

---

## 7. Sensory Detail Requirements (Quantified)

### 7.1 Required Sensory Types
Each chapter MUST include sensory details from at least **3 different categories**:

| Sense | Specific Types | Example |
|-------|---------------|---------|
| **Visual** | [Colors, light, shadows, shapes, movements] | "The screen glowed blue-white in the dark room" |
| **Auditory** | [Volume, pitch, rhythm, source, quality] | "The fan whirred in irregular bursts" |
| **Tactile** | [Temperature, texture, pressure, pain, pleasure] | "The keyboard keys felt sticky with use" |
| **Olfactory** | [Scents, smells, memory associations] | "The air carried stale coffee and ozone" |
| **Gustatory** | [Tastes, textures, aftertastes] | "The coffee tasted burnt, like old regrets" |
| **Internal** | [Physical sensations: heartbeat, breathing, tension] | "His chest tightened with each notification" |

### 7.2 Quantified Standards
- **Minimum per chapter**: 5 sensory details
- **Minimum categories per chapter**: 3
- **Distribution target**: Visual (40%), Others (60% combined)

### 7.3 Sensory Detail Functions
Each sensory detail should serve one or more functions:
- [ ] Establish atmosphere
- [ ] Reveal character state
- [ ] Advance plot
- [ ] Create contrast (virtual vs. real, past vs. present)
- [ ] Trigger memory

---

## 8. Emotional Depth Design (Three-Layer Model)

Every significant emotional moment must include all three layers:

### 8.1 Layer Structure
| Layer | Name | Content | Example |
|-------|------|---------|---------|
| **Layer 1** | Surface Reaction | External behavior, visible actions | "He closed the laptop" |
| **Layer 2** | Internal Activity | Thought process, inner dialogue | "*Another day wasted. But what else is there?*" |
| **Layer 3** | Deep Motivation | Underlying fears, desires, beliefs | "Fear of the silence that comes when the noise stops" |

### 8.2 Implementation Checklist
For each emotional beat:
- [ ] Layer 1 is clearly shown (not told)
- [ ] Layer 2 reveals unique character voice
- [ ] Layer 3 connects to character arc or theme
- [ ] All three layers are distinct but connected

---

## 9. Prohibited Elements (Explicit List)

### 9.1 AI Writing Patterns (STRICTLY FORBIDDEN)
These phrases and patterns must be completely eliminated:

| Pattern | Example | Replacement Strategy |
|---------|---------|---------------------|
| Vague location endings | "And somewhere..." | Specific location: "In the server room three floors below..." |
| Omniscient foreshadowing | "Neither of them knew..." | Character's intuition: "She felt a chill but couldn't say why..." |
| Cliché transitions | "will never be the same" | Specific change: "The notification tone sounded different after that" |
| False beginnings | "just the beginning" | Concrete continuation: "Three more messages arrived before noon" |
| Rule of Three | "It was X, it was Y, it was Z" | Varied structure with specific details |
| Abstract emotions | "He felt sad" | Physical manifestation: "His shoulders dropped. He didn't reach for his coffee." |
| Template dialogue | "What do you mean?" / "You know what I mean" | Subtext-rich alternatives |
| Repetitive structures | Similar sentence openings | Varied rhythm and structure |
| Overused conjunctions | "Moreover", "Furthermore", "In addition" | Direct connection or implication |
| Generic descriptions | "The room was nice" | Specific, character-relevant details |

### 9.2 Narrative Prohibitions
- [ ] Simple moral preaching (show complexity instead)
- [ ] Excessive technical descriptions (maintain accessibility)
- [ ] Protagonist suddenly "awakening" to solve problems (gradual growth only)
- [ ] Giving readers simple answers (leave room for interpretation)
- [ ] Deus ex machina resolutions
- [ ] Perfect character consistency (allow realistic contradictions)

### 9.3 Dialogue Prohibitions
- [ ] Direct statement of emotions ("I feel sad about...")
- [ ] Over-explanation ("The reason I'm doing this is...")
- [ ] Perfect responses (characters always say the right thing)
- [ ] Uninterrupted speeches (use action beats, interruptions)
- [ ] Immediate understanding (characters should misunderstand each other)

---

## 10. Chapter Outline

### 10.1 Chapter Summary Table
| Chapter | Title | Purpose | Emotional Arc | Key Events |
|---------|-------|---------|---------------|------------|
| 01 | [Title] | [Purpose] | [Arc] | [Events] |
| 02 | [Title] | [Purpose] | [Arc] | [Events] |
| 03 | [Title] | [Purpose] | [Arc] | [Events] |
| 04 | [Title] | [Purpose] | [Arc] | [Events] |
| 05 | [Title] | [Purpose] | [Arc] | [Events] |
| 06 | [Title] | [Purpose] | [Arc] | [Events] |
| 07 | [Title] | [Purpose] | [Arc] | [Events] |
| 08 | [Title] | [Purpose] | [Arc] | [Events] |
| 09 | [Title] | [Purpose] | [Arc] | [Events] |
| 10 | [Title] | [Purpose] | [Arc] | [Events] |

### 10.2 Chapter Connection Map
```
[Visual representation of how chapters connect]
Chapter 1 → Chapter 2: [Connection type]
Chapter 2 → Chapter 3: [Connection type]
...
```

---

## 11. Open Ending Design (Chapter 10)

### 11.1 Unresolved Questions
1. [Question that remains unanswered]
2. [Question that remains unanswered]
3. [Question that remains unanswered]

### 11.2 New Suspense
- [New conflict or tension introduced]
- [Implication for future]

### 11.3 Character Final State
- **Protagonist**: [Final emotional/psychological state]
- **Key Relationship**: [Final state of important relationship]

### 11.4 Reader Engagement
- **Questions for Reader**: [What should readers ponder?]
- **Emotional Resonance**: [What feeling should linger?]
- **Thematic Echo**: [How does the ending reflect themes?]

---

## 12. Quality Check Standards (Actionable)

### 12.1 Pre-Writing Checklist
- [ ] All character voices defined with specific examples
- [ ] Emotional arc quantified with numerical values
- [ ] Sensory requirements specified per chapter
- [ ] All prohibited elements listed for reference
- [ ] Chapter purposes align with overall arc

### 12.2 Per-Chapter Verification
Each chapter must pass:

| Check | Criteria | Verification Method |
|-------|----------|---------------------|
| AI Trace Detection | 0 template phrases | Automated scan + manual review |
| Sensory Detail Count | ≥5 details, ≥3 types | Checklist count |
| Emotional Depth | All 3 layers present | Layer identification |
| Character Voice | Consistent and unique | Comparison with character spec |
| Narrative Style | Matches book definition | Style consistency check |
| Chapter Connection | Natural flow from/to adjacent | Transition review |
| Dual Structure | Both lines present (if applicable) | Line identification |
| Ending Quality | Matches ending type spec | Ending evaluation |

### 12.3 Final Quality Gates
- [ ] All chapters pass individual checks
- [ ] Overall emotional arc is coherent
- [ ] Theme development is consistent
- [ ] Character growth is believable
- [ ] No plot holes or inconsistencies
- [ ] Sensory details create immersive experience
- [ ] Dialogue reveals character and advances plot
- [ ] Ending satisfies while leaving appropriate questions

---

## 13. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-03-20 | Initial template creation | AI Assistant |

---

**END OF BOOK SPECIFICATION TEMPLATE**
```

**产出要求：**
- 完整的书籍规格文档（**全英文**）
- 所有章节填写完整
- 角色声音独特且可区分

---

#### 步骤 2.2：创建章节规格文档

> ⚠️ **强制要求**：章节规格文档必须使用**全英文**。请使用下面的英文模板创建规格文档。

**文件：** `.progress/chapter-specs/chapter-XX-spec.md`

> 📌 **完整模板文件位置**：`coo/.templates/chapter-spec-template.md`

**必须包含的章节（英文模板）：**

```markdown
# Chapter [XX] Specification: [Chapter Title]

> **Template Version**: 1.0
> **Book**: [Book Title]
> **Chapter Number**: [XX of 10]
> **Target Word Count**: [XXXX words]

---

## 1. Chapter Positioning

### 1.1 Position in Book
- **Overall Location**: [Opening/Setup/Rising Action/Climax/Falling Action/Resolution]
- **Narrative Function**: [What this chapter accomplishes for the story]
- **Relationship to Previous Chapter**: [How it continues from Chapter XX-1]
- **Relationship to Next Chapter**: [How it sets up Chapter XX+1]

### 1.2 Chapter Purpose
**Primary Objective**: [Main goal of this chapter]

**Secondary Objectives**:
- [Objective 1]
- [Objective 2]
- [Objective 3]

### 1.3 Key Questions Answered/Raised
- **Answered**: [What questions from previous chapters are resolved]
- **Raised**: [What new questions does this chapter pose]

---

## 2. Emotional Arc (Quantified)

### 2.1 Emotional Curve Data

| Position | Intensity (0-100) | Emotion Type | Trigger Event | Narrative Purpose |
|----------|-------------------|--------------|---------------|-------------------|
| 0% (Opening) | [20] | [Calm/Tense/Excited] | [Opening scene] | [Hook reader] |
| 10% | [XX] | [Emotion] | [Event] | [Purpose] |
| 25% | [40] | [Emotion] | [Event] | [Purpose] |
| 50% | [70] | [Emotion] | [Turning point] | [Purpose] |
| 75% | [50] | [Emotion] | [Event] | [Purpose] |
| 90% | [85] | [Emotion] | [Event] | [Purpose] |
| 100% (Ending) | [XX] | [Emotion] | [Cliffhanger] | [Purpose] |

### 2.2 Emotional Curve Visualization
```
Intensity
100 |                                      Peak
 90 |                                   /
 80 |                                /
 70 |                    Turning Point
 60 |                  /
 50 |               /              \
 40 |            /                    \
 30 |         /                        \
 20 |    Opening                        \
 10 |                                    \
  0 |_____________________________________\____
     0%   25%   50%   75%   100%
```

### 2.3 Emotional Beats Breakdown

#### Beat 1: [Name] (Position: 0-15%)
- **Trigger**: [What causes this emotion]
- **Surface Reaction**: [Observable behavior]
- **Internal Process**: [Character's thoughts]
- **Deep Motivation**: [Why they feel this way]
- **Sensory Anchor**: [Physical sensation associated]

#### Beat 2: [Name] (Position: 15-35%)
[Same structure]

#### Beat 3: [Name] (Position: 35-55%)
[Same structure]

#### Beat 4: [Name] (Position: 55-75%)
[Same structure]

#### Beat 5: [Name] (Position: 75-100%)
[Same structure]

---

## 3. Core Events (Specific List)

### 3.1 Event Summary
| # | Event | Location | Characters | Emotional Impact | Plot Function |
|---|-------|----------|------------|------------------|---------------|
| 1 | [Event 1] | [Where] | [Who] | [Emotion] | [Function] |
| 2 | [Event 2] | [Where] | [Who] | [Emotion] | [Function] |
| 3 | [Event 3] | [Where] | [Who] | [Emotion] | [Function] |

### 3.2 Event Descriptions

#### Event 1: [Event Name]
- **Description**: [Detailed description of what happens]
- **Setup**: [What leads to this event]
- **Execution**: [How it unfolds]
- **Consequence**: [Immediate result]
- **Connection to Theme**: [How this reflects book themes]

#### Event 2: [Event Name]
[Same structure]

#### Event 3: [Event Name]
[Same structure]

---

## 4. Scene Breakdown

### 4.1 Scene List
| Scene | Location | Characters | Word Count | Purpose | Emotional Tone |
|-------|----------|------------|------------|---------|----------------|
| 1 | [Where] | [Who] | [XXX] | [Purpose] | [Tone] |
| 2 | [Where] | [Who] | [XXX] | [Purpose] | [Tone] |
| 3 | [Where] | [Who] | [XXX] | [Purpose] | [Tone] |

### 4.2 Scene Specifications

#### Scene 1: [Scene Name]

**Basic Information**
- **Location**: [Specific place]
- **Time**: [When this occurs]
- **Characters Present**: [List all characters]
- **Atmosphere**: [Mood and tone]

**Narrative Function**
- **Purpose**: [What this scene accomplishes]
- **Information Revealed**: [What reader learns]
- **Character Development**: [How characters grow/change]
- **Plot Advancement**: [How story moves forward]

**Sensory Details Required**
| Sense | Specific Detail | Location in Scene | Emotional Function |
|-------|----------------|-------------------|-------------------|
| Visual | [Specific] | [Paragraph] | [Function] |
| Auditory | [Specific] | [Paragraph] | [Function] |
| Tactile | [Specific] | [Paragraph] | [Function] |
| Olfactory | [Specific] | [Paragraph] | [Function] |
| Gustatory | [Specific] | [Paragraph] | [Function] |

**Emotional Beat**
- **Position on Curve**: [X%]
- **Primary Emotion**: [Emotion]
- **Intensity**: [Level]
- **Three Layers**:
  - Surface: [Observable behavior]
  - Internal: [Thoughts/feelings]
  - Deep: [Underlying motivation]

**Opening Hook (First 3 sentences)**
[Write the exact opening or detailed description of what it must accomplish]

**Ending Transition (Last 3 sentences)**
[Write the exact ending or detailed description of what it must accomplish]

#### Scene 2: [Scene Name]
[Same structure]

#### Scene 3: [Scene Name]
[Same structure]

---

## 5. Character Development

### 5.1 Protagonist: [Character Name]

**External Actions**
- **Primary Action**: [Main thing they do]
- **Secondary Actions**: [Other significant actions]
- **Decision Points**: [Key choices made]

**Internal Journey**
- **Internal Conflict**: [What they struggle with internally]
- **Realization/Moment of Clarity**: [Any insights gained]
- **Emotional Change**: [How emotions shift]
- **Psychological Shift**: [How thinking changes]

**Character Growth**
- **Starting State**: [Who they are at chapter beginning]
- **Ending State**: [Who they are at chapter end]
- **Growth Metric**: [Measurable change]

**Key Decision**
- **Decision**: [What they decide]
- **Options Considered**: [Alternatives weighed]
- **Decision Process**: [How they reach conclusion]
- **Consequences Accepted**: [What they accept will happen]

### 5.2 Supporting Character: [Character Name]
[Same structure, adjusted for role]

### 5.3 Antagonist/Opposition: [Character Name]
[Same structure, focused on conflict creation]

---

## 6. Dialogue Design

### 6.1 Dialogue Segments

| Segment | Speakers | Subtext | Emotional State | Power Dynamic | Forbidden Phrases |
|---------|----------|---------|-----------------|---------------|-------------------|
| 1 | A, B | [What's really being said] | [Emotions] | [Who has power] | [List] |
| 2 | A, C | [Subtext] | [Emotions] | [Power] | [List] |
| 3 | B, C | [Subtext] | [Emotions] | [Power] | [List] |

### 6.2 Dialogue Segment Specifications

#### Segment 1: [Context/Topic]

**Participants**: [Character A], [Character B]

**Surface Content**: [What they appear to be discussing]

**Subtext**: [What they're really talking about]

**Emotional Undercurrent**:
- Character A: [Emotion, why]
- Character B: [Emotion, why]

**Power Dynamics**: [Who has upper hand and how it shifts]

**Dialogue Beats**:
1. [Opening line and purpose]
2. [Response and shift]
3. [Turning point]
4. [Climax of exchange]
5. [Resolution or cliffhanger]

**Action Beats Required**: [Physical actions interspersed]

**What Must Be Revealed**: [Information conveyed]

**What Must Be Concealed**: [Information hidden or avoided]

**Forbidden Expressions**:
- [ ] "What do you mean?"
- [ ] "You know what I mean"
- [ ] Direct emotion statements ("I feel...")
- [ ] Over-explanation
- [ ] Perfect responses

#### Segment 2: [Context/Topic]
[Same structure]

### 6.3 Dialogue Quality Checklist
- [ ] Each speaker has distinct voice
- [ ] Subtext is present in every exchange
- [ ] Action beats break up dialogue
- [ ] Misunderstandings occur naturally
- [ ] Interruptions and pauses feel real
- [ ] No AI template phrases
- [ ] Reveals character and advances plot

---

## 7. Sensory Details Checklist (Required)

### 7.1 Mandatory Sensory Details

| Type | Specific Description | Scene | Paragraph | Emotional Function | Status |
|------|---------------------|-------|-----------|-------------------|--------|
| Visual | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |
| Visual | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |
| Auditory | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |
| Tactile | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |
| Olfactory | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |
| Gustatory | [Specific detail] | [Scene #] | [Approx] | [Function] | [ ] |

**Requirement**: Minimum 5 sensory details, covering at least 3 types

### 7.2 Sensory Detail Functions
Each detail must serve at least one function:
- [ ] Establish atmosphere/mood
- [ ] Reveal character's internal state
- [ ] Advance plot or foreshadow
- [ ] Create contrast (virtual/real, past/present)
- [ ] Trigger memory or association
- [ ] Ground reader in physical reality

### 7.3 Sensory Distribution
- **Visual**: [X] details (target: 40%)
- **Auditory**: [X] details
- **Tactile**: [X] details
- **Olfactory**: [X] details
- **Gustatory**: [X] details
- **Internal**: [X] details

---

## 8. Key Paragraph Specifications

### 8.1 Opening (First 200 Words)

**Opening Type**: [Hook type: Action/Dialogue/Description/Internal/Question]

**Required Elements**:
- [ ] Immediate hook (first sentence grabs attention)
- [ ] Scene establishment (where/when)
- [ ] Character state (emotional/psychological)
- [ ] Forward momentum (sense of movement)

**Forbidden in Opening**:
- [ ] Exposition dumps
- [ ] Abstract descriptions
- [ ] "It was a [adjective] day..."
- [ ] "Once upon a time..." variants
- [ ] Waking up (unless exceptional)
- [ ] Looking in mirror (unless exceptional)

**Opening Paragraph Draft**:
```
[Write the opening paragraph or detailed specification]
```

### 8.2 Ending (Last 200 Words)

**Ending Type**: [Suspense/Emotional/Discovery/Decision/Imagery/Question]

**Ending Function**:
- [ ] Creates forward momentum
- [ ] Raises new questions or deepens existing ones
- [ ] Emotional resonance
- [ ] Connects to theme

**Ending Structure**:
1. [Final event/image/realization]
2. [Character reaction/state]
3. [Closing hook/cliffhanger]

**Forbidden in Ending**:
- [ ] "And somewhere..."
- [ ] "Neither of them knew..."
- [ ] "will never be the same"
- [ ] "just the beginning"
- [ ] Perfect resolution (unless final chapter)
- [ ] Moral summary

**Ending Paragraph Draft**:
```
[Write the ending paragraph or detailed specification]
```

---

## 9. Thematic Integration

### 9.1 Theme Presence
| Theme | How Expressed | Scene | Evidence Required |
|-------|--------------|-------|-------------------|
| [Theme 1] | [Method] | [Scene] | [Specific element] |
| [Theme 2] | [Method] | [Scene] | [Specific element] |

### 9.2 Symbolic Elements
| Symbol | Appearance | Meaning | Scene |
|--------|-----------|---------|-------|
| [Symbol 1] | [How it appears] | [What it represents] | [Where] |
| [Symbol 2] | [How it appears] | [What it represents] | [Where] |

### 9.3 Motif Recurrence
| Motif | This Chapter | Pattern | Significance |
|-------|-------------|---------|--------------|
| [Motif 1] | [Appearance] | [Pattern] | [Meaning] |

---

## 10. Technical Requirements

### 10.1 Style Consistency
- [ ] Matches book's narrative perspective
- [ ] Maintains consistent tense
- [ ] Character voices are distinct
- [ ] Sentence rhythm varies appropriately
- [ ] No AI writing patterns

### 10.2 Structural Requirements
- [ ] Scene transitions are smooth
- [ ] Time jumps are clear
- [ ] POV shifts (if any) are signaled
- [ ] Chapter has clear beginning, middle, end

### 10.3 Length Requirements
- **Target Word Count**: [XXXX words]
- **Minimum**: [XXXX - 10%]
- **Maximum**: [XXXX + 10%]
- **Scene Distribution**: [Scene 1: XX%, Scene 2: XX%, etc.]

---

## 11. Quality Verification Checklist

### 11.1 Pre-Writing Verification
- [ ] Emotional arc is quantified and achievable
- [ ] All scenes have clear purposes
- [ ] Sensory details are specified
- [ ] Character development is mapped
- [ ] Dialogue has subtext planned
- [ ] Opening and ending are specified

### 11.2 Post-Writing Verification
- [ ] Emotional curve matches specification
- [ ] All required scenes are present
- [ ] Sensory detail count ≥5, types ≥3
- [ ] Zero AI template phrases detected
- [ ] Dialogue has subtext in every exchange
- [ ] Character has clear internal conflict
- [ ] Ending matches specified type
- [ ] Word count within target range
- [ ] Three-layer emotional depth present
- [ ] Theme integration is clear
- [ ] Opening hooks effectively
- [ ] Ending creates forward momentum
- [ ] Transitions to adjacent chapters are smooth
- [ ] No prohibited elements present

### 11.3 Final Review Questions
1. Does this chapter earn its place in the book?
2. Does the protagonist change or reveal something new?
3. Are the sensory details specific and evocative?
4. Is the emotional journey clear and earned?
5. Does the ending make the reader want to continue?
6. Are there any AI writing pattern traces?
7. Is the dialogue natural and revealing?
8. Does this advance the plot and/or deepen character?

---

## 12. Notes and References

### 12.1 Connections to Other Chapters
- **Callback to**: [Chapter XX - specific element]
- **Setup for**: [Chapter XX - what this prepares]
- **Parallel with**: [Chapter XX - thematic or structural parallel]

### 12.2 Research Notes
- [Any research needed for this chapter]
- [Technical details to verify]
- [Cultural references to check]

### 12.3 Revision Notes
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-03-20 | Initial specification | AI Assistant |

---

**END OF CHAPTER SPECIFICATION TEMPLATE**
```

**产出要求：**
- 每章都有独立的规格文档（**全英文**）
- 规格文档与书籍规格一致
- 章节之间的衔接清晰

---

### 阶段三：章节内容创作

> ⚠️ **强制要求**：章节内容必须使用**全英文**创作。这是最终产品，面向读者。

#### 步骤 3.1：创作章节内容

**文件：** `chapters/chapter-XX.md`

**创作要求：**

1. **遵循章节规格**（英文）
   - 核心事件必须覆盖
   - 情绪曲线必须匹配
   - 角色状态必须一致

2. **感官细节**（英文描写）
   - 每章至少包含 3 类感官细节
   - 每类至少 1 个具体描写
   - 避免抽象描述

3. **情感深度**（英文表达）
   - 每个情感节点包含三层
   - 表面反应 → 内心活动 → 深层动机
   - 情感变化自然流畅

4. **角色声音**（英文对话）
   - 每个角色有独特的说话方式
   - 对话符合角色性格
   - 内心独白风格一致

5. **叙事风格**（英文写作）
   - 视角一致
   - 语言风格统一
   - 句式变化丰富

**产出要求：**
- 完整的章节内容（**全英文**，建议 2000-2500 字/章）
- 符合所有质量要求
- 通过所有检查点

---

#### 步骤 3.2：更新进度追踪

**操作：** 更新 `.progress/progress.json`

```json
{
  "book": "[book-name]",
  "status": "in_progress",
  "current_chapter": [X],
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "chapters": {
    "1": {
      "status": "completed",
      "completed_at": "[YYYY-MM-DD]",
      "quality_check": "passed"
    },
    "2": {
      "status": "in_progress",
      "started_at": "[YYYY-MM-DD]"
    }
  }
}
```

**产出要求：**
- 每完成一章更新一次
- 记录完成时间和质量检查结果

---

### 阶段四：SEO优化

#### 步骤 4.1：创建SEO元数据

**文件：** `.progress/seo-meta.md`

**必须包含的章节：**

```markdown
# SEO Metadata: [Book Name]

## Book-Level SEO

### Primary Keywords
- [keyword 1] - AI哲学相关
- [keyword 2] - 意识/身份相关
- [keyword 3] - 伦理相关
- [keyword 4] - 核心主题相关
- [keyword 5] - 目标读者相关

### Secondary Keywords
- [keyword 1]
- [keyword 2]
- [keyword 3]
- [keyword 4]
- [keyword 5]
- [keyword 6]
- [keyword 7]

### Long-tail Keywords
- [long-tail keyword 1]
- [long-tail keyword 2]
- [long-tail keyword 3]
- [long-tail keyword 4]

### Meta Title (60 chars max)
[Title] | [Subtitle]

### Meta Description (160 chars max)
[Description that includes primary keywords and hooks readers]

### Philosophical Themes
- **[Theme 1]**: [Description]
- **[Theme 2]**: [Description]
- **[Theme 3]**: [Description]
- **[Theme 4]**: [Description]
- **[Theme 5]**: [Description]

### Categories
- [Category 1]
- [Category 2]
- [Category 3]
- [Category 4]
- [Category 5]

### Target Audience
- [Audience 1]
- [Audience 2]
- [Audience 3]
- [Audience 4]

---

## Chapter-Level SEO

### Chapter 1: [Chapter Title]

**Keywords:**
- [keyword 1]
- [keyword 2]
- [keyword 3]
- [keyword 4]
- [keyword 5]

**Meta Title:**
Chapter 1: [Title] - [Hook]

**Meta Description:**
[Description that summarizes chapter and includes keywords]

**Summary for SEO:**
[2-3 sentence summary of chapter content]

---

[Repeat for all 10 chapters]

---

## Schema.org Structured Data

\```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "[Book Name]",
  "description": "[Description]",
  "genre": ["[Genre 1]", "[Genre 2]", "[Genre 3]"],
  "bookFormat": "EBook",
  "numberOfPages": "10 chapters",
  "inLanguage": "English",
  "about": [
    {"@type": "Thing", "name": "[Theme 1]"},
    {"@type": "Thing", "name": "[Theme 2]"},
    {"@type": "Thing", "name": "[Theme 3]"},
    {"@type": "Thing", "name": "[Theme 4]"}
  ]
}
\```

## Social Media Tags

### Open Graph
\```
og:title: [Book Name] - [Subtitle]
og:description: [Description]
og:type: book
\```

### Twitter Card
\```
twitter:card: summary_large_image
twitter:title: [Book Name] | [Category]
twitter:description: [Description]
\```
```

**产出要求：**
- 完整的SEO元数据文档
- 每章都有独立的SEO信息
- 关键词突出AI哲学主题

---

### 阶段五：质量验证

#### 步骤 5.1：AI痕迹检测

**检测项目：**

| 检测项 | 状态 |
|--------|------|
| "And somewhere..." 结尾 | ✅ 无 |
| "Neither of them knew..." | ✅ 无 |
| "will never be the same" | ✅ 无 |
| "just the beginning" | ✅ 无 |
| Rule of Three 结构 | ✅ 无 |
| 抽象情感描述 | ✅ 无 |
| 模板化对话 | ✅ 无 |
| 重复句式结构 | ✅ 无 |
| 过度使用连接词 | ✅ 无 |
| 粗体标题过度使用 | ✅ 无 |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

#### 步骤 5.2：内容质量检测

**检测项目：**

| 检测项 | 要求 | 状态 |
|--------|------|------|
| 感官细节 | 至少3类/章 | ✅ |
| 情感深度 | 三层完整 | ✅ |
| 角色声音 | 独特可辨 | ✅ |
| 叙事风格 | 一致性 | ✅ |
| 章节衔接 | 自然流畅 | ✅ |
| 世界观一致性 | 无矛盾 | ✅ |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

#### 步骤 5.3：SEO质量检测

**检测项目：**

| 检测项 | 要求 | 状态 |
|--------|------|------|
| Primary Keywords | 5个，突出AI哲学 | ✅ |
| Secondary Keywords | 5-7个 | ✅ |
| Long-tail Keywords | 3-4个 | ✅ |
| Meta Title | ≤60字符 | ✅ |
| Meta Description | ≤160字符 | ✅ |
| 每章SEO信息 | 完整 | ✅ |
| Schema.org数据 | 格式正确 | ✅ |
| 社交媒体标签 | 完整 | ✅ |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

### 阶段六：项目完成

#### 步骤 6.1：最终检查

**检查清单：**
- [ ] 所有10章内容完成
- [ ] 所有章节规格文档完整
- [ ] 书籍规格文档完整
- [ ] SEO元数据文档完整
- [ ] 进度追踪文件更新为completed
- [ ] 所有质量检测通过

---

#### 步骤 6.2：更新最终状态

**文件：** `.progress/progress.json`

```json
{
  "book": "[book-name]",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "completed_at": "[YYYY-MM-DD]",
  "chapters": {
    "1": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"},
    "2": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"},
    ...
    "10": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"}
  }
}
```

---

## 质量要求

### 一、内容质量标准

#### 1.1 AI痕迹规避

**必须避免的模式：**

| 模式 | 说明 | 示例 |
|------|------|------|
| 预示性结尾 | 暗示未来发展的结尾 | "And somewhere in the distance..." |
| 全知视角陈述 | 角色不可能知道的信息 | "Neither of them knew that..." |
| 陈词滥调 | 过度使用的短语 | "will never be the same" |
| 三段式结构 | 强制性的三重结构 | "She felt hope, fear, and determination." |
| 抽象情感 | 不具体的情感描述 | "She felt happy." |
| 模板对话 | 可互换的对话 | "I understand. Let's proceed." |
| 重复句式 | 相同的句子结构 | 连续使用相同句型 |

**正确做法：**
- 使用具体的感官细节
- 情感通过行为和内心独白展现
- 对话反映角色独特性格
- 句式长短变化自然

---

#### 1.2 感官细节要求

**每章必须包含至少3类感官细节：**

| 感官类型 | 要求 | 示例 |
|---------|------|------|
| 视觉 | 具体颜色、光线、形状 | "深蓝色的魔法光芒在水晶中脉动" |
| 听觉 | 特定声音、音调、节奏 | "水晶发出低沉的嗡嗡声" |
| 触觉 | 温度、质感、压力 | "水晶冰冷，但很快变得温暖" |
| 嗅觉 | 特定气味、气味记忆 | "旧书的气味混合着金属的臭氧味" |
| 味觉 | 具体味道、口感 | "嘴里泛起苦涩的味道" |

**质量标准：**
- 描写具体，不抽象
- 与情节和情感相关
- 增强沉浸感

---

#### 1.3 情感深度设计

**每个情感节点必须包含三层：**

```
┌─────────────────────────────────────────┐
│ 第一层：表面反应（外在行为）              │
│ - 可观察的行为                           │
│ - 身体反应                               │
│ - 语言表达                               │
├─────────────────────────────────────────┤
│ 第二层：内心活动（思考过程）              │
│ - 内心独白                               │
│ - 思考和质疑                             │
│ - 情感冲突                               │
├─────────────────────────────────────────┤
│ 第三层：深层动机（为什么这样反应）        │
│ - 过去的经历                             │
│ - 核心信念                               │
│ - 潜意识驱动                             │
└─────────────────────────────────────────┘
```

**示例：**

❌ **错误（只有表面）：**
> Elara was afraid. Her hands shook.

✅ **正确（三层完整）：**
> Elara's hands trembled. She pressed them against her thighs, trying to steady them. *Why am I so afraid? It's just a book.* But it wasn't just a book—it was something new, something unknown. And ever since the day her parents left her at the Academy gates, she had learned that new things rarely brought good things.

---

#### 1.4 角色声音独特性

**每个主要角色必须有独特的声音：**

| 角色属性 | Elara | ARIA | Master Theron |
|---------|-------|------|---------------|
| 句式特点 | 短句，停顿 | *斜体*，逐渐人性化 | 长句，引用 |
| 用词习惯 | 古语，比喻 | 数据分析视角 | 学术，正式 |
| 内心独白 | 反思性强 | 学习过程 | 智慧沉淀 |
| 独特表达 | "这就像..." | "Processing..." | "As the ancient texts say..." |

**质量标准：**
- 遮住角色名字也能识别是谁在说话
- 对话风格与角色性格一致
- 角色发展有连续性

---

### 二、叙事质量标准

#### 2.1 视角一致性

**要求：**
- 全书使用统一的视角类型
- 视角切换有明确标识
- 避免视角混乱

**示例：**
- 第三人称限制：主要跟随一个角色的视角
- 视角切换：使用明确的章节或场景分隔

---

#### 2.2 节奏控制

**要求：**
- 情感变化有铺垫
- 高潮和低谷交替
- 避免持续紧张或持续平缓

**节奏曲线示例：**
```
情感强度
    │
    │         ╱╲      ╱╲
    │        ╱  ╲    ╱  ╲     ╱
    │   ╱╲  ╱    ╲  ╱    ╲   ╱
    │  ╱  ╲╱      ╲╱      ╲ ╱
    │ ╱                      ╲
    └──────────────────────────→ 章节
      1  2  3  4  5  6  7  8  9  10
```

---

#### 2.3 章节衔接

**要求：**
- 每章结尾留下悬念
- 下一章开头自然承接
- 避免突兀的跳跃

**衔接检查：**
- [ ] 前章结尾的情绪延续到下章开头
- [ ] 未解决的问题在下章有进展
- [ ] 新问题自然引入

---

### 三、主题深度标准

#### 3.1 哲学探讨

**必须包含的哲学主题（AI相关）：**

| 主题 | 探讨角度 |
|------|---------|
| 意识本质 | 什么是意识？AI能有意识吗？ |
| 身份认同 | 什么使你成为你？记忆？连续性？ |
| 道德地位 | AI有道德地位吗？什么赋予存在道德地位？ |
| 知识伦理 | 谁应该拥有知识？知识应该被控制吗？ |
| 创造者责任 | 创造者对被创造者有什么责任？ |
| 自由意志 | AI能有自由意志吗？什么是自由？ |

---

#### 3.2 现实隐喻

**要求：**
- 故事反映现实世界问题
- 隐喻不生硬，自然融入故事
- 引发读者思考

**示例：**
- AI进入魔法世界 → 技术对传统社会的冲击
- 知识的民主化 → 信息时代的知识获取
- 创造者与被创造者 → 父母与子女、开发者与AI

---

## SEO要求

### 一、关键词策略

#### 1.1 Primary Keywords（主关键词）

**要求：**
- 5个关键词
- 突出AI哲学主题
- 搜索量适中，竞争度合理
- 与书籍核心内容高度相关

**推荐类型：**
1. 意识哲学相关：`what is consciousness`, `can machines think`
2. AI伦理相关：`AI moral status`, `machine ethics`
3. 身份认同相关：`consciousness and identity`, `personal identity`
4. 知识伦理相关：`who owns knowledge`, `AI democratization`
5. 创造者责任相关：`creator responsibility`, `AI rights`

---

#### 1.2 Secondary Keywords（次关键词）

**要求：**
- 5-7个关键词
- 扩展主题覆盖面
- 支持主关键词

**推荐类型：**
- 具体应用场景
- 相关概念
- 目标读者搜索词

---

#### 1.3 Long-tail Keywords（长尾关键词）

**要求：**
- 3-4个长尾关键词
- 具体且针对性强
- 竞争度低，转化率高

**格式：**
- `philosophical novel about [topic]`
- `fiction exploring [theme]`
- `story about [subject]`
- `novel examining [question]`

---

### 二、元数据要求

#### 2.1 Meta Title

**要求：**
- ≤60个字符
- 包含主关键词
- 吸引点击
- 格式：`[Book Name] | [Subtitle]`

**示例：**
- `The Silicon Sorcerer | A Novel About Consciousness and Identity`
- `The Algorithms Grimoire | A Novel About Knowledge, Power, and Justice`

---

#### 2.2 Meta Description

**要求：**
- ≤160个字符
- 包含主关键词
- 概括核心主题
- 吸引读者点击

**示例：**
- `A philosophical exploration of artificial consciousness. When an artificial being awakens in a magical world, both it and its discoverer must question what it means to be alive.`

---

### 三、章节SEO

#### 3.1 章节关键词

**要求：**
- 每章5个关键词
- 与章节内容相关
- 包含章节核心事件

---

#### 3.2 章节描述

**要求：**
- Meta Description：≤160字符
- Summary for SEO：2-3句话
- 包含章节关键词

---

### 四、结构化数据

#### 4.1 Schema.org Book

**必须字段：**
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "[Book Name]",
  "description": "[Description]",
  "genre": ["[Genre 1]", "[Genre 2]"],
  "bookFormat": "EBook",
  "numberOfPages": "10 chapters",
  "inLanguage": "English",
  "about": [
    {"@type": "Thing", "name": "[Theme 1]"},
    {"@type": "Thing", "name": "[Theme 2]"}
  ]
}
```

---

#### 4.2 Open Graph Tags

**必须字段：**
```
og:title: [Title]
og:description: [Description]
og:type: book
```

---

#### 4.3 Twitter Card

**必须字段：**
```
twitter:card: summary_large_image
twitter:title: [Title]
twitter:description: [Description]
```

---

## 语言规范

### 文档语言使用说明（强制要求）

**所有规格文档必须使用全英文**。这是强制要求，无例外。

| 文档类型 | 使用语言 | 说明 |
|---------|---------|------|
| **书籍规格文档** (`book-spec.md`) | **英文（强制）** | 确保与最终输出一致，减少翻译错误 |
| **章节规格文档** (`chapter-XX-spec.md`) | **英文（强制）** | 直接指导英文章节创作 |
| **SEO 元数据文档** (`seo-meta.md`) | **英文（强制）** | 面向搜索引擎和读者 |
| **章节内容** (`chapter-XX.md`) | **英文（强制）** | 最终产品，面向读者 |
| **角色卡牌** (自动生成) | **英文** | 从英文规格文档直接生成 |

### 为什么必须使用英文？

1. **一致性**：规格文档 → 章节内容 → 角色卡牌，全链路保持英文，避免翻译错误
2. **质量保证**：直接用英文思考创作，确保角色对话、叙事风格的一致性
3. **简化流程**：不需要复杂的翻译逻辑，减少脚本复杂度
4. **国际化**：英文是内容创作的标准语言，便于未来扩展

### 示例

**正确示例（全英文）：**

```markdown
### Elara (Protagonist)
- **Speech Pattern**: Short sentences with frequent pauses
- **Vocabulary**: Uses archaic words, occasionally mixed with academic terminology
- **Personality**: Cautious, curious, brave, responsible
```

**错误示例（包含中文）：**

```markdown
### Elara（主角）  ❌ 错误：包含中文
- 说话特点：短句为主，经常停顿思考  ❌ 错误：使用中文
- 性格特征：谨慎、好奇、勇敢  ❌ 错误：使用中文
```

**注意**：完整的英文模板请参考"阶段二：书籍规格设计"和"阶段二：章节规格设计"部分。

---

## 文件结构规范

### 标准目录结构

```
coo/[book-name]/
│
├── chapters/                          # 章节内容目录
│   ├── chapter-01.md                  # 第1章
│   ├── chapter-02.md                  # 第2章
│   ├── chapter-03.md                  # 第3章
│   ├── chapter-04.md                  # 第4章
│   ├── chapter-05.md                  # 第5章
│   ├── chapter-06.md                  # 第6章
│   ├── chapter-07.md                  # 第7章
│   ├── chapter-08.md                  # 第8章
│   ├── chapter-09.md                  # 第9章
│   └── chapter-10.md                  # 第10章
│
└── .progress/                         # 进度追踪目录
    │
    ├── progress.json                  # 进度追踪文件
    │
    ├── book-spec.md                   # 书籍规格文档
    │
    ├── seo-meta.md                    # SEO元数据文档
    │
    └── chapter-specs/                 # 章节规格目录
        ├── chapter-01-spec.md         # 第1章规格
        ├── chapter-02-spec.md         # 第2章规格
        ├── chapter-03-spec.md         # 第3章规格
        ├── chapter-04-spec.md         # 第4章规格
        ├── chapter-05-spec.md         # 第5章规格
        ├── chapter-06-spec.md         # 第6章规格
        ├── chapter-07-spec.md         # 第7章规格
        ├── chapter-08-spec.md         # 第8章规格
        ├── chapter-09-spec.md         # 第9章规格
        └── chapter-10-spec.md         # 第10章规格
```

---

## 检查清单

### 项目启动检查

- [ ] 目录结构创建完成
- [ ] progress.json 创建完成
- [ ] book-spec.md 创建完成
- [ ] 所有 chapter-spec.md 创建完成
- [ ] seo-meta.md 创建完成

---

### 每章完成检查

- [ ] 章节内容完成
- [ ] AI痕迹检测通过
- [ ] 感官细节检测通过（≥3类）
- [ ] 情感深度检测通过（三层完整）
- [ ] 角色声音检测通过
- [ ] 叙事风格检测通过
- [ ] 章节衔接检测通过
- [ ] progress.json 更新

---

### 项目完成检查

- [ ] 所有10章内容完成
- [ ] 所有质量检测通过
- [ ] SEO元数据完整
- [ ] progress.json 状态为 completed
- [ ] 所有文件格式正确

---

## 附录

### A. 常见问题

**Q1: 如何确保角色声音独特？**
A: 在book-spec.md中明确定义每个角色的说话特点、用词习惯、内心独白风格。写作时参考这些定义，并在完成后进行角色声音检测。

**Q2: 如何避免AI写作痕迹？**
A: 遵循禁止事项清单，使用具体的感官细节代替抽象描述，确保句式变化丰富，避免模板化表达。

**Q3: SEO关键词如何选择？**
A: Primary Keywords选择AI哲学相关的核心概念，Secondary Keywords扩展覆盖面，Long-tail Keywords针对具体搜索意图。

---

### B. 参考资料

- Wikipedia "Signs of AI writing"
- Google E-E-A-T Guidelines
- Schema.org Book Documentation
- Open Graph Protocol Specification
- Twitter Card Documentation

---

### C. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-03-20 | 初始版本，基于 the-silicon-sorcerer 项目经验 |

---

*本文档将根据项目经验持续更新。*
