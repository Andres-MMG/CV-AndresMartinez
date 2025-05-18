import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/50">
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
                  <p className="text-gray-200">+56 9 55155418</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{t('contact.email')}</h4>
                  <p className="text-gray-200">andres@inteliai.cl</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">{t('contact.location')}</h4>
                  <p className="text-gray-200">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3" data-aos="fade-left" data-aos-delay="200">
            <form className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
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
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.subjectLabel')}
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder={t('contact.subjectPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:translate-y-[-2px]"
              >
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};