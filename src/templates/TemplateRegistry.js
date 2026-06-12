import SimpleTemplate from './SimpleTemplate';
import JavaTemplate from './JavaTemplate';

const registry = new Map();

// Register templates here. Keys are template IDs used in query param `template` or routes like /preview/:id
registry.set('simple', SimpleTemplate);
registry.set('adat-jawa', JavaTemplate);

export default {
  get: (name) => registry.get(name),
  list: () => Array.from(registry.keys()),
};
