import { useState, useEffect, useRef } from "react";

const SOALAN = [
  {
    id: 1,
    situasi: "Pak Abu mandi sunat, memakai baju Melayu baru, menyapu wangi-wangian dan berangkat awal ke masjid bersama keluarga untuk solat Aidilfitri berjemaah.",
    jawapan: "sunnah",
    huraian: "Mandi sunat, memakai pakaian terbaik, menyapu wangi-wangian dan pergi awal ke masjid adalah amalan sunnah Nabi ﷺ yang sangat dituntut pada hari raya.",
    icon: "🕌",
  },
  {
    id: 2,
    situasi: "Hafiz bermain bunga api dan mercun bersama rakan-rakannya pada malam takbir raya sehingga larut malam.",
    jawapan: "bukan_sunnah",
    huraian: "Bermain bunga api adalah berbahaya dan mengganggu kekhusyukan ibadah malam takbir. Sunnah ialah memperbanyakkan takbir, tahmid dan doa bersama.",
    icon: "🎆",
  },
  {
    id: 3,
    situasi: "Sebelum keluar untuk solat Aidilfitri, Mak Teh Rohani memakan beberapa biji kurma dahulu sebagai ikutan sunnah Nabi ﷺ.",
    jawapan: "sunnah",
    huraian: "Sunnah Nabi ﷺ memakan sesuatu (diutamakan kurma, bilangan ganjil) sebelum keluar solat Aidilfitri. Ini berbeza dengan Aidiladha — sunnah tidak makan dahulu.",
    icon: "🌙",
  },
  {
    id: 4,
    situasi: "Semasa imam menyampaikan khutbah Hari Raya, Azri berbual-bual dengan kawan di sebelahnya tentang baju raya baru.",
    jawapan: "bukan_sunnah",
    huraian: "Mendengar khutbah dengan diam dan penuh perhatian adalah wajib. Berbual semasa khutbah adalah perbuatan yang buruk dan mencerminkan kurangnya adab dalam masjid.",
    icon: "🗣️",
  },
  {
    id: 5,
    situasi: "Selepas solat Aidilfitri, Encik Kamal sengaja pulang ke rumah melalui jalan yang berbeza daripada jalan yang dilalui semasa pergi ke masjid.",
    jawapan: "sunnah",
    huraian: "Nabi ﷺ suka menempuh jalan berbeza ketika pergi dan balik dari solat hari raya. Hikmahnya supaya lebih ramai yang dapat melihat syiar Islam yang agung.",
    icon: "🛤️",
  },
  {
    id: 6,
    situasi: "Keluarga Roza tidak sempat membayar zakat fitrah kerana sibuk membeli belah dan baru teringat selepas solat Aidilfitri selesai.",
    jawapan: "bukan_sunnah",
    huraian: "Zakat fitrah WAJIB dibayar sebelum solat Aidilfitri. Jika dibayar selepas solat, ia hanya dikira sebagai sedekah biasa dan tidak lagi sah sebagai zakat fitrah.",
    icon: "💰",
  },
  {
    id: 7,
    situasi: "Jemaah masjid kampung bertakbir dengan kuat bersama-sama dari malam raya hingga sebelum solat sunat Aidilfitri dimulakan.",
    jawapan: "sunnah",
    huraian: "Bertakbir secara berjemaah dari malam raya adalah syiar Islam yang amat dituntut. Lafaz: 'Allahu Akbar, Allahu Akbar, Allahu Akbar, La ilaha illallahu wallahu Akbar...'",
    icon: "📢",
  },
  {
    id: 8,
    situasi: "Pada pagi hari raya, Aiman memilih untuk tidur di rumah sahaja dan langsung tidak pergi ke masjid untuk menunaikan solat hari raya.",
    jawapan: "bukan_sunnah",
    huraian: "Solat sunat Hari Raya adalah sunnah muakkadah (sangat dituntut). Nabi ﷺ bahkan menggalakkan wanita dan kanak-kanak hadir ke tempat solat sebagai syiar Islam.",
    icon: "😴",
  },
  {
    id: 9,
    situasi: "Ketika berjumpa saudara-mara pada hari raya, Hassan mengucapkan 'Taqabbalallahu minna wa minkum' sambil bersalaman dan saling bermaaf-maafan.",
    jawapan: "sunnah",
    huraian: "'Taqabbalallahu minna wa minkum' bermaksud 'Semoga Allah menerima amalan kami dan amalan kamu'. Ini adalah ucapan para sahabat Nabi ﷺ pada hari raya.",
    icon: "🤝",
  },
  {
    id: 10,
    situasi: "Amirah memakai pakaian mewah tetapi mendedahkan aurat ketika menghadiri majlis rumah terbuka hari raya dengan alasan ingin kelihatan cantik.",
    jawapan: "bukan_sunnah",
    huraian: "Walaupun sunnah memakai pakaian terbaik pada hari raya, ia WAJIB menutup aurat. Memakai pakaian yang mendedahkan aurat adalah haram walau pada hari raya sekalipun.",
    icon: "👗",
  },
];

