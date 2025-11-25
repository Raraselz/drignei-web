export default function Icon({ href, src, alt }) {
  return (
    <img
      className="w-12 h-12 border border-gray-600 rounded-lg hover:scale-125 transition-transform cursor-pointer"
      src={src}
      alt={alt}
      onClick={() => window.open(href, '_blank')}
    />
  )
}