interface FormElementProps {
  children: React.ReactNode;
}

export function FormElement({ children }: FormElementProps) {
  return <div className="p-2 w-full">{children}</div>;
}
