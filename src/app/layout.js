import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import MainMenu from './components/Navigation';
// import Chat from './components/Chat';

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body>
         <MainMenu />
         <main>
            {children}
         </main>
         {/* <Chat /> */}
      </body>
   </html>
  );
}