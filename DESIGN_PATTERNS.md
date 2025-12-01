# Design Patterns & Best Practices

> Documentation về các patterns, conventions và best practices được áp dụng trong dự án IIP Map UI

## 📋 Mục lục

- [1. Code Organization](#1-code-organization)
- [2. CSS/SCSS Architecture](#2-cssscss-architecture)
- [3. Component Structure](#3-component-structure)
- [4. File Naming Conventions](#4-file-naming-conventions)
- [5. Import/Export Patterns](#5-importexport-patterns)
- [6. State Management](#6-state-management)
- [7. Best Practices](#7-best-practices)

---

## 1. Code Organization

### 1.1 Nguyên tắc "Chia nhỏ để dễ quản lý"

**Quy tắc:** Mọi file lớn (>500 dòng) nên được tách thành các file nhỏ hơn theo chức năng.

**Lợi ích:**
- Dễ tìm và sửa code
- Giảm conflict khi nhiều người cùng làm việc
- Dễ test và maintain
- Code review hiệu quả hơn

**Ví dụ thực tế:**
```
❌ BAD: video.scss (3500+ dòng)
✅ GOOD: 
   video/
   ├── _video-base.scss (40 dòng)
   ├── _video-sidebar.scss (210 dòng)
   ├── _video-explore.scss (140 dòng)
   └── ...
```

### 1.2 Cấu trúc thư mục theo feature

**Pattern:** Nhóm các file liên quan theo feature/page thay vì theo type

```
✅ GOOD - Feature-based:
src/
├── components/
│   ├── video/          # Tất cả components của video feature
│   ├── booking/        # Tất cả components của booking feature
│   └── news/           # Tất cả components của news feature
├── styles/
│   ├── video/          # Tất cả styles của video
│   ├── booking/        # Tất cả styles của booking
│   └── news/           # Tất cả styles của news

❌ BAD - Type-based:
src/
├── components/
│   ├── buttons/
│   ├── cards/
│   └── modals/
```

---

## 2. CSS/SCSS Architecture

### 2.1 Partial Files Pattern

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

**Partial file naming:**
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

### 2.4 Import Order

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

## 3. Component Structure

### 3.1 Component Organization

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

### 3.2 Client Components Pattern

**Quy tắc:** Tách logic client-side ra khỏi Server Components

```tsx
// ❌ BAD - Mixing server and client
export default function Page() {
  const [state, setState] = useState(); // Error!
  return <div>...</div>;
}

// ✅ GOOD - Separate concerns
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

## 4. File Naming Conventions

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

## 5. Import/Export Patterns

### 5.1 Named vs Default Exports

**Components:** Default export
```tsx
// ✅ GOOD
export default function VideoCard() { }

// Import
import VideoCard from '@/components/video/VideoCard';
```

**Utilities/Hooks:** Named export
```tsx
// ✅ GOOD
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
// ❌ BAD
import VideoCard from '../../../components/video/VideoCard';

// ✅ GOOD
import VideoCard from '@/components/video/VideoCard';
```

---

## 6. State Management

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

### 6.3 Props Drilling Solution

**Pattern:** Sử dụng composition thay vì props drilling

```tsx
// ❌ BAD - Props drilling
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>

// ✅ GOOD - Composition
<Parent>
  <Child>
    <GrandChild data={data} />
  </Child>
</Parent>
```

---

## 7. Best Practices

### 7.1 CSS Best Practices

**1. BEM-like naming (không strict BEM)**
```scss
// ✅ GOOD
.video-card { }
.video-card-title { }
.video-card-thumbnail { }

// ❌ BAD
.vc { }
.title { }
.img { }
```

**2. Nested selectors (max 3 levels)**
```scss
// ✅ GOOD
.video-card {
  .card-header {
    .card-title { }
  }
}

// ❌ BAD - Too deep
.video-card {
  .card-body {
    .card-content {
      .content-wrapper {
        .title { } // Too deep!
      }
    }
  }
}
```

**3. Variables cho colors/spacing**
```scss
// ✅ GOOD
$primary-color: #0051CB;
$spacing-md: 16px;

.button {
  background: $primary-color;
  padding: $spacing-md;
}

// ❌ BAD
.button {
  background: #0051CB;
  padding: 16px;
}
```

### 7.2 Component Best Practices

**1. Single Responsibility**
```tsx
// ✅ GOOD - Mỗi component làm 1 việc
function VideoCard() { }
function VideoList() { }
function VideoPlayer() { }

// ❌ BAD - Component làm quá nhiều việc
function VideoEverything() {
  // Card + List + Player logic
}
```

**2. Props Interface**
```tsx
// ✅ GOOD - Clear interface
interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  onLike?: () => void;
}

function VideoCard({ id, title, thumbnail, onLike }: VideoCardProps) { }
```

**3. Early Returns**
```tsx
// ✅ GOOD
function VideoCard({ video }: Props) {
  if (!video) return null;
  if (video.isDeleted) return <DeletedCard />;
  
  return <div>...</div>;
}

// ❌ BAD
function VideoCard({ video }: Props) {
  return (
    <div>
      {video && !video.isDeleted && (
        <div>...</div>
      )}
    </div>
  );
}
```

### 7.3 Performance Best Practices

**1. Lazy Loading**
```tsx
// ✅ GOOD
const VideoPlayer = lazy(() => import('@/components/video/VideoPlayer'));
```

**2. Memoization**
```tsx
// ✅ GOOD - Memo expensive components
const VideoCard = memo(function VideoCard({ video }: Props) {
  return <div>...</div>;
});
```

**3. useCallback cho handlers**
```tsx
// ✅ GOOD
const handleLike = useCallback(() => {
  // logic
}, [dependencies]);
```

### 7.4 Code Quality

**1. TypeScript strict mode**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

**2. ESLint rules**
```json
// .eslintrc
{
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

**3. Comments cho logic phức tạp**
```tsx
// ✅ GOOD
// Calculate video duration in minutes
// Format: HH:MM:SS -> MM:SS for videos < 1 hour
const formatDuration = (seconds: number) => {
  // logic
};
```

---

## 📝 Checklist khi thêm feature mới

- [ ] Tạo thư mục feature trong `components/`, `styles/`
- [ ] Tách SCSS thành partials nếu > 300 dòng
- [ ] Tạo types file nếu cần (`feature.types.ts`)
- [ ] Tạo custom hooks nếu logic phức tạp
- [ ] Tạo constants file cho data tĩnh
- [ ] Update `PROJECT_STRUCTURE.md`
- [ ] Test build: `npm run build`
- [ ] Commit với message rõ ràng

---

## 🔄 Refactoring Workflow

Khi cần refactor file lớn:

1. **Phân tích cấu trúc**
   ```bash
   # Đếm số dòng
   wc -l src/styles/feature.scss
   
   # Tìm các sections chính
   grep "^//" src/styles/feature.scss
   ```

2. **Tạo thư mục partials**
   ```bash
   mkdir src/styles/feature
   ```

3. **Tách từng section**
   - Base/Layout → `_feature-base.scss`
   - Components → `_feature-component.scss`
   - Responsive → `_feature-responsive.scss`

4. **Tạo file chính**
   ```scss
   // feature.scss
   @import 'feature/feature-base';
   @import 'feature/feature-component';
   @import 'feature/feature-responsive';
   ```

5. **Test build**
   ```bash
   npm run build
   ```

6. **Commit**
   ```bash
   git add -A
   git commit -m "refactor(styles): split feature.scss into partials"
   git push
   ```

---

## 📚 Tài liệu tham khảo

- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Cấu trúc dự án chi tiết
- [VIDEO_ROUTES.md](./VIDEO_ROUTES.md) - Routes và navigation
- [Next.js Docs](https://nextjs.org/docs) - Next.js documentation
- [SCSS Guidelines](https://sass-guidelin.es/) - SCSS best practices

---

**Last Updated:** December 2024  
**Maintained by:** IIP Development Team
