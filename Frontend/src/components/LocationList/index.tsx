import { useRef, useEffect, useState } from "react";
import "./styles.css";

interface LocationListProps {
  list: { description: string }[];
  outSideClickFunc: (active: boolean) => void;
  setEventLocation: (location: string) => void;
}

export function LocationList({ list, outSideClickFunc, setEventLocation }: LocationListProps) {
  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          outSideClickFunc(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const onSelect = (location: string) => {
    setEventLocation(location);
    outSideClickFunc(false);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className="absolute location-list flex flex-col z-10 bg-[#1F1F21] p-2">
      {list.map((location, index) => (
        <div
          className="hover:opacity-75 hover:bg-gray-100 p-1 hover:text-black rounded-md cursor-default"
          key={index}
          onClick={() => onSelect(location.description)}
        >
          {location.description}
        </div>
      ))}
    </div>
  );
}
