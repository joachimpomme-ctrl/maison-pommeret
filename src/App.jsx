import { useState } from "react";

export default function App() {
  const [lang, setLang] = useState("fr");
  const [mode, setMode] = useState("night");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");

  const t = {
    fr: {
      title: "Maison à Marcq-en-Barœul",
      subtitle: "Mini Airbnb entre copains – nuits, télétravail & apéros",
      desc:
        "Maison lumineuse, chaleureuse, parfaite pour une nuit de passage, une journée de télétravail inspirée ou un apéro qui dérape gentiment. Wi-Fi rapide, grande table, salon cosy, café garanti.",
      hosts:
        "Brune & Jojo vous accueillent, accompagnés de leurs trois domestiques : Baptiste, Claire et Paul (spécialistes du désordre créatif).",
      access:
        "📍 26 rue de la Cense à l’Eau, Marcq-en-Barœul · 🚗 Parking facile · 📶 Wi-Fi rapide · 🚆 15–20 min de Lille",
      night: "🌙 Nuitée (2 bières + apéro)",
      day: "💻 Télétravail (croissants + pizza)",
      apero: "🍻 Apéro (ramène un truc)",
      send: "Envoyer la demande"
    },
    en: {
      title: "House in Marcq-en-Barœul",
      subtitle: "Mini Airbnb for friends – nights, remote work & afterwork",
      desc:
        "Bright and cosy house for a short stay, a productive remote-work day or a friendly afterwork. Fast Wi-Fi, large table, cosy living room, coffee guaranteed.",
      hosts:
        "Hosted by Brune & Jojo, with their three self-proclaimed assistants: Baptiste, Claire and Paul (creative mess experts).",
      access:
        "📍 Marcq-en-Barœul · 🚗 Easy parking · 📶 Fast Wi-Fi · 🚆 15–20 min from Lille",
      night: "🌙 Overnight (2 beers + snacks)",
      day: "💻 Remote work (croissants + pizza)",
      apero: "🍻 Afterwork (bring drinks)",
      send: "Send request"
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
    <div style={{ fontFamily: "system-ui", padding: 16, maxWidth: 420, margin: "auto" }}>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>

      <div>
        <button onClick={() => setLang("fr")}>FR</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>

      <img src="/images/cuisine.jpg" width="100%" />
      <img src="/images/salle-a-manger.jpg" width="100%" />
      <img src="/images/salon.jpg" width="100%" />

      <p>{t.desc}</p>
      <p><strong>Hôtes :</strong> {t.hosts}</p>
      <p><strong>Accès :</strong> {t.access}</p>

      <iframe
        src="https://www.google.com/maps?q=Marcq-en-Baroeul&output=embed"
        width="100%"
        height="200"
        style={{ border: 0 }}
      ></iframe>

      <select onChange={(e) => setMode(e.target.value)}>
        <option value="night">{t.night}</option>
        <option value="day">{t.day}</option>
        <option value="apero">{t.apero}</option>
      </select>

      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

      <button onClick={submit}>{t.send}</button>
    </div>
  );
}
