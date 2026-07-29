
# 🚀 Gymetix Server



Backend API for **Gymetix**, a full-stack Fitness & Gym Management Platform. This server provides secure authentication, role-based authorization, payment processing, database management, and RESTful APIs for users, trainers, administrators, classes, bookings, favorites, trainer applications, forum posts, and transactions.



---



# 🌐 Live API



- **API URL:** [[https://gymetix-server.vercel.app/]]

- **Client Repository:** [https://github.com/Asraful-Alam-Sifat/GYMETIX-Client]

- **Server Repository:** [https://github.com/Asraful-Alam-Sifat/GYMETIX-Server]



---



# ✨ Backend Features



## 🔐 Authentication & Authorization



- Better Auth authentication

- Email & Password login

- Google OAuth

- JWT Authentication

- Protected API routes

- Role-based authorization (User, Trainer, Admin)

- Session validation



---



## 👤 User Management



- User registration

- User login

- Get current user profile

- Update user profile

- Block / Unblock users

- Promote users to Admin

- Trainer role management



---



## 🏋️ Fitness Classes



- Create classes

- Update classes

- Delete classes

- Get all approved classes

- Search classes

- Filter classes by category

- Pagination support

- Class approval workflow

- Trainer-specific class management



---



## 📅 Bookings



- Secure booking system

- Duplicate booking prevention

- Booking history

- User booking statistics

- Trainer enrolled students

- Stripe payment verification



---



## ❤️ Favorites



- Add favorite class

- Remove favorite class

- Duplicate favorite prevention

- Get user favorites



---



## 📝 Trainer Applications



- Submit trainer application

- Pending review system

- Approve trainer

- Reject trainer

- Admin feedback support

- Trainer status tracking



---



## 💬 Community Forum



- Create forum posts

- Update forum posts

- Delete forum posts

- Get all posts

- Get single post

- Like posts

- Dislike posts

- Comment system

- Reply system

- Edit/Delete own comments

- Pagination support



---



## 💳 Stripe Payment



- Create checkout session

- Verify successful payment

- Save booking after payment

- Store transaction history



---



## 📊 Dashboard APIs



### User Dashboard



- Total booked classes

- Total favorite classes

- Trainer application status



### Trainer Dashboard



- Total classes

- Total enrolled students



### Admin Dashboard



- Total users

- Total trainers

- Total classes

- Total bookings

- Total payments



---



# 🛠️ Tech Stack



## Runtime



- Node.js



## Framework



- Next.js API Routes



## Database



- MongoDB Atlas



## Authentication



- Better Auth

- JWT



## Payment



- Stripe



## Image Hosting



- ImgBB



---



# 📂 API Modules



```text

/api

│

├── auth

├── users

├── classes

├── bookings

├── favorites

├── trainer-applications

├── forum

├── comments

├── payments

├── transactions

├── dashboard

└── admin

```


## 🗄️ Database Collections

- `users` — Account profiles, roles (`User`, `Trainer`, `Admin`), status.
- `classes` — Class details, schedules, trainer reference, approval status.
- `bookings` — Class reservation logs linked to payments.
- `favorites` — User-bookmarked class references.
- `forumPosts` — Community post content, likes/dislikes, author metadata.

---

## 🔒 Security Features

- **JWT Token Validation:** Encrypted session signatures.
- **Role-based Authorization:** Middleware guarding restricted endpoints.
- **Data Integrity Checks:** Validation algorithms preventing duplicate bookings or favorites.
- **Stripe Webhook Verification:** Secure server-to-server transaction verification.
- **Soft User Blocking:** Instant account suspension capability.

---

## 👨‍💻 Developer

**Asraful Alam**  
*Junior Frontend Developer*  
Passionate about building scalable full-stack applications using Next.js, MongoDB, Better Auth, Stripe, and modern web technologies.

---

## ⭐ Support

If you find this repository helpful, please consider giving it a star on [GitHub](https://github.com/Asraful-Alam-Sifat/GYMETIX-Server)
