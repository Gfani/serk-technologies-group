'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryMediaItem } from '@/lib/types';
import { Image as ImageIcon, Upload, Trash2, Plus, Loader2 } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryMediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain');
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileBase64 || !title) {
      alert('Please select an image file and enter a title.');
      return;
    }

    setUploading(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          caption,
          category,
          imageFit,
          base64Image: fileBase64,
        }),
      });

      if (res.ok) {
        setTitle('');
        setCaption('');
        setFileBase64(null);
        fetchGallery();
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media asset?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchGallery();
      }
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-[#101513]">Cloud Gallery & Media CDN</h1>
        <p className="text-xs text-[#5B6761] mt-1">
          Upload and manage photos hosted on Cloudinary and displayed across the public gallery.
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm">
        <h2 className="text-sm font-bold text-[#101513] mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#0D4634]" />
          <span>Upload Image to Cloudinary</span>
        </h2>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-[#101513] mb-1">Select File</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#F4F7F5] file:text-[#0D4634] hover:file:bg-[#DEE6E0]"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-[#101513] mb-1">Image Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Field Survey"
              className="w-full px-3 py-1.5 border border-[#DEE6E0] rounded text-xs"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-[#101513] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-1.5 border border-[#DEE6E0] rounded text-xs"
            >
              <option value="Engineering">Engineering</option>
              <option value="Construction">Construction</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Community">Community</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-[#101513] mb-1">Display Mode</label>
            <select
              value={imageFit}
              onChange={(e) => setImageFit(e.target.value as 'contain' | 'cover')}
              className="w-full px-3 py-1.5 border border-[#DEE6E0] rounded text-xs bg-white"
            >
              <option value="contain">Fit / Logo (No Crop)</option>
              <option value="cover">Fill / Photo (Edge-to-Edge)</option>
            </select>
          </div>

          <div className="md:col-span-12">
            {fileBase64 && (
              <div className="mt-2">
                <span className="block text-[11px] font-semibold text-[#5B6761] mb-1">
                  Live Card Preview ({imageFit === 'contain' ? 'Fit / Logo' : 'Fill / Photo'}):
                </span>
                <div
                  style={{
                    minHeight: '180px',
                    maxHeight: '220px',
                    padding: imageFit === 'contain' ? '18px 24px' : '0px',
                  }}
                  className="w-full max-w-sm bg-[#F7FAF8] border border-[#DEE6E0] rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={fileBase64}
                    alt="Preview"
                    style={
                      imageFit === 'contain'
                        ? { maxWidth: '100%', maxHeight: '184px', width: 'auto', height: 'auto', objectFit: 'contain' }
                        : { width: '100%', height: '200px', objectFit: 'cover' }
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <span>Upload to CDN</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#DEE6E0] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div
              style={{
                minHeight: '180px',
                maxHeight: '220px',
                padding: (item.imageFit || 'contain') === 'contain' ? '18px 24px' : '0px',
              }}
              className="w-full bg-[#F7FAF8] flex items-center justify-center overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={
                  (item.imageFit || 'contain') === 'contain'
                    ? { maxWidth: '100%', maxHeight: '184px', width: 'auto', height: 'auto', objectFit: 'contain' }
                    : { width: '100%', height: '200px', objectFit: 'cover' }
                }
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#101513]">{item.title}</h4>
                <span className="text-[10px] text-[#5B6761]">{item.category}</span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
