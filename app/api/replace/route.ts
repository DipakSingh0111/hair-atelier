import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'data/hair-atelier.json');
    let content = fs.readFileSync(jsonPath, 'utf8');

    const images = [
      "/images/hero-1.jpg",
      "/images/about-salon.jpg",
      "/images/about-styling.jpg",
      "/images/man.jpg",
      "/images/stats-bg.jpg"
    ];

    for (let i = 1; i <= 30; i++) {
      if (i === 20) continue; 
      images.push(`/images/Hair_salon_${i.toString().padStart(2, '0')}.jpg`);
    }

    let imageIndex = 0;
    content = content.replace(/https:\/\/picsum\.photos\/[^"]+/g, () => {
      const replacement = images[imageIndex % images.length];
      imageIndex++;
      return replacement;
    });

    fs.writeFileSync(jsonPath, content, 'utf8');

    // Delete the JS files
    const scripts = ['replaceImages.js', 'combine.js'];
    for (const script of scripts) {
      const scriptPath = path.join(process.cwd(), script);
      if (fs.existsSync(scriptPath)) {
        fs.unlinkSync(scriptPath);
      }
    }

    return NextResponse.json({ success: true, replaced: imageIndex });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
