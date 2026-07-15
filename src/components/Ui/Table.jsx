export default function Table({
  columns = [],
  data = [],
  renderCell,
  emptyMessage = "No data found",
}) {
  return (
    <div className="bg-white border border-slate-200 mt-5 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-emerald-900 text-white hover:bg-emerald-900">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 ${col.align || "text-left"}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${
                        col.align || "text-left"
                      }`}
                    >
                      {renderCell
                        ? renderCell(col.key, row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}