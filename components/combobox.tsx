"use client"

import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export interface ComboboxItem {
  value: string,
  label: string
}

interface ComboboxProps {
  title: string
  contentList: ComboboxItem[]
}

export default function Combobox({ title, contentList }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
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
                <CommandItem>
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
