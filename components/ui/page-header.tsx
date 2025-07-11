import { cn } from '@/lib/utils';

export default function PageHeader({
  heading,
  subheading,
  rightElement,
  classNames = {}
}: Readonly<{
  classNames?: {
    container?: string;
    heading?: string;
    subContainer?: string;
    subheading?: string;
  };
  heading: string;
  rightElement?: React.ReactNode;
  subheading: string;
}>) {
  return (
    <div
      className={cn(
        'mb-4 flex flex-row flex-wrap items-center justify-between gap-4 md:gap-2',
        classNames.container
      )}
    >
      <div className={cn('flex flex-col', classNames.subContainer)}>
        <h1
          className={cn(
            ' text-3xl md:text-4xl',
            classNames.heading
          )}
        >
          {heading}
        </h1>
        <p className={cn('text-muted-foreground', classNames.subheading)}>
          {subheading}
        </p>
      </div>
      {rightElement}
    </div>
  );
}
