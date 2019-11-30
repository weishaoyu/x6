import { getFactor } from './util'
import { SvgCanvas2D } from '../../canvas'
import { Shape, Actor } from '../../shape'

export class DataStorageShape extends Actor {
  factor: number = 0.1

  redrawPath(c: SvgCanvas2D, x: number, y: number, w: number, h: number) {
    const s = getFactor(this.style, this.factor, w)
    c.moveTo(s, 0)
    c.lineTo(w, 0)
    c.quadTo(w - s * 2, h / 2, w, h)
    c.lineTo(s, h)
    c.quadTo(s - s * 2, h / 2, s, 0)
    c.close()
    c.end()
  }
}

Shape.register('dataStorage', DataStorageShape)