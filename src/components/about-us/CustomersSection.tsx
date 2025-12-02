"use client"

// ============================================
// IMPORTS
// ============================================
import { CUSTOMER_DATA } from "@/constants"

// ============================================
// COMPONENT
// ============================================
function CustomersSection() {
  return (
    <section className="about-customers-section">
      <div className="container">
        <h2 className="section-title">Khách hàng</h2>
        <div className="customers-grid">
          {CUSTOMER_DATA.map((customer) => (
            <div key={customer.id} className="customer-card">
              <div className="customer-image">
                <div className="image-overlay"></div>
                <div className="customer-info">
                  <h3>{customer.title}</h3>
                  <ul>
                    {customer.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomersSection
