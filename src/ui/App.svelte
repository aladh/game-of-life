<script>
	import GridUI from "./Grid.svelte"
	import { Grid } from "../lib/Grid"

	let grid = new Grid(50)
	grid.seedCells(500)

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function start() {
		while(true) {
			grid.simulateGeneration()
			grid = grid
			await sleep(100);
		}
	}

	start()
</script>

<main>
	<h1>Conway's Game of Life</h1>
	<GridUI grid={grid} />
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
