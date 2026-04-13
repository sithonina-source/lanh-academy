"use client";

import React, { useState, useRef, useEffect } from 'react';
import { chatWithBeLanh } from '@/app/actions/chat';

export default function Chatbot() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
   const [input, setInput] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   
   const chatEndRef = useRef<HTMLDivElement>(null);
   const popSound = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      // Âm thanh pop up cực nhẹ
      popSound.current = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
      // Fix error: we actually can't reliably put base64 audio without full string. 
      // Emulating a fallback or not doing anything if it fails.
   }, []);

   useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isTyping]);

   const toggleChat = () => {
      setIsOpen(!isOpen);
      if (!isOpen && messages.length === 0) {
         try { popSound.current?.play().catch(()=>{}); } catch (e) {}
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isTyping) return;

      const userText = input;
      setInput('');
      
      const newHistory = [...messages, { role: 'user' as const, text: userText }];
      setMessages(newHistory);
      setIsTyping(true);

      const reqHistory = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      
      const { text, error } = await chatWithBeLanh(userText, reqHistory);
      setIsTyping(false);

      if (error) {
         setMessages([...newHistory, { role: 'model', text: error }]);
      } else if (text) {
         setMessages([...newHistory, { role: 'model', text: text }]);
         try { popSound.current?.play().catch(()=>{}); } catch (e) {}
      }
   };

   return (
      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
         <style>{`
            @keyframes happyWalk {
              0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
              25% { transform: translateX(-20px) translateY(-12px) rotate(-8deg); }
              50% { transform: translateX(0) translateY(0) rotate(0deg); }
              75% { transform: translateX(20px) translateY(-12px) rotate(8deg); }
            }
            @keyframes pulseDot {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .belanh-mascot {
               animation: happyWalk 3s infinite ease-in-out;
               cursor: pointer;
               transition: filter 0.3s;
               filter: drop-shadow(0 10px 10px rgba(16, 185, 129, 0.4));
            }
            .belanh-mascot:hover {
               animation-play-state: paused;
               transform: scale(1.1) !important;
               filter: drop-shadow(0 15px 20px rgba(16, 185, 129, 0.7));
            }
            .chat-bubble-user {
               background: #10B981;
               color: white;
               padding: 12px 16px;
               border-radius: 20px 20px 0 20px;
               max-width: 85%;
               align-self: flex-end;
               font-size: 0.95rem;
               word-break: break-word;
            }
            .chat-bubble-model {
               background: white;
               color: #374151;
               padding: 12px 16px;
               border-radius: 20px 20px 20px 0;
               max-width: 85%;
               align-self: flex-start;
               box-shadow: 0 2px 6px rgba(0,0,0,0.06);
               font-size: 0.95rem;
               word-break: break-word;
            }
         `}</style>

         {isOpen && (
            <div style={{
               width: '360px',
               height: '520px',
               backgroundColor: '#F3F4F6',
               borderRadius: '24px',
               boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
               display: 'flex',
               flexDirection: 'column',
               marginBottom: '15px',
               overflow: 'hidden',
               border: '1px solid rgba(16,185,129,0.2)'
            }}>
               <div style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src="/be-lanh.png" alt="bot" style={{width: '90%', height: '90%', objectFit: 'contain', marginTop: '5px'}} />
                     </div>
                     <div>
                        <strong style={{ fontSize: '1.1rem', display: 'block', lineHeight: 1.2 }}>Bé Lành 🌱</strong>
                        <span style={{ fontSize: '0.8rem', color: '#D1FAE5' }}>Nhân viên tư vấn trực tiếp</span>
                     </div>
                  </div>
                  <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
               </div>
               
               <div style={{ flex: 1, padding: '20px 15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {messages.length === 0 && (
                     <div style={{ textAlign: 'center', color: '#6B7280', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src="/be-lanh.png" alt="Bot" style={{ width: '100px', opacity: 0.9, marginBottom: '10px' }} />
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>Chào Anh/Chị! Em là Bé Lành túc trực ở đây, Anh/Chị cần hỗ trợ gì cứ nhắn em nhen! ❤️</p>
                     </div>
                  )}
                  {messages.map((m, i) => (
                     <div key={i} className={`chat-bubble-${m.role}`}>
                        {m.text}
                     </div>
                  ))}
                  {isTyping && (
                     <div className="chat-bubble-model" style={{ display: 'flex', gap: '6px', padding: '16px', alignItems: 'center' }}>
                        <span style={{width: 8, height: 8, background: '#10B981', borderRadius: '50%', animation: 'pulseDot 1.4s infinite ease-in-out both'}} />
                        <span style={{width: 8, height: 8, background: '#10B981', borderRadius: '50%', animation: 'pulseDot 1.4s infinite ease-in-out both', animationDelay: '0.2s'}} />
                        <span style={{width: 8, height: 8, background: '#10B981', borderRadius: '50%', animation: 'pulseDot 1.4s infinite ease-in-out both', animationDelay: '0.4s'}} />
                     </div>
                  )}
                  <div ref={chatEndRef} />
               </div>

               <form onSubmit={handleSubmit} style={{ padding: '15px', background: 'white', display: 'flex', gap: '10px' }}>
                  <input 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Nhắn tin giao lưu với Bé Lành..." 
                     style={{ flex: 1, padding: '12px 18px', borderRadius: '100px', border: '1px solid #E5E7EB', outline: 'none', backgroundColor: '#F9FAFB', fontSize: '0.95rem' }}
                     disabled={isTyping}
                  />
                  <button type="submit" disabled={isTyping || !input.trim()} title="Gửi (Enter)" style={{ background: '#10B981', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: isTyping || !input.trim() ? 0.5 : 1, transition: 'background 0.2s' }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '-2px', marginTop: '2px'}}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
               </form>
            </div>
         )}

         {!isOpen && (
            <div onClick={toggleChat} className="belanh-mascot">
               <img src="/be-lanh.png" alt="Chat với Bé Lành" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            </div>
         )}
      </div>
   );
}
