# 🧾 Invoice Gen - Professional Invoice Management System

<div align="center">

![Invoice Gen Banner](https://img.shields.io/badge/Invoice-Gen-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**A modern, full-stack invoice management system for freelancers and small businesses**

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

Invoice Gen is a comprehensive web and mobile application designed to streamline invoice creation, management, and distribution for freelancers, small business owners, and service providers. Say goodbye to complex accounting software and hello to simple, professional invoicing.

### ✨ Key Highlights

- 🎨 **Beautiful Templates** - Choose from multiple professional invoice templates
- 📄 **PDF Export** - Generate and download invoices as PDF with one click
- 📧 **Email Integration** - Send invoices directly to clients via email
- 🔐 **Secure Authentication** - Powered by Clerk for robust security
- ☁️ **Cloud Storage** - Template images stored securely on Cloudinary
- 📱 **Cross-Platform** - Web application + Android mobile app
- 💾 **Auto-Save** - Never lose your work with MongoDB persistence

---

## 🚀 Features

### Core Functionality
- ✅ **User Authentication** - Secure login and registration with Clerk
- ✅ **Invoice Creation** - Easy-to-use forms for creating professional invoices
- ✅ **Invoice Management** - Create, Read, Update, Delete (CRUD) operations
- ✅ **Template Selection** - Multiple professional invoice templates with live preview
- ✅ **PDF Export** - Generate high-quality PDF invoices using jsPDF & html2canvas
- ✅ **Email Delivery** - Send invoices with PDF attachments directly to clients
- ✅ **Invoice Dashboard** - View all your invoices in one organized place
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Additional Features
- 📊 Real-time calculation of subtotals, tax, and totals
- 🔍 Search and filter invoices
- 📋 Invoice status tracking (Draft, Sent, Paid)
- 🎯 Client information management
- 💼 Professional invoice numbering
- 🌐 Cloud-based template image storage

---

## 🎬 Demo

### Screenshots

<div align="center">

| Dashboard | Create Invoice | PDF Preview |
|-----------|----------------|-------------|
| ![Dashboard](https://via.placeholder.com/300x200?text=Dashboard) | ![Create](https://via.placeholder.com/300x200?text=Create+Invoice) | ![Preview](https://via.placeholder.com/300x200?text=PDF+Preview) |

</div>

### Live Demo
🔗 **[Try Invoice Gen Live](#)** *(Coming Soon)*

---

## 🛠️ Tech Stack

### Frontend (Web)
- **Framework:** React.js 18.x
- **UI Library:** Bootstrap 5.x
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect, useContext)
- **PDF Generation:** jsPDF + html2canvas
- **Build Tool:** npm/yarn

### Frontend (Mobile)
- **Language:** Kotlin
- **UI Framework:** Jetpack Compose
- **HTTP Client:** Retrofit
- **Local Database:** Room
- **Build Tool:** Gradle

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java 17
- **Database Driver:** Spring Data MongoDB
- **Email Service:** JavaMailSender
- **Build Tool:** Maven

### Database & Services
- **Database:** MongoDB 6.x
- **Authentication:** Clerk
- **Cloud Storage:** Cloudinary
- **Email:** SMTP (Gmail/SendGrid)

### Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Heroku
- **Database:** MongoDB Atlas
- **Mobile:** APK Distribution

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Java JDK** 17 or higher
- **Maven** 3.6+
- **MongoDB** 6.x or MongoDB Atlas account
- **Git**

### API Keys Required
- Clerk API Key (for authentication)
- Cloudinary API Key (for image storage)
- SMTP Credentials (for email sending)

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Desiigner101/INVOICE-GEN.git
cd INVOICE-GEN
```

### 2. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd invoice-generator-client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
# REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

### 3. Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd ../invoice-generator-backend

# Create application.properties
# src/main/resources/application.properties

# Add your configurations:
# spring.data.mongodb.uri=mongodb://localhost:27017/invoicedb
# clerk.secret-key=your_clerk_secret
# cloudinary.cloud-name=your_cloud_name
# cloudinary.api-key=your_api_key
# cloudinary.api-secret=your_api_secret
# spring.mail.username=your_email
# spring.mail.password=your_password

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will run on `http://localhost:8080`

### 4. Mobile Setup (Android)

```bash
# Navigate to mobile directory
cd ../invoice-generator-mobile

# Open in Android Studio
# Build and run on emulator or device
```

---

## 🎮 Usage

### Creating Your First Invoice

1. **Sign Up/Login**
   - Visit the application
   - Click "Sign Up" and create your account using Clerk
   - Or login if you already have an account

2. **Create Invoice**
   - Click "Create New Invoice" on the dashboard
   - Fill in client details (name, email, address)
   - Add invoice items (description, quantity, price)
   - Select a professional template
   - Preview your invoice

3. **Export & Send**
   - Click "Export as PDF" to download
   - Or click "Send via Email" to deliver directly to your client
   - Invoice is automatically saved to your dashboard

### Managing Invoices

- **View All Invoices:** Dashboard displays all your invoices
- **Edit Invoice:** Click on any invoice to edit details
- **Delete Invoice:** Remove outdated or incorrect invoices
- **Search & Filter:** Find invoices quickly by client name or status

---

## 🏗️ Project Structure

```
INVOICE-GEN/
├── invoice-generator-client/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── services/                 # API services
│   │   ├── utils/                    # Utility functions
│   │   └── App.js
│   └── package.json
│
├── invoice-generator-backend/         # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/invoicegen/
│   │   │   │       ├── controller/  # REST Controllers
│   │   │   │       ├── service/     # Business Logic
│   │   │   │       ├── repository/  # Data Access
│   │   │   │       ├── model/       # MongoDB Models
│   │   │   │       └── config/      # Configurations
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
└── invoice-generator-mobile/          # Android App (Kotlin)
    ├── app/
    │   └── src/
    │       ├── main/
    │       │   ├── java/            # Kotlin source
    │       │   └── res/             # Resources
    │       └── test/
    └── build.gradle
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Authentication
All endpoints require Clerk JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Invoices
```http
GET    /api/v1/invoices              # Get all invoices
GET    /api/v1/invoices/{id}         # Get invoice by ID
POST   /api/v1/invoices              # Create new invoice
PUT    /api/v1/invoices/{id}         # Update invoice
DELETE /api/v1/invoices/{id}         # Delete invoice
POST   /api/v1/invoices/{id}/send    # Send invoice via email
```

#### Users
```http
GET    /api/v1/users/profile         # Get user profile
POST   /api/v1/users/sync            # Sync user from Clerk (webhook)
```

### Example Request

```javascript
// Create Invoice
POST /api/v1/invoices
Content-Type: application/json
Authorization: Bearer <token>

{
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "invoiceItems": [
    {
      "description": "Web Design Services",
      "quantity": 1,
      "unitPrice": 1500.00
    }
  ],
  "totalAmount": 1500.00,
  "issueDate": "2026-02-01",
  "dueDate": "2026-03-01",
  "status": "draft"
}
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd invoice-generator-client
npm test
```

### Backend Tests
```bash
cd invoice-generator-backend
mvn test
```

### Integration Tests
```bash
mvn verify
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd invoice-generator-client
vercel --prod
```

### Backend (Railway)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Database (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update backend configuration

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Write clean, maintainable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Create detailed pull request descriptions

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue:

- **Bug Report:** [Create Bug Report](https://github.com/Desiigner101/INVOICE-GEN/issues/new?template=bug_report.md)
- **Feature Request:** [Request Feature](https://github.com/Desiigner101/INVOICE-GEN/issues/new?template=feature_request.md)

---

## 👨‍💻 Author

**Sarsonas, Kervin Gino M.**

- GitHub: [@Desiigner101](https://github.com/Desiigner101)
- Project: [Invoice Gen](https://github.com/Desiigner101/INVOICE-GEN)

---

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - Frontend framework
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Clerk](https://clerk.dev/) - Authentication
- [Cloudinary](https://cloudinary.com/) - Cloud storage
- [Bootstrap](https://getbootstrap.com/) - UI components
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) - HTML to canvas conversion

---

## 📞 Support

Need help? Feel free to:
- Open an [Issue](https://github.com/Desiigner101/INVOICE-GEN/issues)
- Start a [Discussion](https://github.com/Desiigner101/INVOICE-GEN/discussions)
- Contact: kervingino.sarsonas@cit.edu

---

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star! It helps others discover the project.

---

<div align="center">

**Made with ❤️ for freelancers and small businesses**

[⬆ Back to Top](#-invoice-gen---professional-invoice-management-system)

</div>
