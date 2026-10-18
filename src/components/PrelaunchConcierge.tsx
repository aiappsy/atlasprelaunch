import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  ArrowRight,
  Headphones,
  Calculator,
  RefreshCw,
} from 'lucide-react';
import {
  CurrencyCode,
  MEMBERSHIP_PRICING,
  matchConciergeQuery,
  getFallbackAnswer,
  getWelcomeMessageData,
  ConciergeAnswer,
} from '../lib/prelaunchConciergeEngine';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  action?: ConciergeAnswer['action'];
  actionLabel?: string;
  followUps?: string[];
  timestamp: string;
  isStreaming?: boolean;
}

interface PrelaunchConciergeProps {
  onJoinWaitlist: () => void;
  onOpenPodcast?: (track: 'summary' | 'deepdive') => void;
  onOpenCalculator?: () => void;
}

// Custom Markdown Text Renderer for Luxury Typography with Streaming Cursor
const FormattedMessageText: React.FC<{
  content: string;
  isUser: boolean;
  isStreaming?: boolean;
}> = ({ content, isUser, isStreaming }) => {
  if (isUser) {
    return <p className="font-medium text-xs leading-relaxed text-neutral-950">{content}</p>;
  }

  const lines = content.split('\n');

  // Helper to parse inline **bold** and *italic*
  const renderInlineFormatted = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-amber-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-neutral-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const renderCursor = () => (
    <span className="inline-block w-1.5 h-3.5 bg-amber-400 ml-1 rounded-xs animate-pulse align-middle shadow-xs shadow-amber-400/50" />
  );

  return (
    <div className="space-y-2 text-xs leading-relaxed text-neutral-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        const isLastLine = idx === lines.length - 1;

        // Horizontal divider
        if (trimmed === '---') {
          return <div key={idx} className="my-2 border-t border-amber-400/20" />;
        }

        // H3 Heading (###)
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-cinzel text-sm sm:text-base font-bold text-amber-300 pt-1 pb-0.5 tracking-wide flex items-center gap-1.5">
              <span>{trimmed.replace(/^###\s*/, '')}</span>
              {isStreaming && isLastLine && renderCursor()}
            </h3>
          );
        }

        // H4 Heading (####)
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider pt-1.5">
              {trimmed.replace(/^####\s*/, '')}
              {isStreaming && isLastLine && renderCursor()}
            </h4>
          );
        }

        // Blockquote (>)
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-l-2 border-amber-400/60 pl-3 py-1 my-1 italic text-neutral-300 bg-neutral-950/40 rounded-r-lg">
              {renderInlineFormatted(trimmed.replace(/^>\s*/, ''))}
              {isStreaming && isLastLine && renderCursor()}
            </blockquote>
          );
        }

        // Bullet point (• or - or *)
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || (trimmed.startsWith('* ') && !trimmed.endsWith('*'))) {
          const cleanText = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
              <span className="text-neutral-200 leading-normal">
                {renderInlineFormatted(cleanText)}
                {isStreaming && isLastLine && renderCursor()}
              </span>
            </div>
          );
        }

        // Numbered list item (e.g. 1., 2.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 my-1 pl-1">
              <span className="font-mono font-bold text-amber-400 shrink-0 text-[11px] mt-0.5">{numberedMatch[1]}.</span>
              <span className="text-neutral-200 leading-normal">
                {renderInlineFormatted(numberedMatch[2])}
                {isStreaming && isLastLine && renderCursor()}
              </span>
            </div>
          );
        }

        // Empty paragraph spacing
        if (trimmed === '') {
          return (
            <div key={idx} className="h-1">
              {isStreaming && isLastLine && renderCursor()}
            </div>
          );
        }

        // Standard regular paragraph
        return (
          <p key={idx} className="text-neutral-200">
            {renderInlineFormatted(line)}
            {isStreaming && isLastLine && renderCursor()}
          </p>
        );
      })}
    </div>
  );
};

