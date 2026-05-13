import Head from "next/head";
import SignUpPage from "@/features/auth/components/SignUpPage";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>註冊帳號 | Online Todo List</title>
        <meta
          name="description"
          content="註冊 Online Todo List 帳號，開始建立並管理你的待辦事項。"
        />
        <meta property="og:title" content="註冊帳號 | Online Todo List" />
        <meta
          property="og:description"
          content="建立帳號後即可使用線上待辦事項管理功能。"
        />
        <meta property="og:type" content="website" />
      </Head>

      <SignUpPage />
    </>
  );
}
