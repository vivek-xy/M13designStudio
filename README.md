# 🎨 M13 Design Studio – Premium Art & Decor Platform

M13 Design Studio is a modern, high-end E-commerce platform dedicated to handcrafted wall art, personalized masterpieces, and premium home decor. Built with **Next.js 15**, **Tailwind CSS v4**, and **Zustand**, it offers a seamless shopping experience for art lovers and a robust management suite for administrators.

---

## 🌟 Key Features

### 🛒 Storefront
- **Dynamic Product Discovery**: Browse art by category (Wall Art, Religious, Personalized, etc.) with advanced filtering by price range and sorting options.
- **Rich Product Details**: Interactive product pages featuring image zooming, variant selection (size/price), and custom personalization fields.
- **Persistent Cart & Wishlist**: Seamlessly manage items with a persistent side drawer cart and a dedicated wishlist, powered by Zustand.
- **Smart Checkout Flow**: A beautiful, multi-step checkout process with real-time summary updates and order placement simulation.
- **Fully Responsive**: A premium mobile-first design that looks stunning on desktops, tablets, and smartphones.

### 🛡️ Admin Dashboard
- **Real-time Analytics**: Interactive charts (Area, Bar, Pie) for tracking revenue trends, order volume, and category distribution.
- **Inventory Management**: Full control over the product catalog, including the ability to add, edit, or delete items.
- **Order Tracking**: Detailed order management system with status updates (Processing, Shipped, Delivered) and customer communication logs.
- **Content & Marketing**: Manage homepage banners, customer testimonials, and promotional coupon codes.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with Persistence)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Fonts**: Inter & Poppins (via Next Font)

---

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Pages & Layouts)
│   ├── admin/         # Management Dashboard
│   ├── shop/          # Product Listing & Filtering
│   ├── product/       # Dynamic Product Details
│   └── checkout/      # Multi-step Checkout Flow
├── components/        # Reusable UI Components
├── lib/               # Utilities, Store (Zustand), and Mock Data
└── styles/            # Global Styles (Tailwind v4 Layering)
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vivek-xy/M13designStudio.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📸 Preview

*Note: Add your screenshots here to showcase the stunning UI.*

---

## 🗺️ Roadmap
- [ ] Backend integration with Supabase/PostgreSQL.
- [ ] Real-time payment gateway integration (Stripe/Razorpay).
- [ ] User authentication with Clerk or NextAuth.
- [ ] AI-powered "View in my Room" AR feature.

---

## 📄 License
This project is licensed under the MIT License.

---

**Crafted with ❤️ by M13 Design Studio Team.**
