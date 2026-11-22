import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'serk-technologies'
): Promise<{ url: string; publicId: string }> {
  // If Cloudinary is not configured in local environment, provide graceful fallback
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    const b64 = fileBuffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${b64}`;
    return {
      url: dataUri,
      publicId: `local-placeholder-${Date.now()}`,
    };
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Upload failed'));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function uploadImageToCloudinary(
  base64Data: string,
  folder: string = 'serk-technologies'
): Promise<{ secure_url: string; public_id: string }> {
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');
  const res = await uploadToCloudinary(buffer, folder);
  return { secure_url: res.url, public_id: res.publicId };
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
    return true;
  }
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (err) {
    console.error('Cloudinary delete error:', err);
    return false;
  }
}
