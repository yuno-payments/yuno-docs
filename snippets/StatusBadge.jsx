export const StatusBadge = ({ type = 'secondary', text }) => {
  return <span className={`status-badge status-${type.toLowerCase().trim()}`}>{text}</span>;
};
