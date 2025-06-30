# TodoTaskFlow ✨ - Your Personal Productivity Companion

Welcome to **TodoTaskFlow**, a sleek, modern, and feature-rich Todo application designed to help you organize your life with style and efficiency. This app isn't just about listing tasks; it's about providing a delightful user experience with thoughtful design, smooth animations, and powerful features.

---

### 🚀 Live Demo

Check out the fully deployed application here:

**[➡️ Click here to view the live app!](https://todo-task-flow-masterkartikey.vercel.app/)**

---

## 🌟 Core Features

TodoTaskFlow is packed with features designed for a seamless productivity experience:

*   **🔐 Secure Age Verification:** A beautiful landing page ensures users meet the minimum age requirement before they can access the app.
*   **👤 Persistent User Sessions:** Your user profile is saved locally, so you're automatically logged in on your next visit.
*   **✅ Full CRUD for Tasks:**
    *   **Create:** Easily add new tasks with a title, a detailed description, and a priority level (Low, Medium, High).
    *   **Read:** View your tasks in a clean, organized list.
    *   **Update:** Mark tasks as `Completed` or move them to the `Archived` section.
    *   **Search:** Instantly find tasks with a powerful, real-time search bar.
*   **🗂️ Smart Task Filtering:** Organize your view with three distinct tabs: `Todo`, `Completed`, and `Archived`, with live counts for each category.
*   **🎨 Dual-Theme UI:**
    *   **Light Neumorphic Theme:** A soft, clean, and modern UI with subtle shadows.
    *   **Dark Glassmorphic Theme:** A stunning, semi-transparent interface with a beautiful gradient background.
*   **📲 Fully Responsive Design:** The entire application is meticulously crafted to work flawlessly on any device, from a small smartphone to a large desktop monitor.
*   **☁️ API Integration:**
    *   On first use, the app fetches a set of initial demo tasks from the **DummyJSON API**.
    *   User avatars are dynamically generated based on the user's name using the **UI Avatars API**.
*   **📥/📤 Import & Export:** Save your tasks to a JSON file for backup or import them back into the app at any time.
*   **🔔 Toast Notifications:** Get instant, non-intrusive feedback when you update a task's status.

---

## 🛠️ Tech Stack

This project was built from the ground up using modern web standards, with a focus on clean, vanilla code. **No frameworks were used!**

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
*   **APIs:**
    *   [DummyJSON](https://dummyjson.com/) (for initial task data)
    *   [UI Avatars](https://ui-avatars.com/) (for profile pictures)
*   **Storage:** Browser `localStorage` for persisting user and task data.
*   **Styling:** Custom CSS with variables for easy theming and media queries for responsiveness.

---

## 📂 Code Structure

The codebase is organized into a modular and easy-to-understand structure, separating concerns for better maintainability.
```
.
├── 📄 index.html             // The main landing/verification page
├── 📄 app.html               // The core todo application page
│
├── 📁 css/
│ ├── 📄 base.css             // Global styles, resets, and theme variables
│ ├── 📄 app.css              // Styles for the main app layout, form, and filters
│ ├── 📄 landing.css          // Styles for the verification page
│ ├── 📄 header.css           // Styles for the app header
│ ├── 📄 card.css             // Styles for the individual task items
│ ├── 📄 buttons.css          // Base button styles
│ └── 📄 modal.css            // Styles for the modal component
│
└── 📁 js/
├── 📄 app.js                 // Main application logic for app.html
├── 📄 landing.js             // Logic for the age verification form on index.html
│
└── 📁 modules/               // Reusable ES6 modules
├── 📄 api.js                 // Handles all external API calls
├── 📄 auth.js                // Manages user validation and authentication
├── 📄 storage.js             // A wrapper for interacting with localStorage
├── 📄 ui.js                  // Controls all DOM manipulation and UI updates
├── 📄 config.js              // Central configuration (API URLs, etc.)
└── 📄 dragdrop.js            // Logic for drag-and-drop functionality
---
```
## 🚀 How to Run the Code Locally

Getting a local copy up and running is simple.

### Prerequisites

You just need a modern web browser and a local web server to handle the ES6 modules. The easiest way is to use the **Live Server** extension in Visual Studio Code.

### Step-by-Step Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/todotaskflow.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd todotaskflow
    ```

3.  **Launch a local server:**
    *   If you have **VS Code** with the **Live Server** extension, simply right-click `index.html` and choose `Open with Live Server`.


4.  **Open your browser** and navigate to the local address provided. You should see the landing page!

---

## 🏆 Bonus Features & UI/UX Highlights

This project goes beyond basic functionality with several "bonus" features that enhance the user experience:

*   **✨ Micro-interactions:** Smooth animations on button hovers, task item fade-ins, and focused input fields make the app feel alive and responsive.
*   **⌨️ Power-User Keyboard Shortcuts:**
    *   Press `/` to instantly focus the search bar.
    *   Press `Ctrl + Enter` to submit a new task without leaving the keyboard.
*   **🤔 Smart Form Inputs:** The date input on the landing page cleverly switches from `type="text"` to `type="date"` on focus, providing a placeholder and a native date picker.
*   **💪 Robust Error Handling:** The verification form provides clear, real-time error messages, and the app gracefully handles API failures without crashing.
*   **📱 Mobile-First Responsive Philosophy:** The design was built to be mobile-friendly from the start. On small screens:
    *   The header slims down, hiding text labels to save space.
    *   Task cards stack their content vertically for improved readability.
    *   Forms and buttons adapt to a single-column layout for easy tapping.
