// "...props" would encapsulate all the other properties that are not destructured
export default function Section({ children, title, ...props }) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}