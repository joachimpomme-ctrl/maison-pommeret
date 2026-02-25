import { useState } from "react";

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mode, setMode] = useState("night");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const t = {
    fr: {
      title: "Maison à Marcq-en-Barœul",
      subtitle: "Mini Airbnb entre copains",
      desc:
        "Maison lumineuse et chaleureuse, parfaite pour une nuit de passage, une journée de télétravail inspirée ou un apéro qui dérape gentiment. Wi-Fi rapide, grande table, salon cosy, café garanti.",
      hosts:
        "Brune & Jojo vous accueillent, accompagnés de leurs trois domestiques : Baptiste, Claire et Paul (experts en désordre créatif).",
      access:
        "📍 Marcq-en-Barœul · 🚗 Parking facile · 📶 Wi-Fi rapide · 🚆 15–20 min de Lille",
      night: "🌙 Nuitée (2 bières + apéro)",
      day: "💻 Télétravail (croissants + pizza)",
      apero: "🍻 Apéro (ramène un truc)",
      send: "Envoyer la demande",
      choose: "Choisis ton option"
    },
    en: {
      title: "House in Marcq-en-Barœul",
      subtitle: "Mini Airbnb for friends",
      desc:
        "Bright and cosy house for a short stay, a productive remote-work day or a friendly afterwork. Fast Wi-Fi, large table, cosy living room, coffee guaranteed.",
      hosts:
        "Hosted by Brune & Jojo, with their three assistants: Baptiste, Claire and Paul (creative mess experts).",
      access:
        "📍 Marcq-en-Barœul · 🚗 Easy parking · 📶 Fast Wi-Fi · 🚆 15–20 min from Lille",
      night: "🌙 Overnight (2 beers + snacks)",
      day: "💻 Remote work (croissants + pizza)",
      apero: "🍻 Afterwork (bring drinks)",
      send: "Send request",
      choose: "Choose your option"
    }
  }[lang];

  const submit = () => {
    const subject = encodeURIComponent("Demande maison Pommeret");
    const body = encodeURIComponent(
      `Option: ${mode}\nDate: ${date}\nEmail: ${email}`
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

        {/* Galerie photos */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "16px 0" }}>
          <img src="/images/cuisine.jpg" style={photo} />
          <img src="/images/salle-a-manger.jpg" style={photo} />
          <img src="/images/salon.jpg" style={photo} />
        </div>

        {/* Description */}
        <Card>
          <p>{t.desc}</p>
        </Card>

        {/* Hôtes */}
        <Card>
          <strong>Vos hôtes</strong>
          <p style={{ marginTop: 6 }}>{t.hosts}</p>
        </Card>

        {/* Accès */}
        <Card>
          <strong>Accès pratiques</strong>
          <p style={{ marginTop: 6 }}>{t.access}</p>
        </Card>

        {/* Carte */}
        <Card>
          <strong>Localisation</strong>
          <iframe
            src="https://www.google.com/maps?q=Marcq-en-Baroeul&output=embed"
            width="100%"
            height="160"
            style={{ border: 0, borderRadius: 12, marginTop: 8 }}
            loading="lazy"
          />
        </Card>

        {/* Réservation */}
        <Card>
          <strong>{t.choose}</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <button onClick={() => setMode("night")} style={btn(mode === "night")}>{t.night}</button>
            <button onClick={() => setMode("day")} style={btn(mode === "day")}>{t.day}</button>
            <button onClick={() => setMode("apero")} style={btn(mode === "apero")}>{t.apero}</button>
          </div>

          <input type="date" onChange={(e) => setDate(e.target.value)} style={input} />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={input} />
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

const photo = {
  width: 120,
  height: 90,
  borderRadius: 12,
  objectFit: "cover",
  flexShrink: 0
};

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
  marginTop: 8,
  borderRadius: 10,
  border: "1px solid #ddd"
};
