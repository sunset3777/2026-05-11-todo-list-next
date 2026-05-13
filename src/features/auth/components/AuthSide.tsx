import Image from "next/image";
import Link from "next/link";

function AuthSide() {
  return (
    <div className="flex w-full flex-col items-center justify-center sm:w-[386px]">
      <Link href="/login" aria-label="ONLINE TODO LIST">
        <Image
          className="mb-4"
          src="https://upload.cc/i1/2022/03/23/rhefZ3.png"
          alt="ONLINE TODO LIST"
          width={386}
          height={82}
          priority
        />
      </Link>
      <Image
        className="hidden sm:block"
        src="https://upload.cc/i1/2022/03/23/tj3Bdk.png"
        alt="Todo illustration"
        width={386}
        height={386}
      />
    </div>
  );
}

export default AuthSide;
