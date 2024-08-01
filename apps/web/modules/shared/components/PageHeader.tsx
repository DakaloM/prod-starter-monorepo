import { LucideIcon } from 'lucide-react'
import React from 'react'

export const PageHeader = (props: PageHeaderProps) => {
  const {Icon, title} = props;
  return (
    <div className="flex items-center gap-4 ">
      <div className="bg-primary  p-3 rounded-lg">
        {Icon && <Icon className="text-white" size={18} />}
      </div>
      <span className="font-semibold text-md text-textColor">{title}</span>
    </div>
  )
}



type PageHeaderProps = {
  Icon: LucideIcon;
  title: string;
}