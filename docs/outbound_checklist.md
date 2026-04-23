# Precogs Outbound Marketing — Launch Checklist

> Everything you need before sending your first cold email. Ordered by dependency — complete top-to-bottom.

---

## Phase 0: Infrastructure (Do This FIRST — Week 1)

> [!CAUTION]
> **NEVER send cold email from precogs.ai.** One spam complaint = your primary domain reputation is destroyed. Brevo stops working. Product emails stop arriving. Everything breaks.

### Domain Setup

- [ ] **Buy 3-5 secondary domains** (redirect to precogs.ai)
  - `getprecogs.com`
  - `precogs-security.com`
  - `tryprecogs.com`
  - `precogsai.co`
  - `precogshq.com`
  - Cost: ~$10-15/domain/year

- [ ] **Create Google Workspace accounts on each domain** (3 mailboxes per domain)
  - `rajnish@getprecogs.com`, `raj@getprecogs.com`, `rs@getprecogs.com`
  - `rajnish@precogs-security.com`, `raj@precogs-security.com`, `rs@precogs-security.com`
  - That gives you **9-15 sending mailboxes** = 450-750 emails/day at scale
  - Cost: ~$6/user/month on Google Workspace Starter

- [ ] **DNS records for EVERY domain** (non-negotiable)

  | Record | Purpose | Check |
  |---|---|---|
  | **SPF** | Authorises Google to send on your behalf | `v=spf1 include:_spf.google.com ~all` |
  | **DKIM** | Cryptographic email authentication | Generate in Google Admin → Apps → Gmail → Authenticate |
  | **DMARC** | Policy for failed auth | `v=DMARC1; p=none; rua=mailto:dmarc@getprecogs.com` |
  | **MX** | Mail routing | Google Workspace MX records |
  | **Custom tracking domain** | Avoids Instantly's shared domain | `track.getprecogs.com` → CNAME to Instantly |

- [ ] **Forwarding**: Set up redirects so `getprecogs.com` → `precogs.ai` (in case prospects visit)

- [ ] **Profile pictures & signatures**: Add real headshots + signatures to each Google account (looks human to spam filters)

### Warmup (14-21 Days Minimum)

- [ ] **Connect all mailboxes to Instantly's warmup**
  - Warmup settings: 30 emails/day, increase by 3/day
  - Reply rate target: 30-40%
  - Keep warmup running FOREVER (even after you start sending)

- [ ] **Warmup monitoring dashboard** — check daily:
  - Inbox placement rate (target: >95%)
  - Warmup email open rate (target: >50%)
  - No mailbox shows "Spam" issues

> [!IMPORTANT]
> **Do NOT start sending campaigns until warmup has run for at least 14 days AND inbox placement is >95%.** Starting early wastes your domain.

---

## Phase 1: ICP & List Building (Week 1-2, parallel with warmup)

### Define Your ICP (Ideal Customer Profile)

```
PRIMARY ICP — "The Security Buyer"
─────────────────────────────────
Title:     CISO, VP Security, Head of AppSec, Director of Security
Company:   200-5000 employees (sweet spot: 500-2000)
Industry:  Fintech, SaaS, HealthTech, Banking, Insurance
Tech:      Uses GitHub/GitLab, has CI/CD pipeline
Geography: UK → EMEA → US (in that order for you)
Trigger:   Recently raised funding, hiring security engineers, 
           posted job for DevSecOps

SECONDARY ICP — "The Engineering Buyer"
───────────────────────────────────────
Title:     VP Engineering, CTO, Head of Platform, DevSecOps Lead
Company:   50-2000 employees  
Industry:  Same as above
Trigger:   Actively using Copilot/AI coding tools, growing dev team
```

### Apollo — List Building

- [ ] **Create saved searches for each ICP segment:**

  | Segment Name | Apollo Filters |
  |---|---|
  | UK Fintech CISOs | Title: CISO/VP Security, Industry: Financial Services, HQ: UK, Size: 200-5000 |
  | UK SaaS VP Engs | Title: VP Eng/CTO, Industry: SaaS, HQ: UK, Size: 50-2000 |
  | EMEA Security Leaders | Title: CISO/Head of Security, HQ: DE/FR/NL/CH, Size: 500+ |
  | US Mid-Market CISOs | Title: CISO, HQ: US, Size: 200-2000, Funding: Series B+ |

