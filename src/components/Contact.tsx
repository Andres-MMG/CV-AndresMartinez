import React, { useState } from 'react';
import { Mail, MapPin, Phone, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useResumeData } from '../hooks/useResumeData';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { resume } = useResumeData();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Obtenemos los datos de contacto del resume
  const contactInfo = {
    email: resume.basics?.email || 'andres@inteliai.cl',
    phone: resume.basics?.phone || '+56 9 55155418',
    location: resume.basics?.location?.city 
      ? `${resume.basics?.location?.city}, ${resume.basics?.location?.countryCode}`
      : 'Santiago, Chile'
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.validation.phoneRequired');
      isValid = false;
    } else if (!/^\+?[0-9\s()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = t('contact.validation.phoneInvalid');
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.validation.subjectRequired');
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

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
        // Determinar la página de éxito según el idioma actual
        const successPages: Record<string, string> = {
          'en': '/contact-success-en.html',
          'es': '/contact-success.html',
          'pt-BR': '/contact-success-pt.html'
        };
        
        // Obtener el idioma actual, la hook no puede usarse aquí directamente porque
        // sólo puede usarse en el nivel superior de los componentes funcionales
        const currentLocale = localStorage.getItem('locale') || 'es';
        const successPage = successPages[currentLocale] || '/contact-success.html';
        
        // Redirigir a la página de éxito
        window.location.href = successPage;
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/50 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" data-aos="fade-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {t('contact.title')}
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6" data-aos="fade-right" data-aos-delay="100">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              {t('contact.letsTalk')}
            </h3>
            <p className="text-gray-300 mb-8">
              {t('contact.description')}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{t('contact.phone')}</h4>
                  <p className="text-gray-200">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{t('contact.email')}</h4>
                  <p className="text-gray-200">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{t('contact.location')}</h4>
                  <p className="text-gray-200">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3" data-aos="fade-left" data-aos-delay="200">
            <form 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {t('contact.formTitle')}
              </h3>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.phonePlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.subjectLabel')}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subjectPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.subject ? 'border-red-500' : 'border-gray-600'
                  } focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  } focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400 resize-none`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  t('contact.submit')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-900/90 text-white p-4 rounded-lg shadow-lg flex items-center animate-fade-in border border-green-700 z-50 max-w-md">
          <CheckCircle2 className="text-green-400 w-6 h-6 mr-3 flex-shrink-0" />
          <p>{t('contact.success')}</p>
        </div>
      )}

      {/* Error Message */}
      {showError && (
        <div className="fixed bottom-8 right-8 bg-red-900/90 text-white p-4 rounded-lg shadow-lg flex items-center animate-fade-in border border-red-700 z-50 max-w-md">
          <AlertCircle className="text-red-400 w-6 h-6 mr-3 flex-shrink-0" />
          <p>{t('contact.error')}</p>
        </div>
      )}
    </section>
  );
};