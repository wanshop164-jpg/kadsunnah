import { useState } from "react";

const CX = 50, CY = 57;

const HIKMAH = [
  {
    id: 1,
    warna: "#2ECC71", rgb: "46,204,113",
    icon: "🤲",
    tajuk: "Menzahirkan Rasa Syukur",
    subtajuk: "kepada Allah SWT",
    huraian: "Tanda kesyukuran umat Islam setelah selesai menunaikan ibadah besar kepada Allah SWT",
    daun: [
      { icon: "🌙", teks: "Syukur selesai puasa Ramadan — Aidilfitri" },
      { icon: "🕋", teks: "Syukur selesai ibadah haji — Aidiladha" },
      { icon: "✨", teks: "Pengabdian tulus hamba kepada Penciptanya" },
    ],
    pos: { left: "2%", top: "5%" },
    svgEnd: [20, 26], cp: [[42, 51], [30, 38]],
  },
  {
    id: 2,
    warna: "#C9A84C", rgb: "201,168,76",
    icon: "🤝",
    tajuk: "Mengeratkan Ukhuwah Islamiah",
    subtajuk: "& Silaturahim",
    huraian: "Mempererat hubungan persaudaraan sesama Islam melalui ziarah dan maaf-memaafi",
    daun: [
      { icon: "🏡", teks: "Ziarah-menziarahi sanak saudara & jiran" },
      { icon: "💚", teks: "Bermaaf-maafan sesama Islam" },
      { icon: "🌺", teks: "Mempererat ikatan persaudaraan Islam" },
    ],
    pos: { left: "50%", top: "3%", transform: "translateX(-50%)" },
    svgEnd: [50, 14], cp: [[50, 44], [50, 28]],
  },
  {
    id: 3,
    warna: "#5DADE2", rgb: "93,173,226",
    icon: "☪️",
    tajuk: "Menzahirkan Syiar Islam",
    subtajuk: "& Kegembiraan",
    huraian: "Menunjukkan keindahan Islam sebagai agama yang meraikan kegembiraan secara halal",
    daun: [
      { icon: "✨", teks: "Keindahan agama Islam dipamerkan kepada dunia" },
      { icon: "🌟", teks: "Kegembiraan umat Islam yang diredhai Allah" },
      { icon: "🕌", teks: "Identiti umat Islam yang bersatu padu" },
    ],
    pos: { right: "2%", top: "5%" },
    svgEnd: [80, 26], cp: [[58, 51], [70, 38]],
  },
];

const STEPS = [
  { label: "Mula", btn: "🌱 Tumbuh Pokok" },
  { label: "Hikmah 1 — Syukur", btn: "🌿 Tunjuk Hikmah 2" },
  { label: "Hikmah 2 — Ukhuwah", btn: "🌿 Tunjuk Hikmah 3" },
  { label: "Hikmah 3 — Syiar", btn: "🍃 Tunjuk Semua Daun" },
  { label: "🌳 Pokok Hikmah Lengkap", btn: null },
];

const LEAF_DOTS = [
  { step: 1, pts: [[38, 51], [29, 44], [23, 37]], c: "#2ECC71" },
  { step: 2, pts: [[50, 45], [50, 35], [50, 24]], c: "#C9A84C" },
  { step: 3, pts: [[62, 51], [71, 44], [77, 37]], c: "#5DADE2" },
];

const getTransform = (h, visible) => {
  const base = h.pos.transform || "";
  if (visible) return base || "none";
  return `${base} scale(0.78) translateY(14px)`.trim();
};

