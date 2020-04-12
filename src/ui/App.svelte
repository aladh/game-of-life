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
	<GridUI grid={grid} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
