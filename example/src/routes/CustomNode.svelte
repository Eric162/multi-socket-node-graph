<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
    import { RadioGrid } from 'svelte-tweakpane-ui';
    import  Pane  from 'svelte-tweakpane-ui/Pane.svelte';

type NodeDataType = {
	label: string;
	inputs: {
		[key: string]: XYGraphSocket;
	};
	outputs: {
		[key: string]: XYGraphSocket;
	};
};
 
  const { data } = $props<{ color: string }>()
 
  const { color } = data;
</script>
 
<Pane position="inline" title="Pane Title" userExpandable={false}>
  <Handle type="target" position={Position.Left} />
  
  <RadioGrid
    columns={1}
    label="Pane Position Prop"
  values={[
  'test', 'this', 'out']
  }
  />
	<!-- {#each Object.entries(data.outputs).concat(Object.entries(data.inputs)) as [socketName, socket], i} -->
	<!-- 	<IoSpan text={socketName} ioType={socket.ioType} /> -->
	<!-- 	<Handle -->
	<!-- 		type={socket.ioType === IOType.INPUT ? 'target' : 'source'} -->
	<!-- 		position={socket.ioType === IOType.INPUT ? Position.Left : Position.Right} -->
	<!-- 		id={socket.id} -->
	<!-- 		style={`top: ${52 + i * 20}px`} -->
	<!-- 	/> -->
	<!-- {/each} -->

  <Handle type="source" position={Position.Right} />
</Pane>

