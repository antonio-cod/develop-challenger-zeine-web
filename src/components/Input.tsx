type Props = React.ComponentProps<"input"> & {
  legend?: string;
  icon?: string; // Caminho opcional do ícone SVG
};

export function Input({ legend, type = "text", icon, ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 max-h-20 flex-col focus-within:text-orange-base">
      {legend && (
        <legend className="uppercase text-xxs mb-2 text-gray-300">
          {legend}
        </legend>
      )}

      <div className="relative w-full">
        {/* Ícone opcional */}
        {icon && (
          <img
            src={icon}
            alt="Ícone"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          />
        )}

        <input
          type={type}
          className={`w-full h-12 border-b border-gray-100 bg-transparent ${
            icon ? "pl-10" : "px-2"
          } text-sm text-gray-200 placeholder-gray-200 focus:border-b-2 focus:border-orange-base focus:outline-none`}
          {...rest}
        />
      </div>
    </fieldset>
  );
}
