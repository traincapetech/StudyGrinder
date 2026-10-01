import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { socket } from '../socket';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import chatbotData from '../data/chatbot_flow.json';
import API_BASE_URL from '../config/api';

const GlobalChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [currentFlow, setCurrentFlow] = useState({ title: "Support", options: [] });

    // ---------------------------------------------------------
    // 1. THE OBSERVER: Listen to URL changes to update context
    // ---------------------------------------------------------

    useEffect(() => {
        // Reset chat if not talking to a human
        if (!token) {
            setMessages([]);
        }

        const currentPath = location.pathname;
        const flowId = chatbotData.routes[currentPath];

        if (flowId && chatbotData.flows[flowId]) {
            const flowData = chatbotData.flows[flowId];
            setCurrentFlow({
                title: flowData.title,
                options: [
                    ...flowData.options,
                    ...(flowData.options.some(o => o.action === 'handover')
                        ? []
                        : [{ label: "Talk to Human Expert", action: "handover" }])
                ]
            });

            if (isOpen && !token) {
                const greeting = flowData.welcome || `Welcome to ${flowData.title}. How can I assist you?`;
                setMessages([{ sender: 'System', text: greeting, isGreeting: true }]);
            }
        } else {
            // FALLBACK logic
            const currentPath = location.pathname;

            // 1. Check if it's a certification page
            if (currentPath.includes('/certifications/')) {
                const pathSegments = currentPath.split('/').filter(Boolean);
                const slug = pathSegments[pathSegments.length - 1];

                // Format slug to Title Case for better display
                const courseName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                const template = chatbotData.flows.generic_course_template;

                // Replace {COURSE_NAME} placeholder in title and welcome
                const dynamicTitle = template.title.replace(/{COURSE_NAME}/g, courseName);
                const dynamicWelcome = template.welcome.replace(/{COURSE_NAME}/g, courseName);

                // Create dynamic options
                const dynamicOptions = template.options.map(opt => ({
                    ...opt,
                    // We don't replace placeholders in the 'answer' yet, we'll do it on click
                }));

                setCurrentFlow({
                    title: dynamicTitle,
                    options: dynamicOptions
                });

                if (isOpen && !token) {
                    setMessages([{ sender: 'System', text: dynamicWelcome, isGreeting: true }]);
                }
            } else {
                // FALLBACK: Try to find a flow based on the URL last segment (slug)
                const pathSegments = location.pathname.split('/').filter(Boolean);
                const potentialSlug = pathSegments[pathSegments.length - 1];

                let dynamicFlowId = null;
                if (chatbotData.flows[potentialSlug]) {
                    dynamicFlowId = potentialSlug;
                } else if (chatbotData.flows[`course_${potentialSlug}`]) {
                    dynamicFlowId = `course_${potentialSlug}`;
                }

                if (dynamicFlowId) {
                    const flowData = chatbotData.flows[dynamicFlowId];
                    setCurrentFlow({
                        title: flowData.title,
                        options: [
                            ...flowData.options,
                            ...(flowData.options.some(o => o.action === 'handover')
                                ? []
                                : [{ label: "Talk to Human Expert", action: "handover" }])
                        ]
                    });
                    if (isOpen && !token) {
                        const greeting = flowData.welcome || `Welcome to ${flowData.title}. How can I assist you?`;
                        setMessages([{ sender: 'System', text: greeting, isGreeting: true }]);
                    }
                } else {
                    setGenericFlow();
                }
            }
        }
    }, [location.pathname, token, isOpen]); // Re-run when URL changes

    const setGenericFlow = () => {
        // Use existing chatbot_flow.json or hardcoded default
        // Double check if strict route exists (already checked above actually, but good for safety)
        const flowId = chatbotData.routes[location.pathname];
        if (flowId && chatbotData.flows[flowId]) {
            setCurrentFlow(chatbotData.flows[flowId]);
        } else {
            setCurrentFlow({
                title: "Study Grinder Support",
                options: [
                    { label: "What services do you provide?", answer: "We provide IT training, certifications, and consultancy services." },
                    { label: "Where are you located?", answer: "We have a global presence. Check our Contact Us page." },
                    { label: "Talk to Human Expert", action: "handover" }
                ]
            });
        }
    };

    // ---------------------------------------------------------
    // 2. CHAT LOGIC
    // ---------------------------------------------------------

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0 && !token) {
            const greeting = `Hi! Welcome to ${currentFlow.title || "Support"}. How can I assist you today?`;
            setMessages([{ sender: 'System', text: greeting, isGreeting: true }]);
        }
    }, [isOpen, currentFlow, token, messages.length]);

    const handleOptionClick = (option) => {
        setMessages(prev => [...prev, { sender: 'User', text: option.label }]);

        if (option.action === 'handover') {
            startHandover();
        } else {
            // Remove the clicked question from the options list
            setCurrentFlow(prevFlow => ({
                ...prevFlow,
                options: prevFlow.options.filter(opt => opt.label !== option.label)
            }));

            setIsTyping(true);
            setTimeout(() => {
                let answer = option.answer;

                // 1. Scraping Logic for Dynamic Placeholders
                if (answer.includes('{COURSE_OUTCOMES}')) {
                    const outcomesEl = document.getElementById('course-learning-outcomes');
                    const outcomes = outcomesEl ? outcomesEl.innerText : "Visit the course page to see specific learning outcomes.";
                    answer = answer.replace('{COURSE_OUTCOMES}', outcomes);
                }

                if (answer.includes('{COURSE_DURATION}')) {
                    const durationEl = document.getElementById('course-duration');
                    const duration = durationEl ? durationEl.innerText : "specified on the program details.";
                    answer = answer.replace('{COURSE_DURATION}', duration);
                }

                if (answer.includes('{COURSE_DELIVERY}')) {
                    const deliveryEl = document.getElementById('course-delivery');
                    const delivery = deliveryEl ? deliveryEl.innerText : "our standard training modes.";
                    answer = answer.replace('{COURSE_DELIVERY}', delivery);
                }

                // Replace course name if current flow title is available
                if (answer.includes('{COURSE_NAME}')) {
                    answer = answer.replace(/{COURSE_NAME}/g, currentFlow.title);
                }

                setMessages(prev => [...prev, { sender: 'System', text: answer }]);
                setIsTyping(false);
            }, 600);
        }
    };

    const [isWaiting, setIsWaiting] = useState(false);
    const [consultantName, setConsultantName] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleFeedback = async (resolved) => {
        setShowFeedback(false);
        if (resolved) {
            setMessages(prev => [...prev, { sender: 'User', text: 'Yes, my issue is resolved!' }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'System',
                    text: "🎉 That's wonderful to hear! We're glad our expert could help you out. Thank you for choosing Armx-Indecodex — have a great day!"
                }]);
                // Reset to chatbot mode after a short delay
                setTimeout(() => {
                    setToken(null);
                    setConsultantName(null);
                    setIsWaiting(false);
                    socket.disconnect();
                }, 3000);
            }, 500);
        } else {
            setMessages(prev => [...prev, { sender: 'User', text: "No, I still need help." }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    sender: 'System',
                    text: "We're sorry to hear that. Let us connect you with another expert right away..."
                }]);
                // Auto-reconnect to another consultant
                setToken(null);
                setConsultantName(null);
                socket.disconnect();
                setTimeout(() => startHandover(), 1000);
            }, 500);
        }
    };

    const startHandover = async () => {
        const tokenStr = localStorage.getItem("token");
        if (!user || !tokenStr) {
            setMessages(prev => [...prev, {
                sender: 'System',
                text: "Please sign in to talk to our human experts. Redirecting to login..."
            }]);
            setTimeout(() => {
                setIsOpen(false);
                navigate('/login');
            }, 2500);
            return;
        }

        setLoading(true);
        setMessages(prev => [...prev, { sender: 'System', text: "Requesting a human expert..." }]);
        try {
            const res = await fetch(`${API_BASE_URL}/chat/request-human`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientName: user.username })
            });
            const data = await res.json();

            if (data.success) {
                setToken(data.token);
                socket.connect();
                socket.emit('join_session', data.token);

                if (data.status === 'waiting') {
                    setIsWaiting(true);
                    setMessages(prev => [...prev, { sender: 'System', text: "We have notified our experts. Please wait while someone picks up your chat..." }]);
                } else if (data.status === 'active') {
                    setIsWaiting(false);
                    setConsultantName(data.consultantName);
                    setMessages(prev => [...prev, { sender: 'System', text: `You are now connected to ${data.consultantName}.` }]);
                } else {
                    // Should actally not happen in new flow, but backward compat
                    setMessages(prev => [...prev, { sender: 'System', text: `Connected to ${data.consultantName}` }]);
                }

            } else {
                setMessages(prev => [...prev, { sender: 'System', text: data.message || "Service unavailable." }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'System', text: "Connection error. Please try again later." }]);
        }
        setLoading(false);
    };

    const sendMessage = () => {
        if (!inputText.trim() || !token) return;
        socket.emit('send_message', { token, text: inputText, sender: 'User' });
        setMessages(prev => [...prev, { sender: 'User', text: inputText }]);
        setInputText("");
    };

    useEffect(() => {
        socket.on('receive_message', (m) => {
            if (m.sender === 'Consultant') setMessages(prev => [...prev, m]);
        });

        socket.on('consultant_joined', (data) => {
            setIsWaiting(false);
            setConsultantName(data.consultantName);
            setMessages(prev => [...prev, { sender: 'System', text: `You are now connected to ${data.consultantName}.` }]);
        });

        socket.on('chat_ended', () => {
            setMessages(prev => [...prev, {
                sender: 'System',
                text: "The consultant has ended this session. Was your issue resolved?"
            }]);
            setShowFeedback(true);
        });

        return () => {
            socket.off('receive_message');
            socket.off('consultant_joined');
            socket.off('chat_ended');
        };
    }, []);

    // Helper to render formatted text
    const renderMessageText = (text) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    // ---------------------------------------------------------
    // 3. UI RENDER
    // ---------------------------------------------------------
    return (
        <>
            {/* Toggle Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed', bottom: '100px', right: '20px', zIndex: 9999,
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: '#007bff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)', cursor: 'pointer', transition: 'transform 0.3s'
                }}
            >
                {isOpen ? <X color="white" size={30} /> : <MessageSquare color="white" size={30} />}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    position: 'fixed', bottom: '170px', right: '20px',
                    width: '350px', height: '500px', backgroundColor: 'white',
                    borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    zIndex: 10000, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    fontFamily: 'Arial, sans-serif', animation: 'fadeIn 0.3s ease'
                }}>
                    {/* Header */}
                    <div style={{ padding: '15px', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{token ? "Live Support" : currentFlow.title}</span>
                        {token && <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>Online</span>}
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9' }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.sender === 'User' ? 'flex-end' : 'flex-start',
                                backgroundColor: m.sender === 'User' ? '#007bff' : 'white',
                                color: m.sender === 'User' ? 'white' : '#333',
                                padding: '10px 14px', borderRadius: '12px',
                                borderBottomLeftRadius: m.sender !== 'User' ? '2px' : '12px',
                                borderBottomRightRadius: m.sender === 'User' ? '2px' : '12px',
                                maxWidth: '85%', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                lineHeight: '1.4'
                            }}>
                                {renderMessageText(m.text)}
                            </div>
                        ))}
                        {isTyping && <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '12px', marginLeft: '10px' }}>Typing...</div>}

                        {/* Options Buttons */}
                        {!token && !showFeedback && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                                {currentFlow.options && currentFlow.options.map((opt, idx) => (
                                    <button key={idx} onClick={() => handleOptionClick(opt)} style={{
                                        background: 'white', border: '1px solid #007bff', color: '#007bff',
                                        padding: '8px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', textAlign: 'left',
                                        transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                    }}
                                        onMouseEnter={e => { e.target.style.background = '#007bff'; e.target.style.color = 'white'; }}
                                        onMouseLeave={e => { e.target.style.background = 'white'; e.target.style.color = '#007bff'; }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Feedback Buttons - After consultant ends session */}
                        {showFeedback && (
                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                <button
                                    onClick={() => handleFeedback(true)}
                                    style={{
                                        flex: 1, backgroundColor: 'white', border: '1px solid #3a23bdff', color: 'black',
                                        padding: '10px', borderRadius: '20px', cursor: 'pointer',
                                        fontSize: '13px', transition: 'all 0.2s', textAlign: 'center'
                                    }}
                                    onMouseEnter={e => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = 'white' }}
                                    onMouseLeave={e => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = 'black' }}
                                >
                                    Yes, it's resolved
                                </button>
                                <button
                                    onClick={() => handleFeedback(false)}
                                    style={{
                                        flex: 1, backgroundColor: 'white', border: '1px solid #3a23bdff', color: 'black',
                                        padding: '10px', borderRadius: '20px', cursor: 'pointer',
                                        fontSize: '13px', transition: 'all 0.2s', textAlign: 'center'
                                    }}
                                    onMouseEnter={e => { e.target.style.backgroundColor = '#007bff'; e.target.style.color = 'white' }}
                                    onMouseLeave={e => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.color = 'black' }}
                                >
                                    No, I need more help
                                </button>
                            </div>
                        )}

                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { if (el) { el.scrollIntoView({ behavior: "smooth" }); } }}>
                        </div>
                    </div>

                    {/* Input */}
                    {token && !isWaiting && !showFeedback && (
                        <div style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px', backgroundColor: 'white' }}>
                            <input
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                                style={{ flex: 1, border: '1px solid #ddd', borderRadius: '20px', padding: '10px 15px', outline: 'none' }}
                            />
                            <button onClick={sendMessage} style={{ border: 'none', background: '#007bff', borderRadius: '50%', width: '40px', height: '40px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <Send size={18} />
                            </button>
                        </div>
                    )}
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default GlobalChat;
