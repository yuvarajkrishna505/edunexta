import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { initialFAQs, initialTestimonials, initialCourses } from '@/utils/data';

// Path to JSON database
const DB_PATH = path.join(process.cwd(), 'src', 'utils', 'cms_db.json');

// In-memory fallback if fs fails or in read-only environment
let inMemoryDb: any = null;

function readDatabase() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to read local JSON database, falling back to in-memory/static seed.', error);
  }

  // Fallback to in-memory db or static seed
  if (!inMemoryDb) {
    inMemoryDb = {
      courses: initialCourses,
      testimonials: initialTestimonials,
      faqs: initialFAQs
    };
  }
  return inMemoryDb;
}

function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Failed to write to local JSON database, updating in-memory copy.', error);
    inMemoryDb = data;
    return true;
  }
}

export async function GET() {
  const db = readDatabase();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, action, data } = body;
    
    const db = readDatabase();

    if (type === 'testimonials') {
      if (action === 'edit') {
        db.testimonials = db.testimonials.map((t: any) => t.id === data.id ? { ...t, ...data } : t);
      } else if (action === 'add') {
        db.testimonials.push({
          id: `t${Date.now()}`,
          ...data
        });
      } else if (action === 'delete') {
        db.testimonials = db.testimonials.filter((t: any) => t.id !== data.id);
      }
    } else if (type === 'faqs') {
      if (action === 'edit') {
        db.faqs = db.faqs.map((f: any) => f.id === data.id ? { ...f, ...data } : f);
      } else if (action === 'add') {
        db.faqs.push({
          id: `f${Date.now()}`,
          ...data
        });
      } else if (action === 'delete') {
        db.faqs = db.faqs.filter((f: any) => f.id !== data.id);
      }
    } else if (type === 'courses') {
      if (action === 'edit') {
        db.courses = db.courses.map((c: any) => c.id === data.id ? { ...c, ...data } : c);
      }
    }

    writeDatabase(db);
    return NextResponse.json({ success: true, db });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
