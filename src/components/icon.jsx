export default function Icon({ href, src, alt }) {
  const defaultSize = 85; // pixels
  return (
    <div className="group relative opacity-80 hover:opacity-100 transition-all hover:scale-125 ">
      <button className="absolute z-10 text-xs top-0 right-0 p-1 bg-gray-800/50 text-white rounded group-hover:block hidden">...</button>  
      <img
        className={`z-1 border border-gray-600 rounded-lg  cursor-pointer`}
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
    </div>
  )
}