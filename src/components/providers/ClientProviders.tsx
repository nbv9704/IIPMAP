// ============================================
// CLIENT PROVIDERS
// Wraps Redux and Language Context for client-side state
// ============================================
'use client'

import { Provider } from "react-redux";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { store } from "@/redux/store";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </Provider>
  );
}
