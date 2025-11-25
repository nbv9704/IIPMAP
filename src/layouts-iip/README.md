# IIP Components - Test Folder

Folder này chứa các components mới cho dự án IIP, được thiết kế theo Figma design.

## 📁 Cấu trúc:

```
layouts-iip/
├── headers/
│   ├── HeaderIIP.tsx       # Header component chính
│   └── NavMenuIIP.tsx      # Navigation menu
└── footers/
    └── FooterIIP.tsx       # Footer component

data-iip/
├── MenuDataIIP.ts          # Menu items data
└── FooterDataIIP.ts        # Footer links data

styles-iip/
├── variables-iip.scss      # Colors, fonts, spacing
├── header-iip.scss         # Header styles
├── footer-iip.scss         # Footer styles
└── index.scss              # Main import file
```

## 🚀 Cách test:

1. **Chạy dev server:**
   ```bash
   cd IPPMAPAI/iip-map-ui
   npm run dev
   ```

2. **Mở trang test:**
   ```
   http://localhost:3000/test-iip
   ```

3. **Test responsive:**
   - Desktop: Xem full menu
   - Mobile: Click hamburger menu
   - Test language switcher
   - Test sticky header (scroll xuống)

## ✨ Features:

### Header:
- ✅ Logo (trái)
- ✅ Menu giữa: Trang chủ, Tin mua bán, Video, Tin tức, Dịch vụ, Liên hệ, Đặt lịch
- ✅ Language switcher (5 ngôn ngữ)
- ✅ Button "Đăng nhập" với gradient
- ✅ Sticky header
- ✅ Mobile hamburger menu
- ✅ Responsive

### Footer:
- ✅ Logo lớn "IIPMap.AI"
- ✅ 4 cột: Hệ sinh thái, Địa chỉ, Liên lạc, Mạng xã hội
- ✅ Background xanh (#0051CB)
- ✅ Responsive grid
- ✅ Copyright

## 🎨 Design System:

### Colors:
- Primary: `#0051CB`
- Gradient: `linear-gradient(95.81deg, #0149BE 1.22%, #810CC4 100%)`
- White: `#FFFFFF`
- Black: `#000000`

### Typography:
- Font: Montserrat
- Weights: 400, 500, 600, 700, 800

### Spacing:
- Small: 10px
- Medium: 20px
- Large: 40px

## 📝 Cần làm tiếp:

1. [ ] Thay logo thật (file: `HeaderIIP.tsx` line 10)
2. [ ] Test trên mobile/tablet thật
3. [ ] Điều chỉnh spacing nếu cần
4. [ ] Thêm animations (optional)
5. [ ] Kiểm tra accessibility

## 🔄 Khi OK, merge vào main:

1. Copy components từ `layouts-iip/` sang `layouts/`
2. Copy data từ `data-iip/` sang `data/`
3. Import styles vào `src/styles/index.scss`:
   ```scss
   @import './styles-iip/index.scss';
   ```
4. Thay `HeaderOne` và `FooterOne` bằng `HeaderIIP` và `FooterIIP`

## 🐛 Issues?

Nếu có lỗi, check:
1. Import paths đúng chưa
2. SCSS có compile không
3. Console có errors không
4. Responsive breakpoints

---

Made with ❤️ for IIP Project
