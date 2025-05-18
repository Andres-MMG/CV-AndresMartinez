import React, { useState } from 'react';
import { Mail, MapPin, Phone, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es obligatorio';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Limpiar error del campo cuando el usuario está escribiendo
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://n8n.mylai.cl/webhook/validateAIform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'XI-AI-API-KEY': '9b680126-c023-4b1b-9bbf-e3477f726436'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('¡Mensaje enviado exitosamente! Me pondré en contacto pronto.');
        // Limpiar formulario después de envío exitoso
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        setStatusMessage(errorData.message || 'Hubo un problema al enviar el mensaje. Intenta nuevamente.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Error de conexión. Por favor verifica tu conexión e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Contacto
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              ¿Hablamos?
            </h3>
            <p className="text-gray-300 mb-8">
              Si estás interesado en colaborar en un proyecto, tienes alguna pregunta o simplemente quieres charlar sobre tecnología, no dudes en contactarme.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Teléfono</h4>
                  <p className="text-gray-200">+56 9 55155418</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Email</h4>
                  <p className="text-gray-200">andres@inteliai.cl</p>
                  <p className="text-gray-200">andres@mylai.cl</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Ubicación</h4>
                  <p className="text-gray-200">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            {submitStatus === 'success' && (
              <div className="p-4 mb-6 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <p className="text-green-300">{statusMessage}</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 mb-6 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                <p className="text-red-300">{statusMessage}</p>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/30'} text-white placeholder-gray-400`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/30'} text-white placeholder-gray-400`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Teléfono <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+56 9 12345678"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/30'} text-white placeholder-gray-400`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Asunto <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Asunto del mensaje"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/30'} text-white placeholder-gray-400`}
                />
                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Mensaje <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tu mensaje"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500/30'} text-white placeholder-gray-400 resize-none`}
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};