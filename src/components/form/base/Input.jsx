export const Input = ({ label, ...rest }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input {...rest} className="w-full px-3 py-2 border rounded" />
      </div>
    </>
  );
};
