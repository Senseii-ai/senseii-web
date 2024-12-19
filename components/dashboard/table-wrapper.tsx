interface TableWrapperProps {
  children: React.ReactNode
}

export default function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="max-h-96 overflow-y-auto">
      {children}
    </div>
  )
}
