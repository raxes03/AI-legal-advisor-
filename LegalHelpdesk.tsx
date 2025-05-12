import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, PaperclipIcon, AlertCircle, Trash2, HelpCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

interface Message {
  id?: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

const LegalHelpdesk: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample legal topics for suggestions
  const legalTopics = [
    'What rights do I have if I\'m arrested?',
    'How to file a consumer complaint?',
    'What is the process for divorce in India?',
    'How to contest a property dispute?',
    'What to do if my FIR is not being registered?'
  ];

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load previous conversation if available
    const loadConversation = async () => {
      if (!currentUser) return;
      
      try {
        const queryRef = query(
          collection(firestore, 'legalQueries'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(queryRef);
        if (!querySnapshot.empty) {
          // Get the most recent conversation
          const recentQuery = querySnapshot.docs[0].data();
          setCurrentQuery(querySnapshot.docs[0].id);
          
          // Parse the messages from the query
          if (recentQuery.messages && Array.isArray(recentQuery.messages)) {
            const loadedMessages = recentQuery.messages.map((msg: any) => ({
              content: msg.content,
              sender: msg.sender,
              timestamp: msg.timestamp.toDate()
            }));
            setMessages(loadedMessages);
          }
        }
      } catch (error) {
        console.error('Error loading conversation:', error);
      }
    };
    
    loadConversation();
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !fileInputRef.current?.files?.length) {
      return;
    }

    // Create user message
    const userMessage: Message = {
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add file information if a file was uploaded
    if (fileInputRef.current?.files?.length) {
      const fileName = fileInputRef.current.files[0].name;
      userMessage.content += `\n[Attached document: ${fileName}]`;
    }
    
    // Create a placeholder for AI response
    const aiPlaceholder: Message = {
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage, aiPlaceholder]);
    setInputMessage('');
    setIsProcessing(true);
    setError('');

    try {
      // In a real app, upload file to storage and process with AI
      // For demo, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock AI response based on user query
      const aiResponse = generateMockResponse(userMessage.content);
      
      // Update messages by replacing the placeholder
      setMessages(prevMessages => 
        prevMessages.map((msg, index) => {
          if (index === prevMessages.length - 1 && msg.isLoading) {
            return {
              content: aiResponse,
              sender: 'ai',
              timestamp: new Date(),
              isLoading: false
            };
          }
          return msg;
        })
      );
      
      // Save conversation to Firestore
      if (currentUser) {
        if (currentQuery) {
          // Update existing query
          // In a real app, you would update the existing document
          // For this demo, we'll just create a new document
          await saveConversation();
        } else {
          // Create new query
          await saveConversation();
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setError('Failed to process your message. Please try again.');
      
      // Remove the loading placeholder
      setMessages(prevMessages => 
        prevMessages.filter((msg, index) => !(index === prevMessages.length - 1 && msg.isLoading))
      );
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const saveConversation = async () => {
    if (!currentUser) return;
    
    try {
      const queryData = {
        userId: currentUser.uid,
        userName: userProfile?.displayName || 'Anonymous',
        messages: messages.map(msg => ({
          content: msg.content,
          sender: msg.sender,
          timestamp: msg.timestamp
        })),
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(firestore, 'legalQueries'), queryData);
      setCurrentQuery(docRef.id);
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('arrest') || lowerQuery.includes('rights')) {
      return "If you're arrested in India, you have several important rights under the Constitution and Criminal Procedure Code:\n\n1. Right to know the grounds of arrest (Section 50 of CrPC)\n2. Right to meet an advocate of your choice\n3. Right to be presented before a magistrate within 24 hours\n4. Right against self-incrimination (Article 20(3) of Constitution)\n5. Right to inform a relative/friend about your arrest\n\nI recommend maintaining silence until your lawyer arrives and cooperating with the legal process. Would you like me to explain any of these rights in more detail?";
    }
    
    if (lowerQuery.includes('consumer') || lowerQuery.includes('complaint')) {
      return "Filing a consumer complaint in India follows these steps:\n\n1. First, approach the company/service provider directly with your grievance\n2. If unsatisfied, file a complaint with the appropriate Consumer Dispute Redressal Forum:\n   - District Forum: For claims up to ₹20 lakhs\n   - State Commission: For claims between ₹20 lakhs and ₹1 crore\n   - National Commission: For claims above ₹1 crore\n\nYour complaint should include your details, the opposite party's details, facts of the case, documents supporting your claim, and the relief sought. You can file online through the eDaakhil portal (https://edaakhil.nic.in/) or in person. Would you like information about required documentation?";
    }
    
    if (lowerQuery.includes('divorce')) {
      return "Divorce in India can be obtained through the following processes:\n\n1. Mutual Consent Divorce (Section 13B of Hindu Marriage Act or Section 28 of Special Marriage Act):\n   - Both parties agree to separation\n   - Minimum 1-year separation required\n   - Two court appearances with 6-month cooling period in between\n   - Faster and less complicated\n\n2. Contested Divorce:\n   - Filed on grounds like cruelty, adultery, desertion, etc.\n   - Can be lengthy (2-3 years or more)\n   - Requires substantial evidence\n\nThe specific process varies based on personal laws (Hindu, Muslim, Christian, Parsi) or the Special Marriage Act. Would you like me to elaborate on any specific aspect?";
    }
    
    if (lowerQuery.includes('property') || lowerQuery.includes('dispute')) {
      return "For property disputes in India, you can take these steps:\n\n1. Verify property documents and establish your legal claim\n2. Send a legal notice to the opposing party\n3. Consider alternative dispute resolution (mediation/arbitration)\n4. File a civil suit in the appropriate court:\n   - For disputes below ₹3 lakhs: Civil Judge Junior Division\n   - For disputes between ₹3-20 lakhs: Civil Judge Senior Division\n   - For disputes above ₹20 lakhs: District Judge\n\nKey documents needed include ownership proof, tax receipts, survey records, and any relevant agreements. The limitation period for property disputes is typically 12 years from when your right to possess was infringed. Would you like me to explain any specific aspect in more detail?";
    }
    
    if (lowerQuery.includes('fir') || lowerQuery.includes('police')) {
      return "If your FIR (First Information Report) isn't being registered, you have these options:\n\n1. Approach a senior police officer (SP/DCP) with your complaint\n2. File a complaint with the State Human Rights Commission\n3. Submit a written complaint to the judicial magistrate under Section 156(3) of CrPC, who can direct the police to register an FIR\n4. File a writ petition in the High Court\n\nRemember, under the Supreme Court's guidelines in Lalita Kumari v. Govt. of UP (2014), police MUST register an FIR for cognizable offenses without preliminary inquiry. Keep copies of all communications with police officers as evidence of your attempts to file the FIR. Would you like specific guidance for your situation?";
    }
    
    if (lowerQuery.includes('document') || lowerQuery.includes('attached')) {
      return "I notice you've uploaded a document. In a fully implemented system, I would analyze the document for legal relevance and provide specific advice based on its contents. For this demo, I'm providing a general response.\n\nDocuments are crucial evidence in legal proceedings. Make sure you:\n1. Keep original copies safe\n2. Get certified copies when needed for submission\n3. Maintain a chronological file of all documents\n4. Have important documents notarized when applicable\n\nIf this is a legal notice or summons, I recommend consulting with a qualified lawyer promptly as there may be time-sensitive requirements for response.";
    }
    
    // Default response for other queries
    return "Thank you for your legal query. In a fully implemented system, I would provide a detailed response specific to your question, referencing relevant sections of Indian law and precedents.\n\nFor this demo version, I'm providing a general response. Legal matters are complex and often require personalized advice. While AI can help with general guidance and information, for specific legal concerns, I recommend consulting with a qualified lawyer.\n\nIs there a specific area of law you'd like me to explain in more detail?";
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentQuery(null);
    setInputMessage('');
    setError('');
  };

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="animate-fade-in min-h-[calc(100vh-64px)] flex flex-col">
      <PageHeader 
        title="Legal Helpdesk" 
        description="Get AI-powered answers to your legal questions"
      >
        {messages.length > 0 && (
          <button
            onClick={startNewConversation}
            className="btn-outline text-sm flex items-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            New Conversation
          </button>
        )}
      </PageHeader>
      
      <div className="flex-grow flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex-grow flex flex-col bg-white rounded-lg shadow-card overflow-hidden">
          {/* Chat messages area */}
          <div className="flex-grow overflow-y-auto p-4 md:p-6">
            {messages.length === 0 ? (
              <EmptyState
                icon={<MessageSquare className="h-12 w-12 text-primary-400" />}
                title="Start a Legal Conversation"
                description="Ask any legal question and our AI assistant will provide guidance based on Indian law."
                action={
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
                    {legalTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(topic)}
                        className="text-left px-3 py-2 border border-secondary-200 rounded-md text-sm hover:bg-secondary-50 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                }
              />
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-800'
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center justify-center py-2">
                          <LoadingSpinner size="small" color={message.sender === 'user' ? 'white' : 'primary'} />
                          <span className="ml-2 text-sm">Analyzing your query...</span>
                        </div>
                      ) : (
                        <>
                          <div className="whitespace-pre-line">{message.content}</div>
                          <div 
                            className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-primary-200' : 'text-secondary-500'
                            }`}
                          >
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="border-t border-secondary-200 p-4">
            {error && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="flex items-end gap-2">
              <button
                onClick={handleFileUpload}
                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-md transition-colors"
                title="Upload document"
                disabled={isProcessing}
              >
                <PaperclipIcon className="h-5 w-5" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isProcessing}
                />
              </button>
              
              <div className="flex-grow relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your legal question..."
                  className="input resize-none py-3 pr-10 min-h-[80px]"
                  disabled={isProcessing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isProcessing || (!inputMessage.trim() && !fileInputRef.current?.files?.length)}
                  className="absolute right-3 bottom-3 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
                  title="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => {}}
                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-md transition-colors"
                title="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-secondary-500 flex items-center justify-between">
              <span>
                {fileInputRef.current?.files?.length ? (
                  <span className="flex items-center">
                    <PaperclipIcon className="h-3 w-3 mr-1" />
                    {fileInputRef.current.files[0].name}
                    <button
                      onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="ml-1 text-red-500 hover:text-red-700"
                      title="Remove file"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ) : (
                  "Upload documents (PDF, DOC, TXT) for more accurate advice"
                )}
              </span>
              <span>Press Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalHelpdesk;