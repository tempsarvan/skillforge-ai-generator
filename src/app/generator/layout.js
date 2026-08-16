export const metadata = {
  title: 'SkillForge AI — Universal AI Agent Skill Definition Studio',
  description: 'Generate hyper-optimized, token-minified SKILL.md definitions for Gemini, Claude, GPT-4, Antigravity, Cursor, and custom AI agent frameworks.',
  keywords: ['AI Skill Generator', 'SKILL.md', 'Gemini Agent', 'Claude Skill', 'GPT-4 Skill', 'Neural Refactoring', 'Token Optimization'],
};

export default function GeneratorLayout({ children }) {
  return (
    <div className="generator-theme-wrapper" style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}>
      {children}
    </div>
  );
}
