interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export default function Card({ children, className = '', title, action }: CardProps) {
  return (
    <div className={`bg-bg-white rounded-lg shadow-sm border border-border p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
