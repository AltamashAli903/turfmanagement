export default function SectionTitle({
  badge,
  title,
  subtitle,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

        {/* <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

          {badge}

        </span> */}

      <h2 className="mt-5 text-4xl font-extrabold text-slate-900 md:text-5xl">

        {title}

      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">

        {subtitle}

      </p>

    </div>
  );
}