export const PrelaunchConcierge: React.FC<PrelaunchConciergeProps> = ({
  onJoinWaitlist,
  onOpenPodcast,
  onOpenCalculator,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>(language === 'no' ? 'NOK' : 'EUR');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const price = MEMBERSHIP_PRICING[currency];
  const isNorwegian = language === 'no' || currency === 'NOK';

  const [messages, setMessages] = useState<Message[]>(() => {
    const initCurr: CurrencyCode = language === 'no' ? 'NOK' : 'EUR';
    const welcome = getWelcomeMessageData(initCurr);
    return [
      {
        id: 'welcome',
        sender: 'ai',
        text: welcome.text,
        action: welcome.action,
        actionLabel: welcome.actionLabel,
        followUps: welcome.followUps,
        timestamp: initCurr === 'NOK' ? 'Nettopp' : 'Just now',
      },
    ];
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync currency when global language changes
  useEffect(() => {
    if (language === 'no' && currency !== 'NOK') {
      handleCurrencyChange('NOK', false);
    } else if (language === 'en' && currency === 'NOK') {
      handleCurrencyChange('EUR', false);
    }
  }, [language]);

  // Clean up streaming interval on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) {
        clearInterval(streamingTimerRef.current);
      }
    };
  }, []);

  // Auto-scroll on new message or during streaming
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, loading]);

  // Stream text response smoothly token-by-token
  const streamAIMessage = (answer: ConciergeAnswer) => {
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current);
      streamingTimerRef.current = null;
    }

    const msgId = `ai-${Date.now()}`;
    // Split into tokens preserving whitespace and linebreaks
    const tokens = answer.text.split(/(\s+)/);
    let tokenIndex = 0;
    const tokensPerTick = 2; // Stream 2 tokens per tick for a smooth, swift cadence
    const tickInterval = 18; // 18ms per tick (~1.5s total duration for typical response)

    const initialAiMsg: Message = {
      id: msgId,
      sender: 'ai',
      text: '',
      action: answer.action,
      actionLabel: answer.actionLabel,
      followUps: answer.followUps,
      timestamp: isNorwegian ? 'Nettopp' : 'Just now',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, initialAiMsg]);
    setLoading(false);

    streamingTimerRef.current = setInterval(() => {
      tokenIndex += tokensPerTick;
      if (tokenIndex >= tokens.length) {
        if (streamingTimerRef.current) {
          clearInterval(streamingTimerRef.current);
          streamingTimerRef.current = null;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: answer.text, isStreaming: false } : m
          )
        );
      } else {
        const partial = tokens.slice(0, tokenIndex).join('');
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: partial, isStreaming: true } : m
          )
        );
      }
    }, tickInterval);
  };

  // Handle currency & language toggle
  const handleCurrencyChange = (newCurrency: CurrencyCode, syncLang = true) => {
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current);
      streamingTimerRef.current = null;
      setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)));
    }

    setCurrency(newCurrency);

    if (syncLang) {
      if (newCurrency === 'NOK' && language !== 'no') {
        setLanguage('no');
      } else if (newCurrency !== 'NOK' && language !== 'en') {
        setLanguage('en');
      }
    }

    const newPrice = MEMBERSHIP_PRICING[newCurrency];
    const welcome = getWelcomeMessageData(newCurrency);

    setMessages((prev) => {
      // If user hasn't chatted yet (only initial welcome message is shown), completely swap greeting to new language & currency
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome',
            sender: 'ai',
            text: welcome.text,
            action: welcome.action,
            actionLabel: welcome.actionLabel,
            followUps: welcome.followUps,
            timestamp: newCurrency === 'NOK' ? 'Nettopp' : 'Just now',
          },
        ];
      }

      // If user has already started a conversation, update pricing and append a clear transition notice
      const notice: Message = {
        id: `sys-${Date.now()}`,
        sender: 'ai',
        text: newCurrency === 'NOK'
          ? `🌐 *Språk og valuta er endret til Norsk (NOK). Founding-kontingent er låst til **${newPrice.formattedFounding}** (ordinært ${newPrice.formattedRegular}).*`
          : `🌐 *Language and currency updated to ${newCurrency}. Founding dues are locked at **${newPrice.formattedFounding}** (regular ${newPrice.formattedRegular}).*`,
        action: 'open_waitlist',
        actionLabel: welcome.actionLabel,
        followUps: welcome.followUps.slice(0, 3),
        timestamp: newCurrency === 'NOK' ? 'Nettopp' : 'Just now',
      };
      return [...prev, notice];
    });
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // If an earlier message is still streaming, immediately finish it before starting next query
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current);
      streamingTimerRef.current = null;
      setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m)));
    }

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: isNorwegian ? 'Nettopp' : 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // 1. Check local high-precision knowledge engine
    const localMatch = matchConciergeQuery(query, currency);
    const isGenericFallback = localMatch.text.startsWith('Atlas Travel Club er en lukket medlemsklubb') || localMatch.text.startsWith('Atlas Travel Club is a private membership club');

    if (!isGenericFallback) {
      setTimeout(() => {
        streamAIMessage(localMatch);
      }, 250);
      return;
    }

    // 2. If it is an unmapped or custom query, try querying the live Cloud Run backend
    try {
      const response = await fetch('https://atlasclub.web.app/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text })),
          systemContext: isNorwegian
            ? `Du er Aura, concierge for ATLAS Travel Club forhåndslansering (atlastravelclub.com, operert av HARD ROCK CAPITAL LTD). Valuta: NOK. Årskontingent: 1 290 kr / år ved lansering onsdag 20. januar 2027. Det er 100% gratis å reservere plass i dag – intet kredittkort nødvendig. De 100 første Founding Members mottar et gratis 3-dagers luksushotellopphold for to i Europa (verdi 5 400 kr, 0 kr i rompris via Connex), og 3 vinnere får all gourmetmat dekket. ATLAS selger fly og hotell til rå engrospris med 0 kr påslag og gir 100% provisjonsretur på cruise. Svar kort, elegant og konverserende på norsk uten lange informasjons-dumps.`
            : `You are Aura, executive AI concierge for ATLAS Travel Club prelaunch (atlastravelclub.com, operated by HARD ROCK CAPITAL LTD). Currency: ${currency}. Dues: €110 / year (1 290 NOK) at launch on Wednesday, January 20, 2027. 100% free reservation today, no credit card required. The first 100 Founding Members receive a complimentary 3-day European luxury hotel break for two (worth €480 / 5 400 kr, €0 room rate via Connex), and 3 winners win all gourmet meals covered. ATLAS sells flights and wholesale hotels at pure net wholesale with 0 markup, and gives 100% commission rebate on cruises. Answer warmly, concisely, and conversationally in 2-3 short paragraphs without information overload.`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.reply) {
          const aiAnswer: ConciergeAnswer = {
            text: data.reply,
            action: 'open_waitlist',
            actionLabel: isNorwegian
              ? `Reserver Founding-plass gratis (${price.formattedFounding})`
              : `Reserve Founding Spot Free (${price.formattedFounding})`,
            followUps: isNorwegian
              ? [
                  'Hva inkluderer det gratis hotelloppholdet?',
                  'Hva er ferieleiligheter til 3 490 kr?',
                  'Hva koster medlemskapet ved lansering?',
                  'Hva er 100% verdigarantien?',
                ]
              : [
                  'What is included in the free hotel stay?',
                  'What are 7-night condo stays for €299 (3 490 kr)?',
                  'What are the annual membership fees?',
                  'What is the 100% value guarantee?',
                ],
          };
          streamAIMessage(aiAnswer);
          return;
        }
      }
    } catch (err) {
      console.warn('Prelaunch live AI bridge fallback to local engine:', err);
    }

    // Fallback to local default if network is unavailable
    setTimeout(() => {
      const fallback = getFallbackAnswer(currency);
      streamAIMessage(fallback);
    }, 250);
  };

  const handleAction = (action?: ConciergeAnswer['action']) => {
    if (!action) return;
    if (action === 'open_waitlist') {
      onJoinWaitlist();
      setIsOpen(false);
    } else if (action === 'open_podcast' || action === 'open_audio_deepdive') {
      if (onOpenPodcast) onOpenPodcast('deepdive');
      setIsOpen(false);
    } else if (action === 'open_calculator') {
      if (onOpenCalculator) onOpenCalculator();
      setIsOpen(false);
    }
  };

  const isAnyStreaming = messages.some((m) => m.isStreaming);

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 hover:from-neutral-900 hover:to-neutral-850 text-neutral-100 border border-amber-400/40 hover:border-amber-400 font-semibold text-xs shadow-2xl shadow-black/80 transition-all transform hover:scale-105 cursor-pointer backdrop-blur-md"
            aria-label="Open Atlas Prelaunch Concierge"
          >
            {/* Live Pulsing Beacon */}
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>

            <div className="w-6 h-6 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Bot className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-100 font-cinzel font-bold text-xs tracking-wide">
                  {isNorwegian ? 'Spør Aura AI' : 'Ask Aura AI'}
                </span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                  {isNorwegian ? 'Forhåndslansering' : 'Prelaunch'}
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono hidden sm:block">
                {isNorwegian ? 'Direkte engros- og klubbsvar' : 'Instant Wholesale & Club Answers'}
              </div>
            </div>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-neutral-950"></span>
              </span>
            )}
          </button>
        )}
      </div>

      {/* Floating Concierge Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Aura Prelaunch AI Concierge"
          className="fixed bottom-4 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[500px] md:w-[540px] max-h-[85vh] h-[640px] bg-neutral-950/95 border border-amber-400/50 rounded-3xl shadow-2xl shadow-black/95 overflow-hidden flex flex-col backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-4 border-b border-amber-400/30 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-md shadow-amber-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-sm flex items-center gap-1.5 text-neutral-100">
                  {isNorwegian ? 'Aura VIP Concierge' : 'Aura VIP Concierge'}
                  <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </h4>
                <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{isNorwegian ? 'Direkte B2B Engrosintelligens' : 'Prelaunch Wholesale Intelligence'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Selector Pill */}
              <div className="flex items-center rounded-lg bg-neutral-900 border border-neutral-800 p-0.5 text-[10px] font-mono">
                {(['EUR', 'NOK', 'USD', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCurrencyChange(c)}
                    className={`px-1.5 py-0.5 rounded transition cursor-pointer font-bold ${
                      currency === c
                        ? 'bg-amber-400 text-neutral-950 shadow-xs'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
                title="Close Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Pricing Ribbon */}
          <div className="bg-neutral-900/95 px-4 py-2 border-b border-neutral-800/80 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">{isNorwegian ? 'Founding-kontingent:' : 'Founding Dues:'}</span>
              <span className="text-emerald-400 font-black">{price.formattedFounding}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-[10px] font-bold border border-amber-400/30">
              {isNorwegian ? 'Inkl. Gratis Hotellopphold (5 400 kr)' : 'Incl. Free 3-Day Hotel Break (€480)'}
            </span>
          </div>

          {/* Chat Message Scroll Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-neutral-200">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] p-4 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 rounded-tr-sm shadow-md font-semibold'
                      : 'bg-neutral-900/95 text-neutral-200 border border-neutral-800/90 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <FormattedMessageText
                    content={m.text}
                    isUser={m.sender === 'user'}
                    isStreaming={m.isStreaming}
                  />
                </div>

                {/* Optional Action Card - Reveals cleanly once streaming completes */}
                {!m.isStreaming && m.action && m.actionLabel && (
                  <button
                    type="button"
                    onClick={() => handleAction(m.action)}
                    className="mt-2.5 inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer transform hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
                    <span>{m.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
                  </button>
                )}

                {/* Follow-up Prompts - Reveals once streaming completes */}
                {!m.isStreaming && m.followUps && m.followUps.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {m.followUps.map((fu, fIdx) => (
                      <button
                        key={fIdx}
                        type="button"
                        disabled={isAnyStreaming}
                        onClick={() => handleSend(fu)}
                        className={`px-2.5 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-400/50 text-neutral-300 hover:text-amber-300 text-[11px] font-mono transition-all text-left cursor-pointer ${
                          isAnyStreaming ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        💬 {fu}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs italic bg-neutral-900/90 p-3.5 rounded-2xl border border-neutral-800 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>{isNorwegian ? 'Aura analyserer engrosprotokoller...' : 'Aura is analyzing wholesale clearing protocols...'}</span>
              </div>
            )}
          </div>

          {/* Interactive Quick Action Bar */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800/80 space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              <button
                type="button"
                onClick={() => {
                  onJoinWaitlist();
                  setIsOpen(false);
                }}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isNorwegian ? 'Gratis Hotellopphold' : 'Free Hotel Stay'}</span>
              </button>
              {onOpenPodcast && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenPodcast('deepdive');
                    setIsOpen(false);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer transition"
                >
                  <Headphones className="w-3 h-3 text-amber-400" />
                  <span>{isNorwegian ? '23-Min Lyd' : '23-Min Audio'}</span>
                </button>
              )}
              {onOpenCalculator && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenCalculator();
                    setIsOpen(false);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer transition"
                >
                  <Calculator className="w-3 h-3 text-amber-400" />
                  <span>{isNorwegian ? 'Kalkulator' : 'Calculator'}</span>
                </button>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isNorwegian
                    ? 'Spør Aura om engrospriser, prisparitet eller medlemsfordeler...'
                    : 'Ask Aura about wholesale pricing, rate parity, or founding perks...'
                }
                className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={loading || isAnyStreaming || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 text-neutral-950 font-bold transition shadow-md cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
