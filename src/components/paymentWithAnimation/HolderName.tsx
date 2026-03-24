interface Props {
  value: string;
  t: Record<string, string>;
}

const HolderName = ({ value = "", t }: Props) => {
  const showLiveName = value.length > 0;

  return (
    <div className="flex flex-col min-w-[200px] gap-1">
      <div className="uppercase opacity-70 text-sm font-[Ubuntu]">
        {t.name_display}
        {/* cardholder's name */}
      </div>
      <div
        className="text-white uppercase h-8 flex items-center font-[CreditCard]
        text-sm mb-10"
      >
        {!showLiveName ? (
          <span className="text-lg opacity-50 tracking-widest">
            {/* Your Name Here */}
            {t.your_name}
          </span>
        ) : (
          <div
            className="relative flex text-xl tracking-tight overflow-hidden
            embossed-text-light"
          >
            <div className="flex gap-[2px]">
              {value.split("").map((char, i) => (
                <span
                  key={i}
                  className="animate-in fade-in slide-in-from-bottom-2
                  duration-500"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HolderName;
