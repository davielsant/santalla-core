import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { generateChatResponse, generateMarketingImage } from '../services/geminiService';

const ScreenAIStudio = () => {
    const [activeTab, setActiveTab] = useState<'chat' | 'images'>('chat');

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-dark">
                <header className="flex items-center justify-between px-6 py-4 border-b border-border-dark bg-background-dark/95 backdrop-blur z-10">
                    <div className="flex items-center gap-3">
                         <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <span className="material-symbols-outlined">auto_awesome</span>
                        </div>
                        <h1 className="text-white text-2xl font-black tracking-tight">Santalla <span className="text-indigo-400">AI Studio</span></h1>
                    </div>
                    <div className="flex bg-surface-dark rounded-full p-1 border border-border-dark">
                        <button 
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'chat' ? 'bg-indigo-500 text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
                        >
                            Chatbot
                        </button>
                        <button 
                            onClick={() => setActiveTab('images')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'images' ? 'bg-indigo-500 text-white shadow-md' : 'text-text-secondary hover:text-white'}`}
                        >
                            Generador Imagen
                        </button>
                    </div>
                </header>
                
                <div className="flex-1 overflow-hidden relative">
                    {activeTab === 'chat' ? <ChatModule /> : <ImageGenModule />}
                </div>
            </main>
        </div>
    );
};

const ChatModule = () => {
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
        { role: 'model', text: 'Hola, soy la IA de Santalla Core. ¿En qué puedo ayudarte con tu negocio hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            // Format history for API
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await generateChatResponse(history, userMsg);
            if (response) {
                setMessages(prev => [...prev, { role: 'model', text: response }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, tuve un problema procesando tu solicitud.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar pb-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${
                            m.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-sm' 
                            : 'bg-surface-dark border border-border-dark text-slate-200 rounded-tl-sm'
                        }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-surface-dark border border-border-dark p-4 rounded-2xl rounded-tl-sm flex gap-2 items-center">
                            <div className="size-2 bg-indigo-500 rounded-full animate-bounce"></div>
                            <div className="size-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
                            <div className="size-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="mt-4 flex gap-2">
                <input 
                    className="flex-1 bg-surface-dark border border-border-dark rounded-full px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Escribe tu mensaje..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="size-14 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-500/20"
                >
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>
        </div>
    );
};

const ImageGenModule = () => {
    const [prompt, setPrompt] = useState('');
    const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return;
        setLoading(true);
        setImage(null);
        try {
            const result = await generateMarketingImage(prompt, size);
            setImage(result);
        } catch (e) {
            console.error(e);
            alert("Error generating image");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <div className="bg-surface-dark p-6 rounded-3xl border border-border-dark">
                        <h2 className="text-white text-xl font-bold mb-4">Configuración</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-text-secondary text-sm font-bold ml-2 mb-1 block">Prompt</label>
                                <textarea 
                                    className="w-full h-32 bg-background-dark border border-border-dark rounded-2xl p-4 text-white resize-none focus:border-indigo-500 focus:ring-0"
                                    placeholder="Describe la imagen que quieres generar..."
                                    value={prompt}
                                    onChange={e => setPrompt(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label className="text-text-secondary text-sm font-bold ml-2 mb-2 block">Resolución</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['1K', '2K', '4K'] as const).map(s => (
                                        <button 
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`py-3 rounded-xl font-bold border ${size === s ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-background-dark border-border-dark text-slate-400 hover:text-white'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={handleGenerate}
                                disabled={loading || !prompt.trim()}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg shadow-lg shadow-indigo-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">progress_activity</span> Generando...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">auto_awesome</span> Generar Imagen
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex-1 min-h-[400px] bg-black/40 rounded-3xl border border-border-dark flex items-center justify-center relative overflow-hidden group">
                        {image ? (
                            <img src={image} alt="Generated" className="w-full h-full object-contain" />
                        ) : loading ? (
                            <div className="flex flex-col items-center gap-4">
                                <span className="material-symbols-outlined text-6xl text-indigo-500 animate-pulse">image</span>
                                <p className="text-indigo-300 font-medium animate-pulse">Creando magia...</p>
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <span className="material-symbols-outlined text-6xl text-slate-700 mb-2">image_search</span>
                                <p className="text-slate-500">Tu imagen generada aparecerá aquí.</p>
                            </div>
                        )}
                        {image && (
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={image} download="santalla-ai-gen.png" className="bg-surface-dark/80 backdrop-blur p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                                    <span className="material-symbols-outlined">download</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScreenAIStudio;
