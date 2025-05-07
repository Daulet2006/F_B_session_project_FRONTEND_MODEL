// src/components/layout/Footer.js
const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Zoo Store</h3>
            <p className="text-emerald-200">
              Your one-stop shop for all pet and zoo-related products. We offer a wide range of animals, food,
              accessories, and more.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-emerald-200 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/pets" className="text-emerald-200 hover:text-white">
                  Pets
                </a>
              </li>
              <li>
                <a href="/login" className="text-emerald-200 hover:text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-emerald-200 hover:text-white">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-emerald-200">
              123 Zoo Lane
              <br />
              Animal City, AC 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@zoostore.com
            </address>
          </div>
        </div>
        <div className="border-t border-emerald-600 mt-6 pt-6 text-center text-emerald-200">
          <p>&copy; {new Date().getFullYear()} Zoo Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
