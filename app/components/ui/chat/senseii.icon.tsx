import { useTheme } from "remix-themes";

export default function SenseiiIcon() {
  const [theme] = useTheme()
  console.log("theme", theme)

  return (
    <div className="">
      <img
        className="h-full w-full"
        src={theme === "dark" ? "/senseii-light.png" : "/senseii-dark.png"}
        alt="Senseii Icon"
        width={100}
        height={100}
      />
    </div>
  );
}
