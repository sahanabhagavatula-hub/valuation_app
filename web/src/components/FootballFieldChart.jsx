import { BarChart, Bar, Cell, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from 'recharts';

// Mirrors the Plotly "football field" chart: horizontal range bars per method,
// plus a dashed vertical line marking the current share price.
export default function FootballFieldChart({ comps, dcf, price }) {
  const data = [
    { name: 'Comps', base: comps.low, range: comps.high - comps.low, low: comps.low, high: comps.high, color: '#6b9b94' },
    { name: 'DCF', base: dcf.low, range: dcf.high - dcf.low, low: dcf.low, high: dcf.high, color: '#3d6b66' },
  ];

  const maxX = Math.max(comps.high, dcf.high, price) * 1.1;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 30, right: 20, left: 10, bottom: 10 }}>
        <XAxis
          type="number"
          domain={[0, maxX]}
          tick={{ fontSize: 11, fill: '#ffffff' }}
          tickFormatter={(v) => `$${v.toFixed(0)}`}
          axisLine={{ stroke: '#322c23' }}
          tickLine={false}
          label={{ value: 'Implied share price ($)', position: 'insideBottom', offset: -5, fill: '#8e8675', fontSize: 12 }}
        />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#ffffff' }} axisLine={false} tickLine={false} width={60} />
        <Tooltip
          contentStyle={{ background: '#1f1b15', border: '1px solid #322c23', borderRadius: 8 }}
          labelStyle={{ color: '#8e8675' }}
          formatter={(_value, _name, item) => [`$${item.payload.low.toFixed(2)} - $${item.payload.high.toFixed(2)}`, 'Range']}
        />
        <Bar dataKey="base" stackId="a" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="range" stackId="a" isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Bar>
        <ReferenceLine
          x={price}
          stroke="#c79b5f"
          strokeDasharray="4 4"
          label={{ value: 'Current price', position: 'top', fill: '#ffffff', fontSize: 11 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
