import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PUBLIC_ENV } from '@/lib/env';

const CHAT_URL = `${PUBLIC_ENV.SUPABASE_URL}/functions/v1/chat`;

export default function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = async (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          setTranscript(transcriptText);
          await sendToAI(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const sendToAI = async (text: string) => {
    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PUBLIC_ENV.SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
        }),
      });

      if (!resp.ok) {
        throw new Error('Failed to get response');
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      let assistantContent = '';

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Speak the response
      if (assistantContent && synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(assistantContent);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
      }
    } catch (e) {
      console.error('Voice chat error:', e);
      toast({
        title: 'Error',
        description: 'Failed to process voice message',
        variant: 'destructive',
      });
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Not Supported',
        description: 'Speech recognition is not supported in your browser',
        variant: 'destructive',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-[400px] w-full max-w-3xl mx-auto border border-border rounded-lg bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Voice Chat</h2>
        <p className="text-sm text-muted-foreground">Speak naturally with your AI coach</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
          isListening ? 'bg-primary/20 animate-pulse' : 'bg-muted'
        }`}>
          {isSpeaking ? (
            <Volume2 className="w-16 h-16 text-primary animate-pulse" />
          ) : isListening ? (
            <Mic className="w-16 h-16 text-primary" />
          ) : (
            <MicOff className="w-16 h-16 text-muted-foreground" />
          )}
        </div>

        {transcript && (
          <div className="text-center max-w-md">
            <p className="text-sm text-muted-foreground mb-1">You said:</p>
            <p className="text-foreground">{transcript}</p>
          </div>
        )}

        <Button
          size="lg"
          onClick={toggleListening}
          className={isListening ? 'bg-destructive hover:bg-destructive/90' : ''}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 mr-2" />
              Start Voice Chat
            </>
          )}
        </Button>

        {isListening && (
          <p className="text-sm text-muted-foreground animate-pulse">
            Listening... Speak now
          </p>
        )}
      </div>
    </div>
  );
}
