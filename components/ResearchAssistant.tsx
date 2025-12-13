import React, { useState, useRef, useEffect } from 'react';
import { askResearchAssistant } from '../services/geminiService';
import { BlogPost, Message } from '../types';

interface Props {
  currentPost: BlogPost | null;
}

export const ResearchAssistant: React.FC<Props> = ({ currentPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings. I am the Research Assistant. You may query the contents of this document or ask general mathematical questions." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await askResearchAssistant(userText, currentPost);

    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg border border-academic-border transition-all duration-300 font-serif italic ${
          isOpen ? 'bg-academic-blue text-black rotate-90' : 'bg-academic-surface text-academic-blue hover:bg-zinc-800'
        }`}
        aria-label="Toggle Research Assistant"
      >
        {isOpen ? "×" : "AI"}
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-academic-surface shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-l border-academic-border flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-academic-border bg-academic-surface">
          <h2 className="font-serif text-lg font-semibold text-academic-blue">Research Assistant</h2>
          <p className="text-xs font-mono text-gray-500 mt-1">Powered by Gemini 2.5 Flash</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-paper">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-lg p-4 text-sm leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 border-zinc-700 text-gray-100 font-sans' 
                    : 'bg-academic-surface border-academic-border text-gray-300 font-serif'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-academic-surface border border-academic-border p-3 rounded text-xs font-mono text-gray-500">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-academic-border bg-academic-surface">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full pl-4 pr-12 py-3 bg-paper border border-academic-border rounded-md focus:outline-none focus:ring-1 focus:ring-academic-blue font-sans text-sm text-gray-200 placeholder-gray-600"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 p-1 text-gray-500 hover:text-academic-blue disabled:opacity-50"
            >
              →
            </button>
          </div>
        </form>
      </div>
    </>
  );
};