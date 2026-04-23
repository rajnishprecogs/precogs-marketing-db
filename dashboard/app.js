/* Precogs Outbound HQ — App Logic */

const SK = "precogs_outbound";
const AUTH_KEY = "precogs_auth";
// Simple team password — change this before hosting
const TEAM_PASS = "precogs2026";

// ─── Auth ─────────────────────────────────────────────────────────────────────
(function initAuth() {
  if (sessionStorage.getItem(AUTH_KEY)) return showApp();
  const app = document.querySelector(".app");
  app.style.display = "none";
  const login = document.createElement("div");
  login.className = "login-screen";
  login.innerHTML = `<div class="login-box"><h2>⚡ Precogs Outbound</h2><p>Enter team password to continue</p><div class="login-err" id="loginErr">Wrong password</div><input type="password" id="loginPass" placeholder="Password" autofocus><button class="btn-p" style="width:100%" onclick="doLogin()">Enter</button></div>`;
  document.body.prepend(login);
  login.querySelector("input").addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
})();

function doLogin() {
  const v = document.getElementById("loginPass").value;
  if (v === TEAM_PASS) {
    sessionStorage.setItem(AUTH_KEY, "1");
    document.querySelector(".login-screen").remove();
    showApp();
  } else {
    const err = document.getElementById("loginErr");
    err.style.display = "block";
    document.getElementById("loginPass").value = "";
  }
}

function showApp() {
  document.querySelector(".app").style.display = "block";
  init();
}

// ─── State ────────────────────────────────────────────────────────────────────
function getState() {
  const r = localStorage.getItem(SK);
  return r ? JSON.parse(r) : {
    daily: [],
    checks: { domain: [], product: [], comp: [] },
    mailboxes: [
      { email: "rajnish@getprecogs.com", domain: "getprecogs.com", day: 0, inbox: 0, status: "not started" },
      { email: "raj@getprecogs.com", domain: "getprecogs.com", day: 0, inbox: 0, status: "not started" },
      { email: "rajnish@precogs-security.com", domain: "precogs-security.com", day: 0, inbox: 0, status: "not started" },
    ],
    pipeline: { leads: 0, demos: 0, opportunities: 0, won: 0 },
  };
}
function save(s) { localStorage.setItem(SK, JSON.stringify(s)); }

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  document.getElementById("currentDate").textContent = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const now = new Date(), y = new Date(now.getFullYear(), 0, 1);
  document.getElementById("currentWeek").textContent = Math.ceil((((now - y) / 864e5) + y.getDay() + 1) / 7);

  // Tabs
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById("tab-" + t.dataset.tab).classList.add("active");
  }));

  const s = getState();
  renderAll(s);
  setupChecks(s);
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderAll(s) {
  renderKPIs(s);
  renderDaily(s);
  renderMailboxes(s);
  renderPipeline(s);
  renderCheckProg(s);
}

function renderKPIs(s) {
  const now = new Date(), ws = new Date(now); ws.setDate(now.getDate() - now.getDay());
  const wk = s.daily.filter(e => new Date(e.d) >= ws);
  const ts = wk.reduce((a, e) => a + (e.s || 0), 0);
  const to = wk.reduce((a, e) => a + (e.o || 0), 0);
  const tr = wk.reduce((a, e) => a + (e.r || 0), 0);
  const tp = s.daily.reduce((a, e) => a + (e.p || 0), 0);
  const tb = wk.reduce((a, e) => a + (e.b || 0), 0);
  const tm = wk.reduce((a, e) => a + (e.m || 0), 0);
  document.getElementById("totalSent").textContent = ts.toLocaleString();
  document.getElementById("openRate").textContent = ts ? Math.round(to / ts * 100) + "%" : "0%";
  document.getElementById("replyRate").textContent = ts ? (tr / ts * 100).toFixed(1) + "%" : "0%";
  document.getElementById("meetingsBooked").textContent = tm;
  document.getElementById("bounceRate").textContent = ts ? (tb / ts * 100).toFixed(1) + "%" : "0%";
  document.getElementById("positiveReplies").textContent = tp;
}

