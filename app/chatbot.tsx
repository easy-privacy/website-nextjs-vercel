import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaUser, FaRobot, FaAngleUp } from 'react-icons/fa';

interface Message {
  user?: string;
  bot?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([
    { bot: "Hello, how can I help you today?" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (input.trim()) {
      setConversation((prev) => [...prev, { user: input }]);
      setLoading(true);
      setInput('');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const botResponse = `Response for: ${input}`;

      setConversation((prev) => [...prev, { bot: botResponse }]);
      setLoading(false);
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const preventScroll = (event: WheelEvent | TouchEvent) => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;

      if (scrollTop === 0 && (event as WheelEvent).deltaY < 0) {
        event.preventDefault();
      }

      if (scrollTop + clientHeight >= scrollHeight && (event as WheelEvent).deltaY > 0) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('wheel', preventScroll, { passive: false });
      chatContainer.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('wheel', preventScroll);
        chatContainer.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="fixed bottom-5 right-5">
      {isOpen ? (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-96">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <h2 className="text-lg font-bold">Chatbot</h2>
            <FaAngleDown className="text-gray-600 hover:text-gray-800" />
          </div>
          <div ref={chatContainerRef} className="h-80 overflow-y-auto mb-4">
            {conversation.map((message, index) => {
              const isUser = !!message.user;
              const text = isUser ? message.user : message.bot;
              return (
                <div key={index} className={`my-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {isUser ? (
                    <div className="flex items-center">
                      <div className={`inline-block max-w-[80%] px-3 py-2 rounded-lg bg-blue-500 text-white text-sm`} style={{ lineHeight: '1.2' }}>
                        {text}
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-1">
                        <FaUser className="text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-1">
                        <FaRobot className="text-gray-600" />
                      </div>
                      <div className={`inline-block max-w-[80%] px-3 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm`} style={{ lineHeight: '1.2' }}>
                        {text}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-center my-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-r-lg px-4 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-600 text-white rounded-lg flex items-center p-2 px-4 w-96 cursor-pointer" onClick={() => setIsOpen(true)}>
          <h2 className="text-lg font-bold">Chatbot</h2>
          <FaAngleUp className="ml-auto text-white hover:text-gray-200" />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
