/** وزن هر شاخه ۱۲ متری میلگرد A3 (استاندارد اشتال / ملی ۳۱۳۲) */
export const REBAR_SIZES = [
  { size: 12, weightPerBar: 10.656 },
  { size: 14, weightPerBar: 14.52 },
  { size: 16, weightPerBar: 18.96 },
  { size: 18, weightPerBar: 24 },
  { size: 20, weightPerBar: 29.64 },
];

export const calcData = {
  concrete: 0,
  rebarKg: 0,
  rebarCounts: {},
  yonolith: 0,
  totalArea: 0,
};
