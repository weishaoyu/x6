import { Marker } from '.'

export function ovalMarker({
  c,
  pe,
  unitX,
  unitY,
  size,
  filled,
}: Marker.CreateMarkerOptions) {
  const a = size / 2
  const pt = pe.clone()
  pe.x -= unitX * a
  pe.y -= unitY * a

  return function() {
    c.ellipse(pt.x - a, pt.y - a, size, size)

    if (filled) {
      c.fillAndStroke()
    } else {
      c.stroke()
    }
  }
}
