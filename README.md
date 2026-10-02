# 🛒 FreshCart — E-Commerce Platform

FreshCart is a modern **full-featured e-commerce web application** built with **Next.js**.  
The project provides a complete shopping experience including product browsing, categories, brands, cart management, wishlist, authentication, and order management.

The application is built with a focus on **responsive UI, reusable components, clean architecture, and efficient data fetching**.

---

## 🚀 Live Demo

🔗 **Live Demo:** Coming Soon

---

## 📸 Screenshots

### 🏠 Home Page

> Add your homepage screenshot here.

### 🛍️ Products

> Add your products page screenshot here.

### 🛒 Cart

> Add your cart screenshot here.

### ❤️ Wishlist

> Add your wishlist screenshot here.

---

## ✨ Features

### 👤 Authentication
- User registration and login
- Protected routes
- Authentication state management
- Secure token-based authentication

### 🛍️ Products
- Browse all products
- Product details
- Product search
- Product filtering
- Product pagination
- Browse products by category
- Browse products by brand

### 🛒 Shopping Cart
- Add products to cart
- Remove products from cart
- Update product quantities
- View cart details
- Calculate cart totals

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View wishlist products

### 📦 Orders
- Create orders
- Cash on delivery checkout
- View user orders
- Order details

### 🎨 UI & UX
- Responsive design
- Mobile-friendly interface
- Reusable UI components
- Loading states
- Error handling
- Not Found page
- Toast notifications

---

## 🛠️ Technologies & Tools

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod**

### State & Data Management

- **TanStack Query**
- **Next.js Server & Client Components**

### UI & Icons

- **Tabler Icons**
- **Sonner**

### API

The application consumes the **RouteMisr E-Commerce API** for products, categories, brands, authentication, cart, wishlist, and orders.

---

## 📂 Project Structure

```text
freshcart/
│
├── app/
│   ├── (pages)/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── _components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   └── ...
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

> The exact structure may vary depending on the current project implementation.

---

## 🔐 Authentication Flow

FreshCart uses authentication to protect user-specific features.

```text
User
 │
 ├── Register
 │      ↓
 │   Account Created
 │
 └── Login
        ↓
   Authentication Token
        ↓
 ┌──────┴─────────┐
 ↓                ↓
Cart           Wishlist
 ↓                ↓
Orders         User Data
```

Protected functionality includes:

- Cart
- Wishlist
- Checkout
- Orders
- User-specific data

---

## 🔄 Application Flow

```text
                 FreshCart
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    Products     Categories     Brands
        │            │            │
        └────────────┼────────────┘
                     ↓
              Product Details
                     │
              ┌──────┴──────┐
              ↓             ↓
            Cart         Wishlist
              │
              ↓
           Checkout
              │
              ↓
            Order
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Navigate to the project

```bash
cd freshcart
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory if your current implementation requires environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

> Never commit sensitive API keys, tokens, or credentials to GitHub.

---

## 📦 Build for Production

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 🌐 Deployment

The project can be deployed using platforms that support Next.js, such as:

- Vercel
- GitHub Pages for static-export compatible versions

For GitHub Pages, the project needs to be configured for **static export**, and features that require a Next.js server runtime must be handled accordingly.

---

## 🎯 Project Goals

The main goals of FreshCart are:

- Build a complete modern e-commerce experience.
- Practice building scalable Next.js applications.
- Work with external REST APIs.
- Implement authentication and protected routes.
- Build reusable React components.
- Handle server and client-side rendering.
- Implement efficient data fetching and caching.
- Create responsive interfaces for different screen sizes.

---

## 🧠 What I Learned

Through this project, I practiced:

- Building applications with **Next.js App Router**
- Working with **Server and Client Components**
- TypeScript in React applications
- API integration and error handling
- Authentication and protected routes
- Form validation using **React Hook Form + Zod**
- Server-side and client-side data fetching
- Managing asynchronous application state
- Building reusable UI components
- Responsive design with Tailwind CSS
- E-commerce application architecture

---

## 📌 Future Improvements

Possible future improvements include:

- [ ] Add advanced product filtering
- [ ] Improve search functionality
- [ ] Add product reviews and ratings
- [ ] Add user profile management
- [ ] Add payment gateway integration
- [ ] Add order tracking
- [ ] Improve accessibility
- [ ] Add automated testing
- [ ] Improve performance and caching

---

## 👨‍💻 Author

**Seif Amr**

Computer Science Student & Full-Stack Developer

### Technologies

```text
Next.js • React • TypeScript • Node.js • Express.js
MongoDB • Tailwind CSS • REST APIs
```

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project was created for educational and portfolio purposes.