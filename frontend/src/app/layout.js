import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import MainMenu from './components/Navigation';

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <MainMenu />
      <main>
         {children}
      </main>
   </html>
  );
}