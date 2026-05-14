import { useState } from "react";

const CAMPUS_LOCATIONS = {
  blocoAB:     { x: 195, y: 295, label: "Blocos A e B",          desc: "Biblioteca, Reitoria, Pró-Reitoria, RH, Grupo de Tecnologia" },
  lanchonetes: { x: 308, y: 258, label: "Lanchonetes",           desc: "Área de alimentação do campus" },
  blocoCDE:    { x: 352, y: 195, label: "Blocos C, D e E",       desc: "Brinquedoteca, Anfiteatros E-001/E-002, Central de Eventos, Labs" },
  teatro:      { x: 310, y: 308, label: "Teatro Veritas",        desc: "Teatro universitário" },
  blocoFG:     { x: 412, y: 265, label: "Blocos F e G",          desc: "Labs de Informática, Chapel, Ciências Humanas e Exatas" },
  blocoJ:      { x: 505, y: 193, label: "Bloco J",               desc: "Restaurante, Auditórios João Paulo II e Clélia Merloni, Labs" },
  blocoK:      { x: 575, y: 242, label: "Bloco K",               desc: "NUPHIS, Empresa Júnior, Clínicas de Fisioterapia, Psicologia e Odontologia" },
  prefCampus:  { x: 622, y: 148, label: "Prefeitura do Campus",  desc: "Prefeitura do Campus e Setor de Transportes" },
  blocoO:      { x: 688, y: 168, label: "Bloco O",               desc: "Clínicas de Odontologia, Auditórios O 002 e O 004, Labs" },
  blocoL:      { x: 742, y: 118, label: "Bloco L",               desc: "Pró-Reitoria de Pesquisa e Pós-Graduação, Anfiteatro L003, Labs" },
  quadra:      { x: 778, y: 88,  label: "Quadra Poliesportiva",  desc: "Quadra poliesportiva coberta" },
  labEng:      { x: 115, y: 348, label: "Lab. de Engenharia",    desc: "Laboratório de Engenharia" },
  labSalas:    { x: 710, y: 268, label: "Labs e Salas de Aula",  desc: "Laboratórios e salas de aula" },
};

const EVENTS = [
  {
    id: 1,
    title: "Hack@Day",
    locationKey: "blocoCDE",
    block: "Sala E001",
    description: "Uma semana de palestras, workshops e hackathons com empresas de tecnologia. Aprenda, conecte-se e inove com colegas e profissionais da área.",
    category: "Tecnologia",
    date: "11 Mai", time: "19h–22h",
    involved: ["Centro Acadêmico de TI", "Prof. Rodrigo Matos", "TechCorp"],
    flyer: "💻", color: "#4F46E5",
    reactions: { "🔥": 24, "👏": 18, "😮": 7, "❤️": 31 },
  },
  {
    id: 2,
    title: "Festival de Arte & Design",
    locationKey: "blocoFG",
    block: "Blocos C, D e E – Central de Eventos",
    description: "Exposição coletiva dos alunos de design, arquitetura e artes visuais. Performances ao vivo, instalações e feira de produtos artesanais.",
    category: "Arte",
    date: "23 Mai", time: "10h–20h",
    involved: ["DAA – Diretório Acadêmico", "Profa. Carla Vaz", "Coletivo Pixel"],
    flyer: "🎨", color: "#DB2777",
    reactions: { "🔥": 41, "👏": 29, "😮": 13, "❤️": 56 },
  },
  {
    id: 3,
    title: "Jornada Científica",
    locationKey: "blocoL",
    block: "Bloco L – Pró-Reitoria de Pesquisa",
    description: "Apresentação de trabalhos de IC, pós-graduação e pesquisas de extensão. Avaliação por bancas compostas por professores e pesquisadores externos.",
    category: "Pesquisa",
    date: "27 Mai", time: "09h–17h",
    involved: ["Pró-Reitoria de Pesquisa", "Prof. André Lemos", "CNPq"],
    flyer: "🔬", color: "#059669",
    reactions: { "🔥": 15, "👏": 33, "😮": 22, "❤️": 19 },
  },
  {
    id: 4,
    title: "Copa dos Calouros",
    locationKey: "quadra",
    block: "Quadra Poliesportiva",
    description: "Torneio esportivo entre turmas do 1º ano. Modalidades: futebol, vôlei e basquete. Troféu e premiação para os vencedores.",
    category: "Esporte",
    date: "30 Mai", time: "14h–19h",
    involved: ["Atlética Unisagrado", "Coord. de Esportes", "Turmas 2025"],
    flyer: "⚽", color: "#D97706",
    reactions: { "🔥": 67, "👏": 45, "😮": 8, "❤️": 38 },
  },
  {
    id: 5,
    title: "Roda de Debates",
    locationKey: "blocoJ",
    block: "Bloco J – Auditório João Paulo II",
    description: "Debate aberto sobre políticas estudantis, reforma universitária e participação democrática. Mediado pelo DCE com representantes de todos os cursos.",
    category: "Política",
    date: "3 Jun", time: "18h–21h",
    involved: ["DCE Unisagrado", "Centros Acadêmicos", "Profa. Mariana Costa"],
    flyer: "🗣️", color: "#7C3AED",
    reactions: { "🔥": 29, "👏": 52, "😮": 34, "❤️": 21 },
  },
  {
    id: 6,
    title: "Noite Cultural Intercâmbio",
    locationKey: "blocoK",
    block: "Bloco K – Empresa Júnior",
    description: "Celebração da diversidade cultural com alunos estrangeiros e brasileiros. Apresentações musicais, dança, culinária internacional e exposição fotográfica.",
    category: "Cultura",
    date: "7 Jun", time: "17h–22h",
    involved: ["Assessoria Internacional", "Alunos Intercambistas", "Grupo Folclore BR"],
    flyer: "🌍", color: "#0891B2",
    reactions: { "🔥": 88, "👏": 61, "😮": 19, "❤️": 74 },
  },
];

