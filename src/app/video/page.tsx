import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Video - IIPMap.AI",
};

const VideoPage = () => {
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
               Video - Coming Soon
            </h1>
         </div>
      </Wrapper>
   )
}

export default VideoPage
