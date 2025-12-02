# IIP Map UI

> Dự án Next.js 14 App Router với tối ưu SSR và kiến trúc clean code

**Trạng thái**: ✅ Sẵn sàng Production  
**Cập nhật**: 03/12/2025

---

## 📚 Danh mục Tài liệu

### 🌟 Tài liệu Chính (Đọc đầu tiên):

1. **[DESIGN_PATTERNS.md](./DESIGN_PATTERNS.md)** ⭐ **TÀI LIỆU CHÍNH**
   - Tổ chức code & kiến trúc
   - Component patterns & best practices
   - Hướng dẫn tối ưu performance (Mục 9)
   - Nguyên tắc clean code (Mục 8)
   - **Đọc tài liệu này cho mọi công việc phát triển**

2. **[README_OPTIMIZATION.md](./README_OPTIMIZATION.md)** 🚀
   - Hướng dẫn tối ưu nhanh
   - Tổng kết kết quả performance
   - Lệnh development
   - Checklist bảo trì

3. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** 📁
   - Cấu trúc project đầy đủ
   - Tổ chức file
   - Layout thư mục

### 📖 Tài liệu Tính năng:

4. **[VIDEO_ROUTES.md](./VIDEO_ROUTES.md)** 🎥
   - Cấu trúc routing video
   - URL patterns & navigation

5. **[VIDEO_DETAIL_V2_TIKTOK.md](./VIDEO_DETAIL_V2_TIKTOK.md)** 📱
   - Spec trang video detail
   - Layout kiểu TikTok

6. **[COMMENT_GUIDELINES.md](./COMMENT_GUIDELINES.md)** 💬
   - Chuẩn comment code
   - Style documentation

### 📊 Báo cáo Kỹ thuật:

7. **[FINAL_OPTIMIZATION_REPORT.md](./FINAL_OPTIMIZATION_REPORT.md)** 📈
   - Báo cáo tối ưu hoàn chỉnh
   - Metrics trước/sau
   - Tất cả thay đổi được ghi nhận

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
- ✅ Đã xóa 67 packages không dùng

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS + Tailwind CSS + Bootstrap
- **State**: Redux Toolkit
- **Icons**: React Icons + Lucide React
- **Forms**: React Hook Form + Yup
- **i18n**: Custom Language Context

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
1. Đọc [DESIGN_PATTERNS.md](./DESIGN_PATTERNS.md) - Đặc biệt Mục 8 & 9
2. Kiểm tra [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) để biết vị trí file
3. Tuân theo nguyên tắc clean code

### Khi Thêm Tính năng:
- ✅ Component < 200 dòng
- ✅ Dùng TypeScript strict mode
- ✅ Server Component mặc định
- ✅ Dùng next/image cho hình ảnh
- ✅ Dynamic import cho components nặng
- ✅ Không dùng magic numbers (dùng constants)
- ✅ Test build trước khi commit

### Trước khi Commit:
```bash
npm run build        # Đảm bảo build thành công
npm run lint         # Kiểm tra linting
# Kiểm tra TypeScript errors trong IDE
```

---

## 🔗 Links Hữu ích

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SCSS Guidelines](https://sass-guidelin.es/)

---

## 📞 Hỗ trợ

Câu hỏi về:
- **Kiến trúc & Patterns**: Xem [DESIGN_PATTERNS.md](./DESIGN_PATTERNS.md)
- **Performance**: Xem [README_OPTIMIZATION.md](./README_OPTIMIZATION.md)
- **Cấu trúc Project**: Xem [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Tính năng Video**: Xem [VIDEO_ROUTES.md](./VIDEO_ROUTES.md)

---

**Bảo trì bởi**: IIP Development Team  
**License**: Private  
**Version**: 0.1.0
