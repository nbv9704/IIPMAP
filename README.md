# IIP Map UI

> Dự án Next.js 14 App Router với tối ưu SSR và kiến trúc clean code

**Trạng thái**: ✅ Sẵn sàng Production  
**Cập nhật**: 06/12/2025

---

## 📚 Tài liệu Dự án

Dự án có các tài liệu kỹ thuật chi tiết (local only, không push lên GitHub):
- Design patterns & best practices
- Project structure & organization
- Optimization reports & metrics
- API implementation guides
- Video routes documentation

**Lưu ý**: Các file .md (trừ README.md) được giữ local để bảo mật thông tin kỹ thuật nội bộ.

---

## 🚀 Bắt đầu Nhanh

### Development:
```bash
npm install          # Cài đặt dependencies
npm run dev          # Chạy dev server (http://localhost:3000)
npm run dev:clean    # Xóa cache + chạy dev
```

### Build:
```bash
npm run build        # Build production
npm run build:clean  # Xóa cache + build
npm run start        # Chạy production server
```

### Phân tích:
```bash
npm run analyze      # Phân tích bundle
npm run lint         # Chạy ESLint
```

### Bảo trì:
```bash
npm run clean        # Xóa thư mục .next
npm run clean:cache  # Xóa tất cả cache
```

---

## 📊 Chỉ số Performance

### Trạng thái Hiện tại:
```
Bundle Size:  82.3 kB (đã tối ưu)
Video Pages:  138 kB (-6.8% so với baseline)
About-Us LCP: 0.5s (-80% so với baseline)
News LCP:     1.0s (-60% so với baseline)
Dependencies: 394 packages (-11.5%)
Build Status: ✅ Thành công (zero errors)
```

### Tối ưu Đã áp dụng:
- ✅ Kiến trúc SSR với metadata
- ✅ next/image cho tất cả hình ảnh
- ✅ Dynamic imports cho video views
- ✅ SSG cho trang about-us
- ✅ ISR cho trang news detail
- ✅ Loading spinners đẹp cho video routes
- ✅ Đã xóa 67 packages không dùng

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS + Tailwind CSS + Bootstrap
- **State**: Redux Toolkit + RTK Query
- **Icons**: React Icons + Lucide React
- **Forms**: React Hook Form + Yup
- **i18n**: Custom Language Context (5 languages)
- **API**: RTK Query với hybrid fallback pattern

---

## 📁 Cấu trúc Project

```
iip-map-ui/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components (theo feature)
│   ├── styles/           # SCSS styles (theo feature)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants & config
│   ├── data/             # Mock data & translations
│   ├── types/            # TypeScript types
│   ├── layouts/          # Layout components
│   ├── contexts/         # React contexts
│   ├── redux/            # Redux store
│   └── locales/          # i18n translations
├── public/               # Static assets
└── docs/                 # Documentation (*.md files)
```

Xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) để biết cấu trúc chi tiết.

---

## 🎯 Hướng dẫn Development

### Trước khi Bắt đầu:
1. Xem cấu trúc project trong `src/` folder
2. Tuân theo patterns hiện có trong codebase
3. Tuân theo nguyên tắc clean code

### Khi Thêm Tính năng:
- ✅ Component < 200 dòng
- ✅ Dùng TypeScript strict mode
- ✅ Server Component mặc định
- ✅ Dùng next/image cho hình ảnh
- ✅ Dynamic import cho components nặng
- ✅ Thêm loading states cho async operations
- ✅ Không dùng magic numbers (dùng constants)
- ✅ Test build trước khi commit

### Trước khi Commit:
```bash
npm run build        # Đảm bảo build thành công
npm run lint         # Kiểm tra linting
# Kiểm tra TypeScript errors trong IDE
```

---

## 🎨 Loading Components

### Reusable Loading Spinners:

**LoadingSpinner** (Tổng quát)
```tsx
import LoadingSpinner from '@/components/common/LoadingSpinner'

<LoadingSpinner 
  text="Loading..." 
  size="medium"  // 'small' | 'medium' | 'large'
  className="custom-class"
/>
```

**VideoLoadingSpinner** (Cho video routes)
```tsx
import VideoLoadingSpinner from '@/components/video/VideoLoadingSpinner'

<VideoLoadingSpinner />
// Hiển thị: "Loading videos..." với medium size
```

**NavbarLoadingSpinner** (Cho navbar buttons)
```tsx
import NavbarLoadingSpinner from '@/components/common/NavbarLoadingSpinner'

<NavbarLoadingSpinner text="Loading..." />
// Compact design cho navbar
```

### Animation:
- 3 vòng tròn xoay với màu gradient xanh (#0051CB → #4A90E2 → #7FB3FF)
- Pulse animation cho text
- Smooth transitions
- Responsive design

---

## 🔗 Links Hữu ích

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Guidelines](https://sass-guidelin.es/)

---

## 📞 Hỗ trợ

Câu hỏi về:
- **Kiến trúc & Patterns**: Xem code examples trong `src/components/`
- **Performance**: Kiểm tra build output và bundle analyzer
- **Cấu trúc Project**: Xem folder structure trong `src/`
- **Tính năng Video**: Xem implementation trong `src/app/video/` và `src/components/video/`

---

**Bảo trì bởi**: IIP Development Team  
**License**: Private  
**Version**: 0.1.0
