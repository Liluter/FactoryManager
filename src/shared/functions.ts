export const setColor = (priority: 0 | 1 | 2 | 3): string => {
  switch (priority) {
    case 0: return 'text-bg-danger';
    case 1: return 'text-bg-warning';
    case 2: return 'text-bg-info';
    case 3: return 'text-bg-secondary';
  }
}