import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, caption, altText, category, base64Image, sortOrder } = body;

    let imageUrl = '/images/serk-photo-engineering.jpg';
    let cloudinaryPublicId = null;

    if (base64Image) {
      const uploadRes = await uploadImageToCloudinary(base64Image, 'serk-gallery');
      imageUrl = uploadRes.secure_url;
      cloudinaryPublicId = uploadRes.public_id;
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        caption: caption || null,
        altText: altText || title,
        category: category || 'General',
        imageUrl,
        cloudinaryPublicId,
        sortOrder: sortOrder || 0,
        isVisible: true,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
