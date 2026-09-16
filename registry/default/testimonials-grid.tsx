/* eslint-disable @next/next/no-img-element */

type Testimonial = {
  quote: string
  name: string
  role?: string
  avatar?: string
  initials?: string
}

type TestimonialsGridProps = {
  testimonials: readonly Testimonial[]
  className?: string
}

function Person({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figcaption className="mt-5 flex items-center gap-3">
      {testimonial.avatar ? (
        <img
          src={testimonial.avatar}
          alt=""
          className="size-10 rounded-full object-cover"
        />
      ) : (
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white">
          {testimonial.initials ?? testimonial.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-sm leading-tight">
        <strong className="block font-semibold text-zinc-950">
          {testimonial.name}
        </strong>
        {testimonial.role ? (
          <span className="mt-0.5 block text-zinc-500">{testimonial.role}</span>
        ) : null}
      </span>
    </figcaption>
  )
}

function TestimonialsGrid({
  testimonials,
  className = "",
}: TestimonialsGridProps) {
  if (testimonials.length === 0) return null
  const [featured, ...rest] = testimonials

  return (
    <div className={`grid gap-4 lg:grid-cols-2 ${className}`}>
      <figure className="relative overflow-hidden rounded-3xl border border-black/8 bg-gradient-to-b from-zinc-950/[0.045] to-transparent p-7 lg:row-span-2 lg:p-9">
        <span
          aria-hidden
          className="absolute -top-10 left-3 font-serif text-[8rem] leading-none text-zinc-950/[0.045]"
        >
          &ldquo;
        </span>
        <div className="relative">
          <div className="text-sm tracking-[0.16em] text-amber-500">★★★★★</div>
          <blockquote className="mt-5 text-xl leading-8 font-medium tracking-[-0.02em] text-zinc-900">
            “{featured.quote}”
          </blockquote>
          <Person testimonial={featured} />
        </div>
      </figure>
      {rest.map((testimonial) => (
        <figure
          key={testimonial.name}
          className="rounded-2xl border border-black/8 bg-white p-6 transition-colors hover:bg-zinc-50"
        >
          <blockquote className="text-sm leading-6 text-zinc-700">
            “{testimonial.quote}”
          </blockquote>
          <Person testimonial={testimonial} />
        </figure>
      ))}
    </div>
  )
}

export { TestimonialsGrid }
export type { Testimonial, TestimonialsGridProps }
