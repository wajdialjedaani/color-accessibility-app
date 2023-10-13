import 'bootstrap/dist/css/bootstrap.css';
import './globals.css'

export default function RootLayout({children}) {
    return <html>
       <head />
       <body>
          {children}
       </body>
    </html>
}