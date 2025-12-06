// ============================================
// IMPORTS
// ============================================
import Wrapper from "@/layouts/Wrapper";
import ZonesRedirectClient from "./ZonesRedirectClient";

// ============================================
// PAGE: ZonesPageRoot (server)
// ============================================
export default function ZonesPageRoot() {
  return (
    <Wrapper>
      <ZonesRedirectClient />
    </Wrapper>
  );
}
