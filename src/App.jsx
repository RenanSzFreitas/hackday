import { useState } from "react";
import logo from "./assets/logoon.png";

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
    id: 1, title: "Hack@Day", locationKey: "blocoCDE", block: "Sala E001",
    description: "Uma semana de palestras, workshops e hackathons com empresas de tecnologia. Aprenda, conecte-se e inove com colegas e profissionais da área.",
    category: "Tecnologia", date: "11 Mai", time: "19h–22h",
    involved: ["Centro Acadêmico de TI", "Prof. Rodrigo Matos", "TechCorp"],
    flyer: "💻", color: "#4F46E5",
    reactions: { "🔥": 24, "👏": 18, "😮": 7, "❤️": 31 },
  },
  {
    id: 2, title: "Festival de Arte & Design", locationKey: "blocoFG", block: "Blocos C, D e E – Central de Eventos",
    description: "Exposição coletiva dos alunos de design, arquitetura e artes visuais. Performances ao vivo, instalações e feira de produtos artesanais.",
    category: "Arte", date: "23 Mai", time: "10h–20h",
    involved: ["DAA – Diretório Acadêmico", "Profa. Carla Vaz", "Coletivo Pixel"],
    flyer: "🎨", color: "#DB2777",
    reactions: { "🔥": 41, "👏": 29, "😮": 13, "❤️": 56 },
  },
  {
    id: 3, title: "Jornada Científica", locationKey: "blocoL", block: "Bloco L – Pró-Reitoria de Pesquisa",
    description: "Apresentação de trabalhos de IC, pós-graduação e pesquisas de extensão. Avaliação por bancas compostas por professores e pesquisadores externos.",
    category: "Pesquisa", date: "27 Mai", time: "09h–17h",
    involved: ["Pró-Reitoria de Pesquisa", "Prof. André Lemos", "CNPq"],
    flyer: "🔬", color: "#059669",
    reactions: { "🔥": 15, "👏": 33, "😮": 22, "❤️": 19 },
  },
  {
    id: 4, title: "Copa dos Calouros", locationKey: "quadra", block: "Quadra Poliesportiva",
    description: "Torneio esportivo entre turmas do 1º ano. Modalidades: futebol, vôlei e basquete. Troféu e premiação para os vencedores.",
    category: "Esporte", date: "30 Mai", time: "14h–19h",
    involved: ["Atlética Unisagrado", "Coord. de Esportes", "Turmas 2025"],
    flyer: "⚽", color: "#D97706",
    reactions: { "🔥": 67, "👏": 45, "😮": 8, "❤️": 38 },
  },
  {
    id: 5, title: "Roda de Debates", locationKey: "blocoJ", block: "Bloco J – Auditório João Paulo II",
    description: "Debate aberto sobre políticas estudantis, reforma universitária e participação democrática. Mediado pelo DCE com representantes de todos os cursos.",
    category: "Política", date: "3 Jun", time: "18h–21h",
    involved: ["DCE Unisagrado", "Centros Acadêmicos", "Profa. Mariana Costa"],
    flyer: "🗣️", color: "#7C3AED",
    reactions: { "🔥": 29, "👏": 52, "😮": 34, "❤️": 21 },
  },
  {
    id: 6, title: "Noite Cultural Intercâmbio", locationKey: "blocoK", block: "Bloco K – Empresa Júnior",
    description: "Celebração da diversidade cultural com alunos estrangeiros e brasileiros. Apresentações musicais, dança, culinária internacional e exposição fotográfica.",
    category: "Cultura", date: "7 Jun", time: "17h–22h",
    involved: ["Assessoria Internacional", "Alunos Intercambistas", "Grupo Folclore BR"],
    flyer: "🌍", color: "#0891B2",
    reactions: { "🔥": 88, "👏": 61, "😮": 19, "❤️": 74 },
  },
];

const CATEGORY_COLORS = {
  Tecnologia: { bg: "#EEF2FF", text: "#3730A3" },
  Arte:       { bg: "#FCE7F3", text: "#9D174D" },
  Pesquisa:   { bg: "#D1FAE5", text: "#065F46" },
  Esporte:    { bg: "#FEF3C7", text: "#92400E" },
  Política:   { bg: "#EDE9FE", text: "#5B21B6" },
  Cultura:    { bg: "#CFFAFE", text: "#164E63" },
};

const REACTION_EMOJIS = ["🔥", "👏", "😮", "❤️"];

// ─── Map helpers ─────────────────────────────────────────────────────────────

function Grass({ x, y, w, h }) {
  return (
    <rect x={x} y={y} width={w} height={h} fill="#2a5e24" rx="2" />
  );
}

