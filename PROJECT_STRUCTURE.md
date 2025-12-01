 # 📁 Cấu trúc dự án IIP Map UI

## 🗂️ Tổng quan cấu trúc

```
src/
├── app/                    # Next.js App Router - Các trang của ứng dụng
│   ├── [route]/           # Routes động
│   └── page.tsx           # Các component trang
│
├── components/            # Các React Components
│   ├── home/             # Components cho trang chủ
│   ├── about-us/         # Components cho trang giới thiệu
│   ├── news/             # Components cho trang tin tức
│   ├── booking/          # Components cho trang đặt lịch
│   ├── video/            # Components cho trang video
│   │   ├── sections/     # Các sections của trang video
│   │   ├── VideoActions.tsx      # Actions bên phải (like, comment, save, share)
│   │   ├── VideoLeftActions.tsx  # Actions bên trái (avatar, title, tags, contact buttons)
│   │   ├── VideoPlayer.tsx       # Video player component
│   │   ├── VideoSidebar.tsx      # Sidebar navigation
│   │   ├── VideoCardItem.tsx     # Card hiển thị video thumbnail
│   │   ├── VideoHistoryGrid.tsx  # Grid hiển thị danh sách video
│   │   └── VideoPageContent.tsx  # Main content cho các trang video
│   └── common/           # Components dùng chung
│
├── constants/            # Hằng số & Dữ liệu tĩnh
│   ├── provinces.ts      # Danh sách 63 tỉnh thành VN
│   ├── filterOptions.ts  # Các options cho bộ lọc
│   ├── serviceOptions.ts # Danh sách dịch vụ
│   ├── aboutUsData.ts    # Dữ liệu trang giới thiệu
│   ├── videoData.ts      # Dữ liệu video mẫu
│   └── video/            # Constants riêng cho video
│       └── mockData.ts   # Hàm tạo dữ liệu video mẫu
│
├── types/                # Định nghĩa TypeScript Types
│   ├── news.types.ts     # Types cho tin tức
│   ├── booking.types.ts  # Types cho đặt lịch
│   ├── video.types.ts    # Types cho video
│   ├── aboutUs.types.ts  # Types cho giới thiệu
│   └── index.ts          # Export tất cả types
│
├── hooks/                # Custom React Hooks
│   ├── useLanguage.ts    # Hook đa ngôn ngữ
│   ├── useSticky.ts      # Hook cho sticky header
│   └── video/            # Hooks riêng cho video
│       └── useVideoPageState.ts
│
├── locales/              # Đa ngôn ngữ (i18n)
│   ├── vi/               # Tiếng Việt
│   │   ├── pageTitle.ts  # Tiêu đề trang
│   │   ├── menu.ts       # Menu điều hướng
│   │   ├── common.ts     # Từ dùng chung
│   │   └── index.ts
│   ├── en/               # Tiếng Anh
│   │   ├── pageTitle.ts
│   │   ├── menu.ts
│   │   ├── common.ts
│   │   └── index.ts
│   └── index.ts
│
├── utils/                # Các hàm tiện ích
│   ├── translations.ts   # Helper cho đa ngôn ngữ
│   ├── videoStorage.ts   # Lưu trữ video
│   └── formatters/       # Các hàm format dữ liệu
│       ├── dateFormatter.ts    # Format ngày tháng
│       ├── videoFormatter.ts   # Format video data
│       └── index.ts
│
├── data/                 # File dữ liệu
│   ├── NewsDataMultilang.ts    # Dữ liệu tin tức đa ngôn ngữ
│   ├── ZonesDataMultilang.ts   # Dữ liệu khu công nghiệp
│   ├── MenuDataIIP.ts          # Dữ liệu menu
│   └── FooterDataIIP.ts        # Dữ liệu footer
│
├── contexts/             # React Contexts
│   └── LanguageContext.tsx     # Context đa ngôn ngữ
│
├── layouts/              # Layout Components
│   ├── headers/          # Các header khác nhau
│   ├── footers/          # Các footer khác nhau
│   └── Wrapper.tsx       # Layout wrapper chung
│
├── redux/                # Redux Store (quản lý state)
│   ├── features/         # Các features/slices
│   └── store.ts          # Cấu hình store
│
└── styles/               # SCSS Styles
    ├── base/             # Styles cơ bản
    │   └── _variables.scss     # Biến SCSS
    ├── components/       # Styles cho components
    │   ├── _header.scss
    │   └── _footer.scss
    ├── pages/            # Styles cho từng trang
    │   ├── _home.scss
    │   ├── _about.scss
    │   ├── _news.scss
    │   ├── _video.scss
    │   └── _booking.scss
    ├── video/            # Video styles (tách nhỏ để dễ quản lý)
    │   ├── _video-base.scss        # Base layout (page, container)
    │   ├── _video-sidebar.scss     # Sidebar search & navigation
    │   ├── _video-explore.scss     # Explore search
    │   ├── _video-sections.scss    # Sections, profile, notifications, messages
    │   ├── _video-detail.scss      # Video detail page (player, nav)
    │   ├── _video-actions.scss     # Right actions (like, comment, save, share)
    │   └── _video-left-actions.scss # Left actions (avatar, title, tags, hover card)
    ├── homepage/         # Homepage styles
    │   ├── _homepage-base.scss     # Base styles
    │   ├── _homepage-hero.scss     # Hero section
    │   ├── _homepage-ai-search.scss # AI Search section
    │   ├── _homepage-video.scss    # Video section
    │   ├── _homepage-zones.scss    # Zones section
    │   └── _homepage-video-home.scss # Video section home
    ├── about-us/         # About Us page styles
    │   ├── _about-us-base.scss     # Base styles
    │   ├── _about-us-hero.scss     # Hero section
    │   ├── _about-us-intro.scss    # Introduction section
    │   ├── _about-us-mission.scss  # Mission section
    │   ├── _about-us-customers.scss # Customers section
    │   ├── _about-us-partners.scss # Partners section
    │   ├── _about-us-why.scss      # Why choose IIP section
    │   ├── _about-us-contact.scss  # Contact section
    │   └── _about-us-responsive.scss # Responsive styles
    ├── booking/          # Booking page styles
    │   ├── _booking-base.scss      # Base styles, hero, container
    │   ├── _booking-form.scss      # Form name section
    │   ├── _booking-schedule.scss  # Schedule table
    │   └── _booking-share-modal.scss # Share modal
    ├── news/             # News detail page styles
    │   ├── _news-detail-base.scss  # Base styles, back button
    │   ├── _news-detail-header.scss # Header, excerpt, actions, images, content
    │   ├── _news-detail-comments.scss # Comments section
    │   └── _news-detail-related.scss # Related news section, responsive
    ├── video.scss        # Main entry - imports all video partials
    ├── homepage.scss     # Main entry - imports all homepage partials
    ├── about-us.scss     # Main entry - imports all about-us partials
    ├── booking.scss      # Main entry - imports all booking partials
    ├── news-detail.scss  # Main entry - imports all news-detail partials
    └── news.scss         # News page styles (528 lines - kept as single file)
```

