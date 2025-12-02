# Design Patterns & Best Practices

> Tài liệu về các patterns, conventions và best practices được áp dụng trong dự án IIP Map UI

## 📋 Mục lục

- [1. Tổ chức Code](#1-tổ-chức-code)
- [2. Kiến trúc CSS/SCSS](#2-kiến-trúc-cssscss)
- [3. Cấu trúc Component](#3-cấu-trúc-component)
- [4. Quy tắc Đặt tên File](#4-quy-tắc-đặt-tên-file)
- [5. Patterns Import/Export](#5-patterns-importexport)
- [6. Quản lý State](#6-quản-lý-state)
- [7. Best Practices](#7-best-practices)
- [8. Nguyên tắc Clean Code](#8-nguyên-tắc-clean-code) ⭐ MỚI
- [9. Tối ưu Performance & SSR Best Practices](#9-tối-ưu-performance--ssr-best-practices) ⭐ MỚI

---

## 1. Tổ chức Code

### 1.1 Nguyên tắc "Chia nhỏ để dễ quản lý"

**Quy tắc:** Mọi file lớn (>500 dòng) nên được tách thành các file nhỏ hơn theo chức năng.

**Lợi ích:**
- Dễ tìm và sửa code
- Giảm conflict khi nhiều người cùng làm việc
- Dễ test và maintain
- Code review hiệu quả hơn

**Ví dụ thực tế:**
```
❌ XẤU: video.scss (3500+ dòng)
✅ TỐT: 
   video/
   ├── _video-base.scss (40 dòng)
   ├── _video-sidebar.scss (210 dòng)
   ├── _video-explore.scss (140 dòng)
   └── ...
```

### 1.2 Cấu trúc thư mục theo feature

**Pattern:** Nhóm các file liên quan theo feature/page thay vì theo type

```
✅ TỐT - Theo feature:
src/
├── components/
│   ├── video/          # Tất cả components của video feature
│   ├── booking/        # Tất cả components của booking feature
│   └── news/           # Tất cả components của news feature
├── styles/
│   ├── video/          # Tất cả styles của video
│   ├── booking/        # Tất cả styles của booking
│   └── news/           # Tất cả styles của news

❌ XẤU - Theo type:
src/
├── components/
│   ├── buttons/
│   ├── cards/
│   └── modals/
```

---

## 2. Kiến trúc CSS/SCSS

### 2.1 Pattern Partial Files

**Quy tắc:** Mỗi page/feature có một file chính và nhiều partial files

**Cấu trúc:**
```scss
// Main file (video.scss)
// =============================================
// VIDEO PAGE STYLES - Main Entry Point
// =============================================

// Base styles
@import 'video/video-base';

// Feature sections
@import 'video/video-sidebar';
@import 'video/video-explore';
// ...
```

**Đặt tên Partial file:**
- Prefix với underscore: `_video-base.scss`
- Tên mô tả chức năng: `_video-sidebar.scss`, `_video-actions.scss`
- Không import trong partial (trừ variables)

### 2.2 Phân chia Partials theo chức năng

**Các loại partials thường gặp:**

1. **Base/Layout** - Cấu trúc trang cơ bản
   ```scss
   // _video-base.scss
   .video-page {
     background: #fff;
     min-height: 100vh;
   }
   ```

2. **Components** - Các thành phần UI
   ```scss
   // _video-sidebar.scss
   .video-sidebar {
     // Sidebar styles
   }
   ```

3. **Sections** - Các sections lớn
   ```scss
   // _homepage-hero.scss
   .hero-section {
     // Hero styles
   }
   ```

4. **Responsive** - Media queries
   ```scss
   // _video-responsive.scss
   @media (max-width: 768px) {
     // Mobile styles
   }
   ```

### 2.3 Kích thước file hợp lý

**Guidelines:**
- **< 100 dòng:** Tối ưu ✅
- **100-300 dòng:** Chấp nhận được ✅
- **300-500 dòng:** Cân nhắc tách nhỏ ⚠️
- **> 500 dòng:** Nên tách ngay ❌

### 2.4 Thứ tự Import

**Thứ tự import chuẩn:**
```scss
// 1. Variables/Mixins
@import '../variables-iip.scss';

// 2. Base/Reset
@import 'feature/feature-base';

// 3. Layout
@import 'feature/feature-layout';

// 4. Components (theo thứ tự xuất hiện trên page)
@import 'feature/feature-header';
@import 'feature/feature-content';
@import 'feature/feature-footer';

// 5. Responsive (cuối cùng)
@import 'feature/feature-responsive';
```

---

## 3. Cấu trúc Component

### 3.1 Tổ chức Component

**Pattern:** Mỗi component có cấu trúc rõ ràng

```tsx
// VideoCardItem.tsx
import React from 'react';
import type { VideoCardProps } from '@/types/video.types';

// 1. Types/Interfaces (nếu cần)
interface VideoCardItemProps extends VideoCardProps {
  // Additional props
}

// 2. Component
export default function VideoCardItem({ 
  title, 
  thumbnail,
  // ... 
}: VideoCardItemProps) {
  // 3. Hooks
  const [isLiked, setIsLiked] = useState(false);
  
  // 4. Handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  // 5. Render
  return (
    <div className="video-card">
      {/* JSX */}
    </div>
  );
}
```

### 3.2 Pattern Client Components

**Quy tắc:** Tách logic client-side ra khỏi Server Components

```tsx
// ❌ XẤU - Trộn server và client
export default function Page() {
  const [state, setState] = useState(); // Error!
  return <div>...</div>;
}

// ✅ TỐT - Tách riêng
// page.tsx (Server Component)
export default function Page() {
  return <PageClient />;
}

// PageClient.tsx (Client Component)
'use client';
export default function PageClient() {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

---

## 4. Quy tắc Đặt tên File

### 4.1 Components

```
PascalCase cho components:
✅ VideoCardItem.tsx
✅ HeroSection.tsx
✅ AISearchSection.tsx

Thêm suffix mô tả:
✅ AboutUsClient.tsx (Client component)
✅ VideoPageContent.tsx (Page content)
```

### 4.2 SCSS Files

```
kebab-case cho SCSS:
✅ video.scss (main file)
✅ _video-base.scss (partial)
✅ _video-sidebar.scss (partial)

Prefix underscore cho partials:
✅ _video-actions.scss
❌ video-actions.scss (không có underscore)
```

### 4.3 Utilities & Hooks

```
camelCase cho utilities:
✅ formatters/index.ts
✅ userIdValidator.ts

Prefix 'use' cho hooks:
✅ useVideoPageState.ts
✅ useTranslatedMenu.ts
```

### 4.4 Constants & Types

```
camelCase cho constants:
✅ videoData.ts
✅ filterOptions.ts

.types.ts suffix cho types:
✅ video.types.ts
✅ booking.types.ts
```

---

## 5. Patterns Import/Export

### 5.1 Named vs Default Exports

**Components:** Default export
```tsx
// ✅ TỐT
export default function VideoCard() { }

// Import
import VideoCard from '@/components/video/VideoCard';
```

**Utilities/Hooks:** Named export
```tsx
// ✅ TỐT
export function formatDate() { }
export function formatNumber() { }

// Import
import { formatDate, formatNumber } from '@/utils/formatters';
```

### 5.2 Barrel Exports (index.ts)

**Pattern:** Tạo index.ts để export nhiều items

```ts
// utils/formatters/index.ts
export { formatDate } from './dateFormatter';
export { formatNumber } from './numberFormatter';
export { formatCurrency } from './currencyFormatter';

// Usage
import { formatDate, formatNumber } from '@/utils/formatters';
```

### 5.3 Path Aliases

**Sử dụng @ alias thay vì relative paths:**

```tsx
// ❌ XẤU
import VideoCard from '../../../components/video/VideoCard';

// ✅ TỐT
import VideoCard from '@/components/video/VideoCard';
```

---

## 6. Quản lý State

### 6.1 Local State với useState

**Khi nào dùng:** State chỉ dùng trong 1 component

```tsx
function VideoCard() {
  const [isLiked, setIsLiked] = useState(false);
  // ...
}
```

### 6.2 Custom Hooks cho Logic phức tạp

**Pattern:** Tách logic ra custom hook

```tsx
// hooks/video/useVideoPageState.ts
export function useVideoPageState() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchVideos = async () => {
    setLoading(true);
    // fetch logic
    setLoading(false);
  };
  
  return { videos, loading, fetchVideos };
}

// Usage in component
function VideoPage() {
  const { videos, loading, fetchVideos } = useVideoPageState();
}
```

### 6.3 Giải pháp Props Drilling

**Pattern:** Sử dụng composition thay vì props drilling

```tsx
// ❌ XẤU - Props drilling
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>

// ✅ TỐT - Composition
<Parent>
  <Child>
    <GrandChild data={data} />
  </Child>
</Parent>
```

---

## 7. Best Practices

### 7.1 CSS Best Practices

**1. Đặt tên kiểu BEM (không strict BEM)**
```scss
// ✅ TỐT
.video-card { }
.video-card-title { }
.video-card-thumbnail { }

// ❌ XẤU
.vc { }
.title { }
.img { }
```

**2. Nested selectors (tối đa 3 levels)**
```scss
// ✅ TỐT
.video-card {
  .card-header {
    .card-title { }
  }
}

// ❌ XẤU - Quá sâu
.video-card {
  .card-body {
    .card-content {
      .content-wrapper {
        .title { } // Quá sâu!
      }
    }
  }
}
```

**3. Variables cho colors/spacing**
```scss
// ✅ TỐT
$primary-color: #0051CB;
$spacing-md: 16px;

.button {
  background: $primary-color;
  padding: $spacing-md;
}

// ❌ XẤU
.button {
  background: #0051CB;
  padding: 16px;
}
```
