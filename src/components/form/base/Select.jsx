import { firstEachWordCapitalize } from "../../../utils";

export const Select = ({ label, options, ...rest }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select {...rest} className="w-full px-3 py-2 border rounded">
        {options.map((option) => (
          <option key={option} value={option}>
            {firstEachWordCapitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
};
