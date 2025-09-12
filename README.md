# ShikshaLite - Accessible Low-Bandwidth Learning Platform

ShikshaLite is an innovative learning platform built with Next.js, designed to deliver high-quality education to users in low-bandwidth environments. It prioritizes accessibility and performance on basic devices, ensuring that learning is possible for everyone, everywhere.

The platform features an intuitive interface for both students and instructors, course recommendation tools powered by generative AI, and a lightweight, efficient architecture to minimize data consumption.

## Key Features

-   **Low-Bandwidth Optimization:** Designed from the ground up to use minimal data.
-   **AI-Powered Recommendations:** Personalized course suggestions using Genkit.
-   **Student Dashboard:** Track progress and manage downloaded courses for offline learning.
-   **Instructor Studio:** A dedicated space for instructors to create and manage their courses.
-   **Accessible UI:** Built with ShadCN UI and Tailwind CSS for a clean, modern, and responsive experience.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **AI/Generative Features:** [Genkit](https://firebase.google.com/docs/genkit)
-   **Authentication:** [Firebase Auth](https://firebase.google.com/docs/auth)

## Getting Started

To get the development server running locally:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Pushing to GitHub

After committing your changes, you can push them to your repository:
```bash
git add .
git commit -m "Updated project README"
git push origin main
```
If you encounter issues due to remote changes, you may need to pull first: `git pull origin main`. If histories have diverged, a force push may be necessary: `git push --force origin main`.
