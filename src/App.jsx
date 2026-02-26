import { useMemo, useRef, useState } from "react";

/* ===== Data ===== */
const PRICES = { night: 120, day: 45, apero: 0 };
const PHOTOS = ["/images/cuisine.jpg", "/images/salle-a-manger.jpg", "/images/salon.jpg"];
const REVIEWS = [
  { name: "Alix B.", stars: 5, text: "Apéros mémorables, canapé validé, hôtes au top. Je reviens pour la prochaine pizza." },
  { name: "Greg B.", stars: 5, text: "Très bon Wi-Fi pour bosser… puis très bonne bière pour décompresser." },
  { name: "Mary B.", stars: 5, text: "Maison chaleureuse, ambiance cool. Je recommande pour l’apéro 😄" },
];
const AMENITIES = [
  { icon: "📶", label: "Wi-Fi rapide" },
  { icon: "💻", label: "Espace de travail" },
  { icon: "☕", label: "Café à volonté" },
  { icon: "🚗", label: "Parking facile" },
  { icon: "🛋️", label: "Salon cosy" },
  { icon: "🍻", label: "Apéro friendly" },
];

/* ===== Utils ===== */
function startOfMonth(d){ const x=new Date(d); x.setDate(1); return x; }
function addMonths(d,n){ const x=new Date(d); x.setMonth(x.getMonth()+n); return x; }
function daysInMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); }
function sameDay(a,b){ return a && b && a.toDateString()===b.toDateString(); }
function isBetween(d,a,b){ if(!a||!b) return false; const t=d.getTime(); return t>=a.getTime() && t<=b.getTime(); }
function diffNights(a,b){ if(!a||!b) return 0; const ms=Math.ceil((b-a)/(1000*60*60*24)); return Math.max(0,ms); }

export default function App(){
  const isLeoPage = window.location.pathname === "/leo";
  if (isLeoPage) return <LeoEdition />;
  return <HomeV551 />;
}

