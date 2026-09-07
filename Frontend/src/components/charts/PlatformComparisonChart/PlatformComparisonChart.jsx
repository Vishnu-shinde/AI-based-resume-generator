import { memo, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import Card from '../../common/Card/Card';

const baseColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

const PlatformComparisonChart = memo(function PlatformComparisonChart({ comparison = [] }) {
  const chartData = useMemo(
    () =>
      comparison.map((item, index) => ({
        name: item.name,
        value: Number(item.value || 0),
        color: baseColors[index % baseColors.length],
      })),
    [comparison],
  );

  return (
    <Card>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="name" stroke="var(--muted)" />
          <YAxis stroke="var(--muted)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--borders)',
              color: 'var(--text)',
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} fill="var(--primary)" label>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--borders)',
              color: 'var(--text)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
});

export default PlatformComparisonChart;
