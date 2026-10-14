# Smart Food Rescue - Smart Food Waste Reduction and Donation Platform

Rescue Food. Reduce Waste. Feed Communities. Connect surplus food with NGOs and communities through smarter food donation, coordinated delivery, and transparent tracking.

## 🚀 Features
- **Four Role-Based Dashboards**: Food Donor, NGO, Delivery Volunteer, and Administrator.
- **Smart NGO & Volunteer Matching**: Rule-based matching based on location, food category, and quantity.
- **Food Urgency Indicator**: Live tracking of preparation dates, best-before timelines, and safety criteria.
- **Complete End-to-End Workflow**: Donation creation -> NGO request -> Volunteer assignment -> Delivery -> Receipt confirmation.
- **Database-Ready Architecture**: Clean service layer (`services/`) ready to plug into a Java Spring Boot backend via REST APIs.
- **Local Storage Demo Mode**: Fully working frontend prototype with seeded demo records.

## 🛠️ Technology Stack
- React 18 & Vite
- React Router DOM v6
- Tailwind CSS
- Lucide React Icons

---

## 📂 Project Folder Structure
```text
smart-food-donation-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── dashboard/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── donor/
│   │   ├── ngo/
│   │   ├── public/
│   │   └── volunteer/
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── donationService.js
│   │   ├── ngoService.js
│   │   ├── volunteerService.js
│   │   └── adminService.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.config.json (or vercel.json)
└── README.md
```

---

## ⚙️ Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Visual Studio Code**

---

## 📥 How to Run Locally in VS Code

1. **Extract the ZIP file** on your computer.
2. Open **Visual Studio Code**, go to **File > Open Folder...**, and select the extracted `smart-food-donation-platform` folder.
3. Open the VS Code integrated terminal (`Ctrl + \`` or `View > Terminal`).
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the local development server:
   ```bash
   npm run dev
   ```
6. Open the local URL shown in your terminal (typically `http://localhost:3000`).

---

## 👥 Demo Accounts & Credentials

You can log in directly using any of the pre-configured demo accounts or register a new one:

1. **Food Donor**: `donor@demo.com` / `password123`
2. **NGO Representative**: `ngo@demo.com` / `password123`
3. **Delivery Volunteer**: `volunteer@demo.com` / `password123`
4. **Administrator**: `admin@demo.com` / `password123`

To reset all demo data back to initial state, click the **"Reset Demo Data"** button in any dashboard or call `resetDemoData()` from the app header.

---

## 🌐 How to Push to GitHub

1. Initialize a Git repository in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart Food Rescue frontend"
   ```
2. Create a new repository on [GitHub](https://github.com/).
3. Link your local repository to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smart-food-donation-platform.git
   git push -u origin main
   ```

---

## 🚀 How to Deploy on Vercel

1. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New... > Project**.
3. Import your `smart-food-donation-platform` GitHub repository.
4. Vercel will automatically detect **Vite** as the framework and set the build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build and host your web application instantly!

---

## 🔌 Connecting to Java Spring Boot Backend

The application is built with a decoupled service architecture (`src/services/`). 
1. Copy `.env.example` to `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_ENABLE_DEMO_MODE=false
   ```
2. Update `src/services/` modules (e.g., `donationService.js`) to switch from LocalStorage mock calls to `fetch` / `axios` calls pointing to your Spring Boot REST controllers (`/api/donations`, `/api/ngos`, `/api/volunteers`, `/api/auth`).
