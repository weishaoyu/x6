import { Point } from './point'

export class Rectangle {
  x: number
  y: number
  width: number
  height: number

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x == null ? 0 : x
    this.y = y == null ? 0 : y
    this.width = width == null ? 0 : width
    this.height = height == null ? 0 : height
  }

  getCenterX() {
    return this.x + this.width / 2
  }

  getCenterY() {
    return this.y + this.height / 2
  }

  getCenter() {
    return new Point(this.getCenterX(), this.getCenterY())
  }

  getOrigin() {
    return new Point(this.x, this.y)
  }

  getCorner() {
    return new Point(this.x + this.width, this.y + this.height)
  }

  getTopRight() {
    return new Point(this.x + this.width, this.y)
  }

  getBottomLeft() {
    return new Point(this.x, this.y + this.height)
  }

  round() {
    return new Rectangle(
      Math.round(this.x),
      Math.round(this.y),
      Math.round(this.width),
      Math.round(this.height),
    )
  }

  update(rect: Rectangle | Rectangle.RectangleLike): void
  update(x: number, y: number, width: number, height: number): void
  update(
    x: number | Rectangle | Rectangle.RectangleLike,
    y?: number,
    w?: number,
    h?: number,
  ): void {
    const b = typeof x === 'number' ? { x, y: y!, width: w!, height: h! } : x

    this.x = b.x
    this.y = b.y
    this.width = b.width
    this.height = b.height
  }

  grow(amount: number): this
  grow(width: number, height: number): this
  grow(width: number, height?: number) {
    const w = width
    const h = height != null ? height : width
    this.x -= w
    this.y -= h
    this.width += 2 * w
    this.height += 2 * h

    return this
  }

  add(rect: Rectangle | Rectangle.RectangleLike) {
    if (rect != null) {
      const minX = Math.min(this.x, rect.x)
      const minY = Math.min(this.y, rect.y)
      const maxX = Math.max(this.x + this.width, rect.x + rect.width)
      const maxY = Math.max(this.y + this.height, rect.y + rect.height)

      this.x = minX
      this.y = minY
      this.width = maxX - minX
      this.height = maxY - minY
    }

    return this
  }

  intersect(rect: Rectangle | Rectangle.RectangleLike) {
    if (rect != null) {
      const r1 = this.x + this.width
      const r2 = rect.x + rect.width

      const b1 = this.y + this.height
      const b2 = rect.y + rect.height

      this.x = Math.max(this.x, rect.x)
      this.y = Math.max(this.y, rect.y)
      this.width = Math.min(r1, r2) - this.x
      this.height = Math.min(b1, b2) - this.y
    }

    return this
  }

  rotate90() {
    const t = (this.width - this.height) / 2
    this.x += t
    this.y -= t
    const tmp = this.width
    this.width = this.height
    this.height = tmp

    return this
  }

  containsPoint(x: number, y: number): boolean
  containsPoint(point: Point | Point.PointLike): boolean
  containsPoint(x: number | Point | Point.PointLike, y?: number): boolean {
    const point = typeof x === 'number' ? { x, y: y! } : x
    return (
      point != null &&
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    )
  }

  containsRect(x: number, y: number, w: number, h: number): boolean
  containsRect(rect: Rectangle | Rectangle.RectangleLike): boolean
  containsRect(
    x: number | Rectangle | Rectangle.RectangleLike,
    y?: number,
    w?: number,
    h?: number,
  ) {
    const b = typeof x === 'number' ? { x, y: y!, width: w!, height: h! } : x

    const x1 = this.x
    const y1 = this.y
    const w1 = this.width
    const h1 = this.height

    const x2 = b.x
    const y2 = b.y
    const w2 = b.width
    const h2 = b.height

    return x2 >= x1 && y2 >= y1 && x2 + w2 <= x1 + w1 && y2 + h2 <= y1 + h1
  }

  isIntersectWith(x: number, y: number, w: number, h: number): boolean
  isIntersectWith(rect: Rectangle | Rectangle.RectangleLike): boolean
  isIntersectWith(
    x: number | Rectangle | Rectangle.RectangleLike,
    y?: number,
    w?: number,
    h?: number,
  ) {
    const b = typeof x === 'number' ? { x, y: y!, width: w!, height: h! } : x

    let w1 = this.width
    let h1 = this.height
    let w2 = b.width
    let h2 = b.height

    if (w2 <= 0 || h2 <= 0 || w1 <= 0 || h1 <= 0) {
      return false
    }

    const x1 = this.x
    const y1 = this.y
    const x2 = b.x
    const y2 = b.y

    w2 += x2
    h2 += y2
    w1 += x1
    h1 += y1

    return (
      (w2 < x2 || w2 > x1) &&
      (h2 < y2 || h2 > y1) &&
      (w1 < x1 || w1 > x2) &&
      (h1 < y1 || h1 > y2)
    )
  }

  equals(rect: Rectangle | Rectangle.RectangleLike) {
    return (
      rect != null &&
      rect.x === this.x &&
      rect.y === this.y &&
      rect.width === this.width &&
      rect.height === this.height
    )
  }

  clone() {
    return Rectangle.clone(this)
  }

  valueOf() {
    return [this.x, this.y, this.width, this.height]
  }

  toString() {
    return this.valueOf().join(', ')
  }
}

export namespace Rectangle {
  export interface RectangleLike {
    x: number
    y: number
    width: number
    height: number
  }

  export function clone(rect: Rectangle | RectangleLike) {
    return new Rectangle(rect.x, rect.y, rect.width, rect.height)
  }
}
