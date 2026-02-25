{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState \} from "react";\
\
export default function App() \{\
  const [lang, setLang] = useState("fr");\
  const [mode, setMode] = useState("night");\
  const [date, setDate] = useState("");\
  const [email, setEmail] = useState("");\
\
  const t = \{\
    fr: \{\
      title: "Maison \'e0 Marcq-en-Bar\'9cul",\
      subtitle: "Mini Airbnb entre copains \'96 nuits, t\'e9l\'e9travail & ap\'e9ros",\
      desc:\
        "Maison lumineuse, chaleureuse, parfaite pour une nuit de passage, une journ\'e9e de t\'e9l\'e9travail inspir\'e9e ou un ap\'e9ro qui d\'e9rape gentiment. Wi-Fi rapide, grande table, salon cosy, caf\'e9 garanti.",\
      hosts:\
        "Brune & Jojo vous accueillent, accompagn\'e9s de leurs trois domestiques : Baptiste, Claire et Paul (sp\'e9cialistes du d\'e9sordre cr\'e9atif).",\
      access:\
        "\uc0\u55357 \u56525  26 rue de la Cense \'e0 l\'92Eau, Marcq-en-Bar\'9cul \'b7 \u55357 \u56983  Parking facile \'b7 \u55357 \u56566  Wi-Fi rapide \'b7 \u55357 \u56966  15\'9620 min de Lille",\
      night: "\uc0\u55356 \u57113  Nuit\'e9e (2 bi\'e8res + ap\'e9ro)",\
      day: "\uc0\u55357 \u56507  T\'e9l\'e9travail (croissants + pizza)",\
      apero: "\uc0\u55356 \u57211  Ap\'e9ro (ram\'e8ne un truc)",\
      send: "Envoyer la demande"\
    \},\
    en: \{\
      title: "House in Marcq-en-Bar\'9cul",\
      subtitle: "Mini Airbnb for friends \'96 nights, remote work & afterwork",\
      desc:\
        "Bright and cosy house for a short stay, a productive remote-work day or a friendly afterwork. Fast Wi-Fi, large table, cosy living room, coffee guaranteed.",\
      hosts:\
        "Hosted by Brune & Jojo, with their three self-proclaimed assistants: Baptiste, Claire and Paul (creative mess experts).",\
      access:\
        "\uc0\u55357 \u56525  Marcq-en-Bar\'9cul \'b7 \u55357 \u56983  Easy parking \'b7 \u55357 \u56566  Fast Wi-Fi \'b7 \u55357 \u56966  15\'9620 min from Lille",\
      night: "\uc0\u55356 \u57113  Overnight (2 beers + snacks)",\
      day: "\uc0\u55357 \u56507  Remote work (croissants + pizza)",\
      apero: "\uc0\u55356 \u57211  Afterwork (bring drinks)",\
      send: "Send request"\
    \}\
  \}[lang];\
\
  const submit = () => \{\
    const subject = encodeURIComponent("Demande maison Pommeret");\
    const body = encodeURIComponent(\
      `Option: $\{mode\}\\nDate: $\{date\}\\nEmail: $\{email\}`\
    );\
    window.location.href = `mailto:famille@pommeret.eu?subject=$\{subject\}&body=$\{body\}`;\
  \};\
\
  return (\
    <div style=\{\{ fontFamily: "system-ui", padding: 16, maxWidth: 420, margin: "auto" \}\}>\
      <h1>\{t.title\}</h1>\
      <p>\{t.subtitle\}</p>\
\
      <div>\
        <button onClick=\{() => setLang("fr")\}>FR</button>\
        <button onClick=\{() => setLang("en")\}>EN</button>\
      </div>\
\
      <img src="/images/cuisine.jpg" width="100%" />\
      <img src="/images/salle-a-manger.jpg" width="100%" />\
      <img src="/images/salon.jpg" width="100%" />\
\
      <p>\{t.desc\}</p>\
      <p><strong>H\'f4tes :</strong> \{t.hosts\}</p>\
      <p><strong>Acc\'e8s :</strong> \{t.access\}</p>\
\
      <iframe\
        src="https://www.google.com/maps?q=Marcq-en-Baroeul&output=embed"\
        width="100%"\
        height="200"\
        style=\{\{ border: 0 \}\}\
      ></iframe>\
\
      <select onChange=\{(e) => setMode(e.target.value)\}>\
        <option value="night">\{t.night\}</option>\
        <option value="day">\{t.day\}</option>\
        <option value="apero">\{t.apero\}</option>\
      </select>\
\
      <input type="date" onChange=\{(e) => setDate(e.target.value)\} />\
      <input placeholder="email" onChange=\{(e) => setEmail(e.target.value)\} />\
\
      <button onClick=\{submit\}>\{t.send\}</button>\
    </div>\
  );\
\}}