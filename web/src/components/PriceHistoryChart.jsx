import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceHistoryChart({ history }) {
  const data = history.map((p) => ({ date: p.date, price: p.price }));

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b9b94" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6b9b94" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8e8675' }} axisLine={false} tickLine={false} minTickGap={30} />
        <YAxis
          tick={{ fontSize: 10, fill: '#8e8675' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{ background: '#1f1b15', border: '1px solid #322c23', borderRadius: 8 }}
          labelStyle={{ color: '#8e8675' }}
          itemStyle={{ color: '#ffffff' }}
          formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Price']}
        />
        <Area type="monotone" dataKey="price" stroke="#6b9b94" strokeWidth={2} fill="url(#priceFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
