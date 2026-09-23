export const HTMLBlock = ({ children }) => (
  <div dangerouslySetInnerHTML={{ __html: children }} />
);
