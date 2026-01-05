// Simple Graph implementation with adjacency list and DFS/BFS traversals
class Graph {
  constructor(directed = false) {
    this.directed = directed;
    this.adj = new Map();
  }

  addVertex(v) {
    if (!this.adj.has(v)) {
      this.adj.set(v, new Set());
    }
  }

  addEdge(u, v) {
    this.addVertex(u);
    this.addVertex(v);
    this.adj.get(u).add(v);
    if (!this.directed) {
      this.adj.get(v).add(u);
    }
  }

  removeEdge(u, v) {
    if (this.adj.has(u)) {
      this.adj.get(u).delete(v);
    }
    if (!this.directed && this.adj.has(v)) {
      this.adj.get(v).delete(u);
    }
  }

  hasEdge(u, v) {
    return this.adj.has(u) && this.adj.get(u).has(v);
  }

  print() {
    for (const [node, neighbors] of this.adj.entries()) {
      console.log(`${node} -> ${[...neighbors].join(', ')}`);
    }
  }

  bfs(start) {
    if (!this.adj.has(start)) return [];
    const visited = new Set();
    const order = [];
    const queue = [start];
    visited.add(start);

    while (queue.length) {
      const node = queue.shift();
      order.push(node);
      for (const nei of this.adj.get(node)) {
        if (!visited.has(nei)) {
          visited.add(nei);
          queue.push(nei);
        }
      }
    }
    return order;
  }

  dfs(start) {
    if (!this.adj.has(start)) return [];
    const visited = new Set();
    const order = [];
    const stack = [start];

    while (stack.length) {
      const node = stack.pop();
      if (visited.has(node)) continue;
      visited.add(node);
      order.push(node);
      // Reverse to keep insertion order similar to adjacency iteration
      const neighbors = [...this.adj.get(node)].slice().reverse();
      for (const nei of neighbors) {
        if (!visited.has(nei)) {
          stack.push(nei);
        }
      }
    }
    return order;
  }
}

// Demo / basic test
if (require.main === module) {
  const g = new Graph(false); // undirected
  g.addEdge('A', 'B');
  g.addEdge('A', 'C');
  g.addEdge('B', 'D');
  g.addEdge('C', 'D');
  g.addEdge('C', 'E');

  console.log('Graph adjacency list:');
  g.print();

  console.log('\nHas edge A->B?', g.hasEdge('A', 'B'));
  console.log('Has edge B->A?', g.hasEdge('B', 'A'));

  console.log('\nBFS from A:', g.bfs('A').join(' -> '));
  console.log('DFS from A:', g.dfs('A').join(' -> '));

  console.log('\nRemove edge C-D');
  g.removeEdge('C', 'D');
  g.print();
}

module.exports = { Graph };
