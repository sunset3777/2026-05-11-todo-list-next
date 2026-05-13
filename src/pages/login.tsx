import Head from "next/head";
import LoginPage from "@/features/auth/components/LoginPage";

export default function Login() {
  return (
    <>
      <Head>
        <title>登入 | Online Todo List</title>
        <meta
          name="description"
          content="登入 Online Todo List，開始管理你的線上待辦事項。"
        />
        <meta property="og:title" content="登入 | Online Todo List" />
        <meta
          property="og:description"
          content="登入後即可建立、管理與追蹤你的待辦事項。"
        />
        <meta property="og:type" content="website" />
      </Head>

      <LoginPage />
    </>
  );
}
