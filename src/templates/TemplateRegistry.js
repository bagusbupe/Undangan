import SimpleTemplate from './SimpleTemplate';

const registry = new Map();

// Register templates here. Keys are template IDs used in query param `template` or routes like /preview/:id
registry.set('simple', SimpleTemplate);

export default {
  get: (name) => registry.get(name),
  list: () => Array.from(registry.keys()),
};
