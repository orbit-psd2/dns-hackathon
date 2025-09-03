const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-brand transition-transform hover:scale-105 duration-200 pr-1">Dreamnity</span>
            </a>
            <p className="mt-2 text-sm text-gray-100 max-w-xs">
              Where dreams unite. We'll handle the invoicing, with live FX rates.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-100 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms-&-services" className="text-sm text-gray-100 hover:text-brand transition-colors duration-200 hover:translate-x-1 inline-block">
                  Terms & Services
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-sm text-gray-100 hover:text-brand transition-colors duration-200 hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-sm text-gray-100 hover:text-brand transition-colors duration-200 hover:translate-x-1 inline-block">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-100 hover:text-brand transition-colors duration-200 hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-100 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.dreamnity.in"
                  className="text-sm text-gray-100 hover:text-brand transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Discord Server
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-100 text-center">
            © {currentYear} Dreamnity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
