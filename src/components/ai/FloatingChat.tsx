'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, X, Send, Loader2, User, Stethoscope } from 'lucide-react';
import { healthChat } from '@/ai/flows/health-chat';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: 'Hello! I am your MediGold AI Assistant. How can I help you with your health concerns today?' }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await healthChat({
        message: userMsg,
        history: messages
      });
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: 'I apologize, but I am having trouble connecting to my diagnostic centers. Please try again or seek professional help if this is an emergency.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] shadow-2xl glass border-primary/30 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="p-4 bg-primary/10 border-b border-primary/20 flex flex-row items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/20">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold">MediGold AI Support</CardTitle>
                <p className="text-[10px] text-primary/70 font-medium uppercase tracking-tighter">Gold Standard Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-primary/10 text-primary">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex gap-3 max-w-[85%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                      m.role === 'user' ? "bg-primary/10 border-primary/20" : "bg-card border-white/10"
                    )}>
                      {m.role === 'user' ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-primary" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed",
                      m.role === 'user' ? "bg-primary text-black font-medium" : "bg-white/5 border border-white/10"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3 mr-auto">
                    <div className="h-8 w-8 rounded-full bg-card border border-white/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary animate-pulse" />
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-primary/10 bg-background/50 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a health question..."
                  className="flex-1 bg-white/5 border border-primary/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  disabled={loading}
                />
                <Button 
                  size="icon" 
                  type="submit"
                  disabled={loading || !input.trim()} 
                  className="gold-gradient text-black shrink-0 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon" 
        className={cn(
          "h-16 w-16 rounded-full gold-gradient text-black shadow-2xl gold-glow transition-all duration-300 border-2 border-primary/20",
          !isOpen && "animate-bounce hover:animate-none"
        )}
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        <span className="sr-only">Toggle AI Support</span>
      </Button>
      
      {!isOpen && (
        <div className="absolute -top-12 right-0 glass px-4 py-2 rounded-2xl border border-primary/30 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-700 hidden md:block">
          <p className="text-xs font-bold text-primary">Need medical advice? Ask me!</p>
        </div>
      )}
    </div>
  );
}
