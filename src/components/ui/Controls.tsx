import * as RadixSwitch from '@radix-ui/react-switch'
import * as RadixSlider from '@radix-ui/react-slider'

interface SwitchRowProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SwitchRow({ id, label, checked, onChange }: SwitchRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <label htmlFor={id} className="cursor-pointer text-[0.9375rem]">
        {label}
      </label>
      <RadixSwitch.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="relative h-6 w-10 shrink-0 rounded-full bg-line-strong transition-colors data-[state=checked]:bg-brand"
      >
        <RadixSwitch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white transition-transform duration-200 data-[state=checked]:translate-x-[18px]" />
      </RadixSwitch.Root>
    </div>
  )
}

interface RangeProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onCommit: (value: [number, number]) => void
  onPreview?: (value: [number, number]) => void
  labels: [string, string]
}

/** Slider duplo (Radix). `onCommit` dispara só ao soltar, evitando refiltrar a cada pixel. */
export function RangeSlider({ min, max, step, value, onCommit, onPreview, labels }: RangeProps) {
  return (
    <RadixSlider.Root
      className="relative flex h-6 w-full touch-none select-none items-center"
      min={min}
      max={max}
      step={step}
      value={value}
      minStepsBetweenThumbs={1}
      onValueChange={(v) => onPreview?.([v[0], v[1]])}
      onValueCommit={(v) => onCommit([v[0], v[1]])}
    >
      <RadixSlider.Track className="relative h-[3px] grow rounded-full bg-line-strong">
        <RadixSlider.Range className="absolute h-full rounded-full bg-brand" />
      </RadixSlider.Track>
      {labels.map((label) => (
        <RadixSlider.Thumb
          key={label}
          aria-label={label}
          className="block size-5 rounded-full border-2 border-brand bg-white transition-transform hover:scale-110"
        />
      ))}
    </RadixSlider.Root>
  )
}
