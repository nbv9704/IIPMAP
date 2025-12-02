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
- [8. Clean Code Principles](#8-clean-code-principles) ⭐ NEW

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

### 7.4 Code Comments & Documentation

**Quy tắc comment:**

**1. Section Comments (Components/JSX)**
```tsx
// ✅ GOOD - Clear section dividers
export default function VideoDetailV2() {
  // ============================================
  // STATE & HOOKS
  // ============================================
  const [isPlaying, setIsPlaying] = useState(false);
  const { data } = useVideoData();

  // ============================================
  // HANDLERS
  // ============================================
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      {/* ============================================ */}
      {/* VIDEO PLAYER SECTION */}
      {/* ============================================ */}
      <div className="video-player">
        {/* ========== Controls ========== */}
        <div className="controls">
          {/* Play button */}
          <button onClick={handlePlay}>Play</button>
        </div>
      </div>

      {/* ============================================ */}
      {/* VIDEO INFO SECTION */}
      {/* ============================================ */}
      <div className="video-info">
        {/* ========== Title ========== */}
        <h1>{data.title}</h1>
      </div>
    </div>
  );
}
```

**2. Section Comments (SCSS)**
```scss
// ✅ GOOD - Clear section dividers
// =============================================
// VIDEO PLAYER SECTION
// =============================================
.video-player {
  // Player wrapper
  .player-wrapper {
    position: relative;
  }

  // Controls
  .controls {
    position: absolute;
    bottom: 0;
  }
}

// =============================================
// VIDEO INFO SECTION
// =============================================
.video-info {
  padding: 20px;
}
```

**3. Function Comments**
```tsx
// ✅ GOOD - Explain complex logic
/**
 * Calculate video duration in minutes
 * Format: HH:MM:SS -> MM:SS for videos < 1 hour
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
```

**4. Inline Comments**
```tsx
// ✅ GOOD - Explain why, not what
// Delay to prevent rapid API calls
const debounceDelay = 300;

// ❌ BAD - Obvious comment
// Set loading to true
setLoading(true);
```

**Comment Hierarchy:**
```
Level 1: ============================================
         Major sections (Components, SCSS files)

Level 2: ========== Sub-sections ==========
         Sub-sections within major sections

Level 3: // Single line comments
         Inline explanations
```

**Khi nào cần comment:**
- ✅ Major sections trong component
- ✅ Complex logic cần giải thích
- ✅ Workarounds hoặc hacks
- ✅ TODO/FIXME items
- ❌ Obvious code (self-explanatory)
- ❌ Commented-out code (xóa đi)

### 7.6 Cache Management

**Vấn đề:** Next.js cache corruption gây lỗi "Cannot find module"

**Giải pháp:**

**1. Scripts trong package.json**
```json
{
  "scripts": {
    "clean": "rmdir /s /q .next 2>nul || echo Clean completed",
    "clean:cache": "rmdir /s /q .next 2>nul && rmdir /s /q node_modules\\.cache 2>nul",
    "dev:clean": "npm run clean && next dev",
    "build:clean": "npm run clean && next build"
  }
}
```

**2. Khi nào cần clean:**
- ❌ Lỗi "Cannot find module './764.js'"
- ❌ Lỗi "ENOENT: no such file or directory"
- ❌ Sau khi thay đổi cấu trúc file lớn
- ❌ Sau khi update dependencies
- ❌ Build/dev không hoạt động bình thường

**3. Cách sử dụng:**
```bash
# Clean .next folder
npm run clean

# Clean all cache
npm run clean:cache

# Dev with clean
npm run dev:clean

# Build with clean
npm run build:clean
```

**4. File batch script (Windows)**
```batch
# clean-cache.bat
@echo off
rmdir /s /q .next
rmdir /s /q node_modules\.cache
echo Cache cleaned!
```

### 7.7 Code Quality

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

**3. Comments - Xem section 7.4**

---

## 8. Clean Code Principles

### 8.1 Định nghĩa Clean Code

**Clean Code là gì?**
- Code đơn giản, rõ ràng, dễ đọc
- Dễ hiểu, dễ bảo trì, dễ mở rộng
- Đọc như một đoạn văn viết tốt
- Không che giấu ý định của người thiết kế
- Vẫn đảm bảo tính năng, bảo mật, hiệu năng

### 8.2 Code Smells - Dấu hiệu code xấu

**Các dấu hiệu cần refactor:**

1. **Long Function/File** - Hàm/File quá dài
   ```tsx
   // ❌ BAD - File 1612 dòng
   function VideoPageContent() {
     // 1612 lines of code...
   }
   
   // ✅ GOOD - Tách thành nhiều components nhỏ
   function VideoPageContent() {
     return (
       <>
         <ExploreView />
         <SavedVideosView />
         <NotificationsView />
       </>
     );
   }
   ```

2. **Magic Numbers** - Số không có ý nghĩa
   ```tsx
   // ❌ BAD
   setTimeout(() => { ... }, 300);
   if (username.length > 10) { }
   
   // ✅ GOOD
   const VIDEO_PREVIEW = {
     DELAY_MS: 300,
     DURATION_MS: 3000,
   };
   
   const USER_ID = {
     MAX_USERNAME_LENGTH: 10,
   };
   
   setTimeout(() => { ... }, VIDEO_PREVIEW.DELAY_MS);
   if (username.length > USER_ID.MAX_USERNAME_LENGTH) { }
   ```

3. **Code Duplication** - Lặp code
   ```tsx
   // ❌ BAD - Logic lặp lại
   // File 1
   const search1 = () => {
     const results = data.filter(item => 
       item.name.includes(query)
     );
     return results;
   };
   
   // File 2
   const search2 = () => {
     const results = data.filter(item => 
       item.name.includes(query)
     );
     return results;
   };
   
   // ✅ GOOD - Tạo custom hook
   function useSearch(data, query) {
     return useMemo(() => 
       data.filter(item => item.name.includes(query)),
       [data, query]
     );
   }
   ```

4. **Unused Variables** - Biến không dùng
   ```tsx
   // ❌ BAD
   function VideoCard({ title, thumbnail, unused }: Props) {
     return <div>{title}</div>;
   }
   
   // ✅ GOOD
   function VideoCard({ title, thumbnail }: Props) {
     return <div>{title}</div>;
   }
   ```

### 8.3 SOLID Principles

**1. Single Responsibility Principle (SRP)**
> Mỗi component/function chỉ làm một việc duy nhất

```tsx
// ❌ BAD - Component làm quá nhiều việc
function VideoEverything() {
  // Fetch data
  // Display list
  // Handle player
  // Manage comments
  // Handle notifications
}

// ✅ GOOD - Mỗi component một trách nhiệm
function VideoList() { }        // Hiển thị danh sách
function VideoPlayer() { }      // Phát video
function VideoComments() { }    // Quản lý comments
function VideoNotifications() { } // Thông báo
```

**2. DRY (Don't Repeat Yourself)**
> Không lặp lại code

```tsx
// ❌ BAD - Lặp logic
function ComponentA() {
  const [query, setQuery] = useState("");
  const results = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

function ComponentB() {
  const [query, setQuery] = useState("");
  const results = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

// ✅ GOOD - Tạo custom hook
function useSearch(data: any[], query: string) {
  return useMemo(() => 
    data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
    [data, query]
  );
}

function ComponentA() {
  const [query, setQuery] = useState("");
  const results = useSearch(data, query);
}
```

**3. KISS (Keep It Simple, Stupid)**
> Giữ code đơn giản

```tsx
// ❌ BAD - Quá phức tạp
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${monthStr}-${dayStr}`;
}

// ✅ GOOD - Đơn giản
function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}
```

### 8.4 Component Size Guidelines

**Quy tắc kích thước:**

| Lines | Status | Action |
|-------|--------|--------|
| < 100 | ✅ Tối ưu | Giữ nguyên |
| 100-200 | ✅ OK | Chấp nhận được |
| 200-500 | ⚠️ Warning | Cân nhắc tách |
| 500-1000 | 🔴 Problem | Nên tách ngay |
| > 1000 | 🚨 Crisis | Phải tách ngay |

**Ví dụ thực tế:**
```
❌ VideoPageContent.tsx: 1612 dòng → Tách thành 14 components
✅ ExploreView.tsx: 60 dòng
✅ SavedVideosView.tsx: 45 dòng
✅ NotificationsView.tsx: 180 dòng
```

### 8.5 Naming Conventions

**1. Meaningful Names** - Tên có ý nghĩa
```tsx
// ❌ BAD
const a = 10;
const data = [];
const fn = () => {};

