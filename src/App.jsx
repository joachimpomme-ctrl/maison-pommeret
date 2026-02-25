import { useEffect, useMemo, useState } from "react";

const PRICES = { night: 120, day: 45, apero: 0 };
const REVIEWS = [
  { name: "Alix B.", stars: 5, text: "Apéros mémorables, canapé validé, hôtes au top. Je reviens pour la prochaine pizza." },
  { name: "Greg B.", stars: 5, text: "Très bon Wi-Fi pour bosser… puis très bonne bière pour décompresser. Combo parfait." },
  { name: "Mary B.", stars: 5, text: "Maison chaleureuse, ambiance cool, on se sent comme à la maison. Je recommande pour l’apéro 😄" },
];
const RECORDS = [
  "🍕 6 pizzas englouties en une soirée (record: Greg B.)",
  "🍺 14 bières ouvertes après minuit (record: Alix B.)",
  "🧒 9 cris d’enfants pendant un call pro (record: tout le monde)",
];

function startOfMonth(d){ const x=new Date(d); x.setDate(1); return x; }
function addMonths(d,n){ const x=new Date(d); x.setMonth(x.getMonth()+n); return x; }
function daysInMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); }
function sameDay(a,b){ return a && b && a.toDateString()===b.toDateString(); }
function isBetween(d,a,b){ if(!a||!b) return false; const t=d.getTime(); return t>=a.getTime() && t<=b.getTime(); }
function diffNights(a,b){ if(!a||!b) return 0; const ms=Math.ceil((b-a)/(1000*60*60*24)); return Math.max(0,ms); }

export default function App(){
  const [lang,setLang]=useState("fr");
  const [mode,setMode]=useState("night");
  const [month,setMonth]=useState(startOfMonth(new Date()));
  const [start,setStart]=useState(null);
  const [end,setEnd]=useState(null);
  const [miami,setMiami]=useState(false);
  const [superhostClicks,setSuperhostClicks]=useState(0);
  const [easter,setEaster]=useState(false);

  const guest = new URLSearchParams(window.location.search).get("guest");

  useEffect(()=>{
    if(superhostClicks>=5) setEaster(true);
  },[superhostClicks]);

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

  const heroMsg = guest==="leo"
    ? "Welcome back to Marcq, Leo 🇫🇷→🇺🇸 — la maison t’attend quand Miami te manquera 🌴🍺"
    : "Bienvenue à la Maison Pommeret — votre QG lillois entre copains 🍻";

  return (
    <div style={{ fontFamily:"system-ui", background: miami ? "#fff3e6" : "#f4f6fb", minHeight:"100vh", paddingBottom:60 }}>
      <div style={{ maxWidth:420, margin:"0 auto", padding:16 }}>
        {/* Hero */}
        <div style={{ borderRadius:16, padding:16, background:"#111", color:"#fff", marginBottom:12 }}>
          <h2 style={{ margin:0 }}>{heroMsg}</h2>
          <p style={{ opacity:.8, marginTop:6 }}>
            {miami ? "Cocktails à Miami → bières à Marcq 🍹→🍺" : "Mini Airbnb entre copains"}
          </p>
          <button onClick={()=>setMiami(!miami)} style={{ marginTop:8, padding:"6px 10px", borderRadius:999, border:"none" }}>
            🌴 Miami mode {miami ? "OFF" : "ON"}
          </button>
        </div>

        {/* Note & Superhost */}
        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
          <span style={{ fontSize:12 }}>⭐ 4,9 · 600+ avis</span>
          <span
            onClick={()=>setSuperhostClicks(c=>c+1)}
            style={{ fontSize:12, background:"#ff385c", color:"#fff", padding:"2px 8px", borderRadius:999, cursor:"pointer" }}
          >
            Superhost 🏅
          </span>
        </div>

        {easter && (
          <div style={{ background:"#fff", padding:12, borderRadius:12, marginBottom:12 }}>
            🍺 Achievement unlocked: you found the hidden beer stash !
          </div>
        )}

        {/* Records */}
        <div style={{ background:"#fff", padding:12, borderRadius:12, marginBottom:12 }}>
          <strong>🏆 Records de la Maison Pommeret</strong>
          {RECORDS.map((r,i)=>(
            <div key={i} style={{ fontSize:14, marginTop:6 }}>{r}</div>
          ))}
        </div>

        {/* Calendrier */}
        <div style={{ background:"#fff", padding:12, borderRadius:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <button onClick={()=>setMonth(addMonths(month,-1))}>◀</button>
            <strong>{month.toLocaleDateString("fr",{ month:"long", year:"numeric" })}</strong>
            <button onClick={()=>setMonth(addMonths(month,1))}>▶</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6, marginTop:8 }}>
            {grid.map((d,i)=>(
              <button key={i} onClick={()=>d&&onPick(d)} style={{
                height:36, borderRadius:10, border:"none",
                background: !d ? "transparent" :
                  sameDay(d,start)||sameDay(d,end) ? "#111" :
                  isBetween(d,start,end) ? "#ddd" : "#f2f2f2",
                color: sameDay(d,start)||sameDay(d,end) ? "#fff" : "#111"
              }}>
                {d?d.getDate():""}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div style={{ marginTop:12, background:"#fff", padding:12, borderRadius:12 }}>
          Total estimé : <strong>{total} €</strong>
        </div>
      </div>
    </div>
  );
}
