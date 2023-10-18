import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import NavBar from './components/Navigation';

export default function RootLayout({ children }) {
  return (
   <html>
      <NavBar />
      <main>
         {children}
      </main>
   </html>
  );
}
