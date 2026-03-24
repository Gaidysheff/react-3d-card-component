import AmEx from "@/assets/images/payments/american-express.svg";
import China_T_Union from "@/assets/images/payments/china_t-union.svg";
import DinersClub from "@/assets/images/payments/diners-club.svg";
import Discover from "@/assets/images/payments/discover.svg";
import Globe from "@/assets/images/payments/globe.svg";
import JCB from "@/assets/images/payments/jcb.svg";
import Maestro from "@/assets/images/payments/maestro.svg";
import Master from "@/assets/images/payments/master_card_with_fill.svg";
import Mir from "@/assets/images/payments/mir.svg";
import RuPay from "@/assets/images/payments/ru_pay.svg";
import UnionPay from "@/assets/images/payments/union_pay.svg";
import Visa from "@/assets/images/payments/visa.svg";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Info } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui-modified/tooltip";
import { Field, FieldGroup, FieldLabel } from "./../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./../ui/select.tsx";

import { Button } from "./../ui/button";

import { Input } from "./../ui-modified/input";

import { CURRENT_YEAR } from "@/lib/utilities.ts";

import {
  useEffect,
  type Dispatch,
  type SyntheticEvent,
  type SetStateAction,
} from "react";

import { type AnyReactForm } from "@/lib/types.ts";
import { useStore } from "@tanstack/react-form";

import {
  FieldInfo,
  type BankCardSchemaType,
} from "./BankCardWithAnimation.tsx";

interface FormProps {
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  setCardType: Dispatch<SetStateAction<string>>;
  onFieldChange: (field: keyof BankCardSchemaType, value: string) => void;
  bankCardForm: AnyReactForm<BankCardSchemaType>;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  t: Record<string, string>;
  e: Record<string, string>;
}

