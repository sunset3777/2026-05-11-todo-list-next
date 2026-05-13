import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "@/features/auth/authApi";

export function useSignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    const nextEmail = email.trim();
    const nextNickname = nickname.trim();

    if (!nextEmail || !nextNickname || !password || !passwordConfirm) {
      setError("請完整填寫註冊資料");
      return;
    }

    if (password !== passwordConfirm) {
      setError("兩次密碼不一致");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await signUp({
        email: nextEmail,
        nickname: nextNickname,
        password,
      });

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "註冊失敗");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}