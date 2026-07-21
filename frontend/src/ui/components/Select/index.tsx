import { Fragment, useMemo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import type { SelectProps, SelectValue } from "./types";

const Select = ({
  label,
  error = false,
  errorMessage,
  options,
  placeholder = "Select an option",
  className = "",
  id,
  disabled = false,
  value,
  onChange,
  name,
  ...buttonProps
}: SelectProps) => {
  const selectedOption = useMemo(
    () => options.find((option) => String(option.value) === String(value)),
    [options, value],
  );

  const normalizedValue = selectedOption?.value;

  const handleChange = (newValue: SelectValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <Listbox
        value={normalizedValue}
        onChange={handleChange}
        disabled={disabled}
        name={name}
      >
        <div className="relative">
          <ListboxButton
            id={id}
            className={`
              flex h-10 w-full items-center justify-between gap-3 rounded-xl
              border px-3 text-left text-sm outline-none transition-all
              duration-150
              ${
                disabled
                  ? `
                    cursor-not-allowed border-text-secondary/10
                    bg-background text-text-secondary opacity-60
                  `
                  : `
                    cursor-pointer bg-surface text-text-primary
                    hover:border-primary/50
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/15
                  `
              }
              ${error ? "border-error focus:border-error focus:ring-error/15" : "border-text-secondary/20"}
              ${className}
            `}
            {...buttonProps}
          >
            <span
              className={`
                min-w-0 flex-1 truncate
                ${selectedOption ? "text-text-primary" : "text-text-secondary"}
              `}
            >
              {selectedOption ? (
                <span className="flex items-center gap-2">
                  {selectedOption.icon && (
                    <span className="shrink-0">{selectedOption.icon}</span>
                  )}

                  <span className="truncate">{selectedOption.label}</span>
                </span>
              ) : (
                placeholder
              )}
            </span>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="size-3 shrink-0 text-text-secondary transition-transform duration-150 group-data-open:rotate-180"
              aria-hidden="true"
            />
          </ListboxButton>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <ListboxOptions
              anchor="bottom start"
              className={`
                z-50 mt-1 max-h-60 w-(--button-width)
                origin-top overflow-y-auto rounded-xl border
                border-text-secondary/15 bg-surface p-1.5
                shadow-lg outline-none
              `}
            >
              {options.length === 0 ? (
                <div className="px-3 py-2.5 text-sm text-text-secondary">
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <ListboxOption
                    key={`${option.value}-${option.label}`}
                    value={option.value}
                    disabled={option.disabled}
                    className={`
                      group flex cursor-pointer select-none items-center
                      justify-between gap-3 rounded-lg px-3 py-2.5
                      text-sm text-text-primary outline-none
                      transition-colors
                      data-focus:bg-primary/10
                      data-selected:bg-primary/10
                      data-disabled:cursor-not-allowed
                      data-disabled:opacity-40
                    `}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {option.icon && (
                        <span className="shrink-0">{option.icon}</span>
                      )}

                      <span className="truncate">{option.label}</span>
                    </span>

                    <FontAwesomeIcon
                      icon={faCheck}
                      className={`
                        size-3.5 shrink-0 text-primary
                        opacity-0 transition-opacity
                        group-data-selected:opacity-100
                      `}
                      aria-hidden="true"
                    />
                  </ListboxOption>
                ))
              )}
            </ListboxOptions>
          </Transition>

          {errorMessage && (
            <p className="mt-1.5 text-xs text-error">{errorMessage}</p>
          )}
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