const CATEGORY_COLORS = {
  Tecnologia: { bg: "#EEF2FF", text: "#4338CA" },
  Arte:       { bg: "#FDF2F8", text: "#9D174D" },
  Pesquisa:   { bg: "#ECFDF5", text: "#065F46" },
  Esporte:    { bg: "#FFFBEB", text: "#92400E" },
  Política:   { bg: "#F5F3FF", text: "#5B21B6" },
  Cultura:    { bg: "#ECFEFF", text: "#164E63" },
};

const REACTION_EMOJIS = ["🔥", "👏", "😮", "❤️"];

// Árvores decorativas nos gramados
const TREES = [
  [128,158],[155,152],[188,146],[224,142],[262,138],[300,134],[338,130],[376,127],[414,124],[452,121],[490,118],[528,115],[566,112],[604,109],[642,106],[680,103],[718,100],[756,97],
  [100,310],[100,360],[100,415],[100,460],[100,490],
  [795,210],[795,280],[795,350],[795,420],[795,470],
  [200,440],[280,445],[360,450],[440,450],[520,450],[600,445],[680,440],[760,435],
];

function Tree({ x, y }) {
  return (
    <g>
      <rect x={x - 2} y={y + 7} width={4} height={8} fill="#5a3a1a" />
      <circle cx={x} cy={y} r={10} fill="#1a3d18" />
      <circle cx={x} cy={y - 4} r={7} fill="#226120" />
    </g>
  );
}

function Building({ x, y, w, h, color, hoverColor, label, active, rows = 3, cols = 5, roofH = 10 }) {
  const winW = 12, winH = 14;
  const colStep = (w - 12) / Math.max(cols - 1, 1);
  const rowStep = (h - 12) / Math.max(rows - 1, 1);
  return (
    <g>
      {/* telhado */}
      <rect x={x} y={y - roofH} width={w} height={roofH} rx="2" fill={active ? hoverColor : color} opacity={0.9} />
      {/* corpo */}
      <rect x={x} y={y} width={w} height={h} rx="3" fill={active ? hoverColor : color} stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      {/* janelas */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect key={`${r}-${c}`}
            x={x + 6 + c * colStep} y={y + 7 + r * rowStep}
            width={winW} height={winH}
            fill="#87CEEB" opacity="0.35" rx="1" />
        ))
      )}
      {label && (
        <text x={x + w / 2} y={y + h + 14} textAnchor="middle"
          fill="#ffffffcc" fontSize="8" fontFamily="sans-serif" fontWeight="bold">{label}</text>
      )}
    </g>
  );
}