function HomeV551(){
  const formRef = useRef(null);
  const [mode,setMode]=useState("night");
  const [month,setMonth]=useState(startOfMonth(new Date()));
  const [start,setStart]=useState(null);
  const [end,setEnd]=useState(null);
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [mood,setMood]=useState("bof");
  const [miami,setMiami]=useState(false);
  const [lightbox,setLightbox]=useState(null);

  const guest = new URLSearchParams(window.location.search).get("guest");
  const heroMsg = guest==="leo"
    ? "Welcome back to Marcq, Leo 🇫🇷→🇺🇸 — la maison t’attend quand Miami te manquera 🌴🍺"
    : "Maison Pommeret · Votre QG lillois entre copains";

  const nights = diffNights(start,end);
  const units = mode==="night" ? nights : mode==="day" ? Math.max(1,nights||1) : 1;
  const total = PRICES[mode]*units;

  const grid = useMemo(()=>{
    const first=startOfMonth(month);
    const offset=(first.getDay()+6)%7;
    const dim=daysInMonth(month);
    const cells=[];
    for(let i=0;i<offset;i++) cells.push(null);
    for(let d=1; d<=dim; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    return cells;
  },[month]);

  const onPick=(d)=>{
    if(!start || (start && end)){ setStart(d); setEnd(null); }
    else if(d<start) setStart(d);
    else setEnd(d);
  };

  const submit = async () => {
    if (!firstName || !lastName || !email || !start || !end) {
      alert("Merci de compléter prénom, nom, email et dates.");
      return;
    }
    setSending(true);
    try{
      const res = await fetch("https://formspree.io/f/xreajboo",{
        method:"POST",
        headers:{ "Accept":"application/json","Content-Type":"application/json" },
        body: JSON.stringify({ option:mode, du:start?.toLocaleDateString(), au:end?.toLocaleDateString(), units, total, firstName, lastName, email, mood })
      });
      if(res.ok) setSent(true);
      else alert("Échec de l’envoi 😬");
    }catch(e){ alert("Erreur réseau 😐"); }
    finally{ setSending(false); }
  };

  if(sent){
    return (
      <div style={wrap}>
        <div style={centerCard}>
          <div style={{ fontSize:48 }}>✅</div>
          <h2>Demande envoyée !</h2>
          <p>On revient vers toi très vite pour confirmer la dispo.</p>
          <button onClick={()=>setSent(false)} style={btnPrimary}>Faire une autre demande</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...wrap, background: miami ? "#fff3e6" : "#f4f6fb" }}>
      <div style={container}>
        {/* Hero */}
        <div style={hero}>
          <h1 style={{ margin:0 }}>{heroMsg}</h1>
          <p>{miami ? "Cocktails à Miami → bières à Marcq 🍹→🍺" : "Comme Airbnb, mais version copains"}</p>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setMiami(!miami)} style={chip}>🌴 Miami mode {miami?"OFF":"ON"}</button>
            <button onClick={()=>formRef.current?.scrollIntoView({ behavior:"smooth" })} style={chip}>💬 Contacter l’hôte</button>
          </div>
        </div>

        {/* Gallery */}
        <div style={gallery}>
          {PHOTOS.map((src,i)=>(
            <img key={i} src={src} style={galleryImg} onClick={()=>setLightbox(i)} />
          ))}
        </div>

        {/* Meta */}
        <div style={meta}>
          <span>⭐ 4,9 · 600+ avis · Superhost 🏅</span>
          <span>📍 Marcq-en-Barœul</span>
        </div>

        {/* Filters */}
        <div style={filters}>
          <button onClick={()=>setMode("night")} style={filterBtn(mode==="night")}>🌙 Nuit</button>
          <button onClick={()=>setMode("day")} style={filterBtn(mode==="day")}>💻 Télétravail</button>
          <button onClick={()=>setMode("apero")} style={filterBtn(mode==="apero")}>🍻 Apéro</button>
        </div>

        {/* Amenities */}
        <Card>
          <strong>Ce que vous offre ce logement</strong>
          <div style={amenGrid}>
            {AMENITIES.map((a,i)=>(
              <div key={i} style={amenItem}><span style={{ fontSize:20 }}>{a.icon}</span>{a.label}</div>
            ))}
          </div>
        </Card>

        {/* Description */}
        <Card>
          <strong>Description</strong>
          <p>
            Maison lumineuse et chaleureuse pour une nuit, une journée de télétravail ou un apéro convivial.
            Grande table, salon cosy, Wi-Fi rapide, café garanti. Brune & Jojo vous accueillent avec Baptiste,
            Claire et Paul (experts en désordre créatif).
          </p>
        </Card>

        {/* Calendar */}
        <Card>
          <strong>Disponibilités</strong>
          <div style={calHead}>
            <button onClick={()=>setMonth(addMonths(month,-1))}>◀</button>
            <strong>{month.toLocaleDateString("fr",{ month:"long", year:"numeric" })}</strong>
            <button onClick={()=>setMonth(addMonths(month,1))}>▶</button>
          </div>
          <div style={calGrid}>
            {grid.map((d,i)=>(
              <button key={i} onClick={()=>d&&onPick(d)} style={dayBtn(d,start,end)}>
                {d?d.getDate():""}
              </button>
            ))}
          </div>
        </Card>

        {/* Location (no API key) */}
        <Card>
          <strong>Où vous serez</strong>
          <div style={{ borderRadius:16, overflow:"hidden", marginTop:8, boxShadow:"0 6px 20px rgba(0,0,0,0.12)" }}>
            <iframe
              title="map"
              width="100%"
              height="240"
              style={{ border:0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=26%20rue%20de%20la%20cense%20%C3%A0%20l'eau%2C%2059700%20Marcq-en-Baroeul&output=embed"
            />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
            <div style={{ fontSize:12, color:"#666" }}>
              📍 26 rue de la Cense à l’Eau, 59700 Marcq-en-Barœul  
              <br />
              🚆 15–20 min de Lille · 🚗 Parking facile
            </div>
            <a
              href="https://www.google.com/maps?q=26%20rue%20de%20la%20cense%20%C3%A0%20l'eau%2C%2059700%20Marcq-en-Baroeul"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize:12,
                textDecoration:"none",
                padding:"6px 10px",
                borderRadius:999,
                border:"1px solid #ddd",
                background:"#fff",
                color:"#111",
                whiteSpace:"nowrap",
              }}
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </Card>

        {/* Host */}
        <Card>
          <strong>Votre hôte</strong>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={avatar}>BJ</div>
            <div>
              <div style={{ fontWeight:600 }}>Brune & Jojo</div>
              <div style={{ fontSize:12, color:"#666" }}>Superhost · Réponse rapide · Apéro friendly</div>
            </div>
          </div>
        </Card>

        {/* Reviews */}
        <Card>
          <strong>Avis</strong>
          {REVIEWS.map((r,i)=>(
            <div key={i} style={{ marginTop:8, borderTop:i?"1px solid #eee":"none", paddingTop:i?8:0 }}>
              <div style={{ fontWeight:600 }}>{r.name} · {"★".repeat(r.stars)}</div>
              <div style={{ color:"#555" }}>{r.text}</div>
            </div>
          ))}
        </Card>

        {/* Form */}
        <Card ref={formRef}>
          <strong>Votre demande</strong>
          <input placeholder="Prénom" value={firstName} onChange={e=>setFirstName(e.target.value)} style={input} />
          <input placeholder="Nom" value={lastName} onChange={e=>setLastName(e.target.value)} style={input} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={input} />
          <div style={{ marginTop:8 }}>
            <div style={{ fontSize:12, marginBottom:6 }}>Humeur du moment</div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>setMood("serious")} style={moodBtn(mood==="serious")}>😐 Sérieux</button>
              <button onClick={()=>setMood("bof")} style={moodBtn(mood==="bof")}>🙂 Bof</button>
              <button onClick={()=>setMood("lol")} style={moodBtn(mood==="lol")}>😂 Mort de rire</button>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky CTA */}
      <div style={sticky}>
        <div>
          <div style={{ fontSize:12, color:"#666" }}>Total estimé</div>
          <strong>{total} €</strong>
        </div>
        <button onClick={submit} disabled={sending} style={{ ...btnPrimary, opacity: sending ? 0.7 : 1 }}>
          {sending ? "Envoi…" : "Envoyer la demande"}
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={lightboxWrap} onClick={()=>setLightbox(null)}>
          <img src={PHOTOS[lightbox]} style={lightboxImg} />
        </div>
      )}
    </div>
  );
}

