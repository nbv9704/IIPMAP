import HeaderIIP from "@/layouts/headers/HeaderIIP"
import FooterIIP from "@/layouts/footers/FooterIIP"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <>
      <HeaderIIP />
      <div className="error-page pt-200 pb-200">
        <div className="container">
          <div className="text-center">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">Trang không tồn tại</h2>
            <p className="text-muted mb-4">Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
            <Link href="/" className="btn btn-primary btn-lg">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      <FooterIIP />
    </>
  )
}