## 📝 Quy tắc đặt tên

### Components
- **PascalCase**: `HeroSection.tsx`, `VideoCardItem.tsx`
- **Thêm hậu tố mô tả**: `Section`, `Card`, `Modal`, `Form`
- **Ví dụ**: `ContactSection`, `NewsCard`, `ShareModal`, `BookingForm`

### Constants (Hằng số)
- **UPPER_SNAKE_CASE**: `PROVINCES`, `VIDEO_DATA`, `SERVICE_OPTIONS`
- **Tên file**: camelCase: `provinces.ts`, `videoData.ts`
- **Ví dụ**: 
  ```typescript
  // File: provinces.ts
  export const PROVINCES = [...]
  ```

### Types
- **PascalCase**: `NewsItem`, `VideoCardItemProps`
- **Thêm hậu tố**: `Item`, `Props`, `Data`, `Config`
- **Ví dụ**: `ScheduleItem`, `VideoCardItemProps`, `CustomerData`

### Hooks
- **Tiền tố `use`**: `useLanguage`, `useVideoPageState`
- **Ví dụ**: `useTranslatedMenu`, `useSticky`

### Utils (Hàm tiện ích)
- **camelCase**: `formatDate`, `formatDuration`
- **Ví dụ**: `formatViews`, `formatDateTime`

## 🎯 Nguyên tắc tổ chức code

### 1. Tổ chức Component
- Mỗi component nên **< 300 dòng**
- Tách logic phức tạp ra **custom hooks**
- Tách dữ liệu tĩnh ra **constants**
- Một component chỉ làm một việc

