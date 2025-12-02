// ============================================
// COMPONENT: ContactButtons
// ============================================
"use client"

const ContactButtons = () => {
   // ========== Render ==========
   return (
      <div className="contact-buttons-wrapper">
         {/* Email Button */}
         <button className="contact-btn email-btn" type="button">
            <span>Email</span>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
               <rect x="0.5" y="0.5" width="16" height="11" rx="1" stroke="#EBF5FF"/>
               <path d="M1 1L8.5 6L16 1" stroke="#EBF5FF"/>
            </svg>
         </button>

         {/* Schedule Survey Button */}
         <button className="contact-btn schedule-btn" type="button">
            <span>Đặt lịch khảo sát</span>
            <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
               <rect x="0.5" y="2.5" width="14" height="10" rx="1" stroke="#000"/>
               <line x1="4" y1="0" x2="4" y2="4" stroke="#000" strokeWidth="1"/>
               <line x1="11" y1="0" x2="11" y2="4" stroke="#000" strokeWidth="1"/>
               <line x1="0" y1="5" x2="15" y2="5" stroke="#000" strokeWidth="1"/>
            </svg>
         </button>

         {/* Chat Button */}
         <button className="contact-btn chat-btn" type="button">
            <span>Chat</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
               <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#000"/>
               <path d="M4 12L8 15L12 12" stroke="#000"/>
            </svg>
         </button>

         {/* Call Button */}
         <button className="contact-btn call-btn" type="button">
            <span>Call</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
               <path 
                  d="M2 1C2 1 3 1 4 2C5 3 5.5 4 5 5C4.5 6 5 7 6 8C7 9 8 9.5 9 9C10 8.5 11 9 12 10C13 11 13 12 13 12C13 13 11 15 9 15C5 15 1 11 1 7C1 5 2 3 2 1Z" 
                  stroke="#000"
               />
            </svg>
         </button>
      </div>
   )
}

export default ContactButtons
