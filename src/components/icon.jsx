export default function Icon({ href, src, alt, toggleDialogDiv, dialogDivOpen, index }) {
  const defaultSize = window.innerHeight / 8; // pixels
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
    <div
      style={{ flex: "0 0 auto", width: defaultSize, height: defaultSize, overflow: "visible" }}
      className="group relative cursor-pointer flex items-center justify-center bg-gray-800/20 border border-gray-600 rounded-lg opacity-80 hover:opacity-100"
    >
      <button
        className="absolute text-xs top-1 right-1 p-1 bg-gray-800/50 text-white rounded hidden group-hover:block transition-colors hover:bg-gray-700 z-20"
        onClick={() => toggleDialogDiv(index + 1)}
      >
        ...
      </button>
      <div
        className="transition-transform duration-200 group-hover:scale-125 z-10"
        style={{ width: imageSize, height: imageSize }}
        onClick={() => openBookmark(href)}
      >
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}