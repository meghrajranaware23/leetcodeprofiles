/**
 * Build LeetCode Starter Path course content + starter-content.js
 * Run: node scripts/build-starter-course.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  DAYS,
  PHASE_TESTS,
  PHASE_THEMES,
  SKILL_CHEAT_SHEET,
  NEXT_PACK_GUIDE,
  P1_SKILLS,
  P2_SKILLS,
  P3_SKILLS,
  COURSE_GOALS,
  PHASES,
} from './starter-curriculum.js';
import { lcUrl } from './starter-lc-slugs.js';
import { SOLUTIONS } from './starter-solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MICRO_DIR = path.join(ROOT, 'course', 'starter', 'micro');

const STAR = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

function formatSolutions(lc) {
  const sol = SOLUTIONS[lc];
  if (!sol) throw new Error(`Missing solution for LC #${lc}`);
  return `### C++
\`\`\`cpp
${sol.cpp}
\`\`\`

### Python
\`\`\`python
${sol.python}
\`\`\`

### Java
\`\`\`java
${sol.java}
\`\`\`

**Complexity:** ${sol.complexity}`;
}

function write(file, content) {
  const full = path.join(MICRO_DIR, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n', 'utf8');
}

function conceptXp() {
  return 10;
}

function dayXp(day) {
  const questXp = day.quests.reduce((s, q) => s + q.xp, 0);
  return conceptXp() + questXp + day.checkpoint.xp;
}

function genWelcome() {
  const goals = COURSE_GOALS.map((g) => `- ${g}`).join('\n');
  const phaseRows = PHASES.map(
    (p) => `| ${p.label} | ${p.days} | ${p.name} | ${p.description} |`
  ).join('\n');

  return `# 🚀 LeetCode Starter Path

> Welcome, newcomer.

---

Most beginners quit LeetCode in week one. Not because they're bad at coding — because they never learned **how to learn** on the platform. Here's the truth: **LeetCode is a skill, not a test.** The people who succeed have a system. You're about to build yours.

**Five principles for your first 15 days:**

1. **Confidence before difficulty** — earn your first Accepted submissions before chasing Hard problems
2. **Understanding before optimization** — brute force is a valid Day 1 strategy
3. **Observation before code** — trace examples on paper before opening your editor
4. **Consistency before intensity** — 20 minutes daily beats 3-hour weekend cramming
5. **Problem-solving habits before advanced patterns** — workflow mastery unlocks Ascension packs

**15 days. 3 phases. One goal — make LeetCode feel doable.**

---

## How It Works

Each day is a focused mission. You learn one workflow skill, practice it on curated Easy problems, and build habits before moving on.

| | Your Daily Flow | |
|---|---|---|
| 📝 | **Mentor Guide** | Learn the workflow skill — reading, debugging, habits — before touching code |
| ⚔ | **Quests** | Try on LeetCode first (5 min), then study the **Strategy Breakdown** |
| ✅ | **Checkpoint** | Reflect, log habits, review mistakes |

Every quest includes:
- **🔍 Strategy Breakdown** — how to approach this specific problem with today's skill
- **💭 What a Mentor Would Tell You** — the thoughts an experienced solver has *before* writing code

---

## The Phase System

| Phase | Days | Focus | Outcome |
|-------|------|-------|---------|
${phaseRows}

Complete each phase to build on the last. No skipping. No shortcuts.

---

## What You Need

- Basic programming: loops, functions, arrays ✓
- A LeetCode account (we'll set this up Day 1) ✓
- 20 minutes per day, same time if possible ✓
- A notebook or doc for reflections and mistake logs ✓

---

## What This Is NOT

- ❌ A programming syntax course
- ❌ A DSA theory deep-dive
- ❌ A pattern memorization drill
- ❌ A race to solve Hard problems

This is your **onboarding** — the mentor-guided first 15 days that make everything else possible.

---

## Course Goals

${goals}

---

> 💡 **The goal isn't to solve every Easy problem on LeetCode.** It's to build the habits and confidence that let you pick an Ascension pack and actually finish it.

---

*Your Starter Path begins now. Make LeetCode yours. →*`;
}

const DAY_GUIDE_EXTRA = {
  1: `### Platform tour (do this now)

| Area | What to do |
|---|---|
| **Problem Set** | Filter to Easy · sort by acceptance rate |
| **Editor** | Pick C++, Python, or Java in settings |
| **Run / Submit** | Run = test locally · Submit = judge checks all cases |
| **Submissions** | Your AC history lives here — revisit it weekly |
| **Discuss / Editorial** | Read *after* your attempt, never before |

> 💡 **Mentor note:** Day 1 is about **momentum**, not difficulty. One Accepted submission changes everything.`,
  5: `### The 5-minute paper rule

Before every solve today:

\`\`\`
MINUTE 0–1:  Re-read problem + constraints
MINUTE 1–3:  Trace Example 1 on paper
MINUTE 3–5:  Write brute force in plain English
MINUTE 5+:   Open editor (only if you have a plan)
\`\`\`

> 💡 **Mentor note:** Phase 1 ends today. The phase proof (Valid Palindrome) tests whether your **reading habit** stuck — not whether you memorized a pattern.`,
  10: `### Running solo today

You've built the system. Today you prove it works **without hand-holding**:

1. No hints until 5 minutes pass
2. No editorial until you've submitted at least once
3. Log your stuck point even if you solve it

> 💡 **Mentor note:** Phase 2 proof (Best Time to Buy and Sell Stock) is your first "interview-shaped" problem. Trust the workflow you built.`,
  15: `### Picking your Ascension pack

| Signal from Starter Path | Recommended pack |
|---|---|
| Loved array tracing & pointers | Arrays & Strings Ascension |
| Climbing Stairs clicked | Recursion & Backtracking |
| Valid Parentheses felt natural | Trees Ascension (then Graphs) |
| Stock problem intrigued you | Dynamic Programming Ascension |

**Default if unsure:** Arrays & Strings Ascension — most beginner-friendly.

**Your 90-day commitment (write this now):**
- Pack chosen: _______________
- Start date: _______________
- Weekly target: 5–7 problems + 1 review session

> 💡 **Mentor note:** You're not done learning — you're done being a **beginner**. The final challenge (Maximum Subarray) is a stretch. Use your full workflow.`,
};

function genGuide(day) {
  const { concept, day: dayNum, dayTitle, mission, objective } = day;
  const xp = conceptXp();
  const extra = DAY_GUIDE_EXTRA[dayNum] || '';
  const skillRows = [
    ['Open editor before reading', 'Read title → constraints → examples → output first'],
    ['Skip examples ("I get it")', 'Hand-trace every example before coding'],
    ['Code immediately on stuck', 'Write brute force on paper for 5 minutes'],
    ['Copy editorial and move on', 'Close editorial, re-solve from memory tomorrow'],
    ['Random Easy problems daily', 'Follow today\'s skill-focused workflow'],
  ]
    .map(([weak, strong]) => `| ${weak} | ${strong} |`)
    .join('\n');

  return `# 📝 ${concept.title}

> **Day ${dayNum}** · ${concept.skill} · ${STAR(concept.stars)} · ${xp} XP · 8 min read

---

**Your mission today:** *${mission}*

**Learning objective:** ${objective}

---

## Part 1 — ${concept.skill}

### 1. Why this matters

Most beginners fail here because they treat LeetCode like a speed contest. **${concept.skill}** is the foundation that separates people who quit from people who rank up. Today you build that foundation.

### 2. The skill in one sentence

> **${concept.skill}** — ${day.mission}

### 3. Step-by-step workflow

1. Read the full problem statement without touching your editor
2. Write down: input format, output format, constraints, and 2 custom test cases
3. Trace the given examples by hand on paper
4. Spend 5 minutes attempting a solution (brute force is fine)
5. Only then: open hints, then the walkthrough

### 4. Visual walkthrough

\`\`\`
Problem: [Any LeetCode Easy]

Step 1 — TITLE:    What is being asked? (one sentence)
Step 2 — CONSTRAINTS: n ≤ ? · values range? · edge cases?
Step 3 — EXAMPLES:  Trace Example 1 by hand → verify output
Step 4 — PLAN:      Brute force in plain English (3 lines max)
Step 5 — CODE:      Translate plan to syntax
\`\`\`

### 5. What strong beginners do

| Weak habit | Strong habit |
|---|---|
${skillRows}

### 6. The key insight

> You don't need to be fast. You need to be **systematic**. Today's skill — **${concept.skill}** — is one step in a repeatable workflow.

### 7. Common beginner mistakes

| Mistake | Fix |
|---|---|
| Skipping constraints | Constraints tell you valid input ranges and edge cases |
| Not tracing examples | Examples are free test cases — use them |
| Opening editor too early | 5 minutes of paper work saves 30 minutes of debugging |
| Giving up before 5 minutes | Getting stuck is data — log where you stopped |
| Not logging mistakes | Your mistake journal is your fastest teacher |

### 8. Try it now (60 seconds)

Pick any Easy problem on LeetCode. Without coding:
1. State the problem in one sentence
2. Name one edge case from the constraints
3. Trace Example 1 on paper

${extra ? `\n---\n\n${extra}\n` : ''}
---

*You've got the playbook. Time to put it on LeetCode. →*`;
}

function genSetupMission(day) {
  return `# 📋 ${day.setupMission.title}

> **Day ${day.day}** · Setup Checklist · 10 XP · 5 min

---

Complete this checklist before moving to today's checkpoint. These are one-time setup tasks that make every future day smoother.

---

## ✅ Account & Profile

- [ ] Create a [LeetCode account](https://leetcode.com/accounts/signup/) (or log in to existing)
- [ ] Set your preferred language in Profile → Settings
- [ ] Bookmark the [Problem List](https://leetcode.com/problemset/) filtered to Easy

## ✅ Editor Setup

- [ ] Choose your coding environment: LeetCode online editor OR local IDE
- [ ] If local: verify you can run a simple \`main\` and print output
- [ ] Enable syntax highlighting and auto-indent in your editor

## ✅ Habit Setup

- [ ] Block **20 minutes daily** on your calendar (same time each day)
- [ ] Create a mistake journal (notebook, Notion, or Google Doc)
- [ ] Write your 90-day goal in one sentence at the top of the journal

## ✅ First Win

- [ ] Complete the FizzBuzz warmup quest with an Accepted submission
- [ ] Screenshot or note your first AC — you'll want to remember this

---

> 💡 **Mentor note:** The goal today isn't difficulty — it's **momentum**. One Accepted submission changes how LeetCode feels.

---

*Setup complete? Move to today's checkpoint. →*`;
}

function genQuest(day, quest, questNum, inlineStatement = false) {
  const url = lcUrl(quest.lc);
  const timeMin = quest.diff === 'Medium' ? 15 : 10;
  const isWarmup = quest.title.startsWith('Warmup');

  const problemSection = inlineStatement
    ? `Given the problem on LeetCode, apply today's skill: **${quest.skill}**.

**[→ Open ${quest.name} on LeetCode](${url})** for the full statement, examples, and constraints.`
    : `See the full problem statement, examples, and constraints on LeetCode.

**[${quest.name} #${quest.lc}](${url})**`;

  return `# ⚔ ${quest.title}

> **Day ${day.day}** · [${quest.name} #${quest.lc}](${url}) · ${quest.diff} · ${timeMin} min · ${quest.xp} XP

---

## 🎯 Try the Problem First

Open the problem on LeetCode and attempt it **before** reading hints or solutions.

**[→ Open ${quest.name} on LeetCode](${url})**

> ⚔ **Mentor's rule:** Spend at least 5 minutes with pen and paper. Apply today's skill: **${quest.skill}**. The hints below are for *after* your attempt.

---

## The Problem

${problemSection}

---

## 💡 Hints

1. Re-read the constraints — what edge cases do they hint at?
2. Trace Example 1 by hand before writing any code
3. Start with the simplest approach that could work (brute force is fine)
${isWarmup ? '4. For FizzBuzz: handle divisibility by 3 and 5 separately, then combine' : ''}

---

## 🔍 Strategy Breakdown

**Skill practiced today:** ${quest.skill}

**Why this problem:** ${quest.why}

**How to read this problem:**
1. What is the input? What is the output?
2. What do the examples tell you about the expected behavior?
3. What's the simplest approach that handles all examples?

**How a mentor thinks (before coding):**
1. *"I've seen this type — it's about ${quest.skill.toLowerCase()}."*
2. *"Let me trace Example 1 on paper first."*
3. *"What's my brute force? Does it fit the constraints?"*
4. *"Only then do I open my editor."*

---

## ❌ Why Jumping to Code Fails

| Approach | Problem |
|---|---|
| Open editor immediately | You code before understanding — bugs multiply |
| Skip example tracing | You miss edge cases the examples reveal |
| Copy without understanding | You can't re-solve tomorrow without the editorial |
| Give up before 5 minutes | You never build the "attempt first" habit |

> **The insight:** Speed comes from **process**, not from skipping steps.

---

## 🔗 Problems That Build the Same Skill

| Problem | Difficulty | Skill |
|---|---|---|
| [${quest.name} #${quest.lc}](${url}) | ${quest.diff} | ${quest.skill} |

---

## 📖 Walkthrough

Trace Example 1 on paper step by step. Write your brute force in plain English (3 lines). Only then translate to code.

> 💡 **The code is just the paper trace written in syntax.**

---

## Solution

${formatSolutions(quest.lc)}

---

## 💭 What a Mentor Would Tell You

- *"I didn't need the optimal solution — I needed a **correct** solution with a clear process."*
- *"Tracing the example first would have saved me from that off-by-one bug."*
- *"Getting stuck for 3 minutes is normal. Giving up at 30 seconds is the real problem."*

> 🎯 **Skill practiced:** ${quest.skill}

---

*${questNum === 1 ? 'One quest down.' : 'Two quests down.'} ${questNum < day.quests.length ? 'The next one builds on this skill.' : 'Move to today\'s checkpoint.'} →*`;
}

function genCheckpoint(day) {
  const xp = dayXp(day);
  const reflections = day.reflection.map((r) => `- ${r}`).join('\n');
  const mistakes = [
    'Skipping the reading framework',
    'Not logging where you got stuck',
    'Moving on without completing the habit action',
  ]
    .map((m, i) => `${i + 1}. **${m}** — slows long-term growth`)
    .join('\n');

  const practiceQueue = day.quests
    .map(
      (q) =>
        `| [${q.name} #${q.lc}](${lcUrl(q.lc)}) | ${q.diff} | ${q.skill} |`
    )
    .join('\n');

  return `# ✅ Day ${day.day} Checkpoint

> **${day.dayTitle}** · ${day.quests.length} quest${day.quests.length > 1 ? 's' : ''} completed · ⭐ ${xp} XP available

---

## 🔍 Skill Check

Before you move on, confirm you can recall today's workflow:

1. What was today's skill? → **${day.concept.skill}**
2. What was today's mission? → *${day.mission}*
3. What was the expected outcome? → ${day.outcome}

---

## 📓 Reflection Journal

Write your answers in your mistake journal (notebook or doc):

${reflections}

---

## 🔁 Habit Builder

**Today's habit:** ${day.habit}

- [ ] I completed this habit action today
- [ ] I will repeat it tomorrow before opening LeetCode

---

## 🪞 Mistake Mirror

Common mistakes from today's skill area:

${mistakes}

> Which one did you catch yourself doing today? Write it down — that's growth.

---

## 🏋️ Mini Challenge (Optional)

Re-attempt today's hardest quest **without** looking at the solution. Time yourself: 10 minutes max.

---

## 📚 Practice Queue

If you're ahead, try these related problems:

| Problem | Difficulty | Skill |
|---|---|---|
${practiceQueue}

---

*Day ${day.day} complete. ${day.day < 15 ? `Tomorrow: **${DAYS[day.day]?.dayTitle || 'next mission'}**.` : 'Final challenge ahead.'} →*`;
}

function genTest(phase, test, testIndex, total) {
  const url = lcUrl(test.lc);
  const meta = PHASE_THEMES[phase];

  return `# 🎯 ${test.title}

> [${test.name} #${test.lc}](${url}) · ${test.diff} · ${test.xp} XP

---

You've completed **${meta.theme}**. Now prove you can apply the skills independently.

**[→ Open ${test.name} on LeetCode](${url})**

> ⚔ **Phase proof rule:** Spend at least 10 minutes attempting this on your own. Use your full workflow: read → trace → plan → code. No hints until you've tried.

---

## The Problem

**[${test.name} #${test.lc}](${url})** — see full statement on LeetCode.

**What's being tested:** ${test.skill} — ${test.why}

---

## 💡 Hints

1. Apply the workflow from this phase — don't skip steps
2. Trace all examples on paper first
3. Brute force is acceptable if it passes constraints

---

## 🔍 Strategy Breakdown

**Skill tested:** ${test.skill}

**Mentor thinking:**
1. *"I've practiced this skill for 5 days — I know the workflow."*
2. *"Read constraints first. List edge cases."*
3. *"Plan on paper. Code second."*

---

<details>
<summary>📖 Solution & Walkthrough</summary>

${formatSolutions(test.lc)}

</details>

---

## 💭 What a Mentor Would Tell You

- *"Getting this wrong after an honest attempt is fine — note what broke in your workflow."*
- *"Getting this right proves your **process** works, not just your memory."*

---

*${testIndex + 1} of ${total} phase proof. ${testIndex + 1 < total ? 'Continue to the next.' : 'Claim your phase completion.'} →*`;
}

function genPhaseComplete(phase) {
  const meta = PHASE_THEMES[phase];
  const block = PHASE_TESTS[phase];
  const phaseDays = DAYS.filter((d) => d.rank === phase);
  const skills = phase === 'p1' ? P1_SKILLS : phase === 'p2' ? P2_SKILLS : P3_SKILLS;
  const nextPhase = phase === 'p1' ? 'p2' : phase === 'p2' ? 'p3' : null;
  const nextMeta = nextPhase ? PHASE_THEMES[nextPhase] : null;
  const nextDays = nextPhase ? DAYS.filter((d) => d.rank === nextPhase) : [];
  const xpMap = { p1: '~200', p2: '~500', p3: '~750' };

  const journeyRows = phaseDays
    .map((d) => `| Day ${d.day} | ${d.concept.skill} | ${d.mission} |`)
    .join('\n');

  const skillList = skills.map((s) => `✓ ${s}`).join('\n');
  const cheatRows = SKILL_CHEAT_SHEET.map(([a, b]) => `| ${a} | ${b} |`).join('\n');

  const isFinal = phase === 'p3';
  const fileLabel = isFinal ? 'course-complete' : `phase-${phase.replace('p', '')}-complete`;

  let nextSection;
  if (isFinal) {
    const packRows = NEXT_PACK_GUIDE.map(
      (e) => `| ${e.enjoyed} | ${e.pack} | ${e.why} |`
    ).join('\n');
    nextSection = `
## Ascension Pack Recommendation Matrix

| If you enjoyed... | Start with... | Why |
|---|---|---|
${packRows}

> 💡 **Default recommendation:** **Arrays & Strings Ascension** — most beginner-friendly entry point.

## What's Next

Pick your first Ascension pack within 7 days. Your Starter Path habits carry forward — the patterns get deeper, but the workflow stays the same.

**[Choose Your Ascension Pack →](./index.html#packs)**`;
  } else {
    nextSection = `
## 🔵 ${nextMeta.label} — Unlocked

You've earned **${nextMeta.title}**. Continue from **Day ${nextDays[0]?.day}: ${nextDays[0]?.dayTitle}** in the sidebar.

> 💡 ${nextMeta.label} teaches you **${nextMeta.theme.toLowerCase()}**.`;
  }

  return `# 🏆 ${isFinal ? 'Starter Path Complete' : `${meta.label} Complete`} — ${meta.title} Confirmed

> **Congratulations.** You've proven your **${meta.theme}** mastery.

---

## Your ${meta.label} Journey

| Day | Skill | Mission |
|-----|-------|---------|
${journeyRows}

---

## Skills Unlocked

\`\`\`
${skillList}
\`\`\`

## 🧠 Your Workflow Cheat Sheet

| When... | Do this... |
|---|---|
${cheatRows}

> 💡 **The ${meta.label} skill:** Read first. Trace second. Code third.

---

## Stats

- **Quests completed:** ${phaseDays.reduce((s, d) => s + d.quests.length, 0)}
- **Phase proof solved:** 1
- **Total XP earned:** ${xpMap[phase]}+
- **Status:** ${meta.title} → ${nextMeta ? `awaiting ${nextMeta.title}` : 'Ready to Ascend'}

---
${nextSection}

---

> *"You didn't finish a tutorial. You built a system." — Your mentor*`;
}

function buildContent() {
  fs.mkdirSync(MICRO_DIR, { recursive: true });
  write('00-welcome.md', genWelcome());

  for (const day of DAYS) {
    write(day.concept.file, genGuide(day));
    write(`${String(day.day).padStart(2, '0')}-4-checkpoint.md`, genCheckpoint(day));
    day.quests.forEach((q, i) => {
      write(q.file, genQuest(day, q, i + 1, day.day <= 8));
    });
    if (day.setupMission) {
      write(day.setupMission.file, genSetupMission(day));
    }
  }

  for (const [phase, block] of Object.entries(PHASE_TESTS)) {
    block.tests.forEach((t, i) => write(t.file, genTest(phase, t, i, block.tests.length)));
    write(block.complete.file, genPhaseComplete(phase));
  }

  console.log(`Wrote ${fs.readdirSync(MICRO_DIR).length} markdown files to course/starter/micro/`);
}

function buildContentJs() {
  const imports = [];
  const lessons = [];
  const importName = (file) => 'starter_' + file.replace(/\.md$/, '').replace(/[^a-zA-Z0-9]/g, '_');

  const addLesson = (meta, importVar) => {
    lessons.push({ ...meta, importVar });
  };

  imports.push(`import welcomeContent from './course/starter/micro/00-welcome.md?raw';`);
  addLesson({
    id: 'welcome',
    title: 'Welcome to the LeetCode Starter Path',
    rank: 'intro',
    day: 0,
    dayTitle: '',
    type: 'intro',
    icon: '🚀',
    xp: 0,
  }, 'welcomeContent');

  for (const day of DAYS) {
    const d = day.day;
    const cVar = importName(day.concept.file);
    imports.push(`import ${cVar} from './course/starter/micro/${day.concept.file}?raw';`);
    addLesson({
      id: `${d}-1`,
      title: day.concept.title,
      rank: day.rank,
      day: d,
      dayTitle: day.dayTitle,
      type: 'concept',
      icon: '📝',
      xp: conceptXp(),
    }, cVar);

    let questSlot = 2;
    day.quests.forEach((q) => {
      const qVar = importName(q.file);
      imports.push(`import ${qVar} from './course/starter/micro/${q.file}?raw';`);
      addLesson({
        id: `${d}-${questSlot}`,
        title: q.title,
        rank: day.rank,
        day: d,
        dayTitle: day.dayTitle,
        type: 'quest',
        icon: '⚔',
        xp: q.xp,
      }, qVar);
      questSlot++;
    });

    if (day.setupMission) {
      const sVar = importName(day.setupMission.file);
      imports.push(`import ${sVar} from './course/starter/micro/${day.setupMission.file}?raw';`);
      addLesson({
        id: `${d}-${questSlot}`,
        title: day.setupMission.title,
        rank: day.rank,
        day: d,
        dayTitle: day.dayTitle,
        type: 'concept',
        icon: '📋',
        xp: 10,
      }, sVar);
      questSlot++;
    }

    const cpFile = `${String(d).padStart(2, '0')}-4-checkpoint.md`;
    const cpVar = importName(cpFile);
    imports.push(`import ${cpVar} from './course/starter/micro/${cpFile}?raw';`);
    addLesson({
      id: `${d}-4`,
      title: 'Checkpoint & Reflection',
      rank: day.rank,
      day: d,
      dayTitle: day.dayTitle,
      type: 'checkpoint',
      icon: '✅',
      xp: day.checkpoint.xp,
    }, cpVar);
  }

  const phaseTestNum = { p1: 1, p2: 2, p3: 3 };
  for (const [phase, block] of Object.entries(PHASE_TESTS)) {
    block.tests.forEach((t) => {
      const tVar = importName(t.file);
      imports.push(`import ${tVar} from './course/starter/micro/${t.file}?raw';`);
      addLesson({
        id: `test-${phaseTestNum[phase]}`,
        title: t.title,
        rank: phase,
        day: block.day,
        dayTitle: block.dayTitle,
        type: 'test',
        icon: '🎯',
        xp: t.xp,
      }, tVar);
    });

    const completeId = phase === 'p3' ? 'course-complete' : `phase-${phase.replace('p', '')}-complete`;
    const rcVar = importName(block.complete.file);
    imports.push(`import ${rcVar} from './course/starter/micro/${block.complete.file}?raw';`);
    addLesson({
      id: completeId,
      title: phase === 'p3' ? 'Starter Path Complete' : `${PHASE_THEMES[phase].label} Complete`,
      rank: phase,
      day: block.complete.day,
      dayTitle: 'Phase Complete!',
      type: 'complete',
      icon: '🏆',
      xp: 0,
    }, rcVar);
  }

  const lessonEntries = lessons
    .map(
      (l) => `  {
    id: '${l.id}',
    title: '${l.title.replace(/'/g, "\\'")}',
    rank: '${l.rank}',
    day: ${l.day},
    dayTitle: '${l.dayTitle.replace(/'/g, "\\'")}',
    type: '${l.type}',
    icon: '${l.icon}',
    xp: ${l.xp},
    content: ${l.importVar},
  }`
    )
    .join(',\n');

  const out = `// ══════════════════════════════════════════════════════════
//  STARTER CONTENT — LeetCode Starter Path
//  15-day beginner onboarding · 3 phases
//  Generated by scripts/build-starter-course.js — re-run after curriculum edits
// ══════════════════════════════════════════════════════════

${imports.join('\n')}

export const COURSE_LESSONS = [
${lessonEntries}
];
`;

  fs.writeFileSync(path.join(ROOT, 'starter-content.js'), out, 'utf8');
  console.log(`Wrote starter-content.js with ${lessons.length} lessons`);
}

buildContent();
buildContentJs();
