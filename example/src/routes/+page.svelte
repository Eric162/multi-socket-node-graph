<script lang="ts">
import '@xyflow/svelte/dist/style.css';

import { Background, Controls, SvelteFlow } from '@xyflow/svelte';
    import type { Node } from '@xyflow/svelte';
    import type { Edge } from '@xyflow/svelte';
    import { writable, type Writable } from 'svelte/store';


const nodes: Writable<Node[]> = writable([
  {
    id: '1', // required and needs to be a string
    position: { x: 0, y: 0 }, // required
    data: { label: 'hey' }, // required
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'world' },
  },]);
const edges: Writable<Edge[]> = writable([
{ id: '1-2', source: '1', target: '2' }
]);

</script>

<main>
<SvelteFlow {nodes} {edges} id="tweakometry">
	<Background />
	<Controls />
</SvelteFlow>
</main>

<style>
main {
	width: 100vw;
	height: 100vh;
}
</style>

