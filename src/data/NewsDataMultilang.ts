import { LanguageCode } from "@/hooks/useLanguage";

interface NewsItemTranslation {
  category: string;
  title: string;
  excerpt?: string;
  content?: string[];
}

interface NewsItemMultilang {
  id: number;
  date: string;
  image: string;
  images?: string[];
  likes?: number;
  comments?: number;
  translations: {
    [key in LanguageCode]: NewsItemTranslation;
  };
}

// Base news data
const base_news_data: NewsItemMultilang[] = [
  {
    id: 1,
    date: "14/11/2025",
    image: "/assets/images/listing/img_01.jpg",
    images: ["/assets/images/listing/img_01.jpg", "/assets/images/listing/img_01.jpg"],
    likes: 18,
    comments: 5,
    translations: {
      vi: {
        category: "Tin thị trường",
        title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
        excerpt: "UBND tỉnh Bà Rịa - Vũng Tàu vừa có quyết định chấp thuận chủ trương đầu tư dự án Khu công nghiệp Vạn Thương với quy mô 500ha, tổng vốn đầu tư dự kiến 5.000 tỷ đồng...",
        content: [
          "Dự án Khu công nghiệp Vạn Thương được triển khai tại huyện Xuyên Mộc với diện tích 500ha, tập trung phát triển các ngành công nghiệp hỗ trợ, công nghệ cao và logistics. Tổng vốn đầu tư dự kiến khoảng 5.000 tỷ đồng, trong đó vốn đầu tư hạ tầng kỹ thuật khoảng 2.500 tỷ đồng.",
          "Theo quy hoạch, KCN Vạn Thương sẽ được chia thành các phân khu chức năng rõ ràng: khu sản xuất công nghiệp, khu dịch vụ logistics, khu nhà ở công nhân và các tiện ích phục vụ. Dự án hướng đến mục tiêu phát triển bền vững, ứng dụng công nghệ xanh và thân thiện với môi trường.",
          "UBND tỉnh yêu cầu nhà đầu tư phải hoàn thành các thủ tục pháp lý, đánh giá tác động môi trường và bồi thường giải phóng mặt bằng theo đúng quy định. Dự kiến dự án sẽ khởi công vào quý II/2026 và hoàn thành giai đoạn 1 vào năm 2028.",
          "Khi đi vào hoạt động, KCN Vạn Thương dự kiến thu hút khoảng 100-150 doanh nghiệp, tạo việc làm cho hơn 30.000 lao động, đóng góp quan trọng vào phát triển kinh tế - xã hội của tỉnh Bà Rịa - Vũng Tàu."
        ]
      },
      en: {
        category: "Market News",
        title: "Ba Ria - Vung Tau: Approval of investment policy for Van Thuong Industrial Park project",
        excerpt: "Ba Ria - Vung Tau Provincial People's Committee has approved the investment policy for Van Thuong Industrial Park project with a scale of 500ha and total investment of 5,000 billion VND...",
        content: [
          "Van Thuong Industrial Park project is implemented in Xuyen Moc district with an area of 500ha, focusing on developing supporting industries, high technology and logistics. Total investment is estimated at about 5,000 billion VND, of which technical infrastructure investment is about 2,500 billion VND.",
          "According to the plan, Van Thuong IP will be divided into clear functional zones: industrial production area, logistics service area, workers' housing area and service facilities. The project aims for sustainable development, applying green technology and environmental friendliness.",
          "The Provincial People's Committee requires investors to complete legal procedures, environmental impact assessment and compensation for site clearance in accordance with regulations. The project is expected to start construction in Q2/2026 and complete phase 1 in 2028.",
          "When operational, Van Thuong IP is expected to attract about 100-150 enterprises, create jobs for more than 30,000 workers, making important contributions to the socio-economic development of Ba Ria - Vung Tau province."
        ]
      },
      ja: {
        category: "市場ニュース",
        title: "バリア・ブンタウ：ヴァントゥオン工業団地プロジェクトの投資方針承認",
        excerpt: "バリア・ブンタウ省人民委員会は、500haの規模と5兆VNDの総投資額を持つヴァントゥオン工業団地プロジェクトの投資方針を承認しました...",
        content: [
          "ヴァントゥオン工業団地プロジェクトは、スエンモック地区で500haの面積で実施され、支援産業、ハイテク、ロジスティクスの発展に焦点を当てています。総投資額は約5兆VNDと推定され、そのうち技術インフラ投資は約2.5兆VNDです。",
          "計画によると、ヴァントゥオンIPは明確な機能ゾーンに分割されます：工業生産エリア、ロジスティクスサービスエリア、労働者住宅エリア、サービス施設。プロジェクトは持続可能な開発を目指し、グリーンテクノロジーと環境への配慮を適用します。",
          "省人民委員会は、投資家に法的手続き、環境影響評価、規制に従った用地補償を完了するよう要求しています。プロジェクトは2026年第2四半期に着工し、2028年にフェーズ1を完了する予定です。",
          "運用開始時、ヴァントゥオンIPは約100〜150の企業を誘致し、30,000人以上の労働者に雇用を創出し、バリア・ブンタウ省の社会経済発展に重要な貢献をすることが期待されています。"
        ]
      },
      ko: {
        category: "시장 뉴스",
        title: "바리아 - 붕따우: 반투옹 산업단지 프로젝트 투자 정책 승인",
        excerpt: "바리아 - 붕따우성 인민위원회는 500ha 규모와 5조 VND의 총 투자액을 가진 반투옹 산업단지 프로젝트의 투자 정책을 승인했습니다...",
        content: [
          "반투옹 산업단지 프로젝트는 수옌목 지구에서 500ha의 면적으로 시행되며, 지원 산업, 첨단 기술 및 물류 개발에 중점을 둡니다. 총 투자액은 약 5조 VND로 추정되며, 그 중 기술 인프라 투자는 약 2.5조 VND입니다.",
          "계획에 따르면, 반투옹 IP는 명확한 기능 구역으로 나뉩니다: 산업 생산 지역, 물류 서비스 지역, 근로자 주택 지역 및 서비스 시설. 프로젝트는 지속 가능한 개발을 목표로 하며, 녹색 기술과 환경 친화성을 적용합니다.",
          "성 인민위원회는 투자자에게 법적 절차, 환경 영향 평가 및 규정에 따른 부지 보상을 완료하도록 요구합니다. 프로젝트는 2026년 2분기에 착공하여 2028년에 1단계를 완료할 예정입니다.",
          "운영 시작 시, 반투옹 IP는 약 100-150개의 기업을 유치하고 30,000명 이상의 근로자에게 일자리를 창출하여 바리아 - 붕따우성의 사회 경제 발전에 중요한 기여를 할 것으로 예상됩니다."
        ]
      },
      zh: {
        category: "市场新闻",
        title: "巴地头顿：批准万商工业园项目投资政策",
        excerpt: "巴地头顿省人民委员会已批准万商工业园项目的投资政策，规模为500公顷，总投资额为5万亿越南盾...",
        content: [
          "万商工业园项目在春木县实施，面积500公顷，重点发展配套产业、高科技和物流。总投资额估计约为5万亿越南盾，其中技术基础设施投资约为2.5万亿越南盾。",
          "根据规划，万商IP将划分为明确的功能区：工业生产区、物流服务区、工人住房区和服务设施。该项目旨在实现可持续发展，应用绿色技术和环境友好。",
          "省人民委员会要求投资者完成法律程序、环境影响评估和按规定进行场地补偿。该项目预计将于2026年第二季度开工，并于2028年完成第一阶段。",
          "运营时，万商IP预计将吸引约100-150家企业，为超过30,000名工人创造就业机会，为巴地头顿省的社会经济发展做出重要贡献。"
        ]
      }
    }
  },
  {
    id: 2,
    date: "14/11/2025",
    image: "/assets/images/listing/img_02.jpg",
    images: ["/assets/images/listing/img_02.jpg", "/assets/images/listing/img_02.jpg"],
    likes: 24,
    comments: 3,
    translations: {
      vi: {
        category: "Tin thị trường",
        title: "Nam Định: Chấp thuận chủ trương đầu tư khu công nghiệp Hải Long giai đoạn 1",
        excerpt: "Ngày 6/3/2025, UBND tỉnh Nam Định đã chính thức phê duyệt chủ trương đầu tư và lựa chọn nhà đầu tư thực hiện dự án Khu công nghiệp (KCN) Hải Long giai đoạn 1...",
        content: [
          "Dự án do Công ty Cổ phần Phát triển đô thị và KCN Việt Nam Singapore (VSIP) triển khai với diện tích 180ha tại huyện Giao Thủy. Tổng vốn đầu tư dự kiến khoảng 2.249,345 tỷ đồng, trong đó nhà đầu tư góp 337,402 tỷ đồng.",
          "UBND tỉnh đã phân công trách nhiệm cụ thể cho các cơ quan chức năng và chính quyền địa phương nhằm đảm bảo tiến độ dự án.",
          "Về phía nhà đầu tư, Công ty VSIP cam kết tuân thủ đầy đủ các quy định pháp lý liên quan đến đầu tư, đất đai, môi trường và xây dựng.",
          "Với định hướng phát triển một khu công nghiệp hiện đại và đồng bộ, dự án KCN Hải Long kỳ vọng thu hút nhiều doanh nghiệp trong nước và quốc tế."
        ]
      },
      en: {
        category: "Market News",
        title: "Nam Dinh: Approval of investment policy for Hai Long Industrial Park phase 1",
        excerpt: "On March 6, 2025, Nam Dinh Provincial People's Committee officially approved the investment policy and selected investors for Hai Long Industrial Park (IP) phase 1 project...",
        content: [
          "The project is implemented by Vietnam Singapore Industrial Park Development Joint Stock Company (VSIP) with an area of 180ha in Giao Thuy district. Total investment is estimated at about 2,249.345 billion VND, of which investors contribute 337.402 billion VND.",
          "The Provincial People's Committee has assigned specific responsibilities to functional agencies and local authorities to ensure project progress.",
          "On the investor side, VSIP commits to fully comply with legal regulations related to investment, land, environment and construction.",
          "With the orientation of developing a modern and synchronized industrial park, Hai Long IP project expects to attract many domestic and international enterprises."
        ]
      },
      ja: {
        category: "市場ニュース",
        title: "ナムディン：ハイロン工業団地フェーズ1の投資方針承認",
        excerpt: "2025年3月6日、ナムディン省人民委員会は、ハイロン工業団地（IP）フェーズ1プロジェクトの投資方針を正式に承認し、投資家を選定しました...",
        content: [
          "プロジェクトは、ベトナムシンガポール工業団地開発株式会社（VSIP）によってザオトゥイ地区で180haの面積で実施されます。総投資額は約2兆2493億4500万VNDと推定され、そのうち投資家は3374億200万VNDを拠出します。",
          "省人民委員会は、プロジェクトの進捗を確保するために、機能機関と地方自治体に具体的な責任を割り当てました。",
          "投資家側では、VSIPは投資、土地、環境、建設に関連する法的規制を完全に遵守することを約束しています。",
          "現代的で同期化された工業団地の開発を目指して、ハイロンIPプロジェクトは多くの国内外の企業を誘致することが期待されています。"
        ]
      },
      ko: {
        category: "시장 뉴스",
        title: "남딘: 하이롱 산업단지 1단계 투자 정책 승인",
        excerpt: "2025년 3월 6일, 남딘성 인민위원회는 하이롱 산업단지(IP) 1단계 프로젝트의 투자 정책을 공식 승인하고 투자자를 선정했습니다...",
        content: [
          "이 프로젝트는 베트남 싱가포르 산업단지 개발 주식회사(VSIP)가 자오투이 지구에서 180ha의 면적으로 시행합니다. 총 투자액은 약 2조 2493억 4500만 VND로 추정되며, 그 중 투자자는 3374억 200만 VND를 기여합니다.",
          "성 인민위원회는 프로젝트 진행을 보장하기 위해 기능 기관과 지방 당국에 구체적인 책임을 할당했습니다.",
          "투자자 측에서 VSIP는 투자, 토지, 환경 및 건설과 관련된 법적 규정을 완전히 준수할 것을 약속합니다.",
          "현대적이고 동기화된 산업단지 개발을 지향하는 하이롱 IP 프로젝트는 많은 국내외 기업을 유치할 것으로 기대됩니다."
        ]
      },
      zh: {
        category: "市场新闻",
        title: "南定：批准海龙工业园一期投资政策",
        excerpt: "2025年3月6日，南定省人民委员会正式批准了海龙工业园（IP）一期项目的投资政策并选定了投资者...",
        content: [
          "该项目由越南新加坡工业园开发股份公司（VSIP）在交水县实施，面积180公顷。总投资额估计约为2.2493万亿越南盾，其中投资者贡献3374亿越南盾。",
          "省人民委员会已为职能机构和地方当局分配了具体责任，以确保项目进度。",
          "在投资者方面，VSIP承诺完全遵守与投资、土地、环境和建设相关的法律法规。",
          "以开发现代化和同步化工业园为导向，海龙IP项目期望吸引许多国内外企业。"
        ]
      }
    }
  },
  {
    id: 3,
    date: "12/11/2025",
    image: "/assets/images/listing/img_03.jpg",
    images: ["/assets/images/listing/img_03.jpg", "/assets/images/listing/img_03.jpg"],
    likes: 15,
    comments: 2,
    translations: {
      vi: {
        category: "Tin quy hoạch",
        title: "Hà Nội: Điều chỉnh quy hoạch khu công nghiệp Sóc Sơn mở rộng",
        excerpt: "UBND TP Hà Nội đang lấy ý kiến về điều chỉnh quy hoạch chi tiết KCN Sóc Sơn mở rộng với diện tích tăng thêm 200ha...",
        content: [
          "Theo dự thảo điều chỉnh, KCN Sóc Sơn mở rộng sẽ tăng từ 300ha lên 500ha, tập trung phát triển các ngành công nghiệp điện tử, cơ khí chính xác và dược phẩm.",
          "Quy hoạch mới bổ sung thêm các khu vực dịch vụ logistics hiện đại, khu nhà ở công nhân với đầy đủ tiện ích và hệ thống xử lý môi trường đạt tiêu chuẩn quốc tế.",
          "UBND TP yêu cầu các sở ngành liên quan thẩm định kỹ lưỡng về tác động môi trường, hạ tầng giao thông và nguồn cung cấp điện nước."
        ]
      },
      en: {
        category: "Planning News",
        title: "Hanoi: Adjustment of Soc Son Industrial Park expansion planning",
        excerpt: "Hanoi People's Committee is seeking opinions on adjusting the detailed planning of Soc Son IP expansion with an additional area of 200ha...",
        content: [
          "According to the draft adjustment, Soc Son IP expansion will increase from 300ha to 500ha, focusing on developing electronics, precision mechanics and pharmaceutical industries.",
          "The new planning adds modern logistics service areas, workers' housing areas with full amenities and environmental treatment systems meeting international standards.",
          "The City People's Committee requires relevant departments to carefully evaluate environmental impact, transport infrastructure and electricity and water supply."
        ]
      },
      ja: {
        category: "計画ニュース",
        title: "ハノイ：ソクソン工業団地拡張計画の調整",
        excerpt: "ハノイ人民委員会は、200haの追加面積を持つソクソンIP拡張の詳細計画の調整について意見を求めています...",
        content: [
          "草案によると、ソクソンIP拡張は300haから500haに増加し、電子、精密機械、製薬産業の発展に焦点を当てます。",
          "新しい計画は、現代的な物流サービスエリア、完全な設備を備えた労働者住宅エリア、国際基準を満たす環境処理システムを追加します。",
          "市人民委員会は、関連部門に環境影響、交通インフラ、電気と水の供給を慎重に評価するよう要求しています。"
        ]
      },
      ko: {
        category: "계획 뉴스",
        title: "하노이: 속손 산업단지 확장 계획 조정",
        excerpt: "하노이 인민위원회는 200ha의 추가 면적을 가진 속손 IP 확장의 상세 계획 조정에 대한 의견을 구하고 있습니다...",
        content: [
          "초안에 따르면, 속손 IP 확장은 300ha에서 500ha로 증가하며, 전자, 정밀 기계 및 제약 산업 개발에 중점을 둡니다.",
          "새로운 계획은 현대적인 물류 서비스 지역, 완전한 편의 시설을 갖춘 근로자 주택 지역 및 국제 기준을 충족하는 환경 처리 시스템을 추가합니다.",
          "시 인민위원회는 관련 부서에 환경 영향, 교통 인프라 및 전기 및 물 공급을 신중하게 평가하도록 요구합니다."
        ]
      },
      zh: {
        category: "规划新闻",
        title: "河内：调整朔山工业园扩建规划",
        excerpt: "河内人民委员会正在征求关于调整朔山IP扩建详细规划的意见，增加面积200公顷...",
        content: [
          "根据调整草案，朔山IP扩建将从300公顷增加到500公顷，重点发展电子、精密机械和制药产业。",
          "新规划增加了现代物流服务区、配备完整设施的工人住房区和符合国际标准的环境处理系统。",
          "市人民委员会要求相关部门仔细评估环境影响、交通基础设施和电力和水供应。"
        ]
      }
    }
  }
];

