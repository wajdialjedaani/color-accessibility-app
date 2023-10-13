'use client'

import MainMenu from "./components/MainMenu";
import { SSRProvider } from "react-bootstrap";

export default function Page() {
  return (
    <SSRProvider>

      <MainMenu />
      
    </SSRProvider>
     );
}