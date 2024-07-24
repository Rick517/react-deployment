export default function Message() {
    const name = "Dmitry";
    return <h1>
        Hello {name ? name : 'World'}
        </h1>
}