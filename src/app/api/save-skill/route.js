import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const { skillName, skillContent, targetWorkspace } = await req.json();

    if (!skillName || !skillContent) {
      return NextResponse.json({ success: false, error: 'Missing skillName or skillContent' }, { status: 400 });
    }

    const sanitizedName = skillName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    
    // Save locally to skills/<sanitizedName>/SKILL.md in project workspace
    const baseDir = targetWorkspace || process.cwd();
    const targetDir = path.join(baseDir, 'skills', sanitizedName);
    
    fs.mkdirSync(targetDir, { recursive: true });
    const filePath = path.join(targetDir, 'SKILL.md');
    fs.writeFileSync(filePath, skillContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Skill ${sanitizedName} successfully saved to ${filePath}`,
      filePath: filePath,
      savedAt: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
