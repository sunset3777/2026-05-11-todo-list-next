import Head from "next/head";
import LoginPage from "@/features/auth/components/LoginPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Todo List | 線上待辦事項管理</title>
        <meta
          name="description"
          content="Online Todo List 是一個簡潔的線上待辦事項工具，支援登入、註冊與待辦事項管理。"
        />
        <meta
          property="og:title"
          content="Online Todo List | 線上待辦事項管理"
        />
        <meta
          property="og:description"
          content="登入後即可建立、管理與追蹤你的待辦事項。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://upload.cc/i1/2022/03/23/rhefZ3.png"
        />
      </Head>

      <LoginPage />
    </>
  );
}
