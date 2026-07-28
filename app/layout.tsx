import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://diceframe.com",
  ),
  title: {
    default: "DiceFrame — 自托管 AI 跑团引擎",
    template: "%s · DiceFrame",
  },
  description:
    "把 Web 桌面、角色卡、世界书、骰子、状态追踪与群聊 Bot 连接到同一场持续生长的冒险。",
  keywords: [
    "DiceFrame",
    "AI 跑团",
    "TRPG",
    "DND",
    "COC",
    "自托管",
    "多人 WebUI",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "DiceFrame",
    title: "DiceFrame — 自托管 AI 跑团引擎",
    description:
      "从灵感到开团，把规则、角色、世界与叙事放进同一张桌子。",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiceFrame — 自托管 AI 跑团引擎",
    description:
      "从灵感到开团，把规则、角色、世界与叙事放进同一张桌子。",
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