function renderDaily(s) {
  const b = document.getElementById("dailyBody");
  const sorted = [...s.daily].sort((a, c) => new Date(c.d) - new Date(a.d));
  if (!sorted.length) { b.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:20px">No entries yet — click "+ Add Entry"</td></tr>'; return; }
  b.innerHTML = sorted.map((e, i) => `<tr>
    <td>${new Date(e.d).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
    <td>${e.s}</td><td>${e.o} <small style="color:var(--muted)">(${e.s ? Math.round(e.o / e.s * 100) : 0}%)</small></td>
    <td>${e.r}</td><td style="color:var(--green)">${e.p}</td>
    <td style="color:${e.b > 0 ? 'var(--red)' : 'var(--muted)'}">${e.b}</td>
    <td style="color:var(--green);font-weight:600">${e.m}</td></tr>`).join("");
}

function renderMailboxes(s) {
  const b = document.getElementById("mailboxBody");
  b.innerHTML = s.mailboxes.map(m => {
    const ic = m.inbox >= 95 ? "good" : m.inbox >= 80 ? "" : "status-bad";
    const si = m.status === "active" ? "🟢" : m.status === "warming" ? "🟡" : "⚪";
    return `<tr><td>${m.email}</td><td>${m.domain}</td><td>${m.day}</td><td class="${ic}">${m.inbox}%</td><td>${si} ${m.status}</td></tr>`;
  }).join("");
}

function renderPipeline(s) {
  document.getElementById("pL").textContent = s.pipeline.leads;
  document.getElementById("pD").textContent = s.pipeline.demos;
  document.getElementById("pO").textContent = s.pipeline.opportunities;
  document.getElementById("pW").textContent = s.pipeline.won;
}

function renderCheckProg(s) {
  for (const g of ["domain", "product", "comp"]) {
    const cbs = document.querySelectorAll(`input[data-g="${g}"]`);
    const ids = s.checks[g] || [];
    let done = 0;
    cbs.forEach((cb, i) => { cb.checked = ids.includes(i); if (cb.checked) done++; });
    const el = document.getElementById(g + "Prog");
    if (el) {
      el.textContent = `${done}/${cbs.length}`;
      if (done === cbs.length && cbs.length) { el.style.background = "var(--green-lt)"; el.style.color = "var(--green)"; }
      else { el.style.background = "var(--accent-lt)"; el.style.color = "var(--accent)"; }
    }
  }
}

function setupChecks(s) {
  for (const g of ["domain", "product", "comp"]) {
    document.querySelectorAll(`input[data-g="${g}"]`).forEach((cb, i) => {
      cb.addEventListener("change", () => {
        if (!s.checks[g]) s.checks[g] = [];
        if (cb.checked) { if (!s.checks[g].includes(i)) s.checks[g].push(i); }
        else s.checks[g] = s.checks[g].filter(x => x !== i);
        save(s); renderCheckProg(s);
      });
    });
  }
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function addEntry() {
  document.getElementById("eDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("modal").classList.add("active");
}
function closeModal() { document.getElementById("modal").classList.remove("active"); }
function saveEntry(ev) {
  ev.preventDefault();
  const s = getState();
  s.daily.push({
    d: document.getElementById("eDate").value,
    s: +document.getElementById("eSent").value || 0,
    o: +document.getElementById("eOpens").value || 0,
    r: +document.getElementById("eReplies").value || 0,
    p: +document.getElementById("ePos").value || 0,
    b: +document.getElementById("eBounce").value || 0,
    m: +document.getElementById("eMeet").value || 0,
  });
  save(s); renderAll(s); closeModal();
}
function addMailbox() {
  const e = prompt("Mailbox email:");
  if (!e) return;
  const s = getState();
  s.mailboxes.push({ email: e, domain: e.split("@")[1] || "?", day: 0, inbox: 0, status: "not started" });
  save(s); renderMailboxes(s);
}