export default function PokokHikmah() {
  const [step, setStep] = useState(0);

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(155deg,#071C12 0%,#0A2818 55%,#071C12 100%)",
      color: "#FFF8E7",
      fontFamily: "'Segoe UI','Trebuchet MS',system-ui,sans-serif",
      display: "flex", flexDirection: "column",
      overflow: "hidden", position: "relative",
    }}>
      <style>{`
        @keyframes leafIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes glow {
          0%,100% { box-shadow:0 0 0 6px rgba(201,168,76,0.07),0 0 28px rgba(201,168,76,0.12); }
          50%     { box-shadow:0 0 0 9px rgba(201,168,76,0.12),0 0 38px rgba(201,168,76,0.22); }
        }
        @keyframes trunkGrow {
          from { stroke-dashoffset: 120; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Gold accent bars */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:4,
        background:"linear-gradient(90deg,transparent,#C9A84C,#E6C55A,#C9A84C,transparent)",zIndex:30}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,
        background:"linear-gradient(90deg,transparent,#C9A84C,#E6C55A,#C9A84C,transparent)",zIndex:30}}/>

      {/* Background stars */}
      {Array.from({length:24},(_,i)=>(
        <div key={i} style={{
          position:"absolute",borderRadius:"50%",background:"#C9A84C",pointerEvents:"none",zIndex:0,
          width:i%5===0?5:3, height:i%5===0?5:3,
          opacity:0.07+(i%5)*0.028,
          left:`${(i*43+9)%97}%`, top:`${(i*61+15)%93}%`,
        }}/>
      ))}

      {/* ── HEADER ── */}
      <header style={{
        position:"relative",zIndex:20,flexShrink:0,
        padding:"13px 36px",
        borderBottom:"1px solid rgba(201,168,76,0.2)",
        background:"rgba(0,0,0,0.3)",
        display:"flex",alignItems:"center",justifyContent:"space-between",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span style={{fontSize:28}}>🌳</span>
          <div>
            <div style={{fontSize:"clamp(9px,0.6vw,11px)",color:"#C9A84C",letterSpacing:4,fontWeight:700,textTransform:"uppercase"}}>
              Objektif 3 · Pendidikan Islam
            </div>
            <div style={{fontSize:"clamp(17px,1.5vw,24px)",fontWeight:900,letterSpacing:0.5}}>
              POKOK HIKMAH PENSYARIATAN HARI RAYA
            </div>
          </div>
        </div>
        <div style={{
          background:"rgba(201,168,76,0.1)",
          border:"1.5px solid rgba(201,168,76,0.45)",
          borderRadius:10,padding:"8px 20px",
          fontSize:"clamp(12px,1vw,16px)",color:"#C9A84C",fontWeight:700,
        }}>
          {STEPS[step].label}
        </div>
      </header>

      {/* ── TREE AREA ── */}
      <main style={{flex:1,position:"relative",overflow:"hidden",zIndex:5}}>

        {/* SVG layer — branches */}
        <svg
          style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:2}}
          viewBox="0 0 100 100" preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="tG" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#4A2E00"/>
              <stop offset="100%" stopColor="#C9A84C"/>
            </linearGradient>
          </defs>

          {/* Trunk */}
          <line x1={CX} y1={91} x2={CX} y2={CY}
            stroke="url(#tG)" strokeWidth="1.5" strokeLinecap="round"
            style={{strokeDasharray:120, animation:step>=1?"trunkGrow 0.6s ease forwards":"none"}}
          />

          {/* Roots */}
          {[[-8,5,-15,11],[8,5,15,11],[-4,8,-9,14],[4,8,9,14]].map(([dx1,dy1,dx2,dy2],i)=>(
            <line key={i}
              x1={CX+dx1} y1={91+dy1} x2={CX+dx2} y2={91+dy2}
              stroke="#4A2E00" strokeLinecap="round"
              strokeWidth={i<2?0.7:0.5}
              opacity={i<2?0.65:0.35}
            />
          ))}

          {/* Animated branches (stroke-dashoffset draw trick) */}
          {HIKMAH.map((h,i)=>(
            <path key={h.id}
              d={`M ${CX},${CY} C ${h.cp[0][0]},${h.cp[0][1]} ${h.cp[1][0]},${h.cp[1][1]} ${h.svgEnd[0]},${h.svgEnd[1]}`}
              stroke={h.warna} strokeWidth="0.65" strokeLinecap="round"
              fill="none" vectorEffect="non-scaling-stroke"
              style={{
                strokeDasharray:300,
                strokeDashoffset: step>i ? 0 : 300,
                opacity: step>i ? 1 : 0,
                transition:`stroke-dashoffset 0.78s ease ${i*0.06}s, opacity 0.25s ease ${i*0.06}s`,
              }}
            />
          ))}

          {/* Small leaf dots along branches */}
          {LEAF_DOTS.map((g,gi)=>
            g.pts.map(([x,y],j)=>(
              <circle key={`${gi}-${j}`} cx={x} cy={y} r={1.8-j*0.3} fill={g.c}
                style={{
                  opacity: step>=g.step ? 0.5 : 0,
                  transition:`opacity 0.4s ease ${j*0.18+0.55}s`,
                }}
              />
            ))
          )}
        </svg>

        {/* CENTER NODE */}
        <div style={{
          position:"absolute", left:"50%", top:`${CY}%`,
          transform:"translate(-50%,-50%)",
          width:"clamp(118px,10vw,162px)", height:"clamp(118px,10vw,162px)",
          background:"rgba(201,168,76,0.09)",
          border:"3px solid rgba(201,168,76,0.65)",
          borderRadius:"50%",
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          textAlign:"center",padding:10,
          animation:"glow 3s ease-in-out infinite",
          zIndex:6,
        }}>
          <div style={{fontSize:"clamp(20px,2vw,30px)"}}>🕌</div>
          <div style={{
            fontSize:"clamp(9px,0.72vw,12px)",
            fontWeight:800,color:"#C9A84C",lineHeight:1.4,marginTop:5,letterSpacing:1,
          }}>
            HIKMAH<br/>HARI RAYA
          </div>
        </div>

        {/* ROOT LABEL */}
        <div style={{
          position:"absolute",left:"50%",bottom:"3%",
          transform:"translateX(-50%)",textAlign:"center",zIndex:6,
        }}>
          <div style={{fontSize:"clamp(9px,0.65vw,11px)",color:"rgba(201,168,76,0.4)",letterSpacing:4,fontWeight:600}}>
            AKAR PENSYARIATAN
          </div>
        </div>

        {/* HIKMAH CARDS */}
        {HIKMAH.map((h,i)=>{
          const visible = step > i;
          const showDaun = step >= 4;

          return (
            <div key={h.id} style={{
              position:"absolute",
              width:"clamp(218px,22.5vw,388px)",
              ...h.pos,
              transform: getTransform(h, visible),
              background: visible ? `rgba(${h.rgb},0.09)` : "transparent",
              border: `2.5px solid ${visible ? h.warna+"88" : "transparent"}`,
              borderRadius:18,
              padding:"clamp(11px,1.1vw,20px)",
              opacity: visible ? 1 : 0,
              transition:"all 0.62s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: visible ? `0 0 26px rgba(${h.rgb},0.12)` : "none",
              zIndex:7,
            }}>

              {/* Card header */}
              <div style={{display:"flex",alignItems:"center",gap:"clamp(8px,0.7vw,12px)",marginBottom:8}}>
                <div style={{
                  width:"clamp(38px,3.4vw,52px)", height:"clamp(38px,3.4vw,52px)",
                  borderRadius:"50%",
                  background:`rgba(${h.rgb},0.15)`,
                  border:`2px solid rgba(${h.rgb},0.4)`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"clamp(16px,1.8vw,26px)",flexShrink:0,
                }}>
                  {h.icon}
                </div>
                <div>
                  <div style={{fontSize:"clamp(13px,1.1vw,18px)",fontWeight:900,color:h.warna,lineHeight:1.2}}>
                    {h.tajuk}
                  </div>
                  <div style={{fontSize:"clamp(10px,0.76vw,13px)",color:"rgba(255,248,231,0.5)",marginTop:2}}>
                    {h.subtajuk}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{height:1,background:`rgba(${h.rgb},0.22)`,margin:"7px 0"}}/>

              {/* Huraian */}
              <p style={{
                fontSize:"clamp(11px,0.87vw,15px)",
                color:"rgba(255,248,231,0.86)",
                lineHeight:1.65,
                margin: showDaun ? "0 0 8px" : 0,
              }}>
                {h.huraian}
              </p>

              {/* Daun — revealed at step 4 */}
              {showDaun && (
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {h.daun.map((d,j)=>(
                    <div key={j} style={{
                      display:"flex",alignItems:"center",gap:"clamp(6px,0.55vw,9px)",
                      background:`rgba(${h.rgb},0.07)`,
                      border:`1px solid rgba(${h.rgb},0.22)`,
                      borderRadius:9,
                      padding:"clamp(5px,0.42vw,7px) clamp(7px,0.65vw,11px)",
                      animation:`leafIn 0.4s ease ${j*0.13}s both`,
                    }}>
                      <span style={{fontSize:"clamp(12px,1vw,16px)",flexShrink:0}}>{d.icon}</span>
                      <span style={{fontSize:"clamp(10px,0.76vw,13px)",lineHeight:1.45,color:"rgba(255,248,231,0.92)"}}>
                        {d.teks}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* ── FOOTER CONTROLS ── */}
      <footer style={{
        position:"relative",zIndex:20,flexShrink:0,
        padding:"12px 36px",
        borderTop:"1px solid rgba(201,168,76,0.18)",
        background:"rgba(0,0,0,0.35)",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,
      }}>
        {/* Step progress pills */}
        <div style={{display:"flex",gap:6,overflow:"hidden",flexWrap:"nowrap"}}>
          {STEPS.map((s,i)=>(
            <div key={i} style={{
              padding:"5px 10px",borderRadius:8,whiteSpace:"nowrap",
              fontSize:"clamp(9px,0.68vw,12px)",
              fontWeight: i===step ? 700 : i<step ? 500 : 400,
              background: i===step?"rgba(201,168,76,0.18)":i<step?"rgba(201,168,76,0.07)":"rgba(255,255,255,0.03)",
              border:`1px solid ${i===step?"rgba(201,168,76,0.65)":i<step?"rgba(201,168,76,0.28)":"rgba(255,255,255,0.06)"}`,
              color: i<step?"#C9A84C":i===step?"#E6C55A":"rgba(255,255,255,0.22)",
              transition:"all 0.3s",
            }}>
              {i<step?"✓ ":i===step?"▶ ":""}{s.label}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          <button onClick={()=>setStep(0)} style={{
            background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:9,padding:"9px 14px",cursor:"pointer",
            color:"rgba(255,255,255,0.38)",fontSize:"clamp(11px,0.82vw,14px)",
          }}>🔄 Reset</button>

          {step>0 && (
            <button onClick={()=>setStep(s=>s-1)} style={{
              background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.14)",
              borderRadius:9,padding:"9px 15px",cursor:"pointer",
              color:"rgba(255,248,231,0.6)",fontSize:"clamp(11px,0.82vw,14px)",
            }}>← Balik</button>
          )}

          {step<4 && (
            <button
              onClick={()=>setStep(s=>s+1)}
              style={{
                background:"linear-gradient(135deg,#C9A84C,#E6C55A)",border:"none",
                borderRadius:12,cursor:"pointer",letterSpacing:0.8,
                padding:"clamp(9px,0.82vw,13px) clamp(20px,2vw,34px)",
                color:"#071C12",fontWeight:900,
                fontSize:"clamp(13px,1.05vw,17px)",
                boxShadow:"0 4px 18px rgba(201,168,76,0.32)",
              }}
            >
              {STEPS[step].btn}
            </button>
          )}

          {step===4 && (
            <div style={{
              padding:"clamp(9px,0.82vw,13px) clamp(18px,1.8vw,28px)",
              borderRadius:12,fontWeight:700,
              background:"rgba(46,204,113,0.12)",
              border:"1.5px solid rgba(46,204,113,0.45)",
              color:"#2ECC71",
              fontSize:"clamp(13px,1.05vw,17px)",
            }}>
              🌳 Pokok Hikmah Lengkap!
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
