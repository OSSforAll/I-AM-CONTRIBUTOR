# 🚀 I-AM-CONTRIBUTOR

Welcome to the **OSSForAll** gateway! 🌍

If you've always wanted to contribute to Open Source but didn't know where to start, you're in the right place. This repository is a permanent "safe zone" designed to help anyone, anywhere, make their very first Pull Request.

## 🎯 The Goal

The mission is simple: **Get your name on the global Wall of Fame.** By doing this, you'll learn the essential GitHub workflow used by millions of developers.

---

## 🛠 How to Onboard (Step-by-Step)

### 1. Fork this Repository
Click the **Fork** button at the top right of this page. This creates a personal copy of this project under your own GitHub account.

### 2. Clone your Fork
Open your terminal and run (replace `YOUR-USERNAME` with your actual GitHub handle):
```bash
git clone https://github.com/YOUR-USERNAME/I-AM-CONTRIBUTOR.git
cd I-AM-CONTRIBUTOR
```

### 3. Create a Feature Branch
Always work on a new branch to keep the `main` branch clean.
```bash
git checkout -b feat/add-contributor-your-github-username
```

### 4. Add your Entry to `contributors.json`

Open [`contributors.json`](/contributors.json) and add your entry to the array.

**Only your GitHub username is required.** Everything else is optional but encouraged — it helps showcase your work on the [Wall of Fame](https://ossforall.github.io/I-AM-CONTRIBUTOR/)!

**Minimum entry:**
```json
{
  "github": "your-github-username"
}
```

**Full entry (add whatever applies to you):**
```json
{
  "github": "your-github-username",
  "name": "Your Full Name",
  "category": "Beginner",
  "intro": "A short sentence about you.",
  "techStack": ["PHP", "Laravel", "JavaScript"],
  "packages": [
    { "name": "your-package", "url": "https://packagist.org/packages/you/your-package", "registry": "packagist" }
  ],
  "website": "https://yoursite.com",
  "twitter": "yourhandle",
  "blog": "https://dev.to/yourhandle",
  "youtube": "https://youtube.com/@yourchannel",
  "linkedin": "yourhandle",
  "openSource": [
    { "name": "org/repo", "url": "https://github.com/org/repo" }
  ]
}
```

**Field reference:**

| Field | Required | Description |
| :--- | :--- | :--- |
| `github` | ✅ | Your GitHub username. Avatar and profile link are generated from this. |
| `name` | Optional | Your display name. Defaults to GitHub username if omitted. |
| `category` | Optional | `Beginner`, `Intermediate`, `Advanced`, or `Maintainer` |
| `intro` | Optional | A short bio or tagline. |
| `techStack` | Optional | Languages, frameworks, or tools you use. |
| `packages` | Optional | Published packages (npm, Packagist, PyPI, RubyGems, crates.io). |
| `website` | Optional | Your personal website or portfolio URL. |
| `twitter` | Optional | Your Twitter / X handle (without `@`). |
| `blog` | Optional | Your blog URL (dev.to, Hashnode, Medium, etc.). |
| `youtube` | Optional | Your YouTube channel URL. |
| `linkedin` | Optional | Your LinkedIn handle (the part after `linkedin.com/in/`). |
| `openSource` | Optional | Notable OSS repos you actively contribute to. |

> **Supported `registry` values for packages:** `npm` · `packagist` · `pypi` · `rubygems` · `crates`

### 5. Commit with Best Practices
We follow **Conventional Commits**. This makes the project history readable.
```bash
git add contributors.json
git commit -m "feat: add your-github-username to the wall of fame"
```

### 6. Push and Create Pull Request
```bash
git push origin feat/add-contributor-your-github-username
```
Go to the original [OSSForAll/I-AM-CONTRIBUTOR](https://github.com/OSSForAll/I-AM-CONTRIBUTOR) repo. You'll see a "Compare & pull request" button. Click it, add a short description, and submit!

> **No need to worry about merge conflicts!**
> If another PR is merged before yours, a bot will automatically rebase your `contributors.json` against the latest `main` and push the fix to your branch. You don't need to do anything.

---

## 🌟 What's Next?
Once your PR is merged:
1. **Celebrate!** You are officially an Open Source Contributor.
2. **Find Real Issues:** Check out the [Issues](https://github.com/OSSForAll/I-AM-CONTRIBUTOR/issues) tab for "Good First Issues" in other `OSSForAll` projects.
3. **Share:** Tweet your PR with the hashtag `#OSSForAll` to inspire others.

---

## 🏗 About OSSForAll
We believe Open Source is for everyone. This project is maintained by the community to bridge the gap between "coding" and "contributing."

**Maintainer:** [Punyapal Shah](https://github.com/mrpunyapal)

Happy Contributing! ❤️