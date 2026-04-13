'use client';

import React, { useState, useEffect } from 'react';

interface ImagePickerProps {
  name: string;
  defaultValue?: string;
}

export default function ImagePicker({ name, defaultValue = '' }: ImagePickerProps) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [tab, setTab] = useState<'gallery' | 'upload'>('gallery');
  const [uploading, setUploading] = useState(false);

  // Fetch ảnh khi mở Modal
  useEffect(() => {
    if (isOpen && tab === 'gallery') {
      fetch('/api/images')
        .then(res => res.json())
        .then(data => {
          if (data.images) setImages(data.images);
        });
    }
  }, [isOpen, tab]);

  const handleSelect = (url: string) => {
    setValue(url);
    setIsOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        handleSelect(data.url);
      } else {
        alert('Có lỗi xảy ra: ' + data.error);
      }
    } catch (err) {
      alert('Tải ảnh thất bại!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          name={name} 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          placeholder="Link ảnh..." 
          style={{ flex: 1, padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px' }} 
        />
        {value && (
          <img src={value} alt="Preview" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E5E7EB' }} />
        )}
        <button 
          type="button" 
          onClick={() => setIsOpen(true)}
          style={{ padding: '12px 20px', backgroundColor: '#F3F4F6', color: '#1F2937', fontWeight: 600, border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          📁 Thư viện Media
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '800px', height: '80vh', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Thư Viện Ảnh Lành Academy</h2>
              <button type="button" onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6B7280' }}>&times;</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
              <button 
                type="button" 
                onClick={() => setTab('gallery')}
                style={{ padding: '15px 25px', backgroundColor: tab === 'gallery' ? 'white' : 'transparent', border: 'none', borderBottom: tab === 'gallery' ? '2px solid var(--primary-green)' : '2px solid transparent', fontWeight: tab === 'gallery' ? 700 : 500, color: tab === 'gallery' ? 'var(--dark-accent)' : '#6B7280', cursor: 'pointer' }}
              >
                Ảnh có sẵn trong hệ thống
              </button>
              <button 
                type="button" 
                onClick={() => setTab('upload')}
                style={{ padding: '15px 25px', backgroundColor: tab === 'upload' ? 'white' : 'transparent', border: 'none', borderBottom: tab === 'upload' ? '2px solid var(--primary-green)' : '2px solid transparent', fontWeight: tab === 'upload' ? 700 : 500, color: tab === 'upload' ? 'var(--dark-accent)' : '#6B7280', cursor: 'pointer' }}
              >
                Tải ảnh mới lên
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#F3F4F6' }}>
              
              {tab === 'gallery' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSelect(img)}
                      style={{ cursor: 'pointer', backgroundColor: 'white', padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden', borderRadius: '4px', marginBottom: '8px', backgroundColor: '#F9FAFB' }}>
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Media" loading="lazy" />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#6B7280', wordBreak: 'break-all', textAlign: 'center' }}>
                         {img.split('/').pop()}
                      </span>
                    </div>
                  ))}
                  {images.length === 0 && <p style={{ color: '#6B7280', gridColumn: '1 / -1', textAlign: 'center', marginTop: '40px' }}>Đang tải hoặc chưa có hình ảnh nào...</p>}
                </div>
              )}

              {tab === 'upload' && (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '400px', padding: '60px 40px', backgroundColor: 'white', borderRadius: '16px', border: '2px dashed #D1D5DB', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: uploading ? 0.6 : 1 }}>
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                     <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '8px' }}>
                       {uploading ? 'Đang xử lý...' : 'Chọn từ máy tính'}
                     </span>
                     <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>Hỗ trợ JPG, PNG, WEBP</span>
                     <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
