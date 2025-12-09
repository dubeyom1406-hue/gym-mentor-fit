import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-secondary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have questions? Ready to start your transformation? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Phone</h3>
                                <p className="text-gray-400">+91 9931426338, +91 6287347004</p>
                                <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Email</h3>
                                <p className="text-gray-400">loading soon</p>
                                <p className="text-gray-500 text-sm">Online support 24/7</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Location</h3>
                                <p className="text-gray-400">Ara,bihar</p>
                                <p className="text-gray-500 text-sm">India</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-black/50 p-8 rounded-2xl border border-white/10"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const name = formData.get('firstName') + ' ' + formData.get('lastName');
                            const email = formData.get('email');
                            const message = formData.get('message');

                            const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
                            window.open(`https://wa.me/916287347004?text=${whatsappMessage}`, '_blank');
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">First Name</label>
                                <input name="firstName" type="text" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John" required />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                                <input name="lastName" type="text" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm mb-2">Email</label>
                            <input name="email" type="email" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm mb-2">Message</label>
                            <textarea name="message" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-32" placeholder="How can we help you?" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
                            <span>Send Message</span>
                            <Send className="h-4 w-4" />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
