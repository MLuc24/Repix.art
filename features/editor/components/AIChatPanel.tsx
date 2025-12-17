
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';

const SUGGESTIONS = [
  { id: 1, icon: <Icons.Wand className="w-4 h-4" />, text: "Use Nano Banana Pro to create a vintage clock..." },
  { id: 2, icon: <Icons.Sparkles className="w-4 h-4" />, text: "Create a fresh ad poster for this shampoo..." },
  { id: 3, icon: <Icons.Image className="w-4 h-4" />, text: "Generate a cyberpunk city background..." },
];

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  image?: string;
}

export const AIChatPanel = ({ onClose }: { onClose?: () => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Default expanded for popup mode
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoPrompt = () => {
    setIsTyping(true);
    // Simulate AI thinking and writing a prompt
    setTimeout(() => {
      setInputValue("Enhance the lighting and add a cinematic color grade to this image.");
      setIsTyping(false);
    }, 1200);
  };
    
  const clearImage = () => {
    setReferenceImage(null);
  };

  const handleSend = () => {
    if (!inputValue.trim() && !referenceImage) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      image: referenceImage || undefined
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setReferenceImage(null);
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "I've analyzed your request. Here is a generated preview based on your inputs. Would you like to refine the lighting?"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col bg-[#0e0f13] border-l border-white/5 relative text-white transition-all duration-300 pointer-events-auto shadow-2xl ${isCollapsed ? 'h-14 overflow-hidden rounded-bl-xl' : 'h-full'}`}>
      
      {/* Header */}
      {/* Header */}
      <div 
        className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0e0f13]"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
             <Icons.Gemini className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">Design AI</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Assistant</p>
          </div>
        </div>
      </div>

      {/* Content Wrapper - masked when collapsed */}
      <div className={`flex-1 flex flex-col min-h-0 ${isCollapsed ? 'hidden' : 'flex'}`}>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        
        {messages.length === 0 ? (
          <div className="space-y-6 h-full flex flex-col justify-start pt-6"> {/* Changed justify-end to start, added pt-6 */}
            {/* Welcome Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white leading-tight tracking-tight"> {/* Reduced text-3xl to 2xl */}
                Hello, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
                  Creator
                </span>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed"> {/* Reduced text-sm to xs */}
                I can help you edit, generate, or remix your design. What's on your mind?
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="space-y-2"> {/* Reduced space-y-3 to 2 */}
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Suggestions</p>
              {SUGGESTIONS.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => setInputValue(s.text.replace('...', ''))}
                  className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-[#1a1b26] border border-white/5 hover:border-violet-500/40 hover:bg-[#1f202e] hover:shadow-lg hover:shadow-violet-900/10 transition-all duration-300 text-left group"
                >
                  <div className="p-1.5 rounded-lg bg-black/20 text-slate-400 group-hover:text-violet-400 group-hover:bg-violet-500/10 transition-colors shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-[11px] text-slate-300 group-hover:text-white font-medium leading-relaxed my-auto">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-violet-600' : 'bg-slate-700'}`}>
                  {msg.role === 'ai' ? <Icons.Sparkles className="w-4 h-4 text-white" /> : <Icons.User className="w-4 h-4 text-white" />}
                </div>
                <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                   {msg.image && (
                     <img src={msg.image} alt="ref" className="w-32 h-32 object-cover rounded-xl border border-white/10" />
                   )}
                   {msg.text && (
                     <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-sm' : 'bg-[#1a1b26] border border-white/5 text-slate-300 rounded-tl-sm'}`}>
                       {msg.text}
                     </div>
                   )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                    <Icons.Sparkles className="w-4 h-4 text-white animate-pulse" />
                 </div>
                 <div className="bg-[#1a1b26] border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

      </div>

      {/* Input Area */}
      <div className="p-3 pb-16 bg-[#0e0f13] border-t border-white/5"> {/* Added pb-16 to clear the Switch Role button */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
           
           <div className="relative bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden focus-within:border-violet-500/50 transition-colors flex flex-col">
             
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

             {/* Upload Preview Area (Pushes text down) */}
             {referenceImage && (
               <div className="p-2 bg-black/20 border-b border-white/5 flex items-center gap-2 animate-fade-in-up">
                  <div className="relative group/img">
                    <img src={referenceImage} alt="Ref" className="h-10 w-10 object-cover rounded-md border border-white/10" />
                    <button 
                      onClick={clearImage}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md"
                    >
                      <Icons.Close className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <p className="font-bold text-white mb-0">Reference</p>
                  </div>
               </div>
             )}

             <textarea 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Describe your idea..."
               className="w-full h-10 p-3 bg-transparent text-xs text-white placeholder-slate-500 resize-none outline-none leading-relaxed"
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             />
             
             <div className="flex items-center justify-between px-1.5 pb-1.5">
                <div className="flex gap-0.5">
                   <button 
                     onClick={handleUploadClick}
                     className={`p-1.5 rounded-lg transition-colors ${referenceImage ? 'text-violet-400 bg-violet-500/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                     title="Upload Reference"
                   >
                     <Icons.Image className="w-4 h-4" />
                   </button>
                   {/* Auto Prompt Button */}
                   <button 
                     onClick={handleAutoPrompt}
                     className={`p-1.5 rounded-lg transition-colors ${isTyping ? 'text-amber-400 bg-amber-500/10 animate-pulse' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                     title="Auto-generate Prompt"
                   >
                     <Icons.Wand className="w-4 h-4" />
                   </button>
                </div>
                
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() && !referenceImage}
                  className={`p-1.5 rounded-lg transition-all ${(!inputValue.trim() && !referenceImage) ? 'bg-slate-800 text-slate-500' : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/20 hover:scale-105 active:scale-95'}`}
                >
                   <Icons.ArrowRight className="w-3.5 h-3.5" />
                </button>
             </div>
           </div>
        </div>
        
        <div className="flex justify-center mt-2">
           <span className="text-[9px] text-slate-600 font-medium">10/10 free generations left</span>
        </div>
      </div>

      </div>
    </div>
  );
};
