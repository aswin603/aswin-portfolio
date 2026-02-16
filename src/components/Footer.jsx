import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} Aswin K B. Built with React.
        </p>
      </div>
    </footer>
  );
}
