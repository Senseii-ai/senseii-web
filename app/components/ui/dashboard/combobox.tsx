import React from "react";
import { Popover, PopoverContent } from "../popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command";
export interface ComboboxItem {
  value: string,
  label: string
}

interface ComboboxProps {
  title: string
  contentList: ComboboxItem[]
}

export default function Combobox({ contentList }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value] = React.useState<string>(contentList[0].value)
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          role="combobox"
          aria-expanded={open}
          variant="outline"
          aria-label="Select a team"
          className="md:w-48 justify-between"
          onClick={() => setOpen(!open)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={""}
              alt={"test"}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>

          {value
            ? contentList.find((framework) => framework.value === value)?.label
            : "Select goal ..."}
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <Command>
          <CommandInput placeholder="Search goal ..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {contentList.map((framework) => (
                <CommandItem key={framework.label}>
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
