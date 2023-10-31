import { type UnitType } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface UnitTypesProps {
  unitTypes: UnitType[];
}

export default function ShowUnitTypesPopOver(props: UnitTypesProps) {
  const { unitTypes } = props;
  return (
    <div className="space-y-2">
      <h4 className="font-medium leading-none">UnitTypes</h4>
      {unitTypes?.map((unitType, i) => (
        <div className="grid gap-2" key={`unitType-${i}`}>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Name</Label>
            <Input
              id="name"
              defaultValue={unitType.name}
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Default length</Label>
            <Input
              id="defaultLength"
              defaultValue={unitType.defaultLength}
              className="col-span-2 h-8"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
