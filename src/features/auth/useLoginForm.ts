import { useState } from "react";
import { signIn } from "@/features/auth/authApi";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    const userEmail = email.trim();
    const userPassword = password; // 密碼不應 trim()

    if (!userEmail || !userPassword) {
      setError("請填寫 email 和密碼");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const data = await signIn({ email: userEmail, password: userPassword });
      
      // 1. 執行登入邏輯（存入 token/nickname）
      login(data.token, data.nickname || "");
      
      // 2. 跳轉至待辦事項頁面
      router.push("/todo");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登入失敗，請稍後再試");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleLogin,
  };
}
