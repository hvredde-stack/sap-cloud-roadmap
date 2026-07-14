const STORAGE_KEY = "sap-cloud-tracker-v1";
const LINKS_KEY = "sap-cloud-links-v1";
const STATUSES = ["to-learn", "learning", "know"];
const STATUS_LABELS = { know: "Know it", learning: "Learning", "to-learn": "To learn" };

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

let state = loadJSON(STORAGE_KEY, {});
let userLinks = loadJSON(LINKS_KEY, {});

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function saveLinks() { localStorage.setItem(LINKS_KEY, JSON.stringify(userLinks)); }

function getStatus(skillId) {
  return state[skillId] || "to-learn";
}

function setStatus(skillId, status) {
  state[skillId] = status;
  saveState();
  renderAll();
}

function getUserLinks(skillId) {
  return Array.isArray(userLinks[skillId]) ? userLinks[skillId] : [];
}

function addUserLink(skillId, label, url) {
  if (!userLinks[skillId]) userLinks[skillId] = [];
  userLinks[skillId].push({ label, url });
  saveLinks();
  renderAll();
}

function removeUserLink(skillId, index) {
  if (!userLinks[skillId]) return;
  userLinks[skillId].splice(index, 1);
  if (!userLinks[skillId].length) delete userLinks[skillId];
  saveLinks();
  renderAll();
}

function normalizeUrl(raw) {
  let url = raw.trim();
  if (!url) return null;
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    new URL(url);
    return url;
  } catch (e) {
    return null;
  }
}

function allSkills() {
  return ROADMAP.flatMap((p) => p.skills);
}

function counts() {
  const c = { know: 0, learning: 0, "to-learn": 0 };
  allSkills().forEach((s) => c[getStatus(s.id)]++);
  return c;
}

// ---------- Tabs ----------
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    window.scrollTo({ top: 0 });
  });
});

// ---------- Links row (curated + user links, optional editing) ----------
// Built with createElement/textContent (not innerHTML) so user-entered
// labels/URLs can't inject markup.
function buildLinksRow(skill, editable) {
  const curated = skill.links || [];
  const mine = getUserLinks(skill.id);
  if (!curated.length && !mine.length && !editable) return null;

  const row = document.createElement("div");
  row.className = "links-row";

  curated.forEach((l) => {
    const a = document.createElement("a");
    a.className = "link-chip";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = l.label + " ↗";
    row.appendChild(a);
  });

  mine.forEach((l, idx) => {
    const a = document.createElement("a");
    a.className = "link-chip user";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = l.label + " ↗";
    if (editable) {
      const x = document.createElement("button");
      x.className = "chip-x";
      x.textContent = "×";
      x.title = "Remove this link";
      x.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeUserLink(skill.id, idx);
      });
      a.appendChild(x);
    }
    row.appendChild(a);
  });

  if (editable) {
    const addBtn = document.createElement("button");
    addBtn.className = "link-add-btn";
    addBtn.textContent = "+ Add link";
    addBtn.addEventListener("click", () => {
      addBtn.replaceWith(buildLinkForm(skill, row));
    });
    row.appendChild(addBtn);
  }

  return row;
}

function buildLinkForm(skill, row) {
  const form = document.createElement("div");
  form.className = "link-form";

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.placeholder = "https://…";

  const labelInput = document.createElement("input");
  labelInput.type = "text";
  labelInput.placeholder = "Label (optional)";

  const save = document.createElement("button");
  save.className = "link-form-btn save";
  save.textContent = "Save";

  const cancel = document.createElement("button");
  cancel.className = "link-form-btn";
  cancel.textContent = "Cancel";

  function submit() {
    const url = normalizeUrl(urlInput.value);
    if (!url) {
      urlInput.classList.add("invalid");
      urlInput.focus();
      return;
    }
    let label = labelInput.value.trim();
    if (!label) {
      try { label = new URL(url).hostname.replace(/^www\./, ""); } catch (e) { label = url; }
    }
    addUserLink(skill.id, label, url);
  }

  save.addEventListener("click", submit);
  urlInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  labelInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  cancel.addEventListener("click", () => renderAll());

  form.append(urlInput, labelInput, save, cancel);
  setTimeout(() => urlInput.focus(), 0);
  return form;
}

// ---------- Shared: phase card shell ----------
function phaseCardShell(phase, index, { numbered }) {
  const total = phase.skills.length;
  const done = phase.skills.filter((s) => getStatus(s.id) === "know").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const card = document.createElement("div");
  card.className = "phase-card glass";
  card.innerHTML = `
    ${numbered ? `<div class="phase-num">${index + 1}</div>` : ""}
    <div class="phase-head" data-toggle>
      <div class="phase-title-wrap">
        <span class="phase-tagline">${phase.tagline}</span>
        <h3>${phase.title}</h3>
        <p>${phase.blurb}</p>
      </div>
      <div class="phase-progress">
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <span class="phase-progress-label">${done}/${total}</span>
        <span class="chevron">&#9660;</span>
      </div>
    </div>
    <div class="skill-list"></div>
  `;
  card.querySelector("[data-toggle]").addEventListener("click", (e) => {
    if (e.target.closest(".status-seg")) return;
    card.classList.toggle("collapsed");
  });
  return card;
}

