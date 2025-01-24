function getModuleList() {
  // TODO: Add your module list here
  return [
    {
      name: 'Module A',
      value: 'module-a',
      branchPatterns: /^module\/a\//,
    },
    {
      name: 'Module B',
      value: 'module-b',
      branchPatterns: /^module\/b\//,
    },
  ];
}

module.exports = getModuleList;
