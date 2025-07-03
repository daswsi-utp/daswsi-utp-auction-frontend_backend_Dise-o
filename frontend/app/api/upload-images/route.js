// app/api/upload-images/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import formidable from 'formidable';

// Corre en Node y desactiva el body parser de Next
export const runtime = 'nodejs';
export const config = {
  api: { bodyParser: false }
};

export async function POST(req) {
  const uploadDir = path.join(process.cwd(), 'public', 'images');
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
    filename: (_, __, part) => {
      const ts = Date.now();
      const safe = part.originalFilename.replace(/\s+/g, '_');
      return `${ts}_${safe}`;
    }
  });

  const parse = promisify(form.parse.bind(form));
  try {
    const { files } = await parse(req);
    const imgs = Array.isArray(files.images) ? files.images : [files.images];
    const urls = imgs.map(f => `/images/${path.basename(f.filepath)}`);
    return NextResponse.json({ urls });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error subiendo imágenes' }, { status: 500 });
  }
}
