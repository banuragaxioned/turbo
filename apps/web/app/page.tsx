import { ModeToggle } from "@/components/theme-toggle";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <p>Hello, world!</p>
      <ModeToggle />
    </main>
  );
}
