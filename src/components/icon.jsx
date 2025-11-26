export default function Icon({ href, src, alt, toggleDialogDiv, dialogDivOpen, index }) {
  const defaultSize = 85; // pixels
  const openBookmark = (url) => {
    try {
      const parsed = new URL(url);
      // If it's an http(s) URL, open with no target (same default behavior)
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        window.open(url);
        return; 
      }
    } catch (e) {
      // invalid absolute URL (maybe relative or mailto), fall through
    }
  }

  return (
    <div className="group relative opacity-80 hover:opacity-100 transition-all hover:scale-125 ">
      <button className="absolute z-10 text-xs top-0 right-0 p-1 bg-gray-800/50 text-white rounded group-hover:block hidden" onClick={() => {toggleDialogDiv(index+1)}}>...</button>  
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
        onClick={() => openBookmark(href)}
      />
    </div>
  )
}