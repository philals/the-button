export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      type="button"
      className="inline px-8 py-5 bg-purple-600 text-white font-medium text-2xl disabled:bg-purple-300 leading-tight uppercase rounded-lg shadow-2xl hover:bg-purple-700 hover:shadow-2xl focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
      {...props}
    >
      {props.children}
    </button>
  );
}