// Create 25 news items by duplicating base data
const createNewsData = (): NewsItemMultilang[] => {
  const result: NewsItemMultilang[] = [];
  for (let i = 0; i < 9; i++) {
    base_news_data.forEach((item, index) => {
      result.push({
        ...item,
        id: i * 3 + index + 1,
        date: `${14 - i}/11/2025`
      });
    });
  }
  return result.slice(0, 25);
};

const news_data_multilang = createNewsData();

// Helper function to get news item in specific language
export const getNewsItem = (id: number, lang: LanguageCode) => {
  const newsItem = news_data_multilang.find(item => item.id === id);
  if (!newsItem) return null;

  const translation = newsItem.translations[lang];
  return {
    id: newsItem.id,
    date: newsItem.date,
    image: newsItem.image,
    images: newsItem.images,
    likes: newsItem.likes,
    comments: newsItem.comments,
    category: translation.category,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content
  };
};

// Helper function to get all news in specific language
export const getAllNews = (lang: LanguageCode) => {
  return news_data_multilang.map(newsItem => ({
    id: newsItem.id,
    date: newsItem.date,
    image: newsItem.image,
    images: newsItem.images,
    likes: newsItem.likes,
    comments: newsItem.comments,
    category: newsItem.translations[lang].category,
    title: newsItem.translations[lang].title,
    excerpt: newsItem.translations[lang].excerpt,
    content: newsItem.translations[lang].content
  }));
};

export default news_data_multilang;
