type IRainFallByDay = {
  day: number;
  amount: number
};
type IRainFall = {
  days: IRainFallByDay[];
  request: string
};



export type { IRainFall, IRainFallByDay };
