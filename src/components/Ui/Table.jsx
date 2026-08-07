export default function Table({
  columns = [],
  data = [],
  renderCell,
  emptyMessage = "No data found",
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="max-h-125 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-emerald-900 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 ${col.align || "text-left"}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 overflow-y-auto">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-3 py-2 ${col.align || "text-left"
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