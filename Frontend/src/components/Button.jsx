
export default function Button({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-lg bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
        >
            {children}
        </button>
    );
}
