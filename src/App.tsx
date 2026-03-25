import { ERRORS, TRANSLATIONS } from "@/lib/translation.ts";
import { useEffect, useState } from "react";

import BankCardWithAnimation from "./components/paymentWithAnimation/BankCardWithAnimation.tsx";
import { Button } from "./components/ui/button.tsx";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function App() {
  const [isSent, setIsSent] = useState(false);

  const [hue, setHue] = useState(() => {
    const saved = localStorage.getItem("card-hue");
    return saved ? Number(saved) : 25;
  });

  const [lightness, setLightness] = useState(() => {
    const saved = localStorage.getItem("card-lightness");
    return saved ? Number(saved) : 62;
  });

  const [chroma, setChroma] = useState(() => {
    const saved = localStorage.getItem("card-chroma");
    return saved ? Number(saved) : 25;
  });

  const playTick = () => {
    const tick = new Audio("/public/tick.mp3");
    tick.volume = 0.1;
    tick.play().catch(() => {});
  };

  const dynamicTheme = {
    // Для L и C обязательно добавляем % или делим на 100
    "--myMainColor": `oklch(${lightness}% ${chroma / 100} ${hue})`,
    "--myMainColorLighter": `oklch(${Math.min(lightness * 1.3, 100)}% ${chroma / 150} ${hue})`,
    "--myMainColorLight": `oklch(${Math.min(lightness * 1.15, 100)}% ${chroma / 120} ${hue})`,
    "--myMainColorDark": `oklch(${lightness * 0.8}% ${chroma / 110} ${hue})`,
    "--myMainColorDarker": `oklch(${lightness * 0.6}% ${chroma / 130} ${hue})`,
  } as React.CSSProperties;

  const CardWithAnimationDataHandler = (CardData: Record<string, string>) => {
    console.log("🚀 ~ CardWithAnimationDataHandler ~ CardData:", CardData);
    setIsSent(true);
    return new Promise((r) => setTimeout(r, 2000));
  };

  // Сохраняем выбранный цвет при каждом изменении
  useEffect(() => {
    localStorage.setItem("card-hue", String(hue));
    localStorage.setItem("card-lightness", String(lightness));
    localStorage.setItem("card-chroma", String(chroma));
  }, [hue, lightness, chroma]);

  // ====================== Translation ===========================

  // const [lang, setLang] = useState<"en" | "ru">("en");

  const [lang, setLang] = useState<"en" | "ru">(() => {
    return (localStorage.getItem("app-lang") as "en" | "ru") || "en";
  });

  const t = TRANSLATIONS[lang]; // Помощник для перевода основного
  const e = ERRORS[lang]; // Помощник для перевода ошибок

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
  }, [lang]);

  return (
    <section style={dynamicTheme} className="mb-20">
      {/* --------------------- Слайдеры цвета ------------------ */}
      <div className="flex flex-col items-center gap-4 py-10">
        <div className="w-70 relative z-[100]">
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => {
              setHue(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_hue}: <span className="text-myMainColor">{hue}°</span>
          </p>
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => {
              setLightness(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_lightness}:{" "}
            <span className="text-myMainColor">{lightness}%</span>
          </p>
          <input
            type="range"
            className="w-full cursor-pointer accent-myMainColor mt-6"
            min="0"
            max="100"
            value={chroma}
            onChange={(e) => {
              setChroma(Number(e.target.value));
              playTick();
            }}
          />
          <p className="text-center font-medium">
            {t.slider_chroma}:{" "}
            <span className="text-myMainColor">{chroma}%</span>
          </p>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setHue(25);
                setLightness(62);
                setChroma(25);
              }}
              type="button"
              className="p-6 my-5 w-70"
            >
              {t.slider_reset}
            </Button>
          </div>
        </div>
      </div>
      {/* -------------------- Переводчик ------------------ */}
      <div className="flex flex-col items-center gap-2 mt-6 z-[100]">
        <p className="text-xs uppercase tracking-widest opacity-60">
          {t.language}
        </p>
        <div className="flex bg-input/20 rounded-md border border-primary/50 relative">
          {["en", "ru"].map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setLang(l as "en" | "ru")}
              className={cn(
                "relative px-4 py-2 text-sm font-medium z-10 uppercase",
                lang === l ? "text-white" : "text-black",
              )}
            >
              {/* Если язык выбран, рисуем под ним анимированную подложку */}
              {lang === l && (
                <motion.div
                  layoutId="activeTab" // Ключевое свойство для "перетекания"
                  className={cn(
                    "absolute inset-0 bg-myMainColor shadow-lg",
                    lang === "en" ? "rounded-l-md" : "rounded-r-md",
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-20">
                {l === "en" ? "🇬🇧 EN" : "🇷🇺 RU"}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* -------------------------------------------------------- */}
      <div className="flex flex-col items-center justify-center">
        <div className="mt-10"> {t.fill}</div>
        <div className="my-5 sm:my-10 z-3">
          <BankCardWithAnimation
            onSubmitData={CardWithAnimationDataHandler}
            t={t}
            e={e}
          />
        </div>
      </div>
      {isSent && (
        <p className="text-3xl text-myMainColor italic text-center">
          {t.result}
        </p>
      )}
      <footer className="relative z-[100] mt-12 mb-6 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-myMainColor to-transparent mb-4" />

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <svg
            className="w-5 h-5 fill-current transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-xs font-light tracking-widest uppercase">
            GitHub Repository
          </span>
        </a>

        <div className="flex flex-col items-center mt-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            Handcrafted by{" "}
            <span className="font-bold text-myMainColor">Gaidysheff</span>
          </p>
          <p className="text-[9px] text-black/30 italic">
            © {new Date().getFullYear()} • 3D Animation Engine
          </p>
        </div>
      </footer>
    </section>
  );
}

export default App;
