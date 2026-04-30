import { HeaderLeading } from "./header-leading";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto max-w-4xl px-6 h-14 flex items-center justify-between gap-4">
        <HeaderLeading />
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
