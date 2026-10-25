"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { PrototypeComponent, PrototypeImage } from "@/content/types";
import { Ph } from "@/components/ui/Ph";

interface PrototypeComponentsProps {
  image: PrototypeImage;
  components: PrototypeComponent[];
}

export function PrototypeComponents({ image, components }: PrototypeComponentsProps) {
  const [selectedId, setSelectedId] = useState(components[0]?.id);
  const selectedIndex = components.findIndex((component) => component.id === selectedId);
  const selected = components[selectedIndex >= 0 ? selectedIndex : 0];

  if (!selected) return null;

  return (
    <>
      <div className="relative overflow-hidden rounded-[20px] border border-gray-200 bg-gray-100 sm:rounded-[28px]">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="h-auto w-full"
        />
        <ol aria-label="Select a prototype component" className="absolute inset-0">
          {components.map((component, i) => {
            const isSelected = component.id === selected.id;
            return (
              <li key={component.id} className="absolute" style={{ left: `${component.pin.x}%`, top: `${component.pin.y}%` }}>
                <button
                  type="button"
                  aria-label={`Show component ${i + 1}: ${component.name}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(component.id)}
                  className={cn(
                    "flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-label font-semibold text-white shadow-md transition sm:size-10 sm:text-body-md",
                    isSelected
                      ? "scale-110 bg-brand-900 ring-4 ring-brand-200"
                      : "bg-brand-700 hover:scale-110 hover:bg-brand-800",
                  )}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <aside
        aria-live="polite"
        aria-label={`Details for component ${selectedIndex + 1}: ${selected.name}`}
        className="mt-4 rounded-card border border-brand-200 bg-brand-50 p-4 sm:p-5"
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,180px)_1fr] sm:items-start">
          <div className="overflow-hidden rounded-ctrl border border-brand-100 bg-white">
            <Image
              src={image.src}
              alt={`Location of ${selected.name} in the prototype interior`}
              width={image.width}
              height={image.height}
              sizes="180px"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="label-caps text-brand-800">Selected component {selectedIndex + 1}</p>
            <h3 className="mt-1 text-hmd font-semibold text-gray-950">{selected.name}</h3>
            <dl className="mt-3 grid gap-3 text-body-md">
              <div>
                <dt className="font-semibold text-gray-950">Purpose</dt>
                <dd className="mt-0.5 text-gray-700">{selected.purpose}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-950">Specifications</dt>
                <dd className="mt-0.5 text-gray-700">
                  <Ph text={selected.detail} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>

    </>
  );
}
