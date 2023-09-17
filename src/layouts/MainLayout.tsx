import Header from "../components/Header/Header";

export default function MainLayout({ children, cartCount = null }: any) {

    return (
        <>
            <Header cartCount={cartCount} />
            <div style={{ marginTop: 80 }}>
                {children}
            </div>
        </>
    )
}