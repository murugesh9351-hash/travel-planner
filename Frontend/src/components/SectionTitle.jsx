
export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-2 text-gray-500">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

