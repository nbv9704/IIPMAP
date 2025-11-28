# 📁 Cấu trúc dự án IIP Map UI

## 🗂️ Tổng quan cấu trúc

```
src/
├── app/                    # Next.js App Router
│   ├── [route]/           # Dynamic routes
│   └── page.tsx           # Page components
│
├── components/            # React Components
│   ├── home/             # Homepage components
│   ├── about-us/         # About Us components
│   ├── news/             # News components
│   ├── booking/          # Booking components
│   ├── video/            # Video components
│   │   └── sections/     # Video page sections
│   └── common/           # Shared components
│
├── constants/            # Constants & Static Data
│   ├── provinces.ts      # Danh sách tỉnh thành
│   ├── filterOptions.ts  # Filter options
│   ├── serviceOptions.ts # Service options
│   ├── aboutUsData.ts    # About Us data
│   ├── videoData.ts      # Video mock data
│   └── video/            # Video-specific constants
│       └── mockData.ts   # Video mock data generators
│
├── types/                # TypeScript Types
│   ├── news.types.ts     # News types
│   ├── booking.types.ts  # Booking types
│   ├── video.types.ts    # Video types
│   ├── aboutUs.types.ts  # About Us types
│   └── index.ts          # Export all types
│
├── hooks/                # Custom React Hooks
│   ├── useLanguage.ts    # Language hook
│   ├── useSticky.ts      # Sticky header hook
│   └── video/            # Video-specific hooks
│       └── useVideoPageState.ts
│
├── locales/              # i18n Translations
│   ├── vi/               # Vietnamese
│   │   ├── pageTitle.ts
│   │   ├── menu.ts
│   │   ├── common.ts
│   │   └── index.ts
│   ├── en/               # English
│   │   ├── pageTitle.ts
│   │   ├── menu.ts
│   │   ├── common.ts
│   │   └── index.ts
│   └── index.ts
│
├── utils/                # Utility Functions
│   ├── translations.ts   # Translation helper
│   ├── videoStorage.ts   # Video storage
│   └── formatters/       # Formatter utilities
│       ├── dateFormatter.ts
│       ├── videoFormatter.ts
│       └── index.ts
│
├── data/                 # Data Files
│   ├── NewsDataMultilang.ts
│   ├── ZonesDataMultilang.ts
│   ├── MenuDataIIP.ts
│   └── FooterDataIIP.ts
│
├── contexts/             # React Contexts
│   └── LanguageContext.tsx
│
├── layouts/              # Layout Components
│   ├── headers/
│   ├── footers/
│   └── Wrapper.tsx
│
├── redux/                # Redux Store
│   ├── features/
│   └── store.ts
│
└── styles/               # SCSS Styles
    ├── base/             # Base styles
    │   └── _variables.scss
    ├── components/       # Component styles
    │   ├── _header.scss
    │   └── _footer.scss
    └── pages/            # Page styles
        ├── _home.scss
        ├── _about.scss
        ├── _news.scss
        ├── _video.scss
        └── _booking.scss
```

## 📝 Quy tắc đặt tên

### Components
- **PascalCase**: `HeroSection.tsx`, `VideoCardItem.tsx`
- **Suffix**: Thêm suffix mô tả: `Section`, `Card`, `Modal`, `Form`

### Constants
- **UPPER_SNAKE_CASE**: `PROVINCES`, `VIDEO_DATA`, `SERVICE_OPTIONS`
- **File**: camelCase: `provinces.ts`, `videoData.ts`

### Types
- **PascalCase**: `NewsItem`, `VideoCardItemProps`
- **Suffix**: `Item`, `Props`, `Data`

### Hooks
- **Prefix**: `use` + PascalCase: `useLanguage`, `useVideoPageState`

### Utils
- **camelCase**: `formatDate`, `formatDuration`

## 🎯 Best Practices

### 1. Component Organization
- Mỗi component nên < 300 dòng
- Tách logic phức tạp ra custom hooks
- Tách data ra constants

### 2. Import Order
```typescript
// 1. React & Next.js
import { useState } from "react"
import Link from "next/link"

// 2. External libraries
import { HiSparkles } from "react-icons/hi2"

// 3. Internal - Absolute imports
import { useLanguage } from "@/hooks/useLanguage"
import { VIDEO_DATA } from "@/constants"
import { VideoItem } from "@/types"

// 4. Styles
import "@/styles/video.scss"
```

### 3. File Size Limits
- Components: < 300 dòng
- Utils: < 200 dòng
- Constants: < 100 dòng
- Types: < 50 dòng

## 🔧 Maintenance

### Khi thêm feature mới:
1. Tạo types trong `/types`
2. Tạo constants trong `/constants`
3. Tạo components trong `/components/[feature]`
4. Tạo hooks nếu cần trong `/hooks/[feature]`
5. Thêm translations trong `/locales`

### Khi refactor:
1. Kiểm tra file size
2. Tách components lớn
3. Move data ra constants
4. Extract logic ra hooks
5. Update documentation

## 📚 Documentation

- **Components**: JSDoc comments
- **Functions**: TSDoc comments
- **Types**: Inline comments
- **Constants**: Header comments

## 🚀 Performance

- Lazy load components khi cần
- Memoize expensive calculations
- Use constants thay vì inline data
- Optimize images & assets
