const TEXT = "SEM OBRAS \u2022 ZERO INVESTIMENTO \u2022 100% RENOV\u00c1VEL \u2022 PORTABILIDADE TOTAL \u2022 SEM FIDELIDADE \u2022 ";

const MarqueeSection = () => (
  <div className="overflow-hidden bg-[#FF6B00] py-3 border-y-2 border-orange-600">
    <div className="marquee-track" data-testid="marquee-section">
      <span className="font-chivo font-black tracking-widest text-sm text-black flex-shrink-0 pr-0">
        {TEXT.repeat(6)}
      </span>
      <span className="font-chivo font-black tracking-widest text-sm text-black flex-shrink-0 pr-0">
        {TEXT.repeat(6)}
      </span>
    </div>
  </div>
);

export default MarqueeSection;
