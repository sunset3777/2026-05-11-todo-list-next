import Link from "next/link";
import AuthSide from "./AuthSide";
import { useLoginForm } from "@/features/auth/useLoginForm";

function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleLogin,
  } = useLoginForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <main
      id="loginPage"
      className="min-h-screen bg-[#FFD370] px-[31px] py-12 sm:px-8 sm:py-[87px]"
    >
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-start sm:w-[800px] sm:flex-row sm:justify-between">
        <AuthSide />

        <form className="mt-8 flex flex-col sm:mt-0 sm:ml-[100px]" onSubmit={onSubmit}>
          <h2 className="mb-6 text-center text-xl font-bold sm:text-left sm:text-2xl">
            最實用的線上代辦事項服務
          </h2>

          <label className="mt-4 mb-1 text-sm font-bold" htmlFor="login-email">
            Email
          </label>
          <input
            className="my-1 w-76 rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="email"
            id="login-email"
            name="email"
            placeholder="請輸入 email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="mt-4 mb-1 text-sm font-bold" htmlFor="login-password">
            密碼
          </label>
          <input
            className="my-1 w-76 rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="password"
            id="login-password"
            name="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <span className="mt-1 mb-4 text-sm text-[#d87355]">{error}</span>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="my-6 flex h-12 w-32 items-center justify-center self-center rounded-[10px] bg-[#333333] text-base font-bold text-white no-underline disabled:opacity-50"
          >
            {isSubmitting ? "登入中..." : "登入"}
          </button>

          <Link
            className="text-center font-bold text-[#333333] no-underline"
            href="/signup"
          >
            註冊帳號
          </Link>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
