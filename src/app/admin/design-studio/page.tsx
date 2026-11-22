'use client';

import React, { useState, useEffect } from 'react';
import { ThemeConfig } from '@/lib/types';
import { DEFAULT_THEME } from '@/lib/constants';
import { Save, Check, RefreshCw, Eye, Sliders, Palette, Layout } from 'lucide-react';

export default function DesignStudioPage() {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/theme')
      .then((res) => res.json())
      .then((data) => {
        if (data) setTheme(data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (key: keyof ThemeConfig, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to save theme modifications.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all theme settings to official SERK brand defaults?')) {
      setTheme(DEFAULT_THEME);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101513]">Design Studio & Theme Tokens</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Configure global brand colors, typography, surface treatments, and navigation layouts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded text-xs font-medium text-[#5B6761] bg-white border border-[#DEE6E0] hover:bg-[#F4F7F5] transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded text-xs font-medium text-white bg-[#0D4634] hover:bg-[#2D735A] transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Publish Theme</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Colors Card */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Palette className="w-4 h-4 text-[#0D4634]" />
              <h2 className="text-sm font-bold text-[#101513]">Brand Palette Tokens</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Primary Accent (CTAs & Badges)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Secondary (Hover State)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Accent Gold (Highlights)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Secondary Surface (Mist)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.surfaceAltColor}
                    onChange={(e) => handleChange('surfaceAltColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.surfaceAltColor}
                    onChange={(e) => handleChange('surfaceAltColor', e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Layout Card */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Layout className="w-4 h-4 text-[#0D4634]" />
              <h2 className="text-sm font-bold text-[#101513]">Header Structure</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChange('headerLayout', 'TWO_ROW')}
                className={`p-4 rounded-lg border text-left transition-all ${
                  theme.headerLayout === 'TWO_ROW'
                    ? 'border-[#0D4634] bg-emerald-50/40 ring-1 ring-[#0D4634]'
                    : 'border-[#DEE6E0] bg-white hover:bg-[#F4F7F5]'
                }`}
              >
                <div className="text-xs font-bold text-[#101513] mb-1">Two-Row Header (Default)</div>
                <div className="text-[11px] text-[#5B6761] leading-relaxed">
                  Row 1: Utility bar with contacts. <br />
                  Row 2: Primary navigation + CTA.
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChange('headerLayout', 'ONE_ROW')}
                className={`p-4 rounded-lg border text-left transition-all ${
                  theme.headerLayout === 'ONE_ROW'
                    ? 'border-[#0D4634] bg-emerald-50/40 ring-1 ring-[#0D4634]'
                    : 'border-[#DEE6E0] bg-white hover:bg-[#F4F7F5]'
                }`}
              >
                <div className="text-xs font-bold text-[#101513] mb-1">Single-Row Header</div>
                <div className="text-[11px] text-[#5B6761] leading-relaxed">
                  Compact 68px unified navigation bar with all links consolidated.
                </div>
              </button>
            </div>
          </div>

          {/* Typography & Radius */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Sliders className="w-4 h-4 text-[#0D4634]" />
              <h2 className="text-sm font-bold text-[#101513]">Typography & Corner Radius</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Heading Font
                </label>
                <select
                  value={theme.fontHeading}
                  onChange={(e) => handleChange('fontHeading', e.target.value)}
                  className="w-full px-3 py-2 border border-[#DEE6E0] rounded text-xs"
                >
                  <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans</option>
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Noto Sans Ethiopic, sans-serif">Noto Sans Ethiopic</option>
                  <option value="system-ui, sans-serif">System UI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1.5">
                  Border Radius ({theme.borderRadius})
                </label>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="2"
                  value={parseInt(theme.borderRadius) || 6}
                  onChange={(e) => handleChange('borderRadius', `${e.target.value}px`)}
                  className="w-full accent-[#0D4634] mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Visual Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#101513] uppercase tracking-wider">
            <Eye className="w-4 h-4 text-[#0D4634]" />
            <span>Interactive Token Preview</span>
          </div>

          <div
            className="p-6 rounded-xl border shadow-sm space-y-5 transition-all"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
              borderRadius: theme.borderRadius,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: theme.borderColor }}>
              <span className="text-xs font-bold" style={{ color: theme.textColor }}>
                SERK UI Preview Card
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: '#FFFFFF',
                  borderRadius: theme.borderRadius,
                }}
              >
                Production Ready
              </span>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: theme.textMutedColor }}>
              This live preview uses the dynamic CSS variables configured on the left. Changes apply
              to the public website immediately upon clicking Publish.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: theme.primaryColor,
                  borderRadius: theme.borderRadius,
                }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-4 py-2 text-xs font-semibold transition-opacity"
                style={{
                  backgroundColor: theme.surfaceAltColor,
                  color: theme.textColor,
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: theme.borderRadius,
                }}
              >
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
