interface Props {
  month: string;
  year: string;
  monthTouched: boolean | undefined;
  yearTouched: boolean | undefined;
  t: Record<string, string>;
}

const Expiration = ({ month, year, monthTouched, yearTouched, t }: Props) => {
  return (
    <div className="flex flex-col items-start gap-1 shrink-0">
      <div className="uppercase opacity-70 text-sm font-[Ubuntu] mb-1">
        {t.valid}
        {/* valid thru */}
      </div>

      <div className="uppercase text-xl font-[Ubuntu]">
        <span className={monthTouched ? "embossed-text-light" : "opacity-40"}>
          {monthTouched ? month : t.month_display}
          {/* {monthTouched ? month : "MM"} */}
        </span>

        <span
          className={
            yearTouched ? "mx-1 embossed-text-light" : "mx-1 opacity-40"
          }
        >
          /
        </span>

        <span className={yearTouched ? "embossed-text-light" : "opacity-40"}>
          {yearTouched ? year.slice(-2) : t.year_display}
          {/* {yearTouched ? year.slice(-2) : "YY"} */}
        </span>
      </div>
    </div>
  );
};

export default Expiration;
