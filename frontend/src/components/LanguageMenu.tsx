import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

interface Language {
  id: number;
  name: string;
}

const languages = [
  {
    id: 1,
    name: "En",
  },
  {
    id: 2,
    name: "Fi",
  },
  {
    id: 3,
    name: "Ru",
  },
  {
    id: 4,
    name: "Fr",
  },
  {
    id: 5,
    name: "Ja",
  },
  {
    id: 6,
    name: "Fa",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Languages() {
  const { i18n } = useTranslation();
  const storedLanguage = localStorage.getItem("language");
  const defaultLanguage =
    languages.find((language) => language.name.toLowerCase() === (storedLanguage || i18n.language)) || languages[0];
  const [selected, setSelected] = useState<Language | null>(defaultLanguage);

  useEffect(() => {
    if (selected) {
      i18n.changeLanguage(selected.name.toLowerCase());
      localStorage.setItem("language", selected.name.toLowerCase());
    }
  }, [selected, i18n]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="relative w-250">
          <Listbox.Button className="h-8 relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(30,215,96)] sm:text-sm">
            <span className="flex items-center">
              {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
              <span className="ml-3 block text-[16px] font-bold">{selected && selected.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map((unit) => (
                <Listbox.Option
                  key={unit.id}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-[#535353] text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={unit}
                  onClick={() => i18n.changeLanguage(unit.name.toLowerCase())}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center w-26">
                        {/* <img src={unit.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                        <span
                          className={classNames(selected ? "font-bold text-md" : "font-normal text-md", "ml-3 block")}
                        >
                          {unit.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? "text-white" : "text-[rgb(30,215,96)]",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
