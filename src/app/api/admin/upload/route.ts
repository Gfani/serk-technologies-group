import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentType = req.headers.get('content-type') || '';
    let base64Data = '';
    let folder = 'serk-technologies';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      base64Data = body.file || body.image || body.base64 || '';
      folder = body.folder || 'serk-technologies';
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      folder = (formData.get('folder') as string) || 'serk-technologies';

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/png';
      base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;
    } else {
      return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
    }

    if (!base64Data) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const uploadRes = await uploadImageToCloudinary(base64Data, folder);

    return NextResponse.json({
      success: true,
      url: uploadRes.secure_url,
      publicId: uploadRes.public_id,
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
