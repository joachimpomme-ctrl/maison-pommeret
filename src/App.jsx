import { useMemo, useState } from "react";

const PRICES = { night: 120, day: 45, apero: 0 };

function startOfMonth(d) {
  const x = new Date(d);
  x.setDate(1);
  return x;
}
function addMonths(d, n) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}
function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}
function sameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString();
}
function isBetween(d, a, b) {
  if (!a || !b) return false;
  const t = d.getTime();
  return t >= a.getTime() && t <= b.getTime();
}
function diffNights(a, b) {
  if (!a || !b) return 0;
  const ms = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(0, ms);
}

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mode, setMode] = useState("night");
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [email, setEmail] = useState("");

  const t = {
    fr: {
      title: "Maison à Marcq-en-Barœul",
      subtitle: "Mini Airbnb entre copains — V4",
      desc:
        "Maison lumineuse et chaleureuse pour une nuit, une journée de télétravail ou un apéro convivial. Wi-Fi rapide, grande table, salon cosy, café garanti.",
      hosts:
        "Brune & Jojo vous accueillent, avec Baptiste, Claire et Paul (experts en désordre créatif).",
      access: "📍 Marcq-en-Barœul · 🚗 Parking facile · 📶 Wi-Fi rapide · 🚆 15–20 min de Lille",
      night: "🌙 Nuitée",
      day: "💻 Télétravail (journée)",
      apero: "🍻 Apéro",
      choose: "Choisissez votre formule",
      nights: "nuits",
      days: "jours",
      reserve: "Envoyer la demande",
      total: "Total estimé",
      monthPrev: "◀",
      monthNext: "▶",
    },
    en: {
      title: "House in Marcq-en-Barœul",
      subtitle: "Mini Airbnb for friends — V4",
      desc:
        "Bright and cosy house for an overnight stay, a remote-work day or a friendly afterwork. Fast Wi-Fi, large table, cosy living room, coffee guaranteed.",
      hosts:
        "Hosted by Brune & Jojo with Baptiste, Claire and Paul (creative mess experts).",
      access: "📍 Marcq-en-Barœul · 🚗 Easy parking · 📶 Fast Wi-Fi · 🚆 15–20 min from Lille",
      night: "🌙 Overnight",
      day: "💻 Remote work (day)",
      apero: "🍻 Afterwork",
      choose: "Choose your option",
      nights: "nights",
      days: "days",
      reserve: "Send request",
      total: "Estimated total",
      monthPrev: "◀",
      monthNext: "▶",
    }
  }[lang];

  const nights = diffNights(start, end);
  const units = mode === "night" ? nights : mode === "day" ? Math.max(1, nights || 1) : 1;
  const total = PRICES[mode] * units;

  const grid = useMemo(() => {
    const first = startOfMonth(month);
    const offset = (first.getDay() + 6) % 7; // Mon=0
    const dim = daysInMonth(month);
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= dim; d++) {
      const date = new Date(month.getFullYear(), month.getMonth(), d);
      cells.push(date);
    }
    return cells;
  }, [month]);

  const onPick = (d) => {
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
    } else if (d < start) {
      setStart(d);
    } else {
      setEnd(d);
    }
  };

  const submit = () => {
    const subject = encodeURIComponent("Demande réservation – Maison Pommeret");
    const body = encodeURIComponent(
      `Option: ${mode}\nDu: ${start?.toLocaleDateString()}\nAu: ${end?.toLocaleDateString()}\nUnités: ${units}\nTotal estimé: ${total} €\nEmail: ${email}`
    );
    window.location.href = `mailto:famille@pommeret.eu?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ fontFamily: "system-ui", background: "#f4f6fb", minHeight: "100vh", paddingBottom: 90 }}>
      <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>{t.title}</h1>
            <p style={{ marginTop: 4, color: "#666" }}>{t.subtitle}</p>
          </div>
          <div>
            <button onClick={() => setLang("fr")} style={btnSmall(lang === "fr")}>FR</button>
            <button onClick={() => setLang("en")} style={btnSmall(lang === "en")}>EN</button>
          </div>
        </div>

        {/* Photos */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "16px 0" }}>
          <img src="/images/cuisine.jpg" style={photo} />
          <img src="/images/salle-a-manger.jpg" style={photo} />
          <img src="/images/salon.jpg" style={photo} />
        </div>

        <Card><p>{t.desc}</p></Card>
        <Card><strong>Vos hôtes</strong><p>{t.hosts}</p></Card>
        <Card><strong>Accès</strong><p>{t.access}</p></Card>

        {/* Choix formule */}
        <Card>
          <strong>{t.choose}</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <button onClick={() => setMode("night")} style={btn(mode === "night")}>{t.night} — {PRICES.night}€/{t.nights}</button>
            <button onClick={() => setMode("day")} style={btn(mode === "day")}>{t.day} — {PRICES.day}€/{t.days}</button>
            <button onClick={() => setMode("apero")} style={btn(mode === "apero")}>{t.apero}</button>
          </div>
        </Card>

        {/* Calendrier */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setMonth(addMonths(month, -1))}>{t.monthPrev}</button>
            <strong>{month.toLocaleDateString(lang, { month: "long", year: "numeric" })}</strong>
            <button onClick={() => setMonth(addMonths(month, 1))}>{t.monthNext}</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginTop: 8 }}>
            {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 12, color: "#888" }}>{d}</div>
            ))}
            {grid.map((d, i) => (
              <button
                key={i}
                disabled={!d}
                onClick={() => d && onPick(d)}
                style={dayBtn(d, start, end)}
              >
                {d ? d.getDate() : ""}
              </button>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
        </Card>
      </div>

      {/* Sticky recap */}
      <div style={sticky}>
        <div>
          <div style={{ fontSize: 12, color: "#666" }}>{t.total}</div>
          <strong>{total} €</strong>
        </div>
        <button onClick={submit} style={btnPrimary}>{t.reserve}</button>
      </div>
    </div>
  );
}

const Card = ({ children }) => (
  <div style={{ background: "#fff", borderRadius: 16, padding: 14, marginBottom: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
    {children}
  </div>
);

const photo = { width: 120, height: 90, borderRadius: 12, objectFit: "cover", flexShrink: 0 };
const btn = (active) => ({
  padding: "8px 12px",
  borderRadius: 999,
  border: "none",
  background: active ? "#111" : "#eee",
  color: active ? "#fff" : "#111",
  cursor: "pointer"
});
const btnSmall = (active) => ({
  padding: "6px 10px",
  borderRadius: 999,
  border: "none",
  background: active ? "#111" : "#ddd",
  color: active ? "#fff" : "#111",
  marginLeft: 6,
  cursor: "pointer",
  fontSize: 12
});
const btnPrimary = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: 16,
  cursor: "pointer"
};
const input = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ddd"
};
const sticky = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#fff",
  borderTop: "1px solid #eee",
  padding: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
const dayBtn = (d, start, end) => ({
  height: 36,
  borderRadius: 10,
  border: "none",
  background: !d ? "transparent" : sameDay(d, start) || sameDay(d, end) ? "#111" : isBetween(d, start, end) ? "#ddd" : "#f2f2f2",
  color: sameDay(d, start) || sameDay(d, end) ? "#fff" : "#111",
  cursor: d ? "pointer" : "default"
});
