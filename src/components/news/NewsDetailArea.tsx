"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllNews } from "@/data-iip/NewsDataMultilang";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  content?: string[];
  images?: string[];
  likes?: number;
  comments?: number;
}

interface Comment {
  id: number;
  user: string;
  content: string;
  date: string;
  likes: number;
}

const NewsDetailArea = ({ newsItem }: { newsItem: NewsItem }) => {
  const { currentLang } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "User1",
      content: "Perfect for watching",
      date: "11/10/2025",
      likes: 2,
    },
    {
      id: 2,
      user: "User1",
      content: "Perfect for watching",
      date: "11/10/2025",
      likes: 2,
    },
  ]);

  // Get related news (exclude current) - Show only 3 cards
  const allNews = getAllNews(currentLang);
  const filteredNews = allNews.filter((item) => item.id !== newsItem.id);
  
  // Get 3 related news items
  const relatedNews = filteredNews.slice(0, 3);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        user: "User" + (comments.length + 1),
        content: commentText,
        date: new Date().toLocaleDateString("vi-VN"),
        likes: 0,
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="news-detail-area">
      {/* Back button */}
      <div className="back-button-wrapper">
        <Link href="/news" className="back-button">
          <i className="bi bi-arrow-left"></i>
        </Link>
      </div>
      
      {/* Title */}
      <div className="news-detail-header">
        <h1 className="news-detail-title">{newsItem.title}</h1>
      </div>

      {/* Excerpt */}
      {newsItem.excerpt && (
        <p className="news-detail-excerpt">{newsItem.excerpt}</p>
      )}

      {/* Action buttons */}
      <div className="news-detail-actions">
        <button 
          className={`action-btn ${liked ? "active" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
          <span>{newsItem.likes || 24}</span>
        </button>
        <button className="action-btn">
          <i className="bi bi-chat"></i>
          <span>{newsItem.comments || 3}</span>
        </button>
        <button className="action-btn">
          <i className="bi bi-share"></i>
        </button>
        <button 
          className={`action-btn ${bookmarked ? "active" : ""}`}
          onClick={() => setBookmarked(!bookmarked)}
        >
          <i className={`bi ${bookmarked ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
        </button>
      </div>

      {/* Main image */}
      {newsItem.images && newsItem.images[0] && (
        <div className="news-detail-image">
          <Image
            src={newsItem.images[0]}
            alt={newsItem.title}
            width={1088}
            height={481}
            style={{ width: "100%", height: "auto" }}
          />
          <p className="image-caption">Phối cảnh Khu công nghiệp Hải Long</p>
        </div>
      )}

      {/* Content paragraphs */}
      {newsItem.content && (
        <div className="news-detail-content">
          {newsItem.content.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              
              {/* Second image after second paragraph */}
              {index === 1 && newsItem.images && newsItem.images[1] && (
                <div className="news-detail-image">
                  <Image
                    src={newsItem.images[1]}
                    alt={newsItem.title}
                    width={1088}
                    height={481}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <p className="image-caption">Phối cảnh Khu công nghiệp Hải Long</p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Comments section */}
      <div className="news-detail-comments">
        <h2 className="comments-title">{getTranslation(currentLang, 'news.comments')}</h2>
        <div className="comments-divider"></div>

        {/* Comment list */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar"></div>
              <div className="comment-content">
                <h3 className="comment-user">{comment.user}</h3>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-meta">
                  <span className="comment-date">{comment.date}</span>
                  <button className="comment-reply">
                    {getTranslation(currentLang, 'news.reply')}
                  </button>
                </div>
              </div>
              <div className="comment-actions">
                <button className="comment-like">
                  <i className="bi bi-heart"></i>
                  <span>{comment.likes}</span>
                </button>
                <button className="comment-menu">
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="comment-input-wrapper">
          <input
            type="text"
            className="comment-input"
            placeholder={getTranslation(currentLang, 'news.writeComment')}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
          />
          <button className="comment-submit" onClick={handleCommentSubmit}>
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>

      {/* Related news */}
      <div className="related-news-section">
        <h2 className="related-news-title">{getTranslation(currentLang, 'news.relatedNews')}</h2>
        <div className="related-news-grid">
          {relatedNews.map((item) => (
            <Link href={`/news/read/${item.id}`} key={item.id} className="related-news-card">
              <div className="related-news-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={318}
                  height={179}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="related-news-info">
                <span className="related-news-category">{item.category}</span>
                <h3 className="related-news-title-text">{item.title}</h3>
                <div className="related-news-footer">
                  <span className="related-news-date">{item.date}</span>
                  <button className="related-news-bookmark">
                    <i className="bi bi-bookmark"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailArea;