export function CvcBubbleError({ field, e }: { field: AnyFieldApi; e: any }) {
  // Достаем саму ошибку (обычно это первый элемент массива)
  const error = field.state.meta.errors[0];
  // Вытаскиваем ключ (если это объект Zod, ключ будет в .message)
  const errorKey = typeof error === "string" ? error : error?.message;

  if (!field.state.meta.isTouched || !errorKey) return null;

  // Ищем перевод. Если не нашли — выводим сам ключ (для отладки)
  const errorMessage = e?.[errorKey] || errorKey;

  return (
    <div
      className="absolute -top-2 left-1/2 -translate-x-1/2 z-50 
    animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div
        className="bg-destructive text-white text-sm px-2 py-1
      rounded-md whitespace-nowrap shadow-lg relative"
      >
        {errorMessage}
        <div
          className="absolute -bottom-1 w-2 h-2 bg-destructive rotate-45
        left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}

const CardForm = ({
  bankCardForm,
  onSubmit,
  setIsFlipped,
  setCardType,
  onFieldChange,
  t,
  e,
}: FormProps) => {
  const formValues = useStore(bankCardForm.store, (state) => state.values);

  const dynamicYears = Array.from({ length: 11 }, (_, i) =>
    String(CURRENT_YEAR + i),
  );

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  useEffect(() => {
    const number = formValues.cardNumber;

    if (!number) {
      setCardType(Globe);
    } else if (number.match(/^220[0-4]/)) {
      setCardType(Mir);
    } else if (number.match(/^3[0689]/)) {
      setCardType(DinersClub);
    } else if (number.startsWith("31")) {
      setCardType(China_T_Union);
    } else if (number.startsWith("34") || number.startsWith("37")) {
      setCardType(AmEx);
    } else if (number.startsWith("35")) {
      setCardType(JCB);
    } else if (number.startsWith("4")) {
      setCardType(Visa);
    } else if (
      number.match(/^222[123456789]/) ||
      number.match(/^2[34567]/) ||
      number.match(/^5[12345]/)
    ) {
      setCardType(Master);
    } else if (
      number.startsWith("5018") ||
      number.startsWith("5020") ||
      number.startsWith("5038") ||
      number.startsWith("5893") ||
      number.startsWith("6304") ||
      number.startsWith("6759") ||
      number.startsWith("6761") ||
      number.startsWith("6762") ||
      number.startsWith("6763")
    ) {
      setCardType(Maestro);
    } else if (number.startsWith("62")) {
      setCardType(UnionPay);
    } else if (
      number.startsWith("6011") ||
      number.match(/^64[456789]/) ||
      number.startsWith("65")
    ) {
      setCardType(Discover);
    } else if (
      number.match(/^6[05]/) ||
      number.match(/^8[12]/) ||
      number.startsWith("508")
    ) {
      setCardType(RuPay);
    } else {
      setCardType(Globe);
    }
  }, [formValues.cardNumber]);

  return (
    <div className="">
      <form className="w-full" autoComplete="off" onSubmit={onSubmit}>
        <FieldGroup>
          <bankCardForm.Field
            name="cardNumber"
            children={(field) => (
              <div>
                <FieldLabel htmlFor="cardNumber">{t.number}</FieldLabel>
                <Input
                  id="cardNumber"
                  autoComplete="cc-number"
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 19) {
                      onFieldChange("cardNumber", val);
                    }
                  }}
                  // Превращаем ключи в переведенные строки перед передачей в Input
                  errors={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.map((err: any) => {
                          const key =
                            typeof err === "string" ? err : err?.message;
                          return e[key] || key;
                        })
                      : []
                  }
                  // errors={
                  //   field.state.meta.isTouched ? field.state.meta.errors : []
                  // }
                  onClick={() => setIsFlipped(false)}
                  inputMode="numeric"
                  placeholder={t.ph_number}
                  pattern="(\d{16}|\d{19})"
                  required
                />
                <FieldInfo field={field} e={e} />
              </div>
            )}
          />

          <bankCardForm.Field
            name="userName"
            children={(field) => (
              <div>
                <FieldLabel htmlFor="userName">{t.name}</FieldLabel>
                <Input
                  id="userName"
                  autoComplete="cc-name"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.handleChange(val);
                    onFieldChange("userName", val);
                  }}
                  // Превращаем ключи в переведенные строки перед передачей в Input
                  errors={
                    field.state.meta.isTouched
                      ? field.state.meta.errors.map((err: any) => {
                          const key =
                            typeof err === "string" ? err : err?.message;
                          return e[key] || key;
                        })
                      : []
                  }
                  onClick={() => setIsFlipped(false)}
                  placeholder={t.ph_name}
                  required
                />
                <FieldInfo field={field} e={e} />
              </div>
            )}
          />

          <div className="grid grid-cols-4 xsm:grid-cols-5 gap-4">
            <div className="">
              <bankCardForm.Field
                name="month"
                children={(field) => (
                  <Field>
                    <div>
                      <FieldLabel htmlFor="form-month">{t.month}</FieldLabel>
                      <Select
                        value={field.state.value || "01"}
                        onValueChange={(val) => {
                          field.handleChange(val);
                          onFieldChange("month", val);
                        }}
                        onOpenChange={(open) => {
                          if (open) setIsFlipped(false);
                        }}
                      >
                        <SelectTrigger
                          id="form-month"
                          onBlur={field.handleBlur}
                        >
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FieldInfo field={field} e={e} />
                    </div>
                  </Field>
                )}
              />
            </div>
            <div className="xsm:col-span-2">
              <bankCardForm.Field
                name="year"
                children={(field) => (
                  <Field>
                    <div>
                      <FieldLabel htmlFor="form-year">{t.year}</FieldLabel>

                      <Select
                        value={field.state.value || String(CURRENT_YEAR)}
                        onValueChange={(val) => {
                          field.handleChange(val);

                          onFieldChange("year", val);
                        }}
                        onOpenChange={(open) => {
                          if (open) setIsFlipped(false);
                        }}
                      >
                        <SelectTrigger id="form-year" onBlur={field.handleBlur}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dynamicYears.map((dynamicYear) => (
                            <SelectItem key={dynamicYear} value={dynamicYear}>
                              {dynamicYear}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FieldInfo field={field} e={e} />
                    </div>
                  </Field>
                )}
              />
            </div>
            <span></span>
            <div className="w-[4rem]">
              <bankCardForm.Field
                name="cvc"
                children={(field) => (
                  <div className="w-full flex flex-col items-end relative">
                    {/* <FieldLabel htmlFor="cvc">
                      <p className="w-full whitespace-nowrap">CVC/CVV/CVP</p>
                    </FieldLabel> */}
                    <FieldLabel
                      htmlFor="cvc"
                      className="flex items-center gap-1"
                    >
                      <p className="w-full whitespace-nowrap">{t.cvc}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info
                              className="size-5 text-myMainColor
                              opacity-50 cursor-help hover:opacity-100
                              transition-opacity"
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-[160px] text-xs"
                          >
                            {t.cvc_bubble}
                            {/* Это 3-значный код безопасности на обратной стороне
                            вашей карты. */}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FieldLabel>
                    <Input
                      className="text-center"
                      id="cvc"
                      autoComplete="cc-cvc"
                      type="tel"
                      value={field.state.value}
                      onChange={(e) => {
                        const val = e.target.value;

                        field.handleChange(val);

                        onFieldChange("cvc", val);
                      }}
                      // Превращаем ключи в переведенные строки перед передачей в Input
                      errors={
                        field.state.meta.isTouched
                          ? field.state.meta.errors.map((err: any) => {
                              const key =
                                typeof err === "string" ? err : err?.message;
                              return e[key] || key;
                            })
                          : []
                      }
                      onClick={() => setIsFlipped(true)}
                      placeholder=""
                      inputMode="numeric"
                      maxLength={3}
                    />
                    <CvcBubbleError field={field} e={e} />
                  </div>
                )}
              />
            </div>
          </div>
          <Field orientation="horizontal">
            <Button type="button" variant="outline">
              {t.cancel}
            </Button>
            <bankCardForm.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "..." : t.pay}
                </Button>
              )}
            />
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CardForm;
