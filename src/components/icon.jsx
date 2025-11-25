export default function Icon({ href, src, alt }) {
  const defaultSize = 85; // pixels
  return (
    <img
      className={`opacity-80 hover:opacity-100 border border-gray-600 rounded-lg hover:scale-125 transition-transform cursor-pointer`}
      style={{
        maxWidth: defaultSize, 
        minWidth: defaultSize,
        maxHeight: defaultSize,
        minHeight: defaultSize,
        height: defaultSize,
        width: defaultSize
      }}
      src={src}
      alt={alt}
      onClick={() => window.open(href, '_blank')}
    />
  )
}