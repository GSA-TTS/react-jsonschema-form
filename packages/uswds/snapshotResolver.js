export default {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace(/\.test\.([tj]sx?)/, `.test.$1${snapshotExtension}`),
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, ''),
  testPathForConsistencyCheck: 'some/example.test.tsx',
};
