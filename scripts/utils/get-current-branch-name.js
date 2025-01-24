const { execSync: execSyncGit } = require('child_process');

function getCurrentBranchName() {
  try {
    return execSyncGit('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error('Error getting current branch:', error.message);
    process.exit(1);
  }
}

module.exports = getCurrentBranchName;
