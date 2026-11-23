'use client';

import React, { useState, useEffect } from 'react';
import { ThemeConfig } from '@/lib/types';
import { DEFAULT_THEME, THEME_PRESETS, ThemePreset } from '@/lib/constants';
import {
  Save,
  Check,
  RefreshCw,
  Eye,
  Sliders,
  Palette,
  Layout,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function DesignStudioPage() {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('clean-light');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/theme', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.surfaceColor) {
          setTheme(data);
          // Check if matches preset
          const matchingPreset = THEME_PRESETS.find(
            (p) =>
              p.theme.surfaceColor.toLowerCase() === data.surfaceColor.toLowerCase() &&
              p.theme.primaryColor.toLowerCase() === data.primaryColor.toLowerCase()
          );
          if (matchingPreset) setSelectedPresetId(matchingPreset.id);
          else setSelectedPresetId('custom');
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (key: keyof ThemeConfig, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
    setSelectedPresetId('custom');
  };

  const handleApplyPreset = (preset: ThemePreset) => {
    setSelectedPresetId(preset.id);
    setTheme((prev) => ({
      ...prev,
      ...preset.theme,
    }));
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
        // Also update local browser storage & broadcast event
        try {
          localStorage.setItem('serk_active_theme', JSON.stringify(theme));
          window.dispatchEvent(new CustomEvent('serk:theme:updated', { detail: theme }));
        } catch (e) {}
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        const errData = await res.json();
        alert(`Failed to save theme: ${errData.error || 'Server error'}`);
      }
    } catch (err) {
      alert('Network error while saving theme modifications.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all theme settings to official SERK brand defaults?')) {
      setTheme(DEFAULT_THEME);
      setSelectedPresetId('clean-light');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#DEE6E0] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#E3AB72]/15 text-[#B26A25] border border-[#E3AB72]/30">
              Live Theme Controller
            </span>
            <span className="text-xs text-[#5B6761]">• Zero-redeploy live web sync</span>
          </div>
          <h1 className="text-2xl font-bold text-[#101513]">Theme Engine & Background Controller</h1>
          <p className="text-xs text-[#5B6761] mt-1">
            Choose a curated theme preset or customize individual colors—including global background canvas, cards, typography, and button accents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded text-xs font-medium text-[#101513] bg-[#F4F7F5] border border-[#DEE6E0] hover:bg-[#DEE6E0]/50 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Web</span>
          </a>
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded text-xs font-medium text-[#5B6761] bg-white border border-[#DEE6E0] hover:bg-[#F4F7F5] transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded text-xs font-semibold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <span>Publishing...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Live Web Updated!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Apply & Publish to Web</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Theme successfully published!</strong> Changes are live on the public website and will persist across all deploys and restarts.
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:text-emerald-700"
          >
            Open Live Site &rarr;
          </a>
        </div>
      )}

      {/* 1. THEME PRESETS / CHOICES */}
      <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DEE6E0] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B26A25]" />
            <h2 className="text-sm font-bold text-[#101513]">Select Theme Preset</h2>
          </div>
          <span className="text-[11px] text-[#5B6761]">Click any theme to preview and apply instant styling</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {THEME_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0D4634] ring-2 ring-[#0D4634]/30 bg-emerald-50/20 shadow-sm'
                    : 'border-[#DEE6E0] bg-white hover:border-[#B26A25]/40 hover:bg-[#F4F7F5]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#101513]">{preset.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#0D4634] text-white'
                        : 'bg-[#F4F7F5] text-[#5B6761] border border-[#DEE6E0]'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>

                <p className="text-[11px] text-[#5B6761] leading-relaxed mb-3">
                  {preset.description}
                </p>

                {/* Color Swatch Dots */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#DEE6E0]/60">
                  <span className="text-[10px] text-[#5B6761] mr-1">Palette:</span>
                  <div
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-xs"
                    title={`Background: ${preset.theme.surfaceColor}`}
                    style={{ backgroundColor: preset.theme.surfaceColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-xs"
                    title={`Card: ${preset.theme.surfaceAltColor}`}
                    style={{ backgroundColor: preset.theme.surfaceAltColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-xs"
                    title={`Primary: ${preset.theme.primaryColor}`}
                    style={{ backgroundColor: preset.theme.primaryColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-xs"
                    title={`Accent: ${preset.theme.accentColor}`}
                    style={{ backgroundColor: preset.theme.accentColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. COLOR CONTROLS & LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Color Customizers (Left) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Surface & Background Controls */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Layers className="w-4 h-4 text-[#0D4634]" />
              <div>
                <h2 className="text-sm font-bold text-[#101513]">Background & Surface Canvas</h2>
                <p className="text-[11px] text-[#5B6761]">
                  Control page background colors, card surfaces, and structural outline borders.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Background Color */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Page Background
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">Canvas for all pages</p>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.surfaceColor}
                    onChange={(e) => handleChange('surfaceColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.surfaceColor}
                    onChange={(e) => handleChange('surfaceColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              {/* Card Surface Color */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Card / Surface
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">Boxes, cards, containers</p>
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
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              {/* Border Color */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Hairline Border
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">Card & divider borders</p>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.borderColor}
                    onChange={(e) => handleChange('borderColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.borderColor}
                    onChange={(e) => handleChange('borderColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action & Accent Colors */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Palette className="w-4 h-4 text-[#0D4634]" />
              <div>
                <h2 className="text-sm font-bold text-[#101513]">Actions, Buttons & Accents</h2>
                <p className="text-[11px] text-[#5B6761]">
                  Configure CTA buttons, hover states, and signature topic highlights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Primary Action Button */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Primary Action Button
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">CTA buttons & badges</p>
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
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              {/* Secondary / Hover */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Button Hover State
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">Interactive button hover</p>
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
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              {/* Accent Topic */}
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Eyebrow Topic Accent
                </label>
                <p className="text-[10px] text-[#5B6761] mb-1.5">Brand orange/amber topics</p>
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
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography Colors */}
          <div className="bg-white rounded-xl border border-[#DEE6E0] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-[#DEE6E0] pb-3">
              <Sliders className="w-4 h-4 text-[#0D4634]" />
              <div>
                <h2 className="text-sm font-bold text-[#101513]">Typography Colors & Radius</h2>
                <p className="text-[11px] text-[#5B6761]">
                  Headline ink, body descriptions, and corner roundness.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Headline Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Muted Body Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.textMutedColor}
                    onChange={(e) => handleChange('textMutedColor', e.target.value)}
                    className="w-9 h-9 p-0.5 border border-[#DEE6E0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.textMutedColor}
                    onChange={(e) => handleChange('textMutedColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-[#DEE6E0] rounded text-xs uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101513] mb-1">
                  Corner Radius ({theme.borderRadius})
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="2"
                  value={parseInt(theme.borderRadius) || 8}
                  onChange={(e) => handleChange('borderRadius', `${e.target.value}px`)}
                  className="w-full accent-[#0D4634] mt-2"
                />
              </div>
            </div>
          </div>

          {/* Header Layout Structure */}
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
        </div>

        {/* Live Visual Preview (Right Sticky) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#101513] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#0D4634]" />
              <span>Real-Time Website Simulation</span>
            </div>
            <span className="text-[10px] text-[#5B6761] font-normal lowercase">Live preview</span>
          </div>

          {/* Canvas Box representing the user's web page */}
          <div
            className="p-6 rounded-2xl border shadow-md space-y-5 transition-all"
            style={{
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
            }}
          >
            {/* Simulation Header */}
            <div
              className="flex items-center justify-between pb-3 border-b"
              style={{ borderColor: theme.borderColor }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <span className="text-xs font-bold tracking-tight" style={{ color: theme.textColor }}>
                  SERK GROUP
                </span>
              </div>
              <span
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded"
                style={{
                  backgroundColor: 'rgba(227, 171, 114, 0.15)',
                  color: theme.accentColor,
                  border: `1px solid ${theme.accentColor}`,
                }}
              >
                SECTOR INTELLIGENCE
              </span>
            </div>

            {/* Headline and Topic */}
            <div>
              <span
                className="text-[11px] font-bold tracking-wider uppercase block mb-1.5"
                style={{ color: theme.accentColor }}
              >
                Enterprise Systems
              </span>
              <h3
                className="text-lg font-bold leading-tight"
                style={{ color: theme.textColor }}
              >
                We Engineer the Systems Behind Better Business.
              </h3>
              <p
                className="text-xs leading-relaxed mt-2"
                style={{ color: theme.textMutedColor }}
              >
                Practical digital solutions for organizations ready to work smarter. Software engineering, thoughtful design, and responsible AI.
              </p>
            </div>

            {/* Sample Card */}
            <div
              className="p-4 rounded-xl border space-y-3 shadow-xs transition-all"
              style={{
                backgroundColor: theme.surfaceAltColor,
                borderColor: theme.borderColor,
                borderRadius: theme.borderRadius,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-bold"
                  style={{ color: theme.textColor }}
                >
                  Project Takeoff AI
                </span>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded text-white"
                  style={{
                    backgroundColor: theme.primaryColor,
                    borderRadius: theme.borderRadius,
                  }}
                >
                  Production Ready
                </span>
              </div>
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: theme.textMutedColor }}
              >
                Architectural blueprint takeoff engine extracting materials and quantities with sub-millimeter precision.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  className="px-3 py-1.5 text-[11px] font-semibold text-white transition-opacity shadow-xs"
                  style={{
                    backgroundColor: theme.primaryColor,
                    borderRadius: theme.borderRadius,
                  }}
                >
                  Explore System
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 text-[11px] font-semibold transition-opacity"
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.textColor,
                    border: `1px solid ${theme.borderColor}`,
                    borderRadius: theme.borderRadius,
                  }}
                >
                  Inquire &rarr;
                </button>
              </div>
            </div>

            {/* Footer simulation */}
            <div
              className="pt-3 border-t text-[10px] flex items-center justify-between"
              style={{
                borderColor: theme.borderColor,
                color: theme.textMutedColor,
              }}
            >
              <span>Canvas Bg: {theme.surfaceColor}</span>
              <span>Action: {theme.primaryColor}</span>
            </div>
          </div>

          {/* Quick Apply Button on Right Column */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-lg text-xs font-bold text-white bg-[#0D4634] hover:bg-[#2D735A] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Apply Theme Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
