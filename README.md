# MENTOR MATCH

## Description

A Next.js application with MongoDB as the backend database for seamless data handling and storage, designed for matching mentors and students.

## Source Code

[Source Code](https://github.com/iamdk353/mentor-match)

## Deployed URL

[LIVE DEMO](https://mentor-match-smoky.vercel.app/)

## Technologies Used

- **Next.js** (13+ with App Router)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **Tailwind CSS** (Styling)
- **Clerk** (Authentication)
- **Vercel** (Deployment)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/iamdk353/mentor-match.git
```

### 2. Navigate to the project directory

```bash
cd mentor-match
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

#### Create a `.env.local` file in the root directory with the following:

[Clerk homepage](https://clerk.com/)

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=(login to Clerk to get this key)
CLERK_SECRET_KEY=(login to Clerk to get this key)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/
```

#### Create a `.env` file in the root directory with the following:

[Create an Atlas account](https://www.mongodb.com/products/platform/atlas-database)

```bash
DATABASE_URL="mongodb+srv://{userName}:{password}@cluster.psk7t.mongodb.net/{collection}"
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.