function CampusMap({ events, selectedId, onSelect }) {
  const [hovered, setHovered] = useState(null);

  const activeKey = hovered;

  return (
    <svg
  viewBox="0 0 900 520"
  preserveAspectRatio="xMidYMid meet"
  style={{
    width: "100%",
    minHeight: window.innerWidth < 768 ? 260 : "auto",
    display: "block",
    borderRadius: 12,
    background: "#1a2e1a",
  }}
>
      {/* fundo gramado */}
      <rect width="900" height="520" fill="#2d5a27" />

      {/* Rua Irmã Arminda — faixa diagonal topo */}
      <polygon points="0,50 900,0 900,52 0,105" fill="#3a3a3a" />
      <polygon points="0,103 900,50 900,56 0,110" fill="#4a4a44" />
      <line x1="0" y1="75" x2="900" y2="24" stroke="#fff" strokeWidth="0.8" strokeDasharray="28,18" opacity="0.25" />

      {/* Rua lateral direita */}
      <polygon points="818,52 900,48 900,520 818,520" fill="#3a3a3a" />
      <line x1="858" y1="50" x2="858" y2="520" stroke="#fff" strokeWidth="0.8" strokeDasharray="28,18" opacity="0.2" />

      {/* Rua lateral esquerda */}
      <polygon points="0,103 82,100 82,520 0,520" fill="#3a3a3a" />

      {/* Calçadas internas */}
      <line x1="82" y1="195" x2="818" y2="145" stroke="#55664455" strokeWidth="7" />
      <line x1="82" y1="395" x2="818" y2="395" stroke="#55664455" strokeWidth="7" />
      <line x1="318" y1="103" x2="318" y2="520" stroke="#55664455" strokeWidth="7" />
      <line x1="578" y1="90" x2="578" y2="520" stroke="#55664455" strokeWidth="7" />

      {/* Gramados centrais */}
      <ellipse cx="200" cy="420" rx="55" ry="25" fill="#256b20" opacity="0.6" />
      <ellipse cx="700" cy="380" rx="55" ry="22" fill="#256b20" opacity="0.6" />

      {/* Árvores */}
      {TREES.map(([tx, ty], i) => <Tree key={i} x={tx} y={ty} />)}

      {/* ===== ESTACIONAMENTOS ===== */}
      {[[88, 450, 155, 52], [490, 325, 270, 48], [638, 315, 150, 48]].map(([ex, ey, ew, eh], i) => (
        <g key={i}>
          <rect x={ex} y={ey} width={ew} height={eh} rx="3" fill="#22222299" />
          {Array.from({ length: Math.floor(ew / 20) }).map((_, j) => (
            <line key={j} x1={ex + 12 + j * 20} y1={ey} x2={ex + 12 + j * 20} y2={ey + eh} stroke="#ffffff18" strokeWidth="1" />
          ))}
          <text x={ex + ew / 2} y={ey + eh / 2 + 4} textAnchor="middle" fill="#ffffff33" fontSize="7" fontFamily="sans-serif">Estacionamento</text>
        </g>
      ))}

      {/* ===== PORTÕES ===== */}
      {[
        { x: 84, y: 400, label: "Portão 1" },
        { x: 84, y: 205, label: "Portão 5" },
        { x: 750, y: 76, label: "Portão 4" },
        { x: 790, y: 345, label: "Portão 2" },
        { x: 790, y: 173, label: "Portão 3" },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect x={x} y={y} width={26} height={32} rx="2" fill="#c8b560" stroke="#8a7a30" strokeWidth="0.8" />
          <text x={x + 13} y={y + 42} textAnchor="middle" fill="#ffffffaa" fontSize="6.5" fontFamily="sans-serif">{label}</text>
        </g>
      ))}

      {/* Pontos de ônibus */}
      {[[84, 272], [790, 250]].map(([bx, by], i) => (
        <g key={i}>
          <rect x={bx} y={by} width={22} height={28} rx="2" fill="#1a66bb" />
          <text x={bx + 11} y={by + 38} textAnchor="middle" fill="#ffffffaa" fontSize="6" fontFamily="sans-serif">Ônibus</text>
        </g>
      ))}

      {/* ===== BLOCOS ===== */}

      {/* Lab Engenharia */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("labEng")} onMouseLeave={() => setHovered(null)}>
        <Building x={88} y={310} w={55} h={65} color="#8B7355" hoverColor="#b09055" label="" active={activeKey === "labEng"} rows={3} cols={3} />
        <text x={115} y={390} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">Lab. Eng.</text>
      </g>

      {/* Blocos A e B */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoAB")} onMouseLeave={() => setHovered(null)}>
        <Building x={120} y={248} w={145} h={88} color="#A0825A" hoverColor="#c8a060" label="" active={activeKey === "blocoAB"} rows={3} cols={6} />
        <text x={192} y={352} textAnchor="middle" fill="#ffffffcc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Blocos A e B</text>
      </g>

      {/* Lanchonetes */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("lanchonetes")} onMouseLeave={() => setHovered(null)}>
        <Building x={272} y={230} w={52} h={40} color="#c06030" hoverColor="#e07840" label="" active={activeKey === "lanchonetes"} rows={2} cols={3} roofH={8} />
        <text x={298} y={282} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">Lanchonetes</text>
      </g>

      {/* Teatro Veritas */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("teatro")} onMouseLeave={() => setHovered(null)}>
        <Building x={272} y={278} w={68} h={55} color="#6a4499" hoverColor="#8855cc" label="" active={activeKey === "teatro"} rows={2} cols={4} />
        <polygon points="272,278 340,278 306,258" fill={activeKey === "teatro" ? "#9966dd" : "#7a55aa"} />
        <text x={306} y={345} textAnchor="middle" fill="#ffffffcc" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Teatro Veritas</text>
      </g>

      {/* Blocos C D E */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoCDE")} onMouseLeave={() => setHovered(null)}>
        <Building x={285} y={162} w={133} h={75} color="#9A7B50" hoverColor="#c8a060" label="" active={activeKey === "blocoCDE"} rows={3} cols={6} />
        <text x={351} y={250} textAnchor="middle" fill="#ffffffcc" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Blocos C, D e E</text>
      </g>

      {/* Blocos F G */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoFG")} onMouseLeave={() => setHovered(null)}>
        <Building x={348} y={218} w={125} h={85} color="#A0825A" hoverColor="#c8a060" label="" active={activeKey === "blocoFG"} rows={3} cols={6} />
        {/* antena chapel */}
        <rect x={400} y={192} width={6} height={28} fill="#8a7a6a" />
        <polygon points="397,192 409,192 403,178" fill="#9a8a7a" />
        <text x={410} y={316} textAnchor="middle" fill="#ffffffcc" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">Blocos F e G</text>
      </g>

      {/* Bloco J */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoJ")} onMouseLeave={() => setHovered(null)}>
        <Building x={455} y={148} w={105} h={82} color="#9A7B50" hoverColor="#c8a060" label="" active={activeKey === "blocoJ"} rows={3} cols={5} />
        <text x={507} y={244} textAnchor="middle" fill="#ffffffcc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Bloco J</text>
      </g>

      {/* Bloco K */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoK")} onMouseLeave={() => setHovered(null)}>
        <Building x={528} y={195} w={98} h={75} color="#3a8898" hoverColor="#4ab8d8" label="" active={activeKey === "blocoK"} rows={3} cols={5} />
        <text x={577} y={284} textAnchor="middle" fill="#ffffffcc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Bloco K</text>
      </g>

      {/* Prefeitura */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("prefCampus")} onMouseLeave={() => setHovered(null)}>
        <Building x={600} y={120} w={55} h={45} color="#884444" hoverColor="#c04040" label="" active={activeKey === "prefCampus"} rows={2} cols={3} roofH={8} />
        <rect x={625} y={102} width={4} height={20} fill="#aaa" />
        <circle cx={627} cy={100} r={4} fill="#ffaa00" />
        <text x={627} y={176} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">Prefeitura</text>
        <text x={627} y={184} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">Campus</text>
      </g>

      {/* Bloco O */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoO")} onMouseLeave={() => setHovered(null)}>
        <Building x={638} y={135} w={102} h={65} color="#3a8898" hoverColor="#4ab8d8" label="" active={activeKey === "blocoO"} rows={3} cols={5} />
        <text x={689} y={213} textAnchor="middle" fill="#ffffffcc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Bloco O</text>
      </g>

      {/* Bloco L */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoL")} onMouseLeave={() => setHovered(null)}>
        <Building x={698} y={93} w={92} h={58} color="#3a7a4a" hoverColor="#5bba6f" label="" active={activeKey === "blocoL"} rows={3} cols={5} roofH={9} />
        <text x={744} y={165} textAnchor="middle" fill="#ffffffcc" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Bloco L</text>
      </g>

      {/* Quadra Poliesportiva */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("quadra")} onMouseLeave={() => setHovered(null)}>
        <rect x={750} y={68} width={65} height={50} rx="3" fill={activeKey === "quadra" ? "#e8a020" : "#b07010"} stroke="#806000" strokeWidth="1.5" />
        <rect x={753} y={71} width={59} height={44} rx="1" fill="none" stroke="#ffffff44" strokeWidth="1" />
        <line x1={782} y1={71} x2={782} y2={115} stroke="#ffffff44" strokeWidth="1" />
        <circle cx={782} cy={93} r={8} fill="none" stroke="#ffffff44" strokeWidth="1" />
        <rect x={750} y={60} width={65} height={10} rx="2" fill={activeKey === "quadra" ? "#e8b030" : "#c08020"} />
        <text x={782} y={132} textAnchor="middle" fill="#ffffffcc" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold">Quadra</text>
        <text x={782} y={141} textAnchor="middle" fill="#ffffffcc" fontSize="7.5" fontFamily="sans-serif">Poliesportiva</text>
      </g>

      {/* Labs e Salas de Aula (item 20) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("labSalas")} onMouseLeave={() => setHovered(null)}>
        <Building x={638} y={235} w={130} h={58} color="#7a6a5a" hoverColor="#9a8a7a" label="" active={activeKey === "labSalas"} rows={2} cols={6} roofH={8} />
        <text x={703} y={306} textAnchor="middle" fill="#ffffffaa" fontSize="7.5" fontFamily="sans-serif">Labs e Salas de Aula</text>
      </g>

      {/* ===== TOOLTIP DE HOVER ===== */}
      {activeKey && CAMPUS_LOCATIONS[activeKey] && (() => {
        const loc = CAMPUS_LOCATIONS[activeKey];
        const tx = Math.min(Math.max(loc.x - 72, 4), 720);
        const ty = loc.y - 70;
        return (
          <g>
            <rect x={tx} y={ty} width={154} height={50} rx="5" fill="#000000cc" stroke="#ffffff33" strokeWidth="0.5" />
            <text x={tx + 77} y={ty + 17} textAnchor="middle" fill="#fff" fontSize="9" fontFamily="sans-serif" fontWeight="bold">{loc.label}</text>
            <text x={tx + 77} y={ty + 31} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">{loc.desc.substring(0, 42)}</text>
            {loc.desc.length > 42 && <text x={tx + 77} y={ty + 42} textAnchor="middle" fill="#ffffffaa" fontSize="7" fontFamily="sans-serif">{loc.desc.substring(42, 80)}{loc.desc.length > 80 ? "…" : ""}</text>}
          </g>
        );
      })()}

      {/* ===== PINS DE EVENTOS ===== */}
      {events.map(ev => {
        const loc = CAMPUS_LOCATIONS[ev.locationKey];
        if (!loc) return null;
        const isSel = selectedId === ev.id;
        const py = loc.y - 30;
        return (
          <g key={ev.id} style={{ cursor: "pointer" }} onClick={() => onSelect(ev.id)}>
            <ellipse cx={loc.x} cy={loc.y + 4} rx={9} ry={3} fill="#00000055" />
            <line x1={loc.x} y1={py + 18} x2={loc.x} y2={loc.y + 3} stroke={ev.color} strokeWidth="2.5" />
            <circle cx={loc.x} cy={py} r={15} fill={isSel ? "#fff" : ev.color} stroke={isSel ? ev.color : "#fff"} strokeWidth="2" strokeOpacity="0.5" />
            <text x={loc.x} y={py + 5} textAnchor="middle" fontSize="15">{ev.flyer}</text>
            {isSel && (
              <text x={loc.x} y={py - 20} textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">{ev.title}</text>
            )}
          </g>
        );
      })}

      {/* Marca d'água */}
      <text x="820" y="515" textAnchor="end" fill="#ffffff18" fontSize="8" fontFamily="sans-serif">Campus Unisagrado · Bauru/SP</text>
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState("mural");
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: "", email: "" });
  const [reactions, setReactions] = useState(() =>
    Object.fromEntries(EVENTS.map(e => [e.id, { ...e.reactions }]))
  );
  const [userReactions, setUserReactions] = useState({});
  const [filterCat, setFilterCat] = useState("Todos");
  const [toast, setToast] = useState(null);

  const categories = ["Todos", ...Object.keys(CATEGORY_COLORS)];
  const filtered = filterCat === "Todos" ? EVENTS : EVENTS.filter(e => e.category === filterCat);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleReact = (eventId, emoji) => {
    if (!user) { setLoginModal(true); return; }
    const key = `${eventId}-${emoji}`;
    const already = userReactions[key];
    setUserReactions(prev => ({ ...prev, [key]: !already }));
    setReactions(prev => ({
      ...prev,
      [eventId]: { ...prev[eventId], [emoji]: (prev[eventId][emoji] || 0) + (already ? -1 : 1) },
    }));
    if (!already) showToast(`Você reagiu com ${emoji}`);
  };

  const handleLogin = () => {
    if (!loginForm.name || !loginForm.email) return;
    setUser({ name: loginForm.name, avatar: loginForm.name[0].toUpperCase() });
    setLoginModal(false);
    setLoginForm({ name: "", email: "" });
    showToast(`Bem-vindo(a), ${loginForm.name}! 👋`);
  };

  const selectedEvent = selected ? EVENTS.find(e => e.id === selected) : null;

  const S = { minHeight: "100vh", background: "#0F0F13", color: "#F1EFF8", fontFamily: "'Sora','DM Sans',sans-serif" };

  return (
    <div style={S}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <header style={{ borderBottom: "1px solid #1E1E28", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 50, background: "#0F0F13" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#C8102E,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 17 }}>Campus<span style={{ color: "#E63946" }}>Vivo</span></span>
            <span style={{ fontSize: 10, color: "#555", display: "block", lineHeight: 1 }}>Unisagrado · Bauru</span>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {[{ id: "mural", label: "Mural", icon: "📋" }, { id: "mapa", label: "Mapa", icon: "🗺️" }].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit", background: view === tab.id ? "#2a1015" : "transparent", color: view === tab.id ? "#E63946" : "#888" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#C8102E,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{user.avatar}</div>
              <button onClick={() => { setUser(null); setUserReactions({}); }} style={{ fontSize: 11, color: "#555", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>sair</button>
            </div>
          ) : (
            <button onClick={() => setLoginModal(true)} style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #2E1820", background: "#1a0a0e", color: "#E63946", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Entrar</button>
          )}
        </div>
      </header>

      {/* ===== MURAL ===== */}
      {view === "mural" && (
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
              Eventos na <span style={{ color: "#E63946" }}>Unisagrado</span>
            </h1>
            <p style={{ color: "#666", margin: 0, fontSize: 14 }}>Fique por dentro do que vai rolar no campus</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filterCat === cat ? "#C8102E" : "#1E1E28", background: filterCat === cat ? "#2a1015" : "transparent", color: filterCat === cat ? "#E63946" : "#888", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                {cat === "Todos" ? "✦ Todos" : cat}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
            {filtered.map(ev => {
              const cat = CATEGORY_COLORS[ev.category];
              return (
                <div key={ev.id} onClick={() => setSelected(ev.id)}
                  style={{ background: "#15141C", borderRadius: 14, border: "1px solid #1E1E28", overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ev.color + "66"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E1E28"; e.currentTarget.style.transform = ""; }}>
                  <div style={{ height: 100, background: `linear-gradient(135deg,${ev.color}22,${ev.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, borderBottom: "1px solid #1E1E28", position: "relative" }}>
                    <span style={{ position: "absolute", top: 10, left: 12, background: cat.bg, color: cat.text, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{ev.category}</span>
                    {ev.flyer}
                  </div>
                  <div style={{ padding: "1rem 1.1rem 0.8rem" }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>{ev.title}</h3>
                    <p style={{ margin: "0 0 6px", fontSize: 11, color: "#666" }}>📍 {ev.block}</p>
                    <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "#AAA", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ev.description}</p>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: "#888", background: "#1E1E28", padding: "3px 8px", borderRadius: 6 }}>📅 {ev.date}</span>
                      <span style={{ fontSize: 11, color: "#888", background: "#1E1E28", padding: "3px 8px", borderRadius: 6 }}>🕐 {ev.time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, paddingTop: 10, borderTop: "1px solid #1E1E28" }} onClick={e => e.stopPropagation()}>
                      {REACTION_EMOJIS.map(emoji => {
                        const reacted = userReactions[`${ev.id}-${emoji}`];
                        return (
                          <button key={emoji} onClick={() => handleReact(ev.id, emoji)}
                            style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", borderRadius: 20, border: `1px solid ${reacted ? ev.color + "99" : "#1E1E28"}`, background: reacted ? ev.color + "22" : "transparent", cursor: "pointer", fontSize: 12, fontFamily: "inherit", color: reacted ? "#FFF" : "#888", transition: "all 0.15s" }}>
                            {emoji} <span style={{ fontSize: 11 }}>{reactions[ev.id][emoji] || 0}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
              );
            })}
          </div>
        </main>
      )}

      {/* ===== MAPA ===== */}
      {view === "mapa" && (
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>Mapa do Campus</h2>
            <p style={{ color: "#666", margin: 0, fontSize: 14 }}>Clique nos pins coloridos para ver os detalhes</p>
          </div>
          <div
  style={{
    display: "grid",
    gridTemplateColumns:
      window.innerWidth < 768 ? "1fr" : "1fr 270px",
    gap: "1.5rem",
    alignItems: "start",
  }}
>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #1E1E28" }}>
              <CampusMap events={EVENTS} selectedId={selected} onSelect={id => setSelected(selected === id ? null : id)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.5px" }}>Eventos no campus</p>
              {EVENTS.map(ev => (
                <div key={ev.id} onClick={() => setSelected(selected === ev.id ? null : ev.id)}
                  style={{ background: selected === ev.id ? "#1a1020" : "#15141C", borderRadius: 10, border: `1px solid ${selected === ev.id ? ev.color + "66" : "#1E1E28"}`, padding: "10px 12px", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: ev.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{ev.flyer}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{ev.title}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#666" }}>{ev.date} · {CAMPUS_LOCATIONS[ev.locationKey]?.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedEvent && (
            <div style={{ marginTop: "1.5rem", background: "#15141C", borderRadius: 14, border: `1px solid ${selectedEvent.color}44`, padding: "1.4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <span style={{ fontSize: 38 }}>{selectedEvent.flyer}</span>
                <div>
                  <span style={{ background: CATEGORY_COLORS[selectedEvent.category].bg, color: CATEGORY_COLORS[selectedEvent.category].text, fontSize: 11, padding: "2px 10px", borderRadius: 20, fontWeight: 600 }}>{selectedEvent.category}</span>
                  <h3 style={{ margin: "4px 0 2px", fontSize: 18, fontWeight: 700 }}>{selectedEvent.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "#888" }}>📍 {selectedEvent.block} · 📅 {selectedEvent.date} · 🕐 {selectedEvent.time}</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#AAA", lineHeight: 1.6, marginBottom: 12 }}>{selectedEvent.description}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {selectedEvent.involved.map((p, i) => <span key={i} style={{ fontSize: 11, color: "#888", background: "#1E1E28", padding: "3px 10px", borderRadius: 20 }}>👤 {p}</span>)}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {REACTION_EMOJIS.map(emoji => {
                  const reacted = userReactions[`${selectedEvent.id}-${emoji}`];
                  return (
                    <button key={emoji} onClick={() => handleReact(selectedEvent.id, emoji)}
                      style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 6px", borderRadius: 10, border: `1px solid ${reacted ? selectedEvent.color : "#1E1E28"}`, background: reacted ? selectedEvent.color + "22" : "#0A0A10", cursor: "pointer", fontFamily: "inherit" }}>
                      <span style={{ fontSize: 20 }}>{emoji}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: reacted ? "#FFF" : "#888" }}>{reactions[selectedEvent.id][emoji] || 0}</span>
                    </button>
                  );
                })}
              </div>
              {!user && <p style={{ fontSize: 12, color: "#555", marginTop: 10, textAlign: "center" }}>
                <span onClick={() => setLoginModal(true)} style={{ color: "#E63946", cursor: "pointer", textDecoration: "underline" }}>Entre</span> para reagir
              </p>}
            </div>
          )}
        </main>
      )}

      {/* MODAL DETALHE */}
      {selectedEvent && view === "mural" && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "#000000AA", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#15141C", borderRadius: 18, border: `1px solid ${selectedEvent.color}44`, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ height: 120, background: `linear-gradient(135deg,${selectedEvent.color}33,${selectedEvent.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, position: "relative" }}>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 12, right: 12, background: "#00000055", border: "none", color: "#FFF", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 16, fontFamily: "inherit" }}>✕</button>
              {selectedEvent.flyer}
            </div>
            <div style={{ padding: "1.4rem" }}>
              <span style={{ background: CATEGORY_COLORS[selectedEvent.category].bg, color: CATEGORY_COLORS[selectedEvent.category].text, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{selectedEvent.category}</span>
              <h2 style={{ margin: "8px 0 4px", fontSize: 20, fontWeight: 700 }}>{selectedEvent.title}</h2>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#777" }}>📍 {selectedEvent.block}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "#AAA", background: "#1E1E28", padding: "5px 12px", borderRadius: 8 }}>📅 {selectedEvent.date}</span>
                <span style={{ fontSize: 12, color: "#AAA", background: "#1E1E28", padding: "5px 12px", borderRadius: 8 }}>🕐 {selectedEvent.time}</span>
              </div>
              <p style={{ fontSize: 14, color: "#BBB", lineHeight: 1.7, marginBottom: 14 }}>{selectedEvent.description}</p>
              <p style={{ fontSize: 11, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Envolvidos</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {selectedEvent.involved.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#AAA" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: selectedEvent.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: selectedEvent.color, fontWeight: 700 }}>{p[0]}</div>
                    {p}
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: "1px solid #1E1E28" }}>
                <p style={{ fontSize: 11, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>{user ? "Reaja ao evento" : "Faça login para reagir"}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {REACTION_EMOJIS.map(emoji => {
                    const reacted = userReactions[`${selectedEvent.id}-${emoji}`];
                    return (
                      <button key={emoji} onClick={() => handleReact(selectedEvent.id, emoji)}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 6px", borderRadius: 10, border: `1px solid ${reacted ? selectedEvent.color : "#1E1E28"}`, background: reacted ? selectedEvent.color + "22" : "#0A0A10", cursor: "pointer", fontFamily: "inherit" }}>
                        <span style={{ fontSize: 22 }}>{emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: reacted ? "#FFF" : "#888" }}>{reactions[selectedEvent.id][emoji] || 0}</span>
                      </button>
                    );
                  })}
                </div>
                {!user && <p style={{ fontSize: 12, color: "#555", textAlign: "center", marginTop: 10 }}>
                  <span onClick={() => { setSelected(null); setLoginModal(true); }} style={{ color: "#E63946", cursor: "pointer", textDecoration: "underline" }}>Entre agora</span> para reagir
                </p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {loginModal && (
        <div onClick={() => setLoginModal(false)} style={{ position: "fixed", inset: 0, background: "#000000AA", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#15141C", borderRadius: 18, border: "1px solid #2E1820", maxWidth: 380, width: "100%", padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: 38, marginBottom: 8 }}>🎓</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>Entrar no CampusVivo</h2>
              <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Use seu e-mail @unisagrado.edu.br</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Seu nome" value={loginForm.name} onChange={e => setLoginForm(p => ({ ...p, name: e.target.value }))} style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid #2E1828", background: "#0A0A10", color: "#F1EFF8", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <input placeholder="email@unisagrado.edu.br" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid #2E1828", background: "#0A0A10", color: "#F1EFF8", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <button onClick={handleLogin} style={{ padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#C8102E,#8B0000)", color: "#FFF", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Entrar →</button>
              <button onClick={() => setLoginModal(false)} style={{ padding: "10px", borderRadius: 10, border: "1px solid #2E1828", background: "transparent", color: "#666", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1a0a0e", border: "1px solid #C8102E44", color: "#E63946", padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 500, zIndex: 300, whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}