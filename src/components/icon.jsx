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

  const imageSize = defaultSize / 2; // half size

  return (
    <div style={{height: defaultSize,width: defaultSize}} className="group relative opacity-80 hover:opacity-100 hover:bg-gray-900/20 transition-all hover:scale-125 flex items-center justify-center bg-gray-800/20 border border-gray-600 rounded-lg  cursor-pointer">
      <button className="absolute z-10 text-xs top-1 right-1 p-1 bg-gray-800/50 transition-all hover:bg-gray-700/50 text-white rounded group-hover:block hidden" onClick={() => { toggleDialogDiv(index + 1) }}>...</button>
      <img
        className={`z-1`}
        style={{
          maxWidth: imageSize,
          minWidth: imageSize,
          maxHeight: imageSize,
          minHeight: imageSize,
          height: imageSize,
          width: imageSize
        }}
        src={src}
        alt={alt}
        onClick={() => openBookmark(href)}
      />
    </div>
  )
}