/* ===== Leo Page ===== */
function LeoEdition(){
  const score = 60 + Math.floor(Math.random()*30);
  return (
    <div style={{ fontFamily:"system-ui", background:"#0b1220", color:"#fff", minHeight:"100vh", padding:24 }}>
      <div style={{ maxWidth:520, margin:"0 auto" }}>
        <h1>🇫🇷 Welcome back to your French HQ, Leo</h1>
        <p>Mary & the boys are always welcome. The house misses you.</p>
        <div style={leoCard}>
          <h3>✈️ Jet lag estimator (Miami → Marcq)</h3>
          <p>Fatigue level: <strong>{score}%</strong></p>
          <p>Recommended treatment: nap + bière + raclette 🛌🍺🧀</p>
        </div>
        <a href="/" style={{ color:"#60a5fa" }}>← Retour à la maison</a>
      </div>
    </div>
  );
}

/* ===== Styles ===== */
const wrap = { minHeight:"100vh", paddingBottom:90 };
const container = { maxWidth:420, margin:"0 auto", padding:16 };
const hero = { background:"#111", color:"#fff", borderRadius:16, padding:16, marginBottom:12 };
const gallery = { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:12 };
const galleryImg = { width:"100%", height:120, objectFit:"cover", borderRadius:12, cursor:"pointer" };
const meta = { display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:12 };
const filters = { display:"flex", gap:8, marginBottom:12 };
const filterBtn = (a)=>({ padding:"8px 10px", borderRadius:999, border:"1px solid #ddd", background:a?"#111":"#fff", color:a?"#fff":"#111" });
const Card = ({ children }) => <div style={card}>{children}</div>;
const card = { background:"#fff", borderRadius:16, padding:14, marginBottom:12, boxShadow:"0 6px 20px rgba(0,0,0,0.06)" };
const amenGrid = { display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8, marginTop:8 };
const amenItem = { display:"flex", gap:8, alignItems:"center", fontSize:14 };
const calHead = { display:"flex", justifyContent:"space-between", alignItems:"center" };
const calGrid = { display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6, marginTop:8 };
const input = { width:"100%", padding:10, borderRadius:10, border:"1px solid #ddd", marginTop:8 };
const chip = { padding:"6px 10px", borderRadius:999, border:"none", cursor:"pointer" };
const btnPrimary = { padding:"12px 14px", borderRadius:12, border:"none", background:"#111", color:"#fff", fontSize:16, cursor:"pointer" };
const sticky = { position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid #eee", padding:12, display:"flex", justifyContent:"space-between", alignItems:"center" };
const dayBtn = (d,start,end)=>({ height:36, borderRadius:10, border:"none", background: !d ? "transparent" : sameDay(d,start)||sameDay(d,end) ? "#111" : isBetween(d,start,end) ? "#ddd" : "#f2f2f2", color: sameDay(d,start)||sameDay(d,end) ? "#fff" : "#111", cursor: d ? "pointer" : "default" });
const moodBtn = (active)=>({ padding:"8px 10px", borderRadius:10, border:"1px solid #ddd", background: active ? "#111" : "#fff", color: active ? "#fff" : "#111" });
const centerCard = { maxWidth:420, margin:"0 auto", background:"#fff", borderRadius:16, padding:24, textAlign:"center" };
const lightboxWrap = { position:"fixed", inset:0, background:"rgba(0,0,0,.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50 };
const lightboxImg = { maxWidth:"90%", maxHeight:"90%", borderRadius:12 };
const avatar = { width:48, height:48, borderRadius:"50%", background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 };
const leoCard = { background:"#111827", borderRadius:16, padding:16, margin:"16px 0" };
