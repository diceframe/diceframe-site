import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://diceframe.com",
  ),
  title: {
    default: "DiceFrame — 开源自托管 AI 跑团（TRPG）平台",
    template: "%s · DiceFrame",
  },
  description:
    "DiceFrame 是支持 DND、COC 与自定义规则的开源自托管 AI 跑团（TRPG）平台，提供 AI GM、多人 WebUI、角色卡、世界书、骰子和 QQ Bot。",
  keywords: [
    "DiceFrame",
    "AI 跑团",
    "AI TRPG",
    "TRPG",
    "DND",
    "COC",
    "AI GM",
    "AI KP",
    "线上跑团",
    "跑团工具",
    "TRPG 平台",
    "自托管",
    "多人 WebUI",
  ],
  authors: [{ name: "DiceFrame Contributors" }],
  creator: "DiceFrame Contributors",
  publisher: "DiceFrame Contributors",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "msvalidate.01": "D836E0E0DD0B81055E1D84C58E0C9A93",
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "zh_CN",
    siteName: "DiceFrame",
    title: "DiceFrame — 开源自托管 AI 跑团（TRPG）平台",
    description:
      "支持 DND、COC 与自定义规则，把 AI GM、玩家、角色卡、世界书和骰子带到同一张线上跑团桌。",
  },
  twitter: {
    card: "summary",
    title: "DiceFrame — 开源自托管 AI 跑团（TRPG）平台",
    description:
      "支持 DND、COC 与自定义规则的开源自托管 AI 跑团平台。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
