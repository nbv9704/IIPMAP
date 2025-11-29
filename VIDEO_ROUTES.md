# 📹 Cấu trúc Routes Video

## 🗺️ Routes mới

### 1. Trang danh sách video
```
/video
```
- Hiển thị danh sách tất cả video
- Có sidebar để filter theo sections

### 2. Các sections cố định
```
/video/explore        → Khám phá
/video/saved          → Video đã lưu
/video/following      → Đang theo dõi
/video/notifications  → Thông báo
/video/messages       → Tin nhắn
```
- Các routes này có **ưu tiên cao hơn** dynamic route `[userId]`
- Next.js sẽ match các routes tĩnh trước khi match dynamic routes

### 3. Profile người dùng
```
/video/[userId]
```
**Ví dụ:** `/video/@kcn_tien`

- `userId` có format: `@username` (bắt đầu bằng @)
- Username **tối đa 10 ký tự** (không tính @)
- Chỉ chứa: chữ cái, số, dấu gạch dưới (_)
- Hiển thị profile và tất cả video của user đó
- Thông tin: avatar, tên, bio, số followers, số video

### 3. Xem chi tiết video
```
/video/[userId]/view/[postId]
```
**Ví dụ:** `/video/@kcn_tien/view/12345678901234567890`

- `userId`: Username của người đăng video (tối đa 10 ký tự sau @)
- `postId`: Chuỗi 20 ký tự số duy nhất
- Giao diện xem video giống TikTok
- Có nút prev/next để chuyển video

## 🔑 UserId Format

### Quy tắc:
- **Bắt đầu**: Phải có ký tự `@`
- **Độ dài**: Tối đa 10 ký tự (không tính @)
- **Ký tự**: Chỉ chứa chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_)
- **Unique**: Không trùng lặp trong hệ thống

### Ví dụ hợp lệ:
```
@kcn_tien      ✅ (9 ký tự)
@vsip_hp       ✅ (7 ký tự)
@user123       ✅ (7 ký tự)
@my_company    ✅ (10 ký tự)
```

### Ví dụ không hợp lệ:
```
@kcn_tien_son_bac_ninh  ❌ (quá 10 ký tự)
kcn_tien                ❌ (thiếu @)
@kcn-tien               ❌ (có dấu gạch ngang)
@kcn tien               ❌ (có khoảng trắng)
@                       ❌ (không có username)
```

### Validate UserId:
```typescript
import { isValidUserId, formatToUserId } from '@/utils/userIdValidator'

// Validate
isValidUserId('@kcn_tien') // true
isValidUserId('@kcn_tien_son_bac_ninh') // false (quá 10 ký tự)
isValidUserId('kcn_tien') // false (thiếu @)

// Format tên thành userId
formatToUserId('KCN Tiên Sơn Bắc Ninh') // '@kcn_tien_s'
formatToUserId('VSIP Hải Phòng') // '@vsip_hai_p'
```

## 🔑 PostId Format

### Quy tắc:
- **Độ dài**: Đúng 20 ký tự
- **Ký tự**: Chỉ chứa số (0-9)
- **Unique**: Không trùng lặp trong hệ thống

### Ví dụ:
```
12345678901234567890
98765432109876543210
11111111112222222222
```

### Generate PostId:
```typescript
import { generatePostId, generateUniquePostId } from '@/utils/postIdGenerator'

// Generate random postId
const postId = generatePostId()
// => "12345678901234567890"

// Generate unique postId (check với existing IDs)
const existingIds = new Set(['12345678901234567890'])
const uniquePostId = generateUniquePostId(existingIds)
// => "98765432109876543210"
```

## 📝 Validate PostId:
```typescript
import { isValidPostId } from '@/utils/postIdGenerator'

isValidPostId('12345678901234567890') // true
isValidPostId('123') // false (không đủ 20 ký tự)
isValidPostId('1234567890abcdefghij') // false (có chữ cái)
```

## 🎯 Luồng hoạt động

### Khi người dùng đăng video:
1. Frontend gọi API tạo video
2. Backend generate `postId` (20 ký tự số)
3. Backend check `postId` có tồn tại chưa
4. Nếu tồn tại → generate lại
5. Nếu unique → lưu vào database
6. Return `postId` cho frontend

### Khi người dùng xem video:
1. Click vào video card
2. Navigate đến `/video/[userId]/view/[postId]`
3. Frontend fetch video data từ API bằng `postId`
4. Hiển thị video player + actions

### Khi người dùng xem profile:
1. Click vào avatar/username
2. Navigate đến `/video/[userId]`
3. Frontend fetch user profile + videos
4. Hiển thị grid videos của user

## 🔧 Backend Integration (TODO)

### API Endpoints cần có:

#### 1. Tạo video mới
```
POST /api/videos
Body: {
  userId: string
  title: string
  videoUrl: string
  thumbnail: string
  ...
}
Response: {
  postId: string (20 ký tự số)
  ...
}
```

#### 2. Lấy thông tin video
```
GET /api/videos/:postId
Response: {
  postId: string
  userId: string
  title: string
  videoUrl: string
  likes: number
  comments: number
  ...
}
```

#### 3. Lấy profile user
```
GET /api/users/:userId
Response: {
  userId: string
  displayName: string
  avatar: string
  followers: number
  totalVideos: number
  ...
}
```

#### 4. Lấy videos của user
```
GET /api/users/:userId/videos
Response: {
  videos: VideoPost[]
  total: number
  page: number
  ...
}
```

## 📦 Types đã định nghĩa

```typescript
// src/types/video.types.ts

interface VideoPost {
  postId: string          // 20 ký tự số
  userId: string          // @username
  title: string
  description?: string
  videoUrl: string
  thumbnail: string
  duration: string
  views: number
  likes: number
  comments: number
  shares: number
  createdAt: Date
  updatedAt: Date
}

interface UserProfile {
  userId: string          // @username
  displayName: string     // Tên hiển thị
  avatar?: string
  bio?: string
  followers: number
  following: number
  totalVideos: number
  totalLikes: number
}
```

## 🚀 Migration từ routes cũ

### Routes cũ (đã xóa):
```
/video/[section]              → Xóa
/video/[section]/[videoId]    → Xóa
```

### Routes mới:
```
/video                        → Giữ nguyên
/video/[userId]               → Mới (thay thế profile)
/video/[userId]/view/[postId] → Mới (thay thế video detail)
```

## ⚠️ Lưu ý

1. **PostId phải unique**: Backend cần check trước khi lưu
2. **UserId format**: Luôn bắt đầu bằng `@`
3. **Link cũ**: Cần redirect từ routes cũ sang routes mới (nếu có)
4. **SEO**: Cân nhắc thêm slug vào URL cho SEO tốt hơn
   - Ví dụ: `/video/@kcn_tien_son/view/12345678901234567890/khu-cong-nghiep-tien-son`

## 🔗 Related Files

- Routes: `src/app/video/[userId]/`
- Components: `src/components/video/`
- Utils: 
  - `src/utils/postIdGenerator.ts` - Generate & validate postId
  - `src/utils/userIdValidator.ts` - Validate & format userId
- Types: `src/types/video.types.ts`
