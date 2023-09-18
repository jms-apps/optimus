interface FormElementProps {
  children: React.ReactNode;
}

export function FormElement({ children }: FormElementProps) {
  return <div className="p-2">{children}</div>;
}