// ✅ GOOD
const MAX_ITEMS_PER_PAGE = 10;
const videoList = [];
const fetchVideos = () => {};
```

**2. Consistent Naming** - Đặt tên nhất quán
```tsx
// ❌ BAD - Không nhất quán
function getUser() { }
function fetchVideos() { }
function retrieveComments() { }

// ✅ GOOD - Nhất quán
function fetchUser() { }
function fetchVideos() { }
function fetchComments() { }
```

**3. Avoid Abbreviations** - Tránh viết tắt
```tsx
// ❌ BAD
const usrId = "123";
const vidCnt = 10;

// ✅ GOOD
const userId = "123";
const videoCount = 10;
```

### 8.6 Function Best Practices

**1. Small Functions** - Hàm ngắn gọn
```tsx
// ❌ BAD - Hàm quá dài
function processVideo() {
  // 100+ lines of code
}

// ✅ GOOD - Tách thành nhiều hàm nhỏ
function validateVideo() { }
function uploadVideo() { }
function notifyUser() { }

function processVideo() {
  validateVideo();
  uploadVideo();
  notifyUser();
}
```

**2. Single Level of Abstraction** - Cùng mức trừu tượng
```tsx
// ❌ BAD - Trộn lẫn mức trừu tượng
function processOrder() {
  // High level
  validateOrder();
  
  // Low level
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  // High level
  sendConfirmation();
}

