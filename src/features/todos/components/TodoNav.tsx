import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

function TodoNavbar() {
  const router = useRouter();
  const { isLoggedIn, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
    <nav className ="flex justify-between pt-6 px-8 mb-4 sm:mb-0">
            <h1>
                <Link className ="block w-[243px] h-[39px] bg-[url('https://upload.cc/i1/2022/03/23/8vTzYG.png')] bg-no-repeat overflow-hidden whitespace-nowrap indent-[101%]" href="/todo">ONLINE TODO LIST</Link>
                </h1>
            <ul className ="flex text-base">
                {isLoggedIn && (
                <li className =" hidden sm:block">
                    <Link className ="no-underline text-[#333333] ml-0 sm:ml-6 hover:text-[#d87355]" href="/todo">
                        <span className ="font-bold">{username}的代辦</span>
                        </Link>
                        </li>
                )}
                <li>
                    {isLoggedIn ? (
                    <button
                      type="button"
                      className ="no-underline text-[#333333] ml-0 bg-transparent sm:ml-6 hover:text-[#d87355]"
                      onClick={handleLogout}
                    >
                      登出
                    </button>
                    ) : (
                    <Link className ="no-underline text-[#333333] ml-0 sm:ml-6 hover:text-[#d87355]" href="/login">登入</Link>
                    )}
                    </li>
            </ul>
        </nav>
    </>
  );
}

export default TodoNavbar;
