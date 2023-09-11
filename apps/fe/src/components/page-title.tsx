interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="pb-4">{title}</h1>;
}
