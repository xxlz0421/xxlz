const marks = {
  '3ds Max': <><path d="m12 5 19 1 5 9-14 5 13 4-2 13-21 6V32l13-3-13-4V15l13-2-13-1Z" fill="currentColor" stroke="none" /></>,
  'Cinema 4D': <><circle cx="24" cy="25" r="17" /><ellipse cx="24" cy="25" rx="8" ry="17" transform="rotate(42 24 25)" /><path d="m11 13 24 22M30 7l9-4-1 10" /></>,
  Plasticity: <><path d="M10 38V11h18c16 0 15 20 0 20H19" /><path d="M18 38V19h10c5 0 5 5 0 5h-7" /><path d="m10 11 8 8M10 38l8-6" /></>,
  KeyShot: <><circle cx="24" cy="24" r="17" /><path d="M7 24h34M24 7c-11 10-11 24 0 34M24 7c11 10 11 24 0 34M10 14c8 5 20 5 28 0M10 34c8-5 20-5 28 0" /></>,
  Corona: <><circle cx="24" cy="24" r="10" /><path d="M24 3v6m0 30v6M3 24h6m30 0h6M9 9l5 5m20 20 5 5M9 39l5-5m20-20 5-5" /></>,
  'V-Ray': <><circle cx="24" cy="24" r="18" /><path d="m13 15 11 21 12-25M15 26h18" strokeWidth="3" /></>,
  OctaneRender: <><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="9" /><path d="M12 12c9-3 21 5 24 24M8 24c8 7 24 7 32 0" /></>,
  创意探索: <><path d="M17 32c0-5-6-6-6-15a13 13 0 0 1 26 0c0 9-6 10-6 15Zm2 6h10m-9 5h8M18 18l6 5 6-5m-6 5v9" /></>,
  模特应用: <><circle cx="24" cy="14" r="7" /><path d="M10 42v-6a14 14 0 0 1 28 0v6M4 8V4h8m24 0h8v8M4 36v8h8m24 0h8v-8" /></>,
  场景生成: <><rect x="5" y="7" width="38" height="34" rx="3" /><circle cx="16" cy="18" r="4" /><path d="m6 35 13-12 9 8 7-7 8 10" /></>,
  后期融合: <><path d="m5 17 19-11 19 11-19 11Zm0 9 19 11 19-11M5 35l19 11 19-11" /></>,
};

export default function ToolIcon({ name }) {
  const monogram = ({ Photoshop: 'Ps', 'Adobe Illustrator': 'Ai', Figma: 'Fi', ChatGPT: 'GPT', Codex: '</>', 'Gemini Nano': '✦', WorkBuddy: 'W' })[name];
  return <span className="tool-icon" aria-hidden="true">{monogram ? <span className="tool-monogram">{monogram}</span> : <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{marks[name]}</svg>}</span>;
}
