export default function Footer() {
  const year: number = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#222',
      color: '#fff',
      textAlign: 'center',
      padding: '20px 0'
    }}>
      <p>&copy; {year} MyWebsite. All rights reserved.</p>
      <p>
        <a href="/about" style={{ color: '#ddd', margin: '0 10px' }}>About</a> | 
        <a href="/contact" style={{ color: '#ddd', margin: '0 10px' }}>Contact</a> | 
        <a href="/privacy" style={{ color: '#ddd', margin: '0 10px' }}>Privacy Policy</a>
      </p>
    </footer>
  );
}