// ✅ GOOD - Cùng mức trừu tượng
function processOrder() {
  validateOrder();
  calculateTotal();
  sendConfirmation();
}

function calculateTotal() {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**3. Limit Parameters** - Giới hạn tham số
```tsx
// ❌ BAD - Quá nhiều tham số
function createUser(
  name: string,
  email: string,
  age: number,
  address: string,
  phone: string,
  city: string,
  country: string
) { }

// ✅ GOOD - Nhóm thành object
interface UserData {
  name: string;
  email: string;
  age: number;
  contact: {
    phone: string;
    address: string;
    city: string;
    country: string;
  };
}

function createUser(userData: UserData) { }
```

### 8.7 Constants & Configuration

**Pattern:** Tạo file config cho constants

```tsx
// ❌ BAD - Magic numbers trong code
setTimeout(() => { ... }, 300);
if (username.length > 10) { }
const perPage = 10;

// ✅ GOOD - Constants file
// constants/video/config.ts
export const VIDEO_PREVIEW = {
  DELAY_MS: 300,
  DURATION_MS: 3000,
} as const;

export const USER_ID = {
  MAX_USERNAME_LENGTH: 10,
  MIN_USERNAME_LENGTH: 1,
} as const;

export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
} as const;

// Usage
import { VIDEO_PREVIEW, USER_ID, PAGINATION } from '@/constants/video/config';

setTimeout(() => { ... }, VIDEO_PREVIEW.DELAY_MS);
if (username.length > USER_ID.MAX_USERNAME_LENGTH) { }
const perPage = PAGINATION.ITEMS_PER_PAGE;
```

### 8.8 Error Handling

**Best Practices:**

```tsx
// ❌ BAD - Bỏ qua lỗi
try {
  await fetchData();
} catch (error) {
  // Empty catch
}

// ✅ GOOD - Xử lý lỗi đúng cách
try {
  await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  showErrorNotification('Unable to load data');
  // Fallback logic
}

// ✅ BETTER - Custom error handling
async function fetchDataSafely() {
  try {
    const data = await fetchData();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

### 8.9 Comments Guidelines

**Khi nào cần comment:**

```tsx
// ✅ GOOD - Giải thích "tại sao"
// Delay 300ms để tránh trigger khi user chỉ di chuột qua nhanh
setTimeout(() => { ... }, 300);

// ✅ GOOD - Giải thích logic phức tạp
// Calculate video duration: HH:MM:SS -> MM:SS for videos < 1 hour
const formatDuration = (seconds: number) => { };

// ✅ GOOD - TODO/FIXME
// TODO: Thay id bằng postId thực tế từ backend
const mockPostId = id.toString();

// ❌ BAD - Comment rõ ràng
// Set loading to true
setLoading(true);

// ❌ BAD - Commented code (xóa đi)
// const oldFunction = () => { };
```

### 8.10 Refactoring Checklist

**Khi nào cần refactor:**
- [ ] File > 500 dòng
- [ ] Function > 50 dòng
- [ ] Có magic numbers
- [ ] Code lặp lại > 2 lần
- [ ] Có unused variables
- [ ] Tên biến/hàm không rõ ràng
- [ ] Logic phức tạp khó hiểu

**Các bước refactor:**
1. **Phân tích** - Xác định vấn đề
2. **Lập kế hoạch** - Quyết định cách tách
3. **Tạo tests** - Đảm bảo không break
4. **Refactor từng phần** - Tách dần dần
5. **Verify** - Kiểm tra diagnostics
6. **Document** - Cập nhật docs
7. **Commit** - Commit với message rõ ràng

### 8.11 Real Example - VideoPageContent Refactoring

**Case Study:** Refactor VideoPageContent.tsx

**Before:**
```
VideoPageContent.tsx: 1612 dòng
- Quá nhiều state (15+ states)
- Logic lặp lại
- Magic numbers
- Khó maintain
```

**After:**
```
VideoPageContent.tsx: 80 dòng (95% reduction)
├── views/
│   ├── ExploreView.tsx (60 dòng)
│   ├── SavedVideosView.tsx (45 dòng)
│   ├── FollowingView.tsx (50 dòng)
│   ├── NotificationsView.tsx (180 dòng)
│   ├── ProfileView.tsx (130 dòng)
│   └── MessagesView.tsx (50 dòng)
├── messages/
│   ├── MessagesSidebar.tsx (90 dòng)
│   ├── ChatContainer.tsx (140 dòng)
│   └── ... (4 more files)
├── ExploreSearchBar.tsx (150 dòng)
├── hooks/
│   └── useSearchWithSuggestions.ts
└── constants/
    ├── config.ts (magic numbers → constants)
    └── mockChatData.ts
```

**Results:**
- ✅ Main file: 1612 → 80 lines (95% reduction)
- ✅ 14 small, focused components
- ✅ 0 diagnostics errors
- ✅ 10x better maintainability
- ✅ 10x better code quality

**Documentation:**
- See `CLEAN_CODE_IMPROVEMENTS.md` for detailed analysis
- See `REFACTORING_SUMMARY.md` for metrics

### 8.12 Clean Code Tools

**1. TypeScript Strict Mode**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

**2. ESLint Rules**
```json
// .eslintrc
{
  "rules": {
    "max-lines": ["warn", 500],
    "max-lines-per-function": ["warn", 50],
    "complexity": ["warn", 10],
    "no-magic-numbers": "warn"
  }
}
```

**3. Prettier**
```json
// .prettierrc
{
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false
}
```

### 8.13 Clean Code Resources

**Internal Docs:**
- `CLEAN_CODE_IMPROVEMENTS.md` - Detailed analysis
- `REFACTORING_SUMMARY.md` - Refactoring guide
- `CLEAN_CODE_README.md` - Quick reference

**External Resources:**
- Clean Code by Robert C. Martin
- Refactoring by Martin Fowler
- The Pragmatic Programmer

---

## 📝 Checklist khi thêm feature mới

### Code Organization
- [ ] Tạo thư mục feature trong `components/`, `styles/`
- [ ] Tách SCSS thành partials nếu > 300 dòng
- [ ] Tạo types file nếu cần (`feature.types.ts`)
- [ ] Tạo custom hooks nếu logic phức tạp
- [ ] Tạo constants file cho data tĩnh

### Clean Code
- [ ] Component < 200 dòng (tách nếu lớn hơn)
- [ ] Function < 50 dòng
- [ ] Không có magic numbers (dùng constants)
- [ ] Không có code duplication (DRY)
- [ ] Không có unused variables
- [ ] Tên biến/hàm rõ ràng, có ý nghĩa
- [ ] Comments cho logic phức tạp

### Quality Checks
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Test build: `npm run build`
- [ ] Test dev: `npm run dev`
- [ ] Check diagnostics: 0 errors

### Documentation
- [ ] Update `PROJECT_STRUCTURE.md`
- [ ] Update `DESIGN_PATTERNS.md` nếu có pattern mới
- [ ] Thêm comments cho code phức tạp
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

**Last Updated:** December 1, 2025  
**Maintained by:** IIP Development Team

---

## 🎯 Quick Reference

### File Size Limits
- Component: < 200 lines ✅
- Function: < 50 lines ✅
- SCSS partial: < 300 lines ✅

### Clean Code Principles
1. **SRP** - Single Responsibility
2. **DRY** - Don't Repeat Yourself
3. **KISS** - Keep It Simple
4. **No Magic Numbers**
5. **Meaningful Names**
6. **Small Functions**

### When to Refactor
- File > 500 lines 🔴
- Function > 50 lines ⚠️
- Magic numbers ❌
- Code duplication ❌
- Unused variables ❌

### Resources
- `CLEAN_CODE_IMPROVEMENTS.md` - Detailed analysis
- `REFACTORING_SUMMARY.md` - Refactoring guide
- `PROJECT_STRUCTURE.md` - Project structure
