import Link from "next/link";
import AuthSide from "./AuthSide";
import { useSignUpForm } from "@/features/auth/useSignUpForm";

function SignUpPage() {
  const {
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    error,
    isSubmitting,
    handleSignUp,
  } = useSignUpForm();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <main
      id="signUpPage"
      className="min-h-screen bg-[#FFD370] px-[31px] py-12 sm:px-8 sm:py-[87px]"
    >
      <div className="mx-auto flex h-screen w-full flex-col items-center sm:w-[800px] sm:flex-row sm:justify-between">
        <AuthSide />

        <form 
        className="mt-8 flex flex-col sm:mt-0 sm:ml-[100px]"
        onSubmit={onSubmit}
        >
          <h2 className="mb-6 text-center text-xl font-bold sm:text-left sm:text-2xl">
            註冊帳號
          </h2>

          <label className="mt-4 mb-1 text-sm font-bold" htmlFor="signup-email">
            Email
          </label>
          <input
            className="my-1 w-[304px] rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="email"
            id="signup-email"
            name="email"
            placeholder="請輸入 email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="mt-4 mb-1 text-sm font-bold" htmlFor="signup-name">
            您的暱稱
          </label>
          <input
            className="my-1 w-[304px] rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="text"
            id="signup-name"
            name="name"
            placeholder="請輸入您的暱稱"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <label className="mt-4 mb-1 text-sm font-bold" htmlFor="signup-password">
            密碼
          </label>
          <input
            className="my-1 w-[304px] rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="password"
            id="signup-password"
            name="password"
            placeholder="請輸入密碼"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            className="mt-4 mb-1 text-sm font-bold"
            htmlFor="signup-password-confirm"
          >
            再次輸入密碼
          </label>
          <input
            className="my-1 w-[304px] rounded-[10px] border-0 bg-white px-4 py-3 font-normal placeholder:text-[#9F9A91] focus:outline-[3px] focus:outline-white"
            type="password"
            id="signup-password-confirm"
            name="passwordConfirm"
            placeholder="請再次輸入密碼"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          {error && (
            <span className="mt-1 mb-4 text-sm text-[#d87355]">
              {error}
              </span>
            )}

          <button
          type="submit"
          disabled={isSubmitting}
          className="my-6 flex h-12 w-32 items-center justify-center self-center rounded-[10px] bg-[#333333] text-base font-bold text-white no-underline disabled:opacity-50"
          >
            {isSubmitting ? "註冊中..." : "註冊帳號"}
            </button>

          <Link
            className="text-center font-bold text-[#333333] no-underline"
            href="/login"
          >
            登入
          </Link>
        </form>
      </div>
    </main>
  );
}

export default SignUpPage;
