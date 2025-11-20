import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dịch vụ - IIPMap.AI",
};

const DichVuPage = () => {
   return (
      <Wrapper>
         <div style={{ 
            minHeight: 'calc(100vh - 260px)', 
            paddingTop: '100px',
            padding: '100px 20px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <h1 style={{ 
               fontFamily: 'Montserrat, sans-serif',
               fontSize: '40px',
               fontWeight: 800,
               color: '#0051CB'
            }}>
               Dịch vụ - Coming Soon
            </h1>
         </div>
      </Wrapper>
   )
}

export default DichVuPage
