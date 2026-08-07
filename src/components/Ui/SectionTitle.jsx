export default function SectionTitle({
  badge,
  title,
  subtitle,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <h2 className="mt-5 text-4xl font-extrabold text-slate-900 md:text-5xl">

        {title}

      </h2>

      <p className="mx-auto mt-2 max-w-2xl text-lg leading-8 text-slate-500">

        {subtitle}

      </p>

    </div>
  );
}