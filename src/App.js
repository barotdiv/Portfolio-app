import { useState, useEffect } from "react";

const defaultData = {
  name: "Alexandra Chen",
  title: "Creative Designer & Developer",
  bio: "I craft beautiful digital experiences at the intersection of art and technology. Passionate about clean code, thoughtful design, and making the web a more beautiful place.",
  location: "San Francisco, CA",
  email: "alex@example.com",
  website: "alexchen.dev",
  avatar: "",
  skills: ["UI/UX Design", "React", "Figma", "Node.js", "Typography"],
  projects: [
    { title: "Luminary Dashboard", desc: "A data visualization platform for creative studios.", tag: "Design · React" },
    { title: "Folio CMS", desc: "Headless content management built for designers.", tag: "Full-Stack" },
  ],
  socials: { github: "", linkedin: "", twitter: "", dribbble: "" },
  accentColor: "#c47c5a",
  theme: "light",
};

const TABS = ["Profile", "Skills", "Projects", "Social"];

const inputClass = `w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 
  placeholder-stone-400 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all`;

function PortfolioBuilder() {
  const [data, setData] = useState(defaultData);
  const [tab, setTab] = useState("Profile");
  const [skillInput, setSkillInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const accent = data.accentColor;

  function update(key, val) {
    setData(d => ({ ...d, [key]: val }));
  }

  function updateProject(i, key, val) {
    const updated = [...data.projects];
    updated[i] = { ...updated[i], [key]: val };
    update("projects", updated);
  }

  function addProject() {
    update("projects", [...data.projects, { title: "", desc: "", tag: "" }]);
  }

  function removeProject(i) {
    update("projects", data.projects.filter((_, idx) => idx !== i));
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !data.skills.includes(s)) {
      update("skills", [...data.skills, s]);
      setSkillInput("");
    }
  }

  function removeSkill(s) {
    update("skills", data.skills.filter(x => x !== s));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initials = data.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ "--accent": accent, "--accent-light": accent + "22", fontFamily: "'Georgia', serif" }}
      className="min-h-screen bg-stone-50 flex flex-col">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Cormorant Garamond', Georgia, serif; }
        .tab-active { background: var(--accent); color: white; }
        .pill { background: var(--accent-light); color: var(--accent); }
        .preview-card { background: white; }
        input[type=color] { border: none; padding: 0; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; }
        input[type=color]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type=color]::-webkit-color-swatch { border: none; border-radius: 50%; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .skill-chip:hover .remove-btn { opacity: 1; }
        .remove-btn { opacity: 0; transition: opacity 0.15s; }
      `}</style>

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-stone-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium"
            style={{ background: accent }}>P</div>
          <span className="text-sm font-medium text-stone-700 tracking-wide">Portfolio Builder</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreviewMode(m => !m)}
            className="text-xs px-4 py-2 rounded-full border border-stone-300 text-stone-600 hover:border-stone-400 transition-all">
            {previewMode ? "← Edit" : "Preview →"}
          </button>
          <button onClick={handleSave}
            className="text-xs px-4 py-2 rounded-full text-white transition-all"
            style={{ background: accent }}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>

        {/* ─── EDITOR PANEL ─── */}
        {!previewMode && (
          <div className="w-full lg:w-[420px] flex-shrink-0 overflow-y-auto bg-stone-50 border-r border-stone-200 p-6">

            {/* Tab nav */}
            <div className="flex gap-1.5 mb-6 bg-stone-100 p-1 rounded-2xl">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 text-xs py-2 rounded-xl font-medium transition-all ${tab === t ? "tab-active shadow-sm" : "text-stone-500 hover:text-stone-700"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="fade-in" key={tab}>

              {/* PROFILE TAB */}
              {tab === "Profile" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Full Name</label>
                    <input className={inputClass} value={data.name} placeholder="Your full name"
                      onChange={e => update("name", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Professional Title</label>
                    <input className={inputClass} value={data.title} placeholder="e.g. Product Designer"
                      onChange={e => update("title", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Bio</label>
                    <textarea className={`${inputClass} resize-none`} rows={4} value={data.bio}
                      placeholder="Tell the world about yourself..."
                      onChange={e => update("bio", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Location</label>
                      <input className={inputClass} value={data.location} placeholder="City, Country"
                        onChange={e => update("location", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Email</label>
                      <input className={inputClass} value={data.email} placeholder="you@email.com"
                        onChange={e => update("email", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Avatar URL</label>
                    <input className={inputClass} value={data.avatar} placeholder="https://..."
                      onChange={e => update("avatar", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Website</label>
                    <input className={inputClass} value={data.website} placeholder="yoursite.com"
                      onChange={e => update("website", e.target.value)} />
                  </div>

                  {/* Accent color */}
                  <div className="pt-2 border-t border-stone-200">
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-3 block">Accent Color</label>
                    <div className="flex items-center gap-3 flex-wrap">
                      {["#c47c5a", "#6b8f71", "#5a7ec4", "#9b6bc4", "#c45a7e", "#c4a55a"].map(c => (
                        <button key={c} onClick={() => update("accentColor", c)}
                          className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${data.accentColor === c ? "ring-2 ring-offset-2 ring-stone-400 scale-110" : ""}`}
                          style={{ background: c }} />
                      ))}
                      <input type="color" value={data.accentColor}
                        onChange={e => update("accentColor", e.target.value)}
                        title="Custom color" />
                    </div>
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {tab === "Skills" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">Add a Skill</label>
                    <div className="flex gap-2">
                      <input className={inputClass} value={skillInput}
                        placeholder="e.g. Motion Design"
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addSkill()} />
                      <button onClick={addSkill}
                        className="px-4 py-2.5 rounded-xl text-sm text-white font-medium flex-shrink-0 transition-opacity hover:opacity-80"
                        style={{ background: accent }}>Add</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills.map(s => (
                      <div key={s} className="skill-chip pill px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all">
                        <span>{s}</span>
                        <button className="remove-btn text-current opacity-60 hover:opacity-100 text-xs"
                          onClick={() => removeSkill(s)}>✕</button>
                      </div>
                    ))}
                    {data.skills.length === 0 && (
                      <p className="text-stone-400 text-sm italic">No skills added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {tab === "Projects" && (
                <div className="space-y-4">
                  {data.projects.map((p, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">Project {i + 1}</span>
                        <button onClick={() => removeProject(i)} className="text-xs text-stone-400 hover:text-red-400 transition-colors">Remove</button>
                      </div>
                      <input className={inputClass} value={p.title} placeholder="Project title"
                        onChange={e => updateProject(i, "title", e.target.value)} />
                      <textarea className={`${inputClass} resize-none`} rows={2} value={p.desc}
                        placeholder="Brief description..."
                        onChange={e => updateProject(i, "desc", e.target.value)} />
                      <input className={inputClass} value={p.tag} placeholder="Tags (e.g. React · Design)"
                        onChange={e => updateProject(i, "tag", e.target.value)} />
                    </div>
                  ))}
                  <button onClick={addProject}
                    className="w-full py-3 rounded-2xl border-2 border-dashed border-stone-200 text-sm text-stone-400 hover:border-stone-300 hover:text-stone-500 transition-all">
                    + Add Project
                  </button>
                </div>
              )}

              {/* SOCIAL TAB */}
              {tab === "Social" && (
                <div className="space-y-4">
                  {[
                    { key: "github", label: "GitHub", placeholder: "github.com/username", icon: "GH" },
                    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/you", icon: "LI" },
                    { key: "twitter", label: "Twitter / X", placeholder: "twitter.com/you", icon: "TW" },
                    { key: "dribbble", label: "Dribbble", placeholder: "dribbble.com/you", icon: "DR" },
                  ].map(({ key, label, placeholder, icon }) => (
                    <div key={key}>
                      <label className="text-xs text-stone-500 uppercase tracking-widest mb-1.5 block">{label}</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">{icon}</span>
                        <input className={`${inputClass} pl-10`} value={data.socials[key]}
                          placeholder={placeholder}
                          onChange={e => update("socials", { ...data.socials, [key]: e.target.value })} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── PREVIEW PANEL ─── */}
        <div className={`flex-1 overflow-y-auto ${previewMode ? "w-full" : "hidden lg:block"}`}
          style={{ background: "#faf9f7" }}>

          <div className="max-w-2xl mx-auto py-12 px-6 fade-in" key={JSON.stringify(data)}>

            {/* Hero section */}
            <div className="preview-card rounded-3xl overflow-hidden shadow-sm border border-stone-100 mb-6">

              {/* Header gradient strip */}
              <div className="h-24 relative" style={{
                background: `linear-gradient(135deg, ${accent}33 0%, ${accent}11 100%)`,
                borderBottom: `1px solid ${accent}22`
              }}>
                <div className="absolute inset-0"
                  style={{ backgroundImage: `radial-gradient(circle at 80% 50%, ${accent}22 0%, transparent 70%)` }} />
              </div>

              <div className="px-8 pb-8 -mt-12 relative">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md overflow-hidden mb-4 bg-stone-100 flex items-center justify-center"
                  style={{ borderColor: "white" }}>
                  {data.avatar
                    ? <img src={data.avatar} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                    : <span className="display-font text-2xl font-semibold" style={{ color: accent }}>{initials || "?"}</span>
                  }
                </div>

                <h1 className="display-font text-4xl font-semibold text-stone-900 leading-tight mb-1">
                  {data.name || "Your Name"}
                </h1>
                <p className="text-sm font-medium mb-4" style={{ color: accent }}>
                  {data.title || "Your Title"}
                </p>
                <p className="text-stone-600 text-sm leading-relaxed max-w-lg mb-6">
                  {data.bio || "Your bio will appear here."}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-stone-500">
                  {data.location && (
                    <span className="flex items-center gap-1.5">
                      <span style={{ color: accent }}>◉</span> {data.location}
                    </span>
                  )}
                  {data.email && (
                    <span className="flex items-center gap-1.5">
                      <span style={{ color: accent }}>✉</span> {data.email}
                    </span>
                  )}
                  {data.website && (
                    <span className="flex items-center gap-1.5">
                      <span style={{ color: accent }}>⊕</span> {data.website}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="preview-card rounded-3xl p-7 shadow-sm border border-stone-100 mb-6">
                <h2 className="display-font text-xl font-semibold text-stone-800 mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(s => (
                    <span key={s} className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ background: `${accent}18`, color: accent }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects.filter(p => p.title).length > 0 && (
              <div className="preview-card rounded-3xl p-7 shadow-sm border border-stone-100 mb-6">
                <h2 className="display-font text-xl font-semibold text-stone-800 mb-5">Selected Work</h2>
                <div className="space-y-4">
                  {data.projects.filter(p => p.title).map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-stone-50 group border border-transparent hover:border-stone-100">
                      <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}bb 100%)` }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-stone-800 text-sm">{p.title}</span>
                          {p.tag && (
                            <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                              style={{ background: `${accent}15`, color: accent }}>
                              {p.tag}
                            </span>
                          )}
                        </div>
                        {p.desc && <p className="text-xs text-stone-500 mt-1 leading-relaxed">{p.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Socials */}
            {Object.values(data.socials).some(Boolean) && (
              <div className="preview-card rounded-3xl p-7 shadow-sm border border-stone-100">
                <h2 className="display-font text-xl font-semibold text-stone-800 mb-4">Connect</h2>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(data.socials).filter(([, v]) => v).map(([k, v]) => (
                    <a key={k} href={v.startsWith("http") ? v : `https://${v}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-stone-200 text-stone-700 hover:border-current transition-all"
                      style={{ "--hover-color": accent }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}>
                      <span className="text-xs font-bold uppercase tracking-wide opacity-50">{k.slice(0, 2).toUpperCase()}</span>
                      {k.charAt(0).toUpperCase() + k.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-xs text-stone-300 mt-8">Built with Portfolio Builder</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PortfolioBuilder;