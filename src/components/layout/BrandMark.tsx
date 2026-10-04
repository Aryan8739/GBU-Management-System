type BrandMarkProps = { className?: string }

export function BrandMark({ className = 'h-9 w-9 text-[9px]' }: BrandMarkProps) {
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-800 font-bold tracking-tight text-white shadow-sm ${className}`}>GBU</span>
}
