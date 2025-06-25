import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SideBar } from '../components/ui/SideBar';
import Button from '../components/ui/Button';
import { useAuth } from '../context/useAuth';
import ReactMarkdown from 'react-markdown';
import { SiCampaignmonitor } from "react-icons/si";
import { TiUser } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";
export default function ChatBrain() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'brain', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [username, setUsername] = useState('userone');
  const { userId, token } = useAuth();
  const [displayedText, setDisplayedText] = useState('');
  const typingInterval = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch username as in Dashboard
    const fetchUsername = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_API + `/content?userId=${userId}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) return;
        const result = await response.json();
        setUsername(result.username.username);
      } catch (e) {
        setUsername('userone');
      }
    };
    fetchUsername();
  }, [userId, token]);

  // Typing animation for the latest brain message
  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === 'brain') {
      setDisplayedText('');
      if (typingInterval.current) clearInterval(typingInterval.current);
      let i = 0;
      typingInterval.current = setInterval(() => {
        setDisplayedText(lastMsg.text.slice(0, i + 1));
        i++;
        if (i >= lastMsg.text.length) {
          if (typingInterval.current) clearInterval(typingInterval.current);
        }
      }, 15); // speed of typing
      return () => {
        if (typingInterval.current) clearInterval(typingInterval.current);
      };
    } else {
      setDisplayedText('');
    }
  }, [messages]);

  // Always show a default welcome message from the brain at the top
  const defaultMessage = {
    role: 'brain' as const,
    text: `Welcome to Recallr!\n\nAsk me anything about your saved content, YouTube videos, tweets, or notes. I can help you recall, summarize, or connect your knowledge.\n\n*Try asking:*\n- **What did I save about productivity?**\n- **Summarize the latest YouTube video I added**\n- **Show me my tweets about AI**`
  };

  // Scroll to bottom on new message or loading
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { role: 'user', text: input }]);
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/api/v1/vector/query',
        { query: input },
        {  headers: { Authorization: `Bearer ${token}` } }
      );
      const answer = res.data.answer;
      if (!answer) {
        setMessages(msgs => [...msgs, { role: 'brain', text: 'No relevant information found.' }]);
      } else {
        setMessages(msgs => [
          ...msgs,
          { role: 'brain', text: answer }
        ]);
      }
    } catch (e: any) {
      setError(e.message || 'Error querying brain');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-secondary p-2">
      {/* Sidebar */}
      <div className="hidden md:block">
        <SideBar username={username} />
      </div>
      {/* Chat area */}
      <div className="flex flex-col flex-1 ml-0 md:ml-64 p-0  ">
        <div className="w-full  mx-auto bg-primary  p-4  flex flex-col h-[98vh] border-[1px] border-neutral-300 rounded-xl">
          
          <div className="flex w-min mb-2">
          <Button text="Back" starticon={<HiArrowLongLeft size={14}/>} variant="primary" size="sm" onClick={() => navigate('/dashboard')}/>
          
          </div>
          <div ref={chatContainerRef} className="flex-1 flex flex-col gap-2 mb-4 overflow-y-auto bg-neutral-50 rounded-lg p-3 border border-neutral-300">
            {/* Default welcome message always at the top */}
            <div className="flex items-end gap-2 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 text-neutral-50 flex items-center justify-center text-xl rotate-90">
                <SiCampaignmonitor size={12}/>
              </div>
              <div className="max-w-[70%] px-4 py-2 rounded-2xl  bg-neutral-100 text-neutral-900 rounded-bl-none">
                <ReactMarkdown
                  components={{
                    a: ({node, ...props}) => <a className="font-bold text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    li: ({node, ...props}) => <li className="ml-4 list-disc" {...props} />,
                    code: ({node, ...props}) => <code className="bg-neutral-200 px-1 rounded text-sm" {...props} />,
                  }}
                >
                  {defaultMessage.text}
                </ReactMarkdown>
              </div>
            </div>
            {/* User and brain messages */}
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              const isLastBrain = msg.role === 'brain' && idx === messages.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar */}
                  {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 text-neutral-50 flex items-center justify-center text-xl rotate-90 ">
                      <SiCampaignmonitor size={12}/>
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl  ${
                      isUser
                        ? 'bg-neutral-900 text-neutral-50 rounded-br-none font-medium tracking-tight'
                        : 'bg-neutral-100 text-neutral-900 rounded-bl-none font-medium tracking-tight'
                    }`}
                  >
                    {msg.role === 'brain' ? (
                      isLastBrain && displayedText !== msg.text ? (
                        <ReactMarkdown
                          components={{
                            a: ({node, ...props}) => <a className="font-bold text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            li: ({node, ...props}) => <li className="ml-4 list-disc" {...props} />,
                            code: ({node, ...props}) => <code className="bg-neutral-200 px-1 rounded text-sm" {...props} />,
                          }}
                        >
                          {displayedText}
                        </ReactMarkdown>
                      ) : (
                        <ReactMarkdown
                          components={{
                            a: ({node, ...props}) => <a className="font-bold text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            li: ({node, ...props}) => <li className="ml-4 list-disc" {...props} />,
                            code: ({node, ...props}) => <code className="bg-neutral-200 px-1 rounded text-sm" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      )
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                  {/* User avatar */}
                  {isUser && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xl">
                      <TiUser size={18}/>
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 text-neutral-50 flex items-center justify-center text-xl rotate-90">
                  <SiCampaignmonitor size={12}/>
                </div>
                <div className="max-w-[70%] px-4 py-2 rounded-2xl  bg-neutral-100 text-neutral-900 rounded-bl-none">
                  <span className="inline-block">Thinking<span className="animate-pulse">...</span></span>
                </div>
              </div>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div className="flex gap-2 mt-auto">
            <input
              className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800 bg-neutral-50"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Ask your brain..."
              disabled={loading}
            />
            <Button
              text="Send"
              variant="primary"
              size="md"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 