import ThemeToggleBtn from "@/components/theme-toggle-btn";
import Link from "next/link";

interface ILayout {
  children: React.ReactNode;
}

export default function FormLayout({ children }: ILayout) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 w-full flex justify-between items-center  glass glass-dark z-10">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-serif font-semibold">
            <span className="heading-gradient">Hostel</span>
            <span className="text-primary dark:text-primary">
              Haven
            </span>
          </h1>
        </Link>
        <ThemeToggleBtn />
      </header>
      <div className="pt-[65px]">{children}</div>
    </div>
  );
}
