import SimpleTemplate from './SimpleTemplate';
import BaseTemplate from './BaseTemplate';
import Template1 from './Template1';
import Template2 from './Template2';

const registry = new Map();

// Register templates here. Keys are template IDs used in query param `template` or routes like /preview/:id
registry.set('simple', SimpleTemplate);
registry.set('base', BaseTemplate);
registry.set('template1', Template1);
registry.set('template2', Template2);

export default {
  get: (name) => registry.get(name),
  list: () => Array.from(registry.keys()),
};