// ---------- Roadmap (read view: notes + links + status badge) ----------
function renderRoadmap() {
  const container = document.getElementById("roadmap-list");
  container.innerHTML = "";
  ROADMAP.forEach((phase, i) => {
    const card = phaseCardShell(phase, i, { numbered: true });
    const list = card.querySelector(".skill-list");
    phase.skills.forEach((s) => {
      const st = getStatus(s.id);
      const row = document.createElement("div");
      row.className = "skill-row";

      const main = document.createElement("div");
      main.className = "skill-main";
      main.innerHTML = `
        <div class="skill-title"><span class="status-dot ${st}"></span>${s.title}</div>
        <div class="skill-note">${s.note}</div>
      `;
      const links = buildLinksRow(s, false);
      if (links) main.appendChild(links);

      const badge = document.createElement("span");
      badge.className = `status-badge ${st}`;
      badge.textContent = STATUS_LABELS[st];

      row.append(main, badge);
      list.appendChild(row);
    });
    container.appendChild(card);
  });

  // hero stats
  const c = counts();
  const total = allSkills().length;
  document.getElementById("stat-skills").textContent = total;
  document.getElementById("stat-pct").textContent = total ? Math.round((c.know / total) * 100) : 0;
}

// ---------- Tracker (edit view: segmented pills + editable links) ----------
function renderTracker() {
  const container = document.getElementById("tracker-list");
  const searchTerm = document.getElementById("search").value.trim().toLowerCase();
  const filterStatus = document.getElementById("filter-status").value;

  container.innerHTML = "";

  ROADMAP.forEach((phase, i) => {
    const visibleSkills = phase.skills.filter((s) => {
      const matchesSearch =
        !searchTerm ||
        s.title.toLowerCase().includes(searchTerm) ||
        s.note.toLowerCase().includes(searchTerm);
      const matchesStatus = filterStatus === "all" || getStatus(s.id) === filterStatus;
      return matchesSearch && matchesStatus;
    });
    if (!visibleSkills.length) return;

    const card = phaseCardShell(phase, i, { numbered: false });
    const list = card.querySelector(".skill-list");

    visibleSkills.forEach((s) => {
      const st = getStatus(s.id);
      const row = document.createElement("div");
      row.className = "skill-row";

      const main = document.createElement("div");
      main.className = "skill-main";
      main.innerHTML = `
        <div class="skill-title"><span class="status-dot ${st}"></span>${s.title}</div>
        <div class="skill-note">${s.note}</div>
      `;
      const links = buildLinksRow(s, true);
      if (links) main.appendChild(links);

      const seg = document.createElement("div");
      seg.className = "status-seg";
      STATUSES.forEach((status) => {
        const b = document.createElement("button");
        b.className = "seg-btn" + (st === status ? ` active-${status}` : "");
        b.textContent = STATUS_LABELS[status];
        b.addEventListener("click", () => setStatus(s.id, status));
        seg.appendChild(b);
      });

      row.append(main, seg);
      list.appendChild(row);
    });

    container.appendChild(card);
  });

  renderDashboard();
}

// ---------- Dashboard (ring, counts, next up) ----------
function renderDashboard() {
  const c = counts();
  const total = allSkills().length;
  const pct = total ? Math.round((c.know / total) * 100) : 0;

  const ring = document.getElementById("ring");
  ring.style.background = `conic-gradient(#3230d6 ${pct}%, rgba(28,31,74,.1) ${pct}%)`;
  document.getElementById("ring-pct").textContent = pct + "%";

  document.getElementById("count-know").textContent = c.know;
  document.getElementById("count-learning").textContent = c.learning;
  document.getElementById("count-to-learn").textContent = c["to-learn"];

  // Next up: first "learning" skill, else first "to-learn" skill, in roadmap order.
  const nextUp = document.getElementById("next-up");
  const inProgress = allSkills().find((s) => getStatus(s.id) === "learning");
  const notStarted = allSkills().find((s) => getStatus(s.id) === "to-learn");
  if (pct === 100) {
    nextUp.innerHTML = `<span class="next-label">Done —</span> you've marked every skill as known. Time to update the resume. 🎉`;
  } else if (inProgress) {
    nextUp.innerHTML = `<span class="next-label">Keep going:</span> you're currently learning <b>${inProgress.title}</b>.`;
  } else if (notStarted) {
    const phase = ROADMAP.find((p) => p.skills.some((s) => s.id === notStarted.id));
    nextUp.innerHTML = `<span class="next-label">Next up:</span> start with <b>${notStarted.title}</b> in ${phase.title}.`;
  } else {
    nextUp.innerHTML = "";
  }
}

function renderAll() {
  renderRoadmap();
  renderTracker();
}

// ---------- Controls ----------
document.getElementById("search").addEventListener("input", renderTracker);
document.getElementById("filter-status").addEventListener("change", renderTracker);

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reset all tracked progress and your custom links? This cannot be undone.")) {
    state = {};
    userLinks = {};
    saveState();
    saveLinks();
    renderAll();
  }
});

document.getElementById("export-btn").addEventListener("click", () => {
  const backup = { version: 2, progress: state, links: userLinks };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sap-cloud-tracker-backup.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("import-btn").addEventListener("click", () => {
  document.getElementById("import-file").click();
});

document.getElementById("import-file").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (parsed && typeof parsed === "object" && parsed.progress) {
        // v2 backup: progress + links
        state = parsed.progress || {};
        userLinks = parsed.links || {};
      } else {
        // v1 backup: progress only
        state = parsed || {};
      }
      saveState();
      saveLinks();
      renderAll();
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

renderAll();