function Windows({ x, y, w, h, rows = 2, cols = 4, winColor = "#a8d8ea" }) {
  const padX = 10, padY = 10;
  const cw = (w - padX * 2) / cols;
  const rh = (h - padY * 2) / rows;
  const ww = Math.max(cw * 0.5, 4);
  const wh = Math.max(rh * 0.5, 4);
  return (
    <>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`w-${r}-${c}`}
            x={x + padX + c * cw + (cw - ww) / 2}
            y={y + padY + r * rh + (rh - wh) / 2}
            width={ww} height={wh}
            fill={winColor} opacity="0.55" rx="1"
          />
        ))
      )}
    </>
  );
}

function Building({ x, y, w, h, color, roofColor, active, rows = 2, cols = 4, roofH = 12, accent }) {
  const hoverShift = active ? -2 : 0;
  return (
    <g transform={`translate(0,${hoverShift})`} style={{ transition: "transform 0.15s" }}>
      {/* shadow */}
      <rect x={x + 3} y={y + h + 2} width={w} height={6} fill="#00000022" rx="2" />
      {/* roof */}
      <rect x={x} y={y - roofH} width={w} height={roofH + 2} fill={active ? roofColor : roofColor} rx="3" />
      <rect x={x + 4} y={y - roofH + 3} width={w - 8} height={3} fill="#ffffff18" rx="1" />
      {/* facade */}
      <rect x={x} y={y} width={w} height={h} fill={active ? color : color} rx="2" />
      {/* facade shading — left strip */}
      <rect x={x} y={y} width={5} height={h} fill="#00000018" rx="2" />
      {/* windows */}
      <Windows x={x} y={y} w={w} h={h} rows={rows} cols={cols} winColor={accent || "#a8d8ea"} />
      {/* ground line */}
      <rect x={x} y={y + h} width={w} height={2} fill="#00000033" />
    </g>
  );
}

// Componente isolado para os textos dos prédios
function BuildingText({ x, y, w, h, label, active }) {
  const hoverShift = active ? -2 : 0;
  return (
    <g transform={`translate(0,${hoverShift})`} style={{ transition: "transform 0.15s" }}>
      <text x={x + w / 2} y={y + h + 16} textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="'DM Sans',sans-serif" fontWeight="700" 
            style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8), 0px 0px 3px rgba(0,0,0,1)" }}>{label}</text>
    </g>
  );
}

function Tree({ x, y, size = 1 }) {
  const s = size;
  return (
    <g>
      <ellipse cx={x} cy={y + 5 * s} rx={5 * s} ry={3 * s} fill="#00000033" />
      <rect x={x - 2 * s} y={y + 2 * s} width={4 * s} height={7 * s} fill="#5C3D11" />
      <circle cx={x} cy={y - 2 * s} r={9 * s} fill="#1a3d16" />
      <circle cx={x - 3 * s} cy={y - 5 * s} r={6 * s} fill="#235920" />
      <circle cx={x + 3 * s} cy={y - 4 * s} r={6 * s} fill="#1e5019" />
      <circle cx={x} cy={y - 8 * s} r={5 * s} fill="#2a6e24" />
    </g>
  );
}

function ParkingLot({ x, y, w, h, label }) {
  const spots = Math.floor(w / 18);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#1c1c22" rx="3" />
      <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill="#22222c" rx="2" />
      {Array.from({ length: spots }).map((_, i) => (
        <line key={i} x1={x + 9 + i * 18} y1={y + 3} x2={x + 9 + i * 18} y2={y + h - 3} stroke="#ffffff15" strokeWidth="1" />
      ))}
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill="#ffffff25" fontSize="7" fontFamily="sans-serif">{label}</text>
    </g>
  );
}

function Gate({ x, y, label }) {
  return (
    <g>
      <rect x={x} y={y} width={24} height={30} fill="#c8b456" rx="2" />
      <rect x={x + 3} y={y + 4} width={8} height={10} fill="#00000033" rx="1" />
      <rect x={x + 13} y={y + 4} width={8} height={10} fill="#00000033" rx="1" />
      <rect x={x + 3} y={y + 17} width={18} height={10} fill="#00000022" rx="1" />
      <text x={x + 12} y={y + 42} textAnchor="middle" fill="#ffffffaa" fontSize="6.5" fontFamily="sans-serif">{label}</text>
    </g>
  );
}

