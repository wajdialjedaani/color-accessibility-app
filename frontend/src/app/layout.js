import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import MainMenu from './components/Navigation';

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body>
         <MainMenu />
         <main>
            {children}
         </main>
      </body>
   </html>
  );
}