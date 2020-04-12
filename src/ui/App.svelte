<script>
	import GridUI from "./Grid.svelte"
	import { Grid } from "../lib/Grid"

	let grid = new Grid(10)
	grid.seedCells(10)
</script>

<main>
	<GridUI grid={grid}></GridUI>
	<button on:click={() => {grid.simulateGeneration(); grid = grid}}>Simulate Generation</button>
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
