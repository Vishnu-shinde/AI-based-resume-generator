import { memo, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../common/Card/Card';

const SkillChart = memo(function SkillChart({ skills = [] }) {
  const data = useMemo(
    () =>
      skills.map((skill) => ({
        name: skill.name,
        score: Number(skill.score || 0),
      })),
    [skills],
  );

  return (
    <Card>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
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
          <Bar dataKey="score" fill="var(--primary)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
});

export default SkillChart;
