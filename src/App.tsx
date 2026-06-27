import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Eye, 
  FileText, 
  Mail, 
  Printer, 
  Copy, 
  Check, 
  Search, 
  Share2, 
  Scale, 
  AlertTriangle, 
  Clock, 
  Handshake, 
  BookOpen, 
  UserCheck, 
  ChevronRight, 
  RefreshCw,
  Send,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface Clause {
  id: number;
  title: string;
  englishTitle: string;
  description: string;
  icon: any;
  category: "policy" | "terms";
}

interface SupportQuery {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"policy" | "terms" | "signer" | "contact">("policy");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interaction Feedbacks
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Digital Signer State
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("Gautam Tiwari");
  const [channelName, setChannelName] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [contractDate, setContractDate] = useState("2026-06-27");
  const [buyerSignatureData, setBuyerSignatureData] = useState<string | null>(null);
  
  // Canvas Ref & Drawing State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Support Inbox State
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMsg, setSupportMsg] = useState("");
  const [queriesList, setQueriesList] = useState<SupportQuery[]>([]);
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);

  // Load queries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gautam_tiwari_queries");
    if (saved) {
      try {
        setQueriesList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Set today's date formatted nicely as fallback
    const today = new Date().toISOString().split('T')[0];
    setContractDate(today);

    // Track scroll progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save query helper
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMsg) return;

    const newQuery: SupportQuery = {
      id: "GT-" + Math.floor(100000 + Math.random() * 900000),
      name: supportName,
      email: supportEmail,
      message: supportMsg,
      date: new Date().toLocaleString("hi-IN"),
    };

    const updated = [newQuery, ...queriesList];
    setQueriesList(updated);
    localStorage.setItem("gautam_tiwari_queries", JSON.stringify(updated));

    // Clear form
    setSupportName("");
    setSupportEmail("");
    setSupportMsg("");
    setShowSupportSuccess(true);
    setTimeout(() => setShowSupportSuccess(false), 5000);
  };

  // Clear Support queries
  const handleClearQueries = () => {
    setQueriesList([]);
    localStorage.removeItem("gautam_tiwari_queries");
  };

  // Copy Clean Policy/Terms Text
  const handleCopyPolicyText = () => {
    const textToCopy = `
गौतम तिवारी (Gautam Tiwari) - गोपनीयता नीति एवं अतिरिक्त नियम व शर्तें

[1] गोपनीयता नीति (Privacy Policy)
हम आपके द्वारा साझा की गई किसी भी व्यक्तिगत जानकारी का सम्मान करते हैं और उसकी सुरक्षा का पूरा ध्यान रखते हैं।
1. जानकारी का संग्रह: हम आपका नाम, ईमेल पता या अन्य व्यक्तिगत जानकारी केवल तभी एकत्र करते हैं जब आप स्वेच्छा से हमें प्रदान करते हैं।
2. जानकारी का उपयोग: आपकी जानकारी का उपयोग केवल आपके प्रश्नों का उत्तर देने के लिए, हमारे चैनल और सेवाओं को बेहतर बनाने के लिए, आवश्यक सूचनाएँ प्रदान करने के लिए किया जाएगा।
3. तृतीय-पक्ष सेवाएँ: हमारा चैनल और संबंधित सेवाएँ तृतीय-पक्ष प्लेटफ़ॉर्म जैसे YouTube और Google की सेवाओं का उपयोग कर सकती हैं, जिनकी अपनी गोपनीयता नीतियाँ होती हैं।
4. कुकीज़ (Cookies): कुछ सेवाएँ आपके अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग कर सकती हैं।
5. जानकारी की सुरक्षा: हम आपकी जानकारी की सुरक्षा के लिए उचित कदम उठाते हैं, लेकिन इंटरनेट पर कोई भी प्रणाली 100% सुरक्षित नहीं होती।
6. नीति में बदलाव: हम समय-समय पर इस गोपनीयता नीति में बदलाव कर सकते हैं। किसी भी बदलाव के बाद नई नीति इसी पेज पर उपलब्ध होगी।
7. संपर्क करें: यदि आपके पास इस गोपनीयता नीति से संबंधित कोई प्रश्न है, तो आप हमसे हमारे आधिकारिक ईमेल पते के माध्यम से संपर्क कर सकते हैं। हम आपकी फीडबैक का स्वागत करते हैं।

[2] अतिरिक्त नियम एवं शर्तें (Additional Terms & Conditions)
1. यदि खरीदार द्वारा तय समय पर शेष भुगतान नहीं किया जाता है, तो पहले से किया गया भुगतान किसी भी स्थिति में वापस नहीं किया जाएगा तथा चैनल का स्वामित्व विक्रेता के पास रहेगा या वापस ले लिया जाएगा।
2. यदि खरीदार द्वारा आंशिक भुगतान करने के बाद चैनल खरीदने से मना किया जाता है या चैनल पसंद नहीं आता है, तो भुगतान वापसी और चैनल हस्तांतरण का निर्णय दोनों पक्षों की आपसी सहमति के अनुसार किया जाएगा।
3. यदि किसी भी पक्ष द्वारा 7 दिनों तक कोई प्रतिक्रिया, संपर्क या उत्तर नहीं दिया जाता है, तो उसके बाद दूसरे पक्ष की कोई जिम्मेदारी नहीं होगी।
4. चैनल खरीदने या बेचने वाले सभी पक्ष इस समझौते में लिखी गई सभी शर्तों को स्वीकार करेंगे और उनका पालन करेंगे।
5. इस समझौते पर दोनों पक्षों के हस्ताक्षर होने के बाद ही इसे वैध माना जाएगा।
6. यदि इस समझौते पर संबंधित पक्षों के हस्ताक्षर नहीं हैं, तो यह समझौता अमान्य और अवैध माना जाएगा।

संचालित (Powered by): गौतम तिवारी (Gautam Tiwari)
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Copy app sharing link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Trigger Print
  const handlePrint = () => {
    window.print();
  };

  // Canvas drawing handlers (Mouse & Touch compatible)
  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    // Support touch vs mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1e3a8a"; // Nice deep blue ink color
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBuyerSignatureData(null);
    setIsSigned(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Check if anything drawn
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    if (canvas.toDataURL() === blank.toDataURL()) {
      alert("कृपया हस्ताक्षर बॉक्स में अपने हस्ताक्षर करें!");
      return;
    }

    const dataUrl = canvas.toDataURL();
    setBuyerSignatureData(dataUrl);
    setIsSigned(true);
  };

  // Reset entire signer tool
  const resetSigner = () => {
    setBuyerName("");
    setChannelName("");
    setDealAmount("");
    setBuyerSignatureData(null);
    setIsSigned(false);
    setTimeout(() => {
      clearCanvas();
    }, 100);
  };

  // Policy & Terms structured array for easy rendering and searching
  const clauses: Clause[] = [
    {
      id: 1,
      category: "policy",
      title: "जानकारी का संग्रह",
      englishTitle: "Collection of Information",
      description: "हम आपका नाम, ईमेल पता या अन्य व्यक्तिगत जानकारी केवल तभी एकत्र करते हैं जब आप स्वेच्छा से हमें प्रदान करते हैं। यह जानकारी पूर्ण रूप से सुरक्षित रखी जाती है।",
      icon: Database
    },
    {
      id: 2,
      category: "policy",
      title: "जानकारी का उपयोग",
      englishTitle: "Use of Information",
      description: "आपकी जानकारी का उपयोग केवल: आपके प्रश्नों का उत्तर देने के लिए, हमारे चैनल और सेवाओं को बेहतर बनाने के लिए, और आपको आवश्यक सूचनाएँ प्रदान करने के लिए ही किया जाएगा।",
      icon: Eye
    },
    {
      id: 3,
      category: "policy",
      title: "तृतीय-पक्ष सेवाएँ",
      englishTitle: "Third-Party Services",
      description: "हमारा चैनल और संबंधित सेवाएँ तृतीय-पक्ष प्लेटफ़ॉर्म जैसे YouTube और Google की सेवाओं का उपयोग कर सकती हैं, जिनकी अपनी गोपनीयता नीतियाँ होती हैं। हम आपको उनकी नीतियां पढ़ने की सलाह देते हैं।",
      icon: ShieldCheck
    },
    {
      id: 4,
      category: "policy",
      title: "कुकीज़ (Cookies)",
      englishTitle: "Cookies Usage",
      description: "कुछ सेवाएँ आपके अनुभव को बेहतर और कस्टमाइज़ बनाने के लिए कुकीज़ का उपयोग कर सकती हैं। आप अपनी ब्राउज़र सेटिंग्स में जाकर कुकीज़ को डिसेबल कर सकते हैं।",
      icon: Lock
    },
    {
      id: 5,
      category: "policy",
      title: "जानकारी की सुरक्षा",
      englishTitle: "Information Security",
      description: "हम आपकी जानकारी की सुरक्षा के लिए उचित एवं कड़े तकनीकी कदम उठाते हैं, लेकिन इंटरनेट पर कोई भी प्रणाली शत-प्रतिशत (100%) सुरक्षित नहीं होती। अतः पूर्ण सावधानी बरतें।",
      icon: Lock
    },
    {
      id: 6,
      category: "policy",
      title: "नीति में बदलाव",
      englishTitle: "Policy Updates",
      description: "हम समय-समय पर इस गोपनीयता नीति में बदलाव कर सकते हैं। किसी भी बदलाव के बाद नई नीति इसी पेज पर तत्काल प्रभाव से उपलब्ध होगी। कृपया नियमित अंतराल पर इसे देखें।",
      icon: RefreshCw
    },
    {
      id: 7,
      category: "policy",
      title: "संपर्क करें",
      englishTitle: "Contact Information",
      description: "यदि आपके पास इस गोपनीयता नीति से संबंधित कोई प्रश्न है, तो आप हमसे हमारे आधिकारिक ईमेल पते के माध्यम से बेझिझक संपर्क कर सकते हैं। हम आपकी रचनात्मक फीडबैक का सदैव स्वागत करते हैं।",
      icon: Mail
    },
    {
      id: 8,
      category: "terms",
      title: "शेष भुगतान एवं स्वामित्व",
      englishTitle: "Remaining Payment & Ownership",
      description: "यदि खरीदार द्वारा तय समय पर शेष भुगतान नहीं किया जाता है, तो पहले से किया गया अग्रिम (advance) भुगतान किसी भी स्थिति में वापस नहीं किया जाएगा तथा चैनल का संपूर्ण स्वामित्व विक्रेता के पास रहेगा या वापस ले लिया जाएगा।",
      icon: AlertTriangle
    },
    {
      id: 9,
      category: "terms",
      title: "आपसी सहमति से वापसी व हस्तांतरण",
      englishTitle: "Refund & Transfer Agreement",
      description: "यदि खरीदार द्वारा आंशिक भुगतान करने के बाद चैनल खरीदने से मना किया जाता है या चैनल पसंद नहीं आता है, तो भुगतान वापसी और चैनल हस्तांतरण का निर्णय दोनों पक्षों की आपसी सहमति के अनुसार किया जाएगा।",
      icon: Handshake
    },
    {
      id: 10,
      category: "terms",
      title: "संचार और प्रतिक्रिया समय सीमा",
      englishTitle: "7-Day Communication Threshold",
      description: "यदि किसी भी पक्ष द्वारा लगातार 7 दिनों तक कोई प्रतिक्रिया, संपर्क या उत्तर नहीं दिया जाता है, तो उसके बाद दूसरे पक्ष की कोई ज़िम्मेदारी या उत्तरदायित्व नहीं होगा। समझौता समाप्त समझा जाएगा।",
      icon: Clock
    },
    {
      id: 11,
      category: "terms",
      title: "शर्तों की पूर्ण स्वीकृति",
      englishTitle: "Acceptance of All Terms",
      description: "चैनल खरीदने या बेचने वाले सभी पक्ष इस लिखित समझौते में उल्लिखित सभी शर्तों को पूर्ण रूप से बिना किसी आपत्ति के स्वीकार करेंगे और उनका हर परिस्थिति में अक्षरशः पालन करेंगे।",
      icon: UserCheck
    },
    {
      id: 12,
      category: "terms",
      title: "हस्ताक्षर होने पर वैधता",
      englishTitle: "Validity Upon Signature",
      description: "इस समझौते पर दोनों पक्षों के विधिवत हस्ताक्षर होने के बाद ही इसे कानूनी और व्यावहारिक रूप से वैध माना जाएगा। यह दोनों पक्षों को कानूनी सुरक्षा प्रदान करता है।",
      icon: FileText
    },
    {
      id: 13,
      category: "terms",
      title: "बिना हस्ताक्षर के अमान्य",
      englishTitle: "Invalidity Without Signature",
      description: "यदि इस समझौते पर संबंधित पक्षों के प्रामाणिक डिजिटल या भौतिक हस्ताक्षर नहीं हैं, तो यह समझौता पूर्णतः अमान्य, अवैध और निष्प्रभावी माना जाएगा।",
      icon: Scale
    }
  ];

  // Search filtering
  const filteredClauses = clauses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 transition-colors duration-300">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 z-50 transition-all duration-100 no-print" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header Banner - Beautiful Minimalist Editorial Style */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 no-print shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 id="main-title" className="font-hindi text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                गोपनीयता नीति और अनुबंध हब
              </h1>
              <p className="text-xs text-slate-500 font-mono tracking-wider uppercase">
                Powered by Gautam Tiwari
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick action buttons */}
            <button 
              id="btn-copy-policy"
              onClick={handleCopyPolicyText} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Copy entire policy text"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? "कॉपी हो गया!" : "टेक्स्ट कॉपी करें"}</span>
            </button>
            <button 
              id="btn-copy-link"
              onClick={handleCopyLink} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Copy website link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "लिंक कॉपी हो गया!" : "शेयर करें"}</span>
            </button>
            <button 
              id="btn-print-policy"
              onClick={handlePrint} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Print Policy Page"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट करें</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome Segment */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 px-4 border-b border-slate-200 no-print">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 mb-4 animate-pulse">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
            आधिकारिक कानूनी एवं नीति दस्तावेज़
          </span>
          <h2 className="text-3xl md:text-5xl font-hindi font-bold text-slate-900 leading-tight">
            गोपनीयता नीति एवं नियम व शर्तें
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-hindi">
            हम आपके द्वारा साझा की गई किसी भी व्यक्तिगत जानकारी का सम्मान करते हैं और उसकी सुरक्षा का पूरा ध्यान रखते हैं। इस पोर्टल पर आप हमारी आधिकारिक गोपनीयता नीति पढ़ सकते हैं और ऑनलाइन क्रय-विक्रय हेतु डिजिटल हस्ताक्षर युक्त अनुबंध बना सकते हैं।
          </p>

          {/* Search box built in hero for visual command */}
          <div className="mt-8 max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input 
              id="policy-search"
              type="text"
              placeholder="नियम, भुगतान या सुरक्षा खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-800 text-sm transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md"
              >
                साफ़ करें
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar Menu (Static Navigation) */}
          <aside className="lg:col-span-3 space-y-2 no-print">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                दस्तावेज़ की विषय-सूची
              </h3>
              <nav className="space-y-1">
                <button
                  id="tab-policy"
                  onClick={() => { setActiveTab("policy"); setSearchQuery(""); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "policy"
                      ? "bg-amber-50 text-amber-900 border-l-4 border-amber-500 pl-4"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    गोपनीयता नीति
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  id="tab-terms"
                  onClick={() => { setActiveTab("terms"); setSearchQuery(""); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "terms"
                      ? "bg-amber-50 text-amber-900 border-l-4 border-amber-500 pl-4"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-600" />
                    नियम एवं शर्तें
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  id="tab-signer"
                  onClick={() => { setActiveTab("signer"); setSearchQuery(""); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "signer"
                      ? "bg-amber-50 text-amber-900 border-l-4 border-amber-500 pl-4"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    अनुबंध हस्ताक्षर टूल
                  </span>
                  <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                </button>

                <button
                  id="tab-contact"
                  onClick={() => { setActiveTab("contact"); setSearchQuery(""); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === "contact"
                      ? "bg-amber-50 text-amber-900 border-l-4 border-amber-500 pl-4"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    सहायता एवं फीडबैक
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </nav>
            </div>

            {/* Quick Gautam Tiwari card */}
            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-slate-800 rounded-full opacity-30 pointer-events-none" />
              <p className="text-amber-400 text-[10px] uppercase font-bold tracking-widest">
                Official Admin
              </p>
              <h4 className="font-hindi text-base font-bold mt-1">गौतम तिवारी</h4>
              <p className="text-slate-400 text-xs font-hindi mt-2">
                YouTube चैनल डील्स, डिजिटल संपत्तियों के लेन-देन एवं समझौते के लिए प्रामाणिक पोर्टल।
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-slate-300 text-[11px]">सेवाएं लाइव और सक्रिय हैं</span>
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9">
            
            {/* Real-time search alert */}
            {searchQuery && (
              <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl flex items-center justify-between no-print">
                <div className="flex items-center gap-2 text-sm">
                  <Search className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    खोज परिणाम: <strong>"{searchQuery}"</strong> के लिए <strong>{filteredClauses.length}</strong> क्लॉज मिले।
                  </span>
                </div>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-amber-700 hover:underline font-semibold cursor-pointer"
                >
                  सभी नियम देखें
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              
              {/* TAB 1: PRIVACY POLICY */}
              {(activeTab === "policy" || searchQuery) && (
                <motion.div
                  key="privacy-policy-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div>
                        <h3 className="font-hindi text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                          <ShieldCheck className="w-6 h-6 text-amber-500" />
                          गोपनीयता नीति (Privacy Policy)
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">
                          गौतम तिवारी द्वारा संचालित सेवाओं की आधिकारिक गोपनीयता सुरक्षा गाइडलाइन
                        </p>
                      </div>
                      <span className="bg-slate-100 text-slate-800 text-xs font-mono px-3 py-1 rounded-full uppercase hidden sm:block">
                        Active 2026
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed mb-6 font-hindi font-medium italic flex gap-3">
                      <span className="text-amber-500 text-2xl leading-none">“</span>
                      <span>
                        हम आपके द्वारा साझा की गई किसी भी व्यक्तिगत जानकारी का सम्मान करते हैं और उसकी सुरक्षा का पूरा ध्यान रखते हैं।
                      </span>
                    </div>

                    {/* Policy clauses list */}
                    <div className="space-y-6">
                      {filteredClauses.filter(c => c.category === "policy").map((clause) => {
                        const IconComponent = clause.icon;
                        return (
                          <div 
                            key={clause.id} 
                            className="group p-5 rounded-xl border border-slate-100 bg-white hover:border-amber-200 hover:shadow-xs transition-all duration-200"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200 shrink-0">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-hindi text-lg font-bold text-slate-900">
                                    {clause.id <= 7 ? `${clause.id}. ` : ""}{clause.title}
                                  </h4>
                                  <span className="text-xs text-slate-400 font-mono">
                                    ({clause.englishTitle})
                                  </span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed font-hindi">
                                  {clause.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {filteredClauses.filter(c => c.category === "policy").length === 0 && (
                        <div className="text-center py-12 text-slate-500 font-hindi">
                          कोई परिणाम नहीं मिला। कृपया कुछ और खोजें।
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: TERMS AND CONDITIONS */}
              {(activeTab === "terms" || searchQuery) && (
                <motion.div
                  key="terms-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 mt-6"
                >
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div>
                        <h3 className="font-hindi text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                          <Scale className="w-6 h-6 text-amber-500" />
                          अतिरिक्त नियम एवं शर्तें (Terms & Conditions)
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">
                          चैनल के क्रय-विक्रय और लेनदेन को सुरक्षित एवं पारदर्शी बनाने हेतु अनिवार्य कानूनी नियम
                        </p>
                      </div>
                      <span className="bg-red-50 text-red-700 text-xs font-mono px-3 py-1 rounded-full uppercase hidden sm:block">
                        Mandatory
                      </span>
                    </div>

                    <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 text-slate-800">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed font-hindi">
                        <strong>महत्वपूर्ण सूचना:</strong> नीचे दिए गए नियम क्रेता (Buyer) और विक्रेता (Seller) दोनों पक्षों पर कानूनी रूप से बाध्यकारी हैं। समझौते को पूरा करने से पहले कृपया इन शर्तों को ध्यान से पढ़ें।
                      </div>
                    </div>

                    {/* Terms rules list */}
                    <div className="space-y-4">
                      {filteredClauses.filter(c => c.category === "terms").map((clause) => {
                        const IconComponent = clause.icon;
                        const originalIndex = clause.id - 7; // Rules are 1 to 6
                        return (
                          <div 
                            key={clause.id} 
                            className="p-5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-all duration-150 flex gap-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0 border border-slate-200 font-bold">
                              {originalIndex}
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-hindi text-base font-bold text-slate-900">
                                  {clause.title}
                                </h4>
                                <span className="text-xs text-slate-400 font-mono">
                                  ({clause.englishTitle})
                                </span>
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed font-hindi">
                                {clause.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {filteredClauses.filter(c => c.category === "terms").length === 0 && (
                        <div className="text-center py-12 text-slate-500 font-hindi">
                          कोई परिणाम नहीं मिला। कृपया कुछ और खोजें।
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: DIGITAL CONTRACT SIGNER */}
              {activeTab === "signer" && !searchQuery && (
                <motion.div
                  key="contract-signer-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-6 h-6 text-amber-500" />
                        <h3 className="font-hindi text-2xl font-bold text-slate-900">
                          डिजिटल अनुबंध हस्ताक्षर निर्माता
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">
                        शर्त संख्या 5 और 6 के अनुपालन हेतु क्रेता और विक्रेता के बीच वैध डिजिटल समझौता पत्र तैयार करें।
                      </p>
                    </div>

                    {!isSigned ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Contract Input Form */}
                        <div className="md:col-span-6 space-y-4">
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">
                            1. अनुबंध विवरण भरें
                          </h4>
                          
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1 font-hindi">
                              विक्रेता का नाम (Seller Name)
                            </label>
                            <input 
                              type="text"
                              value={sellerName}
                              onChange={(e) => setSellerName(e.target.value)}
                              placeholder="विक्रेता का नाम दर्ज करें"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-800 text-sm outline-none"
                              readOnly
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1 font-hindi">
                              खरीदार / क्रेता का नाम (Buyer Name) <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text"
                              value={buyerName}
                              onChange={(e) => setBuyerName(e.target.value)}
                              placeholder="खरीदार का पूरा नाम दर्ज करें"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1 font-hindi">
                              यूट्यूब चैनल का नाम (YouTube Channel Name) <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text"
                              value={channelName}
                              onChange={(e) => setChannelName(e.target.value)}
                              placeholder="जिस चैनल की डील हो रही है उसका नाम"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1 font-hindi">
                              कुल तय राशि (Agreed Deal Amount) <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text"
                              value={dealAmount}
                              onChange={(e) => setDealAmount(e.target.value)}
                              placeholder="जैसे: ₹50,000 / $600"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1 font-hindi">
                              समझौता तिथि (Agreement Date)
                            </label>
                            <input 
                              type="date"
                              value={contractDate}
                              onChange={(e) => setContractDate(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none"
                            />
                          </div>
                        </div>

                        {/* Interactive Signature Canvas */}
                        <div className="md:col-span-6 space-y-4">
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">
                            2. खरीदार के हस्ताक्षर (Draw Signature)
                          </h4>

                          <p className="text-xs text-slate-500 font-hindi">
                            कृप्या नीचे दिए गए सफ़ेद बॉक्स में माउस या मोबाइल स्क्रीन पर उंगली की मदद से अपने हस्ताक्षर अंकित करें:
                          </p>

                          <div className="border border-dashed border-slate-300 rounded-xl p-2 bg-slate-50/50">
                            <canvas
                              ref={canvasRef}
                              width={320}
                              height={180}
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                              onTouchStart={startDrawing}
                              onTouchMove={draw}
                              onTouchEnd={stopDrawing}
                              className="w-full h-[180px] bg-white border border-slate-200 rounded-lg cursor-crosshair touch-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={clearCanvas}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                            >
                              साफ़ करें (Clear)
                            </button>
                            <button
                              type="button"
                              onClick={saveSignature}
                              disabled={!buyerName || !channelName || !dealAmount}
                              className={`ml-auto px-4 py-2 text-xs font-medium rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer ${
                                buyerName && channelName && dealAmount
                                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              हस्ताक्षर सहेजें (Apply)
                            </button>
                          </div>
                          
                          {(!buyerName || !channelName || !dealAmount) && (
                            <p className="text-[11px] text-amber-600 font-hindi italic">
                              * ध्यान दें: हस्ताक्षर सहेजने से पहले बाएं हाथ के सभी फ़ील्ड भरना आवश्यक है।
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      
                      /* Generated Official Agreement Print Card */
                      <div className="space-y-6">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-xl flex items-center gap-3 text-sm font-hindi">
                          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>
                            बधाई हो! समझौता पत्र सफलतापूर्वक तैयार हो गया है। इसे प्रिंट करने के लिए आप ऊपर दाहिने कोने में बने <strong>'प्रिंट करें'</strong> बटन का उपयोग कर सकते हैं।
                          </span>
                        </div>

                        {/* Contract Layout */}
                        <div className="border-4 border-double border-slate-300 p-6 sm:p-10 rounded-xl bg-white shadow-sm print-card max-w-2xl mx-auto">
                          
                          {/* Formal Header */}
                          <div className="text-center space-y-2 pb-6 border-b-2 border-slate-200">
                            <h2 className="text-xl sm:text-2xl font-bold font-hindi uppercase tracking-wider text-slate-900">
                              यूट्यूब चैनल हस्तांतरण एवं क्रय-विक्रय समझौता पत्र
                            </h2>
                            <p className="text-xs text-slate-500 font-mono">
                              REGISTRATION NO: GT-AGREEMENT-{contractDate.replace(/-/g, "")}
                            </p>
                            <div className="text-xs text-slate-600 font-hindi">
                              समझौता तिथि: <strong>{new Date(contractDate).toLocaleDateString("hi-IN", { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                            </div>
                          </div>

                          {/* Parties Segment */}
                          <div className="py-6 space-y-4">
                            <p className="text-sm text-slate-800 leading-relaxed font-hindi">
                              यह समझौता आज दिनांक <strong>{new Date(contractDate).toLocaleDateString("hi-IN")}</strong> को निम्नलिखित पक्षों के बीच आपसी सहमति से संपन्न हुआ है:
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm font-hindi">
                              <div>
                                <span className="text-xs text-slate-400 font-semibold block uppercase">विक्रेता (First Party / Seller):</span>
                                <strong className="text-slate-900">{sellerName}</strong>
                              </div>
                              <div>
                                <span className="text-xs text-slate-400 font-semibold block uppercase">क्रेता (Second Party / Buyer):</span>
                                <strong className="text-slate-900">{buyerName}</strong>
                              </div>
                            </div>

                            <p className="text-sm text-slate-800 leading-relaxed font-hindi">
                              दोनों पक्ष निम्नलिखित यूट्यूब संपत्ति (YouTube Channel Asset) के हस्तांतरण हेतु सहमत हुए हैं:
                            </p>

                            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-200/50 text-sm font-hindi space-y-1">
                              <div>यूट्यूब चैनल: <strong>{channelName}</strong></div>
                              <div>तय राशि (Agreed Deal Value): <strong>{dealAmount}</strong></div>
                            </div>
                          </div>

                          {/* Agreement Clauses (Direct representation of terms) */}
                          <div className="border-t border-slate-200 pt-6 space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-hindi">
                              अनिवार्य समझौते की शर्तें (Mandatory Clauses)
                            </h4>
                            
                            <ul className="space-y-3.5 text-xs text-slate-700 leading-relaxed font-hindi list-decimal pl-4">
                              <li>
                                यदि खरीदार द्वारा तय समय पर शेष भुगतान नहीं किया जाता है, तो पहले से किया गया अग्रिम भुगतान किसी भी स्थिति में वापस नहीं किया जाएगा तथा चैनल का स्वामित्व विक्रेता (<strong>{sellerName}</strong>) के पास रहेगा या वापस ले लिया जाएगा।
                              </li>
                              <li>
                                यदि खरीदार (<strong>{buyerName}</strong>) द्वारा आंशिक भुगतान करने के बाद चैनल खरीदने से मना किया जाता है या चैनल पसंद नहीं आता है, तो भुगतान वापसी और चैनल हस्तांतरण का निर्णय दोनों पक्षों की आपसी सहमति के अनुसार किया जाएगा।
                              </li>
                              <li>
                                यदि किसी भी पक्ष द्वारा लगातार 7 दिनों तक कोई प्रतिक्रिया, संपर्क या उत्तर नहीं दिया जाता है, तो उसके बाद दूसरे पक्ष की कोई जिम्मेदारी नहीं होगी तथा अनुबंध अमान्य मान लिया जाएगा।
                              </li>
                              <li>
                                चैनल खरीदने या बेचने वाले सभी पक्ष इस समझौते में लिखी गई सभी शर्तों को स्वीकार करेंगे और उनका पूर्णतः पालन करेंगे।
                              </li>
                              <li>
                                इस समझौते पर दोनों पक्षों के हस्ताक्षर होने के बाद ही इसे वैध माना जाएगा। यदि इस समझौते पर संबंधित पक्षों के हस्ताक्षर नहीं हैं, तो यह समझौता अमान्य और अवैध माना जाएगा।
                              </li>
                            </ul>
                          </div>

                          {/* Signatures Row */}
                          <div className="border-t-2 border-slate-200 mt-8 pt-8 grid grid-cols-2 gap-8 text-center font-hindi text-sm">
                            <div className="space-y-2">
                              <span className="text-xs text-slate-400 block font-semibold uppercase">विक्रेता के हस्ताक्षर (Seller Sign)</span>
                              <div className="h-16 flex items-center justify-center font-serif text-slate-800 text-lg italic select-none">
                                Gautam Tiwari
                              </div>
                              <div className="border-t border-slate-300 pt-1 text-xs text-slate-600 font-semibold">
                                {sellerName}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-xs text-slate-400 block font-semibold uppercase">क्रेता के हस्ताक्षर (Buyer Sign)</span>
                              <div className="h-16 flex items-center justify-center">
                                {buyerSignatureData ? (
                                  <img 
                                    src={buyerSignatureData} 
                                    alt="Buyer Signature" 
                                    className="max-h-16 object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <span className="text-xs text-slate-400 italic">हस्ताक्षर नहीं मिले</span>
                                )}
                              </div>
                              <div className="border-t border-slate-300 pt-1 text-xs text-slate-600 font-semibold">
                                {buyerName}
                              </div>
                            </div>
                          </div>

                          {/* Footer Stamp */}
                          <div className="mt-10 pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center font-mono uppercase tracking-wider">
                            VALIDATED VIA GAUTAM TIWARI PLATFORM PRESETS • SECURE DIGITAL CONTRACT
                          </div>
                        </div>

                        {/* Control buttons in sign mode */}
                        <div className="flex gap-2 max-w-2xl mx-auto no-print">
                          <button
                            onClick={resetSigner}
                            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            नया अनुबंध बनाएँ (Reset)
                          </button>
                          
                          <button
                            onClick={handlePrint}
                            className="ml-auto px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-4 h-4" />
                            प्रिंट या PDF में सहेजें (Print / Save as PDF)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: HELP AND CONTACT */}
              {activeTab === "contact" && !searchQuery && (
                <motion.div
                  key="contact-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-6 h-6 text-amber-500" />
                        <h3 className="font-hindi text-2xl font-bold text-slate-900">
                          सहायता एवं फीडबैक केंद्र
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">
                        यदि आपके पास गोपनीयता नीति या नियमों से संबंधित कोई प्रश्न या सुझाव है, तो सीधे संदेश भेजें।
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      
                      {/* Interactive Feedback Form */}
                      <form onSubmit={handleSupportSubmit} className="md:col-span-7 space-y-4 font-hindi text-sm">
                        
                        {showSupportSuccess && (
                          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs flex gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>संदेश सफलतापूर्वक सहेज लिया गया है! गौतम तिवारी की टीम जल्द ही आपसे संपर्क करेगी।</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">आपका नाम (Your Name)</label>
                            <input 
                              type="text"
                              required
                              value={supportName}
                              onChange={(e) => setSupportName(e.target.value)}
                              placeholder="नाम दर्ज करें"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ईमेल पता (Email Address)</label>
                            <input 
                              type="email"
                              required
                              value={supportEmail}
                              onChange={(e) => setSupportEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">आपका संदेश / प्रश्न (Message)</label>
                          <textarea 
                            rows={4}
                            required
                            value={supportMsg}
                            onChange={(e) => setSupportMsg(e.target.value)}
                            placeholder="अपना प्रश्न या सुझाव यहाँ लिखें..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          सन्देश भेजें
                        </button>
                      </form>

                      {/* Contact Info Deck */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-4">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-hindi">
                            आधिकारिक संपर्क विवरण
                          </h4>

                          <div className="flex items-start gap-3 text-slate-600 text-xs">
                            <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-slate-800">आधिकारिक ईमेल (Email)</p>
                              <a href="mailto:vikajaat227@gmail.com" className="hover:underline text-amber-700">
                                vikajaat227@gmail.com
                              </a>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 text-slate-600 text-xs">
                            <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-slate-800">प्रतिक्रिया समय (Response Time)</p>
                              <p>सामान्यता 24 से 48 घंटे के भीतर</p>
                            </div>
                          </div>
                        </div>

                        {/* Instructions card */}
                        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/50 text-xs text-amber-900 leading-relaxed font-hindi">
                          <strong>सूचना:</strong> समझौते पर हस्ताक्षर करने से पहले दोनों पक्षों द्वारा ईमेल के माध्यम से शर्तों को सत्यापित करने की सलाह दी जाती है।
                        </div>
                      </div>
                    </div>

                    {/* Local message history */}
                    {queriesList.length > 0 && (
                      <div className="border-t border-slate-100 mt-8 pt-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-800 font-hindi">
                            मेरा संदेश इतिहास (My Queries History)
                          </h4>
                          <button 
                            onClick={handleClearQueries}
                            className="text-red-600 text-xs hover:underline cursor-pointer"
                          >
                            इतिहास साफ़ करें (Clear History)
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {queriesList.map((q) => (
                            <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 relative">
                              <span className="absolute top-3 right-3 bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-sm font-mono text-[9px] font-bold">
                                {q.id}
                              </span>
                              <div className="font-hindi">नाम: <strong>{q.name}</strong></div>
                              <div className="font-mono text-slate-500">ईमेल: {q.email}</div>
                              <p className="text-slate-600 italic font-hindi">"{q.message}"</p>
                              <div className="text-[10px] text-slate-400 text-right">{q.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer Details - Custom and Editorial */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-10 text-center text-slate-500 text-xs no-print">
        <div className="max-w-4xl mx-auto px-4 space-y-3 font-hindi">
          <p className="font-medium text-slate-800">
            © 2026 Powered by <span className="text-amber-600 font-bold">Gautam Tiwari</span>. सर्वाधिकार सुरक्षित।
          </p>
          <p className="max-w-xl mx-auto leading-relaxed text-slate-400 text-[11px]">
            अस्वीकरण (Disclaimer): यह वेबसाइट पूरी तरह से सुरक्षित रूप से डेटा का निस्तारण करती है। आपका डेटा स्थानीय रूप से केवल आपके डिवाइस (LocalStorage) में ही सहेजा जाता है और किसी बाहरी सर्वर पर नहीं भेजा जाता।
          </p>
        </div>
      </footer>
    </div>
  );
}
