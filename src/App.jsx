import { useState } from "react";

const PRICES = {
  night: 120,
  day: 45,
  apero: 0,
};

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mode, setMode] = useState("night");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [email, setEmail] = useState("");

  const t = {
    fr: {
      title: "Maison à Marcq-en-Barœul",
      subtitle: "Mini Airbnb entre copains (version pro dispo)",
      desc:
        "Maison lumineuse et chaleureuse, parfaite pour une nuit de passage, une journée de télétravail inspirée ou un apéro convivial. Wi-Fi rapide, grande table, salon cosy, café garanti.",
      hosts:
        "Brune & Jojo vous accueillent, accompagnés de Baptiste, Claire et Paul (experts en désordre créatif).",
      access:
        "📍 Marcq-en-Barœul · 🚗 Parking facile · 📶 Wi-Fi rapide · 🚆 15–20 min de Lille",
      night: "🌙 Nuitée",
      day: "💻 Télétravail (journée)",
      apero: "🍻 Apéro",
      choose: "Choisissez votre formule",
      checkIn: "Arrivée",
      checkOut: "Départ",
      total: "Total estimé",
      nights: "nuits",
      days: "jours",
      send: "Envoyer la demande",
      price: "Tarif"
    },
    en: {
      title: "House in Marcq-en-Barœul",
      subtitle: "Mini Airbnb for friends (pro pricing available)",
      desc:
        "Bright and cosy house for a short stay, a productive remote-work day or a friendly afterwork. Fast Wi-Fi, large table, cosy living room, coffee guaranteed.",
      hosts:
        "Hosted by Brune & Jojo, with Baptiste, Claire and Paul (creative mess experts).",
      access:
        "📍 Marcq-en-Barœul · 🚗 Easy parking · 📶 Fast Wi-Fi · 🚆 15–20 min from Lille",
      night: "🌙 Overnight",
      day: "💻 Remote work (day)",
      apero: "🍻 Afterwork",
      choose: "Choose your option",
      checkIn: "Check-in",
      checkOut: "Check-out",
      total: "Estimated total",
      nights: "nights",
      days: "days",
      send: "Send request",
      price: "Price"
    }
  }[lang];

  const diffDays = () => {
    if (!checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const units = mode === "night" ? diffDays() : mode === "day" ? diffDays() || 1 : 1;
  const total = PRICES[mode] * units;

  const submit = () => {
    const subject = encodeURIComponent("Demande réservation – Maison Pommeret");
    const body = encodeURIComponent(
      `Option: ${mode}\nArrivée: ${checkIn}\nDépart: ${checkOut}\nUnités: ${units}\nTotal estimé: ${total} €\nEmail: ${email}`
    );
    window.location.href = `mailto:famille@pommeret.eu?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{ fontFamily: "system-ui", background: "#f4f6fb", minHeight: "100vh", paddingBottom: 40 }}>
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

        {/* Description */}
        <Card><p>{t.desc}</p></Card>
        <Card><strong>Vos hôtes</strong><p>{t.hosts}</p></Card>
        <Card><strong>Accès</strong><p>{t.access}</p></Card>

        {/* Choix formule */}
        <Card>
          <strong>{t.choose}</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <button onClick={() => setMode("night")} style={btn(mode === "night")}>{t.night} – {PRICES.night}€/{t.nights}</button>
            <button onClick={() => setMode("day")} style={btn(mode === "day")}>{t.day} – {PRICES.day}€/{t.days}</button>
            <button onClick={() => setMode("apero")} style={btn(mode === "apero")}>{t.apero}</button>
          </div>
        </Card>

        {/* Calendrier */}
        <Card>
          <label>{t.checkIn}</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={input} />
          <label style={{ marginTop: 6 }}>{t.checkOut}</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={input} />
          <p style={{ marginTop: 8 }}>
            {units} {mode === "night" ? t.nights : t.days} × {PRICES[mode]} € = <strong>{total} €</strong>
          </p>
        </Card>

        {/* Réservation */}
        <Card>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
          <button onClick={submit} style={btnPrimary}>{t.send}</button>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ children }) => (
  <div style={{
    background: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
  }}>
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
  marginTop: 10,
  padding: "10px 14px",
  width: "100%",
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
  marginTop: 6,
  borderRadius: 10,
  border: "1px solid #ddd"
};
