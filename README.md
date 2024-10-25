# Multi-Socket Node Graph

If you've ever used Blender's [Geometry Nodes](https://docs.blender.org/manual/en/latest/modeling/geometry_nodes/index.html), it has an amazing implementation that respects the types of a Geometry
Nodes' Sockets when attempting to connect nodes. This library is a starting point for implementing something similar in
TypeScript.


[![qU4Af7i](https://github.com/user-attachments/assets/4031a9ae-3474-4904-a581-cc3e153f2075)](https://blender.community/c/rightclickselect/RTcbbc/)

These Node Graphs are not simple Graphs/DAGs because they have multiple input/output sockets which are all typed. Only Sockets of the same type are allowed to connect with one another.


## Future Plans

Better Examples:
- Integrate With @xyflow types
  - connect node sockets
  - drag and drop nodes over an edge, automatically connecting sockets

## Contributing

1. Install Deno
2. deno run type-check

Feel free to make a PR and I will review it!