// Ketupat SVG decoration
function Ketupat({ size = 80, opacity = 0.12, x, y, rotate = 0 }) {
  return (
    <svg
      style={{ position: "absolute", left: x, top: y, opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }}
      width={size} height={size} viewBox="0 0 100 100"
    >
      <polygon points="50,4 96,50 50,96 4,50" fill="none" stroke="#C9A84C" strokeWidth="4" />
      <polygon points="50,22 78,50 50,78 22,50" fill="none" stroke="#C9A84C" strokeWidth="2.5" />
      <line x1="50" y1="4" x2="50" y2="96" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

// Crescent moon SVG
function Crescent({ size = 100, opacity = 0.1, x, y }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, opacity, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="#C9A84C" />
      <circle cx="68" cy="36" r="38" fill="#0A2818" />
      <circle cx="72" cy="18" r="5" fill="#C9A84C" />
      <circle cx="86" cy="30" r="3.5" fill="#C9A84C" />
      <circle cx="80" cy="10" r="2.5" fill="#C9A84C" />
    </svg>
  );
}

// Star particle
function Stars() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37 + 7) % 96}%`,
    top: `${(i * 53 + 11) % 92}%`,
    size: i % 5 === 0 ? 5 : i % 3 === 0 ? 4 : 3,
    opacity: 0.15 + (i % 5) * 0.07,
  }));
  return (
    <>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: s.left, top: s.top,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "#C9A84C", opacity: s.opacity, pointerEvents: "none",
        }} />
      ))}
    </>
  );
}

// Confetti burst
function Confetti({ active }) {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    color: ["#C9A84C", "#4CAF50", "#E74C3C", "#3498DB", "#F39C12", "#9B59B6"][i % 6],
    left: `${(i * 37 + 5) % 95}%`,
    delay: `${(i * 0.05) % 0.6}s`,
    size: 8 + (i % 6),
  }));
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.left, top: "-20px",
          width: p.size, height: p.size,
          background: p.color,
          borderRadius: i % 3 === 0 ? "50%" : "2px",
          animation: `fall 1.2s ease-in ${p.delay} forwards`,
        }} />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function HariRayaCabaran() {
  const [phase, setPhase] = useState("start"); // start | playing | revealed | end
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [timer, setTimer] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [revealAnim, setRevealAnim] = useState(false);
  const intervalRef = useRef(null);

  const q = SOALAN[idx];
  const isSunnah = q?.jawapan === "sunnah";

  // Timer logic
  useEffect(() => {
    if (timerOn && timer > 0) {
      intervalRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerOn, timer]);

  const timerColor = timer > 15 ? "#2ECC71" : timer > 7 ? "#E67E22" : "#E74C3C";
  const timerPct = (timer / 30) * 100;

  const handleStart = () => {
    setPhase("playing");
    setTimer(30);
    setTimerOn(true);
    setRevealAnim(false);
  };

  const handleReveal = () => {
    setTimerOn(false);
    setPhase("revealed");
    setConfetti(true);
    setRevealAnim(true);
    setTimeout(() => setConfetti(false), 1400);
  };

  const addScore = (team) => {
    setScores(s => ({ ...s, [team]: s[team] + 1 }));
  };

  const handleNext = () => {
    if (idx + 1 >= SOALAN.length) {
      setPhase("end");
    } else {
      setIdx(i => i + 1);
      setPhase("playing");
      setTimer(30);
      setTimerOn(true);
      setRevealAnim(false);
    }
  };

  const handleReset = () => {
    setPhase("start");
    setIdx(0);
    setScores({ A: 0, B: 0 });
    setTimer(30);
    setTimerOn(false);
    setRevealAnim(false);
  };

  const winner =
    scores.A > scores.B ? "A" : scores.B > scores.A ? "B" : "SERI";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #071C12 0%, #0A2818 40%, #0C3020 100%)",
      color: "#FFF8E7",
      fontFamily: "'Segoe UI', Trebuchet MS, system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Stars />
        <Ketupat size={140} opacity={0.09} x={-30} y={60} rotate={15} />
        <Ketupat size={100} opacity={0.08} x="80%" y={20} rotate={-10} />
        <Ketupat size={70} opacity={0.07} x="88%" y="70%" rotate={30} />
        <Ketupat size={110} opacity={0.07} x={10} y="75%" rotate={-20} />
        <Crescent size={220} opacity={0.06} x="-40px" y="-40px" />
        <Crescent size={160} opacity={0.05} x="calc(100% - 120px)" y="calc(100% - 120px)" />
        {/* Gold border line top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, #C9A84C, #E6C55A, #C9A84C, transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, #C9A84C, #E6C55A, #C9A84C, transparent)" }} />
      </div>

      <Confetti active={confetti} />

      {/* ── HEADER ── */}
      <header style={{
        padding: "18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        background: "rgba(0,0,0,0.25)",
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 32 }}>🌙</span>
          <div>
            <div style={{ fontSize: 13, color: "#C9A84C", letterSpacing: 4, fontWeight: 700, textTransform: "uppercase" }}>
              Aktiviti Pendidikan Islam
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#FFF8E7", letterSpacing: 1 }}>
              CABARAN KAD · HARI RAYA
            </div>
          </div>
        </div>

        {phase !== "start" && phase !== "end" && (
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6 }}>
              {SOALAN.map((_, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: i < idx ? "#C9A84C" : i === idx ? "#FFF8E7" : "rgba(255,255,255,0.15)",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: 16, color: "#aaa" }}>
              {idx + 1} / {SOALAN.length}
            </span>
          </div>
        )}

        {/* Team score badges in header */}
        {(phase === "playing" || phase === "revealed") && (
          <div style={{ display: "flex", gap: 12 }}>
            {["A", "B"].map(team => (
              <div key={team} style={{
                background: "rgba(201,168,76,0.1)",
                border: "1.5px solid rgba(201,168,76,0.4)",
                borderRadius: 10,
                padding: "6px 20px",
                textAlign: "center",
                minWidth: 80,
              }}>
                <div style={{ fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 2 }}>KPL {team}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#C9A84C", lineHeight: 1 }}>{scores[team]}</div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 60px", gap: 20, position: "relative", zIndex: 5 }}>

        {/* ── START SCREEN ── */}
        {phase === "start" && (
          <div style={{ textAlign: "center", maxWidth: 860, animation: "fade-in 0.5s ease" }}>
            <div style={{ fontSize: 80, marginBottom: 12, filter: "drop-shadow(0 0 20px rgba(201,168,76,0.3))" }}>☪️</div>
            <h1 style={{ fontSize: 56, fontWeight: 900, margin: "0 0 12px", background: "linear-gradient(135deg, #C9A84C, #E6C55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SETUJU atau TIDAK?
            </h1>
            <p style={{ fontSize: 22, color: "rgba(255,248,231,0.75)", marginBottom: 40, lineHeight: 1.7 }}>
              Guru akan tunjukkan <strong style={{ color: "#C9A84C" }}>10 situasi</strong> hari raya.<br />
              Angkat kad anda — kemudian debat bersama kelas!
            </p>

            {/* Legend cards */}
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 48 }}>
              <div style={{
                background: "rgba(46,204,113,0.1)",
                border: "2.5px solid #2ECC71",
                borderRadius: 20,
                padding: "24px 48px",
                flex: 1, maxWidth: 280,
              }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#2ECC71" }}>SUNNAH</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>Amalan yang dituntut Nabi ﷺ</div>
              </div>
              <div style={{
                background: "rgba(231,76,60,0.1)",
                border: "2.5px solid #E74C3C",
                borderRadius: 20,
                padding: "24px 48px",
                flex: 1, maxWidth: 280,
              }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>❌</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#E74C3C" }}>BUKAN SUNNAH</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>Amalan yang perlu dielak</div>
              </div>
            </div>

            <button onClick={handleStart} style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E6C55A 50%, #C9A84C 100%)",
              color: "#071C12",
              border: "none",
              borderRadius: 18,
              padding: "22px 72px",
              fontSize: 28,
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: 2,
              boxShadow: "0 6px 32px rgba(201,168,76,0.35)",
              transition: "transform 0.15s",
            }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              🚀 MULA SEKARANG
            </button>
          </div>
        )}

        {/* ── PLAYING / REVEALED ── */}
        {(phase === "playing" || phase === "revealed") && (
          <div style={{ width: "100%", maxWidth: 1060, display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Timer bar */}
            {phase === "playing" && (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: timerColor, minWidth: 56, transition: "color 0.4s", fontVariantNumeric: "tabular-nums" }}>
                  {timer}s
                </span>
                <div style={{ flex: 1, height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 10 }}>
                  <div style={{
                    height: "100%",
                    width: `${timerPct}%`,
                    borderRadius: 10,
                    background: `linear-gradient(90deg, ${timerColor}, ${timerColor}aa)`,
                    transition: "width 1s linear, background 0.4s",
                  }} />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.35)" }}>masa debat</span>
              </div>
            )}

            {/* Main question card */}
            <div style={{
              background: phase === "revealed"
                ? isSunnah
                  ? "linear-gradient(135deg, rgba(46,204,113,0.12) 0%, rgba(39,174,96,0.06) 100%)"
                  : "linear-gradient(135deg, rgba(231,76,60,0.12) 0%, rgba(192,57,43,0.06) 100%)"
                : "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(255,255,255,0.03) 100%)",
              border: `3px solid ${phase === "revealed"
                ? isSunnah ? "rgba(46,204,113,0.6)" : "rgba(231,76,60,0.6)"
                : "rgba(201,168,76,0.35)"}`,
              borderRadius: 28,
              padding: "44px 64px",
              textAlign: "center",
              transition: "all 0.45s ease",
              position: "relative",
              boxShadow: phase === "revealed"
                ? isSunnah ? "0 0 40px rgba(46,204,113,0.1)" : "0 0 40px rgba(231,76,60,0.1)"
                : "0 0 40px rgba(201,168,76,0.05)",
            }}>
              <div style={{ fontSize: 52, marginBottom: 18, lineHeight: 1 }}>{q.icon}</div>
              <p style={{
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 1.65,
                color: "#FFF8E7",
                margin: 0,
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}>
                "{q.situasi}"
              </p>
            </div>

            {/* Answer reveal */}
            {phase === "revealed" && (
              <div style={{
                display: "flex",
                gap: 16,
                animation: revealAnim ? "slide-up 0.4s ease forwards" : "none",
              }}>
                {/* Verdict badge */}
                <div style={{
                  background: isSunnah ? "rgba(46,204,113,0.12)" : "rgba(231,76,60,0.12)",
                  border: `3px solid ${isSunnah ? "#2ECC71" : "#E74C3C"}`,
                  borderRadius: 20,
                  padding: "20px 32px",
                  textAlign: "center",
                  minWidth: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}>
                  <div style={{ fontSize: 44 }}>{isSunnah ? "✅" : "❌"}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: isSunnah ? "#2ECC71" : "#E74C3C", letterSpacing: 1 }}>
                    {isSunnah ? "SUNNAH" : "BUKAN SUNNAH"}
                  </div>
                </div>
                {/* Explanation */}
                <div style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(201,168,76,0.2)",
                  borderRadius: 20,
                  padding: "22px 32px",
                  display: "flex",
                  alignItems: "center",
                }}>
                  <p style={{ fontSize: 21, lineHeight: 1.75, color: "rgba(255,248,231,0.9)", margin: 0 }}>
                    {q.huraian}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── END SCREEN ── */}
        {phase === "end" && (
          <div style={{ textAlign: "center", maxWidth: 700, animation: "fade-in 0.5s ease" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎊</div>
            <h1 style={{ fontSize: 48, fontWeight: 900, margin: "0 0 32px", background: "linear-gradient(135deg, #C9A84C, #E6C55A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CABARAN SELESAI!
            </h1>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 28 }}>
              {["A", "B"].map(team => (
                <div key={team} style={{
                  background: winner === team ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                  border: `3px solid ${winner === team ? "#C9A84C" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 24,
                  padding: "32px 56px",
                  textAlign: "center",
                  boxShadow: winner === team ? "0 0 30px rgba(201,168,76,0.2)" : "none",
                }}>
                  {winner === team && <div style={{ fontSize: 32, marginBottom: 6 }}>🏆</div>}
                  <div style={{ fontSize: 16, color: "#aaa", letterSpacing: 3, marginBottom: 8 }}>KUMPULAN {team}</div>
                  <div style={{ fontSize: 72, fontWeight: 900, color: winner === team ? "#C9A84C" : "#FFF8E7", lineHeight: 1 }}>
                    {scores[team]}
                  </div>
                  <div style={{ fontSize: 15, color: "#aaa", marginTop: 6 }}>mata</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 36, color: "#FFF8E7" }}>
              {winner === "SERI"
                ? "🤝 Seri! Dua-dua kumpulan hebat!"
                : `🎉 Tahniah Kumpulan ${winner}!`}
            </div>
            <button onClick={handleReset} style={{
              background: "linear-gradient(135deg, #C9A84C, #E6C55A)",
              color: "#071C12",
              border: "none",
              borderRadius: 16,
              padding: "18px 52px",
              fontSize: 22,
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
            }}>
              🔄 MAIN SEMULA
            </button>
          </div>
        )}
      </main>

      {/* ── FOOTER CONTROLS ── */}
      {(phase === "playing" || phase === "revealed") && (
        <footer style={{
          padding: "16px 40px",
          borderTop: "1px solid rgba(201,168,76,0.18)",
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          gap: 12,
        }}>
          {/* +1 mata buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            {["A", "B"].map(team => (
              <button key={team} onClick={() => addScore(team)}
                disabled={phase !== "revealed"}
                style={{
                  background: phase === "revealed" ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                  border: `2px solid ${phase === "revealed" ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12,
                  padding: "10px 24px",
                  color: phase === "revealed" ? "#C9A84C" : "rgba(255,255,255,0.2)",
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: phase === "revealed" ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  letterSpacing: 0.5,
                }}
              >
                +1 Kumpulan {team}
              </button>
            ))}
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", alignSelf: "center", marginLeft: 4 }}>
              {phase === "revealed" ? "Beri mata kepada kumpulan yang betul" : "Jawapan belum didedah"}
            </span>
          </div>

          {/* Primary CTA */}
          {phase === "playing" && (
            <button onClick={handleReveal} style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E6C55A 100%)",
              color: "#071C12",
              border: "none",
              borderRadius: 16,
              padding: "18px 52px",
              fontSize: 22,
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: 1.5,
              boxShadow: "0 4px 24px rgba(201,168,76,0.35)",
              animation: "pulse-border 2s infinite",
            }}>
              🔍 DEDAH JAWAPAN
            </button>
          )}
          {phase === "revealed" && (
            <button onClick={handleNext} style={{
              background: "linear-gradient(135deg, #1A6B3C 0%, #27AE60 100%)",
              color: "#FFF",
              border: "none",
              borderRadius: 16,
              padding: "18px 52px",
              fontSize: 22,
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: 1.5,
              boxShadow: "0 4px 24px rgba(39,174,96,0.3)",
            }}>
              {idx + 1 >= SOALAN.length ? "🏁 LIHAT KEPUTUSAN" : "➡️ SOALAN SETERUSNYA"}
            </button>
          )}
        </footer>
      )}
    </div>
  );
}
