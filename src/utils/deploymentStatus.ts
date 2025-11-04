/**
 * Deployment Status Utility - Independent from components
 * Manages deployment status without circular dependencies
 */

interface DeploymentStatus {
  active: boolean;
  message: string;
  progress: number;
  timestamp?: string;
}

/**
 * Update deployment status globally
 */
export function updateDeploymentStatus(active: boolean, message: string, progress: number): void {
  const status: DeploymentStatus = {
    active,
    message,
    progress,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('deployment_status', JSON.stringify(status));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('deploymentStatusUpdate', { detail: status }));
}

/**
 * Get current deployment status
 */
export function getDeploymentStatus(): DeploymentStatus {
  const savedStatus = localStorage.getItem('deployment_status');
  if (savedStatus) {
    return JSON.parse(savedStatus);
  }
  
  return {
    active: false,
    message: 'No active deployments',
    progress: 0
  };
}

/**
 * Listen for deployment status changes
 */
export function onDeploymentStatusUpdate(callback: (status: DeploymentStatus) => void): () => void {
  const handleUpdate = (event: CustomEvent) => {
    callback(event.detail);
  };

  window.addEventListener('deploymentStatusUpdate', handleUpdate as EventListener);

  return () => {
    window.removeEventListener('deploymentStatusUpdate', handleUpdate as EventListener);
  };
}
