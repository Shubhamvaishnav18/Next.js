import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full text-sm text-left', className)}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <thead className={cn('bg-gray-50 dark:bg-gray-700', className)}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody className={cn('divide-y divide-gray-200 dark:divide-gray-700', className)}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className, onClick }: TableRowProps) => {
  return (
    <tr
      className={cn(
        'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({
  children,
  className,
  header = false,
  ...props
}: TableCellProps) => {
  const Component = header ? "th" : "td";

  return (
    <Component
      className={cn(
        "px-6 py-4",
        header && "font-semibold text-gray-900 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};