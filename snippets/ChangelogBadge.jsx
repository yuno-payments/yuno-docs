export const ChangelogBadge = ({ type }) => {
  const types = {
    added: { color: 'success', label: 'ADDED' },
    changed: { color: 'warning', label: 'CHANGED' },
    deprecated: { color: 'alert', label: 'DEPRECATED' },
    removed: { color: 'error', label: 'REMOVED' },
    fixed: { color: 'info', label: 'FIXED' },
    security: { color: 'security', label: 'SECURITY' },
    breaking: { color: 'breaking', label: 'BREAKING' },
  };

  const config = types[type.toLowerCase()] || { color: 'secondary', label: type.toUpperCase() };

  return (
    <span className={`status-badge status-${config.color}`}>
      {config.label}
    </span>
  );
};
