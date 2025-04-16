const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Get in Touch</h2>
        <p className="text-center text-text/70 mb-12">
          Have a question or want to work together?
        </p>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-accent text-white font-medium py-3 rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;