import { UserProfile } from "@senseii/types";
import Combobox, { ComboboxItem } from "../combobox";

export interface GoalSelectorProps {
  user?: UserProfile,
  comboboxItems: ComboboxItem[]
}

export default function GoalSelector({ user, comboboxItems }: GoalSelectorProps) {
  return (
    <Combobox title="Select goal" contentList={comboboxItems} />
  )
}
