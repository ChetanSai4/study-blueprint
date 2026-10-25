import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sanitizedSlug = path.basename(slug);
    const filePath = path.join(process.cwd(), 'public', 'docs', sanitizedSlug);

    if (!fs.existsSync(filePath)) {
      // Fallback to academic_blueprint.pdf
      const fallbackPath = path.join(process.cwd(), 'public', 'docs', 'academic_blueprint.pdf');
      if (fs.existsSync(fallbackPath)) {
        const fallbackBuffer = fs.readFileSync(fallbackPath);
        return new NextResponse(fallbackBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${sanitizedSlug}"`,
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
      return new NextResponse('PDF document not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${sanitizedSlug}"`,
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error serving PDF document:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
