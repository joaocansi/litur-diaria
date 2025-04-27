export function formatUnixTimestamp(timestamp: number, useUTC: boolean = false): string {
    const date = new Date(timestamp * 1000);
    const pad = (n: number): string => n.toString().padStart(2, '0');
  
    const day = pad(useUTC ? date.getUTCDate() : date.getDate());
    const month = pad((useUTC ? date.getUTCMonth() : date.getMonth()) + 1);
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const hours = pad(useUTC ? date.getUTCHours() : date.getHours());
    const minutes = pad(useUTC ? date.getUTCMinutes() : date.getMinutes());
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }