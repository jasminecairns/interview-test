# 📦 Sentari Kit

## How to run
1. cd template
2. pnpm install
3. cd src/lib/mood-calendar
4. npm install
5. npm run dev

***

This folder contains **everything** a candidate needs to complete an interview task.

Tech stack:
Next.js 15 (App Router, React Server Components)
React 19
TypeScript
Tailwind CSS 3 
Supabase

Structure:
```
contrib/
 ├─ README.md                # you are here
 ├─ template/                # minimal repo candidates will fork
 └─ scripts/
     └─ verify-contrib.sh    # maintainer helper to check a submission
```

Read `template/README.md` for the instructions you will send to candidates.

## Folder structure

```
contrib/
 ├─ README.md                # this guide
 ├─ template/                # minimal project template for contributors
 │   ├─ src/
 │   │   ├─ lib/
 │   │   │   └─ sampleService.ts
 │   │   └─ app/api/sample/route.ts
 │   ├─ tests/
 │   │   └─ sample.test.ts
 │   ├─ package.json         # locked dependency versions
 │   ├─ tsconfig.json
 │   └─ .eslintrc.json
 └─ scripts/
     └─ verify-contrib.sh    # one-liner acceptance script for maintainers
```

## Quick workflow overview

1. A contributor **forks** the `template/` repo (or clicks *Use this template* on GitHub).  
2. They implement their feature following `template/README.md` and make sure `pnpm lint && pnpm test` are both green.  
3. They generate a `patch.diff` or simply share the repository URL in the designated Issue.  
4. You run `scripts/verify-contrib.sh <repo-url>` to clone the repo and execute the automated checks offline.  
5. If it passes and looks valuable, you manually cherry-pick / copy the code into the main code-base.

> Important: everything lives under the `contrib/` sub-directory 