### 2. Thứ tự Import
```typescript
// 1. React & Next.js
import { useState } from "react"
import Link from "next/link"

// 2. Thư viện bên ngoài
import { HiSparkles } from "react-icons/hi2"

// 3. Internal - Absolute imports
import { useLanguage } from "@/hooks/useLanguage"
import { VIDEO_DATA } from "@/constants"
import { VideoItem } from "@/types"

// 4. Styles
import "@/styles/video.scss"
```

### 3. Giới hạn kích thước file
- **Components**: < 300 dòng
- **Utils**: < 200 dòng
- **Constants**: < 100 dòng
- **Types**: < 50 dòng

### 4. Cấu trúc Component chuẩn
```typescript
"use client"
import { useState } from "react"
import { CONSTANTS } from "@/constants"

// 1. Types/Interfaces
interface ComponentProps {
  title: string
}

// 2. Component
function ComponentName({ title }: ComponentProps) {
  // 2.1. Hooks
  const [state, setState] = useState()
  
  // 2.2. Handlers
  const handleClick = () => {}
  
  // 2.3. Effects
  useEffect(() => {}, [])
  
  // 2.4. Render
  return <div>{title}</div>
}

// 3. Export
export default ComponentName
```

## 🔧 Hướng dẫn bảo trì

### Khi thêm tính năng mới:
1. **Tạo types** trong `/types/[feature].types.ts`
2. **Tạo constants** trong `/constants/[feature]Data.ts`
3. **Tạo components** trong `/components/[feature]/`
4. **Tạo hooks** (nếu cần) trong `/hooks/[feature]/`
5. **Thêm translations** trong `/locales/vi/` và `/locales/en/`
6. **Thêm styles** trong `/styles/pages/_[feature].scss`

### Khi refactor code:
1. Kiểm tra **kích thước file** (dùng lệnh: `wc -l filename`)
2. Tách **components lớn** thành components nhỏ hơn
3. Di chuyển **data tĩnh** ra constants
4. Tách **logic phức tạp** ra hooks
5. Cập nhật **documentation** này

### Khi fix bug:
1. Tìm component/file liên quan
2. Kiểm tra types có đúng không
3. Kiểm tra data từ constants
4. Test trên cả 2 ngôn ngữ (vi/en)
5. Commit với message rõ ràng

## 📚 Cách viết Documentation

### Components
```typescript
/**
 * Component hiển thị card video
 * @param {VideoCardItemProps} props - Props của component
 * @returns {JSX.Element} Video card element
 */
function VideoCardItem(props: VideoCardItemProps) {
  // ...
}
```

### Functions
```typescript
/**
 * Format thời lượng video từ giây sang mm:ss
 * @param {number} seconds - Số giây
 * @returns {string} Chuỗi định dạng mm:ss
 * @example formatDuration(125) // "02:05"
 */
export const formatDuration = (seconds: number): string => {
  // ...
}
```

### Constants
```typescript
/**
 * Danh sách 63 tỉnh thành Việt Nam
 * Sắp xếp theo thứ tự alphabet
 */
export const PROVINCES = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  // ...
]
```

## 🚀 Tối ưu hiệu suất

### 1. Code Splitting
- Lazy load components không cần thiết ngay lập tức
- Sử dụng `dynamic import` cho Next.js

### 2. Memoization
- Dùng `useMemo` cho tính toán phức tạp
- Dùng `useCallback` cho functions truyền vào props
- Dùng `React.memo` cho components render nhiều lần

### 3. Data Management
- Dùng **constants** thay vì inline data
- Cache API responses khi có thể
- Sử dụng Redux cho state phức tạp

### 4. Assets
- Optimize hình ảnh (WebP, lazy loading)
- Minify CSS/JS trong production
- Sử dụng CDN cho static assets

## 🔍 Debugging Tips

### 1. Component không render
- Kiểm tra export/import (default vs named)
- Kiểm tra props có đúng type không
- Xem console có lỗi không

### 2. Data không hiển thị
- Kiểm tra constants có đúng không
- Kiểm tra ngôn ngữ hiện tại (vi/en)
- Xem data có được truyền đúng không

### 3. Styles không áp dụng
- Kiểm tra import SCSS
- Kiểm tra class name có đúng không
- Xem có conflict với styles khác không

## 📞 Liên hệ & Hỗ trợ

Nếu có thắc mắc về cấu trúc dự án, vui lòng:
1. Đọc kỹ documentation này
2. Xem code examples trong dự án
3. Hỏi team lead hoặc senior developer
