import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Asunto del mensaje"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tu mensaje"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 text-white placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-blue-500/25"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};