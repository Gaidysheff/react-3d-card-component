import BankCardWithAnimation from "./components/paymentWithAnimation/BankCardWithAnimation.tsx";
import { useState } from "react";

function App() {
  const [isSent, setIsSent] = useState(false);
  const CardWithAnimationDataHandler = (CardData: Record<string, string>) => {
    setIsSent(true);
    console.log("🚀 ~ CardWithAnimationDataHandler ~ CardData:", CardData);
    return new Promise((r) => setTimeout(r, 2000));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="my-10 sm:my-20 z-3">
          <BankCardWithAnimation onSubmitData={CardWithAnimationDataHandler} />
        </div>
      </div>
      {isSent && (
        <p className="text-3xl text-red-500 italic text-center">
          Данные вашей карты условно переданы на сервер
        </p>
      )}
    </>
  );
}

export default App;
