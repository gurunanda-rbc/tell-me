import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  Shield, 
  MoreHorizontal,
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Chat = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['.txt', '.pdf'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (allowedTypes.includes(fileExtension)) {
        setUploadedFile(file);
        setShowButtons(true);
        setChatMode(false);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} is ready for analysis`,
        });
        
        // Add file upload message
        setMessages([{
          id: Date.now().toString(),
          type: 'user',
          content: `Uploaded: ${file.name}`,
          timestamp: new Date()
        }]);
      } else {
        toast({
          title: "Unsupported file type",
          description: "Please upload a .txt or .pdf file",
          variant: "destructive"
        });
      }
    }
  };

  const handleActionClick = async (action: string) => {
    if (!uploadedFile) return;
    
    setIsLoading(true);
    
    // Add user action message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: action,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = "";
      
      switch (action) {
        case "Summarize":
          aiResponse = `📋 **Summary of ${uploadedFile.name}**\n\nKey Points:\n• Main discussion topics identified\n• Important decisions and action items\n• Notable participant contributions\n• Timeline of key events\n\nThis document contains approximately 45 messages spanning 3 hours of conversation about project planning and resource allocation.`;
          break;
        case "Check for Safety":
          aiResponse = `🛡️ **Safety Analysis Complete**\n\n✅ **File is SAFE**\n\n• No malicious code detected\n• No suspicious links found\n• Content appears legitimate\n• File structure is normal\n\nThis file poses no security risks and is safe to open and share.`;
          break;
        case "Suggest WhatsApp Replies":
          aiResponse = `💬 **Suggested Replies**\n\nBased on the conversation context:\n\n1. "Thanks for the update! I'll review the details and get back to you by tomorrow."\n\n2. "Great points raised. Should we schedule a follow-up meeting to discuss implementation?"\n\n3. "I agree with the proposed timeline. Let's move forward with this plan."\n\nThese responses maintain professionalism while acknowledging the key discussion points.`;
          break;
        default:
          aiResponse = "I'm ready to help! Please specify what you'd like me to analyze about this document.";
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleOtherClick = () => {
    setShowButtons(false);
    setChatMode(true);
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || !uploadedFile) return;
    
    setIsLoading(true);
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setCurrentInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `I've analyzed your question about "${currentInput}" in the context of ${uploadedFile.name}. Based on my analysis, I can provide insights about the specific topics you're interested in. Let me search through the document for relevant information and provide you with a detailed response.`;
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const resetChat = () => {
    setUploadedFile(null);
    setShowButtons(false);
    setChatMode(false);
    setMessages([]);
    setCurrentInput("");
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface-elevated">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-2xl font-bold">AI Document Chat</h1>
          
          {uploadedFile && (
            <Button variant="outline" size="sm" onClick={resetChat}>
              New Analysis
            </Button>
          )}
        </div>
      </header>

      {/* Main Chat Interface */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[70vh] flex flex-col shadow-lg">
          <CardContent className="flex-1 p-6 flex flex-col">
            
            {/* Initial State - No File Uploaded */}
            {!uploadedFile && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 primary-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4">Upload Your Document</h2>
                  <p className="text-muted-foreground mb-8">
                    Upload a WhatsApp chat export, PDF, or text file to get started with AI analysis
                  </p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                  </Button>
                  
                  <div className="mt-6 text-sm text-muted-foreground">
                    Supported formats: .txt, .pdf
                  </div>
                </div>
              </div>
            )}

            {/* File Uploaded State */}
            {uploadedFile && (
              <div className="flex-1 flex flex-col">
                {/* File Info */}
                <div className="mb-6">
                  <Card className="p-4 bg-surface-elevated border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <div className="font-medium">{uploadedFile.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB • Ready for analysis
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    </div>
                  </Card>
                </div>

                {/* Action Buttons */}
                {showButtons && !chatMode && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">What would you like me to do?</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="chat" 
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={() => handleActionClick("Summarize")}
                        disabled={isLoading}
                      >
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Summarize</span>
                        <span className="text-xs text-muted-foreground">Get key points and main topics</span>
                      </Button>
                      
                      <Button 
                        variant="chat" 
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={() => handleActionClick("Check for Safety")}
                        disabled={isLoading}
                      >
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Check for Safety</span>
                        <span className="text-xs text-muted-foreground">Scan for potential risks</span>
                      </Button>
                      
                      <Button 
                        variant="chat" 
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={() => handleActionClick("Suggest WhatsApp Replies")}
                        disabled={isLoading}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">Suggest Replies</span>
                        <span className="text-xs text-muted-foreground">Generate response options</span>
                      </Button>
                      
                      <Button 
                        variant="chat" 
                        className="h-auto p-4 flex flex-col items-start gap-2"
                        onClick={handleOtherClick}
                        disabled={isLoading}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                        <span className="font-medium">Other...</span>
                        <span className="text-xs text-muted-foreground">Ask custom questions</span>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-surface-elevated border border-border'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-surface-elevated border border-border p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 animate-spin" />
                          <span className="text-sm">AI is analyzing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                {chatMode && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Ask me anything about this document..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!currentInput.trim() || isLoading}
                        size="icon"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Press Enter to send • Ask specific questions about the content
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Chat;