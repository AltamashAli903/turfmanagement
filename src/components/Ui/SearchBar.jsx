export default function SearchBar() {
  return (
    <div className="mx-auto flex max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

      <input
        type="text"
        placeholder="Search by turf name or area ..."
        className="flex-1 px-6 py-4 text-slate-700 outline-none"
      />

      <button className="bg-slate-900 px-8 text-white hover:bg-slate-800 transition">
        Search
      </button>

    </div>
  );
}