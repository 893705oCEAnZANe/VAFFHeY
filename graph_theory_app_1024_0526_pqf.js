// 代码生成时间: 2025-10-24 05:26:15
const express = require('express');
const { Graph } = require('./graph'); // Assuming there's a separate module for graph operations

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a graph instance
const graph = new Graph();

// API endpoint to add nodes to the graph
app.post('/api/nodes', (req, res) => {
  try {
    const { nodes } = req.body;
    if (!Array.isArray(nodes)) {
      return res.status(400).json({ error: 'Nodes must be an array' });
    }

    nodes.forEach(node => {
      graph.addNode(node);
    });

    res.status(201).json({ message: 'Nodes added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to add edges to the graph
app.post('/api/edges', (req, res) => {
  try {
    const { edges } = req.body;
    if (!Array.isArray(edges) || edges.some(edge => !edge.from || !edge.to)) {
      return res.status(400).json({ error: 'Edges must be an array of objects with from and to properties' });
    }

    edges.forEach(edge => {
      graph.addEdge(edge.from, edge.to);
    });

    res.status(201).json({ message: 'Edges added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to find a path in the graph using BFS
app.get('/api/path', (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end nodes are required' });
    }

    const path = graph.findPath(start, end);
    if (path) {
      res.json({ path });
    } else {
      res.status(404).json({ error: 'No path found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Graph Theory App listening at http://localhost:${port}`);
});


/*
 * graph.js - A basic graph class implementation.
 * This is a separate module that can be extended with various graph algorithms.
 */
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // Add a node to the graph
  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, new Set());
    }
  }

  // Add an edge to the graph
  addEdge(from, to) {
    if (this.adjacencyList.has(from)) {
      this.adjacencyList.get(from).add(to);
    } else {
      throw new Error('Node not found in the graph');
    }
  }

  // Find a path using Breadth-First Search (BFS)
  findPath(start, end) {
    if (!this.adjacencyList.has(start)) {
      throw new Error('Start node not found in the graph');
    }

    const queue = [start];
    const visited = new Set();
    const path = [];

    while (queue.length > 0) {
      const current = queue.shift();

      if (visited.has(current)) continue;
      visited.add(current);
      path.push(current);

      if (current === end) {
        return path;
      }

      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
    }

    return null;
  }
}

// Export the Graph class
module.exports = { Graph };
