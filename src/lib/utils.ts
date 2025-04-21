
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time from seconds to minutes:seconds format
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Format date to locale string with relative time indicator
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  } else if (diffMins < 24 * 60) {
    const hours = Math.floor(diffMins / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleString();
  }
}

// Determine status color class based on status
export function getStatusColorClass(status: string): string {
  switch (status) {
    case 'normal':
      return 'text-green-600';
    case 'busy':
      return 'text-yellow-600';
    case 'congested':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

// Determine status background color class
export function getStatusBgClass(status: string): string {
  switch (status) {
    case 'normal':
      return 'bg-green-50';
    case 'busy':
      return 'bg-yellow-50';
    case 'congested':
      return 'bg-red-50';
    default:
      return 'bg-gray-50';
  }
}

// CSV Export Helper
export function downloadCSV(data: any[], filename: string): void {
  if (!data.length) return;
  
  // Get headers from first item
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        // Handle special formatting and escaping
        const value = row[header];
        // If value contains commas, quotes, or newlines, wrap in quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
