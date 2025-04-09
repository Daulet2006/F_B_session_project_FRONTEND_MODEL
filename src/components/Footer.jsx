const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-8 text-center">
      <div className="container mx-auto">
        <p className="text-lg mb-2">&copy; {new Date().getFullYear()} ZooStore. All rights reserved.</p>
        <p className="text-sm mb-4">
          Your go-to place for everything pet-related.
        </p>
        <p>
          Visit us at{" "}
          <a
            href="https://www.zoostore.com"
            className="text-green-400 hover:text-green-600 transition duration-300"
          >
            www.zoostore.com
          </a>
        </p>
        <div className="mt-4">
          <a
            href="https://www.instagram.com/zoostore"
            className="text-white hover:text-gray-400 mx-2 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://www.facebook.com/zoostore"
            className="text-white hover:text-gray-400 mx-2 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
