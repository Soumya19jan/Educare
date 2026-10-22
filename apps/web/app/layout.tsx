import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduSure - Live Tutoring for Kids | English, Maths, Coding & Robotics",
  description: "English, Maths & Aptitude, Coding & AI, and Robotics taught live by tutors who know your child by name. Book a free demo class today.",
  keywords: ["live tutoring", "kids education", "coding for kids", "robotics", "maths tuition", "english tutoring", "online learning"],
  openGraph: {
    title: "EduSure - Live Tutoring for Kids",
    description: "Read it. Count it. Code it. Build it. Expert tutors for your child.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}