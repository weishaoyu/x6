import * as util from '../../util'
import { Actor } from '../../shape'
import { SvgCanvas2D } from '../../canvas'
import { Style } from '../../types'
import { Point, Rectangle } from '../../struct'
import { State, registerShape, registerPerimeter } from '../../core'
import { getFactor, getLineArcSize } from './util'

export class TrapezoidShape extends Actor {
  factor: number = 0.2

  isRoundable() {
    return true
  }

  redrawPath(
    c: SvgCanvas2D,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    const dx = getFactor(this.style, this.factor, w, 0.5)
    const arcSize = getLineArcSize(this.style)

    this.paintPoints(
      c,
      [
        new Point(0, h),
        new Point(dx, 0),
        new Point(w - dx, 0),
        new Point(w, h),
      ],
      this.rounded,
      arcSize,
      true,
    )
  }
}

export function trapezoidPerimeter(
  bounds: Rectangle,
  state: State,
  next: Point,
  orthogonal: boolean,
) {
  const defaultFactor = TrapezoidShape.prototype.factor
  const style: Style = state ? state.style : {}

  const x = bounds.x
  const y = bounds.y
  const w = bounds.width
  const h = bounds.height

  const direction = state != null && state.style.direction || 'east'
  let points: Point[]

  if (direction === 'east') {
    const dx = getFactor(style, defaultFactor, w)
    points = [
      new Point(x + dx, y),
      new Point(x + w - dx, y),
      new Point(x + w, y + h),
      new Point(x, y + h),
      new Point(x + dx, y),
    ]
  } else if (direction === 'west') {
    const dx = getFactor(style, defaultFactor, w)
    points = [
      new Point(x, y),
      new Point(x + w, y),
      new Point(x + w - dx, y + h),
      new Point(x + dx, y + h),
      new Point(x, y),
    ]

  } else if (direction === 'north') {
    const dy = getFactor(style, defaultFactor, h)
    points = [
      new Point(x, y + dy),
      new Point(x + w, y),
      new Point(x + w, y + h),
      new Point(x, y + h - dy),
      new Point(x, y + dy),
    ]
  } else {
    const dy = getFactor(style, defaultFactor, h)
    points = [
      new Point(x, y),
      new Point(x + w, y + dy),
      new Point(x + w, y + h - dy),
      new Point(x, y + h),
      new Point(x, y),
    ]
  }

  const center = bounds.getCenter()

  if (orthogonal) {
    if (next.x < x || next.x > x + w) {
      center.y = next.y
    } else {
      center.x = next.x
    }
  }

  return util.getPerimeterPoint(points, center, next) as Point
}

registerShape('trapezoid', TrapezoidShape)
registerPerimeter('trapezoidPerimeter', trapezoidPerimeter)