- [ ] **Export 500-1000 prospects per segment** (don't go wider until you validate messaging)
- [ ] **Verify emails** — use Apollo's built-in verification + ZeroBounce/NeverBounce for any "guessed" emails
  - Target: <2% bounce rate. Remove all unverified emails.

### Clay — Enrichment Layer

- [ ] **Import Apollo lists into Clay**
- [ ] **Add enrichment columns:**

  | Column | Source | Why |
  |---|---|---|
  | Company tech stack | Clay/BuiltWith | Know if they use Snyk, SonarQube, Checkmarx |
  | Recent funding | Crunchbase/Clay | "Congrats on the Series B" opener |
  | Recent hires (security) | LinkedIn/Clay | "Saw you're building out the security team" |
  | Company news | Google News/Clay | Personalisation hooks |
  | AI tool usage | Job postings/Clay | Mentions Copilot/Cursor = warm signal |
  | Competitor usage | G2/Clay | Currently using Snyk? Perfect displacement target |

- [ ] **AI personalisation column** — use Clay's AI writer to generate a 1-line personalised opening for each prospect based on enrichment data

### List Hygiene

- [ ] **Remove** anyone from a current customer/design partner company
- [ ] **Remove** personal emails (gmail, yahoo, etc.)
- [ ] **Remove** anyone already in your MarketingContact DB (avoid double-touching warm contacts via cold email)
- [ ] **Deduplicate** across segments
- [ ] **Tag** each prospect with segment name (for A/B testing later)

---

## Phase 2: Messaging & Sequences (Week 2)

### Core Principles

1. **Lead with THEIR pain, not your features** — "Are you drowning in false positives?" not "We have 98% precision"
2. **Short emails** — 50-80 words max. Mobile-first. No walls of text.
3. **One CTA per email** — always a soft ask ("worth a quick chat?" not "book a demo")
4. **No attachments, no images, no HTML** — plain text only for cold email
5. **Personalisation in the first line** — Clay's AI-generated opener

### Sequence Structure (4 emails over 12 days)

```
Day 0:  Email 1 — Pain + curiosity
Day 3:  Email 2 — Social proof + insight
Day 7:  Email 3 — Value bomb (CVE content / case study)
Day 12: Email 4 — Breakup
```

### Email Templates

#### Sequence A: "False Positive Fatigue" (for CISOs/Security Leaders)

**Email 1 — Day 0:**
```
Subject: {{firstName}}, quick question on {{company}}'s appsec

{{clay_personalised_opener}}

Quick question — what's your team's false positive rate on code scans right now?

We keep hearing 30-40% from security leaders, which means devs 
ignore half the findings. Precogs runs at <2% false positives 
across production codebases.

Worth a 15-min chat to see if there's a fit?

Rajnish
Founder, Precogs
```

**Email 2 — Day 3:**
```
Subject: Re: {{firstName}}, quick question on {{company}}'s appsec

{{firstName}}, one thing I forgot to mention —

We're the only platform that catches PII and secrets before they're 
sent to AI coding assistants (Copilot, Cursor, etc.).

With {{company}} scaling its dev team, this is probably on your 
radar already.

Happy to show you a 5-min demo — no commitment.

Rajnish
```

**Email 3 — Day 7:**
```
Subject: CVE-2026-XXXXX — affects {{industry}} companies

{{firstName}}, this might be useful regardless of whether we chat —

CVE-2026-XXXXX (CVSS 9.8) affects Django/Flask apps and most SAST 
tools miss it entirely. We wrote up the analysis + fix:

[link to your Vuln Hub page]

If {{company}} runs Python anywhere, worth a quick check.

Rajnish
```

**Email 4 — Day 12 (breakup):**
```
Subject: closing the loop

{{firstName}}, I'll keep this short.

If securing AI-generated code isn't a priority right now, totally 
understand. I'll close this thread.

But if it is — I'm here. Just hit reply.

Rajnish
```

#### Sequence B: "AI Code Security" (for VP Eng / CTO)

**Email 1:**
```
Subject: {{company}} + AI-generated code security

{{clay_personalised_opener}}

34% of Copilot-generated Python functions have at least one 
OWASP Top 10 vulnerability. Traditional SAST wasn't built 
for AI-generated patterns.

We built Precogs specifically for this — AI-native code security 
with auto-fix PRs. Takes 5 minutes to connect to GitHub.

Worth a quick look?

Rajnish
```

*(Emails 2-4 follow same pattern — adjust angle for engineering buyer)*

#### Sequence C: "Competitor Displacement" (for known Snyk/SonarQube users)

**Email 1:**
```
Subject: {{firstName}}, re: {{company}}'s Snyk setup

{{clay_personalised_opener}}

Not trying to bash Snyk — they're solid for SCA.

But if your team is still dealing with noisy SAST results or 
missing PII/secrets in AI-generated code, that's the gap we fill.

Precogs runs alongside existing tools. 5-min GitHub connect, 
no rip-and-replace.

Worth comparing results on one repo?

Rajnish
```

---

## Phase 3: Instantly Setup (Week 2-3)

### Campaign Configuration

- [ ] **Connect all warmed-up mailboxes** to Instantly
- [ ] **Set sending limits per mailbox:**

  | Week | Emails/day per mailbox | Total (15 mailboxes) |
  |---|---|---|
  | Week 1 (post-warmup) | 20/day | 300/day |
  | Week 2 | 30/day | 450/day |
  | Week 3+ | 40-50/day | 600-750/day |

- [ ] **Sending schedule:**
  - Mon-Thu only (Friday = lower open rates)
  - 8:00 AM - 11:00 AM in recipient's timezone
  - Random delay: 60-180 seconds between emails
  - Never send on weekends or bank holidays

- [ ] **Custom tracking domain** (set up in Phase 0)
- [ ] **Enable open tracking** (for data) but **disable link tracking** (hurts deliverability for cold email)
- [ ] **Reply handling:**
  - Auto-detect out-of-office → pause sequence
  - Auto-detect "unsubscribe" → remove from list
  - Positive replies → alert to Rajnish (Slack/email notification)

### A/B Testing

- [ ] **Test 2 subject lines per sequence** (split 50/50)
- [ ] **Test 2 opening lines** (personalised vs direct question)
- [ ] **Run each variant on 100+ prospects** before declaring a winner
- [ ] **Kill losing variants after 200 sends** — double down on winners

---

## Phase 4: Tracking & Monitoring

### Daily Dashboard (check every morning)

| Metric | Target | Red Flag |
|---|---|---|
| **Open rate** | >50% | <30% = subject line or deliverability problem |
| **Reply rate** | 3-8% | <1% = messaging problem |
| **Positive reply rate** | 1-3% | <0.5% = ICP or value prop problem |
| **Bounce rate** | <2% | >3% = list quality problem |
| **Unsubscribe rate** | <1% | >2% = you're annoying people |
| **Spam complaints** | 0 | ANY = stop sending from that mailbox immediately |
| **Inbox placement** | >95% | <90% = deliverability crisis |

### Weekly Review (Friday)

- [ ] Total emails sent this week
- [ ] Total replies (positive / neutral / negative)
- [ ] Meetings booked this week
- [ ] Pipeline value generated
- [ ] Best-performing sequence + subject line
- [ ] Worst-performing segment (pause or re-angle)
- [ ] New prospects added to lists
- [ ] Prospects moved to MarketingContact DB (warm leads)

### Monthly Review

- [ ] Total meetings booked
- [ ] Meeting → opportunity conversion rate
- [ ] Cost per meeting (domain + tools + time)
- [ ] Revenue influenced by outbound
- [ ] ICP refinement based on who actually replied

### Tool Stack Costs

| Tool | Cost/month | Purpose |
|---|---|---|
| **Apollo** | $49-99 | Prospecting + data |
| **Clay** | $149-349 | Enrichment + AI personalisation |
| **Instantly** | $30-97 | Email sending + warmup |
| **Google Workspace** | ~$90 (15 users × $6) | Sending mailboxes |
| **Domains** | ~$5/mo (amortised) | Secondary domains |
| **ZeroBounce** | $0-16 | Email verification |
| **TOTAL** | **~$350-650/mo** | |

---

## Phase 5: Response Handling & Pipeline

### Response Categories

```
POSITIVE REPLY (1-3% of sends)
├── "Sure, let's chat"  → Book Cal.com immediately
├── "Send more info"    → Send deck + book follow-up
└── "Interesting, not now" → Add to nurture (MarketingContact)

NEUTRAL REPLY (1-2%)
├── "Who are you?"      → Brief re-intro + value prop
├── "Not the right person" → Ask for referral to correct person
└── "Out of office"     → Auto-pause, retry in 2 weeks

NEGATIVE REPLY (1-3%)
├── "Not interested"    → Thank them, remove from list
├── "Unsubscribe"       → Remove immediately + add to suppression
└── "Stop emailing me"  → Remove immediately + add to suppression
```

### Lead Handoff to Marketing DB

When a cold prospect replies positively:

```
Apollo prospect → Positive reply → 
  promoteProspect.js → MarketingContact DB → 
    Brevo (warm nurture) + ProductUserBridge (if they sign up)
```

- [ ] Configure `promoteProspect.js` trigger on positive Instantly replies
- [ ] Map Instantly reply webhook → your API endpoint

---

## Phase 6: Compliance

### Must-Have in Every Email

- [ ] **Unsubscribe line** (bottom of every email):
  ```
  PS — If this isn't relevant, just reply "remove" and I'll take you off the list.
  ```
- [ ] **Company identifier** (in signature):
  ```
  Precogs | London, UK
  ```

### GDPR (UK/EU prospects)

- [ ] **Legal basis**: Legitimate interest (B2B outreach to professional contacts)
- [ ] **Data retention**: Remove non-responders after 90 days
- [ ] **Right to erasure**: Honour any "delete my data" request within 72h
- [ ] **Suppression list**: Maintain a global suppression list — never re-contact

### CAN-SPAM (US prospects)

- [ ] Physical address in email (can use a registered agent)
- [ ] Clear identification as marketing communication
- [ ] Working opt-out mechanism
- [ ] Honour opt-outs within 10 business days

---

## Phase 7: Scaling Playbook

### Week-by-Week Ramp

```
WEEK 1-2:   Warmup only. Build lists. Write sequences. Test nothing.
WEEK 3:     Start sending — 20/day per mailbox (300/day total)
            Sequence A only, UK Fintech CISOs segment
WEEK 4:     Analyse Week 3 results. A/B test subject lines.
            Add Sequence B for VP Eng segment.
WEEK 5-6:   Scale to 40/day per mailbox (600/day total)
            Add EMEA segments. Add competitor displacement sequence.
WEEK 7-8:   Scale to 50/day per mailbox (750/day total)
            Add US segments. Start Sequence C.
MONTH 3+:   Buy 2 more domains. Add 6 more mailboxes.
            Scale to 1000+/day. Hire SDR to handle replies.
```

### When to Add More Domains

- When each mailbox is consistently sending 50/day
- When you need more sending capacity
- Buy 2 domains at a time, 3 mailboxes each
- Start warmup immediately — always have domains warming in the background

---

## Quick Reference: What Goes Where

| Tool | What it does | Data flows to |
|---|---|---|
| **Apollo** | Find prospects (email, title, company) | → Clay |
| **Clay** | Enrich (tech stack, funding, AI personalisation) | → Instantly |
| **Instantly** | Send cold emails, manage sequences, warmup | → Your API (webhook on reply) |
| **Your API** | `promoteProspect.js` on positive reply | → MarketingContact DB |
| **Brevo** | Warm email (newsletters, product updates) | ← MarketingContact DB |
| **OutboundProspect DB** | Store all cold prospects | ← Apollo/Clay imports |

> [!WARNING]
> **Never mix cold and warm.** Apollo/Instantly prospects go into `OutboundProspect`. Only after positive engagement do they get promoted to `MarketingContact` and into Brevo. This protects your Brevo sender reputation.

---

## Pre-Launch Checklist (Print This)

### Infrastructure ✅
- [ ] 3-5 secondary domains purchased
- [ ] 3 Google Workspace mailboxes per domain
- [ ] SPF + DKIM + DMARC configured on ALL domains
- [ ] Custom tracking domain in Instantly
- [ ] Profile pictures + signatures on all accounts
- [ ] Warmup running for 14+ days
- [ ] Inbox placement >95% on all mailboxes

### Lists ✅
- [ ] Apollo saved searches created for 4 ICP segments
- [ ] 500+ prospects per segment exported
- [ ] Clay enrichment completed (tech stack, funding, personalisation)
- [ ] Emails verified (<2% bounce expected)
- [ ] Deduplicated against existing customers/warm contacts
- [ ] Imported into OutboundProspect DB

### Messaging ✅
- [ ] 3 sequences written (false positives, AI code security, competitor displacement)
- [ ] 4 emails per sequence (Day 0, 3, 7, 12)
- [ ] A/B subject lines for each sequence
- [ ] Clay personalisation variables mapped to Instantly merge tags
- [ ] Unsubscribe line in every email
- [ ] All emails <80 words, plain text, one CTA

### Instantly ✅
- [ ] All mailboxes connected
- [ ] Sending limits set (20/day initially)
- [ ] Schedule: Mon-Thu, 8-11 AM recipient timezone
- [ ] Reply detection enabled
- [ ] Positive reply → Slack/email notification

### Tracking ✅
- [ ] Daily dashboard routine established
- [ ] Weekly review meeting on calendar
- [ ] Response handling process documented
- [ ] Suppression list created
- [ ] promoteProspect.js webhook configured
