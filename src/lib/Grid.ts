import Cell, { GenerationResult, Transition } from "./Cell"

export class Grid {
  private _cells: Cell[] = []
  private readonly length: number = 10

  constructor(length: number) {
    this.length = length

    for (let i = 0; i < length * length; i++) {
      this._cells.push(new Cell(i))
    }
  }

  get cells() {
    return this._cells
  }

  seedCells(num: number) {
    for (let i = 0; i < num; i++) {
      let index = Grid.getRandomInt(this._cells.length - 1)
      let cell = this._cells[index]

      if (cell.alive) continue

      cell.live()
      this.updateNeighbors(index, true)
    }
  }

  simulateGeneration() {
    let results: GenerationResult[] = []

    this._cells.forEach(cell => results.push(cell.simulateGeneration()))

    results.forEach(result => {
      if (result.transition === Transition.LIVE) {
        this.updateNeighbors(result.index, true)
      } else if (result.transition === Transition.DIE) {
        this.updateNeighbors(result.index, false)
      }
    })

    this._cells = [...this._cells]
  }

  private updateNeighbors(index: number, increment: boolean) {
    this.neighborIndexes(index).forEach(idx => {
      let cell = this._cells[idx]

      if (increment) {
        cell.incrementNeighbors()
      } else {
        cell.decrementNeighbors()
      }
    })
  }

  private neighborIndexes(index: number): number[] {
    let indexes = []

    let beginningOfRow = this.column(index) == 0
    let endOfRow = this.column(index) == this.length - 1
    let beginningOfColumn = this.row(index) == 0
    let endOfColumn = this.row(index) == this.length - 1

    // Left
    !beginningOfRow && indexes.push(index - 1)
    !beginningOfRow && this.row(index) != 0 && indexes.push(index - this.length - 1)
    !beginningOfRow && this.row(index) != this.length - 1 && indexes.push(index + this.length - 1)

    // Right
    !endOfRow && indexes.push(index + 1)
    !endOfRow && this.row(index) != 0 && indexes.push(index - this.length + 1)
    !endOfRow && this.row(index) != this.length - 1 && indexes.push(index + this.length + 1)

    // Above and below
    !beginningOfColumn && indexes.push(index - this.length)
    !endOfColumn && indexes.push(index + this.length)

    return indexes
  }

  private column(index: number): number {
    return index % this.length
  }

  private row(index: number): number {
    return Math.floor(index / this.length)
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max))
  }
}
