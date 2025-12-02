// ============================================
// CLIENT PROVIDERS
// Wraps Redux and Language Context for client-side state
// ============================================
'use client'

import { Provider } from "react-redux";
import store from "@/redux/store";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <LanguageProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </LanguageProvider>
  );
}
