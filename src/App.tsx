import BankCardWithAnimation from "./components/paymentWithAnimation/BankCardWithAnimation.tsx";

function App() {
  const CardWithAnimationDataHandler = (CardData: Record<string, string>) => {
    console.log("🚀 ~ CardWithAnimationDataHandler ~ CardData:", CardData);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10 sm:my-20 z-3">
        <BankCardWithAnimation onSubmitData={CardWithAnimationDataHandler} />
      </div>
    </div>
  );
}

export default App;
