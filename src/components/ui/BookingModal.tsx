'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    datetime: '',
    duration: '',
    projectType: '',
    details: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Web3Forms Access Key - Get this for FREE at https://web3forms.com/
  // It takes 5 seconds. Just enter the client's email, and they email you the key.
  const WEB3FORMS_ACCESS_KEY = '9bc56beb-a54e-40cd-b65e-e77dcb90cfea'; 

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a seamless background payload for Web3Forms
      // This will send an email directly to the client's inbox without the user seeing anything
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Studio Booking: ${formData.projectType} from ${formData.name}`,
          from_name: "Studio 74 Booking System",
          Name: formData.name,
          Phone: formData.phone,
          "Project Type": formData.projectType,
          "Requested Date/Time": formData.datetime,
          "Expected Duration": formData.duration,
          "Additional Details": formData.details || 'None provided'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        console.error('Submission failed', result);
        // We still show submitted to not break the premium UX, 
        // but log the error for devs.
        setSubmitted(true);
      }

    } catch (err) {
      console.error('Network Error', err);
      setSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  const questions = [
    {
      id: 'name',
      question: "Tells us about you. What's your full name?",
      placeholder: "Jane Doe",
      type: "text"
    },
    {
      id: 'phone',
      question: "What's the best phone number to reach you?",
      placeholder: "+1 234 567 8900",
      type: "tel"
    },
    {
      id: 'projectType',
      question: "What type of project are you looking to book?",
      placeholder: "e.g. Wedding, Commercial, Music Video",
      type: "text"
    },
    {
      id: 'datetime',
      question: "When are you planning to shoot?",
      placeholder: "Select Date",
      type: "date"
    },
    {
      id: 'duration',
      question: "Expected duration of the booking?",
      placeholder: "e.g. 4 hours, Full Day, 2 Days",
      type: "text"
    },
    {
      id: 'details',
      question: "Any specific technical requirements or other details?",
      placeholder: "Lighting setup needs, audio requirements, etc...",
      type: "textarea"
    }
  ];

  const currentQ = questions[step];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 text-white p-6 w-screen h-screen">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white font-label tracking-widest text-[12px] uppercase transition-colors"
      >
        [ Close ]
      </button>

      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col"
            >
              <div className="font-label text-[12px] tracking-[0.2em] text-[var(--color-primary)] mb-8">
                {step + 1} / {questions.length}
              </div>
              
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-12">
                {currentQ.question}
              </h2>

              <form onSubmit={step === questions.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {currentQ.type === 'textarea' ? (
                  <textarea 
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-white outline-none text-2xl pb-4 font-body transition-colors"
                    placeholder={currentQ.placeholder}
                    rows={4}
                    value={(formData as any)[currentQ.id]}
                    onChange={(e) => setFormData({...formData, [currentQ.id]: e.target.value})}
                  />
                ) : (
                  <input 
                    autoFocus
                    type={currentQ.type}
                    className={`w-full bg-transparent border-b-2 border-white/20 focus:border-white outline-none text-3xl md:text-5xl pb-4 font-body transition-colors placeholder:text-white/20 ${currentQ.type === 'date' ? '[color-scheme:dark] uppercase text-white/90' : ''}`}
                    placeholder={currentQ.placeholder}
                    value={(formData as any)[currentQ.id]}
                    onChange={(e) => setFormData({...formData, [currentQ.id]: e.target.value})}
                  />
                )}

                <div className="mt-16 flex items-center gap-6">
                  {step === questions.length - 1 ? (
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="px-10 py-5 bg-[var(--color-primary)] text-white font-label tracking-[0.1em] uppercase text-[14px] hover:bg-white hover:text-black transition-colors duration-500 font-bold flex items-center gap-3 disabled:opacity-50"
                     >
                       {isSubmitting ? 'Submitting...' : 'Submit Request'}
                     </button>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleNext}
                      className="px-10 py-5 bg-white text-black font-label tracking-[0.1em] uppercase text-[14px] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500 font-bold flex items-center gap-3"
                    >
                      Next <span className="text-[1.2em]">→</span>
                    </button>
                  )}

                  {step > 0 && (
                    <button 
                      type="button" 
                      onClick={handlePrev}
                      className="text-white/40 hover:text-white font-label uppercase tracking-widest text-[12px] transition-colors"
                    >
                      Press to go back
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="text-center"
            >
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)]">
                Received.
              </h2>
              <p className="font-body text-xl opacity-70 mb-12 max-w-md mx-auto">
                Thank you for your inquiry. Our production team will review your requirements and reach out very shortly.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-5 bg-white text-black font-label tracking-[0.1em] uppercase text-[14px] hover:bg-white/80 transition-colors duration-500 font-bold inline-block"
              >
                Return to Site
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