// ─── Main Map SVG ──────────────────────────────────────────────────────────
function CampusMap({ events, selectedId, onSelect }) {
  const [hovered, setHovered] = useState(null);

  // Sorting events so the selected one renders on top
  const sortedEvents = [...events].sort((a, b) => (selectedId === a.id ? 1 : selectedId === b.id ? -1 : 0));

  return (
    <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", display: "block", borderRadius: 12, background: "#162b12" }}>

      {/* ── Base grass ── */}
      <rect width="900" height="520" fill="#2a5720" />

      {/* ── Main street top (diagonal) ── */}
      <polygon points="0,45 900,0 900,56 0,100" fill="#2e2e2e" />
      <polygon points="0,98 900,54 900,58 0,104" fill="#3a3a3a" />
      {/* lane markers */}
      <line x1="0" y1="71" x2="900" y2="27" stroke="#ffffff22" strokeWidth="1" strokeDasharray="24,14" />

      {/* ── Side streets ── */}
      <polygon points="820,50 900,47 900,520 820,520" fill="#2e2e2e" />
      <line x1="860" y1="50" x2="860" y2="520" stroke="#ffffff18" strokeWidth="0.8" strokeDasharray="20,12" />
      <polygon points="0,100 80,98 80,520 0,520" fill="#2e2e2e" />
      <line x1="40" y1="100" x2="40" y2="520" stroke="#ffffff18" strokeWidth="0.8" strokeDasharray="20,12" />

      {/* ── Internal pathways ── */}
      {/* horizontal walkway */}
      <rect x="80" y="392" width="740" height="8" fill="#3a3a2a" opacity="0.6" />
      {/* vertical walkways */}
      <rect x="316" y="100" width="7" height="400" fill="#3a3a2a" opacity="0.5" />
      <rect x="576" y="90" width="7" height="400" fill="#3a3a2a" opacity="0.5" />
      {/* diagonal connector (Blocos A→C) */}
      <line x1="265" y1="250" x2="285" y2="168" stroke="#3a3a2a" strokeWidth="7" opacity="0.6" />

      {/* ── Grass patches ── */}
      <ellipse cx="195" cy="430" rx="60" ry="18" fill="#235a1e" />
      <ellipse cx="700" cy="380" rx="50" ry="15" fill="#235a1e" />
      <ellipse cx="450" cy="460" rx="45" ry="13" fill="#235a1e" />

      {/* ══════════════ TREES (Movidas para baixo no Z-index) ══════════════ */}
      {[
        [128,152],[160,146],[194,141],[228,137],[263,133],[298,129],[334,125],[370,122],[406,119],[442,116],[478,113],[514,110],[550,107],[586,104],[622,101],[658,98],[694,95],[730,92],
        [98,310],[98,355],[98,400],[98,452],[98,490],
        [800,210],[800,275],[800,340],[800,405],[800,460],
        [195,415],[275,420],[360,425],[445,430],[530,425],[620,420],[710,415],
      ].map(([tx, ty], i) => <Tree key={i} x={tx} y={ty} size={0.9} />)}
      {/* extra trees near entrance */}
      {[[130,478],[175,480],[220,478],[300,480],[380,478],[460,478],[540,480],[620,478],[700,478],[760,476]].map(([tx, ty], i) => (
        <Tree key={`b${i}`} x={tx} y={ty} size={0.75} />
      ))}

      {/* ── Parking lots ── */}
      <ParkingLot x={88} y={440} w={150} h={55} label="Estacionamento" />
      <ParkingLot x={492} y={318} w={268} h={52} label="Estacionamento" />
      <ParkingLot x={636} y={310} w={148} h={52} label="Estacionamento" />

      {/* ── Gates ── */}
      <Gate x={82} y={392} label="Portão 5" />
      <Gate x={82} y={182} label="Portão 1" />
      <Gate x={749} y={68} label="Portão 4" />
      <Gate x={795} y={342} label="Portão 2" />
      <Gate x={795} y={170} label="Portão 3" />

      {/* ── Bus stops ── */}
      {[[84, 270], [792, 248]].map(([bx, by], i) => (
        <g key={i}>
          <rect x={bx} y={by} width={20} height={26} fill="#1a5fa8" rx="2" />
          <rect x={bx} y={by} width={20} height={6} fill="#2472c2" rx="2" />
          <text x={bx + 10} y={by + 37} textAnchor="middle" fill="#ffffffaa" fontSize="6.5" fontFamily="sans-serif">Ônibus</text>
        </g>
      ))}

      {/* ══════════════ BUILDINGS (Ordem Y mantida, sem textos) ══════════════ */}

      {/* Quadra Poliesportiva (y=60) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("quadra")} onMouseLeave={() => setHovered(null)}>
        {/* Court surface */}
        <rect x={748} y={60} width={68} height={52} fill={hovered === "quadra" ? "#c88020" : "#a86a10"} rx="3" />
        {/* Court lines */}
        <rect x={750} y={62} width={64} height={48} fill="none" stroke="#ffffff30" strokeWidth="1" rx="1" />
        <line x1={782} y1={62} x2={782} y2={110} stroke="#ffffff30" strokeWidth="1" />
        <circle cx={782} cy={86} r={9} fill="none" stroke="#ffffff30" strokeWidth="1" />
        <rect x={748} y={52} width={68} height={10} fill={hovered === "quadra" ? "#d89030" : "#b07820"} rx="2" />
        {/* Stands */}
        <rect x={748} y={110} width={68} height={12} fill="#8a5010" rx="1" />
      </g>

      {/* Bloco L (y=85) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoL")} onMouseLeave={() => setHovered(null)}>
        <Building x={695} y={85} w={95} h={60} color="#2e7a45" roofColor="#1e5a32" active={hovered === "blocoL"} rows={3} cols={5} roofH={12} accent="#a8f0b8" />
      </g>

      {/* Prefeitura (y=112) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("prefCampus")} onMouseLeave={() => setHovered(null)}>
        <Building x={597} y={112} w={58} h={48} color="#884444" roofColor="#6a2a2a" active={hovered === "prefCampus"} rows={2} cols={3} roofH={9} accent="#ffb8b8" />
        {/* Flag */}
        <rect x={624} y={95} width={3} height={19} fill="#aaaaaa" />
        <rect x={627} y={95} width={12} height={8} fill="#009c3b" />
        <rect x={627} y={99} width={12} height={4} fill="#ffdf00" />
      </g>

      {/* Bloco O (y=128) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoO")} onMouseLeave={() => setHovered(null)}>
        <Building x={634} y={128} w={105} h={68} color="#2a7a8e" roofColor="#1a5a6e" active={hovered === "blocoO"} rows={3} cols={5} roofH={12} accent="#b0e8f8" />
      </g>

      {/* Bloco J (y=140) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoJ")} onMouseLeave={() => setHovered(null)}>
        <Building x={452} y={140} w={108} h={85} color="#9A7B54" roofColor="#7a6040" active={hovered === "blocoJ"} rows={3} cols={5} roofH={14} />
      </g>

      {/* Blocos C D E (y=155) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoCDE")} onMouseLeave={() => setHovered(null)}>
        <Building x={283} y={155} w={137} h={78} color="#9A7B54" roofColor="#7a6040" active={hovered === "blocoCDE"} rows={3} cols={6} roofH={14} />
      </g>

      {/* Bloco K (y=190) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoK")} onMouseLeave={() => setHovered(null)}>
        <Building x={525} y={190} w={100} h={78} color="#2a7a8e" roofColor="#1a5a6e" active={hovered === "blocoK"} rows={3} cols={5} roofH={12} accent="#b0e8f8" />
      </g>

      {/* Blocos F G (y=210) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoFG")} onMouseLeave={() => setHovered(null)}>
        <Building x={345} y={210} w={128} h={88} color="#A0825A" roofColor="#7a6040" active={hovered === "blocoFG"} rows={3} cols={6} roofH={14} />
        {/* Chapel antenna */}
        <rect x={400} y={185} width={5} height={27} fill="#9a9080" />
        <polygon points="397,185 408,185 402,172" fill="#b0a090" />
        <circle cx={402} cy={171} r={2} fill="#ffcc44" />
      </g>

      {/* Lanchonetes (y=225) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("lanchonetes")} onMouseLeave={() => setHovered(null)}>
        <Building x={272} y={225} w={54} h={44} color="#c45c2a" roofColor="#9e3f1a" active={hovered === "lanchonetes"} rows={2} cols={3} roofH={8} accent="#ffd59e" />
      </g>

      {/* Labs e Salas de Aula (y=228) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("labSalas")} onMouseLeave={() => setHovered(null)}>
        <Building x={634} y={228} w={134} h={60} color="#6a5e50" roofColor="#4a3e33" active={hovered === "labSalas"} rows={2} cols={6} roofH={8} />
      </g>

      {/* Blocos A e B (y=240) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("blocoAB")} onMouseLeave={() => setHovered(null)}>
        <Building x={120} y={240} w={148} h={92} color="#9A7B54" roofColor="#7a6040" active={hovered === "blocoAB"} rows={3} cols={6} roofH={14} />
      </g>

      {/* Teatro Veritas (y=272) */}
      <g style={{ cursor: "pointer" }} onMouseEnter={() => setHovered("teatro")} onMouseLeave={() => setHovered(null)}>
        <Building x={270} y={272} w={72} h={58} color="#6a3d99" roofColor="#4e2878" active={hovered === "teatro"} rows={2} cols={4} roofH={0} />
        {/* Pediment / triangular roof */}
        <polygon points="270,272 342,272 306,250" fill={hovered === "teatro" ? "#7a4dbb" : "#5e347f"} />
        <line x1="306" y1="250" x2="306" y2="272" stroke="#ffffff22" strokeWidth="1" />
      </g>

      {/* Lab Engenharia (y=305) */}
      <g style={{ cursor: "pointer" }} onClick={() => {}} onMouseEnter={() => setHovered("labEng")} onMouseLeave={() => setHovered(null)}>
        <Building x={88} y={305} w={58} h={68} color="#8B7355" roofColor="#6d5940" active={hovered === "labEng"} rows={3} cols={3} roofH={10} />
      </g>

      {/* ══════════════ BUILDING LABELS (Sobrepõe TUDO que é arquitetura) ══════════════ */}
      {/* Usando pointerEvents "none" para que o hover do mouse atravesse os textos e ative os prédios embaixo */}
      <g style={{ pointerEvents: "none" }}>
        <BuildingText x={695} y={85} w={95} h={60} label="Bloco L" active={hovered === "blocoL"} />
        <BuildingText x={634} y={128} w={105} h={68} label="Bloco O" active={hovered === "blocoO"} />
        <BuildingText x={452} y={140} w={108} h={85} label="Bloco J" active={hovered === "blocoJ"} />
        <BuildingText x={283} y={155} w={137} h={78} label="Blocos C, D e E" active={hovered === "blocoCDE"} />
        <BuildingText x={525} y={190} w={100} h={78} label="Bloco K" active={hovered === "blocoK"} />
        <BuildingText x={345} y={210} w={128} h={88} label="Blocos F e G" active={hovered === "blocoFG"} />
        <BuildingText x={272} y={225} w={54} h={44} label="Lanchonetes" active={hovered === "lanchonetes"} />
        <BuildingText x={634} y={228} w={134} h={60} label="Labs e Salas de Aula" active={hovered === "labSalas"} />
        <BuildingText x={120} y={240} w={148} h={92} label="Blocos A e B" active={hovered === "blocoAB"} />
        <BuildingText x={88} y={305} w={58} h={68} label="Lab. Eng." active={hovered === "labEng"} />

        {/* Textos customizados */}
        <g transform={`translate(0,${hovered === "quadra" ? -2 : 0})`} style={{ transition: "transform 0.15s" }}>
          <text x={782} y={136} textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="'DM Sans',sans-serif" fontWeight="700" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)" }}>Quadra</text>
          <text x={782} y={146} textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="'DM Sans',sans-serif" fontWeight="600" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)" }}>Poliesportiva</text>
        </g>
        <g transform={`translate(0,${hovered === "prefCampus" ? -2 : 0})`} style={{ transition: "transform 0.15s" }}>
          <text x={626} y={174} textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="sans-serif" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Prefeitura</text>
          <text x={626} y={183} textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="700" fontFamily="sans-serif" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Campus</text>
        </g>
        <g transform={`translate(0,${hovered === "teatro" ? -2 : 0})`} style={{ transition: "transform 0.15s" }}>
          <text x={306} y={343} textAnchor="middle" fill="#ffffff" fontSize="8.5" fontFamily="'DM Sans',sans-serif" fontWeight="700" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)" }}>Teatro Veritas</text>
        </g>
      </g>

      {/* ── Event pins ── */}
      {sortedEvents.map(ev => {
        const loc = CAMPUS_LOCATIONS[ev.locationKey];
        if (!loc) return null;
        const isSel = selectedId === ev.id;
        const py = loc.y - 34;
        return (
          <g key={ev.id} style={{ cursor: "pointer" }} onClick={() => onSelect(ev.id)}>
            <ellipse cx={loc.x} cy={loc.y + 6} rx={10} ry={4} fill="#00000044" />
            <line x1={loc.x} y1={py + 20} x2={loc.x} y2={loc.y + 5} stroke={ev.color} strokeWidth="2.5" strokeLinecap="round" />
            {isSel && <circle cx={loc.x} cy={py} r={20} fill={ev.color} opacity="0.22" />}
            <circle cx={loc.x} cy={py} r={16} fill={isSel ? "#fff" : ev.color} stroke={isSel ? ev.color : "#ffffffbb"} strokeWidth={isSel ? 2.5 : 1.5} />
            <text x={loc.x} y={py + 6} textAnchor="middle" fontSize="16">{ev.flyer}</text>
            
            {isSel && (
              <g>
                <rect x={loc.x - 70} y={py - 48} width={140} height={26} rx="6" fill="#13121Afa" stroke={ev.color} strokeWidth="1.5" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }} />
                <text x={loc.x} y={py - 30} textAnchor="middle" fill="#fff" fontSize="10.5" fontFamily="'DM Sans',sans-serif" fontWeight="700">{ev.title}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* ── Hover tooltip ── */}
      {hovered && CAMPUS_LOCATIONS[hovered] && (() => {
        const loc = CAMPUS_LOCATIONS[hovered];
        const tx = Math.min(Math.max(loc.x - 78, 6), 710);
        const ty = Math.max(loc.y - 80, 8);
        return (
          <g style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))", pointerEvents: "none" }}>
            <rect x={tx} y={ty} width={160} height={54} rx="6" fill="#13121Afa" stroke="#ffffff33" strokeWidth="1" />
            <text x={tx + 80} y={ty + 18} textAnchor="middle" fill="#fff" fontSize="9.5" fontFamily="'DM Sans',sans-serif" fontWeight="700">{loc.label}</text>
            <text x={tx + 80} y={ty + 32} textAnchor="middle" fill="#ffffffcc" fontSize="7.5" fontFamily="sans-serif">{loc.desc.substring(0, 40)}</text>
            {loc.desc.length > 40 && (
              <text x={tx + 80} y={ty + 44} textAnchor="middle" fill="#ffffffcc" fontSize="7.5" fontFamily="sans-serif">{loc.desc.substring(40, 78)}{loc.desc.length > 78 ? "…" : ""}</text>
            )}
          </g>
        );
      })()}

      <text x="816" y="516" textAnchor="end" fill="#ffffff14" fontSize="8" fontFamily="sans-serif">Campus Unisagrado · Bauru/SP</text>
    </svg>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
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

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D12", color: "#F0EEF8", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header style={{
        borderBottom: "1px solid #1C1C25", padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58, position: "sticky", top: 0, zIndex: 50, background: "#0D0D12",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logo} alt="CampusON Logo" style={{width: 34, height: 34, borderRadius: 9, objectFit: "cover"}}/>
          <div>
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>
              Campus<span style={{ color: "#E63946" }}>ON</span>
            </span>
            <span style={{ fontSize: 10, color: "#444", display: "block", lineHeight: 1.1 }}>Unisagrado · Bauru</span>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {[{ id: "mural", label: "Mural", icon: "📋" }, { id: "mapa", label: "Mapa", icon: "🗺️" }].map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} style={{
              padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 500, fontFamily: "inherit",
              background: view === tab.id ? "#200b10" : "transparent",
              color: view === tab.id ? "#E63946" : "#666",
              transition: "all 0.15s",
            }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#C8102E,#7a0010)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{user.avatar}</div>
              <button onClick={() => { setUser(null); setUserReactions({}); }} style={{ fontSize: 11, color: "#555", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>sair</button>
            </div>
          ) : (
            <button onClick={() => setLoginModal(true)} style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #2a1018", background: "#18080e", color: "#E63946", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Entrar</button>
          )}
        </div>
      </header>

      {/* ══════════ MURAL ══════════ */}
      {view === "mural" && (
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "clamp(20px,4vw,30px)", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
              Eventos na <span style={{ color: "#E63946" }}>Unisagrado</span>
            </h1>
            <p style={{ color: "#555", margin: 0, fontSize: 13 }}>Fique por dentro do que vai rolar no campus</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{
                padding: "6px 14px", borderRadius: 20, border: "1px solid",
                borderColor: filterCat === cat ? "#C8102E" : "#1E1E28",
                background: filterCat === cat ? "#200b10" : "transparent",
                color: filterCat === cat ? "#E63946" : "#777",
                fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              }}>
                {cat === "Todos" ? "✦ Todos" : cat}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
            {filtered.map(ev => {
              const cat = CATEGORY_COLORS[ev.category];
              return (
                <div key={ev.id} onClick={() => setSelected(ev.id)}
                  style={{ background: "#13121A", borderRadius: 14, border: "1px solid #1C1C25", overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ev.color + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1C1C25"; e.currentTarget.style.transform = ""; }}>
                  <div style={{ height: 90, background: `linear-gradient(135deg,${ev.color}22,${ev.color}06)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, borderBottom: "1px solid #1C1C25", position: "relative" }}>
                    <span style={{ position: "absolute", top: 10, left: 12, background: cat.bg, color: cat.text, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{ev.category}</span>
                    {ev.flyer}
                  </div>
                  <div style={{ padding: "1rem 1.1rem 0.8rem" }}>
                    <h3 style={{ margin: "0 0 3px", fontSize: 14.5, fontWeight: 600 }}>{ev.title}</h3>
                    <p style={{ margin: "0 0 6px", fontSize: 11, color: "#555" }}>📍 {ev.block}</p>
                    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#999", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ev.description}</p>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: "#777", background: "#1C1C25", padding: "3px 8px", borderRadius: 6 }}>📅 {ev.date}</span>
                      <span style={{ fontSize: 11, color: "#777", background: "#1C1C25", padding: "3px 8px", borderRadius: 6 }}>🕐 {ev.time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, paddingTop: 10, borderTop: "1px solid #1C1C25" }} onClick={e => e.stopPropagation()}>
                      {REACTION_EMOJIS.map(emoji => {
                        const reacted = userReactions[`${ev.id}-${emoji}`];
                        return (
                          <button key={emoji} onClick={() => handleReact(ev.id, emoji)} style={{
                            display: "flex", alignItems: "center", gap: 4, padding: "4px 8px",
                            borderRadius: 20, border: `1px solid ${reacted ? ev.color + "88" : "#1C1C25"}`,
                            background: reacted ? ev.color + "22" : "transparent", cursor: "pointer",
                            fontSize: 12, fontFamily: "inherit", color: reacted ? "#FFF" : "#777", transition: "all 0.15s",
                          }}>
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

      {/* ══════════ MAPA ══════════ */}
      {view === "mapa" && (
        <main style={{ maxWidth: 1240, margin: "0 auto", padding: "1.5rem 1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: "0 0 3px", fontSize: 20, fontWeight: 700 }}>Mapa do Campus</h2>
            <p style={{ color: "#555", margin: 0, fontSize: 13 }}>Clique nos pins coloridos para ver os detalhes</p>
          </div>

          {/* Map + Sidebar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem", alignItems: "start" }}>

            {/* MAP */}
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #1C1C25" }}>
              <CampusMap events={EVENTS} selectedId={selected} onSelect={id => setSelected(selected === id ? null : id)} />
            </div>

            {/* SIDEBAR — event list + selected detail below */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ margin: "0 0 8px", fontSize: 10.5, color: "#444", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>Eventos no Campus</p>

              {/* Event list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {EVENTS.map(ev => (
                  <div key={ev.id} onClick={() => setSelected(selected === ev.id ? null : ev.id)}
                    style={{
                      background: selected === ev.id ? "#1a0c12" : "#13121A",
                      borderRadius: 10, border: `1px solid ${selected === ev.id ? ev.color + "55" : "#1C1C25"}`,
                      padding: "9px 11px", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (selected !== ev.id) e.currentTarget.style.borderColor = "#2a2a35"; }}
                    onMouseLeave={e => { if (selected !== ev.id) e.currentTarget.style.borderColor = "#1C1C25"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: ev.color + "28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{ev.flyer}</div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</p>
                        <p style={{ margin: 0, fontSize: 10, color: "#555" }}>{ev.date} · {CAMPUS_LOCATIONS[ev.locationKey]?.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Event detail (inline below list) ── */}
              {selectedEvent && (
                <div style={{
                  marginTop: 12,
                  background: "#13121A",
                  borderRadius: 12,
                  border: `1px solid ${selectedEvent.color}44`,
                  overflow: "hidden",
                  animation: "fadeSlide 0.2s ease",
                }}>
                  <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

                  {/* color bar */}
                  <div style={{ height: 4, background: selectedEvent.color }} />

                  <div style={{ padding: "12px 14px" }}>
                    {/* header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 30, flexShrink: 0 }}>{selectedEvent.flyer}</span>
                      <div style={{ minWidth: 0 }}>
                        <span style={{
                          background: CATEGORY_COLORS[selectedEvent.category].bg,
                          color: CATEGORY_COLORS[selectedEvent.category].text,
                          fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 600,
                        }}>{selectedEvent.category}</span>
                        <p style={{ margin: "4px 0 2px", fontSize: 14, fontWeight: 700 }}>{selectedEvent.title}</p>
                        <p style={{ margin: 0, fontSize: 10.5, color: "#666" }}>📍 {selectedEvent.block}</p>
                      </div>
                    </div>

                    {/* date/time */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      <span style={{ fontSize: 10.5, color: "#888", background: "#1C1C25", padding: "3px 8px", borderRadius: 6 }}>📅 {selectedEvent.date}</span>
                      <span style={{ fontSize: 10.5, color: "#888", background: "#1C1C25", padding: "3px 8px", borderRadius: 6 }}>🕐 {selectedEvent.time}</span>
                    </div>

                    {/* description */}
                    <p style={{ fontSize: 12, color: "#AAA", lineHeight: 1.6, marginBottom: 10 }}>{selectedEvent.description}</p>

                    {/* involved */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                      {selectedEvent.involved.map((p, i) => (
                        <span key={i} style={{ fontSize: 10.5, color: "#777", background: "#1C1C25", padding: "3px 9px", borderRadius: 20 }}>👤 {p}</span>
                      ))}
                    </div>

                    {/* reactions */}
                    <div style={{ display: "flex", gap: 6, paddingTop: 10, borderTop: "1px solid #1C1C25" }}>
                      {REACTION_EMOJIS.map(emoji => {
                        const reacted = userReactions[`${selectedEvent.id}-${emoji}`];
                        return (
                          <button key={emoji} onClick={() => handleReact(selectedEvent.id, emoji)} style={{
                            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                            padding: "7px 4px", borderRadius: 9,
                            border: `1px solid ${reacted ? selectedEvent.color : "#1C1C25"}`,
                            background: reacted ? selectedEvent.color + "22" : "#0c0c14",
                            cursor: "pointer", fontFamily: "inherit",
                          }}>
                            <span style={{ fontSize: 17 }}>{emoji}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: reacted ? "#FFF" : "#666" }}>{reactions[selectedEvent.id][emoji] || 0}</span>
                          </button>
                        );
                      })}
                    </div>
                    {!user && (
                      <p style={{ fontSize: 11, color: "#444", textAlign: "center", marginTop: 8, marginBottom: 0 }}>
                        <span onClick={() => setLoginModal(true)} style={{ color: "#E63946", cursor: "pointer", textDecoration: "underline" }}>Entre</span> para reagir
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ══════════ MURAL MODAL ══════════ */}
      {selectedEvent && view === "mural" && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "#000000AA", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#13121A", borderRadius: 18, border: `1px solid ${selectedEvent.color}44`, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ height: 110, background: `linear-gradient(135deg,${selectedEvent.color}33,${selectedEvent.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, position: "relative" }}>
              <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 12, right: 12, background: "#00000055", border: "none", color: "#FFF", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 15, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              {selectedEvent.flyer}
            </div>
            <div style={{ padding: "1.3rem" }}>
              <span style={{ background: CATEGORY_COLORS[selectedEvent.category].bg, color: CATEGORY_COLORS[selectedEvent.category].text, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{selectedEvent.category}</span>
              <h2 style={{ margin: "8px 0 4px", fontSize: 19, fontWeight: 700 }}>{selectedEvent.title}</h2>
              <p style={{ margin: "0 0 12px", fontSize: 12.5, color: "#666" }}>📍 {selectedEvent.block}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "#AAA", background: "#1C1C25", padding: "5px 12px", borderRadius: 8 }}>📅 {selectedEvent.date}</span>
                <span style={{ fontSize: 12, color: "#AAA", background: "#1C1C25", padding: "5px 12px", borderRadius: 8 }}>🕐 {selectedEvent.time}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#BBB", lineHeight: 1.7, marginBottom: 14 }}>{selectedEvent.description}</p>
              <p style={{ fontSize: 10.5, color: "#444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>Envolvidos</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                {selectedEvent.involved.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#AAA" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: selectedEvent.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, color: selectedEvent.color, fontWeight: 700 }}>{p[0]}</div>
                    {p}
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 14, borderTop: "1px solid #1C1C25" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {REACTION_EMOJIS.map(emoji => {
                    const reacted = userReactions[`${selectedEvent.id}-${emoji}`];
                    return (
                      <button key={emoji} onClick={() => handleReact(selectedEvent.id, emoji)} style={{
                        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                        padding: "10px 6px", borderRadius: 10,
                        border: `1px solid ${reacted ? selectedEvent.color : "#1C1C25"}`,
                        background: reacted ? selectedEvent.color + "22" : "#0A0A10",
                        cursor: "pointer", fontFamily: "inherit",
                      }}>
                        <span style={{ fontSize: 22 }}>{emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: reacted ? "#FFF" : "#777" }}>{reactions[selectedEvent.id][emoji] || 0}</span>
                      </button>
                    );
                  })}
                </div>
                {!user && <p style={{ fontSize: 12, color: "#444", textAlign: "center", marginTop: 10 }}>
                  <span onClick={() => { setSelected(null); setLoginModal(true); }} style={{ color: "#E63946", cursor: "pointer", textDecoration: "underline" }}>Entre agora</span> para reagir
                </p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ LOGIN ══════════ */}
      {loginModal && (
        <div onClick={() => setLoginModal(false)} style={{ position: "fixed", inset: 0, background: "#000000AA", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#13121A", borderRadius: 18, border: "1px solid #2a1018", maxWidth: 380, width: "100%", padding: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎓</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 700 }}>Entrar no CampusON</h2>
              <p style={{ color: "#555", fontSize: 13, margin: 0 }}>Use seu e-mail @unisagrado.edu.br</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Seu nome" value={loginForm.name} onChange={e => setLoginForm(p => ({ ...p, name: e.target.value }))} style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid #2a1018", background: "#0A0A12", color: "#F1EFF8", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <input placeholder="email@unisagrado.edu.br" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid #2a1018", background: "#0A0A12", color: "#F1EFF8", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              <button onClick={handleLogin} style={{ padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#C8102E,#7a0010)", color: "#FFF", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Entrar →</button>
              <button onClick={() => setLoginModal(false)} style={{ padding: "10px", borderRadius: 10, border: "1px solid #2a1018", background: "transparent", color: "#555", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", background: "#18080e", border: "1px solid #C8102E44", color: "#E63946", padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 500, zIndex: 300, whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
