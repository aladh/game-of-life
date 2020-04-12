<script>
    export let grid
    $: length = Math.sqrt(grid.cells.length)
</script>

<div class="container">
  {#each grid.cells as cell, i}
      <div class="cell"
           data-alive="{cell.alive}"
           style="grid-row-start: {Math.floor(i / length) + 2}; grid-column-start: { i % length + 1}"
      >
      </div>
  {/each}
</div>

<style>
    .container {
        display: inline-grid;
        justify-items: center;
        align-items: center;
        margin: 10px 60px 30px;
        border: 1px solid black;
    }

    .cell {
        justify-self: stretch;
        align-self: stretch;

        height: 15px;
        width: 15px;
    }

    @media (max-width: 1500px) {
        .cell {
            height: 50px;
            width: 50px;
        }

        .container {
            margin: 10px 30px 30px;
        }
    }

    @media (max-width: 550px) {
        .cell {
            height: 35px;
            width: 35px;
        }

        .container {
            margin: 0 auto 30px;
        }
    }

    .cell[data-alive = 'false'] {
        background-color: white;
        border: 1px solid white;
    }

    .cell[data-alive = 'true'] {
        background-color: black;
        border: 1px solid darkgray;
    }
</style>
