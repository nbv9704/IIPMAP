'use client';

import { useParams } from 'next/navigation';
import Wrapper from '@/layouts/Wrapper';
import VideoSidebar from '@/components/video/VideoSidebar';
import '@/styles/video.scss';

export default function VideoDetailV2Client() {
  // ============================================
  // GET PARAMS
  // ============================================
  const params = useParams();
  const userId = params.userId as string;
  const postId = params.postId as string;

  return (
    <Wrapper>
      <div className="video-page">
        {/* ============================================ */}
        {/* SIDEBAR - Navigation menu bên trái */}
        {/* ============================================ */}
        <VideoSidebar activeSlug="video" />

        {/* ============================================ */}
        {/* MAIN CONTENT - Video Detail V2 */}
        {/* ============================================ */}
        <div className="video-main-v2">
          <div className="video-detail-v2">
            {/* ============================================ */}
            {/* VIDEO PLAYER SECTION */}
            {/* ============================================ */}
            <div className="video-player-section-v2">
              <div className="video-player-wrapper-v2">
                <video
                  className="video-player-v2"
                  controls
                  poster="/assets/images/video-thumbnail.jpg"
                >
                  <source src="/assets/videos/sample.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* ============================================ */}
            {/* VIDEO INFO SECTION */}
            {/* ============================================ */}
            <div className="video-info-section-v2">
              <div className="video-info-container-v2">
                {/* ========== Title and Stats ========== */}
                <div className="video-header-v2">
                <h1 className="video-title-v2">
                  Tiêu đề video mẫu - Giao diện 2.0
                </h1>
                <div className="video-stats-v2">
                  <span className="stat-item-v2">
                    <i className="fas fa-eye"></i> 1.2K views
                  </span>
                  <span className="stat-item-v2">
                    <i className="fas fa-calendar"></i> 2 days ago
                  </span>
                </div>
              </div>

                {/* ========== Author Info ========== */}
                <div className="video-author-v2">
                <div className="author-avatar-v2">
                  <img src="/assets/images/avatar-placeholder.png" alt="Author" />
                </div>
                <div className="author-info-v2">
                  <h3 className="author-name-v2">Tên tác giả</h3>
                  <p className="author-followers-v2">1.5K followers</p>
                </div>
                <button className="follow-btn-v2">
                  <i className="fas fa-plus"></i> Follow
                </button>
              </div>

                {/* ========== Action Buttons ========== */}
                <div className="video-actions-v2">
                <button className="action-btn-v2 like-btn-v2">
                  <i className="fas fa-thumbs-up"></i>
                  <span>245</span>
                </button>
                <button className="action-btn-v2 dislike-btn-v2">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <button className="action-btn-v2 comment-btn-v2">
                  <i className="fas fa-comment"></i>
                  <span>48</span>
                </button>
                <button className="action-btn-v2 share-btn-v2">
                  <i className="fas fa-share"></i>
                  <span>Share</span>
                </button>
                <button className="action-btn-v2 save-btn-v2">
                  <i className="fas fa-bookmark"></i>
                  <span>Save</span>
                </button>
              </div>

                {/* ========== Description ========== */}
                <div className="video-description-v2">
                <h3 className="description-title-v2">Description</h3>
                <p className="description-text-v2">
                  Đây là mô tả video mẫu cho giao diện 2.0. 
                  Nội dung sẽ được cập nhật sau khi có thiết kế chi tiết từ sếp.
                </p>
              </div>

                {/* ========== Tags ========== */}
                <div className="video-tags-v2">
                <span className="tag-v2">#technology</span>
                <span className="tag-v2">#innovation</span>
                <span className="tag-v2">#business</span>
              </div>
            </div>
          </div>

            {/* ============================================ */}
            {/* COMMENTS SECTION */}
            {/* ============================================ */}
            <div className="comments-section-v2">
              <div className="comments-container-v2">
                <h3 className="comments-title-v2">48 Comments</h3>

                {/* ========== Comment Input ========== */}
                <div className="comment-input-wrapper-v2">
                <div className="comment-avatar-v2">
                  <img src="/assets/images/avatar-placeholder.png" alt="You" />
                </div>
                <input
                  type="text"
                  className="comment-input-v2"
                  placeholder="Add a comment..."
                />
                <button className="comment-submit-v2">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>

                {/* ========== Comments List ========== */}
                <div className="comments-list-v2">
                  {/* Sample Comment */}
                  <div className="comment-item-v2">
                  <div className="comment-avatar-v2">
                    <img src="/assets/images/avatar-placeholder.png" alt="User" />
                  </div>
                  <div className="comment-content-v2">
                    <div className="comment-header-v2">
                      <span className="comment-author-v2">User Name</span>
                      <span className="comment-time-v2">2 hours ago</span>
                    </div>
                    <p className="comment-text-v2">
                      This is a sample comment for the new design.
                    </p>
                    <div className="comment-actions-v2">
                      <button className="comment-action-v2">
                        <i className="fas fa-thumbs-up"></i> 12
                      </button>
                      <button className="comment-action-v2">
                        <i className="fas fa-reply"></i> Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* ============================================ */}
            {/* RELATED VIDEOS SECTION */}
            {/* ============================================ */}
            <div className="related-videos-section-v2">
              <h3 className="related-title-v2">Related Videos</h3>
              <div className="related-videos-grid-v2">
                {/* Loop through related videos */}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="related-video-card-v2">
                  <div className="related-video-thumbnail-v2">
                    <img src="/assets/images/video-thumbnail.jpg" alt="Video" />
                    <span className="video-duration-v2">10:24</span>
                  </div>
                  <div className="related-video-info-v2">
                    <h4 className="related-video-title-v2">
                      Related Video Title {item}
                    </h4>
                    <p className="related-video-author-v2">Author Name</p>
                    <p className="related-video-stats-v2">
                      1.2K views • 2 days ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
}
