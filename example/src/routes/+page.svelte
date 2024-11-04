<script lang="ts">
import '@xyflow/svelte/dist/style.css';

import { Background, Controls, SvelteFlow } from '@xyflow/svelte';
    import type { XYFlowNode } from '@xyflow/svelte';
    import type { XYFlowEdge } from '@xyflow/svelte';
    import { writable, type Writable } from 'svelte/store';
import CustomNode from 'XYFlowNodestomNode.svelte';
 
  const nodeTypes = {
    'custom': CustomNode
  };


const nodes: Writable<Node[]> = writable([
  {
    id: '1', // required and needs to be a string
		type: 'custom',
    position: { x: 100, y: 100 }, // required
    data: { label: 'hey' }, // reqXYFlowEdged
  },
  {
    id: '2',
		type: 'custom',
    position: { x: 200, y: 200 },
    data: { label: 'world' },
  },]);
const edges: Writable<Edge[]> = writable([
{ id: '1-2', source: '1', target: '2' }
]);

</script>

<main>
<SvelteFlow {nodes} {edges} {nodeTypes} id="tweakometry">
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

