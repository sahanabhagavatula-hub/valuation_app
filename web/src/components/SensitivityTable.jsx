export default function SensitivityTable({ rows, terms }) {
  return (
    <div className="valufin-table-wrap">
      <table className="valufin-table">
        <thead>
          <tr>
            <th>WACC</th>
            {terms.map((t) => (
              <th key={t}>{t}%</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.WACC}>
              <td>{row.WACC}</td>
              {terms.map((t) => (
                <td key={t}>{row[`${t}%`]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
