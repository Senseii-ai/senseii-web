interface TableWrapperProps {
  children: React.ReactNode
}

export default function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="overflow-y-scroll">
      {children}
    </div>
  )
}
