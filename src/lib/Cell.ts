export enum Transition {
  NONE,
  LIVE,
  DIE
}

export class GenerationResult {
  index: number
  transition: Transition

  constructor(index: number, transition: Transition) {
    this.index = index
    this.transition = transition
  }
}

export default class Cell {
  private _alive = false
  private neighbors = 0
  private readonly index: number

  constructor(index: number) {
    this.index = index
  }

  get alive() {
    return this._alive
  }

  simulateGeneration(): GenerationResult {
    if (this._alive && (this.neighbors == 2 || this.neighbors == 3)) {
      return new GenerationResult(this.index, Transition.NONE)
    } else if (!this._alive && this.neighbors == 3) {
      return this.live()
    } else {
      return this.die()
    }
  }

  live() {
    if (this._alive) return new GenerationResult(this.index, Transition.NONE)

    this._alive = true
    return new GenerationResult(this.index, Transition.LIVE)
  }

  incrementNeighbors() {
    this.neighbors++
  }

  decrementNeighbors() {
    this.neighbors--
  }

  private die() {
    if (!this._alive) return new GenerationResult(this.index, Transition.NONE)

    this._alive = false

    return new GenerationResult(this.index, Transition.DIE)
  }
}

