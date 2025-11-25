export default function Icon({ href, src, alt }) {
  return (
    <img
      className="w-15 max-w-15 min-w-15 min-h-15 max-h-15  h-15 border border-gray-600 rounded-lg hover:scale-125 transition-transform cursor-pointer"
      src={src}
      alt={alt}
      onClick={() => window.open(href, '_blank')}
    />
  )
}