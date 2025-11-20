import Wrapper from "@/layouts/Wrapper";
import NewsArea from "@/components/news/NewsArea";

export const metadata = {
   title: "Tin tức - IIPMap.AI",
};

const NewsPage = () => {
   return (
      <Wrapper>
         <NewsArea />
      </Wrapper>
   )
}

export default NewsPage
